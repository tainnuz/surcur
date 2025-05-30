import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router';

function ListaCapitulos() {

  const { id } = useParams(); 
  const [capitulos, setCapitulos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const obtenerCapitulos = async () => {
      try {
        const response = await axios.get(`http://localhost/backend-surcur/api/obtener_capitulos.php?idCurso=${id}`);
        setCapitulos(response.data);
      } catch (error) {
        console.error('Error al obtener capítulos:', error);
      }
    };

    obtenerCapitulos();
  }, [id]);

  return (
    <div className="container mt-5">
      <h3 className="mb-4">Capítulos del Curso</h3>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {capitulos.map((capitulo) => (
          <div className="col" key={capitulo.id}>
            <div className="card h-100 shadow">
              <img 
                src="/img/generic-chapter.jpg" 
                className="card-img-top"
                alt="Imagen genérica capítulo"
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{capitulo.titulo}</h5>
                <p className="card-text">{capitulo.descripcion}</p>
                <button
                  className="btn btn-primary mt-auto"
                  onClick={() => navigate(`/capitulo/${capitulo.id}`)}
                >
                  Ir
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ListaCapitulos;
