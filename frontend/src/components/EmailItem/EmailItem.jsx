import styles from './EmailItem.module.css'
import trashIcon from '../../assets/trash.svg'
import { Button, ButtonSkeleton } from '../UI/Button/Button'
import { IconButton, IconButtonSkeleton } from '../UI/IconButton/IconButton'
import { axiosInterceptorsInstance } from '../../lib/axiosInstance'
import { NavLink, useNavigate } from 'react-router-dom'

export const EmailItem = ({
	emails,
	setEmails,
	_id,
	sender,
	recipients,
	subject,
	category,
	createdAt: sentAt,
}) => {
	const date = new Date(sentAt)
	const weekday = date.toLocaleString('ge', { dateStyle: 'full' })
	const navigate = useNavigate()

	const deleteEmail = async () => {
		const response = await axiosInterceptorsInstance.delete(`/emails/${_id}`)
		setEmails([...emails].filter(({ _id: emailId }) => emailId !== _id))
	}

	return (
		<div className={styles.container}>
			<NavLink to={`/c/${category}/${_id}`} className={styles.clickable}>
				<span className={styles.fullSize}>
					<strong>{sender.email}</strong>
				</span>
				<span>
					{subject.substring(0, 12)}
					{subject.substring(0, 12) == subject ? '' : '...'}
				</span>
				<span>
					<span>
						{date.toLocaleString('ge', {
							weekday: 'short',
							month: 'short',
							day: 'numeric',
						})}
					</span>
				</span>
			</NavLink>
			<IconButton src={trashIcon} onClick={deleteEmail} />
		</div>
	)
}

export const EmailItemSkeleton = () => {
	return (
		<div className={styles.skeleton} aria-hidden="true">
			<span>example.example@gmail.com</span>
			<span>subject</span>
			<span>
				<IconButtonSkeleton>DEL</IconButtonSkeleton>
			</span>
		</div>
	)
}
