import React, { Component } from 'react';
import { View, Text, TextInput, Button, TouchableHighlight, ImageBackground , StyleSheet, TouchableOpacity, ActivityIndicator} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { modificaEmail, modificaSenha, autenticarUsuario } from '../actions/AutenticacaoActions';

const styles = StyleSheet.create({
    buttonContainer: {
        flex: 2,
        justifyContent: 'center'
    },
	button: {
        backgroundColor: '#115E54',
        paddingVertical: 8,
        paddingHorizontal: 30,
        marginTop: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height:  2},
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 3
      },
      buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',   
      }
});

class formLogin extends Component {
    _auntenticarUsuario(){
        const { email, senha } = this.props;    
        this.props.autenticarUsuario(email, senha);
    }

    renderBtnAcessar(){
        if(this.props.loading_login){
            return ( <ActivityIndicator size="large" /> )
        }
        return(
            <TouchableOpacity style={styles.button}  onPress={() => this._auntenticarUsuario()}>
                <Text style={styles.buttonText}>Acessar</Text>
            </TouchableOpacity>
        )
    }

    render(){
        return (
            <ImageBackground style={{ flex: 1, width: null }} source={require('../imgs/bg.png')}>
                <View style={{ flex: 1, padding: 10 }}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 25, color: '#fff' }}>WhatsApp Clone</Text>
                    </View>
                    <View style={{ flex: 2}}>
                        <TextInput value={this.props.email} style={{ fontSize: 20, height: 45 }} placeholder='E-mail' placeholderTextColor='#fff' onChangeText={texto => this.props.modificaEmail(texto) } />
                        <TextInput secureTextEntry value={this.props.senha} style={{ fontSize: 20, height: 45 }} placeholder='Senha' placeholderTextColor='#fff' onChangeText={texto => this.props.modificaSenha(texto) } />
                        <TouchableHighlight onPress={() => Actions.formCadastro() }>
                            <Text style={{ fontSize: 20, color: '#fff' }}>Ainda não tem cadastro? Cadastre-se</Text>
                        </TouchableHighlight>
                        <Text style={{ color:'#ff0000', fontSize: 18 }}>{this.props.erroLogin}</Text>
                    </View>
                    <View style={styles.buttonContainer}>
                        { this.renderBtnAcessar() }
                        {/*<Button title="Acessar" color='#115E54' onPress={() => false} />*/}
                    </View>
                </View>
            </ImageBackground>
        );
    }
}

const mapStateToProps = state => (
    {
        email: state.AutenticacaoReducer.email,
        senha: state.AutenticacaoReducer.senha,
        erroLogin: state.AutenticacaoReducer.errologin,
        loading_login: state.AutenticacaoReducer.loading_login
    }
)

export default connect(mapStateToProps, { modificaEmail, modificaSenha, autenticarUsuario })(formLogin);