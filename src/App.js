import React, { useEffect, useState } from 'react';
import { initialState, appStateReducer } from './store/appReducer';
import AppStateProvider, { useAppState } from './store/app-state';
import Header from './layout/Header';
import Hero from './layout/Hero';
import About from './layout/About';
import Users from './layout/Users';
import Register from './layout/Register';
import Footer from './layout/Footer';
import { instance } from './service/settings';
import SuccessModal from './components/Modal';
import MobileMenu from './components/MobileMenu';
import { isMobile, isIOS } from 'react-device-detect';

function App() {
  const [{ modalShow, token }, dispatch] = useAppState();
  const [mobileMenuState, setMobileMenuState] = useState(false);

  useEffect(() => {
    instance.get('/token').then(response => {
      const token = response.data.token;

      dispatch({ type: 'SET_TOKEN', token: token });
    });
  }, [dispatch]);

  return (
    <>
      <MobileMenu
        className={`${isMobile && isIOS && 'iosFix'}`}
        mobileMenuState={mobileMenuState}
        setMobileMenuState={setMobileMenuState}
      />
      <div className={`wrapper ${mobileMenuState ? 'overlay' : ''}`}>
        <Header clickHandler={setMobileMenuState} />
        <main>
          <Hero />
          <About />
          <Users />
          {token && <Register />}
          <Register />
        </main>
        <Footer />
        <SuccessModal
          show={modalShow}
          onHide={() =>
            dispatch({ type: 'CHANGE_MODAL_STATE', modalShow: false })
          }
        />
      </div>
    </>
  );
}

export default () => {
  return (
    <AppStateProvider reducer={appStateReducer} initialState={initialState}>
      <App />
    </AppStateProvider>
  );
};
