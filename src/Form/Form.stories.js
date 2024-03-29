import Form from './index'
import React, {useState} from 'react'
import Checkbox from '../Checkbox'
import Field from '../Field'
import Radio from '../Radio'
import Text from '../Text'
import Select from '../Select'
import FieldGroup from '../FieldGroup'
import TextArea from '../TextArea'

export default {
    title: 'Form'
}

export const Basic = () => <Form/>

export const WithFields = () => {
    const [value, setValue] = useState({firstName: 'Wilma'})

    return (
        <Form value={value} onChange={setValue}>
            <Field name='firstName'>
                <Text/>
            </Field>
            <Field name='lastName'>
                <Text/>
            </Field>
            <Field name='numberOfFish'>
                <Text type='number'/>
            </Field>
            <Field name='favoriteIceCream'>
                <Select>
                    <option value=''/>
                    <option value='vanilla'>Vanilla</option>
                    <option value='chocolate'>Chocolate</option>
                </Select>
            </Field>
            Value: {JSON.stringify(value)}
        </Form>
    )
}

export const WithValidation = () => {
    const [valid, setValid] = useState(false)
    const [message, setMessage] = useState()

    return (
        <Form onValid={(b) => setValid(b)} value={{firstName: 'Sue'}}>
            <Field
                name='firstName'
                onValidate={(v) => ((v && v.length < 5) ? 'Too short!' : null)}
            >
                <Text/>
            </Field>
            <Field name='lastName'>
                <Text/>
            </Field>
            <Field
                name='favoriteIceCream'
                onValidate={(v) => (v === 'vanilla' ? 'Cannot be vanilla' : null)}
            >
                <Select>
                    <option value=''/>
                    <option value='vanilla'>Vanilla</option>
                    <option value='chocolate'>Chocolate</option>
                </Select>
            </Field>
            <button
                disabled={!valid}
                onClick={event => {
                    event.preventDefault()
                    setMessage('Form submitted')
                }}>
                Submit
            </button>
            {message}
        </Form>
    )
}

export const WithExternalError = () => {
    const [error, setError] = useState()

    return (
        <Form
            value={{firstName: 'Brian'}}
            errors={error ? {firstName: error} : null}
        >
            <Field
                name='firstName'
                onValidate={(v) => ((v && v.length < 5) ? 'Too short!' : null)}
            >
                <Text/>
            </Field>
            <Field name='lastName'>
                <Text/>
            </Field>
            <button onClick={event => {
                event.preventDefault()
                setError('Something went wrong!')
            }}>
                Create external error
            </button>
        </Form>
    )
}

export const WithMultipleFields = () => {
    const [value, setValue] = useState({})

    return (
        <Form value={{firstName: 'Brian'}} onChange={setValue}>
            <FieldGroup>
                <Field name='firstName'>
                    <Text/>
                </Field>
                <Field
                    name='middleName'
                    onValidate={(v) => ((v && v.length < 4) ? 'Too short!' : null)}
                >
                    <Text/>
                </Field>
                <Field
                    name='lastName'
                    onValidate={(v) => ((v && v.length < 4) ? 'Too short!' : null)}
                >
                    <Text/>
                </Field>
            </FieldGroup>
            <FieldGroup>
                <Field name='addressLine1'>
                    <Text/>
                </Field>
                <Field name='addressLine2'>
                    <Text/>
                </Field>
            </FieldGroup>
            <FieldGroup>
                <Field name='addressLine3'>
                    <Text/>
                </Field>
                <Field name='addressLine4'>
                    <Text/>
                </Field>
                <Field name='addressLine5'>
                    <Text/>
                </Field>
                <Field
                    name='favoriteIceCream'
                    onValidate={(v) => (v === 'vanilla' ? 'Cannot be vanilla' : null)}
                >
                    <Select>
                        <option value=''/>
                        <option value='vanilla'>Vanilla</option>
                        <option value='chocolate'>Chocolate</option>
                    </Select>
                </Field>
            </FieldGroup>
            <FieldGroup label='Drink'>
                <Field name='drink'>
                    <Radio value='whiskey'>Whiskey</Radio>
                </Field>
                <Field name='drink'>
                    <Radio value='gin'>Gin</Radio>
                </Field>
                <Field name='drink'>
                    <Radio value='vermouth'>Vermouth</Radio>
                </Field>
                <Field name='drink'>
                    <Radio value='rum' disabled>Rum</Radio>
                </Field>
                <Field name='drink'>
                    <Radio value='beer'>Beer</Radio>
                </Field>
                <Field name='drink'>
                    <Radio value='vodka'>Vodka</Radio>
                </Field>
            </FieldGroup>
            <Field name='flanged'>
                <Checkbox/>
            </Field>
            <Field name='numberOfFish'>
                <Text type='number'/>
            </Field>
            <Field name='description'>
                <TextArea rows={8}/>
            </Field>
            Value: {JSON.stringify(value)}
        </Form>
    )
}
