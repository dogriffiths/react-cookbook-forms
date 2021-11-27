import React, {Fragment} from 'react'
import useField from '../Field/useField'
import './Checkbox.css'

const Checkbox = (props) => {
    const field = useField()

    return (
        <div className='Checkbox'>
            <div className='Checkbox-inner'>
                <input
                    id={field.id}
                    name={field.id}
                    type='checkbox'
                    checked={field.value || false}
                    onChange={e => {
                        field.onNewValue(e.target.checked)
                    }}
                    {...props}
                />
                <label htmlFor={field.id}>{field.label}</label>
            </div>
            <div className='Checkbox-error'>{field.error || <> &nbsp;</>}</div>
        </div>
    )
}

export default Checkbox
