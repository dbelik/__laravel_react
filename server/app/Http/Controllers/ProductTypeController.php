<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProductTypeRequest;
use App\Models\ProductTypes;

class ProductTypeController extends Controller
{
    public function get()
    {
        return ProductTypes::all();
    }

    public function post(ProductTypeRequest $request)
    {
        // Validate data
        $validationRes = $request->validated();

        // All data is valid, store them in database now.
        $type = new ProductTypes();
        $type->title = $request->title;
        $type->timestamps = false;
        $type->save();

        return redirect()->back()->with('message', 'New product type has been saved');
    }
}
