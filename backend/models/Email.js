// sender, recipients, subject, body, sentAt, archived.

import { model, Schema } from 'mongoose'

export const emailSchema = new Schema(
	{
		owner: {
			type: Schema.Types.ObjectId,
			ref: 'USER',
			required: true,
		},
		sender: {
			type: Schema.Types.ObjectId,
			ref: 'USER',
			required: true,
		},
		recipients: [
			{
				type: Schema.Types.ObjectId,
				ref: 'USER',
				required: true,
			},
		],
		subject: {
			type: String,
			required: true,
			minLength: 3,
		},
		body: {
			type: String,
			required: true,
			minLength: 3,
		},
		archived: {
			type: Boolean,
			required: true,
		},
	},
	{
		timestamps: true,
		versionKey: false,
	}
)

export const EMAIL = model('EMAIL', emailSchema)
