<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Color;

class Attribute extends Model
{
    use HasFactory;
    
    public $timestamps = false;

    public function attributable()
    {
        return $this->morphTo();
    }

    public function color() {
        return $this->morphOne(Color::class, 'colorable');
    }
}
