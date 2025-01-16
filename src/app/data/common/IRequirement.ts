
export type RequirementExportFormat = {
    type: string;
    data: Record<string, any>;
}

export interface IRequirement {

    isRequirementMet() : boolean;

    toExportFormat() : RequirementExportFormat;

}