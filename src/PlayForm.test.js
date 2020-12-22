import PlayForm from './PlayForm'
import PlayField from './PlayField'
import {render, screen} from '@testing-library/react'
import user from '@testing-library/user-event'
import InputTextField from './InputTextField'
import {WithValidation} from './PlayForm.stories'

const sinon = require('sinon')

describe('PlayForm', () => {
    it('should be able to show fields', () => {
        render(
            <PlayForm>
                <PlayField name='firstName'>
                    <InputTextField/>
                </PlayField>
                <PlayField name='lastName'>
                    <InputTextField/>
                </PlayField>
            </PlayForm>
        )
        const firstName = screen.getByLabelText('First name')
        expect(firstName).toHaveValue('')
        const lastName = screen.getByLabelText('Last name')
        expect(lastName).toHaveValue('')
    })
    it('should send back changes', () => {
        const onChange = sinon.fake()
        render(
            <PlayForm onChange={onChange}>
                <PlayField name='firstName'>
                    <InputTextField/>
                </PlayField>
                <PlayField name='lastName'>
                    <InputTextField/>
                </PlayField>
            </PlayForm>
        )
        const firstName = screen.getByLabelText('First name')
        expect(firstName).toHaveValue('')
        const lastName = screen.getByLabelText('Last name')
        expect(lastName).toHaveValue('')
        user.type(firstName, 'Bill')
        sinon.assert.callCount(onChange, 6)
        sinon.assert.calledWith(onChange, {
            firstName: 'Bill',
            lastName: ''
        })
    })
    it('should validate what you type', () => {
        const onValid = sinon.fake()
        render(
            <PlayForm onValid={onValid}>
                <PlayField
                    name='firstName'
                    onValidate={(v) => (v.length < 5 ? 'Too short!' : null)}
                >
                    <InputTextField/>
                </PlayField>
            </PlayForm>
        )
        const firstName = screen.getByLabelText('First name')
        expect(firstName).toHaveValue('')
        user.type(firstName, 'Bill')
        screen.getByText('Too short!')
        sinon.assert.callCount(onValid, 7)
        sinon.assert.calledWith(onValid, false, {firstName: 'Too short!'})
        user.type(firstName, 'y')
        sinon.assert.calledWith(onValid, true, {})
    })
    it('should be able to pass in initial values', () => {
        render(
            <PlayForm
                value={{
                    firstName: 'Wilma',
                    lastName: 'Flintstone'
                }}
            >
                <PlayField name='firstName'>
                    <InputTextField/>
                </PlayField>
                <PlayField name='lastName'>
                    <InputTextField/>
                </PlayField>
            </PlayForm>
        )
        const firstName = screen.getByLabelText('First name')
        expect(firstName).toHaveValue('Wilma')
        const lastName = screen.getByLabelText('Last name')
        expect(lastName).toHaveValue('Flintstone')
    })
    it('should not show validation errors unless you have touched the field', () => {
        const onValid = sinon.fake()
        render(
            <PlayForm onValid={onValid} value={{firstName: 'Sue'}}>
                <PlayField
                    name='firstName'
                    onValidate={(v) => (v.length < 5 ? 'Too short!' : null)}
                >
                    <InputTextField/>
                </PlayField>
            </PlayForm>
        )
        const firstName = screen.getByLabelText('First name')
        expect(firstName).toHaveValue('Sue')
        expect(screen.queryByText('Too short!')).not.toBeInTheDocument()
        sinon.assert.calledWith(onValid, false)
        user.type(firstName, 's')
        expect(firstName).toHaveValue('Sues')
        expect(screen.queryByText('Too short!')).toBeInTheDocument()
        user.type(firstName, 's')
        expect(firstName).toHaveValue('Suess')
        expect(screen.queryByText('Too short!')).not.toBeInTheDocument()
    })
    it('should be possible to pass in errors', () => {
        const onValid = sinon.fake()
        render(
            <PlayForm
                onValid={onValid}
                errors={{firstName: 'Unknown user'}}
                value={{firstName: 'Sue'}}
            >
                <PlayField
                    name='firstName'
                    onValidate={(v) => (v.length < 2 ? 'Too short!' : null)}
                >
                    <InputTextField/>
                </PlayField>
            </PlayForm>
        )
        const firstName = screen.getByLabelText('First name')
        expect(firstName).toHaveValue('Sue')
        const errorMessage = screen.queryByText('Unknown user')
        expect(errorMessage).toBeInTheDocument()
        sinon.assert.calledWith(onValid, false)
        user.type(firstName, ' ')
        expect(errorMessage).not.toBeInTheDocument()
    })
    it('should not replace text when value object changes identity', () => {
        render(<WithValidation/>)
        const firstName = screen.getByLabelText('First name')
        expect(firstName).toHaveValue('Sue')
        expect(screen.queryByText('Too short!')).not.toBeInTheDocument()
        user.type(firstName, 's')
        expect(firstName).toHaveValue('Sues')
        expect(screen.queryByText('Too short!')).toBeInTheDocument()
        user.type(firstName, 's')
        expect(firstName).toHaveValue('Suess')
        expect(screen.queryByText('Too short!')).not.toBeInTheDocument()
    })
})
