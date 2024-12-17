import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import FileCompareService from "../../services/FileCompareService";

import { ProgressSpinner } from 'primereact/progressspinner';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Card } from 'primereact/card';

function FileCompare() {
    const [isDone, setIsDone] = useState(false);
    const [isFactsLoaded, setIsFactsLoaded] = useState(false);
    const [facts, setFacts] = useState([]);
    const params = useParams();

    useEffect(() => {
        let intervalId;

        const checkProcessing = async () => {
            const result = await FileCompareService.check_processing(params.id);
            if (result.is_done) {
                setIsDone(true);
                clearInterval(intervalId);

                const facts = await FileCompareService.get_compared_facts(params.id);
                if(facts) {
                    setIsFactsLoaded(true);
                    console.log(facts)
                    setFacts(facts);
                }
            }
        };

        intervalId = setInterval(checkProcessing, 2000);

        return () => {
            clearInterval(intervalId);
        };
    }, [params.id]);

    const rowClass = (data) => {
        return {
            'bg-red-600': !data.is_equals
        };
    };

    if(isDone && isFactsLoaded) {
        return (
            <div className="card mt-3">
                <Card title={`${facts.fist_file_name} / ${facts.second_file_name}`}>
                    <DataTable value={facts.facts} sortMode="multiple" tableStyle={{ minWidth: '50rem' }} rowClassName={rowClass}>
                        <Column field="fact_localization" header="Имя факта" sortable style={{ width: '25%' }}></Column>
                        <Column field="line_number" header="№ Линии" sortable style={{ width: '25%' }}></Column>
                        <Column field="f_value" header="Факт №1" sortable style={{ width: '25%' }}></Column>
                        <Column field="s_value" header="Факт №2" sortable style={{ width: '25%' }}></Column>
                    </DataTable>
                </Card>
            </div>
        )
    }

    if(isDone && !isFactsLoaded) {
        return (
            <div className="flex flex-column justify-content-center align-items-center align-content-center mt-3">
                <ProgressSpinner/>
                <p>Проводим сравнение</p>
            </div>
        )
    }

    return (
        <div className="flex flex-column justify-content-center align-items-center align-content-center mt-3">
            <ProgressSpinner/>
            <p>Извлекаем факты</p>
        </div>
    );
}

export default FileCompare;