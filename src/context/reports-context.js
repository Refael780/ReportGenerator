import React, {useState, useRef, useEffect} from "react";
import {
    isAllSectionComponentCreated,
    isLeftSomeSpace,
    isNotAllComponentReady,

} from "../Helpers/reportsHelpers";
import Section from "../Components/Section/section";
import {v4 as uuidv4} from 'uuid';

export const ReportContext = React.createContext({
    reports: [],
    initAllSections: (sections) => {
    },
    sections: [],
    sectionsComponent: [],

    makeSectionComponents: () => {},
    makeSectionComponentsToReport: () => {},

    closeReadySectionModal: () => {},
    openReadySectionModal: () => {},

    closeErrorModal: () => {},
    openErrorModal: () => {},

    isErrorSectionModal: false,
    isSectionComponentReady: false,

    mixingSection: () => {},
    isReadySectionModal: false,
    setSectionsComponent: () => {},
})

export default props => {
    const [sections, setSections] = useState([])
    const [isSectionComponentReady, setIsSectionComponentReady] = useState(false)
    const [sectionsComponent, setSectionsComponent] = useState([])
    const [isReadySectionModal, setIsReadySectionModal] = useState(false)
    const [isErrorSectionModal, setIsErrorSectionModal] = useState(false)
    const sectionRef = useRef(null)
    const [reportsList, setReportsList] = useState([{
        id: uuidv4(),
        totalHeight: 1090,
        sections: [],
        sectionsComponent: []
    }])

    useEffect(() => {
        if (sections.length > 0) {
            makeSectionComponentsToRender()
        }
    }, [sections])

    // This use effect is occur  when there some change in the sectionComponent it check if all  the SectionComponents done with  rendering and make report by pages
    useEffect(() => {
        let reportPage = {totalHeight: 1090, sectionsComponent: [], sectionOrderIndex: 0}
        let reportPages = []
        if (isAllSectionComponentCreated(sections,sectionsComponent) && !isNotAllComponentReady(sectionsComponent) ) {
            for (let i = 0; i < sectionsComponent.length; i++) {
                let el = sectionsComponent[i]

                if (isLeftSomeSpace(reportPage.totalHeight, el.heightSection)) {
                    reportPage.sectionsComponent.push({...el})
                    reportPage.totalHeight = reportPage.totalHeight - el.heightSection
                } else {
                    if (reportPage.sectionsComponent.length > 0) {
                        reportPages.push({...reportPage})
                    }
                    reportPage = {totalHeight: 1090 - el.heightSection, sectionsComponent: []}
                    reportPage.sectionsComponent.push({...el})
                }
            }
            reportPages.push({...reportPage})
            setReportsList([...reportPages])
            /// need to be modal here
        }
    }, [sectionsComponent])


    const closeReadySectionModal = () => setIsReadySectionModal(false)
    const openReadySectionModal = () => setIsReadySectionModal(true)
    const closeErrorModal = () => setIsErrorSectionModal(false)
    const openErrorModal = () => setIsErrorSectionModal(true)


    /**
     * This callback method is call after the first render and prepare the Section component include is high of each  section
     * @param section The section (from the api)  that the method make
     * @param sectionRef  ref of the component to  calculate the high  of the component
     * @param index  index of the section on the list
     */
    const makeSectionComponentsToReport = (section, sectionRef, index) => {
        const NOT_FOUND = -1
        const element = sectionsComponent.findIndex((el) => el.id === section.id)
        const isAllComponentsReady = sectionsComponent.some((el) => el.isComponentReady === false)
        if (sectionRef.current && element === NOT_FOUND && !isAllComponentsReady) {
            setSectionsComponent([
                    ...sectionsComponent,
                    sectionsComponent[index] = {
                        component: <Section key={section.id} id={section.id} getHeight={() => {
                        }}
                                            content={section.content}/>,
                        heightSection: sectionRef.current.getBoundingClientRect().height,
                        id: section.id,
                        isComponentReady: true,
                        index: index + 1
                    }
                ]
            )
        }
    }


    /**
     * This method Create tne Section component for the first time
     */
    const makeSectionComponentsToRender = () => {
        const sectionComponent = sections.map((el, index) => {
            return ({
                component: <Section ref={sectionRef} key={el.id}
                                    id={el.id}
                                    getHeight={(sectionRef) => makeSectionComponentsToReport(el, sectionRef, index)}
                                    content={el.content}/>,

                heightSection: undefined,
                id: el.id,
                isComponentReady: false
            })
        })

        setSectionsComponent([...sectionComponent])
        setIsSectionComponentReady(true)
    }
    /**
     * This function is take the section array and randomize it
     */
    const mixingSection = () => {
        let newSectionArray = [...sections]
        let currentIndex = newSectionArray.length, randomIndex;
        // While there remain elements to shuffle.
        while (currentIndex !== 0) {
            // Pick a remaining element.
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            // And swap it with the current element.
            [newSectionArray[currentIndex], newSectionArray[randomIndex]] = [
                newSectionArray[randomIndex], newSectionArray[currentIndex]];
        }
        setSections([])
        setSectionsComponent([])
        setSections(newSectionArray)

    }

    /**
     * Demonstrate fetching from some API  to get all sections
     */
    const initAllSections = () => {
        try {
            setSections([
                {
                    id: "1",
                    content: "111asdsadsadsad",
                },
                {
                    id: "2",
                    content: "Sed bibendum, dui at molestie interdum, tortor sapien imperdiet velit, sed ullamcorper arcu odio in ante. Cras vitae tincidunt tellus. Vestibulum sit amet faucibus diam. Suspendisse ut dolor gravida, blandit purus lacinia, semper massa. Phasellus placerat leo nec lorem fringilla vulputate. Integer venenatis mauris quis suscipit mattis. Curabitur odio dui, viverra vel quam non, eleifend malesuada urna. Maecenas sed luctus diam. Quisque hendrerit pulvinar efficitur. Aliquam fringilla elit quis malesuada blandit. Nullam placerat non lorem non porta. Nam id luctus quam. Aenean erat risus, consectetur ac vulputate ac, blandit eu ",
                }, {
                    id: "3",
                    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras tincidunt tortor nec ex molestie consectetur. Quisque lacus dui, tempor nec faucibus non, malesuada sit amet orci. Nam convallis lectus eu faucibus cursus. Phasellus orci erat, mattis sit amet mollis nec, vestibulum sed libero. In dignissim porttitor iaculis. Etiam ia ",
                }, {
                    id: "4",
                    content: "estibulum posuere laoreet justo ac vehicula. Proin semper sem mauris, pulvinar accumsan tortor mollis eu. Nam elementum diam ornare purus tristique venenatis. Phasellus mauris mi, sagittis sed eleifend fermentum, volutpat vitae velit. Integer maximus, ante non imperdiet tempor, purus elit tempus dolor, ac fringilla odio elit ac ligula. Nam egestas purus eros, in iaculis est sollicitudin sit amet. Nullam pretium, tortor placerat maximus posuere, tortor nulla convallis ex, non tempus velit nibh nec urna. Vivamus dignissim nunc vel arcu mattis placerat. Praesent ligula eros, mattis quis magna ut, pellentesque commodo eros. Morbi dapibus, nulla a commodo aliquam, est mauris molestie nibh, quis vestibulum nisi ligula sed nibh. Nullam sit amet lacinia lectus. Sed enim metus, tempor sed cursus eu, viverra non neque. Mauris lacus velit, commodo ut varius vel, laoreet et velit.",
                },
                {
                    id: "5",
                    content: "Curabitur pellentesque nulla nec mauris fermentum, id luctus enim congue. Nullam fermentum, sapien a tincidunt finibus, lacus elit congue nunc, ultrices venenatis purus ligula vel est. Suspendisse sagittis consectetur elit, eget vulputate nibh sagittis ac. Mauris ut varius orci, quis dignissim nulla. Suspendisse",
                },
                {
                    id: "6",
                    content: "Morbi eu enim ligula. Nam turpis sapien, lobortis a urna elementum, pretium vehicula lorem. Integer eu mi a enim volutpat ornare sit amet ac dui. Sed facilisis quam velit. Vivamus eu feugiat magna. Maecenas viverra erat fringilla dui tempus dapibus. Ut egestas eros a ultricies pretium. Phasellus lectus nibh, porttitor et dui eu, aliquet volutpat dui. Ut quis rutrum nulla, a porta metus.",
                },
                {
                    id: "7",
                    content: "Morbi a lacus at risus tempus euismod. Suspendisse ultrices eleifend ex in tincidunt. Ut ullamcorper consequat turpis et hendrerit. Nullam at nisi sem. Mauris eu sapien arcu. Curabitur vulputate dui eu odio rutrum euismod. Ut ac laoreet ex. Phasellus ullamcorper cursus semper. In sollicitudin aliquam dolor quis lobortis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae",
                },
                {
                    id: "8",
                    content: "Suspendisse ac sagittis est. Ut id erat sem. In accumsan aliquam elit non rutrum. Aliquam dictum metus non blandit dignissim. Curabitur magna tellus, ullamcorper et condimentum porta, ultrices sit amet sapien. Pellentesque laoreet massa est, at maximus urna eleifend quis. Ut pretium fringilla ullamcorper. Nullam tempor massa quis bibendum porttitor. Fusce ultricies viverra augue, non hendrerit quam varius ac. Nulla imperdiet, ipsum ac tincidunt tempor, est ex mattis quam, sed iaculis tellus nisl sit amet lorem. Integer ultrices ornare dolor non faucibus. Cras tortor ex, semper sit amet vestibulum eu, egestas ut dolor.",
                },
                {
                    id: "9",
                    content: "Duis a congue erat, et ullamcorper nulla. Pellentesque venenatis erat in nisi pulvinar efficitur. Maecenas nisi justo, ultrices eu cursus non, volutpat quis velit. Nam congue, dui vitae rhoncus placerat, lacus enim dapibus turpis, vitae sagittis lorem mauris ac arcu. Nullam consequat nulla risus. Morbi urna nisi, tristique a iaculis dictum, accumsan id neque. Donec mattis eu risus et lacinia.Sed bibendum nulla et suscipit malesuada. Aliquam eu mattis diam, vitae lobortis sem. Curabitur eget condimentum erat. Duis ac sagittis velit. Duis nulla elit, venenatis vel risus tempus, consectetur ultricies purus. Integer at nisl in tortor malesuada interdum et sed augue. Praesent turpis magna, cursus in enim ut, venenatis gravida ex. Pellentesque placerat justo vulputate, rutrum velit vel, interdum magna. Cras volutpat ullamcorper lobortis Phasellus sed orci nunc. Proin mattis quam in odio ultrices, id facilisis dolor congue. In hac habitasse platea dictumst. Aenean mattis efficitur eros quis faucibus. Donec non eleifend ante. Donec commodo eu purus sed porttitor. Nulla facilisi.",
                },
                {
                    id: "10",
                    content: "Aliquam dictum metus non blandit dignissim. Curabitur magna tellus, ullamcorper et condimentum porta, ultrices sit amet sapien. Pellentesque laoreet massaDuis a congue erat, et ullamcorper nulla. Pellentesque venenatis erat in nisi pulvinar efficitur. Maecenas nisi justo,  est, at maximus urna eleifend quis. Ut pretium fringilla ullamcorper. Nullam tempor massa quis bibendum porttitor",
                },
                {
                    id: "11",
                    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras tincidunt tortor nec ex molestie consectetur. Quisque lacus dui, tempor nec faucibus non, malesuada sit amet orci. Nam convallis lectus eu faucibus cursus. Phasellus orci erat, mattis sit amet mollis nec, vestibulum sed libero. In dignissim porttitor iaculis. Etiam ia Duis a congue erat, et ullamcorper nulla. Pellentesque venenatis erat in nisi pulvinar efficitur. Maecenas nisi justo, Duis a congue erat, et ullamcorper nulla. Pellentesque venenatis erat in nisi pulvinar efficitur. Maecenas nisi justo, ",
                }, {
                    id: "12",
                    content: "estibulum posuere laoreet justo ac vehicula. Proin semper sem mauris, pulvinar accumsan tortor mollis eu. Nam elementum diam ornare purus tristique venenatis. Phasellus mauris mi, sagittis sed eleifend fermentum, volutpat vitae velit. Integer maximus, ante non imperdiet tempor, purus elit tempus dolor, ac fringilla odio elit ac ligula. Nam egestas purus eros, in iaculis estus non blandit dignissim. Curabitur magna tellus, ullamcorper et condimentum porta, ultrices sit amet sapien. Pellentesque laoreet massa est, Duis a congue erat, et ullamcorper nulla. Pellentesque venenatis erat in nisi pulvinar efficitur. Maecenas nisi justo, at maximus us non blandit dignissim. Curabitur magna tellus, ullamcorper et condimentum porta, ultrices sit amet sapien. Pellentesque laoreet massa est, at maximus urna eleifend quis.urna eleifend quis. sollicitudin sit amet. Nullam pretium, tortor placerat maximus posuere, tortor nulla convallis ex, non tempus velit nibh nec urna. Vivamus dignissim nunc vel arcu mattis placerat. Praesent ligula eros, mattis quis magna ut, pellentesque commodo eros. Morbi dapibus, nulla a commodo aliquam, est mauris molestie nibh, quis vestibulum nisi ligula sed nibh. Nullam sit amet lacinia lectus. Sed enim metus, tempor sed cursus eu, viverra non neque. Mauris lacus velit, commodo ut varius vel, laoreet et velit.",
                },
                {
                    id: "13",
                    content: "Curabitur pellentesque nulla nec mauris fermentum, id luctus enim congue. Nullam fermentum, sapien a tincidunt finibus, lacus elit congue nunc, ultrices venenatis purus ligula vel est. Suspendisse sagittis consectetur elit, eget vulputate nibh sagittis ac. Mauris ut varius orci, quis dignissim nulla. Suspendisse",
                },
                {
                    id: "14",
                    content: "Morbi eu enim ligula. Nam turpis sapien, lobortis a urna elementum, pretium vehicula lorem. Integer eu mi a enim volutpat ornare sit amet ac dui. Sed facilisis quam velit. Vivamus eu feugiat magna. Maecenas viverra erat fringilla dui tempus dapibus. Ut egestas eros a ultricies pretium.us non blandit dignissim. Curabitur magna tellus, ullamcorper et condimentum porta, ultrices sit amet sapien. Pellentesque laoreet massa est, at maximus urna eleifend quis. Phasellus lectus nibh, porttitor et dui eu, aliquet volutpat dui. Ut quis rutrum nulla, a porta metusDuis a congue erat, et ullamcorper nulla. Pellentesque venenatis erat in nisi pulvinar efficitur. Maecenas nisi justo.",
                },
                {
                    id: "15",
                    content: "Morbi a lacus at risus tempus euismod. Suspendisse ultrices eleifend ex in tincidunt. Ut ullamcorper consequat turpis et hendrerit. Nullam at nisi sem. Mauris eu sapien arcu. Curabitur vulputate dui eu us non blandit dignissim. Curabitur magna tellus, ullamcorper et condimentum porta, ultrices sit amet sapien. Pellentesque laoreet massa est, at maximus urna eleifend quis.odio rutrum euismod. Ut ac laoreet ex. Phasellus ullamcorper cursus semper. In sollicitudin aliquam dolor quis lobortis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae Duis a congue erat, et ullamcorper nulla. Pellentesque venenatis erat in nisi pulvinar efficitur. Maecenas nisi justo.",
                },
                {
                    id: "16",
                    content: "Suspendisse ac sagittis est. Ut id erat sem. In accumsan aliquam elit non rutrum. Aliquam dictum metus non blandit dignissim. Curabitur magna tellus, ullamcorper et condimentum porta, ultrices sit amet sapien. Pellentesque laoreet massa est, at maximus urna eleifend quis. Ut pretium fringilla ullamcorper. Nullam tempor massa quis bibendum porttitor. Fusce ultricies viverra augue, non hendrerit quam varius ac. Nulla imperdiet, ipsum ac tincidunt tempor, est ex mattis quam, sed iaculis tellus nisl sit amet lorem. Integer ultrices ornare dolor non faucibus. Cras tortor ex, semper sit amet vestibulum eu, egestas ut dolor.Duis a congue erat, et ullamcorper nulla. Pellentesque venenatis erat in nisi pulvinar efficitur. Maecenas nisi justo, Duis a congue erat, et ullamcorper nulla. Pellentesque venenatis erat in nisi pulvinar efficitur. Maecenas nisi justo, Duis a congue erat, et ullamcorper nulla. Pellentesque venenatis erat in nisi pulvinar efficitur. Maecenas nisi justo.",
                },
                {
                    id: "17",
                    content: "Duis a congue erat, et ullamcorper nulla. Pellentesque venenatis erat in nisi pulvinar efficitur. Maecenas nisi justo,us non blandit dignissim. Curabitur magna tellus, ullamcorper et condimentum porta, ultrices sit amet sapien. Pellentesque laoreet massa est, at maximus urna eleifend quis. ultrices eu cursus non, volutpat quis velit. Nam congue, dui vitae rhoncus placerat, lacus enim dapibus turpis, vitae sagittis lorem mauris ac arcu. Nullam consequat nulla risus. Morbi urna nisi, tristique a iaculis dictum, accumsan id neque. Donec mattis eu risus et lacinia.Sed bibendum nulla et suscipit malesuada. Aliquam eu mattis diam, vitae lobortis sem. Curabitur eget condimentum erat. Duis ac sagittis velit. Duis nulla elit, venenatis vel risus tempus, consectetur ultricies purus. Integer at nisl in tortor malesuada interdum et sed augue. Praesent turpis magna, cursus in enim ut, venenatis gravida ex. Pellentesque placerat justo vulputate, rutrum velit vel, interdum magna. Cras volutpat ullamcorper lobortis Phasellus sed orci nunc. Proin mattis quam in odio ultrices, id facilisis dolor congue. In hac habitasse platea dictumst. Aenean mattis efficitur eros quis faucibus. Donec non eleifend ante. Donec commodo eu purus sed porttitor. Nulla facilisi.",
                },
                {
                    id: "18",
                    content: "Aliquam dictum metus non blandit dignissim. Curabitur magna tellus, ullamcorper et condimentum porta, ultrices sit amet sapien. Pellentesque laoreet massa est, at maximus urna eleifend quis. Ut pretium fringilla ullamcorper. Nullam tempor massa quis bibendum porttitor",
                }

            ])
        } catch (er) {
            openErrorModal()
        }

    }


    return (
        <ReportContext.Provider value={{
            // Selectors
            reports: reportsList,
            sections: sections,
            isSectionComponentReady: isSectionComponentReady,
            sectionsComponent: sectionsComponent,
            setReportsList: setReportsList,
            isReadySectionModal: isReadySectionModal,
            setSectionsComponent: setSectionsComponent,
            isErrorSectionModal: isErrorSectionModal,

            // methods
            initAllSections: initAllSections,
            makeSectionComponentsToRender: makeSectionComponentsToRender,
            makeSectionComponentsToReport: makeSectionComponentsToReport,
            mixingSection: mixingSection,
            closeReadySectionModal: closeReadySectionModal,
            openReadySectionModal: openReadySectionModal,
            closeErrorModal: closeErrorModal,
            openErrorModal: openErrorModal,
        }}>
            {props.children}
        </ReportContext.Provider>
    )
}
