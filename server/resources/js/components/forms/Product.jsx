import React, {useCallback, useState} from 'react';
import {ColorPicker, TextField, Form} from '@shopify/polaris';

import ContentContainer from "@components/containers/Content.jsx";

function handleFormSubmit() {
    alert('here');
}

export default function Product() {
    // Color field
    const [color, setColor] = useState({
        hue: 120,
        brightness: 1,
        saturation: 1,
    });
    const handleChange = useCallback(setColor, []);

    // Weight field
    const [weight, setWeight] = useState('1');

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
            </Form>
        </ContentContainer>
    );
}