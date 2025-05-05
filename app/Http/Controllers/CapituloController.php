<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Capitulo; 
use App\Models\Curso;  

class CapituloController extends Controller
{
    public function store(Request $request, $cursoId)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'youtube_link' => 'nullable|url',
        ]);

        $curso = Curso::find($cursoId);
        if (!$curso) {
            return response()->json(['error' => 'Curso no encontrado'], 404);
        }

        $capitulo = new Capitulo([
            'title' => $validated['title'],
            'content' => $validated['content'],
            'youtube_link' => $validated['youtube_link'],
        ]);

        $curso->capitulos()->save($capitulo); 

        return response()->json($capitulo, 201); 
    }

    public function index($cursoId)
    {
        $curso = Curso::find($cursoId);
        if (!$curso) {
            return response()->json(['error' => 'Curso no encontrado'], 404);
        }

        $capitulos = $curso->capitulos;
        return response()->json($capitulos);
    }
}
