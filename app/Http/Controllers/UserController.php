<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User; // Asegúrate de importar el modelo User

class UserController extends Controller
{
    // Crear un nuevo usuario
    public function store(Request $request)
    {
        // Validar los datos del usuario
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:6|confirmed',  // Confirmación de la contraseña
        ]);

        // Crear un nuevo usuario en la base de datos
        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => bcrypt($validated['password']), // Cifrar la contraseña
        ]);

        // Retornar el usuario creado en formato JSON
        return response()->json($user, 201);
    }

    // Método para obtener todos los usuarios
    public function index()
    {
        $users = User::all();
        return response()->json($users);
    }
}
