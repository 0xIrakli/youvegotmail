import styles from './EmailItem.module.css'
import trashIcon from '../../../assets/trash.svg'
import { Button, ButtonSkeleton } from '../Button/Button'
import { IconButton, IconButtonSkeleton } from '../IconButton/IconButton'
import { axiosInterceptorsInstance } from '../../../lib/axiosInstance'

export const EmailItem = ({
	emails,
	setEmails,
	_id,
	sender,
	recipients,
	subject,
	createdAt: sentAt,
}) => {
	const date = new Date(sentAt)
	const weekday = date.toLocaleString('ge', { dateStyle: 'full' })

	// const deleteEmail = async () => {
	// 	const response = await axiosInterceptorsInstance.delete(`/emails/${_id}`)
	// 	console.log(response)
	// 	setEmails([...emails].filter(({ _id: emailId }) => emailId !== _id))
	// }
	const deleteEmail = () => {}

	return (
		<div className={styles.container}>
			<span>
				<span>sender:</span>
				<strong>{sender.email}</strong>
			</span>
			<span>{subject}</span>
			<span>
				<span>
					{date.toLocaleString('ge', {
						weekday: 'short',
						month: 'short',
						day: 'numeric',
					})}
				</span>
				<IconButton src={trashIcon} onClick={deleteEmail} />
			</span>
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
