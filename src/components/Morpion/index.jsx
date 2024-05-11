import './index.css';
import Grid from '../Grid';
import logo from '../../assets/tictactoeLogo.webp';



const Morpion = () => {

    return (

        <>
            <h1 className='title'> Tic Tac Toe</h1>
            <img src={logo} alt="Tic-Tac-Toe Screenshot" style={{ borderRadius: '50%', marginTop: '20px' }} width="80px" height="80px" />
            <div className="morpion-container">
                <Grid />
            </div>

        </>
    );

};

export default Morpion;