<template>
    <div class="login-container">
        <div class="login-form">
            <h2>Iniciar Sesión</h2>
            <form @submit.prevent="login">
                <label for="username">Usuario:</label>
                <input type="text" v-model="username" required />

                <label for="password">Contraseña:</label>
                <input type="password" v-model="password" required />

                <button type="submit">Ingresar</button>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            username: '',
            password: ''
        };
    },
    methods: {
        async login() {
            // Validación de ejemplo, reemplaza con la API de autenticación
            if (this.username === 'admin' && this.password === '1q2w3e4r') {
                localStorage.setItem('authToken', 'sample_token');
                this.$router.push('/estudiantes');
            } else {
                alert('Credenciales incorrectas');
            }
        }
    }
};
</script>

<style>
.login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-color: #ecf0f1;
}
.login-form {
    background-color: white;
    padding: 30px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    max-width: 400px;
    width: 100%;
    text-align: center;
}
.login-form h2 {
    color: #2c3e50;
    margin-bottom: 20px;
}
.login-form label {
    display: block;
    text-align: left;
    margin: 10px 0 5px;
    color: #7f8c8d;
}
.login-form input {
    width: 100%;
    padding: 10px;
    margin-bottom: 15px;
    border: 1px solid #bdc3c7;
    border-radius: 4px;
}
.login-form button {
    width: 100%;
    padding: 10px;
    background-color: #3498db;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-weight: bold;
}
.login-form button:hover {
    background-color: #2980b9;
}
</style>
