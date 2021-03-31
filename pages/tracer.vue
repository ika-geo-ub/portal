<template>
  <div id="about-page" class="page-wrapper about-page content-page">
    <site-hero
      title="Tracer Studies"
      subtitle="Tracer Studies"
      image="/uploads/about-tracer.jpg"
    ></site-hero><main-section theme="sidebar-right">
      <template v-slot:default>
        <div :class="classContent">
          <h3>Member List</h3>
          <iframe
            class="airtable-embed"
            src="https://airtable.com/embed/shrMF0YiSQSA3K9vD?backgroundColor=gray&layout=card&viewControls=on"
            frameborder="0"
            onmousewheel=""
            width="100%"
            style="background: transparent; border: 1px solid #fff; height: 1400px;"
          ></iframe>
        </div>
        <div :class="classLogin">
          <Login/>
        </div>
      </template>
      <template v-slot:sidebar>
        <h3 class="subtitle is-4">
          Latest Posts
        </h3>
        <posts-grid :per-row="1" :number="2" />
      </template>
    </main-section>
  </div>
</template>
<script>
import QuoteCard from '~/components/cards/QuoteCard'
import Login from '~/components/Login'
export default {
    head() {
        return {
            title: `About | ${this.$siteConfig.siteName}`
        }
    },
    computed: {
        classContent() {
            return this.$store.state.localStorage.userData != null ? 'content' : 'is-hidden'
        },
        classLogin() {
            return this.$store.state.localStorage.userData == null ? 'content' : 'is-hidden'
        }
    },
    components: { QuoteCard,Login }
}
</script>
