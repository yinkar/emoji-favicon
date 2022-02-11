import { useContext } from "react";
import { MainContext } from "../context";

function CodeArea() {
    const { outputCode, copyCode } = useContext(MainContext);
    
    return (
        <div className="code col-md-6">
            <label htmlFor="favicon-code">HTML Code</label>
            <textarea spellCheck="false" name="favicon-code" id="favicon-code" cols="30" rows="10" defaultValue={outputCode}></textarea>
            <div className="buttons">
                <button id="copy" onClick={copyCode}>Copy to clipboard</button>
            </div>
        </div>
    );
}

export default CodeArea;