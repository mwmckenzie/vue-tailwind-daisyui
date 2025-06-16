import {defineStore} from 'pinia'
import {ref} from 'vue'
import { THEMES } from "@/js/constants.js";
import {getNextValue} from "@/js/utils.js";


export const useAppConfigStore 
    = defineStore('appConfigStore', () => {
        
        const theme = ref(THEMES.DARK);
        const title = ref('Vue App Title')
        
        function $reset() {
            theme.value = THEMES.DARK;
        }
        
        function setNextTheme(){
            theme.value = getNextValue(THEMES, theme.value);
        }
        
        function loadAppTheme() {
            theme.value = localStorage.getItem('app_theme') || theme.value;
            console.log(`App theme loaded: ${theme.value}`);
        }
        
        function saveAppTheme() {
            localStorage.setItem('app_theme', theme.value);
            console.log(`App theme saved: ${theme.value}`);
        }
    
        
        return { theme, title, $reset, setNextTheme, loadAppTheme, saveAppTheme };

});