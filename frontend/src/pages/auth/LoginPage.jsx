import { Form, Field, Formik, ErrorMessage } from 'formik'
import TextInput from '../../components/UI/TextInput/TextInput'
import styles from './auth.module.css'
import { useContext, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { string, object } from 'yup'
import { axiosInstance } from '../../lib/axiosInstance'
import { Button } from '../../components/UI/Button/Button'
import { AuthContext } from '../../components/AuthContext'
import { loginSchema } from '../../../../frontend/validationSchemas'

const LoginPage = () => {
	const { setUser } = useContext(AuthContext)
	const [error, setError] = useState(null)
	const initialValues = {
		email: '',
		password: '',
	}

	const loginUser = async (formValues, { setSubmitting }) => {
		try {
			setSubmitting(true)
			const res = await axiosInstance.post('/user/login', formValues)
			setUser(res.data)
		} catch (e) {
			setError(e.response?.data.message ?? e.message)
		}
		setSubmitting(false)
	}

	return (
		<div className={styles.formContainer}>
			<Formik
				initialValues={initialValues}
				onSubmit={loginUser}
				validationSchema={loginSchema}>
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
							{error && (
								<div className={styles.error} style={{ marginLeft: 'auto' }}>
									{error}
								</div>
							)}
							<div>
								<span>
									Don't have an account? <NavLink to="/register">register</NavLink>
								</span>
								<Button type="submit" disabled={formikProps.isSubmitting}>
									Login
								</Button>
							</div>
						</Form>
					)
				}}
			</Formik>
		</div>
	)
}

export default LoginPage
