import React from 'react';
import styles from './login.module.css';
import { connect } from 'react-redux';
import { googleLoginAction, logoutAction } from '../../redux/userDuck';
import Loader from '../Loader';

function LoginPage({ fetching, loggedIn, googleLoginAction, logoutAction }) {
    if (fetching) {
        return <Loader />;
    } else {
        return (
            <div className={styles.container}>
                {loggedIn ? (
                    <>
                        <h1>Cierra tu sesión</h1>
                        <button onClick={logoutAction}>Cerrar Sesión</button>
                    </>
                ) : (
                    <>
                        <h1>Inicia Sesión con Google</h1>
                        <button onClick={googleLoginAction}>Iniciar</button>
                    </>
                )}
            </div>
        );
    }
}

function mapStateToProps({ user: { fetching, loggedIn } }) {
    return {
        fetching,
        loggedIn,
    };
}

export default connect(mapStateToProps, { googleLoginAction, logoutAction })(
    LoginPage
);
