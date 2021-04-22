<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $table = 'products';
    public $timestamps = false;

//    public function attributes()
//    {
//        return $this->morphMany(Attribute::class, 'attributable');
//    }

    public function productType()
    {
        return $this->belongsTo(ProductType::class);
    }
}
