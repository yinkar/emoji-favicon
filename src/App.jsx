import 'emoji-picker-element';
import { MainContext } from './context';
import Content from './components/Content';
import React, { useState, useEffect } from 'react';

function App() {
    const [emoji, setEmoji] = useState(`⏳`);
    const [outputCode, setOutputCode] = useState(``);
    const [faviconHref, setFaviconHref] = useState(``);

    const [emojiList, setEmojiList] = useState([]);
    const [emojiJson, setEmojiJson] = useState({});
    
    const faviconTemplate = `<link rel="icon" href="{href}" type="image/svg+xml" />`;
    const faviconHrefTemplate = `data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20{width}%20{height}'%3E%3Ctext%20x='0'%20y='14'%3E{emoji}%3C/text%3E%3C/svg%3E`;

    const dimensions = {
        width: 20,
        height: 20
    };

    const faviconElement = document.querySelector('link[rel="icon"]');

    const random = (begin, end) => {
        return Math.floor(Math.random() * end - begin) + begin;
    };

    const randomInArray = (arr) => {
        return arr[random(0, arr.length)];
    }

    const emojiClick = e => {
        setEmoji(e.detail.unicode);
    };
        
    const copyCode = () => {
        navigator.clipboard.writeText(outputCode);        
    };

    const data = {
        faviconTemplate,
        faviconHrefTemplate,
        dimensions,
        emoji,
        setEmoji,
        outputCode,
        setOutputCode,
        faviconHref,
        setFaviconHref,
        emojiList,
        setEmojiList,
        emojiJson,
        setEmojiJson,
        faviconElement,
        random,
        randomInArray,
        emojiClick,
        copyCode
    };

    useEffect(() => {
        fetch('https://unpkg.com/unicode-emoji-json@0.3.0/data-by-emoji.json')
        .then(res => res.json())
        .then(data => {
            setEmojiJson(data);

            setEmojiList(Array.from(Object.keys(emojiJson)));

            setEmoji(randomInArray(emojiList));
        });
    }, []);

    useEffect(() => {
        setFaviconHref(faviconHrefTemplate
            .replace(`{emoji}`, emoji)
            .replace(`{width}`, dimensions.width)
            .replace(`{height}`, dimensions.height));

        setOutputCode(faviconTemplate
            .replace(`{href}`, faviconHref));

        faviconElement.setAttribute('href', faviconHref);
    }, [emoji]);

    useEffect(() => {
        
    }, [outputCode]);

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