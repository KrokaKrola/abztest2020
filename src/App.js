import React, { useEffect } from 'react';
import { initialState, appStateReducer } from './store/appReducer';
import AppStateProvider, { useAppState } from './store/app-state';
import Header from './layout/Header';
import Hero from './layout/Hero';
import About from './layout/About';
import Users from './layout/Users';
import Register from './layout/Register';
import Footer from './layout/Footer';
import { instance } from './service/settings';

function App() {
  const [, dispatch] = useAppState();
  useEffect(() => {
    instance.get('/token').then(response => {
      const token = response.data.token;

      dispatch({ type: 'SET_TOKEN', token: token });
    });
  }, [dispatch]);

  return (
    <div className="wrapper">
      <Header />
      <main>
        <Hero />
        <About />
        <Users />
        <Register />
      </main>
      <Footer />
    </div>
  );
}

export default () => {
  return (
    <AppStateProvider reducer={appStateReducer} initialState={initialState}>
      <App />
    </AppStateProvider>
  );
};
