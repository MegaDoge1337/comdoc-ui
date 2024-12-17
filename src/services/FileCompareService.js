import axios from "axios";

class FileCompareService{
    static async get_file_compares() {
        const url = new URL("file_compares", import.meta.env.VITE_COMPARE_SERVICE_URL);
        return axios.get(url).then((res) => res.data);
    }

    static async check_processing(file_compare_id) {
        const url = new URL(`check_processing/${file_compare_id}`, import.meta.env.VITE_COMPARE_SERVICE_URL);
        return axios.get(url).then((res) => res.data);
    }

    static async get_compared_facts(file_compare_id) {
        const url = new URL(`compare_facts/${file_compare_id}`, import.meta.env.VITE_COMPARE_SERVICE_URL);
        return axios.get(url).then((res) => res.data);
    }
}

export default FileCompareService