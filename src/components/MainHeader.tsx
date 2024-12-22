import { useNavigate } from "react-router-dom";
import "../styles/components/MainHeader.scss";

const MainHeader = () =>{
    const navigate = useNavigate();
    return(
        <header className="main-header">
            <p className="brand-name clickable" onClick={() => navigate("/")}>Expense Buddy</p>
        </header>
    )
}

export default MainHeader;