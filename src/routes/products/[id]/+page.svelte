  
  <script>
    let product;
    import {page} from '$app/stores';
    import axios from 'axios';
	import { onMount } from 'svelte';
    const loadProduct = async()=>{
      const res = await axios.get(`/api/products/${$page.params.id}`);
      console.log(res);
      product = res.data;
    }
    onMount(()=>{
      loadProduct();
    })
  </script>
  
  {#if product}
  <div class="grid grid-cols-1 md:grid-cols-10 gap-4 mt-6">
    <!-- First Card (70%) -->
    <div class="md:col-span-7 bg-white rounded overflow-hidden shadow-lg p-4">
      <img class="w-full" src="{'/file/'+product.imageUrl}" alt="Card image 1">
      <hr>
      <div class="px-6 py-4">
        <div class="font-bold text-xl mb-2">{product.title} {product.price == 0?'Free':'$'+product.price}</div>
        <p class="text-gray-700 text-base">
          {product.description}
        </p>
      </div>
    </div>
  
    <!-- Second Card (30%) -->
    <div class="md:col-span-3 bg-white rounded overflow-hidden shadow-lg p-4" style="height: fit-content;">
      <!-- <img class="w-full" src="https://via.placeholder.com/300x300" alt="Card image 2"> -->
      <div class="px-6 py-4">
        <div class="font-bold text-xl mb-2">{product.category?.name ?? ""}</div>
        <a href="/file/download/{product.fileUrl}" class="btn-primary w-full">Download</a>
        <!-- <p class="text-gray-700 text-base">
          This is the second card, occupying 30% of the width on medium screens and larger.
        </p> -->
      </div>
    </div>
  </div>
  {:else}
  <h4>No</h4>
  {/if}

  
    
  
  
  