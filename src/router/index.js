import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '../views/LoginView.vue';
import EstudiantesView from '../views/EstudiantesView.vue';
import AgregarEstudiante from '../views/AgregarEstudiante.vue';
import EditarEstudiante from '../views/EditarEstudiante.vue';
import CuposView from '@/views/CuposView.vue';
import RecomendacionView from '@/views/RecomendacionView.vue';
import DetalleRecomendacionView from '@/views/DetalleRecomendacionView.vue';
import AgregarReporteView from '@/views/AgregarReporteView.vue';

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
    {
        path: '/cupos',
        name: 'Cupos',
        component: CuposView,
        meta: { requiresAuth: true } // Protege la ruta de Cupos
    },
    {
        path: '/reporte',
        name: 'Reporte',
        component: RecomendacionView,
        meta: { requiresAuth: true }    
    },
    {
        path: '/reporte/:id/detalles',
        name: 'DetalleReporte',
        component: DetalleRecomendacionView,
        meta: { requiresAuth: true },
        props: true
    },
    {
        path: '/reporte/agregar',
        name: 'AgregarReporte',
        component: AgregarReporteView,
        meta: {requiresAuth: true}
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
