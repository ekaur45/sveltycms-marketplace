<script>
    import { onMount } from 'svelte';
    import axios from "axios";
    let myProducts;
    async function getMyProducts(){
        const result = await axios.get('/api/products/my');
        myProducts = result.data;
    }
    onMount(()=>{
        getMyProducts().then(()=>{
            console.log(myProducts);
        })
        
    })
</script>