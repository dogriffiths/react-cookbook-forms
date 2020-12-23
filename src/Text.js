import React, {Fragment, useContext} from 'react'
import FieldContext from './FieldContext'
import styles from './Text.module.css'

export default (props) => {
    const field = useContext(FieldContext)

    const {type, ...otherProps} = props

    return (
        <div className={styles.Text}>
            <label htmlFor={field.id}>{field.label}</label>
            <input
                id={field.id}
                value={field.value || ''}
                onBlur={field.onBlur}
                onChange={(event) => {
                    if (type === 'number') {
                        field.onNewValue(parseFloat(event.target.value))
                    } else {
                        field.onNewValue(event.target.value)
                    }
                }}
                type={type}
                {...otherProps}
            />
            <div className={styles['Text-error']}>{field.error || <> &nbsp;</>}</div>
        </div>
    )
}
