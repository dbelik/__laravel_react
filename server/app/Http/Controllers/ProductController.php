<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProductRequest;
use App\Models\Attribute;
use App\Models\Color;
use App\Models\Price;
use App\Models\Product;
use App\Models\ProductType;
use App\Models\Weight;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        // Extract query params
        $productName = $request->query('name', '');
        $type = $request->query('type', '');

        // Init query
        $products = Product::query();

        // Apply search parameters
        // If name parameter has been passed
        $type = ProductType::find($type);
        if ($productName) $products = $products->where('name', 'LIKE', "%$productName%");
        if ($type) $products = $products->where('product_type_id', '=', $type->id);

        // Paginate result
        $products = $products->paginate(15);

        // Store all matching products in $res
        $res = [
            'items' => [],
            'pageState' => [
                'nextUrl' => $products->nextPageUrl(),
                'prevUrl' => $products->previousPageUrl(),
                'currentPage' => $products->currentPage(),
                'totalPages' => ceil($products->total() / $products->perPage()),
            ],
        ];

        for ($i = 0; $i < count($products); ++$i) {
            $product = $products[$i];
            $res['items'][$i] = [
                'name' => $product->name, 
                'type' => ProductType::find($product->product_type_id), 
                'id' => $product->id
            ];

            $attributes = $product->attributes()->first();
            $res['items'][$i]['weight'] = $attributes->weight->value;
            $res['items'][$i]['price'] = $attributes->price->value;
            $res['items'][$i]['color'] = $attributes->color->value;
        }

        return $res;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @return \Illuminate\Http\Response
     */
    public function store(ProductRequest $request)
    {
        // Create product
        $product = new Product();
        $product->name = $request->name;
        $product->product_type_id = $request->type_id;
        $product->save();

        $attributes = [
            ['class' => Weight::class, 'value' => $request->weight],
            ['class' => Price::class, 'value' => $request->price],
            ['class' => Color::class, 'value' => $request->color],
        ];

        foreach ($attributes as $attrib) {
            $attribute = new Attribute();
            $attribute->product_type_id = $request->type_id;
            $attribute->product_id = $product->id;

            $new_attrib = new $attrib['class']();
            $new_attrib->value = $attrib['value'];
            $new_attrib->save();
            $new_attrib->attribute()->save($attribute);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     *
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        if (Cache::has('product_'.$id)) {
            return Cache::get('product_'.$id);
        }

        $product = Product::find($id);

        // If product isn't stored, return empty result
        if (!$product) {
            return response()->noContent(404);
        }

        return Cache::remember('product_'.$id, 60 * 60, function () use ($product) {
            $savedAttrib = $product->attributes()->first();

            $res = [
                'name' => $product->name, 
                'type' => ProductType::find($product->product_type_id), 
                'id' => $product->id,
                'weight' => $savedAttrib->weight->value,
                'color' => $savedAttrib->color->value,
                'price' => $savedAttrib->price->value,
            ];
    
            return $res;
        });
    }

    /**
     * Update the specified resource in storage.
     *
     * @param int $id
     *
     * @return \Illuminate\Http\Response
     */
    public function update(ProductRequest $request, $id)
    {
        // Try to find product by id
        $product = Product::find($id);
        if (!$product) {
            return response()->noContent(404);
        }

        // Store in database
        $product->name = $request->name;
        $product->product_type_id = $request->type_id;
        $product->save();

        $savedAttrib = $product->attributes()->first();
        $savedAttrib->product_type_id = $request->type_id;

        $savedAttrib->weight->value = $request->weight;
        $savedAttrib->weight->save();
        
        $savedAttrib->price->value = $request->price;
        $savedAttrib->price->save();

        $savedAttrib->color->value = $request->color;
        $savedAttrib->color->save();

        $savedAttrib->save();

        // Store in cache
        $cache = [
            'name' => $product->name,
            'type' => ProductType::find($product->product_type_id),
            'id' => $product->id,
            'weight' => $savedAttrib->weight->value,
            'color' => $savedAttrib->color->value,
            'price' => $savedAttrib->price->value,
        ];
        Cache::put('product_'.$id, $cache);

        return response()->noContent();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     *
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        // Try to find product by id
        $product = Product::find($id);
        if (!$product) {
            return response()->noContent(404);
        }

        // Delete all attributes
        foreach ($product->attributes()->get() as $attribute) {
            $attribute->attributable->delete();
        }

        // Delete from database
        $product->delete();

        // Delete from cache
        Cache::forget('product_'.$id);
    }
}
