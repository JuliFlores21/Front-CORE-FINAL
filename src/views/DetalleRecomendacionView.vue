<template>
  <div class="detalle-container">
    <h2>Detalle de la Recomendación</h2>

    <!-- Renderiza solo si detalleRecomendacion existe -->
    <div v-if="detalleRecomendacion" class="info-sections">
      <div class="info-box">
        <h3>Información de la Recomendación</h3>
        <p><strong>Actividad:</strong> {{ detalleRecomendacion.nombreActividad }}</p>
        <p><strong>Peso Asignado Total:</strong> {{ detalleRecomendacion.pesoAsignado }}%</p>
        <p><strong>Fecha de Recomendación:</strong> {{ new Date(detalleRecomendacion.fechaRecomendacion).toLocaleDateString() }}</p>
      </div>

      <div class="info-box">
        <h3>Detalles del Estudiante</h3>
        <p><strong>Estudiante:</strong> {{ detalleRecomendacion.nombreEstudiante }}</p>
        <p><strong>Nivel Condición Física:</strong> {{ detalleRecomendacion.nivelCondicionFisica }}</p>
        <p><strong>Preferencias de Deporte:</strong> {{ detalleRecomendacion.preferenciasDeporte }}</p>
        <p><strong>Objetivos Personales:</strong> {{ detalleRecomendacion.objetivosPersonal }}</p>
        <p><strong>Restricciones Físicas:</strong> {{ detalleRecomendacion.restriccionesFisicas }}</p>
      </div>
    </div>

    <div v-if="detalles && detalles.length > 0" class="progress-box">
      <h3>Detalle de Peso Asignado por Parámetro</h3>
      <div class="progress-bar">
        <div
          v-for="(detalle, index) in detalles"
          :key="index"
          :style="{ backgroundColor: colores[index], width: detalle.porcentaje + '%' }"
        >
          {{ detalle.porcentaje }}%
        </div>
      </div>
      <ul class="legend">
        <li v-for="(detalle, index) in detalles" :key="index">
          <span :style="{ backgroundColor: colores[index] }"></span>
          {{ detalle.parametro }}: {{ detalle.porcentaje }}%
        </li>
      </ul>
    </div>

    <!-- Detalle de la recomendación general -->
    <div v-if="detalleGeneral" class="info-box">
      <h3>Mejor Actividad sin Coincidencia de Horario</h3>
      <p><strong>Actividad:</strong> {{ detalleGeneral.nombreActividad }}</p>
      <p><strong>Peso Asignado Total:</strong> {{ detalleGeneral.pesoAsignado }}%</p>
    </div>

    <button class="back-button" @click="volver">Regresar</button>
  </div>
</template>


<script>
import apiClient from '../axios';

export default {
  data() {
  return {
    detalleRecomendacion: {}, // Inicializado como un objeto vacío
    detalles: [],
    detalleGeneral: {}, // Inicializado como un objeto vacío
    detallesGeneral: [],
    colores: ["#3498db", "#2ecc71", "#f39c12", "#e74c3c"],
  };
},

  methods: {
    async cargarDetalle() {
  const id = this.$route.params.id;
  try {
    const response = await apiClient.get(`/Recomendacion/${id}`);
    const recomendaciones = response.data; // Es un array
    this.detalleRecomendacion = recomendaciones[0];
    this.detalleGeneral = recomendaciones.find[1];

    const detallesResponse = await apiClient.get(`/Recomendacion/${id}/detalles`);
    const data = detallesResponse.data;

      // Asigna los detalles específicos
      this.detalles = data.detallesEspecificos || [];
      
      // Verifica si existen detalles generales y los asigna
      if (data.detallesGenerales) {
        this.detallesGeneral = data.detallesGenerales;
      } else {
        this.detallesGeneral = []; // Asegúrate de inicializarlo como un array vacío si no existe
      }
    }catch (error) {
      console.error("Error al cargar el detalle de la recomendación:", error);
    }
},
    volver() {
      this.$router.push({ name: "Reporte" }); // Ajusta el nombre de la ruta a donde deseas regresar
    }
  },
  mounted() {
    this.cargarDetalle();
  }
};

</script>

<style scoped>
.detalle-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}
.detalle-container h2 {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 20px;
}
.info-sections {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 20px;
}
.info-box {
  background-color: #ecf0f1;
  padding: 15px;
  border-radius: 8px;
  width: 48%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
.info-box.general {
  margin-top: 20px;
}
.progress-box {
  background-color: #ecf0f1;
  padding: 15px;
  border-radius: 8px;
  margin-top: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
.progress-box h3 {
  text-align: center;
  margin-bottom: 20px;
}
.progress-bar {
  display: flex;
  height: 25px;
  margin: 20px 0;
  border-radius: 4px;
  overflow: hidden;
  background-color: #ddd;
}
.progress-bar > div {
  text-align: center;
  color: white;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
}
.legend {
  list-style: none;
  padding: 0;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.legend li {
  display: flex;
  align-items: center;
  margin-bottom: 5px;
}
.legend span {
  display: inline-block;
  width: 16px;
  height: 16px;
  margin-right: 10px;
  border-radius: 4px;
}
.back-button {
  margin-top: 20px;
  padding: 10px;
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
  font-weight: bold;
}
.back-button:hover {
  background-color: #c0392b;
}
</style>
