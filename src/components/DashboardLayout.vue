<template >
    <div class="dashboard"  >
        <v-navigation-drawer v-model="drawer" class="fullheight" width="256" color="indigo darken-4" app  >
            <v-container color="#f2ff42">
            <v-row>
                <v-col sm="4" md="4">
                    <v-avatar size=100><img src="../assets/newlogo.png" alt=""></v-avatar>

                </v-col>
                <v-col sm="8" md="8"  class="d-flex justify-center pt-7">
                    <v-list-item >
                        <v-list-item-content class="text-left align-self-start "> 
                            <v-list-item-title class="title white--text">onMart</v-list-item-title>
                            <v-list-item-subtitle class="white--text">Supermarket</v-list-item-subtitle>
                        </v-list-item-content>
                     </v-list-item>
                </v-col>
            </v-row >
            </v-container>
            <v-divider></v-divider>
            <v-list dense nav>
                <v-list-item class="white--text"
                    v-for="item in items"
                    :key="item.title"
                    link
                    tag="router-link"
                    :to="item.to"
                >
                    <v-list-item-content>
                        <v-list-item-title>{{item.title}}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>

    <v-app-bar app fixed height="75px">
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
            <VSpacer/>
            <v-toolbar-items>
                <v-btn text router color="red"><v-icon @click="logout">mdi-power</v-icon></v-btn>
            </v-toolbar-items>
    </v-app-bar>

        <div class="grey lighten-4 fullheight pa-5">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
export default{
    name: "Dashboard",
    data(){
        return{
            drawer: true,
            items: [
                { title: "Dashboard", to: "/dashboard" },
                { title: "Profile", to: "/profile"},
                { title: "Users", to: "/user"},
                { title: "Product", to: "/product"},
                { title: "Toko", to: "/toko"},
                { title: "Karyawan", to: "/karyawan"}
                
            ],
        };
    },
    methods:{
        logout(){
        localStorage.removeItem('token');
        this.$router.push({
            name: 'Login',
        });
    }
    }
};
</script>
<style scoped>
.fullheight {
    min-height: 100vh !important;
}

.router {
  text-decoration: none;
  color: black;
}
</style>