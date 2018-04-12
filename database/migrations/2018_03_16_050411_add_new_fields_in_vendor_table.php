<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddNewFieldsInVendorTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
         Schema::table('vendors', function (Blueprint $table) {
                $table->string('supplier_name')->nullable();
                $table->string('first_name')->nullable();
                $table->string('last_name')->nullable();
                $table->string('city')->nullable();
                $table->string('state')->nullable();
                $table->string('zip')->nullable();
                $table->string('categoty')->nullable();
                $table->string('type')->nullable();
                $table->string('growing_practice')->nullable();
                $table->string('freight')->nullable();
                $table->string('start_period')->nullable();
                $table->string('end_period')->nullable();
                $table->string('price_agreement')->nullable();
                $table->string('billing_address')->nullable();
                $table->string('certifications')->nullable();
                $table->string('current_balance')->nullable();
                $table->string('website')->nullable();
                $table->string('misc_notes')->nullable();
                $table->text('commodities')->nullable();
            });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('vendors', function (Blueprint $table) {
          $table->dropColumn(['supplier_name', 'first_name', 'last_name', 'city', 'state', 'zip', 'categoty', 'type', 'growing_practice', 'freight', 'start_period', 'end_period', 'price_agreement', 'billing_address', 'certifications', 'current_balance', 'website', 'misc_notes', 'commodities']);
        });
    }
}
