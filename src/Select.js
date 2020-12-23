import React, {Fragment, useContext} from 'react'
import FieldContext from './FieldContext'
import styles from './Select.module.css'

export default (props) => {
    const field = useContext(FieldContext)

    let style = props.style
    if (field.style) {
        style = {...style, ...field.style}
    }

    return <div className={styles.Select} style={style}>
        <label htmlFor={field.id}>
            {field.label}
        </label>
        <select
            id={field.id}
            value={field.value || ''}
            onBlur={field.onBlur}
            onChange={event => field.onNewValue(event.target.value)}
        >
            {props.children}
        </select>
        <div className={styles['Select-error']}>
            {field.error || <>&nbsp;</>}
        </div>
    </div>
}
