import React, {Component} from 'react';
import config from '../config'
import './LogIn.css'
import Context from '../Context'
import ValidationError from '../ValidationError/ValidationError'

class LogIn extends Component {
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

        //API call to create a new user
        fetch(`${config.API_ENDPOINT}api/users?username=${username}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${config.API_TOKEN}`
            }
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
                if (JSON.stringify(responseJson).length === 2) {
                    this.setState({
                        error: true
                    })
                    return
                } else {
                    this.context.setCurrentUser(responseJson)
                    //sets current user Id to local storage
                    localStorage.setItem(
                        `currentUser${config.CURRENT_VERSION}`, JSON.stringify(responseJson)
                    )
                    this.props.history.push("/home")
                    fetch(`${config.API_ENDPOINT}api/users-games?user_id=${responseJson.id}`, {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${config.API_TOKEN}`
                        }
                    })
                        .then(res => {
                            if(!res.ok) {
                                throw new Error(res.status)
                            }
                            return res.json()
                        })
                        .then(responseJson => {
                            this.context.setUserGames(responseJson)
                        })
                        .catch(error => {
                            console.error(error)
                        })
                    fetch(`${config.API_ENDPOINT}api/reviews?user_id=${responseJson.id}`, {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${config.API_TOKEN}`
                        }
                    })
                        .then(res => {
                            if(!res.ok) {
                                throw new Error(res.status)
                            }
                            return res.json()
                        })
                        .then(responseJson => {
                            this.context.setReviews(responseJson)
                        })
                        .catch(error => {
                            console.error(error)
                        })
                }
            })
            .catch(error => {
                console.error(error)
            })
        
    }

    render() {

        return (
            <section className="log-in-section">
            <h2>Log in</h2>
            <p>Enter your credentials below.</p>
            <form onSubmit={this.handleSubmit}>
                 <label htmlFor="username">Username: </label>
                 <input type="text" id="username" name="username" onChange = {e => this.usernameChanged(e.target.value)}/>
                <div className="log-in-buttons">
                    <input type="submit" value="Submit"/>
                    <button onClick={this.props.handleCancelButton}>
                        Cancel
                    </button>
                </div>
                {this.state.error && (
                    <ValidationError message={"No user found"}/>
                )}
            </form>
     
        </section>
        )
    }
}

export default LogIn;