import React from 'react';
import { Router, Scene } from 'react-native-router-flux';

import FormLogin from './components/FormLogin';
import FormCadastro from './components/FormCadastro';
import Welcome from './components/Welcome';

export default props => (
    <Router>
        <Scene key='root'>
            <Scene key='formLogin' component={FormLogin} title="Login" />
            <Scene key='formCadastro' component={FormCadastro} title="Cadastro" />
            <Scene key='welcome' component={Welcome} title="Bem Vindo" initial />
        </Scene>
    </Router>
);
