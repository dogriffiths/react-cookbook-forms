import Form from './index'
import Field from '../Field'
import {render, screen} from '@testing-library/react'
import user from '@testing-library/user-event'
import Text from '../Text'
import {WithValidation} from './Form.stories'

const sinon = require('sinon')

describe('Form', () => {
    it('should be able to show fields', () => {
        render(
            <Form>
                <Field name='firstName'>
                    <Text/>
                </Field>
                <Field name='lastName'>
                    <Text/>
                </Field>
            </Form>
        )
        const firstName = screen.getByLabelText('First name')
        expect(firstName).toHaveValue('')
        const lastName = screen.getByLabelText('Last name')
        expect(lastName).toHaveValue('')
    })
    it('should send back changes', () => {
        const onChange = sinon.fake()
        render(
            <Form onChange={onChange}>
                <Field name='firstName'>
                    <Text/>
                </Field>
                <Field name='lastName'>
                    <Text/>
                </Field>
            </Form>
        )
        const firstName = screen.getByLabelText('First name')
        expect(firstName).toHaveValue('')
        const lastName = screen.getByLabelText('Last name')
        expect(lastName).toHaveValue('')
        user.type(firstName, 'Bill')
        sinon.assert.callCount(onChange, 5)
        sinon.assert.calledWith(onChange, {
            firstName: 'Bill',
        })
    })
    it('should validate what you type', () => {
        const onValid = sinon.fake()
        render(
            <Form onValid={onValid}>
                <Field
                    name='firstName'
                    onValidate={(v) => ((v && v.length < 5) ? 'Too short!' : null)}
                >
                    <Text/>
                </Field>
            </Form>
        )
        const firstName = screen.getByLabelText('First name')
        expect(firstName).toHaveValue('')
        user.type(firstName, 'Bill')
        screen.getByText('Too short!')
        sinon.assert.callCount(onValid, 2)
        sinon.assert.calledWith(onValid, false, {firstName: 'Too short!'})
        user.type(firstName, 'y')
        sinon.assert.calledWith(onValid, true, {})
        sinon.assert.callCount(onValid, 3)
    })
    it('should be able to pass in initial values', () => {
        render(
            <Form
                value={{
                    firstName: 'Wilma',
                    lastName: 'Flintstone'
                }}
            >
                <Field name='firstName'>
                    <Text/>
                </Field>
                <Field name='lastName'>
                    <Text/>
                </Field>
            </Form>
        )
        const firstName = screen.getByLabelText('First name')
        expect(firstName).toHaveValue('Wilma')
        const lastName = screen.getByLabelText('Last name')
        expect(lastName).toHaveValue('Flintstone')
    })
    it('should not show validation errors unless you have touched the field', () => {
        const onValid = sinon.fake()
        render(
            <Form onValid={onValid} value={{firstName: 'Sue'}}>
                <Field
                    name='firstName'
                    onValidate={(v) => ((v && v.length < 5) ? 'Too short!' : null)}
                >
                    <Text/>
                </Field>
            </Form>
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
            <Form
                onValid={onValid}
                errors={{firstName: 'Unknown user'}}
                value={{firstName: 'Sue'}}
            >
                <Field
                    name='firstName'
                    onValidate={(v) => ((v && v.length < 2) ? 'Too short!' : null)}
                >
                    <Text/>
                </Field>
            </Form>
        )
        const firstName = screen.getByLabelText('First name')
        expect(firstName).toHaveValue('Sue')
        const errorMessage = screen.queryByText('Unknown user')
        expect(errorMessage).toBeInTheDocument()
        sinon.assert.calledWith(onValid, false)
        user.type(firstName, ' ')
        expect(errorMessage).toHaveTextContent('', {normalizeWhitespace: true})
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
