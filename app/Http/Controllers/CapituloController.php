<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Capitulo;  // Asegúrate de importar el modelo Capitulo
use App\Models\Curso;  // Para asociar el capítulo con un curso

class CapituloController extends Controller
{
    // Crear un nuevo capítulo
    public function store(Request $request)
    {
    // Validación de los datos
    $validated = $request->validate([
        'name' => 'required|string|max:255',
        'description' => 'required|string',
        'category' => 'required|string',
        'prerequisites' => 'nullable|string',
        'capitulos' => 'required|array', // Asegurarse de que se envíe un array de capítulos
        'capitulos.*.title' => 'required|string|max:255', // Validar cada capítulo
        'capitulos.*.content' => 'required|string',
    ]);

    // Crear el curso
    $curso = Curso::create([
        'name' => $validated['name'],
        'description' => $validated['description'],
        'category' => $validated['category'],
        'prerequisites' => $validated['prerequisites'],
    ]);

    // Crear los capítulos asociados al curso
    foreach ($validated['capitulos'] as $capituloData) {
        $curso->capitulos()->create([
            'title' => $capituloData['title'],
            'content' => $capituloData['content'],
            'youtube_link' => $capituloData['youtube_link'] ?? null, // En caso de que no tenga un link de YouTube
        ]);
    }

    // Retornar el curso con los capítulos
    return response()->json($curso->load('capitulos'), 201);
}


    // Método para obtener los capítulos de un curso
    public function index($cursoId)
    {
        $curso = Curso::find($cursoId);
        if (!$curso) {
            return response()->json(['error' => 'Curso no encontrado'], 404);
        }

        // Obtener todos los capítulos del curso
        $capitulos = $curso->capitulos;
        return response()->json($capitulos);
    }
}
