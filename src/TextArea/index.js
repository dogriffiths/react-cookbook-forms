import React, {Fragment} from 'react'
import useField from '../Field/useField'
import './TextArea.css'

const TextArea = (props) => {
    const field = useField()

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

export default TextArea
