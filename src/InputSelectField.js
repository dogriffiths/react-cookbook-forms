import {useContext} from 'react'
import FieldContext from './FieldContext'

export default (props) => {
    const field = useContext(FieldContext)

    let style = props.style
    if (field.style) {
        style = {...style, ...field.style}
    }

    return <div className='InputSelectField' style={style}>
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
        {
            field.error &&
            <div className='InputSelectField-error'>
                {field.error}
            </div>
        }
    </div>
}
