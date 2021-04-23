import React, { useContext, useState, useEffect } from "react";
import axios from "axios";

import history from "@utils/createHistory";

const UserContext = React.createContext();

export function useUser() {
    return useContext(UserContext);
}

export default function User(props) {
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);

    async function signup(options) {
        try {
            const signupResp = await axios.post("/api/register", options);
            setCurrentUser({ email: options.email, name: options.name });
            window.location.reload();
            return signupResp.response;
        } catch (e) {
            return e.response;
        }
    }

    async function login(options) {
        try {
            const loginResp = await axios.post("/api/login", options);
            setCurrentUser({ email: options.email, name: options.name });
            window.location.reload();
            return loginResp.response;
        } catch (e) {
            return e.response;
        }
    }

    async function logout() {
        try {
            const res = await axios.post("/api/logout");
            window.location.reload();
        } catch (e) {
            // Leave it empty
        }
        setCurrentUser({});
    }

    useEffect(() => {
        async function fetch() {
            try {
                const user = await axios.get("/api/profile");
                setCurrentUser(user.data);
            } catch (e) {
                // Leave it empty
            }

            setLoading(false);
        }

        fetch();
    }, []);

    const value = {
        currentUser,
        signup,
        login,
        logout,
    };

    return (
        <UserContext.Provider value={value}>
            {!loading && props.children}
        </UserContext.Provider>
    );
}
