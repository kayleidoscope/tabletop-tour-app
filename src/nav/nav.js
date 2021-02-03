import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Context from '../Context'
import './nav.css'

class Nav extends Component {
    static contextType = Context

    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         userId: this.context?.currentUserId || null
    //     }
    //   }

    render() {
        let userLoggedIn;
        if (this.context.currentUserId) {
            userLoggedIn = true
        } else {
            userLoggedIn = false;
        }
        return (
            <nav>
                <ul>
                    <Link to="/about">
                        <li>About</li>
                    </Link>
                    {!userLoggedIn && this.context.history.location.pathname !== "/" && <Link to="/"><li>Log In</li></Link>}
                    {userLoggedIn && <Link to="/"><li onClick={this.context.demoLogOut}>Log Out</li></Link>}
                    {userLoggedIn && <Link to="/home"><li>Home</li></Link>}
                    <Link to="/discover">
                        <li>Discover</li>
                    </Link>
                </ul>
            </nav>
        )
    }
}

export default Nav;