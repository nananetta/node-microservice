import { log } from '../utils/error.utils';
import { VALIDATION } from '../../config/validation';
import { ValidateResultBO } from '../../types/validateresult';
import { ValidateResultListBO } from '../../types/validateresultlist';

/**
 *
 * @param input
 * @param key
 * @param validation
 */
const checkTypeObject = function(input: any, key: string) {
    const result =
        typeof input === 'object'
            ? ValidateResultBO.success()
            : ValidateResultBO.fail(key + ' not a type of Map');
    log(
        'verbose',
        `checkTypeObject: ${key}:${JSON.stringify(input)} :: ${result.isValid}`
    );
    return result;
};

const checkMandatory = function(input: any, key: string) {
    const result =
        input !== undefined && input !== null
            ? ValidateResultBO.success()
            : ValidateResultBO.fail(key + ' is mandatory');
    log(
        'verbose',
        `checkMandatory: ${key}:${JSON.stringify(input)} :: ${result.isValid}`
    );
    return result;
};

const checkTypeString = function(input: any, key: string) {
    const result =
        typeof input === 'string'
            ? ValidateResultBO.success()
            : ValidateResultBO.fail(key + ' not a type of String');
    log(
        'verbose',
        `checkTypeString: ${key}:${JSON.stringify(input)} :: ${result.isValid}`
    );
    return result;
};

const checkTypeList = function(input: any, key: string) {
    const result = Array.isArray(input)
        ? ValidateResultBO.success()
        : ValidateResultBO.fail(key + ' not a type of List');
    log(
        'verbose',
        `checkTypeList: ${key}:${JSON.stringify(input)} :: ${result.isValid}`
    );
    return result;
};

const checkTypeNumber = function(input: any, key: string) {
    const result =
        typeof input === 'number'
            ? ValidateResultBO.success()
            : ValidateResultBO.fail(key + ' not a type of Number');
    log(
        'verbose',
        `checkTypeNumber: ${key}:${JSON.stringify(input)} :: ${result.isValid}`
    );
    return result;
};

const checkTypeDate = function(input: any, key: string) {
    let isDate = false;
    if (input instanceof Date) {
        isDate = true;
    } else if (typeof input === 'string') {
        try {
            let parsedDate = Date.parse(input);
            isDate = !isNaN(parsedDate);
        } catch (_) {}
    }

    const result = isDate
        ? ValidateResultBO.success()
        : ValidateResultBO.fail(key + ' not a type of Date');
    log(
        'verbose',
        `checkTypeDate: ${key}:${JSON.stringify(input)} :: ${result.isValid}`
    );
    return result;
};

const checkCustomValidation = function(
    input: any,
    key: string,
    customValidation: any
) {
    try {
        // eval code from custom validation configuration
        // eslint-disable-next-line no-eval
        let value = eval(customValidation.validation);
        if (value !== undefined && value !== null && value) {
            return ValidateResultBO.success();
        }
    } catch (e) {
        log('error', `input: ${input}, key: ${key}`);
        log(
            'error',
            `Error evaluating script: ${customValidation.validation}; Error: ${e}`
        );
    }

    return ValidateResultBO.fail(key + ' ' + customValidation.error);
};

/**
 * validate service
 * @param input Input Object
 * @param key Key for input object
 * @param validation Validation configuration object
 */
const validateService = function(input: any, key: string, validation: any) {
    log('verbose', `validateService:: ${key}`);
    const resultListBO = new ValidateResultListBO();
    let inputMap = null;
    let inputList = null;

    // validate mandatory
    if (validation.mandatory !== undefined && validation.mandatory) {
        resultListBO.push(checkMandatory(input, key));
    }

    if (input !== null && input !== undefined) {
        // validate type
        switch (validation.type) {
            case 'OBJECT':
                resultListBO.push(checkTypeObject(input, key));
                try {
                    inputMap = input;
                } catch (e) {
                    log('verbose', `Cant implicitely convert ${key} to Map`);
                }
                break;
            case 'LIST':
                resultListBO.push(checkTypeList(input, key));
                try {
                    inputList = input;
                } catch (e) {
                    log('verbose', `Cant implicitely convert ${key} to List`);
                }
                break;
            case 'STRING':
                resultListBO.push(checkTypeString(input, key));
                break;
            case 'NUMBER':
                resultListBO.push(checkTypeNumber(input, key));
                break;
            case 'DATE':
                resultListBO.push(checkTypeDate(input, key));
                break;
            default:
                break;
        }

        log('verbose', `validateService:: validate parameters`);
        // validate parameters
        if (
            validation.parameters !== undefined &&
            Object.keys(validation.parameters).length !== 0
        ) {
            Object.keys(validation.parameters).forEach(parameter => {
                log('verbose', `validateService:: parameter ${parameter}`);

                if (validation.type === 'OBJECT' && inputMap !== null) {
                    let childObject = inputMap[parameter];
                    resultListBO.concat(
                        validateService(
                            childObject,
                            key + '.' + parameter,
                            validation.parameters[parameter]
                        )
                    );
                }

                if (validation.type === 'LIST' && inputList !== null) {
                    let i = 0;
                    inputList.forEach(element => {
                        resultListBO.concat(
                            validateService(
                                element,
                                key + '[' + i + '].' + element,
                                element
                            )
                        );
                        i++;
                    });
                }
            });
        }

        // custom validation
        if (
            validation.customValidation !== undefined &&
            validation.customValidation !== null
        ) {
            resultListBO.push(
                checkCustomValidation(input, key, validation.customValidation)
            );
        }
    }

    log(
        'verbose',
        `validateService:: return isValid? ${resultListBO.isValid()}; errors: ${resultListBO.getErrorMessagesAsSingleSentence()}`
    );
    return resultListBO;
};

/**
 * validate - validation middleware
 * @param req Request
 * @param res Response
 */
export const validate = function(req, res, next) {
    log('info', {
        message: 'validate',
        path: req.path
    });

    const parts = req.path.split('/');
    const remainingDetails = req.path.replace(`/${parts[1]}/${parts[2]}/`, '');
    log('verbose', `parts: ${parts[2]}-${parts[3]} --> ${remainingDetails}`);

    let validation = null;
    if (
        VALIDATION !== undefined &&
        VALIDATION[parts[2]] !== undefined &&
        VALIDATION[parts[2]][parts[3]] !== undefined
    ) {
        validation = VALIDATION[parts[2]][parts[3]];
        log('verbose', `validation: ${JSON.stringify(validation)}`);
    }

    let shouldAllow = true;
    let validateResultListBO = new ValidateResultListBO();
    if (validation !== undefined && validation !== null) {
        shouldAllow = false;
        validateResultListBO = validateService(req.body, 'input', validation);

        log(
            'verbose',
            `validateResultListBO: ${JSON.stringify(validateResultListBO)}`
        );

        if (validateResultListBO.isValid()) {
            shouldAllow = true;
        }
    }

    if (shouldAllow) {
        next();
    } else {
        return res.status(401).send({
            message: validateResultListBO.getErrorMessagesAsSingleSentence()
        });
    }
};
