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
                <p>Keep track of the tabletop games you've played.</p>
                <p>Mark the games you want to remember to track down in the future.</p>
                <p>And write reviews!</p>
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