import React from 'react'
import { View, Text, TouchableOpacity, Image, ImageBackground, StyleSheet }  from 'react-native';
import { Actions } from 'react-native-router-flux';

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

export default props => (
    <ImageBackground style={{ flex: 1, width: null }} source={require('../imgs/bg.png')}>
        <View style={{ flex: 1, padding: 15 }}>
            <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{ fontSize:20, color: '#ffffff' }} >Seja Bem Vindo!</Text>
                <Image source={ require('../imgs/logo.png') } />
            </View> 
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={ () => Actions.formLogin() }>
                    <Text style={styles.buttonText}>Fazer Login</Text>
                </TouchableOpacity>
            </View>
        </View>
    </ImageBackground>
);