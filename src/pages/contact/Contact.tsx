import { GenerateForm } from '../../components/GenerateForm'
import { CONTACT_FORM_FIELDS } from '../../features/contact/constants/contact.form.constants'

export const Contact = () => {
  return (
    <GenerateForm
    apiEndpoint=''
    buttonLiteral='Enviar Mensaje'
    formSchemaType='contact'
    title='Envíanos tus sugerencias'
    formFieldsList={CONTACT_FORM_FIELDS}


    />
  )
}
