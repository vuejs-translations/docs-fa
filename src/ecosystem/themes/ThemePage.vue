<script setup lang="ts">
import ThemeHero from './ThemeHero.vue'
import ThemeList from './ThemeList.vue'
import ThemeContact from './ThemeContact.vue'
</script>

<template>
  <div class="ThemePage">
    <ThemeHero>
      <template #title>تم‌ها</template>
      <template #lead
        >می‌توانید با بررسی تم‌ها، کیت‌های رابط کاربری و افزونه‌های ساخته
        شده توسط شرکای ما، نحوه ساخت یک اپلیکیشن واقعی با Vue را مشاهده
        کنید.</template
      >
    </ThemeHero>

    <ThemeList />

    <ThemeContact>
      آیا می‌خواهید تم‌های خود را در اینجا نمایش دهید؟
      <a
        class="link"
        href="mailto:evan@vuejs.org?subject=Theme+affiliation"
        >با ما ارتباط بگیرید!</a
      >
    </ThemeContact>
  </div>
</template>
