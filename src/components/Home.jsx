import React from 'react'
import Products from './Products'

export default function Home() {
    return (
        <div>
            <div className="card text-bg-dark border-0 ">
                <img src={require('../assets/images/header.jpg')} className="card-img" alt="header-background" />
                <div className="card-img-overlay d-flex flex-column justify-content-center">
                    <h5 className="card-title display-3 fw-bolder mb-0">
                        A new shop... with new arrivals
                    </h5>
                    <p className="card-text lead fs-2">
                        Check out our merchandising
                    </p>
                </div>
            </div>
            <Products></Products>
        </div>
    )

}
