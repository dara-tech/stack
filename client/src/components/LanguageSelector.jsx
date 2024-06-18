import React from "react";
import {useLanguage} from "./LanguageProvider"

const LanguageSeletor =()=>{
    const {language, setLanguage} = useLanguage();

   return (
    <select value ={language}onChange={(e)=>setLanguage(e.target.value)}
     >
        <option value="en">English</option>
        <option value="km">ភាសាខ្មែរ</option>

    </select>

) 
}
export default LanguageSeletor;