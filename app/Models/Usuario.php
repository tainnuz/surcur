<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Usuario extends Model
{
    use HasFactory;

    protected $fillable = ['username', 'email', 'password', 'control_number', 'role'];

    // Relación uno a muchos con Cursos
    public function cursos()
    {
        return $this->hasMany(Curso::class, 'created_by');
    }
}
