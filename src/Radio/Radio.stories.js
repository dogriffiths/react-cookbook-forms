import React from 'react'
import Radio from './index'
import Field from '../Field'
import Form from '../Form'
import FieldGroup from '../FieldGroup'

export default {
    title: 'Radio'
}

export const Basic = () => <Form>
    <Field name='drink'>
        <Radio/>
    </Field>
</Form>

export const WithValues = () => <Form>
    <Field name='drink'>
        <Radio value='whiskey'/>
        <Radio value='beer'/>
        <Radio value='rum'/>
    </Field>
</Form>

export const WithValuesAndLabels = () => <Form>
    <Field name='drink'>
        <Radio value='whiskey'>Whiskey</Radio>
        <Radio value='beer'>Beer</Radio>
        <Radio value='rum'>Rum</Radio>
    </Field>
</Form>

export const InAFieldGroup = () => <Form>
    <Field name='drink'>
        <FieldGroup label='Drink'>
            <Radio value='whiskey'>Whiskey</Radio>
            <Radio value='beer'>Beer</Radio>
            <Radio value='rum'>Rum</Radio>
        </FieldGroup>
    </Field>
</Form>
