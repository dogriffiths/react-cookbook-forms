import React from 'react'
import Form from '../Form'
import Field from '../Field'
import Select from './index'

export default {
    title: 'Select',
}

export const Basic = () => {
    return <Form>
        <Field name='favoriteIceCream'>
            <Select>
                <option value=''/>
                <option value='vanilla'>Vanilla</option>
                <option value='chocolate'>Chocolate</option>
            </Select>
        </Field>
    </Form>
}
