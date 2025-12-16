<template>
     <header class="app-header">
          <div class="header-content">
               <div class="logo">
                    <h2>Unnamed Finance Manager</h2>
               </div>

               <nav class="main-nav">
                    <div class="nav-section">
                         <ul>
                              <li>
                                   <NuxtLink
                                        to="/user/dashboard"
                                        class="nav-link"
                                   >
                                        Dashboard
                                   </NuxtLink>
                              </li>
                         </ul>
                    </div>
               </nav>

               <div class="user-actions">
                    <div class="dropdown">
                         <span class="dropdown-toggle">Admin</span>
                         <ul class="dropdown-menu">
                              <li>
                                   <NuxtLink
                                        to="/admin/dashboard"
                                        class="nav-link"
                                   >
                                        Dashboard
                                   </NuxtLink>
                              </li>
                              <li class="dropdown-divider"></li>
                              <li class="dropdown-header">Admin Panels</li>
                              <li>
                                   <NuxtLink
                                        to="/admin/panels/UsersPanel"
                                        class="nav-link"
                                   >
                                        Users Panel
                                   </NuxtLink>
                              </li>
                              <li>
                                   <NuxtLink
                                        to="/admin/panels/FinancialAccountsPanel"
                                        class="nav-link"
                                   >
                                        Financial Accounts
                                   </NuxtLink>
                              </li>
                              <li>
                                   <NuxtLink
                                        to="/admin/panels/TransactionsPanel"
                                        class="nav-link"
                                   >
                                        Transactions
                                   </NuxtLink>
                              </li>
                         </ul>
                    </div>
                    <form
                         action="/api/auth/logout"
                         method="POST"
                         class="logout-form"
                    >
                         <button type="submit" class="logout-button">
                              Logout
                         </button>
                    </form>
               </div>
          </div>
     </header>
</template>

<style src="@/assets/CSS/components/header.css" scoped></style>
