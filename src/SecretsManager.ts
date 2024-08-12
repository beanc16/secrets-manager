import DopplerSDK from '@dopplerhq/node-sdk';
import { InvalidGetSecretParametersError, SecretNotFoundError } from './errors.js';
import type { SecretsManagerGetParameters } from './types/SecretsManager.js';
import type { SecretsManagerGetParametersParsed } from './types/private/SecretsManager.js';

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
}
