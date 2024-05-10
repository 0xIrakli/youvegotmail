import { Form, Field, Formik, ErrorMessage } from 'formik'
import TextInput from '../../components/UI/TextInput/TextInput'
import styles from './auth.module.css'
import { useContext, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { string, object } from 'yup'
import { Button } from '../../components/UI/Button/Button'
import { axiosInstance } from '../../lib/axiosInstance'
import { AuthContext } from '../../components/AuthContext'

const validationSchema = object({
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

const RegisterPage = () => {
	const { setUser } = useContext(AuthContext)
	const [error, setError] = useState(null)
	const initialValues = {
		email: '',
		password: '',
		confirmPassword: '',
	}

	const registerUser = async (formValues, { setSubmitting }) => {
		try {
			const res = await axiosInstance.post('/user/register', formValues)
			setUser(res.data)
			setSubmitting(false)
		} catch (e) {
			setError(error.response?.data.message ?? error.message)
		}
	}

	return (
		<div className={styles.formContainer}>
			<Formik
				initialValues={initialValues}
				onSubmit={registerUser}
				validationSchema={validationSchema}>
				{(formikProps) => {
					return (
						<Form className={styles.form}>
							<div>
								<label htmlFor="email">Email</label>
								<TextInput id="email" />
								<ErrorMessage
									name="email"
									component="span"
									className={styles.error}
								/>
							</div>
							<div>
								<label htmlFor="password">Password</label>
								<TextInput id="password" type="password" />
								<ErrorMessage
									name="password"
									component="span"
									className={styles.error}
								/>
							</div>
							<div>
								<label htmlFor="confirmPassword">Confirm Password</label>
								<TextInput id="confirmPassword" type="password" />
								<ErrorMessage
									name="confirmPassword"
									component="span"
									className={styles.error}
								/>
							</div>
							{error && <span>{error}</span>}
							<div>
								<span>
									Already have an account? <NavLink to="/login">login</NavLink>
								</span>
								<Button type="submit" disabled={formikProps.isSubmitting}>
									register
								</Button>
							</div>
						</Form>
					)
				}}
			</Formik>
		</div>
	)
}

export default RegisterPage
