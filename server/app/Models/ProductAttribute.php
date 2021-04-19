<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductAttribute extends Model
{
    use HasFactory;

    public function val_bool() {
        return $this->hasMany(ProductAttributeValBool::class);
    }

    public function val_string() {
        return $this->hasMany(ProductAttributeValString::class);
    }
}
