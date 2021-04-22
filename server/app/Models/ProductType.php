<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductType extends Model
{
    use HasFactory;

    public function attributes()
    {
        return $this->hasMany(Attribute::class, 'product_type_id');
    }

    public function products(){
        return $this->hasMany(Product::class, );
    }
}