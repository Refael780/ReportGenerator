import React, {useEffect, useContext} from 'react';
import ReportList from '../ReportList/reportList'
import {ReportContext} from "../../context/reports-context";
import Section from "../Section/section";
import '../Pages/ReportPage/style.css'
import './style.css'
import ReportReady from "../ReportReady/ReportReady";
import IntroPage from "../Pages/StaticPage/IntroPage";
import ContentTable from "../Pages/ContentTable/contentTable";
import CustomModal from "../Modal/CustomModal";
import {isAllSectionComponentCreated, isNotAllComponentReady} from "../../Helpers/reportsHelpers";

const Doc = (props) => {
    const reportContext = useContext(ReportContext)

    useEffect(() => {
        reportContext.initAllSections()

    }, [])

    useEffect(() => {
        document.addEventListener('keydown', (e) => {
            e.preventDefault();
            if ((e.metaKey || e.ctrlKey) && (e.metaKey || e.shiftKey) && (e.code === 'KeyH')) {
                reportContext.mixingSection()
            }
        })
    })

    if (isAllSectionComponentCreated(reportContext.sections,reportContext?.sectionsComponent)) {
        if (!isNotAllComponentReady(reportContext?.sectionsComponent) )
            return (
                <>
                    <CustomModal open={reportContext.isErrorSectionModal}
                                 closeCallback={() => reportContext.closeErrorModal()}
                                 title="Error!!"
                                 content="Oops something wrong!!"
                    />

                    <CustomModal open={reportContext.isReadySectionModal}
                                 closeCallback={() => reportContext.closeReadySectionModal()}
                                 title="Report is Ready!!"
                                 content="Now the report ready is ready and located"
                    />

                    <IntroPage/>
                    <ContentTable/>
                    <ReportList/>
                </>
            )
        reportContext.openReadySectionModal()
    }
    return (
        <ReportReady>
            {reportContext.sectionsComponent.map((el) => {
                return (
                    <Section key={el.id} {...el.component?.props}/>
                )
            })}
        </ReportReady>

    )

}

export default Doc;
