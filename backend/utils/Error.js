const error_list = require('../dictnary/error.json')
const Error = async (code) => {
    return error_list[code] || "Unknown error";
};

module.exports = Error;