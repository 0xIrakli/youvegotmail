import express from 'express'
import mongoose from 'mongoose'
import MongoStore from 'connect-mongo'
import cookieparser from 'cookie-parser'
import session from 'express-session'
import cors from 'cors'
import dotenv from 'dotenv'

import { emailRouter } from './routes/emailRouter.js'
import { userRouter } from './routes/userRouter.js'
import { handleError } from './middleware/handleError.js'

dotenv.config({ path: '.env' })

const app = express()

app.use((req, res, next) => {
	console.log(req.url)
	next()
})

app.use(
	cors({
		origin: process.env.ALLOWED_ORIGIN,
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

app.use('/user', userRouter)
app.use('/emails', emailRouter)

app.use(handleError)

app.listen(process.env.EXPRESS_PORT, async () => {
	console.log('Server Started...')

	try {
		await mongoose.connect(process.env.MONGODB_URL)
		console.log('Connected to the database...')
	} catch (error) {
		console.log(error)
	}
})
