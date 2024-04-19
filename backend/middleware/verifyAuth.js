import { USER } from '../models/User.js'

export const verifyAuth = async (req, res, next) => {
	const { session } = req
	if (!session.userId) {
		return res
			.status(401)
			.json({ message: 'Not authenticated', fromOrigin: 'middleware' })
	}

	req.user = await USER.findById(session.userId)

	next()
}
