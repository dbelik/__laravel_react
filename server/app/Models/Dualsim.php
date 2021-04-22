<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Dualsim extends Model
{
    use HasFactory;
    
    public $timestamps = false;
    protected $table = 'dualsims';

    public function attribute()
    {
        return $this->morphMany(Attribute::class, 'attributable');
    }
}
