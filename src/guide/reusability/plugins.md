# پلاگین‌ها - Plugins {#plugins}

## مقدمه {#introduction}

پلاگین‌ها کدهای مستقلی هستند که معمولاً عملکردهایی را در سطح برنامه به Vue اضافه می کنند. وقتی از یک پلاگین در برنامه Vue.js استفاده می‌کنید، کدهایی را اضافه می‌کنید که عملکرد برنامه شما را با ارائه ویژگی‌ها یا ابزارهای اضافی که می‌توان به آنها دسترسی پیدا کرد و در سراسر برنامه استفاده کرد، گسترش می‌دهد. به روش زیر پلاگین را نصب می‌کنیم:

```js
import { createApp } from 'vue'

const app = createApp({})

app.use(myPlugin, {
  /* آپشن‌های اختیاری */
})
```

یک پلاگین یا به عنوان یک آبجکت تعریف می‌شود که یک متد `install()‎` دارد، یا به سادگی یک تابع است که خودش به  عنوان تابع نصب عمل می‌کند. این تابع می‌تواند دسترسی به [نمونه برنامه](/api/application)  اصلی شما داشته باشد و همچنین اگر شما در زمان استفاده از پلاگین (استفاده از `app.use()‎`) آپشن‌های اضافی ارائه کرده باشید، این آپشن‌ها را نیز دریافت کند.

```js
const myPlugin = {
  install(app, options) {
    // برنامه را کانفیگ کنید
  }
}
```

مواقع رایجی که استفاده از پلاگین‌ها مفید است عبارتند از:

1. ثبت یک یا چند کامپوننت سراسری یا دستورات سفارشی با استفاده از [`app.component()‎`](/api/application#app-component) و [`app.directive()‎`](/api/application#app-directive).

2. ایجاد یک منبع قابل تزریق ([injectable](/guide/components/provide-inject)) در سراسر برنامه با فراخوانی [`app.provide()‎`](/api/application#app-provide).

3. اضافه کردن ویژگی‌ها یا متدهای سراسری با اتصال آنها به [`app.config.globalProperties`](/api/application#app-config-globalproperties).

4. کتابخانه‌ای که باید ترکیبی از موارد فوق را انجام دهد (مثلاً [vue-router](https://github.com/vuejs/vue-router-next)).

## نوشتن یک پلاگین‌ {#writing-a-plugin}

به منظور درک بهتر نحوه ایجاد پلاگین‌ها در Vue.js، ما یک نسخه ساده شده از یک پلاگین‌ را ایجاد خواهیم کرد که رشته‌های `i18n` (کوتاه شده ی [Internationalization یا همان بین‌المللی‌سازی](https://fa.wikipedia.org/wiki/%D8%A8%DB%8C%D9%86%E2%80%8C%D8%A7%D9%84%D9%85%D9%84%D9%84%DB%8C%E2%80%8C%D8%B3%D8%A7%D8%B2%DB%8C_%D9%88_%D9%85%D8%AD%D9%84%DB%8C%E2%80%8C%D8%B3%D8%A7%D8%B2%DB%8C)) را نمایش می‌دهد.

بیایید با آبجکت پلاگین شروع کنیم. توصیه می‌شود که آن را در یک فایل جداگانه ایجاد کرده و آن را اکسپورت کنید، همانطور که در زیر نشان داده شده است تا منطق کد ایزوله باقی بماند.

```js
// plugins/i18n.js
export default {
  install: (app, options) => {
    // کد پلاگین اینجا نوشته می شود.
  }
}
```

می‌خواهیم یک تابع ترجمه ایجاد کنیم که یک رشته به عنوان ورودی دریافت کند. این رشته به ما کمک می‌کند تا مقدار ترجمه‌شده مرتبط را در گزینه‌هایی که توسط کاربر ارائه شده است جستجو کنیم. این تابع برای استفاده در تمپلیت طراحی شده است.

```vue-html
<h1>{{ $translate('greetings.hello') }}</h1>
```

از آنجایی که این تابع باید به صورت گلوبال در تمام تمپلیت‌ها در دسترس باشد، آن را به `app.config.globalProperties` متصل می‌کنیم:

```js{4-11}
// plugins/i18n.js
export default {
  install: (app, options) => {
    // به شکل سراسری $translate() تزریق متد
    app.config.globalProperties.$translate = (key) => {
      // `options` یافتن یک ویژگی تو در تو در 
      // به عنوان مسیر `key` با استفاده از
      return key.split('.').reduce((o, i) => {
        if (o) return o[i]
      }, options)
    }
  }
}
```

تابع `‎$translate` ما یک رشته مانند `greetings.hello` را دریافت می‌کند، در تنظیماتی که توسط کاربر ارائه شده است جستجو می‌کند و مقدار ترجمه‌شده را باز می‌گرداند.

در هنگام نصب پلاگین، باید آبجکت حاوی مقادیر ترجمه شده را به `app.use()‎` منتقل کنیم:

```js
import i18nPlugin from './plugins/i18n'

app.use(i18nPlugin, {
  greetings: {
    hello: 'Bonjour!'
  }
})
```

حالا، عبارت اولیه ما `‎$translate('greetings.hello')` در زمان اجرا با  `Bonjour!‎` جایگزین می‌شود.

مشاهده کنید: [افزودن ویژگی‌های جهانی](/guide/typescript/options-api#augmenting-global-properties) <sup class="vt-badge ts" />

:::tip نکته
از پراپرتی‌های سراسری با احتیاط استفاده کنید، زیرا اگر تعداد زیادی از پراپرتی‌های سراسری توسط پلاگین‌های مختلف در سراسر برنامه استفاده شوند، گیج کننده خواهد بود.
:::

### ارائه / تزریق پلاگین {#provide-inject-with-plugins}

افزونه‌ها این امکان را فراهم می‌کنند که با استفاده از `provide`، دسترسی به یک تابع یا ویژگی خاص را در اختیار کاربران افزونه قرار دهیم. برای نمونه، می‌توان به برنامه اجازه داد تا به پارامتر `options` دسترسی داشته باشد تا بتواند از آبجکت حاوی مقادیر ترجمه شده استفاده کند.

```js{10}
// plugins/i18n.js
export default {
  install: (app, options) => {
    app.provide('i18n', options)
  }
}
```

کاربران پلاگین‌ اکنون می توانند با استفاده از کلید `i18n` پراپرتی‌های پلاگین‌ را به کامپوننت خود تزریق کنند:

<div class="composition-api">

```vue
<script setup>
import { inject } from 'vue'

const i18n = inject('i18n')

console.log(i18n.greetings.hello)
</script>
```

</div>
<div class="options-api">

```js
export default {
  inject: ['i18n'],
  created() {
    console.log(this.i18n.greetings.hello)
  }
}
```

</div>

### نسخه باندل شده برای NPM

اگر بخواهید پلاگین خود را برای استفاده دیگران بسازید و منتشر کنید، به [بخش Vite در حالت کتابخانه](https://vitejs.dev/guide/build.html#library-mode) مراجعه کنید.
