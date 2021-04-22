import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";

import { useUser } from "@provider/User";

export default function Navbar() {
    const { currentUser, logout } = useUser();
    const [redirect, setRedirect] = useState(false);

    async function handleLogout() {
        await logout();
        setRedirect(true);
    }

    return (
        <nav className="fixed-top py-3 bg-white shadow-sm">
            <div className="content-container d-flex align-items-center justify-content-between">
                {currentUser && (
                    <ul className="m-0 p-0 list-style-none">
                        <li>
                            <Link to="/">Dashboard</Link>
                        </li>
                    </ul>
                )}

                <ul className="d-flex align-items-center list-style-none p-0 m-0">
                    {!currentUser ? (
                        <li>
                            <Link to="/auth/login">Login</Link>
                        </li>
                    ) : (
                        <li>
                            <button
                                className="bg-transparent"
                                onClick={handleLogout}
                            >
                                Logout
                            </button>
                        </li>
                    )}
                </ul>
            </div>
        </nav>
    );
}
