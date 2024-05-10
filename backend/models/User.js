import mongoose, { Schema } from 'mongoose'
import { emailSchema } from './Email.js'

const userSchema = new mongoose.Schema(
	{
		email: { type: String, required: true, maxLength: 50 },
		password: { type: String, required: true, minLength: 8, maxLength: 20 },
		emails: [{ type: Schema.Types.ObjectId, ref: 'EMAIL' }],
	},
	{
		timestamps: true,
		versionKey: false,
	}
)

export const USER = mongoose.model('USER', userSchema)
