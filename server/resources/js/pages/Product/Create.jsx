import React, { useCallback, useState, Fragment, useEffect } from "react";
import {
    ColorPicker,
    TextField,
    Form,
    Select,
    Button,
    Banner,
} from "@shopify/polaris";

import axios from "axios";
import convert from "color-convert";
import { useLog } from '@provider/Log'

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

    const {success} = useLog();

    const handleTypeSelectChange = useCallback((type) => setType(type), []);

    // Make a request to get product types
    const [typeOptions, setTypeOptions] = useState([]);
    useEffect(() => {
        async function fetch() {
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

        fetch();
    }, []);

    // Submit button
    const [submitDisabled, setSubmitDisabled] = useState(false);

    // Submit handler
    async function handleFormSubmit() {
        setSubmitDisabled(true);
        const rgb = convert.hsv.hex(
            color.hue,
            color.saturation * 100,
            color.brightness * 100
        );
        const options = { weight, price, name, type_id: type, color: rgb };
        try {
            const res = await axios.post("/api/products", options);
            success("Successfully created new product");
        } catch (e) {
            setErrors(e.response.data.errors);
        }
        setSubmitDisabled(false);
    }

    return (
        <Fragment>
            <Title>Create Product</Title>

            <CenterContainer className="min-height-screen-skip-navbar">
                <FormContainer>
                    <Form onSubmit={handleFormSubmit}>
                        <h2 className="text-center">Add new product</h2>

                        <div className="mt-3">
                            <TextField
                                focused
                                placeholder="Product name"
                                label="Name"
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
