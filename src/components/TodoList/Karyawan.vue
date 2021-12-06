<template>
    <v-main class="list">
        <h3 class="text-h3 font-weight-medium mb-5"> Karyawan </h3>
        <v-card>
            <v-card-title>
                <v-text-field
                    v-model="search"
                    append-icon="mdi-magnify"
                    label="Search"
                    single-line
                    hide-details
                ></v-text-field>
                <v-spacer></v-spacer>
                <v-btn color="success" dark @click="dialog = true"> Tambah </v-btn>
            </v-card-title>
            <v-data-table :headers="headers" :items="karyawans" :search="search">
                <template v-slot:[`item.actions`]="{ item }">
                    <v-btn small class="mr-2" @click="editHandler(item)"> edit </v-btn>
                    <v-btn small @click="deleteHandler(item.id)"> delete </v-btn>
                </template>
            </v-data-table>
        </v-card>
        <v-dialog v-model="dialog" persistent max-width="600px">
            <v-card>
                <v-card-title>
                    <span class="headline">{{ formTitle }} Karyawan</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-text-field v-model="form.nama" label="Nama" required></v-text-field>
                        <v-textrea v-model="form.alamat" label="Alamat" required></v-textrea>
                        <v-text-field v-model="form.gaji" label="Gaji" required></v-text-field>
                        <v-text-field v-model="form.no_hp" label="Nomor Telepon" required></v-text-field>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="cancel"> Cancel </v-btn>
                    <v-btn color="blue darken-1" text @click="setForm"> Save </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-dialog v-model="dialogConfirm" persistent max-width="400px">
            <v-card>
                <v-card-title>
                    <span class="headline">Warning!</span>
                </v-card-title>
                <v-card-text>
                    Anda Yakin ingin menghapus produk ini?
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="dialogConfirm = false"> Cancel </v-btn>
                    <v-btn color="blue darken-1" text @click="deleteData"> Delete </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom>{{ error_message }}</v-snackbar>
    </v-main>
</template>

<script>
export default {
    name: "Karyawans",
    data() {
        return {
            inputType: 'Tambah',
            load: false,
            snackbar: false,
            error_message: '',
            color: '',
            search: null,
            dialog: false,
            dialogConfirm: false,
            headers: [
                {
                    text: "No",
                    align: "start",
                    sortable: true,
                    value: "id",
                },
                { text: "Nama", value: "nama" },
                { text: "Alamat", value: "alamat" },
                { text: "Gaji", value: "gaji" },
                { text: "Nomor Telepon", value: "no_hp" },
                { text: "Actions", value: "actions" },
            ],
            karyawan: new FormData,
            karyawans: [],
            form: {
                id: null,
                nama: null,
                alamat: null,
                gaji: null,
                no_hp: null,
                desc: null,
            },
            deleteId: '',
            editId: ''
        };
    },
    methods: {
        setForm(){
            if(this.inputType !== 'Tambah'){
                this.update();
            }else{
                this.save();
            }
        },
        readData() {
            var url = this.$api + '/karyawans';
            this.$http.get(url, {
                headers: {
                    'Authorization' : 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response => {
                this.karyawans = response.data.data;
            })
        },
        save() {
            this.karyawans.append('nama', this.form.nama);
            this.karyawans.append('alamat', this.form.alamat);
            this.karyawans.append('gaji', this.form.gaji);
            this.karyawans.append('no_hp', this.form.no_hp);

            var url = this.$api + '/karyawans/'
            this.load = true;
            this.$http.post(url, this.karyawans, {
                headers: {
                    'Authorization' : 'Bearer ' + localStorage.getItem('token'),
                }
            }).then(response => {
                this.error_message = response.data.message;
                this.color = "green";
                this.snackbar = true;
                this.load = true;
                this.close();
                this.readData();
                this.resetForm();
            }).catch(error => {
                this.error_message = error.response.data.message;
                this.color = "red";
                this.snackbar = true;
                this.load = false;
            });
        },
        update(){
            let newData = {
                nama : this.form.nama,
                alamat : this.form.alamat,
                gaji : this.form.gaji,
                no_hp : this.form.no_hp,
            };

            var url = this.$api + '/karyawans/' + this.editId;
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
        deleteData(){
            var url = this.$api + '/karyawans/' + this.deleteId;
            this.load = true;
            this.$http.delete(url, {
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
                this.inputType = "Tambah";
            }).catch(error => {
                this.error_message = error.response.data.message;
                this.color = "red";
                this.snackbar = true;
                this.load = false;
            });
        },
        editHandler(item) {
            this.inputType = 'Ubah';
            this.editId = item.id;
            this.form.nama = item.no_hp;
            this.form.alamat = item.alamat;
            this.form.gaji = item.gaji;
            this.form.no_hp = item.no_hp;
            this.dialog = true;
        },
        deleteHandler(id) {
            this.deleteId = id;
            this.dialogConfirm = true;
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
            this.form = { nama: null,
                gaji: null,
                alamat: null,
                no_hp: null};
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
};
</script>