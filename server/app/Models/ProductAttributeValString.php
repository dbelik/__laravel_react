<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductAttributeValString extends Model
{
    use HasFactory;

    public function attribute() {
        return $this->hasOne(ProductAttribute::class);
    }
}
