
import { TiArrowUpOutline } from "react-icons/ti";
import { TiArrowUpThick } from "react-icons/ti";

import './style.css';

const Button = ({ data, handleLongClick, handleCancelLongClick, isUppercase }) => {
    const { key, values } = data

    // convert values to uppercase or lowercase based on isUppercase
    const convertedValues = values.map(alphabets => isUppercase ? alphabets.toUpperCase() : alphabets);

    // handle mouse events for long press and cancel
    const handleMouseDown = () => handleLongClick({ key });
    const handleMouseUp = () => handleCancelLongClick({ key, convertedValues }, !isUppercase);

    // render alphabets based on key
    const renderAlphabets = () => {
        if (key === "#") {
            return isUppercase ? <TiArrowUpThick /> : <TiArrowUpOutline />;
        } else if (key === 0) {
            return <span>⎵</span>;
        } else {
            return convertedValues.map((alphabets, index) => (
                <span key={`${index}${alphabets}`}>{alphabets}</span>
            ));
        }
    };

    return (
        <button
            className={`number-button ${key === "*" ? "rotate-left" : key === "#" ? "rotate-right" : ""}`}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
        >
            <div className={`number ${key === "*" ? "asterisk" : ""}`}>{key}</div>
            <p className="alphabets">{renderAlphabets()}</p>
        </button>
    );
};
export default Button;