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
};

module.exports.obterPaciente = async event => {
  const { pacienteId } = event.pathParameters;
  const paciente = pacientes.find((paciente) => paciente.id == pacienteId);

  if (paciente === undefined)
    return {
      statusCode: 404,
      body: JSON.stringify({ error: 'Paciente não existe' }, null, 2)
    };

  return {
    statusCode: 200,
    body: JSON.stringify(paciente, null, 2),
  };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};
