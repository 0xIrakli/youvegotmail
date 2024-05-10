import mongoose, { Schema } from 'mongoose'
import { emailSchema } from './Email.js'

const userSchema = new mongoose.Schema(
	{
		email: { type: String, required: true },
		password: { type: String, required: true },
		emails: [{ type: Schema.Types.ObjectId, ref: 'EMAIL' }],
	},
	{
		timestamps: true,
		versionKey: false,
	}
)

export const USER = mongoose.model('USER', userSchema)
