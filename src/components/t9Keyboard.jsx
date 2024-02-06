import { useState, useRef } from "react";

import { keysArray } from "../assets/keysJson";

// components
import Button from "./button";
import Input from "./input";
import Billboard from "./billboard";

const T9Keyboard = () => {

    // functions
    const getT9KeyboardKeys = keysArray

    // refs
    const timer = useRef(null)
    const longPressTimer = useRef(null)

    // state variables
    const [value, setValue] = useState("")
    const [count, setCount] = useState(0)
    const [isLongPressed, setIsLongPressed] = useState(false);
    const [isUppercase, setIsUpperCase] = useState(false);

    // handlers for long press
    const handleLongClick = (content) => {
        const { key } = content
        console.log(content)
        setIsLongPressed(false);
        longPressTimer.current = setTimeout(() => {
            setIsLongPressed(true);

            setValue((prev) => prev + key)
        }, 1000);
    }

    // handlers for cancel long press
    const handleCancelLongClick = (content, isUpper) => {
        // clearing the timer
        const { key, convertedValues } = content
        clearTimeout(longPressTimer.current);
        if (isLongPressed) return;
        
        if (timer.current) {
            clearTimeout(timer.current);
        }

        // setting the value based on key and isUppercase state variable
        timer.current = setTimeout(() => {
            if (key === "#") {
                setIsUpperCase(isUpper)
            }
            else {
                setValue((prev) => prev + convertedValues[count]);
            }
            setCount(0);

        }, 400)
        setCount((prev) => count === convertedValues.length - 1 ? 0 : prev + 1);

    }

    return (
        <div className="t9-container">
            <Billboard />
            <Input value={value} setValue={setValue} />
            <div className="keyboard-section">
                {getT9KeyboardKeys?.map((item, index) => {
                    const { key, values } = item
                    return (
                        <Button
                            key={`${index}${values}${key}`}
                            data={item}
                            handleLongClick={handleLongClick}
                            handleCancelLongClick={handleCancelLongClick}
                            isUppercase={isUppercase} />
                    )
                })}
            </div>
        </div>
    )
};
export default T9Keyboard;