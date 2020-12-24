import React, {Fragment, useContext} from 'react'
import FieldContext from './FieldContext'
import './TextArea.css'

export default (props) => {
    const field = useContext(FieldContext)

    return (
        <div className='TextArea'>
            <label htmlFor={field.id}>{field.label}</label>
            <textarea
                id={field.id}
                onBlur={field.onBlur}
                value={field.value || ''}
                onChange={(event) => {
                    field.onNewValue(event.target.value)
                }}
                {...props}
            />
            <div className='TextArea-error'>{field.error || <> &nbsp;</>}</div>
        </div>
    )
}
