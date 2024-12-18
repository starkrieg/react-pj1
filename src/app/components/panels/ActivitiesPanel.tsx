'use client'

import { ActivitiesController } from "@/app/data/activities/ActivitiesController";
import { ButtonActivity } from "../Button";

export default function ActivitiesPanel() {

    const activitiesList = ActivitiesController.getActivitiesList();
    const doSelectClick = ActivitiesController.doSelectActivity;

    const preparedList = Array.from(activitiesList).map(act => {
        const activityRank = ActivitiesController.getActivityRankObj(act.id);
        
        const isSelected = (act.id == ActivitiesController.selectedActivity);

        return ButtonActivity(
            act,
            activityRank,
            doSelectClick.bind(ActivitiesController, act.id),
            isSelected
        );
    });

    return <div className="activities">
                <div className="activities-list">
                    {preparedList}
                </div>
            </div>;
    
}

