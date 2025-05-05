<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Capitulo extends Model
{
    use HasFactory;

    protected $fillable = ['course_id', 'title', 'content', 'youtube_link'];

    public function curso()
    {
        return $this->belongsTo(Curso::class, 'course_id');
    }
}

