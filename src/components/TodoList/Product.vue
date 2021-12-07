<template>
    <v-main class="list">
        <h3 class="text-h3 font-weight-medium mb-5"> Products </h3>
        <v-card dark>
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
            <v-data-table :headers="headers" :items="products" :search="search">
                <template v-slot:[`item.actions`]="{ item }">
                    <v-btn small class="mr-2" @click="editHandler(item)"> edit </v-btn>
                    <v-btn small @click="deleteHandler(item.id)"> delete </v-btn>
                </template>
            </v-data-table>
        </v-card>
        <v-dialog v-model="dialog" persistent max-width="600px">
            <v-card>
                <v-card-title>
                    <span class="headline">{{ formTitle }} Products</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-text-field v-model="form.product_name" label="Product Name" required></v-text-field>
                        <v-text-field v-model="form.stock" label="Stock" required></v-text-field>
                        <v-text-field v-model="form.price" label="Price" required></v-text-field>
                        <v-text-field v-model="form.desc" label="Description" required></v-text-field>
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
    name: "Product",
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
                { text: "Product Name", value: "product_name" },
                { text: "Stock", value: "stock" },
                { text: "Price", value: "price" },
                { text: "Description", value: "desc" },
                { text: "Actions", value: "actions" },
            ],
            product: new FormData,
            products: [],
            form: {
                id: null,
                product_name: null,
                stock: null,
                price: null,
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
            var url = this.$api + '/product';
            this.$http.get(url, {
                headers: {
                    'Authorization' : 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response => {
                this.products = response.data.data;
            })
        },
        save() {
            this.product.append('product_name', this.form.product_name);
            this.product.append('stock', this.form.stock);
            this.product.append('price', this.form.price);
            this.product.append('desc', this.form.desc);

            var url = this.$api + '/product/'
            this.load = true;
            this.$http.post(url, this.product, {
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
                product_name : this.form.product_name,
                stock : this.form.stock,
                price : this.form.price,
                desc : this.form.desc
            };

            var url = this.$api + '/product/' + this.editId;
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
            var url = this.$api + '/product/' + this.deleteId;
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
            this.form.product_name = item.product_name;
            this.form.stock = item.stock;
            this.form.price = item.price;
            this.form.desc = item.desc;
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
            this.form = { product_name: null,
                stock: null,
                price: null,
                desc: null };
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