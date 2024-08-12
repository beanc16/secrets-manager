import { SecretsManager } from './SecretsManager.js';
import { SecretsManagerGetParameters } from './types/SecretsManager.js';

export class InvalidGetSecretParametersError extends Error {
    parameters: SecretsManagerGetParameters;

    constructor(parameters: SecretsManagerGetParameters)
    {
        const messageSentences = [
            `Invalid parameters in ${SecretsManager.name}.${SecretsManager.get.name}.`,
            `Ensure that all parameters are given.`,
            `If config isn't passed in, ensure the STAGE environment variable is set.`,
        ];

        super(messageSentences.join(' '));
        this.parameters = parameters;
    }
}

export class SecretNotFoundError extends Error {
    parameters: SecretsManagerGetParameters;

    constructor(parameters: SecretsManagerGetParameters)
    {
        super('Failed to get secret');
        this.parameters = parameters;
    }
}
