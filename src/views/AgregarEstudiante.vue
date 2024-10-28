<template>
    <div class="form-container">
        <h2>Agregar Estudiante</h2>
        <form @submit.prevent="agregarEstudiante">
            <label>Nombre:</label>
            <input v-model="estudiante.nombre" required />

            <label>Correo:</label>
            <input type="email" v-model="estudiante.correo" required />

            <label>Cédula:</label>
            <input v-model="estudiante.cedula" required />

            <label>Nivel Condición Física:</label>
            <input v-model="estudiante.nivelCondicionFisica" required />

            <label>Preferencias de Deporte:</label>
            <input v-model="estudiante.preferenciasDeporte" />

            <label>Objetivos Personales:</label>
            <input v-model="estudiante.objetivosPersonales" />

            <label>Restricciones Físicas:</label>
            <input v-model="estudiante.restriccionesFisicas" />

            <button type="submit">Agregar</button>
            <p v-if="mensaje" :class="{'error': mensajeError, 'mensaje': !mensajeError}">{{ mensaje }}</p>
        </form>
    </div>
</template>

<script>
import apiClient from '../axios';

export default {
    data() {
        return {
            estudiante: {
                nombre: '',
                correo: '',
                cedula: '',
                nivelCondicionFisica: '',
                preferenciasDeporte: '',
                objetivosPersonales: '',
                restriccionesFisicas: '',
                idAdministrador: 1 // Siempre asigna 1 para el administrador
            },
            mensaje: '',
            mensajeError: false
        };
    },
    methods: {
        async agregarEstudiante() {
            try {
                await apiClient.post('/Estudiante', this.estudiante);
                this.mensaje = 'Estudiante agregado correctamente';
                this.mensajeError = false;
                this.$router.push({ name: 'Estudiantes' });
            } catch (error) {
                if (error.response && error.response.data) {
                    // Muestra el mensaje de error del backend
                    this.mensaje = error.response.data.message || 'Hubo un error al agregar el estudiante.';
                } else {
                    this.mensaje = 'Hubo un error de conexión al intentar agregar el estudiante.';
                }
                this.mensajeError = true;
            }
        }
    }
};
</script>

<style>
.form-container {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f4f4f9;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
.form-container h2 {
    color: #2c3e50;
    margin-bottom: 20px;
    text-align: center;
}
.form-container label {
    margin-top: 10px;
    color: #7f8c8d;
}
.form-container input {
    padding: 10px;
    margin-top: 5px;
    border: 1px solid #bdc3c7;
    border-radius: 4px;
    width: 100%;
}
.form-container button {
    margin-top: 20px;
    padding: 10px;
    background-color: #3498db;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-weight: bold;
    width: 100%;
}
.form-container button:hover {
    background-color: #2980b9;
}

.error {
    color: red;
    font-size: 0.9em;
}
.mensaje {
    color: green;
    font-size: 1em;
    margin-top: 10px;
}
</style>
