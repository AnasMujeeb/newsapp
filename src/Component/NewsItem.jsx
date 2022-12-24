import React, { Component } from 'react'

export default class NewsItem extends Component {

    render() {
    
        return (
            <>
                <div className="card my-4 " style={
                    {
                        width: "18rem",
                    }
                }>
                    <img src={this.props.urlToImage} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{this.props.name}</h5>
                        <p className="card-text">{this.props.description}</p>
                        <a href={this.props.url} target="_blank" className="btn btn-primary">Read More</a>
                    </div>
                </div>

            </>
        )
    }
}
