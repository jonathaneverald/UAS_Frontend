import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

function importComponent(path){
    return () => import(`./components/${path}.vue`);
}

const router = new VueRouter({
    mode: "history",
    routes: [
    //Register
    {
        path: "/register",
        name: "Register",
        meta: { title: "Register" },
        component: importComponent("Register"),
    },
  
   //Login
    {
        path: "/",
        name: "Login",
        meta: { title: "Login" },
        component: importComponent("Login"),
    },

        {
            path: "/dashboard",
            component: importComponent("DashboardLayout"),
            meta: {
                requireAuth: true
            }, // test
            children:[
                //Dashboard
                {
                    path: "/dashboard",
                    name: "Dashboard",
                    meta: { title: "Dashboard" },
                    component: importComponent("Dashboard"),
                },
                // Users
                {
                    path: "/user",
                    name: "Users",
                    meta: { title: "User" },
                    component: importComponent("TodoList/Users"),
                },
                // Products
                {
                    path: "/product",
                    name: "Products",
                    meta: { title: "Product" },
                    component: importComponent("TodoList/Product"),
                },
                // Toko
                {
                    path: "/toko",
                    name: "Toko",
                    meta: { title: "Toko" },
                    component: importComponent("TodoList/Toko"),
                },
                // Karyawan
                {
                    path: "/karyawan",
                    name: "Karyawan",
                    meta: { title: "Karyawan" },
                    component: importComponent("TodoList/Karyawan"),
                },
                //Profile
                {
                    path: "/profile",
                    name: "Profile",
                    meta: { title: "Profile" },
                    component: importComponent("TodoList/Profile"),
                },
            ],
        },

        //Verify
        {
            path: "/verify/:email/:password/:date",
            component: importComponent("Verificator"),
            name: "Verify Email",
            meta: { title: "Verify Email" },
           
        },
    ],
});


//Set Judul
router.beforeEach((to, from, next) => {
    document.title = to.meta.title;
    next();
  });
export default router;