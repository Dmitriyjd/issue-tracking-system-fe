import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import LoginPage from './containers/LogIn/LogIn';
import RegistrationPage from './containers/Registration/Registration';
import BoardsPage from './containers/Boards/Boards';
import Backlog from "./containers/Backlog/Backlog";
import BoardPageView from "./containers/BoardPageView/BoardPageView"
import IssueView from "./components/IssueView/IssueView";

const Routes = () => {
    return (
        <Switch>
            <Route exact path="/login" component = { LoginPage }/>
            <Route path="/register" component = { RegistrationPage }/>
            <Route path="/boards" component = { BoardsPage }/>
            <Route path="/backlog" component = { Backlog }/>
            <Route path="/board" component = { BoardPageView }/>
            <Route path="/issue" component ={ IssueView }/>

            <Redirect to="/login" />
        </Switch>
    )
};

export default Routes;
