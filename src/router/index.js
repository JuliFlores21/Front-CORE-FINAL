import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '../views/LoginView.vue';
import EstudiantesView from '../views/EstudiantesView.vue';
import AgregarEstudiante from '../views/AgregarEstudiante.vue';
import EditarEstudiante from '../views/EditarEstudiante.vue';

const routes = [
    { path: '/login', name: 'Login', component: LoginView },
    {
        path: '/estudiantes',
        name: 'Estudiantes',
        component: EstudiantesView,
        meta: { requiresAuth: true }
    },
    {
        path: '/estudiantes/agregar',
        name: 'AgregarEstudiante',
        component: AgregarEstudiante,
        meta: { requiresAuth: true }
    },
    {
        path: '/estudiantes/editar/:id',
        name: 'EditarEstudiante',
        component: EditarEstudiante,
        meta: { requiresAuth: true },
        props: true
    },
    { path: '/', redirect: '/login' } // Redirección a login si accede a la raíz
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

// Protección de rutas
router.beforeEach((to, from, next) => {
    const isAuthenticated = localStorage.getItem('authToken');
    if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
        next('/login');
    } else {
        next();
    }
});

export default router;
