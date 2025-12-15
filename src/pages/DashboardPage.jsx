import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const DashboardPage = () => {
  return (
    <>
      <Header isAuth={true} />
      <main className="container mx-auto px-4 py-8 min-h-screen">
        <h1 className="text-3xl font-bold text-emerald-800 mb-6">Panel de Control</h1>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="text-gray-600">Bienvenido a tu panel de usuario.</p>
          {/* Aquí puedes agregar más contenido de tus quinielas */}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default DashboardPage;