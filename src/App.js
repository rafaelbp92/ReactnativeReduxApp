import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk';

import Routes from './Routes';
import reducers from './reducers';


class App extends Component {

    componentWillMount(){
        var config = {
            apiKey: "AIzaSyCCOHCA_upHHe_b7V80WUCHhaSVCDyXJzw",
            authDomain: "reactnativereduxudemy.firebaseapp.com",
            databaseURL: "https://reactnativereduxudemy.firebaseio.com",
            projectId: "reactnativereduxudemy",
            storageBucket: "reactnativereduxudemy.appspot.com",
            messagingSenderId: "36572699228"
          };
          firebase.initializeApp(config);    
    }

    render(){
        return (
            <Provider store={createStore(reducers)}>
                <Routes />
            </Provider>      
        );
    }      
}

export default App;
