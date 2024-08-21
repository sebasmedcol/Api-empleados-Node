import { model, Schema } from 'mongoose';

const EmployeeSchema = new Schema({
    numeroDocumento: {
        type: String,
        required: [true, 'El número de documento es requerido'],
        unique: true,
    },
    nombre: {
        type: String,
        required: [true, 'El nombre es requerido'],
    },
    fechaIngreso: {
        type: Date,
        required: [true, 'La fecha de ingreso es requerida'],
    },
    fechaRetiro: {
        type: Date,
    },
    salario: {
        type: Number,
        required: [true, 'El salario es requerido'],
    },
    diasLaborados: {
        type: Number,
    },
    cesantias: {
        type: Number,
    },
});

export default model('Employee', EmployeeSchema, 'employee');
