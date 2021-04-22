<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\ProductType;

class ProductTypesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        ProductType::insert([
            ['name' => "phone"],
            ['name' => "tablet"],
            ['name' => "laptop"],
        ]);
    }
}
