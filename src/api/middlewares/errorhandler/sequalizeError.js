const { SequalizeError }  = require('./baseError');

const defaultMessage = 'Failed to locate a document in Mongo DB.';

class DocumentNotFound extends SequalizeError {
    code;
    constructor(message = defaultMessage, options = {}) {
        super(message);
        this['code'] = 404;
        this['id'] = 'ErrorDocumentNotFound';
        this['description'] = message;

        // You can attach relevant information to the error instance
        // (e.g.. the username)

        Object.entries(options).forEach(([key, value]) => {
            this[key] = value;
        });
    }

    get statusCode() {
        return this.code;
    }
}

class DocumentReadFailure extends SequalizeError {
    code;
    constructor(message, options = {}) {
        super(message);
        this['code'] = 404;
        this['id'] = 'ErrorDocumentReadFailure';
        this['description'] = 'Failed to read a document in Mongo DB.';

        // You can attach relevant information to the error instance
        // (e.g.. the username)
        Object.entries(options).forEach(([key, value]) => {
            this[key] = value;
        });
    }

    get statusCode() {
        return this.code;
    }
}

class DocumentWriteFailure extends SequalizeError {
    code;
    constructor(message, options = {}) {
        super(message);
        this['code'] = 400;
        this['id'] = 'ErrorDocumentWriteFailure';
        this['description'] = 'Failed to create or update a document in Mongo DB.';

        // You can attach relevant information to the error instance
        // (e.g.. the username)

        Object.entries(options).forEach(([key, value]) => {
            this[key] = value;
        });
    }

    get statusCode() {
        return this.code;
    }
}

class DocumentDeleteFailure extends SequalizeError {
    code;
    constructor(message, options = {}) {
        super(message);
        this['code'] = 400;
        this['id'] = 'ErrorDocumentDeleteFailure';
        this['description'] = 'Failed to delete a document in Mongo DB.';

        // You can attach relevant information to the error instance
        // (e.g.. the username)

        Object.entries(options).forEach(([key, value]) => {
            this[key] = value;
        });
    }

    get statusCode() {
        return this.code;
    }
}

class DocumentInvalid extends SequalizeError {
    code;
    constructor(message, options = {}) {
        super(message);
        this['code'] = 400;
        this['id'] = 'ErrorDocumentInvalid';
        this['description'] = 'Document from Mongo DB has an invalid format.';

        // You can attach relevant information to the error instance
        // (e.g.. the username)

        Object.entries(options).forEach(([key, value]) => {
            this[key] = value;
        });
    }

    get statusCode() {
        return this.code;
    }
}

class DuplicateResourceId extends SequalizeError {
    code;
    constructor(message, options = {}) {
        super(message);
        this['code'] = 409;
        this['id'] = 'ErrorDuplicateResourceId';
        this['description'] =
            'User assigned a unique ID to a resource which duplicates an existing ID.';

        // You can attach relevant information to the error instance
        // (e.g.. the username)
        Object.entries(options).forEach(([key, value]) => {
            this[key] = value;
        });
    }

    get statusCode() {
        return this.code;
    }
}

class FileNotFound extends SequalizeError {
    code;
    constructor(message, options = {}) {
        super(message);
        this['code'] = 400;
        this['id'] = 'ErrorFileNotFound';
        this['description'] = 'Failed to locate a file on the S3 bucket.';

        // You can attach relevant information to the error instance
        // (e.g.. the username)

        Object.entries(options).forEach(([key, value]) => {
            this[key] = value;
        });
    }

    get statusCode() {
        return this.code;
    }
}

class InvalidIdField extends SequalizeError {
    code;
    constructor(message, options = {}) {
        super(message);
        this['code'] = 400;
        this['id'] = 'ErrorInvalidIdField';
        this['description'] =
            'User assigned a unique ID to a resource which is invalid.';

        // You can attach relevant information to the error instance
        // (e.g.. the username)

        Object.entries(options).forEach(([key, value]) => {
            this[key] = value;
        });
    }

    get statusCode() {
        return this.code;
    }
}
module.exports = {
    DocumentNotFound,
    DocumentReadFailure,
    DocumentWriteFailure,
    DocumentDeleteFailure,
    DocumentInvalid,
    DuplicateResourceId,
    FileNotFound,
    InvalidIdField,
};
