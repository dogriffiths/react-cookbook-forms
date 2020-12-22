import './PlayForm.css'
import {useCallback, useEffect, useState} from 'react'
import FormContext from './FormContext'
import useDeepCompare from './useDeepCompare'

function updateWith(oldValue, field, value) {
    const newValue = {...oldValue}
    newValue[field] = value
    return newValue
}

export default (props) => {
    const [values, setValues] = useState({})
    const [errors, setErrors] = useState({})
    const [dirtyFields, setDirtyFields] = useState({})

    useDeepCompare(() => {
        if (props.value) {
            setValues(props.value || {})
        }
    }, [props.value])

    useEffect(() => {
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
    const getValue = useCallback((field) => values[field], [values])
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
    const getDirty = useCallback(
        (field) => props.errors || Object.keys(dirtyFields).includes(field),
        [dirtyFields]
    )

    useEffect(() => {
        if (props.onChange) {
            props.onChange(values)
        }
    }, [props.onChange, values])

    const form = {
        setValue,
        value: getValue,
        setDirty,
        isDirty: getDirty,
        setInvalid,
        getError
    }

    return (
        <form
            className={`PlayForm-container ${props.className ? props.className : ''}`}
        >
            <FormContext.Provider value={form}>{props.children}</FormContext.Provider>
        </form>
    )
}
