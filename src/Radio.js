import React, {Fragment, useContext} from 'react'
import FieldContext from './FieldContext'
import './Text.css'

export default (props) => {
    const field = useContext(FieldContext)

    const {value, children, ...otherProps} = props

    return (
        <div className='Radio'>
            <div className='Radio' style={{display: 'flex', flexDirection: 'row'}}>
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
                <label htmlFor={field.value}>{children}</label>
            </div>
            <div className='Text-error'>{field.error || <> &nbsp;</>}</div>
        </div>
    )
}
