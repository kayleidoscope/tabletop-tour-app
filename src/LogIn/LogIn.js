import React, {Component} from 'react';
// import Nav from '../nav/Nav';
import './LogIn.css'

class LogIn extends Component {

    render() {

        return (
            <section className="log-in-section">
            <h2>Log in</h2>
            <p>Enter your credentials below.</p>
            <form>
                 <label htmlFor="username">Username: </label>
                 <input type="text" id="username" name="username"/>
                 <br/>
                <input type="submit" value="Submit"/>
                <button onClick={this.props.handleCancelButton}>
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

export default LogIn;