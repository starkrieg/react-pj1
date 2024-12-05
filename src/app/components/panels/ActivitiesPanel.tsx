'use client'

import { ActivitiesController } from "@/app/data/activities/ActivitiesController";
import { ButtonActivity } from "../Button";

export default function ActivitiesPanel() {

    const activitiesList = ActivitiesController.getActivitiesList();
    const doSelectClick = ActivitiesController.doSelectActivity;

    function roundTo2Decimal(value: number) {
        return Math.round(value * 100) / 100;
    }

    const preparedList = activitiesList.map(act => {
        const activityRank = ActivitiesController.getActivityRankObj(act.id);
        
        const rankGainText = 'Rank ' 
            + activityRank.rank
            + ' / ' 
            + roundTo2Decimal(act.getTickGain()) 
            + ' per day';

        return ButtonActivity(
            act.id,
            act.title,
            act.desc,
            rankGainText,
            activityRank.totalExpToNextRank,
            activityRank.exp,
            doSelectClick.bind(ActivitiesController, act.id)
            );
        });

    return <div className="activities">
                <div className="activities-list">
                    {preparedList}
                </div>
            </div>;
    
}

