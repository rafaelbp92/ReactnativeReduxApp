import firebase from 'firebase';
import { Actions}  from 'react-native-router-flux'; 
import b64 from 'base-64';
import { 
    MODIFICA_EMAIL, 
    MODIFICA_SENHA, 
    MODIFICA_NOME, 
    CADASTRO_USUARIO_ERRO, 
    CADASTRO_USUARIO_SUCESSO, 
    AUTENTICAR_USUARIO_ERRO, 
    AUTENTICAR_USUARIO_SUCESSO,
    PROCESSING_LOGIN, 
    PROCESSING_CADASTRO} from './types';

export const modificaEmail = (texto) => {
    return {
        type: MODIFICA_EMAIL,
        payload: texto
    }
}

export const modificaSenha = (texto) => {
    return {
        type: MODIFICA_SENHA,
        payload: texto
    }
}

export const modificaNome = (texto) => {
    return {
        type: MODIFICA_NOME,
        payload: texto
    } 
}

export const cadastraUsuario = ({ nome, email, senha }) => {
   return dispatch => {
        dispatch({ type:  PROCESSING_CADASTRO})

        firebase.auth().createUserWithEmailAndPassword(email, senha)
        .then( user => {
            let emailB64 = b64.encode(email);

            firebase.database().ref(`/contatos/${emailB64}`)
            .push({ nome })
            .then(cadastroUsuarioSucesso(dispatch));    
        })
        .catch(erro => cadastroUsuarioErro(erro,dispatch));    
   }
}

export const autenticarUsuario = ({email, senha}) => {
    return dispatch => {
        dispatch({ type:  PROCESSING_LOGIN})

        firebase.auth().signInWithEmailAndPassword(email,senha)
            .then( value => autentciarUsuarioSucesso(dispatch) )
            .catch( erro => auntenticarUsuarioErro(erro, dispatch) )
    }
}

const cadastroUsuarioSucesso = (dispatch) => {
    dispatch( {type: CADASTRO_USUARIO_SUCESSO});
    Actions.welcome();
}

const cadastroUsuarioErro = (erro, dispatch) => {
    dispatch( { type: CADASTRO_USUARIO_ERRO, payload: erro.message });
}

const autentciarUsuarioSucesso = (dispatch) => {
    dispatch( {type: AUTENTICAR_USUARIO_SUCESSO});
    Actions.principal();
}

const auntenticarUsuarioErro = (erro, dispatch) => {
    dispatch( { type: AUTENTICAR_USUARIO_ERRO, payload: erro.message });
}