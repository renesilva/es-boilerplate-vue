<template>
  <div>
    <div class="d-flex justify-content-between">
      <h2>Listado de Productos</h2>
      <div>
        <router-link class="btn btn-outline-primary" to="/productos/adicionar">
          Adicionar Producto
        </router-link>
      </div>
    </div>
    <table class="table">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Descripción</th>
          <th>Imagen</th>
          <th>Precio</th>
          <th>Creado en</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(producto, index) in productos" :key="index">
          <td>
            {{ producto.product_name }}
          </td>
          <td>
            {{ producto.product_description }}
          </td>
          <td>
            <img :src="producto.product_image" class="img-fluid" />
          </td>
          <td>
            {{ producto.product_price }}
          </td>
          <td class="fecha">
            {{ formatoDeFecha(producto.created_at) }}
          </td>
          <td>
            <router-link
              :to="'/productos/editar/' + producto.id"
              class="btn btn-outline-primary btn-sm"
            >
              Editar
            </router-link>
            &nbsp;
            <a @click="eliminarProductoModal(producto.id)" class="btn btn-outline-primary btn-sm"
              >Eliminar</a
            >
          </td>
        </tr>
      </tbody>
    </table>
    <div class="modal fade" id="deleteModal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Eliminar producto</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">¿Estás seguro de eliminar este producto?</div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
              Cancelar
            </button>
            <button @click="eliminarProducto" type="button" class="btn btn-primary">
              Eliminar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { api } from '@/config/site.config.js';
import moment from 'moment';

export default {
  name: 'ProductosListadoPage',
  data() {
    return {
      productos: [],
      modal: null,
      productoEliminar: 0,
    };
  },
  methods: {
    formatoDeFecha(fecha) {
      return moment(fecha).format('MMMM D, YYYY');
    },
    eliminarProductoModal(id) {
      this.modal.show();
      this.productoEliminar = id;
    },
    eliminarProducto() {
      api.delete('products/delete/' + this.productoEliminar).then((response) => {
        console.log(response);
        this.cargarProductos();
        this.modal.hide();
      });
    },
    cargarProductos() {
      api.get('products/myProducts').then((response) => (this.productos = response.data.products));
    },
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.modal = new window.bootstrap.Modal(document.getElementById('deleteModal'));
    this.cargarProductos();
  },
  components: {},
  // Se pueden utilizar estos hooks para el ciclo de vida
  // beforeCreate, created, beforeMount, mounted, beforeUpdate, updated
  // activated, deactivated, beforeUnmount, unmounted
};
</script>

<style scoped>
img {
  max-width: 100px;
  height: auto;
}

.fecha {
  text-transform: capitalize;
}
</style>
