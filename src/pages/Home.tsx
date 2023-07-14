import '../styles/Home.scss';
import { useSelector, TypedUseSelectorHook } from "react-redux";
import { Split } from "../models/Split";
import { useNavigate } from "react-router-dom";
import { RootState } from '../store/store';
import { SplitOverview } from '../models/SplitOverview';
import { Member } from '../models/Member';

const Home = () => {
    const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
    const navigate = useNavigate();
    var splitList: Split[] = useTypedSelector(state => state.splits);
    var userAccount: Member = useTypedSelector(state => state.userAccount);

    const navToSplitPage = (splitId?: string) => {
        navigate(`/split/${splitId}`)
    }

    function getSplitOverviewDetails(overview: SplitOverview[]){
        let elements = [];
        let totalBorrow = 0, totalLend = 0;
        let userId = userAccount.id;
        overview.forEach(item => {
            if(item.memberId == userId){
                totalLend += item.amount;
            }
            else if(item.owesId == userId){
                totalBorrow += item.amount;
            }
        });
        if(totalLend > 0){
            elements.push(<li>You lend <b>{totalLend}</b></li>);
        }
        if(totalBorrow > 0){
            elements.push(<li>You owe <b>{totalBorrow}</b></li>);
        }
        return elements;
    }

    function getOverAllDetails(splits: Split[]){
        let elements = [];
        let totalBorrow = 0, totalLend = 0;
        let userId = userAccount.id;
        splits.forEach(split => {
            split.overviews.forEach(item => {
                if(item.memberId == userId){
                    totalLend += item.amount;
                }
                else if(item.owesId == userId){
                    totalBorrow += item.amount;
                }
            });
        });
        if(totalLend > 0){
            elements.push(<li>You lend <b>{totalLend}</b></li>);
        }
        if(totalBorrow > 0){
            elements.push(<li>You owe <b>{totalBorrow}</b></li>);
        }
        return elements;
    }

    return(
        <div className="home-page main-content-area">
            <ul className="total-split-overview no-list-style">
                {getOverAllDetails(splitList)}
            </ul>
            <ul className="split-list no-list-style">
                {splitList.map(split => 
                    <li className="split-cont" onClick={() => navToSplitPage(split.id)}>
                        <div className="split-pic">
                            <p>{split.name.charAt(0)}</p>
                        </div>
                        <div className="split-details">
                            <div className="split-name">{split.name}</div>
                            <ul className="split-overview no-list-style">
                                {getSplitOverviewDetails(split.overviews)}
                            </ul>
                        </div>
                    </li>)}
            </ul>
        </div>
    )
}

export default Home;