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
        Schema::create('measurements', function (Blueprint $table) {
          $table->id();
          $table->foreignId('user_id');
          $table->char('height', 100)->nullable();
          $table->char('weight', 100)->nullable();
          $table->char('tshirt_size', 100)->nullable();;
          $table->char('shoe_size', 100)->nullable();;
          $table->char('head', 100)->nullable();;
          $table->char('neck', 100)->nullable();;
          $table->char('shoulder', 100)->nullable();;
          $table->char('arm_length', 100)->nullable();;
          $table->char('wrist', 100)->nullable();;
          $table->char('bust', 100)->nullable();;
          $table->char('center_back', 100)->nullable();;
          $table->char('waist', 100)->nullable();;
          $table->char('hip', 100)->nullable();;
          $table->char('crotch_length', 100)->nullable();;
          $table->char('inseam', 100)->nullable();;
          $table->char('outseam', 100)->nullable();;
          $table->char('ankle', 100)->nullable();;
          $table->timestamp('created_at');
          $table->timestamp('updated_at');
          $table->timestamp('deleted_at')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('measurements');
    }
};
