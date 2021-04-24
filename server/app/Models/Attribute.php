<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Color;
use App\Models\Price;
use App\Models\Weight;

class Attribute extends Model
{
    use HasFactory;
    
    public $timestamps = false;

    public function attributable()
    {
        return $this->morphTo();
    }

    public function color() {
        return $this->hasOne(Color::class, 'id', 'attributable_id');
    }

    public function weight() {
        return $this->hasOne(Weight::class, 'id', 'attributable_id');
    }

    public function price() {
        return $this->hasOne(Price::class, 'id', 'attributable_id');
    }
}
