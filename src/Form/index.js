import React, {useCallback, useEffect, useState} from 'react'
import isEqual from 'lodash/isEqual'
import FormContext from './FormContext'
import useDeepEffect from '../useDeepEffect'
import './Form.css'

function updateWith(oldValue, field, value) {
    const newValue = {...oldValue}

    if (value === undefined) {
        delete newValue[field]
    } else {
        newValue[field] = value
    }

    return newValue
}

const Form = (props) => {
    const [values, setValues] = useState(props.value || {})
    const [errors, setErrors] = useState({})
    const [dirtyFields, setDirtyFields] = useState({})

    useDeepEffect(() => {
        if (props.value) {
            setValues(props.value || {})
        }
    }, [props.value])

    useDeepEffect(() => {
        if (props.onValid) {
            props.onValid(
                Object.keys(errors).every((i) => !errors[i]),
                errors
            )
        }
    }, [props.onValid, errors])

    useEffect(() => {
        if (props.errors) {
            setErrors((f) => ({...f, ...props.errors}))
            setDirtyFields({})
        }
    }, [props.errors])

    const setValue = useCallback(
        (field, v) => setValues((vs) => updateWith(vs, field, v)),
        [setValues]
    )
    const value = useCallback((field) => values[field], [values])
    const setInvalid = useCallback(
        (field, error) => {
            setErrors((i) => updateWith(i, field, error || undefined))
        },
        [setErrors]
    )
    const getError = useCallback(
        (field) => {
            return props.errors &&
            field in props.errors &&
            Object.keys(dirtyFields).length === 0
                ? props.errors[field]
                : errors[field]
        },
        [errors]
    )
    const setDirty = useCallback(
        (field) => setDirtyFields((df) => updateWith(df, field, true)),
        [setDirtyFields]
    )
    const isDirty = useCallback(
        (field) => props.errors || Object.keys(dirtyFields).includes(field),
        [dirtyFields]
    )

    useDeepEffect(() => {
        if (props.onChange) {
            if (!isEqual(props.value, values)) {
                props.onChange(values)
            }
        }
    }, [values])

    const form = {
        setValue,
        value,
        setDirty,
        isDirty,
        setInvalid,
        getError
    }

    return (
        <form
            className={`Form ${props.className ? props.className : ''}`}
        >
            <FormContext.Provider value={form}>{props.children}</FormContext.Provider>
        </form>
    )
}

export default Form
