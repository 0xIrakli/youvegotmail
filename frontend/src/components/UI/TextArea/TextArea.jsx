import styles from './TextArea.module.css'
import { Field } from 'formik'

const TextInput = ({ id, type = 'text', name = id, ...props }) => {
	return (
		<Field
			as="textarea"
			className={styles.textArea}
			id={id}
			name={name}
			type={type}
			{...props}
		/>
	)
}

export default TextInput
