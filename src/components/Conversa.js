import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { View, Text, TextInput, Image, TouchableHighlight, ListView,NativeModules,Dimensions, Alert } from 'react-native';
import { modificaMensagem, enviarMensagem, conversaUsuarioFetch } from '../actions/AppActions';
import ImagePicker from 'react-native-image-crop-picker';

class Conversa extends Component {

    componentWillMount() {
        this.props.conversaUsuarioFetch(this.props.contatoEmail)
        this.criaFonteDeDados( this.props.conversa );
        var ImagePicker = NativeModules.ImageCropPicker;
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.contatoEmail != nextProps.contatoEmail) {
            this.props.conversaUsuarioFetch(nextProps.contatoEmail)
        }
        this.criaFonteDeDados(nextProps.conversa);
    }

    criaFonteDeDados( conversa ) {
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.dataSource = ds.cloneWithRows( conversa );
    }

    _enviarMensagem() {
        const { mensagem, contatoNome, contatoEmail } = this.props;

        this.props.enviarMensagem(mensagem, contatoNome, contatoEmail);

        this.refs.conversation.scrollToEnd( { animated: false } );
    }

    _pickSingle(cropit, circular=false) {
        ImagePicker.openPicker({
          width: 300,
          height: 300,
          cropping: cropit,
          cropperCircleOverlay: circular,
          compressImageMaxWidth: 640,
          compressImageMaxHeight: 480,
          compressImageQuality: 0.5,
          compressVideoPreset: 'MediumQuality',
          includeExif: true,
        }).then(image => {
          console.log('received image', image);
          this.setState({
            image: {uri: image.path, width: image.width, height: image.height, mime: image.mime},
            images: null
          });
        }).catch(e => {
          console.log(e);
          Alert.alert(e.message ? e.message : e);
        });
      }

    renderRow(texto) {

        if(texto.tipo === 'e') {
            return (
                <View style={{ alignItems: 'flex-end', marginTop: 5, marginBottom: 5, marginLeft: 40}}>
                    <Text style={{ fontSize: 18, color: '#000', padding: 10, backgroundColor: '#dbf5b4', elevation: 1}}>{texto.mensagem}</Text>
                </View>
            )
        }

        return (
            <View style={{ alignItems: 'flex-start', marginTop: 5, marginBottom: 5, marginRight: 40}}>
                <Text style={{ fontSize: 18, color: '#000', padding: 10, backgroundColor: '#f7f7f7', elevation: 1}}>{texto.mensagem}</Text>
            </View>
        )
    }

    render() {
        return (
            <View style={{ flex: 1, marginTop: 50, backgroundColor: '#eee4dc', padding: 10 }}>
                <View style={{ flex: 1, paddingBottom: 20 }}>

                    <ListView
                        ref='conversation'
                        enableEmptySections
                        dataSource={this.dataSource}
                        renderRow={this.renderRow}            
                    />
                </View>

                <View style={{ flexDirection: 'row', height: 60 }}>
                
                    <View style={{ flex: 4, backgroundColor: '#fff', borderRadius: 25}}> 
                    
                        <TextInput 
                            value={this.props.mensagem}
                            placeholder='Digite uma mensagem'
                            underlineColorAndroid='transparent'
                            onChangeText={texto => this.props.modificaMensagem(texto) }
                            style={{ flex: 1, fontSize: 18 }}
                        />
                    </View>
                    <TouchableHighlight onPress={() => this._pickSingle(true,true)} underlayColor="#fff">
                        <Image source={require('../imgs/image_picker.png')} />
                    </TouchableHighlight>


                    <TouchableHighlight onPress={this._enviarMensagem.bind(this)} underlayColor="#fff">
                        <Image source={require('../imgs/enviar_mensagem.png')} />
                    </TouchableHighlight>

                </View>
            </View>
        )
    }
}

mapStateToProps = state => {
    
    const conversa = _.map(state.ListaConversaReducer, (val, uid) => {
        return { ...val, uid };
    });

    return ({
        conversa,
        mensagem: state.AppReducer.mensagem
    })
}

export default connect(mapStateToProps, { modificaMensagem, enviarMensagem, conversaUsuarioFetch })(Conversa)