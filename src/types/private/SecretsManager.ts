import type { NonOptional } from '@beanc16/utility-types';
import type { SecretsManagerGetBulkParameters, SecretsManagerGetParameters } from '../SecretsManager.js';

export type SecretsManagerGetParametersParsed = NonOptional<
    SecretsManagerGetParameters,
    'config'
>;

export type SecretsManagerGetBulkParametersParsed = NonOptional<
    SecretsManagerGetBulkParameters,
    'config'
>;
