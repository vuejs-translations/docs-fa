# مسیریابی - Routing {#routing}

## مسیریابی سمت کلاینت در برابر مسیریابی سمت سرور {#client-side-vs-server-side-routing}

routing در سمت سرور به این معنی است که سرور بر اساس مسیر URL که کاربر آن را درخواست کرده است، یک پاسخ ارسال می‌کند. زمانی که روی یک لینک در یک برنامه وب سنتی که در سمت سرور رندر می‌شود کلیک می‌کنیم، مرورگر HTML جدیدی از سرور دریافت می‌کند و کل صفحه را با HTML جدید مجدداً بارگذاری می‌کند.

اما در یک [برنامه تک‌صفحه‌ای](https://developer.mozilla.org/en-US/docs/Glossary/SPA) (SPA)، جاوااسکریپت در سمت کلاینت می‌تواند routing را انجام دهد، به صورت پویا داده‌های جدید بگیرد و صفحه فعلی را بدون بارگذاری مجدد کامل صفحه، به‌روزرسانی کند. این معمولا منجر به تجربه کاربری سریع‌تر می‌شود، به ویژه برای موارد استفاده‌ای که بیشتر شبیه به "برنامه" واقعی هستند، جایی که انتظار می‌رود کاربر تعاملات زیادی را در مدت زمان استفاده از برنامه انجام دهد.

در چنین SPA‌ هایی، "routing" در سمت کلاینت، در مرورگر انجام می‌شود. یک router (مسیریاب) در سمت کلاینت مسئول مدیریت view رندر شده برنامه با استفاده از API‌های مرورگر مانند [History API](https://developer.mozilla.org/en-US/docs/Web/API/History) یا [رویداد `hashchange`](https://developer.mozilla.org/en-US/docs/Web/API/Window/hashchange_event) است.

## مسیریاب رسمی | Official Router {#official-router}

<!-- TODO update links -->
<div>
  <VueSchoolLink href="https://vueschool.io/courses/vue-router-4-for-everyone" title="Free Vue Router Course">
    دوره رایگان Vue Router را در Vue School ببینید
  </VueSchoolLink>
</div>

Vue برای ساختن SPA ‌ها بسیار مناسب است. برای اکثر SPA‌ ها، استفاده از کتابخانه رسمی [Vue Router](https://github.com/vuejs/router) توصیه می‌شود. برای جزئیات بیشتر، [مستندات](https://router.vuejs.org/) Vue Router را ببینید.

## مسیریابی ساده از ابتدا | Simple Routing from Scratch {#simple-routing-from-scratch}

اگر فقط به یک routing بسیار ساده نیاز دارید و نمی‌خواهید از یک کتابخانه router کامل استفاده کنید، می‌توانید از [Dynamic Components](/guide/essentials/component-basics#dynamic-components) و به‌روزرسانی state کامپوننت فعلی با گوش دادن به [رویدادهای `hashchange`](https://developer.mozilla.org/en-US/docs/Web/API/Window/hashchange_event) مرورگر یا استفاده از [History API](https://developer.mozilla.org/en-US/docs/Web/API/History)، عمل مسیریابی را انجام دهید.

در زیر یک نمونه ساده آورده شده است:

<div class="composition-api">

```vue
<script setup>
import { ref, computed } from 'vue'
import Home from './Home.vue'
import About from './About.vue'
import NotFound from './NotFound.vue'

const routes = {
  '/': Home,
  '/about': About
}

const currentPath = ref(window.location.hash)

window.addEventListener('hashchange', () => {
  currentPath.value = window.location.hash
})

const currentView = computed(() => {
  return routes[currentPath.value.slice(1) || '/'] || NotFound
})
</script>

<template>
  <a href="#/">Home</a> |
  <a href="#/about">About</a> |
  <a href="#/non-existent-path">Broken Link</a>
  <component :is="currentView" />
</template>
```

[امتحان این مورد در Playground](https://play.vuejs.org/#eNptUk1vgkAQ/SsTegAThZp4MmhikzY9mKanXkoPWxjLRpgly6JN1P/eWb5Eywlm572ZN2/m5GyKwj9U6CydsIy1LAyUaKpiHZHMC6UNnEDjbgqxyovKYAIX2GmVg8sktwe9qhzbdz+wga15TW++VWX6fB3dAt6UeVEVJT2me2hhEcWKSgOamVjCCk4RAbiBu6xbT5tI2ML8VDeI6HLlxZXWSOZdmJTJPJB3lJSoo5+pWBipyE9FmU4soU2IJHk+MGUrS4OE2nMtIk4F/aA7BW8Cq3WjYlDbP4isQu4wVp0F1Q1uFH1IPDK+c9cb1NW8B03tyJ//uvhlJmP05hM4n60TX/bb2db0CoNmpbxMDgzmRSYMcgQQCkjZhlXkPASRs7YmhoFYw/k+WXvKiNrTcQgpmuFv7ZOZFSyQ4U9a7ZFgK2lvSTXFDqmIQbCUJTMHFkQOBAwKg16kM3W6O7K3eSs+nbeK+eee1V/XKK0dY4Q3vLhR6uJxMUK8/AFKaB6k)

</div>

<div class="options-api">

```vue
<script>
import Home from './Home.vue'
import About from './About.vue'
import NotFound from './NotFound.vue'

const routes = {
  '/': Home,
  '/about': About
}

export default {
  data() {
    return {
      currentPath: window.location.hash
    }
  },
  computed: {
    currentView() {
      return routes[this.currentPath.slice(1) || '/'] || NotFound
    }
  },
  mounted() {
    window.addEventListener('hashchange', () => {
		  this.currentPath = window.location.hash
		})
  }
}
</script>

<template>
  <a href="#/">Home</a> |
  <a href="#/about">About</a> |
  <a href="#/non-existent-path">Broken Link</a>
  <component :is="currentView" />
</template>
```

[امتحان این مورد در Playground](https://play.vuejs.org/#eNptUstO6zAQ/ZVR7iKtVJKLxCpKK3Gli1ggxIoNZmGSKbFoxpEzoUi0/87YeVBKNonHPmfOmcdndN00yXuHURblbeFMwxtFpm6sY7i1NcLW2RriJPWBB8bT8/WL7Xh6D9FPwL3lG9tROWHGiwGmqLDUMjhhYgtr+FQEEKdxFqRXfaR9YrkKAoqOnocfQaDEre523PNKzXqx7M8ADrlzNEYAReccEj9orjLYGyrtPtnZQrOxlFS6rXqgZJdPUC5s3YivMhuTDCkeDe6/dSalvognrkybnIgl7c4UuLhcwuHgS3v2/7EPvzRruRXJ7/SDU12W/98l451pGQndIvaWi0rTK8YrEPx64ymKFQOce5DOzlfs4cdlkA+NzdNpBSRgrJudZpQIINdQOdyuVfQnVdHGzydP9QYO549hXIII45qHkKUL/Ail8EUjBgX+z9k3JLgz9OZJgeInYElAkJlWmCcDUBGkAsrTyWS0isYV9bv803x1OTiWwzlrWtxZ2lDGDO90mWepV3+vZojHL3QQKQE=)

</div>
