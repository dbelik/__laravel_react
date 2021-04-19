<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProductAttributeValStringTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('product_attribute_val_string', function (Blueprint $table) {
            $table->id();

            $table->unsignedBigInteger('attribute_id');
            $table->foreign('attribute_id')->references('id')->on('product_attribute');

            $table->string('val');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('product_attribute_val_string');
    }
}
