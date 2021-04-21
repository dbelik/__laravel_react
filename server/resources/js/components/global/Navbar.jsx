import React from "react";
import { Link } from "react-router-dom";

import { useUser } from "@provider/User";

export default function Navbar() {
    const { currentUser, logout } = useUser();

    async function handleLogout() {
        await logout();
    }

    return (
        <nav className="fixed-top py-3 bg-white shadow-sm">
            <div className="content-container">
                <ul className="d-flex align-items-center justify-content-end list-style-none p-0 m-0">
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
