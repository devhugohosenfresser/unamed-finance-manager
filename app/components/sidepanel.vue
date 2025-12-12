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
<style scoped>
.sidepanel-nav {
     color: var(--font-color);
     background-color: var(--sidebar-bg);
     padding: 1rem;
     font-family: var(--font-family);
}

.sidepanel-nav ul {
     list-style: none;
     padding-left: 0.5rem;
}

summary {
     cursor: pointer;
     display: flex;
     justify-content: space-between;
     align-items: center;
     user-select: none;
}

.link-row {
     display: flex;
     justify-content: space-between;
     align-items: center;
}

details summary::-webkit-details-marker {
     display: none; /* hide default marker */
}

details > summary::after {
     content: '▶';
     font-size: 0.8rem;
     margin-left: 0.5rem;
     transition: transform 0.2s;
}

details[open] > summary::after {
     transform: rotate(90deg);
}

.sidepanel-nav ul ul {
     padding-left: 1rem;
}
</style>
