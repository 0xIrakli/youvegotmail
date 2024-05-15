import { USER } from '../models/User.js'
import { EMAIL } from '../models/Email.js'

import asyncHandler from 'express-async-handler'

export const sendEmails = asyncHandler(async (req, res) => {
	const { recipients: recipientsString, subject, body } = req.body

	// filter duplicates
	const recipientEmails = Array.from(new Set(recipientsString.split(',')))

	const recipients = await USER.find({ email: { $in: recipientEmails } })

	if (recipients.length !== recipientEmails.length) {
		return res.status(400).json({
			message: 'One or more of recipient email addresses is incorrect',
		})
	}

	const users = [req.user, ...recipients]

	const email = {
		sender: req.user._id,
		recipients: recipients.map((rec) => rec._id),
		subject,
		body,
		archived: false,
	}

	await Promise.all(
		users.map(async (user) => {
			const newEmail = await EMAIL.create({
				owner: user._id,
				...email,
			})

			user.emails.push(newEmail._id)
			await newEmail.save()
			await user.save()
		})
	)

	res.json(email)
})

export const getEmails = asyncHandler(async (req, res) => {
	const { emailCategory: category } = req.params
	const userId = req.user._id
	let query = null

	if (category.toLowerCase() === 'inbox') {
		query = {
			archived: false,
			recipients: userId,
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
		}
	}

	if (!query) {
		return res.sendStatus(404)
	}

	return res.json(
		await EMAIL.find({ owner: req.user._id, ...query })
			.populate('sender', 'email')
			.populate('recipients', 'email')
	)
})

export const getEmail = asyncHandler(async (req, res) => {
	const { emailId } = req.params
	let email

	try {
		email = await EMAIL.findOne({ owner: req.user._id, _id: emailId })
			.populate('sender', 'email')
			.populate('recipients', 'email')
	} catch (e) {
		console.log(e)
	}

	if (!email) {
		return res.sendStatus(404)
	}

	return res.json(email)
})

export const setEmailArchived = asyncHandler(async (req, res) => {
	const { archived } = req.body
	const { emailId } = req.params

	const email = await EMAIL.findOne({ owner: req.user._id, _id: emailId })
		.populate('recipients', 'email')
		.populate('sender', 'email')

	if (!email) {
		return res.sendStatus(404)
	}

	email.archived = archived
	await email.save()

	return res.json(email)
})

export const deleteEmail = asyncHandler(async (req, res) => {
	const { emailId } = req.params

	await EMAIL.findOneAndDelete({ owner: req.user._id, _id: emailId })

	return res.sendStatus(204)
})
