import React, { Fragment, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
    TextField,
    Form,
    Button,
    Pagination,
    FormLayout,
    Icon,
    Select,
} from "@shopify/polaris";
import { SearchMinor } from "@shopify/polaris-icons";

import axios from "axios";
import history from "@utils/createHistory";

import Title from "@components/global/Title.jsx";

export default function SearchProduct(props) {
    const [products, setProducts] = useState([]);
    const [searchName, setSearchName] = useState("");
    const [pageState, setPageState] = useState({});

    // Search filters
    const [typeOptions, setTypeOptions] = useState([]);
    const [selectedType, setSelectedType] = useState(1);
    const [loading, setLoading] = useState(true);

    const search = new URLSearchParams(useLocation().search);

    useEffect(() => {
        fetchProductTypes();
        fetchProducts();
    }, []);

    async function fetchProductTypes() {
        const types = await axios.get("/api/product_type");
        const res = [{ label: "any", value: "" }];
        types.data.forEach((option) => {
            res.push({ label: option.name, value: option.id.toString() });
        });
        setTypeOptions(res);
        setSelectedType(res[0].value);
        setLoading(false);
    }

    async function fetchProducts() {
        const page = parseInt(search.get("page")) || 1;
        const searchName = search.get("name") || "";
        setSearchName(searchName);

        const url = buildApiUrl({
            name: search.get("name"),
            page: page,
            type: search.get("type"),
        });

        const data = await axios.get(url);

        setProducts(data.data.items);
        setPageState(data.data.pageState);
    }

    function buildFetchUrl(base, options) {
        return `${base}?name=${options.name || ""}&page=${
            options.page || ""
        }&type=${options.type || ""}`;
    }

    function buildApiUrl(options) {
        return buildFetchUrl("/api/products", options);
    }

    function buildFrontUrl(options) {
        return buildFetchUrl("/search", options);
    }

    async function searchSubmit(options) {
        setProducts([]);
        const url = buildFrontUrl(options);
        history.push(url);
        const data = await axios.get(buildApiUrl(options));
        setProducts(data.data.items);
        setPageState(data.data.pageState);
    }

    async function handleSearchSubmit() {
        setLoading(true);
        await searchSubmit({
            name: searchName,
            page: 1,
            type: selectedType,
        });
        setLoading(false);
    }

    return (
        <Fragment>
            <Title>Search</Title>

            <Form onSubmit={handleSearchSubmit}>
                <TextField
                    label="Search"
                    value={searchName}
                    prefix={<Icon source={SearchMinor} color="base" />}
                    onChange={setSearchName}
                    placeholder="Search by name"
                    connectedRight={
                        <Button submit loading={loading}>
                            Search
                        </Button>
                    }
                />

                <FormLayout>
                    <FormLayout.Group condensed>
                        <Select
                            label="Product type"
                            disabled={loading}
                            options={typeOptions}
                            onChange={(value) => setSelectedType(value)}
                            value={selectedType}
                        />
                    </FormLayout.Group>
                </FormLayout>
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
                        Type
                    </span>
                    <span className="d-none d-lg-block col-lg-2 pb-3 text-truncate text-muted">
                        Price
                    </span>
                    <span className="col-4 col-sm-2 col-lg-2 pb-3 text-truncate"></span>
                </li>

                {products.map((product) => (
                    <li key={product.id} className="row border-bottom">
                        <span className="d-none d-sm-block col-sm-2 col-lg-2 text-truncate py-3 text-muted">
                            {product.id}
                        </span>
                        <span className="col-8 col-lg-3 text-truncate py-3">
                            {product.name}
                        </span>
                        <span className="d-none d-lg-block col-lg-3 text-truncate py-3 text-muted">
                            {product.type.name}
                        </span>
                        <span className="d-none d-lg-block col-lg-2 text-truncate py-3 text-muted">
                            {product.price}
                        </span>
                        <span className="col-4 col-sm-2 col-lg-2 text-truncate py-3">
                            <Link to={`/products/${product.id}`}>Details</Link>
                        </span>
                    </li>
                ))}
            </ul>

            <div className="w-100 d-flex justify-content-center mt-5">
                <Pagination
                    hasPrevious={pageState.prevUrl}
                    onPrevious={async () => {
                        searchSubmit({
                            name: searchName,
                            page: pageState.currentPage - 1,
                            type: selectedType
                        });
                    }}
                    hasNext={pageState.nextUrl}
                    onNext={async () => {
                        searchSubmit({
                            name: searchName,
                            page: pageState.currentPage + 1,
                            type: selectedType
                        });
                    }}
                />
            </div>
        </Fragment>
    );
}
