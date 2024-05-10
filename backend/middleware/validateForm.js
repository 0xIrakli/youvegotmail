import { object, string } from 'yup'

export const loginSchema = object({
	email: string()
		.matches(/^\S+@\S+\.\S+$/, 'Please enter valid Email address')
		.required('Email is required'),
	password: string().trim().min(8).required('Password is required'),
})

export const registerSchema = object({
	email: string()
		.matches(/^\S+@\S+\.\S+$/, 'Please enter valid Email address')
		.required('Email is required'),
	password: string().trim().min(8).required('Password is required'),

	confirmPassword: string().when(
		'password',
		(password, schema) => string().equals(password).required('Password is required'),
		'passwords dont match'
	),
})

export const validateForm = (schema) => {
	return async (req, res, next) => {
		try {
			await schema.validate(req.body, { abortEarly: false })
			next()
		} catch (error) {
			return res.status(400).json({
				name: error.name,
				message: error.message,
				errors: error.errors,
			})
		}
	}
}
