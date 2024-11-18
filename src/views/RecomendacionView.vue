<template>
    <div class="table-container">
      <h2>Lista de Recomendaciones</h2>
      <button class="add-button" @click="generarReporte">Generar Reporte</button>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre Estudiante</th>
            <th>Nombre Actividad</th>
            <th>Peso Asignado</th>
            <th>Fecha de Creación</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="recomendacion in recomendaciones" :key="recomendacion.idRecomendacion">
            <td>{{ recomendacion.idRecomendacion }}</td>
            <td>{{ recomendacion.nombreEstudiante }}</td>
            <td>{{ recomendacion.nombreActividad }}</td>
            <td>{{ recomendacion.pesoAsignado }}%</td>
            <td>{{ new Date(recomendacion.fechaRecomendacion).toLocaleDateString() }}</td>
            <td>
              <button class="action-button view" @click="verDetalles(recomendacion.idRecomendacion)">
                Detalles
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
    data() {
      return {
        recomendaciones: []
      };
    },
    methods: {
      async cargarRecomendaciones() {
        try {
          const response = await apiClient.get('/Recomendacion');
          this.recomendaciones = response.data;
        } catch (error) {
          console.error("Error al cargar recomendaciones:", error);
        }
      },
      verDetalles(id) {
        this.$router.push({ name: 'DetalleReporte', params: { id } });
      },
      generarReporte() {
        // Lógica para generar reporte
        console.log("Generando reporte...");
      }
    },
    mounted() {
      this.cargarRecomendaciones();
    }
  };
  </script>
  
  <style scoped>
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
  .action-button.view {
    background-color: #3498db;
    color: white;
    padding: 5px 10px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-weight: bold;
  }
  .action-button.view:hover {
    background-color: #2980b9;
  }
  </style>
  