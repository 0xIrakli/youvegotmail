import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
	{
		email: { type: String, required: true },
		password: { type: String, required: true },
	},
	{
		timestamps: true,
		versionKey: false,
	}
)

export const USER = mongoose.model('USER', userSchema)
