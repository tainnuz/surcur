<?php

namespace App\Http\Controllers;

use App\Models\Curso;
use Illuminate\Http\Request;

class CursoController extends Controller
{
    // Crear un nuevo curso con múltiples capítulos
    public function store(Request $request)
    {
        // Validación de los datos del curso
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'category' => 'required|string',
            'prerequisites' => 'nullable|string',
            'capitulos' => 'required|array', // Asegurarse de que se envíe un array de capítulos
            'capitulos.*.title' => 'required|string|max:255', // Validar cada capítulo
            'capitulos.*.content' => 'required|string',
        ]);

        // Crear el nuevo curso
        $curso = Curso::create([
            'name' => $validated['name'],
            'description' => $validated['description'],
            'category' => $validated['category'],
            'prerequisites' => $validated['prerequisites'],
        ]);

        // Crear los capítulos asociados al curso
        foreach ($validated['capitulos'] as $capituloData) {
            // Crear cada capítulo y asociarlo con el curso
            $curso->capitulos()->create([
                'title' => $capituloData['title'],
                'content' => $capituloData['content'],
                'youtube_link' => $capituloData['youtube_link'] ?? null, // En caso de que no tenga un link de YouTube
            ]);
        }

        // Retornar el curso con los capítulos asociados
        return response()->json($curso->load('capitulos'), 201); // Cargar los capítulos relacionados
    }

    // Obtener todos los cursos
    public function index()
    {
        return response()->json(Curso::with('capitulos')->get());
    }

    // Obtener un curso por ID
    public function show($id)
    {
        return response()->json(Curso::with('capitulos')->findOrFail($id));
    }
}
