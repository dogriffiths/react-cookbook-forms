import React from 'react'
import Form from '../Form'
import Field from '../Field'
import FieldGroup from '../FieldGroup'
import Checkbox from './index'

export default {
    title: 'Checkbox',
}

export const Basic = () => {
    return <Form>
        <Field name='field1'>
            <Checkbox/>
        </Field>
    </Form>
}

export const WithValue = () => {
    return <Form value={{field1: true}}>
        <Field name='field1'>
            <Checkbox/>
        </Field>
    </Form>
}

export const WithValidation = () => {
    return <Form>
        <Field name='field1' onValidate={v => v ? 'Cannot be checked' : null}>
            <Checkbox/>
        </Field>
    </Form>
}

export const InAFieldGroup = () => {
    return <Form>
        <FieldGroup>
            <Field name='field1'>
                <Checkbox/>
            </Field>
            <Field name='field2'>
                <Checkbox/>
            </Field>
            <Field name='field3'>
                <Checkbox/>
            </Field>
            <Field name='field4'>
                <Checkbox/>
            </Field>
            <Field name='field5'>
                <Checkbox/>
            </Field>
        </FieldGroup>
    </Form>
}
