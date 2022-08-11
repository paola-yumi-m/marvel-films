import React, {useEffect, useState} from "react";
import logo from './img/Marvel_Logo.svg';
import './styles.css';
import { GetData } from "./GetData";
import { Pagination } from "./Pagination";
import {data_2} from "./json";

export const App = () => {
    const [ data, setData ] = useState([]);
    const [ error, setError ] = useState(null);
    const [ loading, setLoading ] = useState(true);
    const [ firstId, setFirstId ] = useState(1);
    const numFilms = 21 //39;
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
        // }
        getData();
    }, []);

    const directToPage = (id) => {
        setFirstId(() => id);
        console.log(id);
    }

    return (
        <div>
            <header>
                <div className='logo-div'>
                    <img src={logo} alt='marvel logo'/>
                    <p className='logo-name'>movies</p>
                </div>
            </header>
            <div>
                {loading ? <div className='loading'>Loading...</div> :
                    <div>
                        <GetData data={data} id={firstId} />
                        <Pagination data={data} setFirstId={setFirstId} id={firstId} numPages={numPages} directToPage={directToPage} />
                    </div>}
            </div>

        </div>
    );
}