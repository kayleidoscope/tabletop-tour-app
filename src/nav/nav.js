import React, {Component} from 'react';
// import Nav from '../nav/Nav';
import './nav.css'

class Heading extends Component {

    render() {

        return (
            <nav>
                <ul>
                    <li>About</li>
                    <li>Log Out</li>
                    <li>Home</li>
                    <li>Discover</li>
                </ul>
            </nav>
        )
    }
}

export default Heading;