<template>
  <div id="about-page" class="page-wrapper about-page content-page">
    <site-hero
      title="Careers"
      subtitle="Job Opportunities list"
      image="/uploads/about-hero.jpg"
    ></site-hero>
    <main-section theme="sidebar-right">
      <template v-slot:default>
        <div class="content">
          <h3>Career List</h3>
          <iframe
            class="airtable-embed"
            src="https://airtable.com/embed/shr0UhnkZVuRP3Un2?backgroundColor=gray"
            frameborder="0"
            onmousewheel=""
            width="100%"
            height="533"
            style="background: transparent; border: 1px solid #ccc;"
          ></iframe>
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
export default {
  head() {
    return {
      title: `About | ${this.$siteConfig.siteName}`
    }
  },
  components: {}
}
</script>
