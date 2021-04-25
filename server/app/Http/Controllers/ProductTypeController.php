<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProductTypeRequest;
use App\Models\ProductType;
use Illuminate\Support\Facades\Cache;

class ProductTypeController extends Controller
{
    public function index()
    {
        return Cache::remember('product_types', 60 * 60, function () {
            return ProductType::all();
        });
    }

    public function store(ProductTypeRequest $request)
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
    
    public function show($id)
    {
        if (Cache::has('product_type_'.$id)) {
            return Cache::get('product_type_'.$id);
        }

        $type = ProductType::find($id);

        // If product isn't stored, return empty result
        if (!$type) {
            return response()->noContent(404);
        }

        return Cache::remember('product_type_'.$id, 60 * 60, function () use ($type) {
            $res = [
                'name' => $type->name, 
                'id' => $type->id,
            ];
    
            return $res;
        });
    }
    
    public function update(ProductTypeRequest $request, $id)
    {
        // Try to find product by id
        $product = ProductType::find($id);
        if (!$product) {
            return response()->noContent(404);
        }

        // Store in database
        $product->name = $request->title;
        $product->save();

        // Store in cache
        $cache = [
            'id' => $id,
            'name' => $product->name,
        ];
        Cache::put('product_type_'.$id, $cache);
        Cache::forget('product_types');

        return response()->noContent(200);
    }
    
    public function destroy($id)
    {
        // Try to find product by id
        $type = ProductType::find($id);
        if (!$type) {
            return response()->noContent(404);
        }

        // Delete from database
        $type->delete();

        // Delete from caches
        Cache::forget('product_type_'.$id);
        Cache::forget('product_types');
    }
}
