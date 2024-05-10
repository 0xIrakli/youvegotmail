import { Form, Field, Formik, ErrorMessage } from 'formik'
import TextInput from '../../components/UI/TextInput/TextInput'
import styles from './auth.module.css'
import { useContext, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { string, object } from 'yup'
import { axiosInstance } from '../../lib/axiosInstance'
import { Button } from '../../components/UI/Button/Button'
import { AuthContext } from '../../components/AuthContext'

const validationSchema = object({
	email: string()
		.max(50)
		.matches(/^\S+@\S+\.\S+$/, 'Please enter valid Email address')
		.required('Email is required'),
	password: string().trim().min(8).max(20).required('Password is required'),
})

const LoginPage = () => {
	const { setUser } = useContext(AuthContext)
	const [error, setError] = useState(null)
	const initialValues = {
		email: '',
		password: '',
	}

	const loginUser = async (formValues, { setSubmitting }) => {
		try {
			const res = await axiosInstance.post('/user/login', formValues)
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
				onSubmit={loginUser}
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
							{error && <span>{error}</span>}
							<div>
								<span>
									Don't have an account? <NavLink to="/register">register</NavLink>
								</span>
								<Button type="submit">Login</Button>
							</div>
						</Form>
					)
				}}
			</Formik>
		</div>
	)
}

export default LoginPage
