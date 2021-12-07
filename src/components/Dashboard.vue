<template >
    <v-main>
        <h1 class="text-h3 font-weight-medium mb-5 text-center" >OnMart</h1>
        <p class=" text-center">Give Everything You Need</p>
        <v-carousel>
            <v-carousel-item
                v-for="(item,i) in items"
                :key="i"
                :src="item.src"
                reverse-transition="fade-transition"
                transition="fade-transition"
            ></v-carousel-item>
        </v-carousel>
    </v-main>
    
</template>

<script>
  export default {
    data () {
      return {
        items: [
          {
            src: 'https://c0.wallpaperflare.com/preview/364/414/415/dairy-food-grocery-market.jpg',
          },
          {
            src: 'https://c1.wallpaperflare.com/preview/202/44/964/supermarket-fridge-produce-food.jpg',
          },
          {
            src: 'https://c0.wallpaperflare.com/preview/493/255/629/aisle-buy-cold-department.jpg',
          },
          {
            src: 'https://c0.wallpaperflare.com/preview/982/32/16/aisle-beverages-bottles-brands.jpg',
          },
        ],
      }
    },
  }
</script>