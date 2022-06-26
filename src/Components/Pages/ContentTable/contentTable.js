import React, {useContext} from 'react';
import {Table} from 'reactstrap';
import ReportReady from "../../ReportReady/ReportReady";
import {ReportContext} from "../../../context/reports-context";
import './style.css'

const ContentTable = (props) => {
    const reportContext = useContext(ReportContext)
    const renderSectionTitle = (sectionsComponent) => {
        return sectionsComponent.map((el) => {
            return (
                <div key={el.id}> Section: {el.index}  </div>
            )
        })
    }
    const renderTable = () => {

        return reportContext?.reports?.map((el, index) => {
            return (
                <tr key={el.id}>
                    <td> Page {index + 1}  </td>
                    <td>{renderSectionTitle(el.sectionsComponent)}</td>
                </tr>
            )
        })

    }
    return (
        <ReportReady>
            <Table className="table">
                <thead>
                <tr>
                    <th>
                        Page
                    </th>
                    <th>
                        section
                    </th>
                </tr>
                </thead>
                <tbody>
                {renderTable()}
                </tbody>
            </Table>
        </ReportReady>

    );
}

export default ContentTable;
