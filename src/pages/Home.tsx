import { Member } from "../models/Member";
import { Split } from "../models/Split";
import { useNavigate } from "react-router-dom";
import '../styles/Home.scss';

const Home = () => {
    const navigate = useNavigate();
    let splits: Split[] = [];
    var selfMember: Member = {firstName:"Selva", emailId: "selva@gmail.com", id: "0"};
    splits.push({name:"Chennai Life", members: [selfMember], activities: [], overviews: []});
    splits.push({name:"Chennai Life", members: [selfMember], activities: [], overviews: []});

    const navToSplitPage = (splitId?: string) => {
        navigate(`/split/${splitId}`)
    }

    return(
        <div className="home-page main-content-area">
            <div className="total-split-overview">{}</div>
            <ul className="split-list">
                {splits.map(split => 
                    <li className="split-cont" onClick={() => navToSplitPage(split.name)}>
                        <div className="split-pic">
                            <p>{split.name.charAt(0)}</p>
                        </div>
                        <div className="split-details">
                            <div className="split-name">{split.name}</div>
                            <div className="split-overview"></div>
                        </div>
                    </li>)}
            </ul>
        </div>
    )
}

export default Home;