import { MODIFICA_EMAIL, MODIFICA_SENHA, MODIFICA_NOME, CADASTRO_USUARIO_ERRO, CADASTRO_USUARIO_SUCESSO, AUTENTICAR_USUARIO_ERRO, AUTENTICAR_USUARIO_SUCESSO } from './types';

const INITIAL_STATE = {
    nome: '',
    email: '',
    senha: '',
    erroCadastro: '',
    erroLogin: ''
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type){
        case MODIFICA_EMAIL:
            return { ...state, email: action.payload }
        case MODIFICA_SENHA:
            return { ...state, senha: action.payload }
        case MODIFICA_NOME:
            return { ...state, nome: action.payload }
        case CADASTRO_USUARIO_ERRO:
             return { ...state, erroCadastro: action.payload }
        case CADASTRO_USUARIO_SUCESSO:
            return { ...state, nome: '', senha: ''}
        case AUTENTICAR_USUARIO_ERRO:
            return { ...state, erroLogin: action.payload }
        default:
            return state;
    }
}