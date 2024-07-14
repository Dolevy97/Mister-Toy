import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const SignupSchema = Yup.object().shape({
    username: Yup.string()
        .required('Username is required'),
    password: Yup.string()
        .required('Enter your password'),
})



export function LoginForm({ onSubmit, handleChange }) {
    return (
        <div className="login-container">
            <Formik
                enableReinitialize
                initialValues={{
                    username: '',
                    password: ''
                }}
                validationSchema={SignupSchema}
                onSubmit={onSubmit}>
                {({ errors, touched }) => (
                    <Form className='auth-form' onChange={handleChange}>
                        <Field name="username" placeholder="Enter your username" />
                        {errors.username && touched.username && (
                            <div>{errors.username}</div>
                        )}
                        <Field name="password" type="password" placeholder="Enter password" />
                        {errors.password && touched.password && (
                            <div>{errors.password}</div>
                        )}

                        <button type="submit">Continue</button>
                    </Form>
                )}
            </Formik>
            <p>Create an account</p>
        </div>
    )
}