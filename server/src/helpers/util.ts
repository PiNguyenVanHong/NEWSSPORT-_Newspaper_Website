const bcrypt = require("bcrypt");
const SALT = 10;

export const hashPassword = async (password: string) => {
    try {
        return await bcrypt.hash(password, SALT);
    } catch (error) {
        console.log(error);
    }
};

export const comparePassword = async (password: string, hashPassword: string) => {
    try {
        return await bcrypt.compare(password, hashPassword);
    } catch (error) {
        console.log(error);
    }
}
