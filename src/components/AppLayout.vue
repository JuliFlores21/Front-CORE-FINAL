<template>
    <div class="layout">
        <aside class="sidebar">
            <h2>Menú</h2>
            <ul>
                <li><router-link to="/estudiantes">Estudiantes</router-link></li>
                <li><router-link to="/cupos">Cupos</router-link></li>
                <li><router-link to="/reporte">Reporte</router-link></li>
            </ul>
            <button @click="logout" class="logout-button">Cerrar Sesión</button>
        </aside>
        <main class="content">
            <router-view></router-view>
        </main>
    </div>
</template>

<script>
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

export default {
    name: 'AppLayout',
    setup() {
        const router = useRouter();
        const store = useStore();

        const logout = () => {
            store.dispatch('logout'); // Llamada a la acción de logout en Vuex
            router.push('/login'); // Redirige al login
        };

        return { logout };
    }
};
</script>

<style>
    .layout {
        display: flex;
        min-height: 100vh;
        font-family: Arial, sans-serif;
    }
    .sidebar {
        width: 250px;
        background-color: #2c3e50;
        color: white;
        padding: 20px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
    .sidebar h2 {
        color: #ecf0f1;
        font-weight: bold;
        font-size: 1.5em;
        margin-bottom: 20px;
    }
    .sidebar ul {
        list-style: none;
        padding: 0;
        margin: 0;
    }
    .sidebar li {
        margin: 10px 0;
    }
    .sidebar a {
        color: #bdc3c7;
        text-decoration: none;
        padding: 8px;
        display: block;
        border-radius: 4px;
    }
    .sidebar a:hover,
    .sidebar a.router-link-active {
        color: #ecf0f1;
        background-color: #34495e;
        font-weight: bold;
    }
    .logout-button {
        margin-top: 20px;
        padding: 10px;
        background-color: #e74c3c;
        color: white;
        border: none;
        cursor: pointer;
        width: 100%;
        border-radius: 4px;
        font-weight: bold;
    }
    .logout-button:hover {
        background-color: #c0392b;
    }
    .content {
        flex: 1;
        padding: 20px;
        background-color: #ecf0f1;
    }
</style>
