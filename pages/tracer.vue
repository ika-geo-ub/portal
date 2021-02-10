<template>
  <div id="about-page" class="page-wrapper about-page content-page">
    <site-hero
      title="About Us"
      subtitle="Example About Page"
      image="/uploads/about-tracer.jpg"
    ></site-hero>
    <main-section theme="sidebar-right">
      <template v-slot:default>
        
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
export default {
    head() {
        return {
            title: `About | ${this.$siteConfig.siteName}`
        }
    },
    components: { QuoteCard }
}
</script>
