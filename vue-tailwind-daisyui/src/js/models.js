import {INPUT_TYPES, SVG_ICONS_HTML, SVG_OPTIONS} from "@/js/constants.js";
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

export class SvgModel {
    constructor({ iconType = SVG_OPTIONS.ICON_TYPES.NONE, 
                strokeWidth = "2", 
                fill = SVG_OPTIONS.FILL_TYPES.NONE, 
                stroke = SVG_OPTIONS.STROKE_TYPES.CURRENT_COLOR, 
                strokeLinejoin = SVG_OPTIONS.STROKE_LINEJOIN.ROUND,
                strokeLinecap = SVG_OPTIONS.STROKE_LINECAP.ROUND,
                size = "2",
                viewBoxX = "24",
                viewBoxY = "24"
    }) {
        this.iconType = iconType;
        this.strokeWidth = strokeWidth;
        this.fill = fill;
        this.stroke = stroke;
        this.strokeLinejoin = strokeLinejoin;
        this.strokeLinecap = strokeLinecap;
        this.size = size;
        this.viewBox = `0 0 ${viewBoxX} ${viewBoxY}`;
    }

    iconType;
    strokeWidth;
    fill;
    stroke;
    strokeLinejoin;
    strokeLinecap;
    size;
    viewBox;
}
