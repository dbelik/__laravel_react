<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProductAttributeValTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('product_attribute_val_bool', function (Blueprint $table) {
            $table->id();

            $table->unsignedBigInteger('attribute_id');
            $table->foreign('attribute_id')->references('id')->on('product_attribute');

            $table->boolean('val');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('product_attribute_val');
    }
}
