import React, {Fragment} from 'react'
import useField from '../Field/useField'
import './Text.css'

export default (props) => {
    const field = useField()

    const {type, ...otherProps} = props

    return (
        <div className='Text'>
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
            <div className='Text-error'>{field.error || <> &nbsp;</>}</div>
        </div>
    )
}
