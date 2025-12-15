import React from 'react';
import Header from '../components/Header';
import Login from '../components/Login';
import Footer from '../components/Footer';

const LoginPage = () => {
  return (
    <>
      <Header />
      <main className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <Login />
      </main>
      <Footer />
    </>
  );
};

export default LoginPage;