import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../components/AuthContext'
import { axiosInterceptorsInstance } from '../../lib/axiosInstance'
import { useNavigate, useParams } from 'react-router-dom'
import {
	EmailItem,
	EmailItemSkeleton,
} from '../../components/UI/EmailItem/EmailItem'
import styles from './EmailListPage.module.css'

const EmailListPage = () => {
	const { emailCategory } = useParams()
	const [loading, setLoading] = useState()
	const [emails, setEmails] = useState([])
	const { user, initialLoading } = useContext(AuthContext)
	const navigate = useNavigate()

	useEffect(() => {
		const getEmails = async () => {
			try {
				setLoading(true)
				const response = await axiosInterceptorsInstance.get(
					`/emails/c/${emailCategory}`
				)
				setEmails(response.data)
				setLoading(false)
			} catch (e) {
				if (e?.response.status == 404) {
					navigate('/404')
				}
			}
		}

		getEmails()
	}, [emailCategory])

	return (
		<div className={styles.container}>
			<h1>category: {emailCategory}</h1>
			<ul className={styles.listContainer}>
				{initialLoading || loading
					? [1, 2, 3].map((_, indx) => (
							<li key={indx}>
								<EmailItemSkeleton />
							</li>
					  ))
					: emails.map((email) => (
							<li key={email._id}>
								<EmailItem emails={emails} setEmails={setEmails} {...email} />
							</li>
					  ))}
			</ul>
		</div>
	)
}

export default EmailListPage
