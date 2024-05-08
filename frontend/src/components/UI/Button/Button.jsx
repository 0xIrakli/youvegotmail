import { NavLink } from 'react-router-dom'
import styles from './Button.module.css'

export const Button = ({ type = 'submit', children }) => {
	return (
		<button type={type} className={styles.button}>
			{children}
		</button>
	)
}

export const NavButton = ({ to, children }) => {
	return (
		<NavLink
			to={to}
			className={({ isActive }) =>
				isActive ? `${styles.button} ${styles.active}` : styles.button
			}>
			{children}
		</NavLink>
	)
}

export const ButtonSkeleton = ({ children }) => {
	return (
		<button disabled={true} className={styles.skeleton}>
			{children}
		</button>
	)
}
