# افزونه ها {#plugins}

## مقدمه {#introduction}

پلاگین ها کدهای مستقلی هستند که معمولاً عملکردهایی را در سطح برنامه به Vue اضافه می کنند.وقتی از یک افزونه در برنامه Vue.js استفاده می‌کنید، کدهایی را اضافه می‌کنید که عملکرد برنامه شما را با ارائه ویژگی‌ها یا ابزارهای اضافی که می‌توان به آنها دسترسی پیدا کرد و در سراسر برنامه استفاده کرد، گسترش می‌دهد. به روش زیر پلاگین را نصب می کنیم:

```js
import { createApp } from 'vue'

const app = createApp({})

app.use(myPlugin, {
/* گزینه های اختیاری */
})
```

یک افزونه یا به عنوان یک شی تعریف می‌شود که یک متد `install()` دارد ، یا به سادگی یک تابع است که خودش به عنوان تابع نصب عمل می‌کند.
این تابع می‌تواند دسترسی به[ نمونه برنامه](/api/application)  اصلی شما داشته باشد و همچنین اگر شما در زمان استفاده از افزونه (استفاده از `app.use()`) گزینه‌های اضافی ارائه کرده باشید، این گزینه‌ها را نیز دریافت کند.
```js
const myPlugin = {
  install(app, options) {
// برنامه را کانفیگ کنید
  }
}
```

 مواقع رایجی که استفاده از افزونه‌ها مفید است عبارتند از:

1. ثبت یک یا چند کامپوننت سراسری یا دستورات سفارشی با استفاده از [`app.component()`](/api/application#app-component) و [`app.directive()`](/api/application#app-directive).

2. ایجاد یک منبع قابل تزریق ([injectable](/guide/components/provide-inject)) در سراسر برنامه با فراخوانی [`app.provide()`](/api/application#app-provide).

3. اضافه کردن ویژگی‌ها یا متدهای گلوبال با اتصال آنها به [`app.config.globalProperties`](/api/application#app-config-globalproperties).

4. کتابخانه ای که باید ترکیبی از موارد فوق را انجام دهد (مثلاً [vue-router](https://github.com/vuejs/vue-router-next)).


## نوشتن یک افزونه {#writing-a-plugin}

به منظور درک بهتر نحوه ایجاد افزونه‌ها در Vue.js، ما یک نسخه ساده‌شده از یک افزونه را ایجاد خواهیم کرد که رشته‌های `i18n` ([بین‌المللی‌سازی](https://en.wikipedia.org/wiki/Internationalization_and_localization)) را نمایش می‌دهد.

بیایید با شی پلاگین شروع کنیم. توصیه می شود که آن را در یک فایل جداگانه ایجاد کرده و آن را اکسپورت کنید، همانطور که در زیر نشان داده شده است تا منطق کد ایزوله باقی بماند.

```js
// plugins/i18n.js
export default {
  install: (app, options) => {
// کد افزونه اینجا نوشته می شود.
  }
}
```
می‌خواهیم یک تابع ترجمه ایجاد کنیم که یک رشته به عنوان ورودی دریافت کند. این رشته به ما کمک می‌کند تا مقدار ترجمه‌شده مرتبط را در گزینه‌هایی که توسط کاربر ارائه شده است جستجو کنیم. این تابع برای استفاده در تمپلیت طراحی شده است.

```vue-html
<h1>{{ $translate('greetings.hello') }}</h1>
```

از آنجایی که این تابع باید به صورت گلوبال در تمام تمپلیت ها در دسترس باشد،آن را به `app.config.globalProperties` متصل می کنیم:
```js{4-11}
// plugins/i18n.js
export default {
  install: (app, options) => {
    app.config.globalProperties.$translate = (key) => {
      return key.split('.').reduce((o, i) => {
        if (o) return o[i]
      }, options)
    }
  }
}
```

تابع `$translate` ما یک رشته مانند `greetings.hello` را دریافت می‌کند، در تنظیماتی که توسط کاربر ارائه شده است جستجو می‌کند و مقدار ترجمه‌شده را بازمی‌گرداند.


در هنگام نصب افزونه، باید شیء حاوی مقادیر ترجمه شده را به `app.use()` منتقل کنیم:


```js
import i18nPlugin from './plugins/i18n'

app.use(i18nPlugin, {
  greetings: {
    hello: 'Bonjour!'
  }
})
```

حالا، عبارت اولیه ما `$translate('greetings.hello')` در زمان اجرا با  `Bonjour!` جایگزین می‌شود.

مشاهده کنید: [افزودن ویژگی‌های جهانی](/guide/typescript/options-api#augmenting-global-properties) <sup class="vt-badge ts" />

:::tip
از ویژگی‌های گلوبال با احتیاط استفاده کنید، زیرا اگر تعداد زیادی از ویژگی‌های گلوبال توسط افزونه‌های مختلف در سراسر برنامه استفاده شوند، گیج کننده خواهد بود.
:::

### ارائه / تزریق پلاگین {#provide-inject-with-plugins}

افزونه‌ها در Vue.js انعطاف‌پذیری را برای استفاده از ویژگی `inject` ارائه می‌دهند که به ما امکان می‌دهد یک عملکرد یا ویژگی را به کاربران افزونه ارائه دهیم.
به عنوان مثال، ما می‌توانیم امکان دسترسی به پارامتر `options` را به برنامه بدهیم تا بتواند از شیء حاوی مقادیر ترجمه شده استفاده کند.


```js{10}
// plugins/i18n.js
export default {
  install: (app, options) => {
    app.provide('i18n', options)
  }
}
```

کاربران افزونه اکنون می توانند با استفاده از کلید `i18n` گزینه های افزونه را استفاده کنند:

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
