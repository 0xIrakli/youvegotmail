import { Form, Field, Formik, ErrorMessage } from 'formik'
import TextInput from '../../components/UI/TextInput/TextInput'
import TextArea from '../../components/UI/TextArea/TextArea'
import styles from './ComposePage.module.css'
import { useContext, useEffect, useRef, useState } from 'react'
import { string, object } from 'yup'
import { axiosInstance, axiosInterceptorsInstance } from '../../lib/axiosInstance'
import { Button } from '../../components/UI/Button/Button'
import { AuthContext } from '../../components/AuthContext'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { emailSchema } from '../../../../backend/validationSchemas'

const _initialValues = {
	body: '',
	subject: '',
	recipients: '',
}

const ComposePage = () => {
	const { user } = useContext(AuthContext)
	const [error, setError] = useState(null)
	const navigate = useNavigate()

	const textareaRef = useRef()

	const initialValues = useLocation().state || _initialValues

	useEffect(() => {
		textareaRef.current.focus()
		textareaRef.current.setSelectionRange(0, 0)
	}, [])

	const sendEmail = async (formValues, { setSubmitting }) => {
		try {
			const response = await axiosInterceptorsInstance.post('/emails', formValues)
			navigate('/c/inbox')
		} catch (e) {
			setError(e.response?.data.message ?? e.message)
		}
	}

	return (
		<div className={styles.formContainer}>
			<Formik
				initialValues={initialValues}
				onSubmit={sendEmail}
				validationSchema={emailSchema}>
				{(formikProps) => {
					return (
						<Form className={styles.form}>
							{error && (
								<span className={styles.error} style={{ marginLeft: 'auto' }}>
									{error}
								</span>
							)}
							<div>
								<label htmlFor="recipients">Recipients</label>
								<TextInput id="recipients" />
								<ErrorMessage
									name="recipients"
									component="span"
									className={styles.error}
								/>
							</div>
							<div>
								<label htmlFor="subject">Subject</label>
								<TextInput id="subject" type="text" />
								<ErrorMessage
									name="subject"
									component="span"
									className={styles.error}
								/>
							</div>

							<div>
								<label htmlFor="body">Body</label>
								<TextArea id="body" innerRef={textareaRef} />
								<ErrorMessage
									name="body"
									component="span"
									className={styles.error}
								/>
							</div>
							<div>
								<Button type="submit" disabled={formikProps.isSubmitting}>
									Send
								</Button>
							</div>
						</Form>
					)
				}}
			</Formik>
		</div>
	)
}

export default ComposePage
