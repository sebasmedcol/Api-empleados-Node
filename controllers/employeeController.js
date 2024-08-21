import Employee from "../models/employee.js";

export async function getEmployees(req, res) {
    try {
        const employees = await Employee.find();
        res.json(employees);
    } catch (error) {
        res.status(500).json({ error });
    }
}

export async function postEmployee(req, res) {
    const { numeroDocumento, nombre, fechaIngreso, salario } = req.body;
    try {
        // Calcular días laborados
        const fechaIngresoDate = new Date(fechaIngreso);
        const fechaActual = new Date();
        const diasLaborados = Math.ceil((fechaActual - fechaIngresoDate) / (1000 * 60 * 60 * 24));

        // Calcular cesantías
        const cesantias = (salario * diasLaborados) / 360;

        const newEmployee = new Employee({
            numeroDocumento,
            nombre,
            fechaIngreso,
            fechaRetiro: null, // se define cuando se retire
            salario,
            diasLaborados,
            cesantias
        });

        await newEmployee.save();
        res.status(201).json('Employee created successfully');
    } catch (error) {
        res.status(500).json(error);
    }
}

export async function putEmployee(req, res) {
    const { numeroDocumento, fechaRetiro } = req.body;
    try {
        const employee = await Employee.findOne({ numeroDocumento });
        if (!employee) {
            return res.status(404).json('Employee not found');
        }

        // Actualizar la fecha de retiro y recalcular días laborados y cesantías
        const fechaRetiroDate = new Date(fechaRetiro);
        const diasLaborados = Math.ceil((fechaRetiroDate - new Date(employee.fechaIngreso)) / (1000 * 60 * 60 * 24));
        const cesantias = (employee.salario * diasLaborados) / 360;

        employee.fechaRetiro = fechaRetiro;
        employee.diasLaborados = diasLaborados;
        employee.cesantias = cesantias;

        await employee.save();
        res.status(201).json('Employee updated successfully');
    } catch (error) {
        res.status(500).json(error);
    }
}

export async function deleteEmployee(req, res) {
    const _id = req.params.id;
    try {
        await Employee.findByIdAndDelete(_id);
        res.json('Employee deleted successfully');
    } catch (error) {
        res.status(404).json('Employee not found');
    }
}
