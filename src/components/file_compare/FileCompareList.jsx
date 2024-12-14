import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Card } from 'primereact/card';

import FileCompareService from "../../services/FileCompareService";

function FileCompareList() {

    const [fileCompares, setFileCompares] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        FileCompareService
            .get_file_compares()
            .then((data) => {
                setFileCompares(data);
            })
            .catch((err) => {
                console.error(err);
            })
    }, [setFileCompares]);

    return (
        <div className="card mt-3">
            <Card title="Список сравнений">
                <DataTable value={fileCompares} tableStyle={{ minWidth: '50rem' }} selectionMode="single" onSelectionChange={(e) => navigate(`/view/${e.value.id}`)}>
                    <Column field="id" header="ИД" sortable style={{ width: '25%' }}></Column>
                    <Column field="first_file_name" header="Файл №1" sortable style={{ width: '25%' }}></Column>
                    <Column field="second_file_name" header="Файл №2" sortable style={{ width: '25%' }}></Column>
                </DataTable>
            </Card>
        </div>
    );
}

export default FileCompareList;