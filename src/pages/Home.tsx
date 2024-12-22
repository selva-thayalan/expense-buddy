import '../styles/Home.scss';
import { useSelector, TypedUseSelectorHook } from "react-redux";
import { Split } from "../models/Split";
import { useNavigate } from "react-router-dom";
import { RootState } from '../store/store';
import { SplitOverview } from '../models/SplitOverview';
import { Member } from '../models/Member';
import { getMemeberNameById } from '../utils/Common';
import StyledButton, { ButtonStyle } from '../components/common/StyledButton';

const MAX_DETAILED_LIST_COUNT = 3;

const Home = () => {
    const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
    const navigate = useNavigate();
    var splitList: Split[] = useTypedSelector(state => state.splits);
    var userAccount: Member = useTypedSelector(state => state.userAccount);

    const navToSplitPage = (splitId?: string) => {
        navigate(`/split/${splitId}`)
    }

    function getSplitOverviewDetails(overview: SplitOverview[], members: Member[]){
        let elements = [];
        let totalBorrow = 0, totalLend = 0, totalBorrowersCount = 0, totalLendersCount = 0;
        let userId = userAccount.id;
        overview.forEach(item => {
            if(item.memberId === userId){
                totalLend += item.amount;
                totalLendersCount++;
            }
            else if(item.owesId === userId){
                totalBorrow += item.amount;
                totalBorrowersCount++;
            }
        });
        if(totalLend > 0){
            if(totalLendersCount > 1){
                elements.push(<li className="positive-color theme-transition group-split-overview-cont">You lend <b className="split-overview-amount">&#8377;{totalLend}</b></li>);
                let lendDetails = [], count = 0;
                for(let i=0; i<overview.length; i++){
                    let item = overview[i];
                    if(item.memberId === userId){
                        count++;
                        if(count < MAX_DETAILED_LIST_COUNT || count === totalLendersCount){
                            lendDetails.push(<p>{getMemeberNameById(members, item.owesId)} owes you &#8377;{item.amount}</p>);
                        }
                        else{
                            lendDetails.push(<p>Plus <b>{totalLendersCount - lendDetails.length} Members</b> owes you</p>);
                            break;
                        }
                    }
                }
                elements.push(<li className="split-overview-details theme-transition">{lendDetails}</li>);
            }
            else{
                for(let i=0; i<overview.length; i++){
                    let item = overview[i];
                    if(item.memberId === userId){
                        elements.push(<li className="positive-color theme-transition group-split-overview-cont"><span className="f_w_500">{getMemeberNameById(members, item.owesId)}</span> owes you <b className="split-overview-amount">&#8377;{item.amount}</b></li>);
                        break;
                    }
                }
            }
        }
        if(totalBorrow > 0){
            if(totalBorrowersCount > 1){
                elements.push(<li className="negative-color theme-transition group-split-overview-cont">You owe <p className="split-overview-amount">&#8377;{totalBorrow}</p></li>);
                if(totalLendersCount <= 1){
                    let borrowDetails = [], count = 0;
                    for(let i=0; i<overview.length; i++){
                        let item = overview[i];
                        if(item.owesId === userId){
                            count++;
                            if(count < MAX_DETAILED_LIST_COUNT || count === totalBorrowersCount){
                                borrowDetails.push(<p>You owe {getMemeberNameById(members, item.memberId)} &#8377;{item.amount}</p>);
                            }
                            else{
                                borrowDetails.push(<p>You owe <b>{totalBorrowersCount - borrowDetails.length} Members</b> more</p>);
                                break;
                            }
                        }
                    }
                    elements.push(<li className="split-overview-details theme-transition">{borrowDetails}</li>);
                }
            }
            else{
                for(let i=0; i<overview.length; i++){
                    let item = overview[i];
                    if(item.owesId === userId){
                        elements.push(<li className="negative-color theme-transition group-split-overview-cont">You owe <span className="f_w_500">{getMemeberNameById(members, item.memberId)}</span> <b className="split-overview-amount">&#8377;{item.amount}</b></li>);
                        break;
                    }
                }
            }
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
            elements.push(<li className="total-split-overview-card theme-transition lend-card">You lend <p className="split-amount no_wrap"><span className="f_size_m">&#8377;</span>{totalLend}</p></li>);
        }
        if(totalBorrow > 0){
            elements.push(<li className="total-split-overview-card theme-transition owe-card">You owe <p className="split-amount no_wrap"><span className="f_size_m">&#8377;</span>{totalBorrow}</p></li>);
        }
        return elements;
    }

    return(
        <div className="home-page main-content-area">
            <ul className="total-split-overview no-list-style p_5">
                {getOverAllDetails(splitList)}
            </ul>
            <ul className="split-list theme-transition no-list-style p_5">
                {splitList.map(split => 
                    <li className="split-cont theme-transition" onClick={() => navToSplitPage(split.id)}>
                        <div className="split-pic theme-transition disp_flex">
                            <p>{split.name.charAt(0)}</p>
                        </div>
                        <div className="split-details theme-transition">
                            <div className="split-name">{split.name}</div>
                            <div className="split-overview">
                                {getSplitOverviewDetails(split.overviews, split.members)}
                            </div>
                        </div>
                    </li>)}
            </ul>
            <div className="home-btm-actions-cont">
                <StyledButton
                    title="Add Group"
                    buttonStyle={ButtonStyle.float}
                    iconClass="fa-solid fa-user-group"
                    onClick={() => navigate('/group/new')}/>
            </div>
        </div>
    )
}

export default Home;