export const  isNotAllComponentReady = (sectionsComponents) =>sectionsComponents.some((el) => el.isComponentReady === false)

export const isLeftSomeSpace=(pageHeightLeft,sectionHeight)=>(pageHeightLeft-sectionHeight)>0

export const isAllSectionComponentCreated=(sections,sectionsComponent)=>sectionsComponent.length > 0 && sectionsComponent.length === sections.length
