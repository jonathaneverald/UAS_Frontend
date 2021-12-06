import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

function importComponent(path){
    return () => import(`./components/${path}.vue`);
}

const router = new VueRouter({
    mode: "history",
    routes: [
        {
            path: "/",
            name: "admin",
            component: importComponent("DashboardLayout"),
            children:[
                //Dashboard
                {
                    path: "/",
                    name: "Root",
                    component: importComponent("Dashboard"),
                },
                // Users
                {
                    path: "/user",
                    name: "Users",
                    component: importComponent("TodoList/Users"),
                },
                // Products
                {
                    path: "/product",
                    name: "Products",
                    component: importComponent("TodoList/Products"),
                },
                // Toko
                {
                    path: "/toko",
                    name: "Toko",
                    component: importComponent("TodoList/Toko"),
                },
                // Karyawan
                {
                    path: "/karyawan",
                    name: "Karyawan",
                    component: importComponent("TodoList/Karyawan"),
                },
            ],
        },
    ],
});

export default router;