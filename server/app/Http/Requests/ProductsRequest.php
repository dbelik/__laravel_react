<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProductsRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'weight' => 'required|numeric',
            'color' => 'required|string|max:6',
            'price' => 'required|numeric',
            'type_id' => 'required|exists:product_types,id',
        ];
    }

    /**
     * Custom message for validation.
     *
     * @return array
     */
    public function messages()
    {
        return [
            'color.max' => 'Color must be written in rgb format (#rrggbb, 6 letters) without hash symbol',
        ];
    }
}
