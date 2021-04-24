import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import { Button } from "@shopify/polaris";

import history from "@utils/createHistory";

import { useUser } from "@provider/User";

export default function Navbar() {
    const { currentUser, logout } = useUser();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(false);
    }, []);

    async function handleLogout() {
        setLoading(true);
        await logout();
        setLoading(false);
    }

    return (
        <nav className="fixed-top py-3 bg-white shadow-sm">
            <div className="content-container d-flex align-items-center justify-content-between">
                <ul className="m-0 p-0 list-style-none">
                    {currentUser && (
                        <li>
                            <Link to="/">Dashboard</Link>
                        </li>
                    )}
                </ul>

                <ul className="d-flex align-items-center list-style-none p-0 m-0">
                    {!currentUser ? (
                        <li>
                            <Button
                                className="bg-transparent"
                                onClick={() => history.push("/auth/login")}
                                loading={loading}
                            >
                                Login
                            </Button>
                        </li>
                    ) : (
                        <li>
                            <Button
                                className="bg-transparent"
                                onClick={handleLogout}
                                loading={loading}
                            >
                                Logout
                            </Button>
                        </li>
                    )}
                </ul>
            </div>
        </nav>
    );
}
