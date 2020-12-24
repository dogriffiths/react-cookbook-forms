import React, {useContext} from 'react'
import FormContext from '../Form/FormContext'
import './FieldGroup.css'

export default ({children, label}) => {
    const form = useContext(FormContext)

    return (
        <div className='FieldGroup'>
            {
                label && <div className='FieldGroup-label'>{label}</div>
            }
            <div className='FieldGroup-contents'>
                <FormContext.Provider value={{...form, style: {flexGrow: 1}}}>
                    {children}
                </FormContext.Provider>
            </div>
        </div>
    )
}
