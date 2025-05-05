<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CapituloController;
use App\Http\Controllers\CursoController;

Route::post('/usuarios', [UserController::class, 'store']); 
Route::get('/usuarios', [UserController::class, 'index']); 

Route::get('/cursos', [CursoController::class, 'index']); 
Route::post('/cursos', [CursoController::class, 'store']);

Route::get('/cursos/{cursoId}/capitulos', [CapituloController::class, 'index']); 
Route::post('/cursos/{cursoId}/capitulos', [CapituloController::class, 'store']);


