<template>
  <nav
    class="navbar has-shadow is-fixed-top"
    role="navigation"
    aria-label="main navigation"
  >
    <div class="navbar-brand">
      <nuxt-link class="navbar-item" to="/">
        <site-logo v-if="$siteConfig.logo === 'logo-component'" />
        <img
          v-else
          :src="$siteConfig.logo"
          :alt="$siteConfig.siteName"
          class="logo"
        />
        <h3>IKA-GEO UB</h3>
      </nuxt-link>
      <hamburger-button @click="active = !active" />
    </div>

    <div
      :class="{
        'navbar-menu': true,
        'is-active': active
      }"
    >
      <ul class="navbar-end">
        <li
          v-for="item in $siteConfig.mainMenu"
          :key="item.link"
          class="navbar-item"
          @click="active = false"
        >
          <component
            :is="item.link.startsWith('http') ? 'a' : 'nuxt-link'"
            :href="item.link"
            :to="item.link"
            :target="item.target ? item.target : '_self'"
          >
            {{ item.name }}
          </component>
        </li>
        <li class="navbar-item site-search-wrapper">
          <site-search />
        </li>
        <li
          :class="classLogout"
          @click="logout"
        >
          <component
            :is="'nuxt-link'"
            :href="''"
            :to="''"
            :target="'_self'"
          >
            Logout
          </component>
        </li>
      </ul>
    </div>
  </nav>
</template>
<script>
import SiteSearch from '~/components/SiteSearch'
import HamburgerButton from '~/components/HamburgerButton'
export default {
    name: 'SiteNav',
    components: { SiteSearch, HamburgerButton },
    data() {
        return {
            active: false
        }
    },
    computed: {
        classLogout() {
            return this.$store.state.localStorage.userData != null ? 'navbar-item content' : 'is-hidden'
        }
    },
    methods:{
        logout(){
            this.$store.commit('setUserData', null)
        }
    }
}
</script>
<style lang="scss" scoped>
.navbar-item img {
  max-height: 2rem;
}
.site-search-wrapper {
  transform: translateX(5px);
  @media (max-width: 1023px) {
    display: none;
  }
}
.navbar-burger {
  height: auto;
}

.navbar-menu a {
  display: block;
}
</style>
