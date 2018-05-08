import React, { Component } from 'react'
import ReactPropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Show from '../Show'
import './ManageShows.css'

export default class ManageShows extends Component {
    static propTypes = {
        createShow: ReactPropTypes.func.isRequired
    }

    state = {
        show: {
            name: "",
            rating: -1,
            image: "",
        },
        shows: [
            {
                name: 'Game of Thrones',
                rating: 5,
                image: 'http://bronlea.com/wp-content/uploads/2017/10/2742670-game-768x384.jpg'

            }
     
        ]
    }



    handleOnChange = (event) => {
        if (event.target.id === "nameInput") {
            this.setState({
                newShowName: event.target.value
            })
        }

        else if (event.target.id === "ratingInput") {
            this.setState({
                newShowRating: Number(event.target.value)
            })
        }

        else if (event.target.id === "previewImage") {
            this.setState({
                newShowImage: event.target.value
            })

        }
    }

    handleOnClick = (prev) => {
       const showToAdd = {
            name: this.state.newShowName,
            rating: this.state.newShowRating,
            image: this.state.newShowImage,
        }
        this.props.createShow(showToAdd)
        console.log ('Here it is', showToAdd)
    }

    renderShows = () => {
        // const showComponents = []

        // for (const show of this.state.shows) {
        // showComponents.push(
        // <Show key={0} name={show.name} rating={show.rating} previewImage={show.image} />
        // )
        // }
        //     for (let i = 0; i < this.state.shows.length; i++) {
        //         const show = this.state.shows[i];

        //         showComponents.push(
        //             <Show key={i} name={show.name} rating={show.rating} previewImage={show.image} />
        //         )

        //     }

        //     return showComponents


        return this.props.allShows.map((show, i) => {
            return (
                <Show key={i} name={show.name} rating={show.rating} image={show.image} />


            )
        })
    }

    getAvgRating = () => {
        if(this.props.allShows.length < 1) {
            return 0
        }
        
        const sumOfRatings = this.props.allShows
        sumOfRatings.reduce((accumulator, show)=>{
            return show.rating + accumulator
        }, 0)
        console.log(this.props.allShows)
        return sumOfRatings / this.props.allShows.length
    }

    hasEnoughKidShows = () => {
        const minRequiredKidShows = 2
        
        let kidShowCount = 0
        let remainingShows = this.props.allShows.length
        while (kidShowCount < minRequiredKidShows && remainingShows) {
            remainingShows--

            const show = this.props.allShows[remainingShows]

            if (show.rating === 1){
                kidShowCount++
            }
        }
        return (kidShowCount >= minRequiredKidShows).toString()
    }


    render() {
        return (
            <div className="manageShows">
                <section className="viewAllShows">
                    <header><h1>All Shows</h1>
                    <p>Avg Rating: {this.getAvgRating()}</p>
                    <p>Has Enough Kid Shows: {this.hasEnoughKidShows()}</p>
                    </header>
                    <div>
                        {this.renderShows()}
                    </div>
                    <Link to="/">View Shows</Link>
                </section>
                <section className="createShow">
                    <header><h1>New Show</h1></header>
                    <div>
                        <div><label>Name:</label><input id='nameInput' onChange={this.handleOnChange} /></div>
                        <div><label>Rating:</label><input id='ratingInput' onChange={this.handleOnChange} /></div>
                        <div><label>Preview Image:</label><input id='previewImage' onChange={this.handleOnChange} /></div>
                        <button onClick={this.handleOnClick}>Create</button>
                    </div>
                </section>
            </div>

        )
    }
}
