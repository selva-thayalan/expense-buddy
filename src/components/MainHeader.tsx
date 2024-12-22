import { useNavigate } from "react-router-dom";
import "../styles/components/MainHeader.scss";
import { useEffect, useState } from "react";
import ToggleSwitch from "./common/ToggleSwitch";

const MainHeader = () =>{
    const navigate = useNavigate();
    const [isDarkMode, setIsDarkMode] = useState(false);

    const toggleDarkMode = () => {
        var isLightMode = !isDarkMode;
      setIsDarkMode(isLightMode);
      setTheme(isLightMode);
    };

    const setTheme = (isLightMode: boolean) => {
        var root = document.getElementById("root");
        root?.setAttribute("data-theme", isLightMode?"dark":"light");
    }

    useEffect(() =>{
        setTheme(isDarkMode);
    }, [])
  
    return(
        <header className="main-header theme-transition">
            <p className="brand-name clickable" onClick={() => navigate("/")}>Expense Buddy</p>
            <ToggleSwitch 
                checked = {isDarkMode}
                onToggle = {toggleDarkMode}/>
        </header>
    )
}

export default MainHeader;