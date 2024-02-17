<template>
  <div class="bg-gradient-to-b from-stone-400 h-screen w-screen flex items-center justify-center">
    <div v-if="$route.name === 'home'" class="w-11/12 h-5/6 border-2 flex items-center justify-center">
      <router-view/>
    </div>
    <div v-else>
      <router-view/>
    </div>
  </div>
</template>

<style>
</style>
