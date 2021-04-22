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
            <div className="content-container d-flex align-items-center justify-content-between">
                {currentUser && 
                    <ul class="m-0 p-0 list-style-none">
                        <li><Link to="/">Dashboard</Link></li>
                    </ul>
                }

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
