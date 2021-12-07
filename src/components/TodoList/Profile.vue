<template >
    <v-main>
        <h1 class="text-h3 font-weight-medium mb-5 text-center" >My Profile</h1>
        <p class=" text-center">OnMart Supermarket</p>
        <v-avatar size="100">
            <v-icon size="100" color="indigo darken-4">
                mdi-account-circle
            </v-icon>
        </v-avatar>
        <v-spacer class="mt-7"></v-spacer>
        <b>
           <h2>
               {{ user.name }}
               <v-spacer></v-spacer>
               {{ user.email }}
               <v-spacer></v-spacer>
               {{ user.alamat }}
               <v-spacer></v-spacer>
               {{ user.no_telp }}
           </h2>
        </b>
            
            <v-btn color="success mt-9" dark @click="editHandler"> Edit</v-btn>
            <v-dialog v-model="dialog" persistent max-width="600px">
            <v-card>
                <v-card-title>
                    <span class="headline">{{ formTitle }} Edit</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-text-field v-model="form.name" label="Nama" required></v-text-field>
                        <v-text-field v-model="form.email" label="Email" required></v-text-field>
                        <v-text-field v-model="form.password" label="Password" :rules="passwordRules" required></v-text-field>
                        <v-textarea v-model="form.alamat" label="Alamat" required></v-textarea>
                        <v-text-field v-model="form.no_telp" label="Nomor Telepon" required></v-text-field>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="cancel"> Cancel </v-btn>
                    <v-btn color="blue darken-1" text @click="update"> Save </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
            
    </v-main>

    
</template>

<script>
  export default {
    data () {
      return {
        user:new FormData,
        users: [],
            form: {
                no: null,
                name: null,
                email: null,
                password: null,
                alamat: null,
                no_telp: null,
            },
        editId: '',
        passwordRules: [(v) => !!v || "Password Tidak Boleh Kosong :("],
        dialog: false,
        load: false,
        snackbar: false,
        error_message: '',
        color: ''
      }
    },
    methods:{
        readData() {
            var url = this.$api + '/user/' + localStorage.getItem('id');
            this.$http.get(url, {
                headers: {
                    'Authorization' : 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response => {
                this.user = response.data.data;
            })
        },
        update(){
            let newData = {
                name : this.form.name,
                email : this.form.email,
                password : this.form.password,
                alamat : this.form.alamat,
                no_telp : this.form.no_telp
            };

            var url = this.$api + '/user/' + this.editId;
            this.load = true;
            this.$http.put(url, newData, {
                headers: {
                    'Authorization' : 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response => {
                this.error_message = response.data.message;
                this.color = "green";
                this.snackbar = true;
                this.load = false;
                this.close();
                this.readData();
                this.resetForm();
                this.inputType = 'Tambah';
            }).catch(error => {
                this.error_message = error.response.data.message;
                this.color = "red";
                this.snackbar = true;
                this.load = false;
            });
        },
        editHandler() {
            var url = this.$api + '/user/' + localStorage.getItem('id');
            this.$http.get(url, {
                headers: {
                    'Authorization' : 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response => {
                
                this.form.name = response.data.data.name;
                this.form.email = response.data.data.email;
                this.form.password = response.data.data.password;
                this.form.alamat = response.data.data.alamat;
                this.form.no_telp = response.data.data.no_telp;
                this.editId = response.data.data.id;
            });
            this.inputType = 'Ubah';
            
            
            this.dialog = true;
        },
        close() {
            this.dialog = false;
            this.inputType = 'Tambah';
            this.dialogConfirm = false;
            this.readData();
        },
        cancel() {
            this.resetForm();
            this.readData();
            this.dialog = false;
            this.dialogConfirm = false;
            this.inputType = 'Tambah';
        },
        resetForm() {
            this.form = { name: null,
                email: null,
                password: null,
                alamat: null,
                no_telp: null };
        },
    },
    computed: {
        formTitle() {
            return this.inputType;
        },
    },
    mounted() {
        this.readData();
    },
  }
</script>