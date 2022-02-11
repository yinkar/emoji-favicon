import Options from "./Options";
import CodeArea from "./CodeArea";

function Content() {
    return (
        <div className="content row">
            <Options />
            <CodeArea />
        </div>
    );
}

export default Content;