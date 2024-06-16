import { string, object } from 'yup'

export const emailSchema = object({
	body: string().min(3).required('Body is required'),
	subject: string().min(3).required('Subject is required'),
	recipients: string().required('Recipients list is required'),
})

export const loginSchema = object({
	email: string()
		.max(50)
		.matches(/^\S+@\S+\.\S+$/, 'Please enter valid Email address')
		.required('Email is required'),
	password: string().trim().min(8).max(20).required('Password is required'),
})

export const registerSchema = object({
	email: string()
		.max(50)
		.matches(/^\S+@\S+\.\S+$/, 'Please enter valid Email address')
		.required('Email is required'),
	password: string().trim().min(8).max(20).required('Password is required'),

	confirmPassword: string().when(
		'password',
		(password, schema) => string().equals(password).required('Password is required'),
		'passwords dont match'
	),
})
