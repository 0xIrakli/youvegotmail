import { useContext, useEffect, useState } from 'react'
import { axiosInstance, axiosInterceptorsInstance } from '../../../lib/axiosInstance'
import { AuthContext } from '../../AuthContext'
import { NavButton, Button, ButtonSkeleton } from '../Button/Button'
import InboxIcon from '../../../assets/inbox.svg'
import SentIcon from '../../../assets/sent.svg'
import ArchivedIcon from '../../../assets/archived.svg'
import ComposeIcon from '../../../assets/compose.svg'

import LoginIcon from '../../../assets/login.svg'
import RegisterIcon from '../../../assets/register.svg'
import LogoutIcon from '../../../assets/logout.svg'

import {
	IconButtonSkeleton,
	IconButton,
	NavIconButton,
} from '../IconButton/IconButton'
import { NavLink, useNavigate } from 'react-router-dom'
import styles from './Header.module.css'

export const Header = () => {
	const navigate = useNavigate()
	const { user, setUser, initialLoading } = useContext(AuthContext)

	const logoutUser = async () => {
		try {
			const response = await axiosInterceptorsInstance.delete('/user/logout')
			setUser(null)
			navigate('/login')
		} catch (error) {
			console.log(error.message)
		}
	}

	return (
		<header className={styles.header}>
			<NavLink className={styles.fullSize} to="/" style={{ textDecoration: 'none' }}>
				<h1>You'veGotMail!</h1>
			</NavLink>
			{initialLoading ? (
				<div>
					<IconButtonSkeleton src={InboxIcon} className={styles.mobile}>
						Inbox
					</IconButtonSkeleton>
					<IconButtonSkeleton src={SentIcon} className={styles.mobile}>
						Sent
					</IconButtonSkeleton>
					<ButtonSkeleton>Inbox</ButtonSkeleton>
					<ButtonSkeleton>Sent</ButtonSkeleton>
				</div>
			) : (
				user && (
					<>
						<div className={styles.mobile}>
							<NavIconButton src={InboxIcon} to="/c/inbox" />
							<NavIconButton src={SentIcon} to="/c/sent" />
							<NavIconButton src={ArchivedIcon} to="/c/archived" />
							<NavIconButton src={ComposeIcon} to="/compose" />
						</div>

						<div className={styles.fullSize}>
							<NavButton to="/c/inbox">Inbox</NavButton>
							<NavButton to="/c/sent">Sent</NavButton>
							<NavButton to="/c/archived">Archived</NavButton>
							<NavButton to="/compose">Compose</NavButton>
						</div>
					</>
				)
			)}
			<div className={styles.authButtons}>
				<h4 className={styles.fullSize}>{user && user.email}</h4>
				{initialLoading ? (
					<>
						<div className={styles.mobile}>
							<IconButtonSkeleton src={LoginIcon} />
							<IconButtonSkeleton src={RegisterIcon} />
						</div>

						<div className={styles.fullSize}>
							<ButtonSkeleton>log in</ButtonSkeleton>
							<ButtonSkeleton>register</ButtonSkeleton>
						</div>
					</>
				) : user ? (
					<>
						<div className={styles.mobile}>
							<IconButton onClick={logoutUser} src={LogoutIcon} />
						</div>

						<div className={styles.fullSize}>
							<Button onClick={logoutUser}>log out</Button>
						</div>
					</>
				) : (
					<>
						<div className={styles.mobile}>
							<NavIconButton src={LoginIcon} to="/login" />
							<NavIconButton src={RegisterIcon} to="/register" />
						</div>
						<div className={styles.fullSize}>
							<NavButton to="/login">login</NavButton>
							<NavButton to="/register">register</NavButton>
						</div>
					</>
				)}
			</div>
		</header>
	)
}
