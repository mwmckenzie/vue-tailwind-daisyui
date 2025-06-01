import {INPUT_TYPES, SVG_ICONS_HTML} from "@/js/constants.js";
import { v4 as uuidv4 } from 'uuid';

export class ButtonModel {
    
    constructor(name, groupName = "none", label = "Button", svgHtmlData = null, 
                inputType = null) {
        this.id = uuidv4();
        this.name = name;
        this.groupName = groupName;
        this.label = label;
        this.svgHtmlData = svgHtmlData ? svgHtmlData : SVG_ICONS_HTML.NONE;
        this.inputType = inputType ? inputType : INPUT_TYPES.RADIO;
    }

    id;
    name;
    groupName;
    label;
    svgHtmlData;
    inputType;
}

export class CheckboxModel {

    constructor(name, groupName = null, label = "Checkbox", checked=false) {
        this.id = uuidv4();
        this.name = name;
        this.groupName = groupName;
        this.label = label;
        this.inputType = INPUT_TYPES.CHECKBOX;
        this.checked = checked;
    }

    id;
    name;
    groupName;
    label;
    inputType;
    checked;
}
