export interface SecretsManagerGetParameters
{
    project: string;
    config?: string;
    secretName: string;
}

export interface SecretsManagerGetBulkParameters
{
    project: string;
    config?: string;
}

export interface SecretsManagerGetBulkOptions<Output extends object>
{
    secretsToInclude?: (keyof Output)[];
}
