import constants from "./constants.js";
import { v4 as uuidv4 } from 'uuid';

class ButtonModel {
    constructor(name, groupName = "none", label = "Button", svgHtmlData = null, inputType = null) {
        this.id = uuidv4();
        this.name = name;
        this.groupName = groupName;
        this.label = label;
        this.svgHtmlData = svgHtmlData ? svgHtmlData : constants.SVG_ICONS_HTML.NONE;
        this.inputType = inputType ? inputType : constants.inputTypes.RADIO;
    }

    id;
    name;
    groupName;
    label;
    svgHtmlData;
    inputType;
    
}

export {ButtonModel};