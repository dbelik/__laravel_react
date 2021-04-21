<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProductsRequest;
use App\Models\Products;
use Illuminate\Http\Request;

class ProductsController extends Controller
{
    public function get(Request $request)
    {
        $products = Products::paginate(10);

        return response($products);
    }

    public function post(ProductsRequest $request)
    {
        $product = new Products();

        $product->weight = $request->weight;
        $product->color = $request->color;
        $product->price = $request->price;
        $product->type_id = $request->type_id;
        $product->timestamps = false;
        $product->save();

        return redirect()->back()->with('message', 'New product has been saved');
    }
}
