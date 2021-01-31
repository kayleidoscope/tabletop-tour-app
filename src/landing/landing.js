import React, {Component} from 'react';
// import Nav from '../nav/Nav';
import './landing.css'
import LogIn from '../log-in/log-in'
import SignUp from '../sign-up/sign-up'

class Landing extends Component {
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
        e.preventDefault();
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
            <section>
                <p>What Good Reads does for books, we do for games!</p>
                <p>Keep track of the tabletop games you've played.</p>
                <p>Mark the games you want to remember to track down in the future.</p>
                <p>And write reviews!</p>
                {this.state.buttonsOn && 
                    <div className="buttons">
                        <button onClick={this.logInTrue}>Log In</button>
                        <button onClick={this.signUpTrue}>Sign Up</button>
                        <button>Log In as Demo User</button>
                    </div>
                }
                {this.state.logInBox && <LogIn handleCancelButton={this.clickCancel}/>}
                {this.state.signUpBox && <SignUp handleCancelButton={this.clickCancel}/>}
            </section>
        )
    }
}

export default Landing;