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
    const [ error, setError ] = useState(null);
    const [ loading, setLoading ] = useState(true);
    const [ firstId, setFirstId ] = useState(1);
    const [ cardId, setCardId ] = useState(null);
    const [ showCard, setShowCard ] = useState(false);
    const [ isChronological, setIsChronological ] = useState(false);
    const numFilms = 39 //39;
    let numPages = Math.round(data.length / 6);

    useEffect(() => {
        const getData = async () => {
            for (let id = 1; id <= numFilms; id++) {
                try {
                    let url = `https://mcuapi.herokuapp.com/api/v1/movies/${id}`;
                    const response = await fetch(url);
                    if (!response.ok) {
                        throw new Error(
                            `HTTP Error: ${response.status}`
                        )
                    }
                    let actualData = await response.json();
                    setData(data => [...data, actualData]);
                    setError(null);
                } catch (error) {
                    setError(error);
                    setData([]);
                }
            }
            setLoading(false);
        }
        // const getData = () => {
        //     setData(data_2);
        //     setError(null);
        //     setLoading(false);
        //     setOriginalData(data_2);
        // }
        getData();
    }, []);

    const orderData = (dataToOrder, idVariable) => {
        setData(() => dataToOrder.sort(function(a, b) {
                let keyA = a[idVariable],
                    keyB = b[idVariable];
                if (keyA < keyB) return -1;
                if (keyA > keyB) return 1;
                return 0;
            })
        )};

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

    const makeChronological = () => {
        if (isChronological) {
            setIsChronological(false);
            orderData(data, 'id');
        } else {
            setIsChronological(true);
            orderData(data, 'chronology');
        }
        setFirstId(1);
    }

    return (
        <div>
            <header>
                <div className='logo-div'>
                    <img src={logo} alt='marvel logo'/>
                    <p className='logo-name'>movies</p>
                </div>
                <div className='toggle-button'>
                    <p className='chronological'>Chronological Order</p>
                    <ToggleButton value={ isChronological || false }
                                  onToggle={makeChronological}
                                  inactiveLabel={''}
                                  activeLabel={''}
                                  />
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