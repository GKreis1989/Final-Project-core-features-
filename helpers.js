
function validateStringInput(parameterName, stringInput) {
    if (!stringInput) throw `${parameterName} is not provided.`;
    if (typeof stringInput !== "string") throw `${parameterName} must be a string.`;
}

function validateDateInput(parameterName, dateInput) {
    if (!dateInput) throw `${parameterName} is not provided.`;
    if (Object.prototype.toString.call(dateInput) !== '[object Date]') throw `${parameterName} must be a valid date.`;
}

function validateEmail(email) {
    if (!email) throw "Email is not provided.";
    if (typeof email !== "string") throw "Email must be a string.";

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(email)) throw "Email is not in proper format.";
}

function validateNumberInput(parameterName, numberInput) {
    if (numberInput === undefined || numberInput === null) throw `${parameterName} is not provided.`;
    if (typeof numberInput !== "number") throw `${parameterName} must be a number.`;
}

function validateObjectInput(parameterName, objectInput) {
    if (objectInput === undefined || objectInput === null) throw `${parameterName} is not provided.`;
    if (typeof objectInput !== "object" || Array.isArray(objectInput)) throw `${parameterName} must be an object.`;
}

function validateArrayInput(parameterName, arrayInput) {
    if (arrayInput === undefined || arrayInput === null) throw `${parameterName} is not provided.`;
    if (!Array.isArray(arrayInput)) throw `${parameterName} must be an array.`;
}
function validateBoolean(name, value) {
    if (typeof value !== "boolean") {
        throw `${name} must be a boolean value.`;
    }
}

module.exports = {
    validateStringInput,
    validateDateInput,
    validateEmail,
    validateNumberInput,
    validateObjectInput,
    validateArrayInput,
    validateBoolean
};
