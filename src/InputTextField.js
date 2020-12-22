import {useContext} from 'react'
import FieldContext from './FieldContext'

export default ({type}) => {
    const field = useContext(FieldContext)

    return (
        <div className='InputTextField'>
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
            {field.error && <div className='InputTextField-error'>{field.error}</div>}
        </div>
    )
}
