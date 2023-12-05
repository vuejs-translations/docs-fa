# کامپوننت‌های غیرهمگام {#async-components}

## کاربرد اصلی {#basic-usage}

در برنامه‌های بزرگ، ممکن است لازم باشد برنامه را به تکه‌های کوچکتر تقسیم کنیم و فقط در هنگام نیاز به یک کامپوننت، آن را از سرور بارگذاری کنیم. در Vue تابع [`defineAsyncComponent`](/api/general#defineasynccomponent)  این خواسته را محقق می‌سازد:

```js
import { defineAsyncComponent } from 'vue'

const AsyncComp = defineAsyncComponent(() => {
  return new Promise((resolve, reject) => {
    // ... بارگذاری کامپوننت از سرور
    resolve(/* loaded component */)
  })
})
// ... استفاده از "asyncComp" مثل یک کامپوننت عادی
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

عملیات‌های ناهمگام ناگزیر شامل حالت‌های بارگذاری و خطا هستند، `defineAsyncComponent()` از طریق گزینه‌های پیشرفته از مدیریت این حالات پشتیبانی می‌کند:

```js
const AsyncComp = defineAsyncComponent({
  // the loader function
  loader: () => import('./Foo.vue'),

  // A component to use while the async component is loading
  loadingComponent: LoadingComponent,
  // Delay before showing the loading component. Default: 200ms.
  delay: 200,

  // A component to use if the load fails
  errorComponent: ErrorComponent,
  // The error component will be displayed if a timeout is
  // provided and exceeded. Default: Infinity.
  timeout: 3000
})
```

اگر یک کامپوننت loading ارائه شود، در ابتدا آن نمایش داده می‌شود مادامی که کامپوننت داخلی در حال بارگذاری است. یک تأخیر پیش فرض ۲۰۰ میلی ثانیه قبل از نمایش کامپوننت loading وجود دارد. این (تاخیر) به این دلیل است که در شبکه‌های پرسرعت، یک وضعیت loading آنی و لحظه‌ای، ممکن است خیلی سریع (با کامپوننت اصلی) جایگزین شود و در نهایت مانند یک لرزش تصویر به نظر برسد.

اگر یک کامپوننت خطا ارائه شود، زمانی نمایش داده می‌شود که Promise برگردانده شده توسط تابع بارگذار رد شود. همچنین می‌توانید یک تایم‌اوت را مشخص کنید تا کامپوننت خطا، زمانی که درخواست خیلی طول می کشد نمایش داده شود.

## کاربرد Suspence در ترکیب با کامپوننت‌های ناهمگام {#using-with-suspense}

کامپوننت‌های ناهمگام می‌توانند همراه با کامپوننت داخلی `<Suspense>` استفاده شوند. تعامل بین `<Suspense>` و کامپوننت‌های ناهمگام در [بخش تخصیص‌یافته‌شده به `<Suspense>`](/guide/built-ins/suspense) مستند شده است.
