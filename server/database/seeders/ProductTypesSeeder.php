<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\ProductTypes;

class ProductTypesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        ProductTypes::insert([
            ['title' => "phone"],
            ['title' => "tablet"],
            ['title' => "laptop"],
        ]);
    }
}
