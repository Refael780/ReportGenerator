// This Wrapper component is make any component to  report  (size and style)
// Props: 1 .index for pagination
import React from 'react';
import './style.css'
const ReportReady= (props) => {

    const renderFooter=()=>{
       return(
           <div className='footer-report-page-blue'>
            {props.index}
        </div>
       )
    }
    return (
        <div className="content-doc">
         <div className="header-report-size">
            <div className="content-report-page">
                {props.children}
            </div>
             {renderFooter()}
        </div>
        </div>
    );
}

export default ReportReady;
