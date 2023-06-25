import '../styles/Home.scss';
import { useSelector, TypedUseSelectorHook } from "react-redux";
import { Split } from "../models/Split";
import { useNavigate } from "react-router-dom";
import { RootState } from '../store/store';

const Home = () => {
    const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
    const navigate = useNavigate();
    var splitList: Split[] = useTypedSelector(state => state.splits);

    const navToSplitPage = (splitId?: string) => {
        navigate(`/split/${splitId}`)
    }

    return(
        <div className="home-page main-content-area">
            <div className="total-split-overview">{}</div>
            <ul className="split-list">
                {splitList.map(split => 
                    <li className="split-cont" onClick={() => navToSplitPage(split.id)}>
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