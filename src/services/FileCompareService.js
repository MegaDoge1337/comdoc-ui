import axios from "axios";

class FileCompareService{
    static get_file_compares() {
        const url = "http://localhost:5000/file_compares";
        return axios.get(url).then((res) => res.data);
    }
}

export default FileCompareService