import React, { useState } from 'react';
import {TextField, Form, Button} from '@shopify/polaris';

import CenterContainer from "@components/containers/Center.jsx"
import FormContainer from "@components/containers/Form.jsx"
import axios from 'axios';

export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [submitDisabled, setSubmitDisabled] = useState(false);

    const [errorMessages, setErrorMessages] = useState([]);

    async function handleFormSubmit() {
        setSubmitDisabled(true);
        const options = {
            email, password
        };

        try {
            const res = await axios.post("/api/login", options);
        } catch (e) {
            console.log(e.response.data.errors)
            setErrorMessages(e.response.data.errors);
            setSubmitDisabled(false);
        }
    }

    return (
        <CenterContainer>
            <FormContainer>
                <Form onSubmit={handleFormSubmit}>
                    <h2 className="text-center">Login</h2>

                    <div className="mt-3">
                        <TextField
                            name="email"
                            placeholder="example@email.com"
                            label="Login"
                            type="email"
                            value={email}
                            onChange={setEmail}
                        />
                        <p className="text-danger">{errorMessages.email || ''}</p>
                    </div>

                    <div className="mt-3">
                        <TextField
                            name="password"
                            placeholder="Password"
                            label="Password"
                            type="password"
                            value={password}
                            onChange={setPassword}
                        />
                        <p className="text-danger">{errorMessages.password || ''}</p>
                    </div>

                    <div className="mt-5 d-flex justify-content-center">
                        <Button disabled={submitDisabled} submit>Login</Button>
                    </div>
                </Form>
            </FormContainer>
        </CenterContainer>
    );
}