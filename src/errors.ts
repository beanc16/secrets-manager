import { SecretsManager } from './SecretsManager.js';
import type { SecretsManagerGetBulkParametersParsed, SecretsManagerGetParametersParsed } from './types/private/SecretsManager.js';
import type { SecretsManagerGetBulkParameters, SecretsManagerGetParameters } from './types/SecretsManager.js';

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

export class InvalidGetBulkSecretParametersError extends Error {
    parameters: SecretsManagerGetBulkParameters;

    constructor(parameters: SecretsManagerGetBulkParameters)
    {
        const messageSentences = [
            `Invalid parameters in ${SecretsManager.name}.${SecretsManager.getBulk.name}.`,
            `Ensure that all parameters are given.`,
            `If config isn't passed in, ensure the STAGE environment variable is set.`,
        ];

        super(messageSentences.join(' '));
        this.parameters = parameters;
    }
}

export class SecretNotFoundError extends Error {
    parameters: SecretsManagerGetParametersParsed;

    constructor(parameters: SecretsManagerGetParametersParsed)
    {
        super('Failed to get secret');
        this.parameters = parameters;
    }
}

export class SecretsNotFoundError extends Error {
    parameters: SecretsManagerGetBulkParametersParsed;

    constructor(parameters: SecretsManagerGetBulkParametersParsed)
    {
        super('Failed to get secrets');
        this.parameters = parameters;
    }
}
