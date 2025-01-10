import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import FileCompareService from "../../services/FileCompareService";

import { TabView, TabPanel } from 'primereact/tabview';
import { ProgressSpinner } from 'primereact/progressspinner';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Card } from 'primereact/card';

import { PdfLoader, PdfHighlighter } from "react-pdf-highlighter";
import { classNames } from "primereact/utils";

function FileCompare() {

    const [isDone, setIsDone] = useState(false);
    const [isFactsLoaded, setIsFactsLoaded] = useState(false);
    const [facts, setFacts] = useState([]);
    const params = useParams();

    useEffect(() => {
        let timeout = 5000;
        let timeoutId;

        const checkProcessing = async () => {
            const result = await FileCompareService.check_processing(params.id);
            if (result.is_done) {
                setIsDone(true);
                clearTimeout(timeoutId);

                const facts = await FileCompareService.get_compared_facts(params.id);
                if(facts) {
                    setIsFactsLoaded(true);
                    setFacts(facts);
                }
            }
            else 
            {
                clearTimeout(timeoutId);
                setTimeout(checkProcessing, timeout)
            }
        };

        timeoutId = setTimeout(checkProcessing, timeout);

        return () => {
            clearTimeout(timeoutId);
        };
    }, [params.id]);

    const rowClass = (data) => {
        return {
            'bg-red-300': !data.is_equals
        };
    };

    const verifiedBodyTemplate = (rowData) => {
        return <i className={classNames('pi', { 'text-green-500 pi-check-circle': rowData.is_equals, 'text-red-900 pi-times-circle': !rowData.is_equals })}></i>;
    };

    if(isDone && isFactsLoaded) {
        return (
            <div className="card mt-3">
                <Card title={`${facts.fist_file_name} / ${facts.second_file_name}`}>
                    <TabView>
                        <TabPanel header="Таблица фактов">
                            <DataTable value={facts.facts} sortMode="multiple" tableStyle={{ minWidth: '50rem' }} rowClassName={rowClass}>
                                <Column field="fact_localization" header="Имя факта" sortable style={{ width: '25%' }}></Column>
                                <Column field="line_number" header="№ Линии" sortable style={{ width: '25%' }}></Column>
                                <Column field="f_value" header="Факт №1" sortable style={{ width: '25%' }}></Column>
                                <Column field="s_value" header="Факт №2" sortable style={{ width: '25%' }}></Column>
                                <Column field="is_equals" header="Совпадение" sortable dataType="boolean" style={{ minWidth: '6rem' }} body={verifiedBodyTemplate}></Column>
                            </DataTable>
                        </TabPanel>
                        <TabPanel header="Документы">
                            <div className="card flex justify-content-center">
                                <div style={{ display: "flex", width: "100%", height: "70vh" }}>
                                    <div style={{ width: "50%", height: "100%", position: "relative" }}>
                                        <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}>
                                            <PdfLoader style={{position: "relative"}} url={`http://localhost:5000/view_file/${params.id}/f_file`}>
                                                {(pdfDocument) => (
                                                    <PdfHighlighter
                                                        pdfDocument={pdfDocument}
                                                        pdfScaleValue="2"
                                                        highlights={[]}
                                                    />
                                                )}
                                            </PdfLoader>
                                        </div>
                                    </div>
                                    <div style={{ width: "50%", height: "100%", position: "relative" }}>
                                        <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}>
                                            <PdfLoader style={{position: "relative"}} url={`http://localhost:5000/view_file/${params.id}/s_file`}>
                                                {(pdfDocument) => (
                                                    <PdfHighlighter
                                                        highlights={[]}
                                                        pdfDocument={pdfDocument}
                                                        pdfScaleValue="2"
                                                    />
                                                )}
                                            </PdfLoader>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </TabPanel>
                    </TabView>
                </Card>
            </div>
        )
    }

    if(isDone && !isFactsLoaded) {
        return (
            <div className="flex flex-column justify-content-center align-items-center align-content-center mt-5">
                <ProgressSpinner/>
                <p>Проводим сравнение</p>
            </div>
        )
    }

    return (
        <div className="flex flex-column justify-content-center align-items-center align-content-center mt-5">
            <ProgressSpinner/>
            <p>Извлекаем факты</p>
        </div>
    );
}

export default FileCompare;