import styles from './Button.module.css'

export const Button = ({ children }) => {
	return <button className={styles.button}>{children}</button>
}

export const ButtonSkeleton = ({ children }) => {
	return (
		<button disabled={true} className={styles.skeleton}>
			{children}
		</button>
	)
}
