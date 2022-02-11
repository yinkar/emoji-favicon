import { useContext, useEffect } from "react";
import { MainContext } from "../context";

function Options() {
    const { emojiClick } = useContext(MainContext);

    useEffect(() => {
        document.querySelector('emoji-picker')
            .addEventListener('emoji-click', emojiClick);
    }, []);

    return (
        <div className="options col-md-6">
            <div className="picker">
                <emoji-picker className="dark" onEmojiClick={emojiClick}></emoji-picker>
            </div>
        </div>
    );
}

export default Options;