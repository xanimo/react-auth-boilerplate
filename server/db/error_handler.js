const getUniqueErrorMessage = (err) => {
    let output;
    try {
        const fieldName = err.errmsg.substring(err.errmsg.lastIndexOf('.$') + 2, err.errmsg.lastIndexOf('_1'));
        output = `${fieldName.charAt(0).toUpperCase()}${fieldName.slice(1)} already exists`;
    } catch (ex) {
        output = 'Unique field already exists';
    }
    return output;
};

exports.getErrorMessage = function (err) {
    let message = '';

    if (err.code) {
        switch (err.code) {
            case 11000:
            case 11001:
                message = getUniqueErrorMessage(err);
                break;
            default:
                message = getUniqueErrorMessage(err);
        }
    } else {
        Object.keys(err.errors).forEach((errName) => {
            if (errName.message) {
                message = errName.message;
            }
        });
    }
    return message;
};