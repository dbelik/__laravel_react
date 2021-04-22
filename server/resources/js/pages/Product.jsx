import React from "react";
import { useParams } from "react-router-dom";

import Product from "@components/forms/Product";

export default function Products() {
    const { id } = useParams();
    return <Product id={id} title="Change product's data" method="put" mustExist={true} />;
}
