import PlayForm from './PlayForm'
import React, {useState} from 'react'
import PlayField from './PlayField'
import InputTextField from './InputTextField'
import InputSelectField from './InputSelectField'
import PlayFieldGroup from './PlayFieldGroup'

export default {
    title: 'PlayForm'
}

export const Basic = () => <PlayForm/>

export const WithFields = () => {
    const [value, setValue] = useState({})

    return (
        <PlayForm onChange={setValue}>
            <PlayField name='firstName'>
                <InputTextField/>
            </PlayField>
            <PlayField name='lastName'>
                <InputTextField/>
            </PlayField>
            <PlayField name='numberOfFish'>
                <InputTextField type='number'/>
            </PlayField>
            <PlayField name='favoriteIceCream'>
                <InputSelectField>
                    <option value=''/>
                    <option value='vanilla'>Vanilla</option>
                    <option value='chocolate'>Chocolate</option>
                </InputSelectField>
            </PlayField>
            Value: {JSON.stringify(value)}
        </PlayForm>
    )
}

export const WithValidation = () => {
    const [valid, setValid] = useState(false)
    const [message, setMessage] = useState()

    return (
        <PlayForm onValid={(b) => setValid(b)} value={{firstName: 'Sue'}}>
            <PlayField
                name='firstName'
                onValidate={(v) => (v.length < 5 ? 'Too short!' : null)}
            >
                <InputTextField/>
            </PlayField>
            <PlayField name='lastName'>
                <InputTextField/>
            </PlayField>
            <PlayField
                name='favoriteIceCream'
                onValidate={(v) => (v === 'vanilla' ? 'Cannot be vanilla' : null)}
            >
                <InputSelectField>
                    <option value=''/>
                    <option value='vanilla'>Vanilla</option>
                    <option value='chocolate'>Chocolate</option>
                </InputSelectField>
            </PlayField>
            <button disabled={!valid} onClick={() => setMessage('Form submitted')}>
                Submit
            </button>
            {message}
        </PlayForm>
    )
}

export const WithExternalError = () => {
    const [error, setError] = useState()

    return (
        <PlayForm
            value={{firstName: 'Brian'}}
            errors={error ? {firstName: error} : null}
        >
            <PlayField
                name='firstName'
                onValidate={(v) => (v.length < 5 ? 'Too short!' : null)}
            >
                <InputTextField/>
            </PlayField>
            <PlayField name='lastName'>
                <InputTextField/>
            </PlayField>
            <button onClick={() => setError('Something went wrong!')}>
                Create external error
            </button>
        </PlayForm>
    )
}

export const WithMultipleFields = () => {
    const [value, setValue] = useState({})

    return (
        <PlayForm value={{firstName: 'Brian'}} onChange={setValue}>
            <PlayFieldGroup>
                <PlayField name='firstName'>
                    <InputTextField/>
                </PlayField>
                <PlayField
                    name='middleName'
                    onValidate={(v) => (v.length < 4 ? 'Too short!' : null)}
                >
                    <InputTextField/>
                </PlayField>
                <PlayField
                    name='lastName'
                    onValidate={(v) => (v.length < 4 ? 'Too short!' : null)}
                >
                    <InputTextField/>
                </PlayField>
            </PlayFieldGroup>
            <PlayFieldGroup>
                <PlayField name='addressLine1'>
                    <InputTextField/>
                </PlayField>
                <PlayField name='addressLine2'>
                    <InputTextField/>
                </PlayField>
            </PlayFieldGroup>
            <PlayFieldGroup>
                <PlayField name='addressLine3'>
                    <InputTextField/>
                </PlayField>
                <PlayField name='addressLine4'>
                    <InputTextField/>
                </PlayField>
                <PlayField name='addressLine5'>
                    <InputTextField/>
                </PlayField>
                <PlayField
                    name='favoriteIceCream'
                    onValidate={(v) => (v === 'vanilla' ? 'Cannot be vanilla' : null)}
                >
                    <InputSelectField>
                        <option value=''/>
                        <option value='vanilla'>Vanilla</option>
                        <option value='chocolate'>Chocolate</option>
                    </InputSelectField>
                </PlayField>
            </PlayFieldGroup>
            <PlayField name='numberOfFish'>
                <InputTextField type='number'/>
            </PlayField>
            Value: {JSON.stringify(value)}
        </PlayForm>
    )
}
