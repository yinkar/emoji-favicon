import 'emoji-picker-element';
import { MainContext } from './context';
import Content from './components/Content';
import React, { useState, useEffect, useRef } from 'react';

function App() {
    const [emoji, setEmoji] = useState(`⏳`);
    const [outputCode, setOutputCode] = useState(``);
    const [faviconHref, setFaviconHref] = useState(``);

    let emojiList = useRef([]);
    let emojiJson = useRef({});
    
    const faviconTemplate = `<link rel="icon" href="{href}" type="image/svg+xml" />`;
    const faviconHrefTemplate = `data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20{width}%20{height}'%3E%3Ctext%20x='0'%20y='14'%3E{emoji}%3C/text%3E%3C/svg%3E`;

    const dimensions = {
        width: 20,
        height: 20
    };

    const random = (begin, end) => {
        return Math.floor(Math.random() * end - begin) + begin;
    };

    const randomInArray = (arr) => {
        return arr[random(0, arr.length)];
    }

    const setEmojiData = e => {
        const newEmoji = e;

        setEmoji(newEmoji);

        const newFaviconHref = faviconHrefTemplate
            .replace(`{emoji}`, newEmoji)
            .replace(`{width}`, dimensions.width)
            .replace(`{height}`, dimensions.height);

        setFaviconHref(newFaviconHref);

        setOutputCode(faviconTemplate
            .replace(`{href}`, newFaviconHref));

        document.querySelector('link[rel="icon"]').setAttribute('href', newFaviconHref);
    };

    const emojiClick = e => {
        setEmojiData(e.detail.unicode);
    };
        
    const copyCode = () => {
        const faviconCodeArea = document.querySelector('#favicon-code');
        faviconCodeArea.select();
        faviconCodeArea.setSelectionRange(0, 99999);
        navigator.clipboard.writeText(faviconCodeArea.value);        
    };

    const data = {
        emoji,
        setEmoji,
        outputCode,
        setOutputCode,
        emojiClick,
        copyCode
    };

    useEffect(() => {
        fetch('https://unpkg.com/unicode-emoji-json@0.3.0/data-by-emoji.json')
        .then(res => res.json())
        .then(data => {
            emojiJson.current = data;

            emojiList.current = Array.from(Object.keys(emojiJson.current));

            setEmojiData(randomInArray(emojiList.current));
        });
    }, []);

    return (
        <MainContext.Provider value={data}>
            <div className="container">
                <div className="row">
                    <h1 className="selected">{emoji}</h1>
                </div>
                <Content />
            </div>
        </MainContext.Provider>
    )
}

export default App;