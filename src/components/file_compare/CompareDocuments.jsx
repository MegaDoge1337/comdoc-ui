
import { FileUpload } from 'primereact/fileupload';

function CompareDocuments() {
    return (
        <div className="card mt-3">
            <FileUpload name="demo[]" url={'/api/upload'} multiple accept="application/pdf" emptyTemplate={<p className="m-0">Добавьте файлы, перетащив их в данную область</p>} chooseLabel='Добавить' uploadLabel='Отправить' cancelLabel='Сбросить'/>
        </div>
    )
}

export default CompareDocuments
        