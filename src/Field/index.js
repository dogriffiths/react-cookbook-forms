import React, {useContext, useEffect, useState} from 'react'
import FormContext from '../Form/FormContext'
import FieldContext from '../Field/FieldContext'

const splitCamelCase = (s) =>
    s
        .replace(
            /([a-z0-9])([A-Z0-9])/g,
            (p0, p1, p2) => p1 + ' ' + p2.toLowerCase()
        )
        .replace(/^([a-z])/, (x) => x.toUpperCase())

const Field = (props) => {
    const form = useContext(FormContext)

    const value = form.value(props.name)

    const [inFieldError, setInFieldError] = useState()

    useEffect(() => {
        form.setValue(props.name, value || '')
    }, [props.name])

    useEffect(() => {
        if (inFieldError) {
            form.setInvalid(props.name, inFieldError)
        } else if (props.onValidate) {
            form.setInvalid(props.name, props.onValidate(value || ''))
        }
    }, [props.onValidate, value, inFieldError])

    const fieldProps = {
        id: props.name,
        label: splitCamelCase(props.name),
        value,
        onBlur: () => form.setDirty(props.name),
        onNewValue: (newValue, errorMessage) => {
            form.setDirty(props.name)
            form.setValue(props.name, newValue)
            setInFieldError(errorMessage)
        },
        error: form.isDirty(props.name) && form.getError(props.name),
        style: form.style || {}
    }

    return (
        <FieldContext.Provider value={fieldProps}>
            {props.children}
        </FieldContext.Provider>
    )
}

export default Field
