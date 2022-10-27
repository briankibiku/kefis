<template>
  <div style="margin: 20px;">
    <h3>
      Store
    </h3>
    <table class="table" >
  <thead class="thead">
    <tr>
      <th scope="col">Product</th>
      <th scope="col">QTY</th>
      <th scope="col">Price</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody v-for="product in reorderedProducts">
    <tr>
      <td>{{product.name}}</td>
      <td>{{product.quantity}}</td>
      <td class='status-pending' v-if="product.status === 'pending'">{{product.status}}</td>
      <td class='status-fulfilled' v-if="product.status === 'fulfilled'">{{product.status}}</td>
      <td><button class="btn btn-success" @click="dispatchOrder(product)">Fulfill Order</button></td>
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
      reorderedProducts: [],
      restokeNeeded: false,
      reorderMessage: 'You are running low on this product, completing this action will prompt a reorder'
    }
  },
  created() {
    this.reorderedProducts = this.$store.state.reorderedProducts;
    this.productsList = this.$store.state.products
    console.log(this.reorderedProducts)
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
    async dispatchOrder(product){
      // mutate state 
      if(confirm(`Dispatch ${product.quantity} ${product.name}? `)) {
        let arr = [...this.productsList];
        let reorderArr = [...this.productsList];
        const updatedData = {
          'id': product.id,
          'name': product.name,
          'quantity': product.quantity + 10,
          'price': product.price
        }        
        const newArr = arr.map(obj => {
                if (obj.id === product.id) {
                  return {...obj, quantity: product.quantity - 1};
                }

          return obj;
        });  
        const updateReorder = reorderArr.map(obj => {
                if (obj.id === product.id) {
                  return {...obj, status: 'Fulfilled'};
                }

          return obj;
        });  
        console.log(updateReorder)
        await this.persistReorderedProducts(updateReorder);
              
        await this.persistProducts(newArr);
      }
    }
  }
}

</script>

<style>
.status-pending{
  height: 10px;
  color: white;
  width: 80px;
  background-color: red;
  opacity: 40%;
  border-radius: 10px;
  text-align: center;
  justify-content: center;
}
.status-fulfilled{
  height: 20px;
  color: white;
  background-color: green;
  opacity: 40%;
  border-radius: 10px;
}
</style>