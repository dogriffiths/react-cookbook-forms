import React from 'react'
import Form from '../Form'
import Field from '../Field'
import Text from '../Text'
import FieldGroup from './index'

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
                Array.from(Array(args.controlCount), (e, i) => <Field name={`field${i}`} key={`field-${i}`}>
                    <Text type={args.type} key={`text-${i}`}/>
                </Field>)
            }
        </FieldGroup>
    </Form>
}
Basic.args = {controlCount: 1}

export const WithLabel = (args) => {
    return <Form>
        <FieldGroup label='I am a label'>
            {
                Array.from(Array(args.controlCount), (e, i) => <Field name={`field${i}`} key={`field-${i}`}>
                    <Text type={args.type} key={`text-${i}`}/>
                </Field>)
            }
        </FieldGroup>
    </Form>
}
WithLabel.args = {controlCount: 1}
