import React, { useState } from 'react';
import {connect} from 'react-redux';
import Header from './layout/Header';
import Hero from './layout/Hero';
import About from './layout/About';
import Users from './layout/Users';
import Register from './layout/Register';
import Footer from './layout/Footer';
import SuccessModal from './components/Modal';
import MobileMenu from './components/MobileMenu';
import useToken from './hooks/useToken';

function App({modalShow, token, dispatch}) {
  const [mobileMenuState, setMobileMenuState] = useState(false);
  useToken(dispatch);
  return (
    <>
      <MobileMenu
        mobileMenuState={mobileMenuState}
        setMobileMenuState={setMobileMenuState}
      />
      <div className={`wrapper ${mobileMenuState ? 'overlay' : ''}`}>
        <Header clickHandler={setMobileMenuState} />
        <main>
          <Hero />
          <About />
          <Users />
          {token.token && <Register />}
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

function mapState (state) {
  return {
    token: state.token,
    modalShow: state.modalShow
  }
}

function mapDispatch (dispatch) {
  return {
    dispatch
  }
}

export default connect(mapState, mapDispatch)(App);
