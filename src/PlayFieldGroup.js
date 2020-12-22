import React, {useContext} from 'react'
import FormContext from './FormContext'

import './PlayFieldGroup.css'

export default ({children}) => {
    const form = useContext(FormContext)

    return (
        <div className='PlayFieldGroup'>
            <FormContext.Provider value={{...form, style: {flexGrow: 1}}}>
                {children}
            </FormContext.Provider>
        </div>
    )
}
