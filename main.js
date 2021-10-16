//(function() {
    const $ = (selector, multi = false) => {
        if (multi) {
            return document.querySelectorAll(selector);
        }
        return document.querySelector(selector);
    };
    
    let faviconTemplate = `<link rel="icon" href="{href}" type="image/svg+xml" />`;
    let faviconHrefTemplate = `data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20{width}%20{height}'%3E%3Ctext%20x='0'%20y='14'%3E{emoji}%3C/text%3E%3C/svg%3E`;

    let emoji = `⏳`;
    let dimensions = {
        width: 20,
        height: 20
    };
    
    let output = ``;
    let faviconHref = ``;

    let emojiList = [];
    let emojiJson = {};
    
    const emojiPicker = $('emoji-picker');
    const faviconCodeArea = $('#favicon-code');
    const selectedElement = $('.selected');

    const copyButton = $('button#copy');

    const faviconElement = $('link[rel="icon"]')
    
    const generateOutput = (
            emoji, 
            width = dimensions.width, 
            height = dimensions.height
        ) => {
        faviconHref = faviconHrefTemplate
        .replace(`{emoji}`, emoji)
        .replace(`{width}`, width)
        .replace(`{height}`, height);

        output = faviconTemplate
        .replace(`{href}`, faviconHref);
    
        return output;
    };

    const applyToPage = () => {
        faviconElement.setAttribute('href', faviconHref);
    };

    const random = (begin, end) => {
        return Math.floor(Math.random() * end - begin) + begin;
    };

    const randomInArray = (arr) => {
        return arr[random(0, arr.length)];
    }

    const printToCodeArea = (data) => {
        faviconCodeArea.value = data;
    }

    const printToSelected = (emoji) => {
        selectedElement.innerHTML = emoji;
    }
    
    generateOutput(emoji);
    printToSelected(emoji);
    
    emojiPicker
        .addEventListener('emoji-click', e => {
            emoji = e.detail.unicode;
            printToCodeArea(generateOutput(emoji));
            printToSelected(emoji);
            applyToPage();
        });
    
    fetch('https://unpkg.com/unicode-emoji-json@0.3.0/data-by-emoji.json')
        .then(res => res.json())
        .then(data => {
            emojiJson = data;

            emojiList = Array.from(Object.keys(emojiJson));

            emoji = randomInArray(emojiList);

            printToCodeArea(generateOutput(emoji));
            printToSelected(emoji);
            applyToPage();
        });
    
    copyButton.onclick = () => {
        faviconCodeArea.select();
        faviconCodeArea.setSelectionRange(0, 99999);
        navigator.clipboard.writeText(faviconCodeArea.value);        
    };

//})();