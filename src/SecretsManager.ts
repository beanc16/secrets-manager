import DopplerSDK from '@dopplerhq/node-sdk';
import { InvalidGetBulkSecretParametersError, InvalidGetSecretParametersError, SecretNotFoundError, SecretsNotFoundError } from './errors.js';
import type { SecretsManagerGetBulkOptions, SecretsManagerGetBulkParameters, SecretsManagerGetParameters } from './types/SecretsManager.js';
import type { SecretsManagerGetBulkParametersParsed, SecretsManagerGetParametersParsed } from './types/private/SecretsManager.js';
import type { DopplerSecretsManagerListResponse } from './types/private/doppler.js';

export class SecretsManager
{
    private static secretsManager: DopplerSDK;

    static {
        this.secretsManager = new DopplerSDK({
            accessToken: process.env.DOPPLER_ACCESS_TOKEN,
        });
    }

    public static async get(parameters: SecretsManagerGetParameters): Promise<string>
    {
        const parsedParameters = this.parseGetParameters(parameters);

        if (!this.getParametersAreValid(parsedParameters))
        {
            throw new InvalidGetSecretParametersError(parsedParameters);
        }

        const { value } = await this.secretsManager.secrets.get(
            parsedParameters.project,
            parsedParameters.config,
            parsedParameters.secretName
        );

        if (!value?.raw)
        {
            throw new SecretNotFoundError(parsedParameters);
        }

        return value.raw;
    }

    public static async getBulk<Output extends object = Record<string, string>>(
        parameters: SecretsManagerGetBulkParameters,
        options: SecretsManagerGetBulkOptions<Output> = {}
    ): Promise<Output>
    {
        const parsedParameters = this.parseGetBulkParameters(parameters);

        if (!this.getBulkParametersAreValid(parsedParameters))
        {
            throw new InvalidGetBulkSecretParametersError(parsedParameters);
        }

        const parsedOptions = this.parseGetBulkOptions(options);

        const { secrets = {} } = await this.secretsManager.secrets.list(
            parsedParameters.project,
            parsedParameters.config,
            parsedOptions
        ) as DopplerSecretsManagerListResponse;

        const secretsEntries = Object.entries(secrets);

        if (secretsEntries.length === 0)
        {
            throw new SecretsNotFoundError(parsedParameters);
        }

        const output = secretsEntries.reduce<Record<string, string>>((acc, [key, value]) => {
            if (value.raw)
            {
                acc[key] = value.raw;
            }

            return acc;
        }, {});

        return output as Output;
    }

    private static parseGetParameters(parameters: SecretsManagerGetParameters): SecretsManagerGetParametersParsed
    {
        const {
            project,
            config = process.env.STAGE as string,
            secretName,
        } = parameters;

        return {
            project,
            config,
            secretName,
        };
    }

    private static getParametersAreValid({
        project,
        config,
        secretName,
    }: SecretsManagerGetParametersParsed): boolean
    {
        if (project && config && secretName)
        {
            return true;
        }

        return false;
    }

    private static parseGetBulkParameters(parameters: SecretsManagerGetBulkParameters): SecretsManagerGetBulkParametersParsed
    {
        const {
            project,
            config = process.env.STAGE as string,
        } = parameters;

        return {
            project,
            config,
        };
    }

    private static getBulkParametersAreValid({
        project,
        config,
    }: SecretsManagerGetBulkParametersParsed): boolean
    {
        if (project && config)
        {
            return true;
        }

        return false;
    }
    
    private static parseGetBulkOptions<Output extends object>({
        secretsToInclude = [],
    }: SecretsManagerGetBulkOptions<Output>): {
        includeManagedSecrets: boolean;
        secrets?: string;
    }
    {
        const secretsCsv = secretsToInclude.join(',');

        return {
            includeManagedSecrets: false,
            ...(secretsCsv.length > 0 ? { secrets: secretsCsv } : {}),
        };
    }
}
