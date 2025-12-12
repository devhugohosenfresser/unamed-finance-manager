<template>
     <nav class="sidepanel-nav">
          <h3>Unamed Finance Manager</h3>

          <ul>
               <li>
                    <!-- User Menu -->
                    <details>
                         <summary class="menu-title">User</summary>

                         <ul>
                              <li>
                                   <NuxtLink to="/user/dashboard"
                                        >Dashboard</NuxtLink
                                   >
                              </li>
                         </ul>
                    </details>
                    <!-- Admin Menu -->
                    <details>
                         <summary class="menu-title">Admin</summary>

                         <ul>
                              <li>
                                   <NuxtLink to="/admin/dashboard"
                                        >Dashboard</NuxtLink
                                   >
                              </li>

                              <!-- Panel Dashboard -->
                              <li class="dropdown-link">
                                   <details>
                                        <summary class="link-row">
                                             <span
                                                  ><NuxtLink to="/admin/panels"
                                                       >Panel
                                                       Dashboard</NuxtLink
                                                  ></span
                                             >
                                        </summary>

                                        <ul>
                                             <li>
                                                  <NuxtLink
                                                       to="/admin/panels/UsersPanel"
                                                  >
                                                       Users Panel
                                                  </NuxtLink>
                                             </li>
                                             <li>
                                                  <NuxtLink
                                                       to="/admin/panels/FinancialAccountsPanel"
                                                  >
                                                       Financial Accounts Panel
                                                  </NuxtLink>
                                             </li>
                                             <li>
                                                  <NuxtLink
                                                       to="/admin/panels/TransactionsPanel"
                                                  >
                                                       Transactions Panel
                                                  </NuxtLink>
                                             </li>
                                             <li>
                                                  <NuxtLink
                                                       to="/admin/panels/LogsPanel"
                                                  >
                                                       Logs Panel
                                                  </NuxtLink>
                                             </li>
                                        </ul>
                                   </details>
                              </li>
                         </ul>
                    </details>
               </li>
               <li>
                    <form action="/api/auth/logout" method="POST">
                         <button type="submit" class="LinkButton">
                              Logout
                         </button>
                    </form>
               </li>
          </ul>
     </nav>
</template>
<style src="@/assets/CSS/components/side-panel.css" scoped></style>
