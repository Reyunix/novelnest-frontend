export const CONTACT_FORM_FIELDS = [
  {
    id: "contactName",
    literal: "Nombre",
    required: true,
    inputType: "text",
    autofocus: true,
  },
  {
    id: "contactEmail",
    literal: "Dirección de correo",
    required: true,
    inputType: "email",
  },
  {
    id: "contactCompany",
    literal: "Empresa",
    required: true,
    inputType: "text",
  },
  {
    id: "contactMessage",
    literal: "Mensaje",
    required: true,
    inputType: "textarea",
  },
  {
    id: "sendCopy",
    literal: "Deseo recibir una copia a mi correo",
    required: false,
    inputType: "checkbox",
  },
];
