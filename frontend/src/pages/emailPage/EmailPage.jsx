import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../components/AuthContext'
import { axiosInterceptorsInstance } from '../../lib/axiosInstance'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import styles from './EmailPage.module.css'
import { Button } from '../../components/UI/Button/Button'

const EmailPage = () => {
	const [loading, setLoading] = useState(false)
	const [email, setEmail] = useState(null)
	const { emailId } = useParams()
	const { user } = useContext(AuthContext)
	const navigate = useNavigate()
	const location = useLocation()

	const archiveEmail = async () => {
		try {
			const response = await axiosInterceptorsInstance.patch(`/emails/${emailId}`, {
				archived: !email.archived,
			})
			setEmail(response.data)

			if (response.data.archived) {
				navigate(`/c/archived/${response.data._id}`)
			} else {
				navigate(`/c/inbox/${response.data._id}`)
			}
		} catch (e) {
			console.log(e)
		}
	}

	const replyToEmail = () => {
		navigate('/compose', {
			state: {
				recipients: [email.sender, ...email.recipients]
					.map((rec) => rec.email)
					.filter((email) => email !== user.email)
					.join(','),
				subject: `Re: ${email.subject}`,
				body: `\n\n----\non ${email.createdAt}, ${email.sender.email} wrote:\n\n${email.body}\n`,
			},
		})
	}

	const deleteEmail = async () => {
		try {
			const response = await axiosInterceptorsInstance.delete(`/emails/${emailId}`)
			navigate('/c/inbox')
		} catch (e) {
			console.log(e)
		}
	}

	useEffect(() => {
		const getEmails = async () => {
			try {
				setLoading(true)
				const response = await axiosInterceptorsInstance.get(`/emails/${emailId}`)
				setEmail(response.data)
				setLoading(false)
			} catch (e) {
				if (e?.response.status == 404) {
					navigate('/404', { state: { url: location.pathname } })
				}
			}
		}

		getEmails()
	}, [emailId, navigate])

	if (!email) {
		return (
			<div className={styles.loadingContainer}>
				<h1>loading...</h1>
			</div>
		)
	}

	return (
		<div className={styles.container}>
			<div className={styles.title}>
				<h1>
					{email.subject ? (
						<>
							{/* <span>subject:</span> */}
							{email.subject}
						</>
					) : (
						<span>No Subject</span>
					)}
				</h1>
				<p>
					<span>from:</span>
					{email.sender.email}
				</p>
				<p>
					<span>to:</span>
					{email.recipients.map((recipient) => recipient.email).join(',')}
				</p>
			</div>
			<div className={styles.content}>
				<p>
					{email.body.split('\n').map((line) => (
						// miwers rom key prop chirdeba magram mgoni uaresi iqneba
						// tu spanebshi an raime componentshi movaqcev mtlianad rom key davumato
						<>
							{line}
							<br />
						</>
					))}
				</p>
			</div>
			<div className={styles.buttons}>
				<Button onClick={replyToEmail}>Reply</Button>
				<Button onClick={archiveEmail}>
					{email.archived ? 'Unarchive' : 'Archive'}
				</Button>
				<Button onClick={deleteEmail}>Delete</Button>
			</div>
		</div>
	)
}

export default EmailPage
