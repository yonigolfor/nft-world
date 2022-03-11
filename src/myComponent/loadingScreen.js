import '../globalStyle.css'
import { useState } from 'react';


export default function LoadingScreen(){
    
    const height = window.screen.height;
    const width = window.screen.width;
    return(
        <div style={{height: height, width: width,
        backgroundColor:"tan", paddingTop: height/3}}>

            <h1
            style={{textAlign:"center", 
            fontSize:80,
            color:'black'
            }}>
                Loading...
            </h1>

        </div>
    )
}