import React, { useState, Fragment } from "react";
import { Link, Redirect } from "react-router-dom";

import { useUser } from "@provider/User";

import { TextField, Form, Button } from "@shopify/polaris";

import CenterContainer from "@components/containers/Center.jsx";
import FormContainer from "@components/containers/Form.jsx";
import Title from "@components/global/Title.jsx";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [submitDisabled, setSubmitDisabled] = useState(false);
    const [redirect, setRedirect] = useState(false);
    const [errorMessages, setErrorMessages] = useState([]);

    const { login } = useUser();

    async function handleFormSubmit() {
        setSubmitDisabled(true);
        const options = {
            email: email,
            password: password,
        };

        const res = await login(options);
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
            <Title>Login</Title>
            <CenterContainer className="min-height-screen-skip-navbar">
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

                        <div className="mt-4 d-flex justify-content-center">
                            <Button disabled={submitDisabled} submit>
                                Login
                            </Button>
                        </div>

                        <p className="mt-5 mb-0 text-center">
                            Don't have an account yet?{" "}
                            <Link to="/auth/register">Register here</Link>.
                        </p>
                    </Form>
                </FormContainer>
            </CenterContainer>
        </Fragment>
    );
}
