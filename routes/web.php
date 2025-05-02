<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('index'); // Asegúrate de tener un archivo resources/views/index.blade.php
});

Route::prefix('api')->group(base_path('routes/api.php'));
