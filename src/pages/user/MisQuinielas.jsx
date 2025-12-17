import React from 'react';

import QuinielaCard from '../../components/QuinielaCard';

// Datos de ejemplo para simular las quinielas ACTIVAS del usuario
const activeQuinielas = [
  {
    id: 1,
    liga: "LIGA SANTANDER",
    categoria: "emerald",
    titulo: "Jornada 28",
    descripcion: "Pronósticos enviados. Esperando resultados.",
    participantes: 2450,
    tiempo: { valor: "3 días", texto: "Para cierre" },
    color: {
      bg: "bg-emerald-100",
      text: "text-emerald-700",
      btn: "bg-emerald-600",
      btnHover: "bg-emerald-700"
    },
    textoBoton: "Ver pronóstico"
  },
  {
    id: 2,
    liga: "CHAMPIONS LEAGUE",
    categoria: "amber",
    titulo: "Octavos de final",
    descripcion: "Tienes 2 pronósticos pendientes de hacer.",
    participantes: 5820,
    tiempo: { valor: "7 días", texto: "Para cierre" },
    color: {
      bg: "bg-amber-100",
      text: "text-amber-700",
      btn: "bg-amber-500",
      btnHover: "bg-amber-600"
    },
    textoBoton: "Hacer pronóstico" 
  },
  {
    id: 3,
    liga: "PREMIER LEAGUE",
    categoria: "blue",
    titulo: "Temporada completa",
    descripcion: "Tu pronóstico de campeón está activo.",
    participantes: 8150,
    tiempo: { valor: "En curso", texto: "Hasta mayo" },
    color: {
      bg: "bg-blue-100",
      text: "text-blue-700",
      btn: "bg-blue-600",
      btnHover: "bg-blue-700"
    },
    textoBoton: "Ver mis pronósticos"
  },
];

const MisQuinielasPage = () => {
  return (
    <DashboardLayout isAdmin={false}>
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-emerald-800 mb-4">Mis Quinielas Activas</h2>
        <p className="text-gray-600 mb-8">Revisa el estado de las quinielas en las que estás participando.</p>
        
        {/* Lista de Quinielas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeQuinielas.map((quiniela) => (
            <QuinielaCard key={quiniela.id} quiniela={quiniela} />
          ))}
        </div>
        
        <div className="mt-8 p-4 bg-gray-50 border border-gray-200 rounded-lg text-center">
            <p className="text-gray-500">
                Tienes **3** quinielas activas (este número corresponde al badge del menú).
            </p>
        </div>
        
      </div>
    </DashboardLayout>
  );
};

export default MisQuinielasPage;