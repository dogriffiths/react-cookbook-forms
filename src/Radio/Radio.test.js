import {render, screen} from '@testing-library/react'
import user from '@testing-library/user-event'
import Radio from './index'
import Field from '../Field'
import Form from '../Form'

describe('Radio', () => {
    it('should be able to accept values', async () => {
        render(
            <Form value={{drink: 'beer'}}>
                <Field name='drink'>
                    <Radio value='whiskey'/>
                    <Radio value='beer'/>
                    <Radio value='rum'/>
                </Field>
            </Form>
        )
        expect(screen.getByLabelText('beer').checked).toBe(true)
        const rum = screen.getByLabelText('rum')
        user.click(rum)
        expect(screen.getByLabelText('beer').checked).toBe(false)
        expect(screen.getByLabelText('rum').checked).toBe(true)
    })
    it('should be put into separate fields', async () => {
        render(
            <Form value={{drink: 'beer'}}>
                <Field name='drink'>
                    <Radio value='whiskey'/>
                </Field>
                <Field name='drink'>
                    <Radio value='beer'/>
                </Field>
                <Field name='drink'>
                    <Radio value='rum'/>
                </Field>
            </Form>
        )
        expect(screen.getByLabelText('beer').checked).toBe(true)
        const rum = screen.getByLabelText('rum')
        user.click(rum)
        expect(screen.getByLabelText('beer').checked).toBe(false)
        expect(screen.getByLabelText('rum').checked).toBe(true)
    })
})
