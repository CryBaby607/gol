import React from 'react';
import Header from '../components/Header';
import Register from '../components/Register';
import Footer from '../components/Footer';

const RegisterPage = () => {
  return (
    <>
      <Header />
      <main className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <Register />
      </main>
      <Footer />
    </>
  );
};

export default RegisterPage;