import './index.css';
import Case from '../Case';
import { useEffect, useState } from 'react';
import Modal from 'react-modal';
const Grid = () => {
    // État local pour les cases du jeu
    const [boxes, setBoxes] = useState(Array(9).fill(null));
    // État local pour déterminer le tour du joueur (X ou O)
    const [xIsNext, setXIsNext] = useState(true);
    const [win, setWin] = useState(false);
    const [message, setMessage] = useState('');
    const [starter, setStarter] = useState('Au PHP de jouer');
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
            setStarter('Au PHP de jouer');
        } else {
            setStarter('Au Javascript');
        }
    }
    return (
        <>
            <p>Javascript or Php ?</p>
            <div className="starter">{starter}</div><div>

            </div>

            <div className="Grid">

                {
                    // Boucle de rendu des cases du jeu en utilisant la méthode "map" sur l'état des cases
                    // Chaque case est représentée par un composant "Case" avec des props spécifiques
                    boxes.map((elt, index) => (
                        <Case key={index} onClick={() => handleClick(index)} value={elt} disabled={!!elt} message={message} />
                    ))
                }
            </div>
            <Modal ariaHideApp={false} isOpen={modalIsOpen} onRequestClose={closeModal}>
                <h2 className="message-game">
                    {message}
                </h2>
                <div className="cols-grid">
                    <div className='col1 score'>
                        <h2>Player PHP</h2>
                        <div className='count'>{countPHPPlayer}</div>
                    </div>
                    <button className='btn-win' onClick={closeModal}>Close</button>
                    <div className='col3 score'>
                        <h2>Player JAVASCRIPT</h2>
                        <div className='count'>{countJSPlayer}</div>
                    </div>
                </div>
            </Modal>
        </>
    );
}

export default Grid;