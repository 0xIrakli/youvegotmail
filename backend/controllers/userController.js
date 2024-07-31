import { USER } from '../models/User.js'

import bcrypt from 'bcrypt'
import asyncHandler from 'express-async-handler'

export const getStatus = asyncHandler(async (req, res) => {
	//verifyAuth ukve amowmebs loggedIn statuss (session.userId) da aq agar aris sachiro
	const { email, _id, ...rest } = req.user
	res.json({ user: { email, _id } })
})

export const registerUser = asyncHandler(async (req, res) => {
	const { email: regEmailCase, password: regPassword } = req.body
	const regEmail = regEmailCase.toLowerCase()

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

	res.json({ email, _id })
})

export const loginUser = asyncHandler(async (req, res) => {
	const { email: emailCase, password } = req.body
	const email = emailCase.toLowerCase()
	const user = await USER.findOne({ email }).lean()

	if (user && (await bcrypt.compare(password, user.password))) {
		const { password, ...rest } = user

		req.session.userId = rest._id.toString()
		res.json(rest)
	} else {
		res.status(401).json({ message: 'Invalid username or password' })
	}
})

export const logoutUser = asyncHandler(async (req, res) => {
	req.session.destroy()
	res.clearCookie('connect.sid')
	return res.sendStatus(204)
})
