import Form from './Form'
import React from 'react'
import Field from './Field'
import Text from './Text'
import FieldGroup from './FieldGroup'

export default {
    title: 'FieldGroup',
    argTypes: {
        controlCount: {
            control: {
                type: 'range',
                min: 1,
                max: 8,
                step: 1,
            }
        }
    }
}

export const Basic = (args) => {
    return <Form>
        <FieldGroup>
            {
                Array.from(Array(args.controlCount), (e, i) => <Field name={`field${i}`}>
                    <Text type={args.type}/>
                </Field>)
            }
        </FieldGroup>
    </Form>
}
Basic.args = {controlCount: 1}
