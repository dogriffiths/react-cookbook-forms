import React, {useContext} from 'react'
import FormContext from './FormContext'

import './FieldGroup.css'

export default ({children}) => {
    const form = useContext(FormContext)

    return (
        <div className='FieldGroup'>
            <FormContext.Provider value={{...form, style: {flexGrow: 1}}}>
                {children}
            </FormContext.Provider>
        </div>
    )
}
