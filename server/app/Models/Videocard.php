<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Videocard extends Model
{
    use HasFactory;
    
    public $timestamps = false;
    protected $table = 'video_cards';

    public function attribute()
    {
        return $this->morphMany(Attribute::class, 'attributable');
    }
}