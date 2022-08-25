import "./Card.css";

const Card = ({ card, handleChoice, flipped, disabled }) => {
    const handleClick = () => {
        if (!disabled) {
            handleChoice(card);
        }
    };

    return (
        <div className="card">
            <div className={flipped ? "flipped" : ""}>
                <img className="front" src={card.src} alt="Card Front" />
                <img className="back" onClick={handleClick} src="/images/cover.png" alt="Card Back" />
            </div>
        </div>
    );
};

export default Card;
