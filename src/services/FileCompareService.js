import axios from "axios";

class FileCompareService{
    static get_file_compares() {
        console.log(import.meta.env)
        const url = new URL("file_compares", import.meta.env.VITE_COMPARE_SERVICE_URL);
        return axios.get(url).then((res) => res.data);
    }
}

export default FileCompareService