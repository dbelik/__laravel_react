<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProductTypeRequest;
use App\Models\ProductType;

class ProductTypeController extends Controller
{
    public function get()
    {
        return ProductType::all();
    }

    public function post(ProductTypeRequest $request)
    {
        // Validate data
        $validationRes = $request->validated();

        // All data is valid, store them in database now.
        $type = new ProductType();
        $type->name = $request->name;
        $type->timestamps = false;
        $type->save();

        return redirect()->back()->with('message', 'New product type has been saved');
    }
}
