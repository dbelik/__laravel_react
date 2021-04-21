import React, { useState, Fragment } from "react";
import { Link, Redirect } from "react-router-dom";

import { TextField, Form, Button } from "@shopify/polaris";

import { useUser } from "@provider/User";

import CenterContainer from "@components/containers/Center.jsx";
import FormContainer from "@components/containers/Form.jsx";
import Title from "@components/global/Title.jsx";

export default function Register() {
    const [login, setLogin] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [submitDisabled, setSubmitDisabled] = useState(false);
    const [redirect, setRedirect] = useState(false);
    const [errorMessages, setErrorMessages] = useState([]);

    const { signup } = useUser();

    async function handleFormSubmit() {
        setSubmitDisabled(true);
        const options = {
            name: login,
            email,
            password,
            password_confirmation: confirmPassword,
        };

        const res = await signup(options);
        if (res && res.data && res.data.errors) {
            setErrorMessages(res.data.errors);
            setSubmitDisabled(false);
        } else {
            setErrorMessages([]);
            setRedirect(true);
        }
    }

    if (redirect) {
        return <Redirect push to="/" />;
    }

    return (
        <Fragment>
            <Title>Register</Title>
            <CenterContainer className="min-height-screen-skip-navbar">
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
                            <p className="text-danger">
                                {errorMessages.login || ""}
                            </p>
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
                            <p className="text-danger">
                                {errorMessages.email || ""}
                            </p>
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
                            <p className="text-danger">
                                {errorMessages.password || ""}
                            </p>
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

                        <div className="mt-4 d-flex justify-content-center">
                            <Button disabled={submitDisabled} submit>
                                Register
                            </Button>
                        </div>

                        <p className="mt-5 mb-0 text-center">
                            Already have an account?{" "}
                            <Link to="/auth/login">Login here</Link>.
                        </p>
                    </Form>
                </FormContainer>
            </CenterContainer>
        </Fragment>
    );
}
