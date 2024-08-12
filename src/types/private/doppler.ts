export type DopplerSecretsManagerListObject = {
    raw?: string;
    computed?: string;
    note?: string;
    rawVisibility?: string;
    computedVisibility?: string;
    rawValueType?: {
        type_: string;
    };
    computedValueType?: {
        type_: string;
    };
};

export interface DopplerSecretsManagerListResponse {
    secrets: Record<string, DopplerSecretsManagerListObject>;
}
