import { NavLink } from 'react-router-dom'
import styles from './IconButton.module.css'

export const IconButton = ({ src, ...props }) => {
	return (
		<button {...props} className={styles.button}>
			<img src={src} />
		</button>
	)
}

export const NavIconButton = ({ to, src }) => {
	return (
		<NavLink
			to={to}
			className={({ isActive }) =>
				isActive ? `${styles.button} ${styles.active}` : styles.button
			}>
			<img src={src} />
		</NavLink>
	)
}

export const IconButtonSkeleton = ({ src }) => {
	return (
		<button disabled={true} className={styles.skeleton} aria-hidden="true">
			<img src={src} />
		</button>
	)
}
