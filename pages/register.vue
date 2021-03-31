<template>
  <div id="about-page" class="page-wrapper about-page content-page">
    <site-hero
      title="Register"
      subtitle="Member Registration"
      image="/uploads/about-tracer.jpg"
    ></site-hero><main-section >
      <template v-slot:default>
        <div class="content">
          <iframe
            class="airtable-embed"
            src="https://airtable.com/embed/shrsmHUAHOC9HRWVC?backgroundColor=gray&layout=card&viewControls=on"
            frameborder="0"
            onmousewheel=""
            width="100%"
            style="background: transparent; border: 1px solid #fff; height: 1950px;"
          ></iframe>
        </div>
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
