import express from 'express'
import mongoose from 'mongoose'
import MongoStore from 'connect-mongo'
import cookieparser from 'cookie-parser'
import session from 'express-session'
import bcrypt from 'bcrypt'
import cors from 'cors'
import dotenv from 'dotenv'

import { verifyAuth } from './middleware/verifyAuth.js'

import { USER } from './models/User.js'
import { EMAIL } from './models/Email.js'

dotenv.config({ path: '.env' })

const app = express()

const hasPermissions = async (user, email) => {
	const currentUserIsRecipient = email.recipients.some((recipientId) =>
		recipientId.equals(user._id)
	)

	return currentUserIsRecipient || email.sender.equals(user._id)
}

app.use(
	cors({
		origin: '*',
		credentials: true,
	})
)

app.use(cookieparser())
app.use(express.json())

app.use(
	session({
		secret: process.env.SESSION_SECRET,
		resave: false,
		saveUninitialized: false,
		cookie: {
			maxAge: 1000 * 60 * 60 * 24,
			sameSite: true,
		},
		store: MongoStore.create({
			mongoUrl: process.env.MONGODB_URL,
		}),
	})
)

// GET /user/status
// ამოწმებს მომხმარებლის loggedIn სტატუსს. თუ მომხმარებელი სისტემაში შესულია,
// აბრუნებს მომხმარებლის ძირითად ინფორმაციას(email, _id).
app.get('/user/status', verifyAuth, (req, res) => {
	//verifyAuth ukve amowmebs loggedIn statuss (session.userId) da aq agar aris sachiro
	const { email, _id, ...rest } = req.user
	res.json({ user: { email, _id } })
})

// POST /user/register
// req.body-ში გადაეცემა email და password. არეგისტრირებს მომხმარებელს, ამატებს მონაცემთა ბაზაში.
// დარეგისტრირების შემდეგ მომხმარებელი ჩათვალეთ სისტემაში შესულად.აბრუნებს მომხმარებლის ძირითად ინფორმაციას(email, _id).
app.post('/user/register', async (req, res) => {
	const { email: regEmail, password: regPassword } = req.body

	if (await USER.findOne({ email: regEmail })) {
		return res.status(409).json({ message: 'email already in use' })
	}

	const hashedPassword = await bcrypt.hash(regPassword, 10)

	const newUser = await USER.create({
		email: regEmail,
		password: hashedPassword,
	})

	req.session.userId = newUser._id

	const { email, _id, ...rest } = newUser._doc

	res.json({
		user: { email, _id },
	})
})

// POST /user/login
// req.body-ში გადაეცემა email და password. მომხმარებელი შეყავს სისტემაში. აბრუნებს მომხმარებლის ძირითად ინფორმაციას (email, _id).
app.post('/user/login', async (req, res) => {
	const { email, password } = req.body
	const user = await USER.findOne({ email }).lean()

	if ((await bcrypt.compare(password, user.password)) && user) {
		const { password, ...rest } = user

		req.session.userId = rest._id.toString()
		res.json({ user: rest })
	} else {
		res.status(401).json({ message: 'Invalid username or password' })
	}
})

// DELETE /user/logout
// მომხმარებელი გამოყავს სისტემიდან.
app.delete('/user/logout', (req, res) => {
	req.session.destroy()
	res.clearCookie('connect.sid')
	res.sendStatus(204)
})

// POST /emails
// req.body-ში გადაეცემა recipients, subject და body, სადაც recipients მძიმით გამოყოფილი იმეილების string-ია.
// ქმნის ახალ იმეილს და აბრუნებს ახალი იმეილის საჭირო ატრიბუტებს.
app.post('/emails', verifyAuth, async (req, res) => {
	const { recipients: recipientsString, subject, body } = req.body

	const recipientEmails = new Set(recipientsString.split(','))

	const recipients = await Promise.all(
		[...recipientEmails].map((recipient) =>
			USER.findOne({ email: recipient })
				.lean()
				.then((obj) => obj._id)
		)
	)

	if (!recipients.every((el) => el)) {
		return res.status(400).json({
			message: 'One or more of recipient email addresses is incorrect',
		})
	}

	const newEmail = await EMAIL.create({
		sender: req.user,
		recipients,
		subject,
		body,
		archived: false,
	})

	await newEmail.save()
	res.json(newEmail)
})

// GET /emails/c/:emailCategory
// path-ში დინამიურ სეგმენტად გადაეცემა emailCategory. აბრუნებს გადაცემულ კატეგორიაში შენახულ იმეილებს.
// Inbox კატეგორიის მითითებისას ყველა ისეთი იმეილი უნდა დაბრუნდეს, რომელიც არ არის archived.
// დანარჩენი კატეგორიები სახელების მიხედვით.ეს endpoint უნდა აბრუნებდეს სორტირებულ იმეილებს - უახლესი იმეილები დასაწყისში.
app.get('/emails/c/:emailCategory', verifyAuth, async (req, res) => {
	const { emailCategory: category } = req.params
	const userId = req.user._id
	let query = null

	if (category.toLowerCase() === 'inbox') {
		query = {
			archived: false,
			$or: [{ recipients: userId }, { sender: userId }],
		}
	}

	if (category.toLowerCase() === 'sent') {
		query = {
			sender: userId,
		}
	}

	if (category.toLowerCase() === 'archived') {
		query = {
			archived: true,
			$or: [{ recipients: userId }, { sender: userId }],
		}
	}

	if (!query) {
		return res.sendStatus(400)
	}

	return res.json(await EMAIL.find(query).lean().sort({ createdAt: 'descending' }))
})

// GET /emails/:emailId
// path-ში დინამიურ სეგმენტად გადაეცემა emailId. აბრუნებს შესაბამის იმეილს.
app.get('/emails/:emailId', verifyAuth, async (req, res) => {
	const { emailId } = req.params

	const email = await EMAIL.findById(emailId)

	if (!email) {
		return res.sendStatus(404)
	}

	if (!(await hasPermissions(req.user, email))) {
		return res.sendStatus(401)
	}

	return res.json(email)
})

// PATCH /emails/:emailId
// path-ში დინამიურ სეგმენტად გადაეცემა emailId. req.body-ში გადაეცემა archived - true ან false.
// ეს არის იმეილის დაარქივების endpoint.archived პარამეტრის მიხედვით უნდა განაახლოთ იმეილი და დააბრუნოთ განახლებული იმეილის საჭირო ატრიბუტები.
app.patch('/emails/:emailId', verifyAuth, async (req, res) => {
	const { archived } = req.body
	const { emailId } = req.params

	const email = await EMAIL.findById(emailId)

	if (!email) {
		return res.sendStatus(404)
	}

	if (!(await hasPermissions(req.user, email))) {
		console.log('AAAAAAAA?????')
		return res.sendStatus(401)
	}

	email.archived = archived
	await email.save()

	return res.json(email)
})

// მნიშვნელოვანია: იმეილის დაბრუნებამდე/შეცვლამდე აუცილებლად შეამოწმეთ არის თუ არა ავტორიზებული მომხმარებელი გამოგზავნი/მიმღები მომხმარებლების სიაში.
// სხვის ანგარიშში დამატებული იმეილის წაკითხვა / დაარქივება მომხმარებელს არ უნდა შეეძლოს.

app.listen(process.env.EXPRESS_PORT, async () => {
	console.log('Server Started...')

	try {
		await mongoose.connect(process.env.MONGODB_URL)
		console.log('Connected to the database...')
	} catch (error) {
		console.log(error)
	}
})
