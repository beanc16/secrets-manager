import type { NonOptional } from '@beanc16/utility-types';
import { SecretsManagerGetParameters } from '../SecretsManager.js';

export type SecretsManagerGetParametersParsed = NonOptional<
    SecretsManagerGetParameters,
    'config'
>;
