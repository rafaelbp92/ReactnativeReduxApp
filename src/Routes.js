import React from 'react';
import { Router, Scene } from 'react-native-router-flux';

import FormLogin from './components/FormLogin';
import FormCadastro from './components/FormCadastro';
import Welcome from './components/Welcome';
import Principal from './components/Principal';
import AdicionarContato from './components/AdicionarContato';
import Conversa from './components/Conversa';
import Contatos from './components/Contatos';
import Conversas from './components/Conversas';

export default props => (
    <Router navigationBarStyle={{ backgroundColor: '#115E54' }} titleStyle={{ color: '#FFF' }}>
        <Scene key='root'>
            <Scene key='formLogin' component={FormLogin} title="Login" hideNavBar={true} />
            <Scene key='formCadastro' component={FormCadastro} title="Cadastro" hideNavBar={false} />
            <Scene key='welcome' component={Welcome} title="Bem Vindo" hideNavBar={true} />
            <Scene key='principal' component={Principal} title="Principal"  hideNavBar={true} />
            <Scene key='adicionarContato' component={AdicionarContato} title="Adicionar Contato" hideNavBar={false} />
            <Scene key='conversa' component={Conversa} title="Conversa" hideNavBar={false} />   
            <Scene key='conversas' component={Conversas} title="Conversas" hideNavBar={false} /> 
            <Scene key='contatos' component={Contatos} title="Contatos" hideNavBar={false} /> 
        </Scene>
    </Router>
);