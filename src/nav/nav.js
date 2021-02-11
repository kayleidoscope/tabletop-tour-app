import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Context from '../Context'
import './Nav.css'

class Nav extends Component {
    static contextType = Context

    constructor(props) {
        super(props);
        this.state = {
            navMenu: false
        }
    }

    handleMenuClick = () => {
        this.setState({
            navMenu: !this.state.navMenu
        })
    }

    handleLogOutClick = () => {
        this.context.demoLogOut()
        this.handleMenuClick()
    }
    
    render() {
        let userLoggedIn;
        if (this.context.currentUserId) {
            userLoggedIn = true
        } else {
            userLoggedIn = false;
        }
        //renders a dropdown menu
        //if a user is not logged in, show the Log In button, which will take the user to the landing page
        //if a user is logged in, show the Log OUt button, which will log the user out and send them to the landing page
        //Log In also should not appear if the user is already on the landing page
        return (
            <nav className="dropdown">
                <button className="dropbtn" onClick={this.handleMenuClick}>Menu</button>
                <ul className={this.state.navMenu ? "show dropdown-content" : "hide dropdown-content"}>
                    <Link to="/discover" onClick={this.handleMenuClick}>
                        <li>Discover</li>
                    </Link>
                    <Link to="/about" onClick={this.handleMenuClick}>
                        <li>About</li>
                    </Link>
                    {!userLoggedIn && this.context.history.location.pathname !== "/" && <Link to="/" onClick={this.handleMenuClick}><li>Log In</li></Link>}
                    {userLoggedIn && <Link to="/home" onClick={this.handleMenuClick}><li>Home</li></Link>}
                    {userLoggedIn && <Link to="/"><li onClick={this.handleLogOutClick}>Log Out</li></Link>}
                </ul>
            </nav>
        )
    }
}

export default Nav;