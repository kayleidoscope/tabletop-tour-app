import React, {Component} from 'react';
import Context from '../Context'
import './Landing.css'
import LogIn from '../LogIn/LogIn'
import SignUp from '../SignUp/SignUp'

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

        return (
            <section className="landing">
                <p>What Good Reads does for books, we do for games!</p>
                <p>Find and review games, with or without an account.</p>
                <p>Or sign up for a free account below to keep track of the tabletop games you've played, or that you want to play in the future.</p>
                <p>Get started by clicking "Discover" above to find games, or create an account to start tracking games you love.</p>
                {this.state.buttonsOn && 
                    <div className="buttons">
                        <button onClick={this.logInTrue}>Log In</button>
                        <button onClick={this.signUpTrue}>Sign Up</button>
                        <button onClick={this.context.demoLogIn}>Log In as Demo User</button>
                    </div>
                }
                {this.state.logInBox && <LogIn handleCancelButton={this.clickCancel}/>}
                {this.state.signUpBox && <SignUp handleCancelButton={this.clickCancel}/>}
            </section>
        )
    }
}

export default Landing;