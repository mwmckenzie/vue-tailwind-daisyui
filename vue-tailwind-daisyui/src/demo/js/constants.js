import {ButtonModel, CheckboxModel} from "@/js/models.js";
import {INPUT_TYPES, SVG_ICONS_HTML} from "@/js/constants.js";

//region String Constants

export const APP_NAME = 'Vue App Title';
export const APP_VERSION = '1.0.0';
export const APP_DESCRIPTION = 'A Vue 3 Component & UI library';
export const APP_AUTHOR = '<NAME>';
export const APP_AUTHOR_URL = 'https://github.com/mwmckenzie';
export const APP_GITHUB_URL = 'https://github.com/mwmckenzie/vue-tailwind-daisyui';
export const APP_LICENSE = 'MIT';
export const APP_LICENSE_URL = 'https://github.com/mwmckenzie/vue-tailwind-daisyui/blob/master/LICENSE';
export const APP_WEBSITE = 'https://github.com/mwmckenzie/vue-tailwind-daisyui';

//endregion


//region Input Models

export const buttons = {
    componentBlocks: new ButtonModel("component-blocks", "previewtabs", "Component Blocks",
        SVG_ICONS_HTML.COMPONENT_BLOCKS, INPUT_TYPES.RADIO),
    keyValueList: new ButtonModel("component-variants", "previewtabs", "Component Variants",
        SVG_ICONS_HTML.KEY_VALUE_LIST, INPUT_TYPES.RADIO),
    colorPalette: new ButtonModel("color-palette", "previewtabs", "Color Palette",
        SVG_ICONS_HTML.COLOR_PALETTE, INPUT_TYPES.RADIO),
    close: new ButtonModel("close", "", "",
        SVG_ICONS_HTML.CROSS, INPUT_TYPES.BUTTON),
}

export const checkboxes = {
    checkboxModel: new CheckboxModel("checkbox-model", "checkbox-model", "Checkbox Model"),
    tanks: new CheckboxModel("tanks", "composite-1", "Tanks"),
    fighters: new CheckboxModel("fighters", "composite-1", "Fighters"),
    frigates: new CheckboxModel("frigates", "composite-1", "Frigates"),
}

//endregion