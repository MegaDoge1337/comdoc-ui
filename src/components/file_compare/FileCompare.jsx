import { useParams } from "react-router-dom";

function FileCompare() {

    const params = useParams();

    return (
        <div className="card mt-3">
            {params.id}
        </div>
    );
}

export default FileCompare;