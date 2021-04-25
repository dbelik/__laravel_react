<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProductTypeRequest;
use App\Models\ProductType;
use Illuminate\Support\Facades\Cache;

class ProductTypeController extends Controller
{
    public function get()
    {
        return Cache::remember('product_types', 60 * 60, function () {
            return ProductType::all();
        });
    }

    public function post(ProductTypeRequest $request)
    {
        // All data is valid, store them in database now.
        $type = new ProductType();
        $type->name = $request->title;
        $type->timestamps = false;
        $type->save();

        // Store new types in cache
        $res = Cache::get("product_types");
        $res[] = $type;
        Cache::put("product_types", $res);

        return response()->noContent(201);
    }
}
