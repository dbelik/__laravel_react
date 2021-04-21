import React from 'react';
import { Link } from 'react-router-dom';

import ContentContainer from "@components/containers/Content.jsx";

export default function Navbar() {
    return (
        <nav className="fixed-top py-3 bg-white shadow-sm">
            <ContentContainer>
                <ul className="d-flex align-items-center justify-content-end list-style-none p-0 m-0">
                    <li><Link to="/auth/login">Login</Link></li>
                </ul>
            </ContentContainer>
        </nav>
    );
}