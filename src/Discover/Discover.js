import React, {Component} from 'react';
import './Discover.css'

class Discover extends Component {

    render() {

        return (
            <section>
                <h2>Welcome, user!</h2>
                <h3>Discover</h3>
                <form>
                    <label htmlFor="username">Search: </label>
                    <input type="text" id="username" name="username"/>
                    <input type="submit" value="Submit"/>
                </form>
                <h4>Search results</h4>
                <ul>
                    <li>Games here</li>
                </ul>
            </section>
        )
    }
}

export default Discover;