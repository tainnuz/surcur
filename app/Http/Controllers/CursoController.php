<?php

namespace App\Http\Controllers;

use App\Models\Curso;
use Illuminate\Http\Request;

class CursoController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'category' => 'required|string',
            'prerequisites' => 'nullable|string',
            'capitulos' => 'required|array', 
            'capitulos.*.title' => 'required|string|max:255', 
            'capitulos.*.content' => 'required|string',
        ]);

        $userId = 1;

        $curso = Curso::create([
            'name' => $validated['name'],
            'description' => $validated['description'],
            'category' => $validated['category'],
            'prerequisites' => $validated['prerequisites'],
            'created_by' => $userId,  
        ]);

        foreach ($validated['capitulos'] as $capituloData) {
            $curso->capitulos()->create([
                'title' => $capituloData['title'],
                'content' => $capituloData['content'],
                'youtube_link' => $capituloData['youtube_link'] ?? null,
            ]);
        }

        return response()->json($curso->load('capitulos'), 201);
    }

    public function index()
    {
        return response()->json(Curso::with('capitulos')->get());
    }

    public function show($id)
    {
        return response()->json(Curso::with('capitulos')->findOrFail($id));
    }
}
