import React, {Fragment} from 'react'
import useField from '../Field/useField'
import './Radio.css'

export default (props) => {
    const field = useField()

    const {value, children, ...otherProps} = props

    return (
        <div className='Radio'>
            <div className='Radio-control'>
                <input
                    id={field.value}
                    type='radio'
                    name={field.id}
                    value={value || ''}
                    onBlur={field.onBlur}
                    onChange={(event) => {
                        field.onNewValue(event.target.value)
                    }}
                    {...otherProps}
                />
                <label htmlFor={field.value}>{children || value || field.label}</label>
            </div>
            <div className='Radio-error'>{field.error || <> &nbsp;</>}</div>
        </div>
    )
}