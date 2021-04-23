<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProductRequest extends FormRequest
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
            'name' => 'string|required|max:255',
            'weight' => 'numeric|required|max:500000',
            'color' => 'string|required|max:6',
            'price' => 'numeric|required|max:500000',
            'type_id' => 'required|exists:product_types,id',
        ];
    }
}
