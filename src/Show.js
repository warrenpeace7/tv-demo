import React, { Component } from 'react'
import ReactPropTypes from 'prop-types'
import './Show.css'



export default class Show extends Component {
    static propTypes = {
        name: ReactPropTypes.string.isRequired,
        rating: ReactPropTypes.number.isRequired,
        image: ReactPropTypes.string.isRequired
    }
    
    
    render() {
        return (
            <article>
                <header><h3>{this.props.name}</h3></header>
                <p>Rating: {this.props.rating}</p>
                <img src={this.props.image} alt='unknown' />
                </article>

        )

    }
}