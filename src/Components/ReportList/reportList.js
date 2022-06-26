// This component render all the reports from the context (reportContext.reports)
import React, {useContext} from 'react';
import ReportPage from '../Pages/ReportPage/reportPage'
import {ReportContext} from "../../context/reports-context";
import {v4 as uuidv4} from 'uuid';
import ReportReady from "../ReportReady/ReportReady";
import {isAllSectionComponentCreated, isNotAllComponentReady} from "../../Helpers/reportsHelpers";

const ReportList = () => {
    const reportContext = useContext(ReportContext)
    const renderReportPage = () => {
        if (reportContext.reports) {
            if (isAllSectionComponentCreated(reportContext.sections,reportContext.sectionsComponent) && !isNotAllComponentReady(reportContext.sectionsComponent)) {
                return reportContext.reports?.map((el, index) => {
                    return (
                        <ReportReady key={uuidv4()}>
                            <ReportPage sections={el} index={index + 1} key={uuidv4()}/>
                        </ReportReady>
                    )
                })
            }
        }
        return <ReportPage someCalback={renderReportPage}/>
    }

    return renderReportPage()

};

export default ReportList;
