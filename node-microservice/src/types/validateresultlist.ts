// eslint-disable-next-line no-unused-vars
import { ValidateResultBO } from './validateresult';

export class ValidateResultListBO {
    validateResultList: ValidateResultBO[];

    constructor() {
        this.validateResultList = [];
    }

    push(validateResult: ValidateResultBO) {
        this.validateResultList.push(validateResult);
    }

    concat(validateResultListBO: ValidateResultListBO) {
        this.validateResultList = this.validateResultList.concat(
            validateResultListBO.validateResultList
        );
    }

    isValid() {
        return this.getAllValidateFailResultList().length === 0;
    }

    getAllValidateFailResultList() {
        return this.validateResultList.filter((item: ValidateResultBO) => {
            return !item.isValid;
        });
    }

    getErrorMessagesAsList() {
        return this.getAllValidateFailResultList().map(
            (item: ValidateResultBO) => {
                return item.errorMsg;
            }
        );
    }

    getErrorMessagesAsSingleSentence() {
        return this.getErrorMessagesAsList().reduce(
            (previous: string, current: string) => {
                return previous + '; ' + current;
            },
            ''
        );
    }
}
