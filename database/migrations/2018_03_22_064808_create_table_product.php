<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTableProduct extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('products', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('vendor_id');
            $table->string('customer_facing_name')->nullable();
            $table->string('back_end_name')->nullable();
            $table->string('sku')->nullable();
            $table->string('category')->nullable();
            $table->string('subcategory')->nullable();
            $table->string('hh_customer_price')->nullable();
            $table->string('grocery_price')->nullable();
            $table->string('our_cost')->nullable();
            $table->string('market')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
       Schema::dropIfExists('products');
    }
}
