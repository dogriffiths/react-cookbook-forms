import React, {useContext} from 'react'
import FormContext from './FormContext'
import styles from './FieldGroup.module.css'

export default ({children}) => {
    const form = useContext(FormContext)

    return (
        <div className={styles.FieldGroup}>
            <FormContext.Provider value={{...form, style: {flexGrow: 1}}}>
                {children}
            </FormContext.Provider>
        </div>
    )
}
