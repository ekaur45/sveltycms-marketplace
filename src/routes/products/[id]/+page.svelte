<script context="module">
    export async function load({ params }) {
      const res = await fetch(`/api/products/${params.id}`);
      return { props: { product: await res.json() } };
    }
  </script>
  
  <script>
    export let product;
  </script>
  
  {#if product}
    
  <h1>{product.title}</h1>
  <p>{product.description}</p>
  <p>Price: ${product.price}</p>
  <p>Stock: {product.stock}</p>
  {:else}

  <h4>No</h4>
  {/if}

  
    
  
  
  