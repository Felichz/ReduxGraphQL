import React from 'react';
import { Switch, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import Home from './components/home/HomePage';
import FavPage from './components/favs/FavPage';
import LoginPage from './components/login/LoginPage';

export default function Routes() {
    return (
        <Switch>
            <PrivateRoute exact path="/" component={Home} redirectTo="/login" />
            <PrivateRoute
                path="/favs"
                component={FavPage}
                redirectTo="/login"
            />
            <Route path="/login" component={LoginPage} />
        </Switch>
    );
}
