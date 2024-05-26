import { Form, Field, Formik, ErrorMessage } from 'formik'
import TextInput from '../../components/UI/TextInput/TextInput'
import styles from './auth.module.css'
import { useContext, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { string, object } from 'yup'
import { Button } from '../../components/UI/Button/Button'
import { axiosInstance } from '../../lib/axiosInstance'
import { AuthContext } from '../../components/AuthContext'
import { registerSchema } from '../../../../backend/validationSchemas'

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
			setSubmitting(true)
			const res = await axiosInstance.post('/user/register', formValues)
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
				onSubmit={registerUser}
				validationSchema={registerSchema}>
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
							{error && (
								<div className={styles.error} style={{ marginLeft: 'auto' }}>
									{error}
								</div>
							)}
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
