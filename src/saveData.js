'use strict';


const uuid = require('uuid');
const AWS = require('aws-sdk');

AWS.config.setPromisesDependency(require('bluebird'));

const dynamoDb = new AWS.DynamoDB.DocumentClient();
const queryString= require('querystring')
const util = require('./Util');


module.exports.saveInformacion = async (event) => {

    const {id} =queryString.parse(event['body']);

    // const personaje = await util.getPersonaje(process.env.SWAPI_API + '/'+id);
    const personaje = await util.getPersonaje(process.env.SWAPI_API + '/'+id);
    const item ={
        id: uuid.v1(),
        nombre:personaje.name,
        alto:personaje.height,
        especies:personaje.species,
        color_ojos:personaje.eye_color
    }


    const personajeInfo = {
        TableName: process.env.PERSONAJES_TABLE,
        Item: item,
    };




   return  dynamoDb.put(personajeInfo).promise()
        .then(function(data) {
            return {
                statusCode: 200,
                body: JSON.stringify(
                    {
                        message: 'Ok',
                         data: item,
                        res:data
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