import '../globalStyle.css'
import Square from './Square'


export default function SquareArr({amount, color, idStarter }){
    let squareArr = [];
    for (let i = 0; i < amount; i++) {
        idStarter++;
        squareArr.push(<Square id={idStarter} color={color}/>)
    }

    return(
        <div className='square_container'>
            {squareArr}
        </div>
    )
}