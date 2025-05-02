<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CapituloController;
use App\Http\Controllers\CursoController;

// Rutas para los usuarios
Route::post('/usuarios', [UserController::class, 'store']); // Crear usuario
Route::get('/usuarios', [UserController::class, 'index']); // Obtener todos los usuarios

// Rutas para los cursos
Route::get('/cursos', [CursoController::class, 'index']); // Obtener todos los cursos
Route::post('/cursos', [CursoController::class, 'store']); // Crear un curso

// Rutas para los capítulos
Route::get('/cursos/{cursoId}/capitulos', [CapituloController::class, 'index']); // Obtener capítulos de un curso
Route::post('/cursos/{cursoId}/capitulos', [CapituloController::class, 'store']); // Crear capítulo en un curso


