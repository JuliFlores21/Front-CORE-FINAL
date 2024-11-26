<template>
    <div class="cupos-container">
        <h2>Gestión de Cupos de Actividades</h2>
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nombre de la Actividad</th>
                    <th>Requerimientos Físicos</th>
                    <th>Horario</th>
                    <th>Disponibilidad</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="actividad in actividades" :key="actividad.idActividad">
                    <td>{{ actividad.idActividad }}</td>
                    <td>{{ actividad.nombreActividad }}</td>
                    <td>{{ actividad.requerimientosFisicos || 'N/A' }}</td>
                    <td>{{ actividad.horario }}</td>
                    <td>{{ actividad.disponibilidad ? 'Disponible' : 'No Disponible' }}</td>
                    <td>
                        <button @click="cambiarEstado(actividad)" class="action-button change">
                            {{ actividad.disponibilidad ? 'Cambiar a No Disponible' : 'Cambiar a Disponible' }}
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import apiClient from '../axios';

export default {
    name: 'CuposView',
    data() {
        return {
            actividades: []
        };
    },
    created() {
        this.obtenerActividades();
    },
    methods: {
        async obtenerActividades() {
            try {
                const response = await apiClient.get('/actividad');
                this.actividades = response.data;
            } catch (error) {
                console.error("Error al obtener actividades:", error);
            }
        },
        async cambiarEstado(actividad) {
            try {
                // Cambia la disponibilidad localmente para el estado
                const nuevaDisponibilidad = !actividad.disponibilidad;

                // Realiza la solicitud PUT para actualizar la disponibilidad en el backend
                await apiClient.put(`/actividad/${actividad.idActividad}`, nuevaDisponibilidad);

                // Actualiza la disponibilidad en la tabla y refresca la vista
                actividad.disponibilidad = nuevaDisponibilidad;
            } catch (error) {
                console.error("Error al cambiar estado de disponibilidad:", error);
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
    padding: 8px 12px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-weight: bold;
}
.action-button.change {
    background-color: #e67e22; /* Naranja intenso */
    color: white;
    transition: background-color 0.3s;
}
.action-button.change:hover {
    background-color: #d35400; /* Naranja oscuro al pasar el cursor */
}
</style>

