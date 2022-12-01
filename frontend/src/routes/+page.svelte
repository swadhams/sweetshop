<script>
import {onMount} from 'svelte';
import axios from 'axios';

let cost = [];
let products = [];
let stock =  [];
let sum = '';
let total_cost = '';

onMount(async () => {
	const response = await fetch("http://localhost:5000/items")
		.then(response => response.json());
        products = response;
        stock = products.map((i)=>{
        return i.stock;
    });
    cost = products.map((i)=>{
        return i.price;
    });
    sum = stock.map((num,i) => {
        return num * cost[i];
    });
    
    total_cost = sum.reduce((a, b) => a + b);
});
let add = (index) => {
     axios.get(`http://localhost:5000/add/${products[index].name}`)
    .then (response => {
        products[index].stock = response.data.new_stock;
        total_cost = response.data.total_cost;
    })
    .catch (error => {
    })
 }
let subtract = (index) => {
    loading = true
if(products[index].stock <=0) return;
    axios.get(`http://localhost:5000/subtract/${products[index].name}`)
    .then (response => {
        products[index].stock = response.data.new_stock;
        total_cost = response.data.total_cost;
        loading = false;
    })
 };
 let loading = false;
</script>

<div>
    {#each products as product, i}
    <td>
        <p>{product.name}</p>
        <p>{product.description}</p>
        <p>£{product.price.toFixed(2)}</p>
        <p>{product.stock}</p>
        <button on:click={() => add(i)}>+</button>
        <button disabled={loading} on:click={() => subtract(i)}>-</button>
    </td>
    {/each}
    £{parseFloat(total_cost).toFixed(2)}
    
</div>

<style>
</style>