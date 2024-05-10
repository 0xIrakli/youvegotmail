import { NavLink } from 'react-router-dom'
import styles from './Button.module.css'

export const Button = ({ children, ...props }) => {
	return (
		<button {...props} className={styles.button}>
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
		<button disabled={true} className={styles.skeleton} aria-hidden="true">
			{children}
		</button>
	)
}
