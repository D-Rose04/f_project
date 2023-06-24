import React, { useState } from 'react'

function PetCard({ image, petName, petDesc, }) {
    const [favorite, setFavorite] = useState(false)
    const favImage = require(favorite ? "./../../../img/icons/heart-fill.png" : "./../../../img/icons/heart-empty.png");
    return (
        <div className="col">
            <div className="card">
                <img src={image}
                    className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{petName}</h5>
                    <p className="card-text">{petDesc}</p>
                    <div className="d-flex justify-content-between">
                        <a href="#" className="btn btn-primary">Adoptar</a>
                        <a href="#">
                            <img width="35" src={favImage} alt=""
                                className="img-fluid" onClick={() => setFavorite(!favorite)} />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PetCard