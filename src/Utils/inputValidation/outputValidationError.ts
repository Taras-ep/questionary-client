class OutputValidationError {
    private fieldName: string
    private errorMessage: string

    constructor(fieldName: string, errorMessage: string) {
        this.fieldName = fieldName
        this.errorMessage = errorMessage
    }

    public showValidationErrorName() {
        if (this.fieldName === 'name') {
            return this.errorMessage
        } else {
            return ''
        }
    }

    public showValidationErrorEmail() {
        if (this.fieldName === 'email') {
            return this.errorMessage
        } else {
            return ''
        }
    }

    public showValidationErrorPhoneNumber() {
        if (this.fieldName === 'phoneNumber') {
            return this.errorMessage
        } else {
            return ''
        }
    }

    public showValidationErrorPassword() {
        if (this.fieldName === 'password') {
            return this.errorMessage
        } else {
            return ''
        }
    }
}

export default OutputValidationError