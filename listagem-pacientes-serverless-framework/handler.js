'use strict';
const pacientes = [
  { id: 1, nome: "Maria", dataNascimento: '1984-01-11' },
  { id: 2, nome: "Joao", dataNascimento: '1983-09-16' },
  { id: 3, nome: "Jose", dataNascimento: '1959-07-15' }
];

const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');
const dynamoDb = new AWS.DynamoDB.DocumentClient()
const params = {
  TableName: 'PACIENTES'
}

module.exports.listarPacientes = async event => {
  try {
    let data = await dynamoDb.scan(params).promise();

    return {
      statusCode: 200,
      body: JSON.stringify(data.Items),
    };
  } catch (err) {
    console.log("Error", err);

    return {
      statusCode: err.statusCode ? err.statusCode : 500,
      body: JSON.stringify({
        error: err.name ? err.name : "Exception",
        message: err.message ? err.message : "Unknown error"
      })
    };
  }
};

module.exports.obterPaciente = async event => {

  try {
    const { pacienteId } = event.pathParameters

    const data = await dynamoDb
      .get({
        ...params,
        Key: {
          paciente_id: pacienteId
        }
      })
      .promise();

    if (!data.Item) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: 'Paciente não existe' }, null, 2)
      }
    }

    const paciente = data.Item
    return {
      statusCode: 200,
      body: JSON.stringify(paciente, null, 2)
    }
  } catch (err) {
    console.log("Error", err);
    return {
      statusCode: err.statusCode ? err.statusCode : 500,
      body: JSON.stringify({
        error: err.name ? err.name : 'Exception',
        message: err.message ? err.message : 'Unknown error'
      })
    }
  }
};

module.exports.cadastrarPaciente = async event => {

  const timestamp = new Date().getTime()
  let dados = JSON.parse(event.body);

  const { nome, data_nascimento, email, telefone } = dados;

  const paciente = {
    paciente_id: uuidv4(),
    nome,
    data_nascimento,
    email,
    telefone,
    status: true,
    criado_em: timestamp,
    atualizado_em: timestamp
  };

  await dynamoDb
    .put({
      TableName: "PACIENTES",
      Item: paciente,
    })
    .promise();

  return {
    statusCode: 201,
  };
};
