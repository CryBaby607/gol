import React from 'react';
import QuinielaCard from '../../components/QuinielaCard';

// Contenido de la quiniela copiado de MisQuinielasPage.jsx para simular las disponibles
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
    textoBoton: "Unirme a esta quiniela"
  },
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


const JoinQuinielas = () => {
  return (
    <DashboardLayout isAdmin={false}>
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-emerald-800 mb-4">Unirme a Quinielas (Disponibles)</h2>
        <p className="text-gray-600 mb-8">Explora y únete a las quinielas disponibles con premios activos.</p>
        
        {/* Lista de Quinielas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allQuinielas.map((quiniela) => (
            <QuinielaCard key={quiniela.id} quiniela={quiniela} />
          ))}
        </div>
        
      </div>
    </DashboardLayout>
  );
};

export default JoinQuinielas;