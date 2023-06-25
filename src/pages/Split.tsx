import '../styles/Split.scss'
import { useSelector, TypedUseSelectorHook } from 'react-redux';
import { Split as SplitModel } from "../models/Split";
import { Outlet, useParams } from 'react-router-dom';
import { RootState } from '../store/store';

const Split = () =>{
    const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
    var { splitId } = useParams();
    var split: SplitModel|undefined = useTypedSelector(state => state.splits.find(sp => sp.id === splitId));
    return(
        <>
            {split && <div className="split-page main-content-area">
                <div className="split-header">
                    <div className="header-split-pic-cont">
                        <p>{split.name.charAt(0)}</p>
                    </div>
                    <div className="header-split-details-cont">
                        <div className="header-split-name">{split.name}</div>
                    </div>
                </div>
                <Outlet />
            </div>}
        </>
    )
}

export default Split;