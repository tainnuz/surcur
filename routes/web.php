<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('index'); 
});

Route::prefix('api')->group(base_path('routes/api.php'));
