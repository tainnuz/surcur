-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 29-05-2025 a las 23:32:58
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `bdsurcur`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `capitulos`
--

CREATE TABLE `capitulos` (
  `id` int(11) NOT NULL,
  `titulo` varchar(255) NOT NULL,
  `descripcion` text NOT NULL,
  `enlace` varchar(255) NOT NULL,
  `curso_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `capitulos`
--

INSERT INTO `capitulos` (`id`, `titulo`, `descripcion`, `enlace`, `curso_id`) VALUES
(6, 'Capitulo 1', 'Capitulo 1', 'https://www.youtube.com/watch?v=7iobxzd_2wY&list=PLUofhDIg_38q4D0xNWp7FEHOTcZhjWJ29&ab_channel=midulive', 3),
(8, 'Inicio de curso', 'Este es el capítulo introductorio al curso. Para este capítulo toma nota de lo mas relevante.', 'https://www.youtube.com/watch?v=7iobxzd_2wY&ab_channel=midulive', 8),
(9, 'Inicio de curso', 'Este es el capítulo introductorio al curso. Para este capítulo toma nota de lo más relevante. ', 'https://www.youtube.com/watch?v=7iobxzd_2wY&ab_channel=midulive', 9);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cursos`
--

CREATE TABLE `cursos` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `carrera` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `cursos`
--

INSERT INTO `cursos` (`id`, `nombre`, `carrera`) VALUES
(1, 'Curso De Repaso  Lenguajes automatas II', 'Ing Sistemas Comp.'),
(2, 'Curso de repaso Ing. de Software', 'Ing Sistemas Comp.'),
(3, 'Curso de React Avanzado', 'Ing Sistemas Comp.'),
(4, 'Curso de Cocina Francesa', 'Gastronomía'),
(5, 'Curso de Sis Programables', 'Ing Sistemas Comp.'),
(6, 'Curso de Repaso de Diseno en autocad', 'Int Automotriz'),
(7, 'Curso de Cocina Mexicana ', 'Gastronomía'),
(8, 'Curso de Testing para la materia de Ing de Software II', 'Ing Sistemas Comp.'),
(9, 'Curso de Testing para la materia de Ing de Software', 'Ing Sistemas Comp.'),
(10, 'Curso de Testing para la materia de Ing de Software III', 'Ing Sistemas Comp.');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `apellidos` varchar(150) NOT NULL,
  `correo` varchar(150) NOT NULL,
  `contrasena` varchar(255) NOT NULL,
  `numero_control` varchar(20) NOT NULL,
  `fecha_registro` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `nombre`, `apellidos`, `correo`, `contrasena`, `numero_control`, `fecha_registro`) VALUES
(1, 'Leonardo Gabriel', 'Pizano Zamora', 'leo@gmail.com', '$2y$10$hLkCeH9qa4vuAPrIIwIe0eL6vlAEnobRLqzhwEUWaTmsu8DgLbFRG', 's21120229', '2025-05-22 04:52:29'),
(2, 'Usuario Tester', 'Maestro Fernando', 'tester@gmail.com', '$2y$10$y.jAlDxvu6yaKq6o.q4.duRAt8OZgiyKNXDQ48P/pQRw40dUeqPZm', 's21120111', '2025-05-29 07:42:12'),
(3, 'Fernando Jose ', 'Martínez', 'fernando@gmail.com', '$2y$10$8XdAtjp9POBUfVt1mS5Aie4EXbFqTQgaZlqWfWAjegu20H./6mPQu', 's21120234', '2025-05-29 15:31:28'),
(5, 'Mariana Lucer', 'Rodiguez Gallardo', 'mariana@gmail.com', '$2y$10$vSoz4O1mg8qRYHsnJi67sOKRasTMOjvbTulZV.r/qTr2kPNDvQ21O', 's21120255', '2025-05-29 17:39:28');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `capitulos`
--
ALTER TABLE `capitulos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `curso_id` (`curso_id`);

--
-- Indices de la tabla `cursos`
--
ALTER TABLE `cursos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `correo` (`correo`),
  ADD UNIQUE KEY `numero_control` (`numero_control`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `capitulos`
--
ALTER TABLE `capitulos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `cursos`
--
ALTER TABLE `cursos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `capitulos`
--
ALTER TABLE `capitulos`
  ADD CONSTRAINT `capitulos_ibfk_1` FOREIGN KEY (`curso_id`) REFERENCES `cursos` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
