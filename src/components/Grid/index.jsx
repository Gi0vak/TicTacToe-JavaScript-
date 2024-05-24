import './index.css';
import Case from '../Case';
import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { Colors } from '../../constants/Colors';
const Grid = () => {
    // État local pour les cases du jeu
    const [boxes, setBoxes] = useState(Array(9).fill(null));
    // État local pour déterminer le tour du joueur (X ou O)
    const [xIsNext, setXIsNext] = useState(true);
    const [win, setWin] = useState(false);
    const [message, setMessage] = useState('');
    const [starter, setStarter] = useState('PHP is Playing');
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [countJSPlayer, setCountJSPlayer] = useState(0);
    const [countPHPPlayer, setCountPHPPlayer] = useState(0);
    const openModal = () => {
        setModalIsOpen(true)
    }
    const closeModal = () => {
        setModalIsOpen(false);
    }
    const tabWin =
        [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
    const isVictory = () => {
        tabWin.forEach(line => {
            setWin(false)
            const [a, b, c] = line;
            if (boxes[a] && boxes[a] === boxes[b] && boxes[a] === boxes[c]) {
                setWin(true);
                const playerMessage = boxes[a] === 'X' ? 'PHP' : 'Javascript';
                setMessage('player ' + playerMessage + ' won ! ');
                if (boxes[a] === 'X') {
                    setCountPHPPlayer(countPHPPlayer + 1);
                } else if (boxes[a] === 'O') {
                    setCountJSPlayer(countJSPlayer + 1);
                }
                openModal();
                setBoxes(Array(9).fill(null));
            } else
                if ((boxes.every(element => element !== null)) && win === false) {
                    setMessage('pas de gagnants')
                    openModal();
                    setBoxes(Array(9).fill(null));
                    setWin(false)
                };
        })

    }
    useEffect(() => {
        isVictory()
    }, [boxes])
    // Fonction de gestionnaire de clic pour les cases du jeu
    const handleClick = (index) => {
        // Copie de l'état des cases pour éviter la mutation directe de l'état
        const boxesCopy = [...boxes];
        // Modification de la copie de l'état pour mettre à jour la case cliquée avec "X" ou "O" en fonction du tour du joueur
        boxesCopy[index] = xIsNext ? "X" : "O";
        // Mise à jour de l'état des cases avec la copie modifiée
        setBoxes(boxesCopy);
        // Inversion de l'état du tour du joueur pour passer au joueur suivant
        setXIsNext(prev => !prev);
        // Affichage de la copie modifiée de l'état des cases dans la console (à des fins de débogage)
        // console.log(boxesCopy);
        console.log('index null', boxes.indexOf(null));
        if (!xIsNext) {
            setStarter('PHP is playing');
        } else {
            setStarter('Javascript is playing');
        }
    }

    return (
        <>
            <h3>Javascript or Php ?</h3>
            <div className="starter"><p>{starter}</p></div><div>

            </div>

            <div className="Grid"
                style={{
                    backgroundColor: Colors.tertiary,
                    borderColor: Colors.tertiary,
                    boxShadow: '0px 0px 5px 0px ' + Colors.tertiary
                }}>

                {
                    // Boucle de rendu des cases du jeu en utilisant la méthode "map" sur l'état des cases
                    // Chaque case est représentée par un composant "Case" avec des props spécifiques
                    boxes.map((elt, index) => (
                        <Case key={index} onClick={() => handleClick(index)} value={elt} disabled={!!elt} message={message} />
                    ))
                }
            </div>
            <Modal
                shouldCloseOnOverlayClick={true}
                ariaHideApp={false}
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                transparent

            >
                <p className="message-game">
                    {message}
                </p>
                <div className="cols-grid">
                    <div className='col1 score'>
                        <h3>PHP</h3>
                        <div className='count'>{countPHPPlayer}</div>
                    </div>
                    <button className='btn-win' onClick={closeModal}>Close</button>
                    <div className='col3 score'>
                        <h3>JAVASCRIPT</h3>
                        <div className='count'>{countJSPlayer}</div>
                    </div>
                </div>
            </Modal>
        </>
    );
}

export default Grid;