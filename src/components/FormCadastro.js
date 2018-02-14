import React, { Component } from 'react';
import { View, TextInput, Button, ImageBackground, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { modificaEmail, modificaSenha, modificaNome, cadastraUsuario } from '../actions/AutenticacaoActions';

const styles = StyleSheet.create({
    buttonContainer: {
        flex: 1,
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


class formCadastro extends Component {
    _cadastraUsuario(){
        //const nome = this.props.nome;
        //const email = this.props.email;
        //const senha = this.props.senha;

        const { nome, email, senha} = this.props;

        this.props.cadastraUsuario({ nome, email, senha })
    }


    renderBtnCadastrar(){
        if(this.props.loading_cadastro){
            return ( <ActivityIndicator size="large" /> )
        }
        return (
            <TouchableOpacity style={styles.button} onPress={() => this._cadastraUsuario()}>
                <Text style={styles.buttonText}>Cadastrar</Text>
            </TouchableOpacity>
        )
    }

    render(){
        return (
            <ImageBackground style={{ flex: 1, width: null }} source={require('../imgs/bg.png')}>
                <View style={{ flex: 1, padding: 10 }}>
                    <View style={{ flex: 4, justifyContent: 'center' }}>
                        <TextInput 
                            value={this.props.nome} 
                            placeholder="Nome" 
                            placeholderTextColor='#fff' 
                            style={{ fontSize: 20, height: 45 }} 
                            onChangeText={texto => this.props.modificaNome(texto)} />
                        <TextInput value={this.props.email} 
                            placeholder="E-mail" 
                            placeholderTextColor='#fff' 
                            style={{ fontSize: 20, height: 45 }} 
                            onChangeText={texto => this.props.modificaEmail(texto)} />
                        <TextInput secureTextEntry 
                            value={this.props.senha} 
                            placeholder="Senha" 
                            placeholderTextColor='#fff' 
                            style={{ fontSize: 20, height: 45 }} 
                            onChangeText={texto => this.props.modificaSenha(texto)} />

                        <Text style={{ color:'#ff0000', fontSize: 18 }}>{this.props.erroCadastro}</Text>
                    </View>
                    <View style={ styles.buttonContainer }>
                        { this.renderBtnCadastrar() }                    
                        {/* <Button title="Cadastrar" color="#115E54" onPress={() => this._cadastraUsuario()} /> --> */}
                    </View>
                </View>
            </ImageBackground>
        );
    }
}

const mapStateToProps = state => { 
    console.log(state);
    
    return (
        {
            nome: state.AutenticacaoReducer.nome,
            email: state.AutenticacaoReducer.email,
            senha: state.AutenticacaoReducer.senha,
            erroCadastro: state.AutenticacaoReducer.erroCadastro,
            loading_cadastro: state.AutenticacaoReducer.loading_cadastro
        }
    );
}

export default connect(mapStateToProps, { modificaEmail, modificaSenha, modificaNome, cadastraUsuario })(formCadastro);