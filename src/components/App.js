import { useEffect, useState } from "react";
import "./App.css";
import Card from "./Card";

const cardImages = [
    { src: "/images/helmet-1.png", matched: false },
    { src: "/images/potion-1.png", matched: false },
    { src: "/images/ring-1.png", matched: false },
    { src: "/images/scroll-1.png", matched: false },
    { src: "/images/shield-1.png", matched: false },
    { src: "/images/sword-1.png", matched: false },
];

const App = () => {
    const [turns, setTurns] = useState(0);
    const [cards, setCards] = useState([]);
    const [choiceOne, setChoiceOne] = useState(null);
    const [choiceTwo, setChoiceTwo] = useState(null);
    const [disabled, setDisabled] = useState(false);

    // shuffle cards:
    const shuffleCards = () => {
        const shuffledCards = [...cardImages, ...cardImages].sort(() => Math.random() - 0.5).map((card) => ({ ...card, id: Math.random() }));

        setChoiceOne(null);
        setChoiceTwo(null);
        setCards(shuffledCards);
        setTurns(0);
    };

    // start game when window loads:
    useEffect(() => {
        shuffleCards();
    }, []);

    // handle a choice:
    const handleChoice = (card) => {
        choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
    };

    // reset choices and increment number of turns:
    const resetTurn = () => {
        setChoiceOne(null);
        setChoiceTwo(null);
        setTurns((turn) => turn + 1);
        setDisabled(false);
    };

    // compare 2 selected cards:
    useEffect(() => {
        if (choiceOne && choiceTwo) {
            setDisabled(true);
            if (choiceOne.src === choiceTwo.src) {
                setCards((prevCards) => prevCards.map((card) => (card.src === choiceOne.src ? { ...card, matched: true } : card)));
                resetTurn();
            } else {
                setTimeout(() => resetTurn(), 1000);
            }
        }
    }, [choiceOne, choiceTwo]);

    return (
        <div className="App">
            <h1>Magic Match</h1>
            <button onClick={shuffleCards}>New Game</button>
            <h4>Turns: {turns}</h4>

            <div className="card-grid">
                {cards.map((card) => (
                    <Card key={card.id} card={card} handleChoice={handleChoice} flipped={card === choiceOne || card === choiceTwo || card.matched} disabled={disabled} />
                ))}
            </div>
        </div>
    );
};

export default App;
