<template>
  <div style="margin: 20px;">
    <h3>
      Store
    </h3>
    <table class="table" >
  <thead class="thead">
    <tr>
      <th scope="col">PDCT ID</th>
      <th scope="col">Product</th>
      <th scope="col">QTY</th>
      <th scope="col">Price</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody v-for="product in productsList">
    <tr>
      <td>{{product.id}}</td>
      <td>{{product.name}}</td>
      <td>{{product.quantity}}</td>
      <td>{{product.price}}</td>
      <td><button class="btn btn-success" @click="makeSale(product)">Sell</button></td>
    </tr>
  </tbody>
</table>
  </div>
  
</template>
<script>
import { mapState, mapActions } from "vuex";

export default {
  layout: 'default',
  data() {
    return {
      productsList: [],
      restokeNeeded: false,
      reorderMessage: 'You are running low on this product, completing this action will prompt a reorder'
    }
  },
  created() {
    this.productsList = this.$store.state.products;
  },
  computed: {
    ...mapState({"products": "products",
                  "reorderedProducts": "reorderedProducts"
                }),
  },
  methods: {
    ...mapActions({
      persistProducts: "persistProducts",
      persistReorderedProducts: "persistReorderedProducts" }),
    async makeSale(product){
      // mutate state 
      this.restokeNeeded = product.quantity < 30 ? true : false;
      if(confirm(`Sell ${product.name} at ${product.price}? ${this.restokeNeeded ? this.reorderMessage: ''}`)) {
        let arr = [...this.productsList];
        const updatedData = {
          'id': product.id,
          'name': product.name,
          'quantity': product.quantity - 1,
          'price': product.price
        }        
        const newArr = arr.map(obj => {
                if (obj.id === product.id) {
                  return {...obj, quantity: product.quantity - 1};
                }

          return obj;
        }); 
        if(this.restokeNeeded) {
            const reorderProduct = {
              'name': product.name,
              'quantity': 10,
              'status': 'pending'
            }  
            await this.persistReorderedProducts(reorderProduct);
        }
        
        await this.persistProducts(newArr);
        this.productsList = newArr;
      }
    }
  }
}

</script>