import { useContext, useEffect, useState } from 'react'
import { axiosInstance } from '../../../lib/axiosInstance'
import { AuthContext } from '../../AuthContext'
import { NavButton, Button, ButtonSkeleton } from '../Button/Button'
import { NavLink } from 'react-router-dom'
import styles from './Header.module.css'

export const Header = () => {
	const { user, setUser, initialLoading } = useContext(AuthContext)

	return (
		<header className={styles.header}>
			<NavLink to="/" style={{ textDecoration: 'none' }}>
				<h1>You'veGotMail!</h1>
			</NavLink>
			<div>
				{initialLoading ? (
					<>
						<ButtonSkeleton>Inbox</ButtonSkeleton>
						<ButtonSkeleton>Sent</ButtonSkeleton>
					</>
				) : (
					user && (
						<>
							<NavButton to="/c/inbox">Inbox</NavButton>
							<NavButton to="/c/sent">Sent</NavButton>
							<NavButton to="/c/archived">Archived</NavButton>
							<NavButton to="/compose">Compose</NavButton>
						</>
					)
				)}
			</div>
			<div className={styles.authButtons}>
				<h4>{user && user.email}</h4>
				{initialLoading ? (
					<>
						<ButtonSkeleton>log in</ButtonSkeleton>
						<ButtonSkeleton>register</ButtonSkeleton>
					</>
				) : user ? (
					<>
						<Button>log out</Button>
					</>
				) : (
					<>
						<NavButton to="/login">login</NavButton>
						<NavButton to="/register">register</NavButton>
					</>
				)}
			</div>
		</header>
	)
}
