'use strict';


const uuid = require('uuid');
const AWS = require('aws-sdk');

AWS.config.setPromisesDependency(require('bluebird'));

const dynamoDb = new AWS.DynamoDB.DocumentClient();
const queryString= require('querystring')
const util = require('./Util');


module.exports.getInformacion = async (event) => {





    return  dynamoDb.scan({TableName: process.env.PERSONAJES_TABLE}).promise()
        .then(function(data) {
            console.log('data:',data.Items)
            return {
                statusCode: 200,
                body: JSON.stringify(
                    {
                        message: 'Ok',

                        data:data
                    }
                ),
            };
        })
        .catch(function(err) {
            return {
                statusCode: 500,
                body: JSON.stringify(
                    {
                        message: 'Ocurrio un Error',
                        msg: err,
                    }
                ),
            };
        });



    /*
        var personajeInfo = {
            TableName: process.env.PERSONAJES_TABLE,

            ExpressionAttributeValues: {
                ':alto': {'S': '165'}
            },
        };
    */




/*


    return  dynamoDb.query(personajeInfo).promise()
        .then(function(data) {
            return {
                statusCode: 200,
                body: JSON.stringify(
                    {
                        message: 'Ok',

                        res:JSON.stringify(data, null, 2)
                    }
                ),
            };
        })
        .catch(function(err) {
            return {
                statusCode: 500,
                body: JSON.stringify(
                    {
                        message: 'Ocurrio un Error',
                        msg: err,
                    }
                ),
            };
        });

*/












    /*

        return dynamoDb.put(personajeInfo).promise()
            .then(res => {

                return {
                    statusCode: 200,
                    body: JSON.stringify(
                        {
                            message: 'Ok',
                            input: event,
                        }
                    ),
                };

            }).catch(err=>{
                return {
                    statusCode: 500,
                    body: JSON.stringify(
                        {
                            message: 'Ocurrio un Error',
                            input: event,
                        }
                    ),
                };
            });
    */


};
//   return {
//     statusCode: 200,
//     body: JSON.stringify(
//       {
//         message: 'yes:!'+JSON.stringify(personaje),
//         input: event,
//       }
//     ),
//   };
//
// };


// async function getPersonaje(url) {
//     try{
//         const response= await axios.get(url);
//         console.log(response)
//         return response.data;
//     }catch (e) {
//         console.log(e)
//         throw new Error(e)
//     }
//     return response;
//
// }