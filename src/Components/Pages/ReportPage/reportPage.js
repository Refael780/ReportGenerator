import React, {useContext} from 'react';
import './style.css'
import Section from "../../Section/section";
import {ReportContext} from "../../../context/reports-context";
import ReportReady from "../../ReportReady/ReportReady";

const ReportPage = (({sections,index}) => {
    const reportContext = useContext(ReportContext)


    const renderSectionComponents=()=>{
        if (sections && sections?.sectionsComponent && sections?.sectionsComponent.length>0){
            return sections?.sectionsComponent.map(el=> <Section key={el.id} id={el.id} {...el.component?.props}/>)
        }
        else{

            return reportContext.sectionsComponent.map(el=> <Section key={el.id} id={el.id} {...el.component?.props}/>)
        }
    }

    return (
        <>
            <ReportReady index={index}>
                {renderSectionComponents()}
            </ReportReady>

        </>
);
});

export default ReportPage;
