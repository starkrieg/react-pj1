'use client'

import { ActivitiesController } from "@/app/data/activities/ActivitiesController";
import { ButtonActivity } from "../Button";

export default function ActivitiesPanel() {

    const unlockedActivities = ActivitiesController.getActivitiesList();

    const doSelectClick = ActivitiesController.doSelectActivity;

    const preparedList = unlockedActivities.map(act => {
            const activityRank = ActivitiesController.getActivityRankObj(act.id);
            
            const isSelected = (act.id == ActivitiesController.selectedActivity?.id);

            return ButtonActivity(
                act,
                activityRank,
                doSelectClick.bind(ActivitiesController, act),
                isSelected
            );
        }
    );

    return <div className="activities">
                <div className="activities-list">
                    {preparedList}
                </div>
            </div>;
    
}

