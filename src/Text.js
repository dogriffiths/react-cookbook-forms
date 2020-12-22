import {useContext} from 'react'
import FieldContext from './FieldContext'
import './Text.css'

export default ({type}) => {
    const field = useContext(FieldContext)

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
            />
            <div className='Text-error'>{field.error || <> &nbsp;</>}</div>
        </div>
    )
}
