'use strict';
const pacientes = [
  { id: 1, nome: "Maria", dataNascimento: '1984-01-11' },
  { id: 2, nome: "Joao", dataNascimento: '1983-09-16' },
  { id: 3, nome: "Jose", dataNascimento: '1959-07-15' }
];

module.exports.listarPacientes = async event => {
  console.log(event);
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        pacientes
      },
      null,
      2
    ),
  };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};
