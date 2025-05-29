import {defineStore} from 'pinia'
import {ref} from 'vue'
import { THEMES } from "../js/constants.js";
import {getNextValue} from "../js/utils.js";


export const useAppConfigStore 
    = defineStore('appConfigStore', () => {
        
        const theme = ref(THEMES.DARK);
        
        function $reset() {
            theme.value = THEMES.DARK;
        }
        
        function setNextTheme(){
            theme.value = getNextValue(THEMES, theme.value);
        }
        
        return { theme, $reset, setNextTheme };

});