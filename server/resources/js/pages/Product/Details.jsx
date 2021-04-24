import React, { useCallback, useState, Fragment, useEffect } from "react";
import {
    ColorPicker,
    TextField,
    Form,
    Select,
    Button,
    Banner,
} from "@shopify/polaris";
import { Redirect, useParams } from "react-router-dom";

import axios from "axios";
import convert from "color-convert";
import history from "@utils/createHistory";

import { useLog } from "@provider/Log";

import FormContainer from "@components/containers/Form.jsx";
import CenterContainer from "@components/containers/Center.jsx";
import Title from "@components/global/Title.jsx";

export default function Products() {
    // Product fields
    const [color, setColor] = useState({
        hue: 0,
        brightness: 1,
        saturation: 1,
    });
    const handleChange = useCallback(setColor, []);

    const [name, setName] = useState("");
    const [weight, setWeight] = useState("");
    const [price, setPrice] = useState("");
    const [type, setType] = useState("");
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [redirect, setRedirect] = useState(false);

    const { success, error } = useLog();

    const handleTypeSelectChange = useCallback((type) => setType(type), []);

    const { id } = useParams();

    // Make a request to get product types
    const [typeOptions, setTypeOptions] = useState([]);

    useEffect(() => {
        async function fetchTypes() {
            const data = await axios.get("/api/product_type");
            const options = [];

            data.data.forEach((option) => {
                options.push({
                    label: option.name,
                    value: option.id.toString(),
                });
            });

            setTypeOptions(options);
            setType(options[0].value);
        }

        async function fetchProduct(id) {
            const product = (await axios.get(`/api/products/${id}`)).data;
            if (product.length === 0) {
                error("Product with the given id doesn't exist");
                history.push("/");
            } else {
                setName(product.name);
                setWeight(product.weight.toString());
                setPrice(product.price.toString());
                setType(product.type.id.toString());

                const hlv = convert.hex.hsv(product.color);

                const resColor = Object.assign({}, color);
                resColor.hue = hlv[0];
                resColor.saturation = hlv[1] / 100;
                resColor.brightness = hlv[2] / 100;

                setColor(resColor);
            }
        }

        async function fetch() {
            await fetchTypes();
            await fetchProduct(id);
            setLoading(false);
        }

        fetch();
    }, []);

    // Submit handler
    async function saveProduct() {
        setLoading(true);
        const rgb = convert.hsv.hex(
            color.hue,
            color.saturation * 100,
            color.brightness * 100
        );

        const options = { weight, price, name, type_id: type, color: rgb };

        try {
            const res = await axios({
                method: "put",
                url: `/api/products/${id}`,
                data: options,
            });
            success("Product has been saved!");
        } catch (e) {
            console.log(e.response)
            setErrors(e.response.data.errors);
        }
        setLoading(false);
    }

    async function deleteProduct() {
        setLoading(true);
        const res = await axios({
            method: "delete",
            url: `/api/products/${id}`,
        });
        success("Successfully deleted item");
        setRedirect(true);
        setLoading(false);
    }

    if (redirect) return <Redirect to="/" />;

    return (
        <Fragment>
            <Title>Edit product</Title>

            <CenterContainer className="min-height-screen-skip-navbar">
                <FormContainer>
                    <Form onSubmit={saveProduct}>
                        <Fragment>
                            <h2 className="text-center">Edit product</h2>

                            <div className="mt-3">
                                <TextField
                                    focused
                                    placeholder="Product name"
                                    label="Name"
                                    disabled={loading}
                                    value={name}
                                    onChange={setName}
                                    error={errors.name}
                                />
                            </div>

                            <div className="mt-3">
                                <p className="mb-3">Color</p>
                                <ColorPicker
                                    onChange={handleChange}
                                    color={color}
                                />
                            </div>

                            <div className="mt-3">
                                <TextField
                                    placeholder="Weight in kg"
                                    label="Weight"
                                    type="number"
                                    value={weight}
                                    onChange={setWeight}
                                    error={errors.weight}
                                    disabled={loading}
                                />
                            </div>

                            <div className="mt-3">
                                <TextField
                                    placeholder="Price in dollars"
                                    label="Price"
                                    type="number"
                                    value={price}
                                    onChange={setPrice}
                                    error={errors.price}
                                    disabled={loading}
                                />
                            </div>

                            <div className="mt-3">
                                <Select
                                    label="Product type"
                                    options={typeOptions}
                                    onChange={handleTypeSelectChange}
                                    value={type}
                                    disabled={loading}
                                />
                            </div>

                            <div className="mt-5 d-flex justify-content-center">
                                <div className="mr-4">
                                    <Button
                                        loading={loading}
                                        onClick={deleteProduct}
                                        destructive
                                    >
                                        Delete
                                    </Button>
                                </div>

                                <div>
                                    <Button loading={loading} submit primary>
                                        Save
                                    </Button>
                                </div>
                            </div>
                        </Fragment>
                    </Form>
                </FormContainer>
            </CenterContainer>
        </Fragment>
    );
}
