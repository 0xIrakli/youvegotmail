import { useContext, useEffect, useState } from 'react'
import { axiosInstance } from '../../../lib/axiosInstance'
import { AuthContext } from '../../AuthContext'
import { Button, ButtonSkeleton } from '../Button/Button'
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
						<ButtonSkeleton>Compose</ButtonSkeleton>
						<ButtonSkeleton>Inbox</ButtonSkeleton>
						<ButtonSkeleton>Sent</ButtonSkeleton>
						<ButtonSkeleton>Archived</ButtonSkeleton>
					</>
				) : (
					user && (
						<>
							<Button>Inbox</Button>
							<Button>Sent</Button>
							<Button>Archived</Button>
							<Button>Compose</Button>
						</>
					)
				)}
			</div>

			<div className={styles.authButtons}>
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
						<Button>log in</Button>
						<Button>register</Button>
					</>
				)}
			</div>
		</header>
	)
}
