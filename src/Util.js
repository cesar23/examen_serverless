
const AWS = require('aws-sdk');
const axios = require("axios");

module.exports = class {


    static async getPersonaje(url) {
        try {
            const response = await axios.get(url);
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.error(error);
            throw new Error(error);
        }
    }


}

