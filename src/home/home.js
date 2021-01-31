import React, {Component} from 'react';
import './home.css'

class Home extends Component {

    render() {

        return (
            <section>
                <h2>Welcome, user!</h2>
                <h3>Games</h3>
                <h4>Find a game</h4>
                <form>
                    <label htmlFor="username">Search: </label>
                    <input type="text" id="username" name="username"/>
                    <input type="submit" value="Submit"/>
                </form>
                <h4>My games log</h4>
                <ul>
                    <li>First 10 games, ranked by some parameter</li>
                </ul>
                <h3>My reviews</h3>
                <p>Ticket to Ride is the best game ever.</p>
            </section>
        )
    }
}

export default Home;