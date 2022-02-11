function App() {
    return (
        <div className="container">
            <div className="row">
                <h1 className="selected"></h1>
            </div>
            <div className="content row">
                <div className="options col-md-6">
                    <div className="picker">
                        <emoji-picker className="dark"></emoji-picker>
                    </div>
                </div>
                <div className="code col-md-6">
                    <label for="favicon-code">HTML Code</label>
                    <textarea name="favicon-code" id="favicon-code" cols="30" rows="10"></textarea>
                    <div className="buttons">
                        <button id="copy">Copy to clipboard</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default App;