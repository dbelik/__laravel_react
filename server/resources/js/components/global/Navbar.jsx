import React from 'react';
import { Link } from 'react-router-dom';

import axios from 'axios';

import ContentContainer from "@components/containers/Content.jsx";

async function handleLogout() {
    const res = await axios.post('/api/logout');
    console.log(res);
}

export default function Navbar() {
    return (
        <nav className="fixed-top py-3 bg-white shadow-sm">
            <ContentContainer>
                <ul className="d-flex align-items-center justify-content-end list-style-none p-0 m-0">
                    <li><Link to="/auth/login">Login</Link></li>
                    <li><button onClick={handleLogout}>Logout</button></li>
                </ul>
            </ContentContainer>
        </nav>
    );
}