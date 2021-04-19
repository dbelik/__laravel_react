<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductAttributeValBool extends Model
{
    use HasFactory;

    public function attribute() {
        return $this->hasOne(ProductAttribute::class);
    }
}
