import React, {useState} from "react";

export const DetailCard = ({ cardId, getReleaseDate, data, setShowCard }) => {
    const dataId = cardId - 1;

    function getRelatedMovies() {
        return data[dataId]['related_movies'].map((movie) => <li>- {movie.title}</li>);
    }

    function formatBoxOffice() {
        const boxOffice = data[dataId]['box_office'];
        return new Intl.NumberFormat('en-US', { maximumSignificantDigits: 9 }).format(boxOffice);
    }

    function handleExit() {
        setShowCard(false);
    }

    return (
        <div id={cardId} className='card detail-card' >
            <div>
                <img src={data[dataId]['cover_url']}/>
            </div>
            <div className='infos'>
                <h2>{data[dataId]['title']}</h2>
                <div className='detail-card-infos'>
                    <div>
                        <p><span>Year:</span> {getReleaseDate(dataId)}</p>
                        <p><span>Duration:</span> {data[dataId]['duration']} min</p>
                        <p><span>Saga:</span> {data[dataId]['saga']}</p>
                        <p><span>Box Office:</span> ${formatBoxOffice()}</p>
                        <p><span>Related movies:</span></p>
                        <ul>{getRelatedMovies()}</ul>
                    </div>
                    <div className='overview'>
                        <p><span>Overview:</span></p>
                        <p>{data[dataId]['overview']}</p>
                        <div className='trailer'>
                            <a href={data[dataId]['trailer_url']} target='_blank' >Watch trailer</a>
                        </div>
                    </div>
                </div>
            </div>
            <div className='exit-button' onClick={handleExit}><p>X</p></div>
        </div>
    )
}