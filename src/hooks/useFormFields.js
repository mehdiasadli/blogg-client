import { Formik } from 'formik'
import styled from 'styled-components'
import Field from '../app/atoms/Field'
import * as yup from 'yup'
import Button from '../app/atoms/Button'
import { useAuth } from './useAuth'

const Container = styled.form`
  width: ${(props) => props.width};
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

export const useFormFields = (formData, onSubmit, options = { defaultInitial: '' }) => {
  const { isLoading } = useAuth()

  const formArray = Object.values(formData)
  const formValidation = formArray.reduce((acc, curr) => {
    if (curr.validate) {
      acc[curr.name] = curr.validate
    }
    return acc
  }, {})
  const formInitial = formArray.reduce((acc, curr) => {
    acc[curr.name] = curr.initial || options.defaultInitial
    return acc
  }, {})

  const Form = ({
    width = '100%',
    inputHeight,
    inputWidth,
    buttonWidth,
    buttonHeight,
    buttonText = 'Submit'
  }) => {
    return (
      <Formik
        initialValues={formInitial}
        onSubmit={onSubmit}
        validationSchema={yup.object().shape(formValidation)}
      >
        {({ values, handleSubmit, isValid, errors, touched, setFieldTouched, setFieldValue }) => (
          <Container width={width}>
            {formArray.map((item) => (
              <Field
                key={item.name}
                width={inputWidth || width}
                height={inputHeight}
                value={values[item.name]}
                placeholder={item.placeholder}
                max={item.max}
                onChange={(value) =>
                  setFieldValue(item.name, item.format ? item.format(value) : value)
                }
                onBlur={() => setFieldTouched(item.name)}
                disabled={item.disabled ? true : false}
                password={item.password}
                isError={!item.disabled && touched[item.name] && errors[item.name]}
                error={errors[item.name]}
              />
            ))}
            <Button
              width={buttonWidth || width}
              height={buttonHeight}
              disabled={!isValid}
              loading={isLoading}
              onClick={handleSubmit}
              type='submit'
            >
              {buttonText}
            </Button>
          </Container>
        )}
      </Formik>
    )
  }

  return { Form }
}
