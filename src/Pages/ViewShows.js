import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import ReactPropTypes from 'prop-types'
import Show from "../Show"
import './ViewShows.css'

export default class ViewShows extends Component {
    static propTypes = {
        allShows: ReactPropTypes.array.isRequired
    }

    state = {
        shows: []
    }
    renderShows = () => {
        const wholesome = this.props.allShows.filter((show) => {
            return (show.rating <= 3) && show.rating >= 1
        })
        return wholesome.map((show, i)=> {
            return <Show key={i} name={show.name} rating={show.rating} image={show.image} />
        }
    )

    }


    render() {
        return (
            <main className="viewShows">
                <section className="availableShows">
                    <header><h3>Available Shows</h3></header>
                    {this.renderShows()}
                    <Link to="/manageShows">Manage Shows</Link>
                </section>
                <section className="currentShow">
                </section>
            </main>
        )
    }
}