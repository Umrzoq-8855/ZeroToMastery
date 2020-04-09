import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';

import './App.css';

import Homepage from "./pages/homepage/homepage";
import Shop from "./pages/shop/shop";
import Header from "./components/header/header";
import ParticlesBg from 'particles-bg';
import SignInAndSignUp from "./pages/sign-in-and-sign-up/sign-in-and-sign-up";
import {auth, createUserProfileDocument} from "./firebase/firebase.utils";

class App extends Component{
    constructor(props) {
        super(props);

        this.state = {
            currentUser: null
        }
    }

    unsubscribeFromAuth = null;

    componentDidMount() {
        this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
            if (userAuth) {
                const userRef = await createUserProfileDocument(userAuth);

                userRef.onSnapshot(snapShot => {
                    this.setState({
                        currentUser: {
                            id: snapShot.id,
                            ...snapShot.data()
                        }
                    })
                });
            }
            this.setState({currentUser: userAuth})
        })
    }

    componentWillUnmount() {
        this.unsubscribeFromAuth();
    }

    render() {
        return (
            <div>
                <ParticlesBg type="cobweb" bg={true} style={{width: '100%', height: '100%'}} />
                <Header currentUser={this.state.currentUser}/>
                <Switch>
                    <Route exact path="/" component={Homepage}/>
                    <Route path="/shop" component={Shop}/>
                    <Route path="/signin" component={SignInAndSignUp}/>
                </Switch>
            </div>
        )
    }
}

export default App;
