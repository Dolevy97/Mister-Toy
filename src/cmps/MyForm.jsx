import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const SignupSchema = Yup.object().shape({
    name: Yup.string()
        .required('Name is required'),
    price: Yup.number()
        .required('Price is required')
})


export function MyForm({ toyToEdit, onSaveToy, handleChange }) {

    const { name, price, labels, inStock } = toyToEdit

    return (
        <div>
            <Formik
                enableReinitialize
                initialValues={{
                    name: name,
                    price: price,
                    labels: labels,
                    inStock: inStock
                }}
                validationSchema={SignupSchema}
                onSubmit={onSaveToy}>
                {({ errors, touched }) => (
                    <Form className='edit-form' onChange={handleChange}>
                        <Field name="name" label="name" placeholder="Name" />
                        {errors.name && touched.name && (
                            <div>{errors.name}</div>
                        )}
                        <Field name="price" type="number" placeholder="Price" />
                        {errors.price && touched.price  && (
                            <div>{errors.price}</div>
                        )}
                        <Field name="labels" placeholder="Labels (with commas)" />
                        {errors.labels && touched.labels && <div>{errors.labels}</div>}

                        <label htmlFor="inStock">In stock</label>
                        <Field id="inStock" name="inStock" type="checkbox" />

                        <button type="submit">Submit</button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}