<script setup lang="ts">
import PageHero from '@theme/components/PageHero.vue'

defineProps<{ title?: string }>()
</script>

<template>
  <PageHero>
    <template #title>{{ title || 'شرکای Vue' }}</template>
    <template #lead>
      شرکای Vue آژانس‌های تأیید شده توسط تیم Vue هستند که خدمات مشاوره و
      توسعه Vue در سطح ممتاز را ارائه می‌دهند. اگر شرکت شما علاقه‌مند به
      لیست شدن به عنوان یک شریک است، لطفا
      <a class="link" href="https://airtable.com/shrCQhat57SApJI2l" target="_blank"
        >اینجا ثبت نام کنید</a
      >.
    </template>
  </PageHero>
</template>
