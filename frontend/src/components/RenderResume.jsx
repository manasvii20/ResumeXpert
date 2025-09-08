import React from "react"
import TemplateOne from'./TemplateOne'
import TemplateTwo from'./TemplateTwo'
import TemplateThree from'./TemplateThree'

const RenderResume=({
    templateId,
    resumeDate,
    containerWidth,
})=>{
    switch(templateId){
        case "01":
            return(
                <TemplateOne resumeData={resumeDate} containerWidth={containerWidth}/>
            )
        
        case "02":
            return(
                <TemplateTwo resumeData={resumeDate} containerWidth={containerWidth}/>
            )

        case "03":
            return(
                <TemplateThree resumeData={resumeDate} containerWidth={containerWidth}/>
            )

        default:
            return(
                <TemplateOne resumeData={resumeDate} containerWidth={containerWidth}/>
            )
    }
}

export default RenderResume
