<template>
  <div id="about-page" class="page-wrapper about-page content-page">
    <site-hero
      title="About IKA Geo UB"
      subtitle="Tentang Ikatan Alumni Geofisika Universitas Brawijaya"
      image="/uploads/about-hero.jpg"
    ></site-hero>
    <main-section theme="sidebar-right">
      <template v-slot:default>
        <div class="content">
          <h3>Latar Belakang</h3>
          <p>
            latar belakang berdirinya IKA Geofisika Universitas Brawijaya
          </p>
          <h3>Kronologi Pembentukan</h3>
          <p>
            -
          </p>
          <h3>Musyawarah Besar</h3>
          <p>
            -
          </p>
          <h3>Logo</h3>
          <p>
            -
          </p>
          <h3>Struktur Organisasi</h3>
          <p>
            -
          </p>
          <h3>Program Kerja</h3>
          <p>
            -
          </p>
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
export default {
    head() {
        return {
            title: `About | ${this.$siteConfig.siteName}`
        }
    },
    components: { QuoteCard }
}
</script>
