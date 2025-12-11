<template>
     <div class="app-layout">
          <!-- Main content -->
          <div class="main-content">
               <div class="PageWrapper">
                    <slot />
               </div>
               <Footer />
          </div>
     </div>
</template>

<style scoped>
.app-layout {
     display: flex;
     min-height: 100vh;
}

.PageWrapper {
     padding: 20px;
}
</style>
