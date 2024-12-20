'use client'

import { ActivitiesController } from "@/app/data/activities/ActivitiesController";
import { ButtonActivity } from "../Button";
import { Activity } from "@/app/data/activities/Activity";

export default function ActivitiesPanel() {

    const unlockedActivities = ActivitiesController.getActivitiesList();

    const isHasActs = unlockedActivities.length > 0;
    
    return <div className="activities">
                { isHasActs && ActivityList(unlockedActivities) }
                { !isHasActs && TextNoActivitiesAvailable() }
            </div>;
 
}

function ActivityList(activityList: Readonly<Activity[]>) {
    const doSelectClick = ActivitiesController.doSelectActivity;

    const preparedList = activityList.map(act => {
        const activityRank = ActivitiesController.getActivityRankObj(act.id);
        
        const isSelected = (act.id == ActivitiesController.selectedActivity?.id);

        return ButtonActivity(
            act,
            activityRank,
            doSelectClick.bind(ActivitiesController, act),
            isSelected
        );
    });

    return (
        <div className="activities-list">
            {preparedList}
        </div>
    );
}

function TextNoActivitiesAvailable() {
    return (
        <div style={{ 
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: 15,
            marginTop: 100
        }}>
            No activities available
        </div>
    );
}
