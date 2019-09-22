export class ValidateResultBO {
    errorMsg: string;

    isValid: boolean;

    constructor(isValid: boolean, errorMsg: string) {
        this.errorMsg = errorMsg;
        this.isValid = isValid;
    }

    static success(): ValidateResultBO {
        let instance = new ValidateResultBO(true, null);
        return instance;
    }

    static fail(message: string): ValidateResultBO {
        let instance = new ValidateResultBO(false, message);
        return instance;
    }
}
