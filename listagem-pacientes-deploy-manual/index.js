const moment = require('moment')

const pacientes = [
    { id: 1, nome: "Maria", dataNascimento: '1984-01-11' },
    { id: 2, nome: "Joao", dataNascimento: '1983-09-16' },
    { id: 3, nome: "Jose", dataNascimento: '1959-07-15' }
];

function buscarPaciente(campo, valor) {
    return pacientes.find(paciente => paciente[campo] == valor);
}

function calcularIdade(paciente) {
    const hoje = moment()
    const dataNascimento = moment(paciente.dataNascimento, 'YYYY-MM-DD')

    return hoje.diff(dataNascimento, 'years')
}

exports.handler = async (event) => {
    console.log("DEPLOY CLI")
    console.log("Paciente informado: " + event.pacienteId);

    let pacienteEncontrado = pacientes

    if (event.pacienteId) {
        pacienteEncontrado = buscarPaciente('id', event.pacienteId)
        pacienteEncontrado.idade = calcularIdade(pacienteEncontrado)

        return {
            statusCode: 200,
            body: JSON.stringify(pacienteEncontrado)
        }
    }

    const todosPacientes = pacientes.map(p => ({ ...p, idade: calcularIdade(p) }))
    return {
        statusCode: 200,
        body: JSON.stringify(todosPacientes)
    };
};