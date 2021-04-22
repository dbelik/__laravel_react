import React, { Fragment} from 'react'
import { Link } from 'react-router-dom'

import { useUser } from '@provider/User'

export default function Dashboard() {
    const { currentUser } = useUser();

    return (
        <Fragment>
            <h1>Hello, {currentUser.name}</h1>
            <h2>Would you like to...</h2>
            <ul>
                <li><Link to="products/new">add new product</Link></li>
            </ul>
        </Fragment>
    );
}