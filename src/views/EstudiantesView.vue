<template>
    <div class="table-container">
        <h2>Lista de Estudiantes</h2>
        <button @click="irAAgregar" class="add-button">Agregar Estudiante</button>
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Nivel Condición Física</th>
                    <th>Preferencia</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="estudiante in estudiantes" :key="estudiante.id">
                    <td>{{ estudiante.id }}</td>
                    <td>{{ estudiante.nombre }}</td>
                    <td>{{ estudiante.nivelCondicionFisica }}</td>
                    <td>{{ estudiante.preferenciasDeporte }}</td>
                    <td>
                        <button @click="irAEditar(estudiante.id)" class="action-button edit">Editar</button>
                        <button @click="deleteEstudiante(estudiante.id)" class="action-button delete">Borrar</button>
                    </td>
                </tr>
            </tbody>
        </table>
        <p v-if="estudiantes.length === 0">No se encontraron estudiantes.</p>
    </div>
</template>

<script>
import apiClient from '../axios';

export default {
    data() {
        return {
            estudiantes: []
        };
    },
    created() {
        this.fetchEstudiantes();
    },
    methods: {
        async fetchEstudiantes() {
            try {
                const response = await apiClient.get('/Estudiante');
                this.estudiantes = response.data;
            } catch (error) {
                console.error("Error al obtener estudiantes:", error);
            }
        },
        irAAgregar() {
            this.$router.push({ name: 'AgregarEstudiante' });
        },
        irAEditar(id) {
            this.$router.push({ name: 'EditarEstudiante', params: { id } });
        },
        async deleteEstudiante(id) {
            try {
                await apiClient.delete(`/Estudiante/${id}`);
                this.estudiantes = this.estudiantes.filter(est => est.id !== id);
            } catch (error) {
                console.error("Error al eliminar estudiante:", error);
            }
        }
    }
};
</script>

<style>
.table-container {
    max-width: 1000px;
    margin: 0 auto;
    padding: 20px;
}
.table-container h2 {
    text-align: center;
    color: #2c3e50;
    margin-bottom: 20px;
}
.add-button {
    margin-bottom: 20px;
    padding: 10px;
    background-color: #27ae60;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-weight: bold;
}
.add-button:hover {
    background-color: #2ecc71;
}
table {
    width: 100%;
    border-collapse: collapse;
}
th, td {
    padding: 10px;
    text-align: center;
    border: 1px solid #ddd;
}
th {
    background-color: #3498db;
    color: white;
}
.action-button {
    padding: 5px 10px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-weight: bold;
}
.action-button.edit {
    background-color: #3498db;
    color: white;
}
.action-button.edit:hover {
    background-color: #2980b9;
}
.action-button.delete {
    background-color: #e74c3c;
    color: white;
}
.action-button.delete:hover {
    background-color: #c0392b;
}
</style>
