import {defineStore} from 'pinia'
import {ref} from 'vue'
import {APP_NAME, APP_STORES, LOCAL_STORAGE_KEYS, THEMES} from "@/js/constants.js";
import {getNextValue} from "@/js/utils.js";


export const useAppConfigStore 
    = defineStore(APP_STORES.CONFIG_STORE, () => {
        
        const theme = ref(THEMES.DARK);
        const title = ref(APP_NAME);
        
        function $reset() {
            theme.value = THEMES.DARK;
        }
        
        function setNextTheme(){
            theme.value = getNextValue(THEMES, theme.value);
        }
        
        function loadAppTheme() {
            theme.value = localStorage.getItem(LOCAL_STORAGE_KEYS.APP_THEME) || theme.value;
            console.log(`App theme loaded: ${theme.value}`);
        }
        
        function saveAppTheme() {
            localStorage.setItem(LOCAL_STORAGE_KEYS.APP_THEME, theme.value);
            console.log(`App theme saved: ${theme.value}`);
        }
    
        
        return { theme, title, $reset, setNextTheme, loadAppTheme, saveAppTheme };

});