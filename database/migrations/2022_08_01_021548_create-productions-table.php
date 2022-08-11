<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
      Schema::create('venues', function (Blueprint $table){
        $table->id();
        $table->string('name')->unique();
        $table->timestamps();
        $table->softDeletes();
      });

      Schema::create('licensing_agencies', function (Blueprint $table){
        $table->id();
        $table->string('name')->unique();
        $table->string('url')->nullable();
        $table->timestamps();
        $table->softDeletes();
      });

      Schema::create('shows', function (Blueprint $table){
        $table->id();
        $table->string('name')->unique();
        $table->string('author')->nullable();
        $table->text('synopsis')->nullable();
        $table->foreignId('licensing_agency_id')->nullable();
        $table->timestamps();
        $table->softDeletes();
      });

      Schema::create('productions', function (Blueprint $table) {
        $table->id();
        $table->foreignId('show_id')->constrained();
        $table->date('opening')->nullable();
        $table->date('closing')->nullable();
        $table->foreignId('theater_company_id')->constrained();
        $table->foreignId('venue_id')->constrained();
        $table->timestamps();
        $table->softDeletes();
      });

      Schema::create('production_user', function (Blueprint $table) {
        $table->id();
        $table->foreignId('production_id')->constrained();
        $table->foreignId('user_id')->constrained();
      });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
      Schema::dropIfExists('production_user');
      Schema::dropIfExists('productions');
      Schema::dropIfExists('shows');
      Schema::dropIfExists('licensing_agencies');
      Schema::dropIfExists('venues');  
    }
};
