import styles from './TextInput.module.css'
import { Field } from 'formik'

const TextInput = ({ id, type = 'text', name = id }) => {
	return <Field className={styles.textInput} id={id} name={name} type={type} />
}

export default TextInput
