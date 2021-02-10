import React, {Component} from 'react';
import './Discover.css'
import config from '../config'
import SearchForm from '../SearchForm/SearchForm'
import GamesList from '../GamesList/GamesList'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons'

class Discover extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            minPlayers: null,
            maxPlayers: null,
            minPlaytime: null,
            maxPlaytime: null,
            categories: "",
            age: null,
            games: [],
            submitSent: false,
            infoBox: false,
            random: false
        }
    }

    nameChanged = name => {
        this.setState({
            name
        })
    }

    minPlayersChanged = minPlayers => {
        this.setState({
            minPlayers
        })
    }

    maxPlayersChanged = maxPlayers => {
        this.setState({
            maxPlayers
        })
    }

    ageChanged = age => {
        this.setState({
            age
        })
    }

    minPlaytimeChanged = minPlaytime => {
        this.setState({
            minPlaytime
        })
    }

    maxPlaytimeChanged = maxPlaytime => {
        this.setState({
            maxPlaytime
        })
    }

    randomChanged = e => {
        this.setState({
            random: e.currentTarget.checked
        })
    }

    formatQueryParams(params) {
        const queryItems = Object.keys(params)
            .map(key => `${encodeURI(key)}=${encodeURI(params[key])}`);
        return queryItems.join('&');
    }

    handleSubmit = e => {
        e.preventDefault()
        const name = this.state.name
        const fuzzy_match = true
        const gt_min_players = this.state.minPlayers
        const lt_max_players = this.state.maxPlayers
        const gt_min_playtime = this.state.minPlaytime
        const lt_max_playtime = this.state.maxPlaytime
        const min_age = this.state.age
        const random = this.state.random
        // const fields = "id,name,min_players,max_players,min_playtime,max_playtime,min_age,description,categories,rules_url,year_published,images"
        const client_id = config.BGA_CLIENT_ID

        const params = {client_id, name, fuzzy_match, gt_min_players, lt_max_players, gt_min_playtime, lt_max_playtime, min_age, random}

        for (const key in params) {
            if (!params[key]) {
                delete params[key]
            }
        }
        if (!params.name) {
            delete params.fuzzy_match
        }

        const queryString = this.formatQueryParams(params)

        fetch(`${config.BGA_BASE_URL}/search?${queryString}`, {
            method: 'GET'
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error(res.status)
                }
                return res.json()
            })
            .then(responseJson => {
                this.setState({
                    games: responseJson.games,
                    submitSent: true
                })
            })
            .catch(error => {
                console.error(error)
            })
    }

    expandInfoBox = e => {
        this.setState({
            infoBox: true
        })
    }

    collapseInfoBox = e => {
        this.setState({
            infoBox: false
        })
    }

    render() {
        return (
            <section className="discover">
                <div className="page-header">
                    <h2>Discover</h2>
                    {!this.state.infoBox && <button className="what-btn" onClick={this.expandInfoBox}><FontAwesomeIcon className="what-btn-icon" icon={faQuestionCircle} aria-hidden="true" title="What is this page?" aria-label="What is this page?"/></button>}
                </div>
                {this.state.infoBox && 
                    <div className="info-box">
                        <p>Use this page to search for games with the parameters below.</p>
                        <p>None of the parameters are required, so fill out as many or as few as you'd like. 
                        </p>
                        <p>If you found a game you want to save for later (and you're logged in),
                            you can click onto that game's page and track it using the checkboxes there.
                        </p>
                        <p>Please note the games take a moment to populate.</p>
                        <button onClick={this.collapseInfoBox}>Got it, thanks!</button>
                    </div>}
                <SearchForm 
                    handleSubmit={this.handleSubmit}
                    nameChanged={this.nameChanged}
                    minPlayersChanged={this.minPlayersChanged}
                    maxPlayersChanged={this.maxPlayersChanged}
                    ageChanged={this.ageChanged}
                    minPlaytimeChanged={this.minPlaytimeChanged}
                    maxPlaytimeChanged={this.maxPlaytimeChanged}
                    randomChanged={this.randomChanged}
                />
                {this.state.submitSent && <h3>Search Results</h3>}
                {this.state.submitSent && <GamesList games={this.state.games} descriptions={true}/>}
                {this.state.submitSent && this.state.games.length === 0 && <p>No games found. Try different search parameters.</p>}
            </section>
        )
    }
}

export default Discover;