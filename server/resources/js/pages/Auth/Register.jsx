import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import {TextField, Form, Button} from '@shopify/polaris';

import CenterContainer from "@components/containers/Center.jsx"
import FormContainer from "@components/containers/Form.jsx"
import axios from 'axios';

export default function Register() {
    const [login, setLogin] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [submitDisabled, setSubmitDisabled] = useState(false);

    const [errorMessages, setErrorMessages] = useState([]);

    async function handleFormSubmit() {
        setSubmitDisabled(true);
        const options = {
            name: login, email, password, password_confirmation: confirmPassword
        };

        try {
            const res = await axios.post("/api/register", options);
        } catch (e) {
            setErrorMessages(e.response.data.errors);
            setSubmitDisabled(false);
        }
    }

    return (
        <CenterContainer>
            <FormContainer>
                <Form onSubmit={handleFormSubmit}>
                    <h2 className="text-center">Register</h2>

                    <div className="mt-3">
                        <TextField
                            focused
                            name="name"
                            placeholder="Login"
                            label="Login"
                            value={login}
                            onChange={setLogin}
                        />
                        <p className="text-danger">{errorMessages.login || ''}</p>
                    </div>

                    <div className="mt-3">
                        <TextField
                            name="email"
                            placeholder="example@email.com"
                            label="Email"
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

                    <div className="mt-3">
                        <TextField
                            name="password_confirmation"
                            placeholder="Confirm password"
                            label="Confirm password"
                            type="password"
                            value={confirmPassword}
                            onChange={setConfirmPassword}
                        />
                    </div>

                    <div className="mt-5 d-flex justify-content-center">
                        <Button disabled={submitDisabled} submit>Register</Button>
                    </div>

                    <p className="mt-3 mb-0">Already have an account? <Link to="/auth/login">Login here</Link>.</p>
                </Form>
            </FormContainer>
        </CenterContainer>
    );
}