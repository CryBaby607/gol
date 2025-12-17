import React from 'react';
import { Link } from 'react-router-dom';

const QuinielaCard = ({ quiniela }) => {
  const { 
    id,
    liga,
    categoria,
    titulo,
    descripcion,
    participantes,
    tiempo,
    color,
    textoBoton
  } = quiniela;

  // Ya no necesitamos handleJoin() si usamos Link
  // const handleJoin = () => {
  //   alert(`¡Redirigiendo para unirte a "${titulo}"!`);
  // };

  const targetPath = `/dashboard/user/quiniela/${id}`; // Nueva ruta dinámica

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="mb-4">
        <span className={`${color.bg} ${color.text} text-xs font-bold px-3 py-1 rounded-full`}>
          {liga}
        </span>
        <h3 className="text-xl font-bold mt-2">{titulo}</h3>
      </div>
      <p className="text-gray-600 mb-6">{descripcion}</p>
      <div className="flex justify-between items-center mb-6">
        <div>
          <div className="text-lg font-bold">{participantes.toLocaleString()}</div>
          <div className="text-sm text-gray-500">Participantes</div>
        </div>
        <div>
          <div className="text-lg font-bold">{tiempo.valor}</div>
          <div className="text-sm text-gray-500">{tiempo.texto}</div>
        </div>
      </div>
      <Link 
        to={targetPath} // Usamos Link para navegar
        className={`w-full flex justify-center ${color.btn} hover:${color.btnHover} text-white font-bold py-3 rounded-lg transition-colors`}
      >
        {textoBoton}
      </Link>
    </div>
  );
};

export default QuinielaCard;