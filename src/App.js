import React, {useEffect, useState} from "react";
import logo from './img/Marvel_Logo.svg';
import './styles.css';
import { GetData } from "./GetData";
import { Pagination } from "./Pagination";
import { data_2 } from "./json";
import { DetailCard } from "./DetailCard";
import ToggleButton from 'react-toggle-button';

export const App = () => {
    const [ data, setData ] = useState([]);
    const [ chronologicalData, setChronologicalData ] = useState([]);
    const [ error, setError ] = useState(null);
    const [ loading, setLoading ] = useState(true);
    const [ firstId, setFirstId ] = useState(1);
    const [ cardId, setCardId ] = useState(null);
    const [ showCard, setShowCard ] = useState(false);
    const [ isChronological, setIsChronological ] = useState(false);
    const numFilms = 21 //39;
    let numPages = Math.round(data.length / 6);

    useEffect(() => {
        // const getData = async () => {
        //     for (let id = 1; id <= numFilms; id++) {
        //         try {
        //             let url = `https://mcuapi.herokuapp.com/api/v1/movies/${id}`;
        //             const response = await fetch(url);
        //             if (!response.ok) {
        //                 throw new Error(
        //                     `HTTP Error: ${response.status}`
        //                 )
        //             }
        //             let actualData = await response.json();
        //             setData(data => [...data, actualData]);
        //             setChronologicalData(data);
        //             setError(null);
        //         } catch (error) {
        //             setError(error);
        //             setData([]);
        //         }
        //     }
        //     setLoading(false);
        //     originalData = data;
        // }
        const getData = () => {
            setData(data_2);
            setChronologicalData(data_2);
            setError(null);
            setLoading(false);
        }
        getData();

        // const orderData = () => {
        //     setChronologicalData((prevState) => {
        //         prevState.sort(function(a, b) {
        //             let keyA = a.chronology,
        //                 keyB = b.chronology;
        //             if (keyA < keyB) return -1;
        //             if (keyA > keyB) return 1;
        //             return 0;
        //         });
        //     });
        //
        //     chronologicalData.forEach((movie, id) => movie.id = id + 1);
        //
        // }
        //
        // orderData();

    }, []);

    console.log(data);
    console.log(chronologicalData);

    const directToPage = (id) => {
        setFirstId(() => id);
    }

    const currentCard = (id) => {
        setCardId(() => id);
        setShowCard(true);
    }

    const getReleaseDate = (id) => {
        return data[id]['release_date'].slice(0, 4);
    }

    const makeCronological = () => {
        if (isChronological) {
            setIsChronological(false);
        } else {
            setIsChronological(true);
        }
    }

    return (
        <div>
            <header>
                <div className='logo-div'>
                    <img src={logo} alt='marvel logo'/>
                    <p className='logo-name'>movies</p>
                    <ToggleButton value={ isChronological || false }
                                  onToggle={makeCronological}/>
                </div>
            </header>
            <div>
                {loading ? <div className='loading'>Loading...</div> :
                    <div className='content'>
                        <GetData data={data} id={firstId} getReleaseDate={getReleaseDate} currentCard={currentCard} />
                        <Pagination data={data} setFirstId={setFirstId} id={firstId} numPages={numPages} directToPage={directToPage} />
                        <div className={showCard ? 'faded-bg' : ''}>
                            {showCard && <DetailCard cardId={cardId} getReleaseDate={getReleaseDate} data={data} setShowCard={setShowCard} />}
                        </div>
                    </div>}
            </div>

        </div>
    );
}