<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class UpdateProductTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
         Schema::dropIfExists('products');
          Schema::create('products', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('vendor_id');
            $table->string('customer_facing_name')->nullable();
            $table->string('label_name')->nullable();
            $table->string('sku')->nullable();
            $table->string('category')->nullable();
            $table->string('subcategory')->nullable();
            $table->string('frequency')->nullable();
            $table->string('weeks_avilable')->nullable();
            $table->string('day_avilable')->nullable();
            $table->string('never_list_categories')->nullable();
            $table->string('default_unit_size')->nullable();
            $table->string('ice_pack')->nullable();
            $table->string('sorting')->nullable();
            $table->string('heavy_or_large_item')->nullable();
            $table->string('repacking')->nullable();
            $table->string('storage_temp')->nullable();
            $table->string('fragility_level')->nullable();
            $table->string('ethelyne_classification')->nullable();
            $table->string('value')->nullable();
            $table->string('perishable')->nullable();
            $table->string('tracking_inventory')->nullable();
            $table->string('expiration_date')->nullable();
            $table->string('dmv_available')->nullable();
            $table->string('dmv_customer_price')->nullable();
            $table->string('dmv_grocery_price')->nullable();
            $table->string('dmv_our_cost')->nullable();
            $table->string('dmv_description')->nullable();
            $table->string('dmv_quantity')->nullable();
            $table->string('dmv_unit_type_size')->nullable();
            $table->string('dmv_inventory_limits')->nullable();
            $table->string('philly_available')->nullable();
            $table->string('philly_customer_price')->nullable();
            $table->string('philly_grocery_price')->nullable();
            $table->string('philly_our_cost')->nullable();
            $table->string('philly_description')->nullable();
            $table->string('philly_quantity')->nullable();
            $table->string('philly_unit_type_size')->nullable();
            $table->string('philly_inventory_limits')->nullable();
            $table->string('raleigh_available')->nullable();
            $table->string('raleigh_customer_price')->nullable();
            $table->string('raleigh_grocery_price')->nullable();
            $table->string('raleigh_our_cost')->nullable();
            $table->string('raleigh_description')->nullable();
            $table->string('raleigh_quantity')->nullable();
            $table->string('raleigh_unit_type_size')->nullable();
            $table->string('raleigh_inventory_limits')->nullable();
            $table->string('miami_available')->nullable();
            $table->string('miami_customer_price')->nullable();
            $table->string('miami_grocery_price')->nullable();
            $table->string('miami_our_cost')->nullable();
            $table->string('miami_description')->nullable();
            $table->string('miami_quantity')->nullable();
            $table->string('miami_unit_type_size')->nullable();
            $table->string('miami_inventory_limits')->nullable();
            $table->string('detroit_available')->nullable();
            $table->string('detroit_customer_price')->nullable();
            $table->string('detroit_grocery_price')->nullable();
            $table->string('detroit_our_cost')->nullable();
            $table->string('detroit_description')->nullable();
            $table->string('detroit_quantity')->nullable();
            $table->string('detroit_unit_type_size')->nullable();
            $table->string('detroit_inventory_limits')->nullable();
            $table->string('newmarket_available')->nullable();
            $table->string('newmarket_customer_price')->nullable();
            $table->string('newmarket_grocery_price')->nullable();
            $table->string('newmarket_our_cost')->nullable();
            $table->string('newmarket_description')->nullable();
            $table->string('newmarket_quantity')->nullable();
            $table->string('newmarket_unit_type_size')->nullable();
            $table->string('newmarket_inventory_limits')->nullable();
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
