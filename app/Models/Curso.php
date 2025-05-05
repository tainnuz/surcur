<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Curso extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'description', 'prerequisites', 'category', 'created_by'];

    public function capitulos()
    {
        return $this->hasMany(Capitulo::class, 'course_id');
    }

    public function usuario()
    {
        return $this->belongsTo(Usuario::class, 'created_by');
    }
}
