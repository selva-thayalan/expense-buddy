import '../styles/components/ActivityCard.scss';
import { Activity } from "../models/Activity";

interface ActivityCardProps{
    model: Activity
}

const ActivityCard = ({model}: ActivityCardProps) => {
    return(
        <div className="activity-card-cont">
            <div className="activity-card-lhs t_align_c f_weight_b">
                <div className="activity-date f_size_lr">{model.time.getDate()}</div>
                <div className="activity-month f_size_s">{model.time.toLocaleString('en-us',{month:'short'})}</div>
            </div>
            <div className="activity-card-cntr">
                <div className="activity-title">{model.title}</div>
            </div>
            <div className="activity-card-rhs"></div>
        </div>
    )
}

export default ActivityCard;