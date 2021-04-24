<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Attribute;

class Color extends Model
{
    use HasFactory;
    
    public $timestamps = false;
    protected $table = 'colors';

    public function attribute()
    {
        return $this->morphMany(Attribute::class, 'attributable');
    }
}