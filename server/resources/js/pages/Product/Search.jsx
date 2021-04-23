import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { TextField, Button, Form } from "@shopify/polaris";

import axios from "axios";

import Title from "@components/global/Title.jsx";

export default function SearchProduct() {
    const [products, setProducts] = useState([]);
    const [searchName, setSearchName] = useState("");

    useEffect(() => {
        async function fetch() {
            const data = await axios.get("/api/products");
            setProducts(data.data);
        }

        fetch();
    }, []);

    async function handleSearchSubmit() {
        const data = await axios.get(`/api/products?name=${searchName}`);
        setProducts(data.data);
    }

    return (
        <Fragment>
            <Title>Search</Title>

            <Form onSubmit={handleSearchSubmit}>
                <TextField
                    label="Search"
                    value={searchName}
                    onChange={setSearchName}
                />
            </Form>

            <h2 className="mt-5">Products:</h2>
            <ul className="m-0 p-0 list-style-none">
                <li className="row border-bottom">
                    <span className="d-none d-sm-block col-sm-2 col-lg-2 pb-3 text-truncate text-muted">
                        ID
                    </span>
                    <span className="col-8 col-lg-3 pb-3 text-truncate">
                        Name
                    </span>
                    <span className="d-none d-lg-block col-lg-3 pb-3 text-truncate text-muted">
                        Weight
                    </span>
                    <span className="d-none d-lg-block col-lg-2 pb-3 text-truncate text-muted">
                        Price
                    </span>
                    <span className="col-4 col-sm-2 col-lg-2 pb-3 text-truncate"></span>
                </li>

                {products.map((product) => (
                    <li key={product.Id} className="row border-bottom">
                        <span className="d-none d-sm-block col-sm-2 col-lg-2 text-truncate py-3 text-muted">
                            {product.Id}
                        </span>
                        <span className="col-8 col-lg-3 text-truncate py-3">
                            {product.Name}
                        </span>
                        <span className="d-none d-lg-block col-lg-3 text-truncate py-3 text-muted">
                            {product.Weight}
                        </span>
                        <span className="d-none d-lg-block col-lg-2 text-truncate py-3 text-muted">
                            {product.Price}
                        </span>
                        <span className="col-4 col-sm-2 col-lg-2 text-truncate py-3">
                            <Link to={`/products/${product.Id}`}>Details</Link>
                        </span>
                    </li>
                ))}
            </ul>
        </Fragment>
    );
}
