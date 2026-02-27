# نصب در محیط Production {#production-deployment}

## Development در مقابل Production {#development-vs-production}

در ‌حین توسعه، Vue چندین ویژگی برای بهبود تجربه توسعه ارائه می‌دهد:

- هشدار برای خطاها و مشکلات رایج
- اعتبارسنجی props / events
- [هوک‌های دیباگ Reactivity](/guide/extras/reactivity-in-depth#reactivity-debugging)
- یکپارچه سازی Devtools

با این حال، وجود این ویژگی‌ها در production بی‌فایده است. هنگام استقرار در production، برخی از بررسی‌ها برای دادن اخطار نیز می توانند مقدار کمی سربار عملکردی را به همراه داشته باشند. برای کاهش اندازه خروجی و بهبود عملکرد
باید تمام کد‌های اضافی را حذف کرد.

## بدون ابزارهای ساخت build {#without-build-tools}

اگر از Vue بدون ابزار build با بارگیری از CDN یا اسکریپت میزبانی شده خود استفاده می‌کنید، هنگام استقرار در production مطمئن شوید که از production build (فایل‌های dist که با `‎.prod.js` تمام می‌شوند) استفاده می‌کنید.  production buildها قبلاً کوچک شده‌اند و تمام شاخه‌های کد برای محیط توسعه از قبل حذف شده‌اند.

- اگر از build جهانی استفاده می‌کنید (دسترسی از طریق جهانی `Vue`): از `vue.global.prod.js` استفاده کنید.
- اگر از ESM build استفاده می‌کنید (دسترسی از طریق import محلی ESM): از `vue.esm-browser.prod.js` استفاده کنید.

برای جزئیات بیشتر به [راهنمای فایل dist](https://github.com/vuejs/core/tree/main/packages/vue#which-dist-file-to-use) مراجعه کنید.

## با استفاده از ابزارهای build  {#with-build-tools}

پروژه‌های ایجاد شده با `create-vue` (مبتنی بر Vite) یا Vue CLI (مبتنی بر webpack) از پیش برای production build پیکربندی شده‌اند.

اگر از یک راه‌اندازی سفارشی استفاده می‌کنید، مطمئن شوید که:

1. `vue` به `vue.runtime.esm-bundler.js` ختم شده است.
2. [فلگ‌های زمان کامپایل](/api/compile-time-flags) به درستی پیکربندی شده‌اند.
3. <code>process.env<wbr>.NODE_ENV</code> در زمان build با "production" جایگزین شده است.

مراجع اضافی:

- [راهنمای ساخت production در Vite](https://vite.dev/guide/build.html)
- [راهنمای استقرار Vite](https://vite.dev/guide/static-deploy.html)
- [راهنمای استقرار Vue CLI](https://cli.vuejs.org/guide/deployment.html)

## ردیابی خطاهای رانتایم {#tracking-runtime-errors}

می‌توان از [app-level error handler](/api/application#app-config-errorhandler) برای گزارش خطاها به سرویس‌های ردیابی و جمع آوری خطا استفاده کرد:

```js
import { createApp } from 'vue'

const app = createApp(...)

app.config.errorHandler = (err, instance, info) => {
  // گزارش خطا به سرویس‌های ردیابی
}
```

سرویس‌هایی مانند [Sentry](https://docs.sentry.io/platforms/javascript/guides/vue/) و [Bugsnag](https://docs.bugsnag.com/platforms/javascript/vue/) یکپارچه سازی رسمی برای Vue ارائه می‌دهند.
