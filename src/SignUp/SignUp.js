import React, {Component} from 'react';
import config from '../config'
import './SignUp.css'
import Context from '../Context'

class SignUp extends Component {
    static contextType = Context

    constructor(props) {
        super(props);
        this.state = {
          usernameInput: "",
          error: false
        }
      }

    usernameChanged = username => {
        this.setState({
            usernameInput: username
        })
    }

    handleSubmit = e => {
        e.preventDefault()
        const username = this.state.usernameInput
        const newUser = {username}

        //API call to create a new user
        fetch(`${config.API_ENDPOINT}api/users`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${config.API_TOKEN}`
            },
            body: JSON.stringify(newUser)
        })
            .then(res => {
                if(!res.ok) {
                    this.setState({
                        error: true
                    })
                    throw new Error(res.status)
                }
                return res.json()
            })
            .then(responseJson => {
                this.context.setCurrentUser(responseJson)
                //sets current user Id to local storage
                localStorage.setItem(
                    `currentUser${config.CURRENT_VERSION}`, JSON.stringify(responseJson)
                )
                this.props.history.push("/home")
            })
            .catch(error => {
                console.error(error)
            })
        
    }


    render() {

        return (
            <section className="sign-up-section">
            <h2>Sign Up</h2>
            <p>Enter your credentials below.</p>
            <form onSubmit={this.handleSubmit}>
                 <label htmlFor="username">Username: </label>
                 <input type="text" id="username" name="username" onChange = {e => this.usernameChanged(e.target.value)}/>
                 <div className="sign-up-buttons">
                    <input type="submit" value="Submit"/>
                    <button onClick={this.props.handleCancelButton}>
                        Cancel
                    </button>
                </div>
                {/* {this.state.error && (
                    <ValidationError message={"No user found"}/>
                )} */}
            </form>
     
        </section>
        )
    }
}

export default SignUp;