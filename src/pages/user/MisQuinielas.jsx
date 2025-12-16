import React from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import QuinielaCard from '../../components/QuinielaCard';

// Datos de ejemplo adaptados de QuinielasDestacadas para simular la lista completa
const allQuinielas = [
  {
    id: 1,
    liga: "LIGA SANTANDER",
    categoria: "emerald",
    titulo: "Jornada 28",
    descripcion: "Pronostica los resultados de la jornada 28 de LaLiga.",
    participantes: 2450,
    tiempo: { valor: "3 días", texto: "Para jugar" },
    color: {
      bg: "bg-emerald-100",
      text: "text-emerald-700",
      btn: "bg-emerald-600",
      btnHover: "bg-emerald-700"
    },
    textoBoton: "Unirme a esta quiniela"
  },
  {
    id: 2,
    liga: "CHAMPIONS LEAGUE",
    categoria: "amber",
    titulo: "Octavos de final",
    descripcion: "Pronostica los resultados de los octavos de final.",
    participantes: 5820,
    tiempo: { valor: "7 días", texto: "Para jugar" },
    color: {
      bg: "bg-amber-100",
      text: "text-amber-700",
      btn: "bg-amber-500",
      btnHover: "bg-amber-600"
    },
    textoBoton: "Unirme a esta quiniela"
  },
  {
    id: 3,
    liga: "PREMIER LEAGUE",
    categoria: "blue",
    titulo: "Temporada completa",
    descripcion: "Pronostica el campeón y resultados de la Premier League.",
    participantes: 8150,
    tiempo: { valor: "En curso", texto: "Hasta mayo" },
    color: {
      bg: "bg-blue-100",
      text: "text-blue-700",
      btn: "bg-emerald-600",
      btnHover: "bg-emerald-700"
    },
    textoBoton: "Ver mis pronósticos" // Cambiado para simular que ya está unido
  },
  // Añadir más quinielas de ejemplo para simular una lista más grande
  {
    id: 4,
    liga: "COPA DEL REY",
    categoria: "red",
    titulo: "Final",
    descripcion: "El gran partido por el título de la Copa.",
    participantes: 1200,
    tiempo: { valor: "1 día", texto: "Para jugar" },
    color: {
      bg: "bg-red-100",
      text: "text-red-700",
      btn: "bg-red-600",
      btnHover: "bg-red-700"
    },
    textoBoton: "Unirme a esta quiniela"
  },
];

const MisQuinielasPage = () => {
  return (
    <DashboardLayout isAdmin={false}>
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-emerald-800 mb-4">Quinielas Disponibles</h2>
        <p className="text-gray-600 mb-8">Únete a las quinielas que te interesen o revisa el estado de tus pronósticos activos.</p>
        
        {/* Lista de Quinielas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allQuinielas.map((quiniela) => (
            <QuinielaCard key={quiniela.id} quiniela={quiniela} />
          ))}
        </div>
        
        <div className="mt-8 p-4 bg-gray-50 border border-gray-200 rounded-lg text-center">
            <p className="text-gray-500">
                Esta lista simula todas las quinielas a las que puedes unirte o las que ya tienes activas.
            </p>
        </div>
        
      </div>
    </DashboardLayout>
  );
};

export default MisQuinielasPage;