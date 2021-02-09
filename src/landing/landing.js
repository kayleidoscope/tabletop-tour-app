import React, {Component} from 'react';
import Context from '../Context'
import './Landing.css'
import LogIn from '../LogIn/LogIn'
import {Link} from 'react-router-dom';
import SignUp from '../SignUp/SignUp'
import config from '../config'

class Landing extends Component {
    static contextType = Context

    state = {
        //when true, the logIn component will render
        logInBox: false,
        //when true, the signUp component will render
        signUpBox: false,
        buttonsOn: true,
    }

    logInTrue = (e) => {
        e.preventDefault();
        this.setState(
            {
                logInBox: true,
                buttonsOn: false
            }
        )
    }

    signUpTrue = (e) => {
        e.preventDefault();
        this.setState(
            {
                signUpBox: true,
                buttonsOn: false
            }
        )
    }

    clickCancel = (e) => {
        this.setState(
            {
                logInBox: false,
                signUpBox: false,
                buttonsOn: true
            }
        )
    }

    render() {
        const userFromStorage = JSON.parse(localStorage.getItem(`currentUser${config.CURRENT_VERSION}`))

        return (
            <section className="landing">
                {userFromStorage && <h2>Welcome back, {userFromStorage.username}!</h2>}
                <p>What Good Reads does for books, we do for games!</p>
                {userFromStorage && <p>Get started by clicking "Discover" above, or click below to go to your home page.</p>}
                {userFromStorage && <Link to={'/home'}><button>Go to Home Page</button></Link>}
                {!userFromStorage && <p>Discover new games, with or without an account.</p>}
                {!userFromStorage && <p>Or sign up for a free account below to keep track of the tabletop games you've played, or that you want to play in the future.</p>}
                {!userFromStorage && <p>Get started by clicking "Discover" from the menu, or create an account.</p>}
                {!userFromStorage && this.state.buttonsOn && 
                    <div className="buttons">
                        <button onClick={this.logInTrue}>Log In</button>
                        <button onClick={this.signUpTrue}>Sign Up</button>
                        <button className="demobtn" onClick={this.context.demoLogIn}>Log In as Demo User</button>
                    </div>
                }
                {!userFromStorage && this.state.logInBox && <LogIn handleCancelButton={this.clickCancel} history={this.props.history}/>}
                {!userFromStorage && this.state.signUpBox && <SignUp handleCancelButton={this.clickCancel} history={this.props.history}/>}
            </section>
        )
    }
}

export default Landing;