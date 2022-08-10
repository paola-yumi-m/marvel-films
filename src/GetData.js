import React from "react";
import { Card } from "./Card";

export const GetData = ({ data }) => {
    return (
        <div className='body'>
            <div className='card-container'>
                <Card data={data} id={0}/>
                <Card data={data} id={1}/>
                <Card data={data} id={2}/>
                <Card data={data} id={3}/>
                <Card data={data} id={4}/>
                <Card data={data} id={5}/>
            </div>
        </div>
    );
}