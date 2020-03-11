import { Form, FieldError, FormError, TextAreaField, TextField, Submit } from "@redwoodjs/web";
import { useMutation } from '@redwoodjs/web';
import { useForm } from 'react-hook-form';
import BlogLayout from "src/layouts/BlogLayout";

const CREATE_CONTACT = gql`
  mutation CreateContactMutation($input: ContactInput!) {
    createContact(input: $input) {
      id
    }
  }
`

const ContactPage = (props) => {
  const formMethods = useForm()

  const [create, { loading, error }] = useMutation(CREATE_CONTACT, {
    onCompleted: () => {
      alert('Thank you for your submission!')
      formMethods.reset()
    }
  })

  const onSubmit = data => {
    create({ variables: { input: data } })
    console.log(data);
  }

  return (
    <BlogLayout>
      <Form
        onSubmit={onSubmit}
        validation={{ mode: 'onBlur' }}
        error={error}
        formMethods={formMethods}
      >
        <FormError error={error} wrapperStyle={{ color: 'red', backgroundColor: 'lavenderblush' }} />

        <label htmlFor="name" style={{ display: "block" }}>
          Name
        </label>
        <TextField
          name="name"
          style={{ display: 'block' }}
          errorStyle={{ display: 'block', borderColor: 'red' }}
          validation={{ required: true  }}
        />
        <FieldError name="name" />

        <label htmlFor="email" style={{ display: "block" }}>
          Email
        </label>
        <TextField
          name="email"
          style={{ display: 'block' }}
          errorStyle={{ display: 'block', borderColor: 'red' }}
          validation={{
            required: true,
              pattern: {
                value: /[^@]+@[^\.]+\..+/,
                message: 'Please enter a valid email address',
              }
          }}
        />
        <FieldError name="email" />

        <label htmlFor="message" style={{ display: "block" }}>
          Message
        </label>
        <TextAreaField
          name="message"
          style={{ display: 'block' }}
          errorStyle={{ display: 'block', borderColor: 'red' }}
          validation={{ required: true  }}
        />
        <FieldError name="message" />

        <Submit style={{ display: "block" }} disabled={loading}>Save</Submit>
      </Form>
    </BlogLayout>
  )
}

export default ContactPage
