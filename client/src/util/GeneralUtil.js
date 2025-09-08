// src/util/GeneralUtils.js

const validatePassword = (password) => {
    // Minimum eight characters, at least one uppercase letter, one lowercase letter, one number, and one special character
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
};

const GeneralUtils = {
    validatePassword
};

export default GeneralUtils;
