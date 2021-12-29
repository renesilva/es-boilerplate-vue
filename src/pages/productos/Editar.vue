<template>
  <div>
    <h2>Editar Producto</h2>
    <Form @submit="onSubmit" :validation-schema="schema" :initial-values="formValues">
      <div class="mb-3">
        <label for="product_name" class="form-label"
          >Nombre <span style="color: red">*</span></label
        >
        <Field type="text" class="form-control" name="product_name" />
        <ErrorMessage name="product_name" class="text-danger small" />
      </div>
      <div class="mb-3">
        <label for="product_description" class="form-label"
          >Descripción <span style="color: red">*</span></label
        >
        <Field type="text" class="form-control" name="product_description" as="textarea" />
        <ErrorMessage name="product_description" class="text-danger small" />
      </div>
      <div class="mb-3">
        <label for="product_price" class="form-label"
          >Precio <span style="color: red">*</span></label
        >
        <Field type="number" class="form-control" name="product_price" />
        <ErrorMessage name="product_price" class="text-danger small" />
      </div>
      <div class="mb-3">
        <div class="row">
          <div class="col-6">
            <label for="product_image" class="form-label">Imagen</label>
            <Field type="file" class="form-control" name="product_image" />
            <ErrorMessage name="product_image" class="text-danger small" />
          </div>
          <div class="col-6">
            Imagen actual<br />
            <img :src="formValues.product_image" class="image-thumb" />
          </div>
        </div>
      </div>
      <div class="mb-3">
        <button class="btn btn-primary">Editar</button>
        &nbsp;
        <router-link class="btn btn-secondary" to="/productos">Cancelar</router-link>
      </div>
      <div class="mb-3">
        {{ message }}
      </div>
    </Form>
  </div>
</template>
<script>
import { Form, Field, ErrorMessage } from 'vee-validate';
import { toFormValidator } from '@vee-validate/zod';
import { z } from 'zod';
import { api } from '@/config/site.config.js';

export default {
  name: 'ProductosEditarPage',
  data() {
    const schema = toFormValidator(
      z.object({
        product_name: z.string({ required_error: 'Requerido' }).nonempty(),
        product_description: z.string({ required_error: 'Requerido' }).nonempty(),
        product_price: z.string({ required_error: 'Requerido' }).nonempty(),
      }),
    );
    // Initial values
    let formValues = {};
    return {
      message: '',
      schema,
      formValues,
    };
  },
  methods: {
    onSubmit(producto) {
      let formData = new FormData();
      for (let x in producto) {
        formData.append(x, producto[x]);
      }
      if (typeof producto.product_image !== 'undefined') {
        formData.append('image', producto.product_image[0]);
      }
      formData.append('id', this.id);

      api
        .post('products/save', formData)
        .then((response) => {
          if (response.data.success) {
            this.message = 'Producto Editado!';
          } else {
            this.message = 'Hubo un error!';
          }
        })
        .catch((error) => {
          this.message = 'Hubo un error!';
          console.log(error);
        });
    },
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    api.get('products/get/' + this.id).then((response) => {
      this.formValues = response.data.product;
    });
  },
  props: ['id'],
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  // Se pueden utilizar estos hooks para el ciclo de vida
  // beforeCreate, created, beforeMount, mounted, beforeUpdate, updated
  // activated, deactivated, beforeUnmount, unmounted
};
</script>

<style scoped>
.image-thumb {
  max-width: 100px;
  height: auto;
}
</style>
