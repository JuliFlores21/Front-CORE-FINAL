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
      <p><strong>Horario: </strong>{{ estudiante.horario }}</p>
      <p><strong>Nivel Condición Física:</strong> {{ estudiante.nivelCondicionFisica }}</p>
      <p><strong>Preferencias de Deporte:</strong> {{ estudiante.preferenciasDeporte }}</p>
      <p><strong>Objetivos Personales:</strong> {{ estudiante.objetivosPersonales }}</p>
      <p><strong>Restricciones Físicas:</strong> {{ estudiante.restriccionesFisicas }}</p>

      <!-- Campos para los parámetros individuales -->
      <div class="parametros-section">
        <h3>Parámetros Individuales</h3>
        <label for="pesoCondicion">Condición Física (%):</label>
        <input
          type="number"
          id="pesoCondicion"
          v-model.number="parametros.pesoCondicion"
          placeholder="Ej: 25"
          min="0"
        />
        <label for="pesoObjetivos">Objetivos Personales (%):</label>
        <input
          type="number"
          id="pesoObjetivos"
          v-model.number="parametros.pesoObjetivos"
          placeholder="Ej: 25"
          min="0"
        />
        <label for="pesoPreferencias">Preferencias Deportivas (%):</label>
        <input
          type="number"
          id="pesoPreferencias"
          v-model.number="parametros.pesoPreferencias"
          placeholder="Ej: 25"
          min="0"
        />
        <label for="pesoRestricciones">Restricciones Físicas (%):</label>
        <input
          type="number"
          id="pesoRestricciones"
          v-model.number="parametros.pesoRestricciones"
          placeholder="Ej: 25"
          min="0"
        />
      </div>

      <button
        @click="buscarActividad"
        class="buscar-actividad-button"
        :disabled="!parametrosValidos"
      >
        Buscar Actividad
      </button>
    </div>

    <!-- Modal de éxito -->
    <div v-if="mensajeExito" class="modal-overlay">
      <div class="modal">
        <h3>¡Actividad Generada Exitosamente!</h3>
        <p>Diríjase a los detalles de la recomendación.</p>
        <button @click="irAReporte">Cerrar</button>
      </div>
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
      parametros: {
        pesoCondicion: null,
        pesoObjetivos: null,
        pesoPreferencias: null,
        pesoRestricciones: null,
      },
      mensajeExito: false, // Controla la visibilidad del modal
    };
  },
  computed: {
    parametrosValidos() {
      return (
        this.parametros.pesoCondicion > 0 &&
        this.parametros.pesoObjetivos > 0 &&
        this.parametros.pesoPreferencias > 0 &&
        this.parametros.pesoRestricciones >= 0
      );
    },
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
    async buscarActividad() {
      if (!this.parametrosValidos) {
        alert("Debe completar todos los parámetros con valores positivos.");
        return;
      }

      try {
        // Construir el cuerpo del request
        const body = {
          pesoCondicion: this.parametros.pesoCondicion,
          pesoObjetivos: this.parametros.pesoObjetivos,
          pesoPreferencias: this.parametros.pesoPreferencias,
          pesoRestricciones: this.parametros.pesoRestricciones,
        };

        // Enviar el POST al API
        const response = await apiClient.post(
          `/Recomendacion/generar?idEstudiante=${this.idEstudiante}`,
          body
        );

        // Verifica si se generó correctamente
        if (response.status === 200) {
          this.mensajeExito = true; // Muestra el modal de éxito
        }
      } catch (error) {
        console.error("Error al generar la actividad:", error);
        alert("Ocurrió un error al generar la actividad. Intente nuevamente.");
      }
    },
    irAReporte(){
      this.$router.push({name:"Reporte"});
    }
    ,
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
.form-section,
.parametros-section {
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
button:disabled {
  background-color: #bdc3c7;
  cursor: not-allowed;
}
button:hover:not(:disabled) {
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
.buscar-actividad-button:hover:not(:disabled) {
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
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal {
  background: white;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>
