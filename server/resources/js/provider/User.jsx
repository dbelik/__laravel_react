import React, { useContext, useState, useEffect } from "react";
import axios from "axios";

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
            return signupResp.response;
        } catch (e) {
            return e.response;
        }
    }

    async function login(options) {
        try {
            const loginResp = await axios.post("/api/login", options);
            setCurrentUser({ email: options.email, name: options.name });
            return loginResp.response;
        } catch (e) {
            return e.response;
        }
    }

    async function logout() {
        setCurrentUser({});
        try {
            const res = await axios.post("/api/logout");
        } catch (e) {
            // Leave it empty
        }
    }

    useEffect(() => {
        async function fetch() {
            try {
                const user = await axios.get("/api/profile");
                console.log(user);
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
