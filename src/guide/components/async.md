# کامپوننت‌های غیرهمگام - Async Components {#async-components}

## کاربرد اصلی {#basic-usage}

در برنامه‌های بزرگ، ممکن است لازم باشد برنامه را به بخش‌های کوچکتر تقسیم کنیم و فقط در هنگام نیاز به یک کامپوننت، آن را از سرور بارگذاری کنیم. در Vue تابع [`defineAsyncComponent`](/api/general#defineasynccomponent) این خواسته را محقق می‌سازد:

```js
import { defineAsyncComponent } from 'vue'

const AsyncComp = defineAsyncComponent(() => {
  return new Promise((resolve, reject) => {
    // ... بارگیری کامپوننت از سرور
    resolve(/* کامپوننت بارگذاری شده */)
  })
})
// ...  مانند یک کامپوننت معمولی استفاده کنید `AsyncComp` از
```

همانطور که می‌بینید، `defineAsyncComponent` یک تابع بارگذار (loader) را می‌پذیرد که یک Promise را برمی‌گرداند. هنگامی که تعریف کامپوننت شما از سرور دریافت شد، تابع `resolve` در Promise بازگشتی، باید فراخوانی شود. همچنین می‌توانید با فراخوانی `reject(reason)` نشان دهید بارگذاری شکست خورده است.

استفاده از [import  پویای ماژول ES](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import) نیز یک Promise را برمی‌گرداند، بنابراین بیشتر اوقات از آن در ترکیب با  `defineAsyncComponent` استفاده می‌کنیم. Bundler هایی مانند Vite و webpack نیز از این ترکیب پشتیبانی می‌کنند (و از آن به عنوان نقاط تقسیم Bundle استفاده می‌کنند)، بنابراین می‌توانیم از آن برای import کردن Vue SFC استفاده کنیم:

```js
import { defineAsyncComponent } from 'vue'

const AsyncComp = defineAsyncComponent(() =>
  import('./components/MyComponent.vue')
)
```

کامپوننت `AsyncComp` حاصل از این فرایند، یک کامپوننتِ لفافه (Wrapper) است که تابع بارگذار (loader) را تنها زمانی فراخوانی می کند که کامپوننتِ داخلی آن در صفحه رندر شده باشد. علاوه بر این، AsyncComp هرگونه پراپ (Prop) و اسلات (Slot) را به کامپوننت داخلی پاس می‌دهد، بنابراین می‌توانید از این لفافه ناهمگام (Async Wrapper) برای جایگزینیِ بدون مشکل کامپوننتِ اصلی، همراه با دستیابی به بارگذاریِ تنبلانه (Lazy Loading) استفاده کنید.

همانند کامپوننت‌های عادی، کامپوننت‌های ناهمگام را می‌توان با استفاده از `()app.component`  [به طور سراسری ثبت کرد:](/guide/components/registration#global-registration)

```js
app.component('MyComponent', defineAsyncComponent(() =>
  import('./components/MyComponent.vue')
))
```

<div class="options-api">

همچنین می‌توانید از `defineAsyncComponent` هنگام [ثبت محلی یک کامپوننت](/guide/components/registration#local-registration) استفاده کنید:

```vue
<script>
import { defineAsyncComponent } from 'vue'

export default {
  components: {
    AdminPage: defineAsyncComponent(() =>
      import('./components/AdminPageComponent.vue')
    )
  }
}
</script>

<template>
  <AdminPage />
</template>
```

</div>

<div class="composition-api">

این کامپوننت‌ها همچنین می‌توانند به صورت مستقیم، درون کامپوننت والد خود تعریف شوند:

```vue
<script setup>
import { defineAsyncComponent } from 'vue'

const AdminPage = defineAsyncComponent(() =>
  import('./components/AdminPageComponent.vue')
)
</script>

<template>
  <AdminPage />
</template>
```

</div>

## حالت‌های loading و خطا {#loading-and-error-states}

عملیات‌های ناهمگام ناگزیر شامل حالت‌های loading و error هستند، `defineAsyncComponent()‎` از طریق گزینه‌های پیشرفته از مدیریت این حالات پشتیبانی می‌کند:

```js
const AsyncComp = defineAsyncComponent({
  // loader تابع
  loader: () => import('./Foo.vue'),

  // async کامپوننتی برای استفاده در حین لود کامپوننت
  loadingComponent: LoadingComponent,
  // تاخیر قبل از نمایش کامپوننت لودینگ. پیش‌فرض: 200 میلی‌ثانیه
  delay: 200,

  // کامپوننتی برای استفاده در صورت خطا در بارگذاری
  errorComponent: ErrorComponent,
  // در صورت تعریف مهلت زمانی و طول کشیدن بیش از آن
  // کامپوننت خطا نمایش داده می شود. پیش فرض: بی نهایت
  timeout: 3000
})
```

اگر یک کامپوننت loading ارائه شود، در ابتدا آن نمایش داده می‌شود تا زمانی که کامپوننت داخلی در حال بارگذاری است. یک تأخیر پیش فرض ۲۰۰ میلی ثانیه قبل از نمایش کامپوننت loading وجود دارد. این (تاخیر) به این دلیل است که در شبکه‌های پرسرعت، یک loading آنی و لحظه‌ای، ممکن است خیلی سریع (با کامپوننت اصلی) جایگزین شود و در نهایت مانند یک لرزش تصویر به نظر برسد.

اگر یک کامپوننت خطا ارائه شود، زمانی نمایش داده می‌شود که Promise برگردانده شده توسط تابع بارگذار رد شود. همچنین می‌توانید یک تایم‌اوت را مشخص کنید تا کامپوننت خطا، زمانی که درخواست خیلی طول می‌کشد نمایش داده شود.

## هایدریشن تنبل (lazy) <sup class="vt-badge" data-text="3.5+" /> {#lazy-hydration}

>این بخش فقط زمانی کاربرد دارد که از [رندرینگ سمت سرور](/guide/scaling-up/ssr) استفاده می‌کنید.

در Vue 3.5+، کامپوننت‌های ناهمگام می‌توانند زمان هیدراته شدن خود را با ارائه یک استراتژی هایدریشن کنترل کنند.

- Vue چندین استراتژی هایدریشن داخلی ارائه می‌دهد. این استراتژی‌های داخلی باید به صورت جداگانه ایمپورت شوند تا در صورت عدم استفاده، از درخت پروژه حذف شوند (tree-shaken).

- طراحی این قابلیت عمداً در سطح پایین انجام شده تا انعطاف‌پذیری بیشتری داشته باشد. ممکن است در آینده سینتکس راحت‌تری برای این قابلیت در هسته یا راه‌حل‌های سطح بالاتر (مثل Nuxt) اضافه شود.

### هایدرشن در زمان بیکار (Idle) {#hydrate-on-idle}

هایدرشن با استفاده از `requestIdleCallback`. (یعنی وقتی کاربر هیچ فعالیتی انجام نمی‌دهد و پردازش‌های ضروری دیگری در مرورگر وجود ندارد)

```js
import { defineAsyncComponent, hydrateOnIdle } from 'vue'

const AsyncComp = defineAsyncComponent({
  loader: () => import('./Comp.vue'),
  hydrate: hydrateOnIdle(/* optionally pass a max timeout */)
})
```

### هایدریشن در زمان دیده شدن {#hydrate-on-visible}

هایدریشن زمانی که عنصر(ها) از طریق `IntersectionObserver` قابل مشاهده شوند.

```js
import { defineAsyncComponent, hydrateOnVisible } from 'vue'

const AsyncComp = defineAsyncComponent({
  loader: () => import('./Comp.vue'),
  hydrate: hydrateOnVisible()
})
```

می‌توانید به‌صورت اختیاری یک آبجکت تنظیمات برای مشاهده‌گر ارسال کنید:

```js
hydrateOnVisible({ rootMargin: '100px' })
```

### هایدریشن بر اساس Media Query {#hydrate-on-media-query}

هایدریشن زمانی که کوئری مشخص شده منطبق باشد.

```js
import { defineAsyncComponent, hydrateOnMediaQuery } from 'vue'

const AsyncComp = defineAsyncComponent({
  loader: () => import('./Comp.vue'),
  hydrate: hydrateOnMediaQuery('(max-width:500px)')
})
```

### هایدریشن بر اساس تعامل {#hydrate-on-interaction}

هایدریشن زمانی که رویداد(های) مشخص شده بر روی عنصر(های) کامپوننت اتفاق بیفتد. رویدادی که هایدریشن را تحریک کرده است، پس از تکمیل هایدریشن نیز دوباره پخش خواهد شد.

```js
import { defineAsyncComponent, hydrateOnInteraction } from 'vue'

const AsyncComp = defineAsyncComponent({
  loader: () => import('./Comp.vue'),
  hydrate: hydrateOnInteraction('click')
})
```

همچنین می‌تواند یک لیست از چندین تایپ رویداد باشد:

```js
hydrateOnInteraction(['wheel', 'mouseover'])
```

### استراتژی سفارشی {#custom-strategy}

```ts
import { defineAsyncComponent, type HydrationStrategy } from 'vue'

const myStrategy: HydrationStrategy = (hydrate, forEachElement) => {
  // forEachElement is a helper to iterate through all the root elements
  // in the component's non-hydrated DOM, since the root can be a fragment
  // instead of a single element
  forEachElement(el => {
    // ...
  })
  // call `hydrate` when ready
  hydrate()
  return () => {
    // return a teardown function if needed
  }
}

const AsyncComp = defineAsyncComponent({
  loader: () => import('./Comp.vue'),
  hydrate: myStrategy
})
```

## کاربرد Suspence در ترکیب با کامپوننت‌های ناهمگام {#using-with-suspense}

کامپوننت‌های ناهمگام می‌توانند همراه با کامپوننت داخلی `<Suspense>` استفاده شوند. تعامل بین `<Suspense>` و کامپوننت‌های ناهمگام در [بخش تخصیص‌یافته‌شده به `<Suspense>`](/guide/built-ins/suspense) مستند شده است.
