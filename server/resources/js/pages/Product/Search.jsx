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
    const [typeOptions, setTypeOptions] = useState([]);
    const [selectedType, setSelectedType] = useState(1);
    const [minPrice, setMinPrice] = useState();
    const [maxPrice, setMaxPrice] = useState();
    const [loading, setLoading] = useState(true);

    const search = new URLSearchParams(useLocation().search);

    useEffect(() => {
        fetchAll();
    }, []);

    async function fetchAll() {
        await fetchProducts();
        setLoading(false);
        await fetchProductTypes();
    }

    async function fetchProductTypes() {
        const types = await axios.get("/api/product_type");
        const res = [];
        types.data.forEach((option) => {
            res.push({ label: option.name, value: option.id.toString() });
        });
        setTypeOptions(res);
        setSelectedType(res[0].value);
    }

    async function fetchProducts() {
        const page = parseInt(search.get("page")) || 1;
        const searchName = search.get("name") || "";
        setSearchName(searchName);

        const data = await axios.get(
            buildApiUrl({
                name: search.get("name"),
                page: page,
            })
        );

        setProducts(data.data.items);
        setPageState(data.data.pageState);
    }

    function buildFetchUrl(base, options) {
        return `${base}?name=${options.name || ""}&page=${options.page || ""}`;
    }

    function buildApiUrl(options) {
        return buildFetchUrl("/api/products", options);
    }

    function buildFrontUrl(options) {
        return buildFetchUrl("/search", options);
    }

    async function searchSubmit(options) {
        setProducts([]);
        history.push(buildFrontUrl({ name: options.name, page: options.page }));
        const data = await axios.get(buildApiUrl(options));
        setProducts(data.data.items);
        setPageState(data.data.pageState);
    }

    async function handleSearchSubmit() {
        searchSubmit({ name: searchName });
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
                    placeholder="Search"
                    connectedRight={
                        <Button submit disabled={loading}>
                            Search
                        </Button>
                    }
                />

                <FormLayout>
                    <FormLayout.Group condensed>
                        <TextField
                            type="number"
                            disabled={loading}
                            label="Min price"
                            placeholder="0.00"
                            prefix="$"
                            value={minPrice}
                            onChange={setMinPrice}
                        />
                        <TextField
                            type="number"
                            disabled={loading}
                            label="Max price"
                            placeholder="100.00"
                            prefix="$"
                            value={maxPrice}
                            onChange={setMaxPrice}
                        />
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
                        });
                    }}
                    hasNext={pageState.nextUrl}
                    onNext={async () => {
                        searchSubmit({
                            name: searchName,
                            page: pageState.currentPage + 1,
                        });
                    }}
                />
            </div>
        </Fragment>
    );
}
