// sender, recipients, subject, body, sentAt, archived.

import { model, Schema } from 'mongoose'

const emailSchema = new Schema(
	{
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
		},
		body: {
			type: String,
			required: true,
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
