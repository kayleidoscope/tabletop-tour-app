import React, {Component} from 'react';
// import Nav from '../nav/Nav';
import './sign-up.css'

class SignUp extends Component {

    render() {

        return (
            <section className="log-in-section">
            <h2>Sign Up</h2>
            <p>Enter your credentials below.</p>
            <form>
                 <label htmlFor="username">Username: </label>
                 <input type="text" id="username" name="username"/>
                 <br/>
                <input type="submit" value="Submit"/>
                <button onClick={e => this.props.handleClickCancel}>
                    Cancel
                </button>
                {/* {this.state.error && (
                    <ValidationError message={"No user found"}/>
                )} */}
            </form>
     
        </section>
        )
    }
}

export default SignUp;