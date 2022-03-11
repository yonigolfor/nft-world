import SquareArr from "./squareArr";
import '../globalStyle.css'
import Square from "./Square";
import axios from 'axios';
import { useState, useEffect } from 'react';
import LoadingScreen from "./loadingScreen";

// const insertWorldToDb = (world) => {
//     console.log("insertWorldToDb now");
//     axios({
//         url: '/init-world',
//         method: 'POST',
//         data: world
//     })
//     .then((res) => {
//         console.log('square data sent successfully to server', res.data);
//     })
//     .catch((e) => console.log('Error happenned', e));
// }


const generatePrice = () =>{
    // random number 15 - 200
    return Math.floor(Math.random() * (200-15+1) + 15);
}

const insertSquareToDb = async (squareId, color, price) => {
    let data = {
        squareId: squareId,
        color: color,
        price: price,
        owner: 'Y&H.ltd',
        
    }
    

    await axios({
        url: '/add-square',
        method: 'POST',
        data: data
    })
    .then((res) => {
        console.log('square data sent successfully to server', res.data);
    })
    .catch((e) => console.log('Error happenned', e));
}

const getColor = (id, WORLD_SIZE) => {
    // console.log("id ",id);
    // console.log("WORLD_SIZE ",WORLD_SIZE);
    // console.log("reachhhhed");
    // id = parseInt(id);
    // WORLD_SIZE = parseInt(WORLD_SIZE);
    
    
        if (id < WORLD_SIZE / 6)
            return 'blue';  
        if( id < (WORLD_SIZE / 6) + (WORLD_SIZE / 100))
            return 'gray';
        if (id < (WORLD_SIZE / 6) + WORLD_SIZE / 13)
            return 'green';
        if (id < WORLD_SIZE / 3)
            return 'brown';
        if (id < (WORLD_SIZE / 3) + (WORLD_SIZE / 100))
            return 'gray';
        if (id < WORLD_SIZE * (2/3))
            return 'yellow';
        if (id < (WORLD_SIZE * (2/3)) + (WORLD_SIZE / 100))  
            return 'gray';   
        if (id < (WORLD_SIZE * (2/3)) + (WORLD_SIZE / 13))
            return 'green';
        if (id < WORLD_SIZE)
            return 'blue';
        
    
}

const createNewWorld = async () => {
    let world = [];
    const WORLD_SIZE = 40000;
    let color, price;
   
    
    while(world.length < WORLD_SIZE){
        color = getColor(world.length, WORLD_SIZE);
        console.log("the color:", color);
        price = generatePrice();
        world.push(<Square id={world.length + 1} color={color}
                            price={price}/>);
        
        await insertSquareToDb(world.length, color, price);
    }

    return world;
    
}

const fetchWorldFromDb = async () => {
    let world = [];

    await axios({
        url: '/fetch-world',
        method: 'POST',
    })
    .then((res) => {
        console.log('fetch world  successfully to server', res.data);

        for (let i = 0; i < res.data.length; i++) {
            world.push(<Square id={res.data[i]._id} color={res.data[i].color}
                price={res.data[i].price}/>)
        }
        console.log("world: ",world);
    })
    .catch((e) => console.log('Error happenned', e));

    return world;
}


const initSquaresData = async (setWorld) => {
   
    let world = [];

    // check if squares already in mongo
    world = await fetchWorldFromDb();
    if (world.length == 0){
        console.log('creating new world')
        world = await createNewWorld();
    }
        
    console.log("world in init:", world);

    setWorld(world);

 
}


export default function World({}){
    const [world, setWorld] = useState();
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
        initSquaresData(setWorld).then((res) => {
        
            console.log("useEffect" ,res);
            setIsLoading(false);
            //setWorld(res);
            //console.log("world after init: ",world);
    
        });        
    },[]);

    
    if (isLoading)
        return <LoadingScreen />
    
    return(
        <div className='world'>
            <div className='square_container'>

                {world}

                {/* <SquareArr 
                amount={numColorOne} 
                color='brown' 
                idStarter={0}
                />

                <SquareArr 
                amount={numColorTwo} 
                color='#3d3d5c' 
                idStarter={numColorOne}
                /> */}
        
            </div> 
        </div>
    )
}