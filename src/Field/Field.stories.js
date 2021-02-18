import React from 'react'
import Form from '../Form'
import {Field} from '../index'
import useField from '../Field/useField'

export default {
    title: 'Field',
    argTypes: {}
}

const ValidatingText = (props) => {
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
                        field.onNewValue(event.target.value, event.target.value.length < 4 ? null : 'Too long!')
                    }
                }}
                type={type}
                {...otherProps}
            />
            <div className='Text-error'>{field.error || <> &nbsp;</>}</div>
        </div>
    )
}

export const ValidationWithinFieldComponent = () => {
    return <Form>
        <Field name='field1' onValidate={v => (v && v.length < 2) ? 'Too short!' : null}>
            <ValidatingText type='text'/>
        </Field>
    </Form>
}
