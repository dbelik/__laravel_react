import React, {useCallback, useState} from 'react';
import {ColorPicker, TextField, Form, Select, Button} from '@shopify/polaris';

import ContentContainer from "@components/containers/Content.jsx";

function handleFormSubmit() {
    alert('here');
}

export default function Products() {
    // Color field
    const [color, setColor] = useState({
        hue: 120,
        brightness: 1,
        saturation: 1,
    });
    const handleChange = useCallback(setColor, []);

    // Weight field
    const [weight, setWeight] = useState('');

    // Weight field
    const [price, setPrice] = useState('');

    // Product type field
    const [type, setType] = useState('phone');
    const handleTypeSelectChange = useCallback((type) => setType(type), []);
    const typeOptions = [
        {label: 'Phone', value: 'phone'},
        {label: 'Tablet', value: 'tablet'},
        {label: 'Laptop', value: 'laptop'},
      ];

    return (
        <ContentContainer>
            <Form onSubmit={handleFormSubmit}>
                <ColorPicker onChange={ handleChange } color={color}/>
                <TextField
                    label="Weight"
                    type="number"
                    value={weight}
                    onChange={setWeight}
                />
                <TextField
                    label="Price"
                    type="number"
                    value={price}
                    onChange={setPrice}
                />
                <Select
                    label="Product type"
                    options={typeOptions}
                    onChange={handleTypeSelectChange}
                    value={type}
                />
                <Button submit>Create</Button>
            </Form>
        </ContentContainer>
    );
}