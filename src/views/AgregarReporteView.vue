<template>
  <div class="reporte-container">
    <h2>Nuevo Reporte</h2>
    <div class="form-section">
      <label for="idEstudiante">Ingrese ID del Estudiante:</label>
      <input
        type="number"
        id="idEstudiante"
        v-model="idEstudiante"
        placeholder="Ej: 1"
      />
      <button @click="buscarEstudiante">Buscar</button>
    </div>

    <div v-if="estudiante" class="detalle-estudiante">
      <h3>Información del Estudiante</h3>
      <p><strong>Nombre:</strong> {{ estudiante.nombre }}</p>
      <p><strong>Horario: </strong>{{  estudiante.horario }}</p>
      <p><strong>Nivel Condición Física:</strong> {{ estudiante.nivelCondicionFisica }}</p>
      <p><strong>Preferencias de Deporte:</strong> {{ estudiante.preferenciasDeporte }}</p>
      <p><strong>Objetivos Personales:</strong> {{ estudiante.objetivosPersonales }}</p>
      <p><strong>Restricciones Físicas:</strong> {{ estudiante.restriccionesFisicas }}</p>
      <button @click="buscarActividad" class="buscar-actividad-button">Buscar Actividad</button>
    </div>

    <button @click="volver" class="back-button">Regresar</button>
  </div>
</template>

<script>
import apiClient from "../axios";

export default {
  data() {
    return {
      idEstudiante: "",
      estudiante: null,
      error: null,
    };
  },
  methods: {
    async buscarEstudiante() {
      if (!this.idEstudiante) {
        this.error = "Debe ingresar un ID válido.";
        return;
      }

      try {
        const response = await apiClient.get(`/Estudiante/${this.idEstudiante}`);
        this.estudiante = response.data;
        this.error = null; // Limpia errores previos si se encuentra el estudiante
      } catch (error) {
        console.error("Error al buscar el estudiante:", error);
        this.error = "No se encontró un estudiante con el ID proporcionado.";
        this.estudiante = null;
      }
    },
    buscarActividad() {
      if (!this.estudiante) {
        alert("Debe buscar un estudiante primero.");
        return;
      }
      // Lógica para buscar actividad o redirigir a otra vista
      console.log("Buscando actividad...");
    },
    volver() {
      this.$router.push({ name: "Reporte" }); // Ajusta el nombre de la ruta si es diferente
    },
  },
};
</script>

<style scoped>
.reporte-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #ecf0f1;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
h2 {
  text-align: center;
  color: #2c3e50;
}
.form-section {
  margin-bottom: 20px;
}
label {
  display: block;
  margin-bottom: 10px;
  font-weight: bold;
}
input {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
button {
  padding: 10px 15px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
button:hover {
  background-color: #2980b9;
}
.detalle-estudiante {
  margin-top: 20px;
  background-color: white;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.buscar-actividad-button {
  margin-top: 20px;
  background-color: #27ae60;
  border-color: #27ae60;
}
.buscar-actividad-button:hover {
  background-color: #2ecc71;
}
.back-button {
  margin-top: 20px;
  padding: 10px;
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  width: 100%;
}
.back-button:hover {
  background-color: #c0392b;
}
p {
  margin: 5px 0;
}
</style>
