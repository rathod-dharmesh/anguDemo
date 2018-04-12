<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration; 

class CreateVendorsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
         Schema::create('vendors', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name')->nullable();
            $table->string('email')->unique();
            $table->integer('pnumber')->default(0);
            $table->string('status')->nullable();
            $table->string('terms')->nullable();
            $table->timestamps();
        });
        DB::table('vendors')->insert([
            ['name' => 'Kristine Schmith', 'email' => 'hydrophorous@outbellow.net', 'pnumber'=>'66' ,'status' =>'new' , 'terms'=>'net-7'],
            ['name' => 'Charise Wahl', 'email' => 'hemautograph@umbelliferae.edu', 'pnumber'=>'98' ,'status' =>'not-active' , 'terms'=>'net-14'],
            ['name' => 'Elise Trivett', 'email' => 'animalculism@isopleth.net', 'pnumber'=>'57' ,'status' =>'active' , 'terms'=>'net-30'],
            ['name' => 'Dodie Honour', 'email' => 'eunuchry@hydrometeorology.com', 'pnumber'=>'77' ,'status' =>'not-active' , 'terms'=>'cod'],
            ['name' => 'Keena Vallero', 'email' => 'menfra@limy.net', 'pnumber'=>'48' ,'status' =>'new' , 'terms'=>'cod'],
            ['name' => 'Tomasa Widmark', 'email' => 'tenfold@hooverize.org', 'pnumber'=>'20' ,'status' =>'not-active' , 'terms'=>'net-60'],
            ['name' => 'Cassandra Shipmen', 'email' => 'electrodesiccation@moonset.org', 'pnumber'=>'55' ,'status' =>'not-active' , 'terms'=>'net-14'],
            ['name' => 'Sheryl Heil', 'email' => 'sicilica@heroically.co.uk', 'pnumber'=>'43' ,'status' =>'active' , 'terms'=>'cod'],
            ['name' => 'Dakota Coronel', 'email' => 'lithocystotomy@tautonymy.net', 'pnumber'=>'16' ,'status' =>'active' , 'terms'=>'net-60'],
            ['name' => 'Val Rabideau', 'email' => 'gyrovagues@iodous.com', 'pnumber'=>'87' ,'status' =>'new' , 'terms'=>'net-45']
        ]
        );

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('vendors');
    }
}
