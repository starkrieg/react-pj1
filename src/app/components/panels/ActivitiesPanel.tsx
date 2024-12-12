'use client'

import { ActivitiesController } from "@/app/data/activities/ActivitiesController";
import { ButtonActivity } from "../Button";
import { Utilities } from "@/app/data/utils/Utilities";

export default function ActivitiesPanel() {

    const activitiesList = ActivitiesController.getActivitiesList();
    const doSelectClick = ActivitiesController.doSelectActivity;

    const preparedList = activitiesList.map(act => {
        const activityRank = ActivitiesController.getActivityRankObj(act.id);
        
        const rankDesc = 'Rank ' 
            + activityRank.rank;

        const gainDesc = Utilities.roundTo2Decimal(act.getTickGain()) 
            + ' per day';


        return ButtonActivity(
            act.id,
            act.title,
            act.desc,
            rankDesc,
            gainDesc,
            activityRank.totalExpToNextRank,
            activityRank.exp,
            doSelectClick.bind(ActivitiesController, act.id),
            (act.id == ActivitiesController.selectedActivity)
            );
        });

    return <div className="activities">
                <div className="activities-list">
                    {preparedList}
                </div>
            </div>;
    
}

