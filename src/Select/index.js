import React, {Fragment} from 'react'
import useField from '../Field/useField'
import './Select.css'

export default (props) => {
    const field = useField()

    let style = props.style
    if (field.style) {
        style = {...style, ...field.style}
    }

    return <div className='Select' style={style}>
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
        <div className='Select-error'>
            {field.error || <>&nbsp;</>}
        </div>
    </div>
}
