import '../globalStyle.css'
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';


const handleClick = (id, navigate, userId, money ) => {
    // open buy screen
    navigate(`/buy/${id}/${userId}/${money}`);
}


export default function Square({ navigation, id, color }){
    
    let navigate = useNavigate();

    // let ownerId = getOwnerId(id);


    let { userId, money } = useParams();

    return(
        <div className='square' 
            style={{background: color}} 
            onClick={()=>{
                if (color != 'gray' && color != 'green')
                    handleClick(id, navigate, userId, money, navigation);
                }}>
        </div>
    )
}