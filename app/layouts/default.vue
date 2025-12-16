<template>
     <div class="app-layout">
          <!-- Header with navigation -->
          <Header />

          <!-- Main content -->
          <main class="main-content">
               <div class="page-wrapper">
                    <slot />
               </div>
          </main>

          <Footer />
     </div>
</template>

<style scoped src="@/assets/CSS/layouts/default.css"></style>
