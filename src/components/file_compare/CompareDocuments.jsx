
import { useNavigate } from "react-router-dom";
import { FileUpload } from 'primereact/fileupload';

function CompareDocuments() {
    const navigate = useNavigate()

    const onUpload = (files) => {
        const data = JSON.parse(files.xhr.responseText)
        navigate(`/view/${data["file_compare"]}`)
    }

    return (
        <div className="card mt-3">
            <FileUpload name="files" url='http://localhost:5000/extract_facts' multiple accept="application/pdf" emptyTemplate={<p className="m-0">Добавьте файлы, перетащив их в данную область</p>} chooseLabel='Добавить' uploadLabel='Отправить' cancelLabel='Сбросить' onUpload={onUpload}/>
        </div>
    )
}

export default CompareDocuments
        