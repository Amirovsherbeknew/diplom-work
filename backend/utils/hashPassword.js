const bcrypt = require('bcryptjs');

const hashPassword = async (password,saltRoundsCount = 10) => {
    const saltRounds = saltRoundsCount;
    return await bcrypt.hash(password, saltRounds);
};

module.exports = hashPassword;
