import React from 'react';
import {Helmet} from "react-helmet";

export default function Title(props) {
    return (
        <Helmet>
            <title>Lar-React | {props.children}</title>
        </Helmet>
    )
}