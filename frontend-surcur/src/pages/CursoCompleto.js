import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

function CursoCompleto() {
  const { id } = useParams();
  const [capitulos, setCapitulos] = useState([]);
  const [cursoNombre, setCursoNombre] = useState('');

  useEffect(() => {
    // Obtener capítulos del curso
    fetch(`http://localhost/backend-surcur/api/obtener_capitulos.php?curso_id=${id}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setCapitulos(data.capitulos);
        } else {
          console.error('Error al obtener capítulos:', data.message);
        }
      })
      .catch(error => console.error('Error al conectar con el backend:', error));

    // Obtener nombre del curso
    fetch(`http://localhost/backend-surcur/api/obtener_curso.php?id=${id}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setCursoNombre(data.curso.nombre);
        } else {
          console.error('Error al obtener curso:', data.message);
        }
      })
      .catch(error => console.error('Error al conectar con el backend:', error));
  }, [id]);

  const getEmbedUrl = (url) => {
    try {
      const videoId = new URL(url).searchParams.get('v');
      return `https://www.youtube.com/embed/${videoId}`;
    } catch {
      return '';
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Curso: {cursoNombre || `#${id}`}</h2>
      <h3>Capítulos del curso</h3>

      <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4 mt-3">
        {capitulos.length > 0 ? (
          capitulos.map((capitulo, index) => (
            <div className="col" key={index}>
              <div className="card h-100 shadow-sm">
                <div className="ratio ratio-16x9">
                  <iframe
                    className="card-img-top"
                    src={getEmbedUrl(capitulo.enlace)}
                    title={capitulo.titulo}
                    allowFullScreen
                  ></iframe>
                </div>
                <div className="card-body">
                  <h5 className="card-title">{capitulo.titulo}</h5>
                  <p className="card-text text-muted">{capitulo.descripcion}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No hay capítulos registrados aún.</p>
        )}
      </div>
    </div>
  );
}

export default CursoCompleto;
