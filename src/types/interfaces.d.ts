export interface iFormProps {
  formFieldsList: {
    id: string;
    literal: string;
    required: boolean;
    inputType: string;
    autofocus: boolean;
  }[],
  apiEndpoint : string,
  formLinks: {
    id: number,
    literal: string,
    href: string
  }[],
  title: string,
  buttonLiteral: string
}