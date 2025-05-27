import {defineStore} from 'pinia'
import {ref} from 'vue'
import constants from "../js/constants.js";
import {getNextValue} from "../js/utils.js";

export const useAppConfigStore 
    = defineStore('appConfigStore', () => {
        
        const theme = ref(constants.THEMES.DARK);
        
        function $reset() {
            theme.value = constants.THEMES.DARK;
        }
        
        function setNextTheme(){
            theme.value = getNextValue(constants.THEMES, theme.value);
        }
        
        return { theme, $reset, setNextTheme };

});