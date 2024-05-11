import './index.css';
import Grid from '../Grid';



const Morpion = () => {

    return (

        <>
            <h1 className='title'>Tic Tac Toe</h1>
            <img src={process.env.PUBLIC_URL + '/tictacte.png'} alt="Tic-Tac-Toe Screenshot" style={{ borderRadius: '50%', marginTop: '20px' }} width="80px" height="80px" />
            <div className="morpion-container">
                <Grid />
            </div>
        </>
    );

};

export default Morpion;