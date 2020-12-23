import React, {useContext, useEffect} from 'react'
import FormContext from './FormContext'
import FieldContext from './FieldContext'

const splitCamelCase = (s) =>
    s
        .replace(
            /([a-z0-9])([A-Z0-9])/g,
            (p0, p1, p2) => p1 + ' ' + p2.toLowerCase()
        )
        .replace(/^([a-z])/, (x) => x.toUpperCase())

export default (props) => {
    const form = useContext(FormContext)

    const value = form.value(props.name)

    useEffect(() => {
        form.setValue(props.name, value || '')
    }, [props.name])

    useEffect(() => {
        if (props.onValidate) {
            form.setInvalid(props.name, props.onValidate(value || ''))
        }
    }, [props.onValidate, value])

    const fieldProps = {
        id: props.name,
        label: splitCamelCase(props.name),
        value,
        onBlur: () => form.setDirty(props.name),
        onNewValue: (newValue) => {
            form.setDirty(props.name)
            form.setValue(props.name, newValue)
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
