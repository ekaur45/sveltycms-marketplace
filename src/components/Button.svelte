<!-- src/components/Button.svelte -->
<script>
    export let text = 'Click me';
    export let type = 'button'; // can be 'button', 'submit', or 'reset'
  </script>
  
  <button
    type={type}
    class="px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
  >
    {text}
  </button>