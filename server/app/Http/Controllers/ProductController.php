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
        $productName = $request->query('name');
        $productName = $productName ? $productName : '';
        $minPrice = $request->query('minPrice');
        $minPrice = $minPrice ? $minPrice : '';
        $maxPrice = $request->query('maxPrice');
        $maxPrice = $maxPrice ? $maxPrice : '';
        $type = $request->query('type');
        $type = $type ? $type : '';

        // Init query
        $products = Product::query();

        // Apply search parameters
        // If name parameter has been passed
        $type = ProductType::find($type);
        if ($productName) $products = $products->where('name', 'LIKE', "%$productName%");
        // if (is_numeric($minPrice)) $products = $products->where('price', '>', $minPrice);
        // if (is_numeric($maxPrice)) $products = $products->where('price', '<', $maxPrice);
        if ($type) $products = $products->where('product_type_id', '=', $type->id);

        // Paginate result
        $products = $products->paginate(5);

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
        $product = Product::find($id);
        // If product isn't stored, return empty result
        if (!$product) {
            return [];
        }

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
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param int $id
     *
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
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
        // Update product
        $product = Product::find($id);

        if (!$product) {
            return response("Couldn't find product with the given id")->status(404);
        }

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
        $product = Product::find($id);
        if (!$product) {
            return [];
        }

        foreach ($product->attributes()->get() as $attribute) {
            $attribute->attributable->delete();
        }

        $product->delete();
    }
}
