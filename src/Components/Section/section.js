// This Component get some content and make from it section in the report
// in addition she call to method in context to set it height
import React, {useEffect, useRef} from 'react';
import './style.css'

const Section = React.forwardRef((props, ref) => {
    const sectionRef = useRef()
    useEffect(() => {
        if (sectionRef?.current) {
            props.getHeight(sectionRef)
        }
    },[]);

    return (
        <div ref={sectionRef} key={props.id}  className="section">{props.content}</div>
    );
})

export default Section;
