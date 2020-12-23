import Form from './Form'
import React from 'react'
import Field from './Field'
import Text from './Text'

export default {
    title: 'Text',
    argTypes: {
        type: {
            control: {
                type: 'select',
                options: ['text', 'number', 'date'],
            }
        }
    }
}

export const Basic = (args) => {
    return <Form>
        <Field name='field1'>
            <Text type={args.type}/>
        </Field>
    </Form>
}
