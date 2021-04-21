import React, { useCallback, useState, Fragment, useEffect } from "react";
import { ColorPicker, TextField, Form, Select, Button } from "@shopify/polaris";

import axios from "axios";

import FormContainer from "@components/containers/Form.jsx";
import CenterContainer from "@components/containers/Center.jsx";
import Title from "@components/global/Title.jsx";

export default function Products() {
    // Color field
    const [color, setColor] = useState({
        hue: 120,
        brightness: 1,
        saturation: 1,
    });
    const handleChange = useCallback(setColor, []);

    // Weight field
    const [weight, setWeight] = useState("");

    // Weight field
    const [price, setPrice] = useState("");

    // Product type field
    const [type, setType] = useState("");
    const handleTypeSelectChange = useCallback((type) => setType(type), []);

    // Make a request to get product types
    const [typeOptions, setTypeOptions] = useState([]);
    useEffect(() => {
        async function fetch() {
            const data = await axios.get("/api/product_type");
            const options = [];

            data.data.forEach((option) => {
                options.push({
                    label: option.title,
                    value: option.title,
                });
            });

            setTypeOptions(options);
            setType(options[0].value);
        }

        fetch();
    }, []);

    // Submit button
    const [submitDisabled, setSubmitDisabled] = useState(false);

    // Submit handler
    function handleFormSubmit() {
        setSubmitDisabled(true);
    }

    return (
        <Fragment>
            <Title>Create Product</Title>
            <CenterContainer className="min-height-screen-skip-navbar">
                <FormContainer>
                    <Form action="/api/product/new" onSubmit={handleFormSubmit}>
                        <h2 className="text-center">Add new product</h2>

                        <div className="mt-3">
                            <p className="mb-3">Color</p>
                            <ColorPicker
                                onChange={handleChange}
                                color={color}
                            />
                        </div>

                        <div className="mt-3">
                            <TextField
                                focused
                                placeholder="Weight in kg"
                                label="Weight"
                                type="number"
                                value={weight}
                                onChange={setWeight}
                            />
                        </div>

                        <div className="mt-3">
                            <TextField
                                placeholder="Price in dollars"
                                label="Price"
                                type="number"
                                value={price}
                                onChange={setPrice}
                            />
                        </div>

                        <div className="mt-3">
                            <Select
                                label="Product type"
                                options={typeOptions}
                                onChange={handleTypeSelectChange}
                                value={type}
                            />
                        </div>

                        <div className="mt-5 d-flex justify-content-center">
                            <Button disabled={submitDisabled} submit>
                                Create
                            </Button>
                        </div>
                    </Form>
                </FormContainer>
            </CenterContainer>
        </Fragment>
    );
}
