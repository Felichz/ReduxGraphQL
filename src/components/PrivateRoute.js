import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Loader from './Loader';

function PrivateRoute({ loggedIn, fetching, redirectTo, ...routerProps }) {
    if (fetching) {
        return <Loader />;
    } else if (loggedIn) {
        return <Route {...routerProps} />;
    } else {
        return <Redirect to={redirectTo} />;
    }
}

const mapStateToProps = ({ user: { loggedIn, fetching } }) => ({
    loggedIn,
    fetching,
});

export default connect(mapStateToProps)(PrivateRoute);
