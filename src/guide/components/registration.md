# ثبت کامپوننت {#component-registration}

>در این صفحه فرض شده که شما از قبل [مبانی کامپوننت‌ها](/guide/essentials/component-basics) را مطالعه کرده اید. اگر با کامپوننت‌ها آشنایی ندارید، ابتدا آن را بخوانید.

<VueSchoolLink href="https://vueschool.io/lessons/vue-3-global-vs-local-vue-components" title="Free Vue.js Component Registration Lesson"/>

به منظور این که Vue موقع برخورد با کامپوننت در تمپلیت بتواند آن را پیدا کند و پیاده سازی کند، هر کامپوننت باید ثبت شود. دو راه برای ثبت کردن کامپوننت وجود دارد: سراسری و محلی.

## ثبت سراسری {#global-registration}

می‌توانیم با استفاده از متد `‎.component()‎` یک کامپوننت را بصورت سراسری در [اپلیکیشن Vue](/guide/essentials/application) در دسترس قرار دهیم.

```js
import { createApp } from 'vue'

const app = createApp({})

app.component(
  // اسم ثبت شده
  'MyComponent',
  // پیاده سازی کد
  {
    /* ... */
  }
)
```

اگر از SFCها استفاده می‌کنید، با import کردن فایل های `‎.vue` می‌توانید کامپوننت ها را ثبت کنید.

```js
import MyComponent from './App.vue'

app.component('MyComponent', MyComponent)
```

متد `‎.component()‎` می‌تواند بصورت زنجیره‌ای استفاده شود.

```js
app
  .component('ComponentA', ComponentA)
  .component('ComponentB', ComponentB)
  .component('ComponentC', ComponentC)
```

کامپوننت‌هایی که بصورت سراسری ثبت شده‌اند در تمپلیت تمام کامپوننت‌های برنامه قابل استفاده اند.

```vue-html
<!-- این کامپوننت‌ها در تمام کامپوننت‌های دیگر برنامه قابل استفاده هستند -->
<ComponentA/>
<ComponentB/>
<ComponentC/>
```

این قاعده برای کامپوننت‌های فرعی هم صادق است، به این معنی که ***هر سه این کامپوننت‌ها داخل یکدیگر قابل استفاده هستند***.

## ثبت محلی {#local-registration}

ثبت نام سراسری کامپوننت ها آسان است اما چند اشکال دارد:

1. ثبت کردن سراسری یک کامپوننت مانع build systemها می‌شود تا کامپوننت‌های استفاده نشده را شناسایی و حذف کنند(tree shaking). اگر یک کامپوننت بصورت سراسری ثبت شده باشد و در هیچ جایی از برنامه استفاده نشود، در باندل نهایی برنامه وجود خواهد داشت.

2. ثبت کردن سراسری باعث مبهم و نامشخص شدن روابط وابستگی در برنامه های بزرگ می‌شود. همچنین باعث می‌شود پیدا کردن  کامپوننت فرزند در کامپوننت والد که از آن استفاده می‌کند سخت تر شود. این موارد می‌تواند همان اثری را داشته باشند که استفاده کردن از متغیر‌های سراسری زیاد در نگه داری بلند مدت برنامه داشته باشند.

ثبت‌نام محلی دسترسی به کامپوننت‌های ثبت‌شده را محدود به کامپوننت فعلی می‌کند. این کار روابط وابستگی را روشن‌تر می‌کند و سازگاری بیشتری با عمل tree-shaking دارد.

<div class="composition-api">

هنگام استفاده از `<script setup>`، کامپوننت های import شده می‌توانند بصورت محلی و بدون ثبت استفاده شوند:

```vue
<script setup>
import ComponentA from './ComponentA.vue'
</script>

<template>
  <ComponentA />
</template>
```

در صورت عدم استفاده از `<script setup>`، نیاز به ثبت کردن کامپوننت در آپشن components دارید:

```js
import ComponentA from './ComponentA.js'

export default {
  components: {
    ComponentA
  },
  setup() {
    // ...
  }
}
```

</div>
<div class="options-api">

ثبت نام محلی با استفاده از "components" انجام می شود:

```vue
<script>
import ComponentA from './ComponentA.vue'

export default {
  components: {
    ComponentA
  }
}
</script>

<template>
  <ComponentA />
</template>
```

</div>

برای هر پراپرتی در آبجکت `components`، یک key برای اسم کامپوننت ساخته خواهد شد و value هم پیاده سازی کامپوننت می‌باشد. مثال بالا استفاده کردن از ویژگی shorthand در ES2015 است که معادل کد زیر می‌باشد:

```js
export default {
  components: {
    ComponentA: ComponentA
  }
  // ...
}
```

به یاد داشته باشید که **کامپوننت‌های محلی ثبت شده در کامپوننت‌های فرزند قابل استفاده نیستند**. در مورد `ComponentA`، فقط در همان کامپوننت قابل استفاده است و کامپوننت‌های فرزند یا نوادگان آن به آن دسترسی ندارند.

## نحوه نام گذاری کامپوننت‌ها {#component-name-casing}

در این قسمت، ما از PascalCase برای ثبت‌نام کردن کامپوننت ها استفاده می‌کنیم. به این دلایل:

1. اسامی Pascal Case شناسه‌های معتبر جاوااسکریپت هستند. باعث راحت‌تر شدن import و ثبت کامپوننت‌ها می‌شود. همچنین به auto-complation IDEها کمک می‌کند.

2. `‎<PascalCase />‎` بصورت واضح تر بیان می‌کند که به جای المان‌های بومی HTML یک کامپوننت Vue در تمپلیت داریم.

این روش پیشنهادی هنگام استفاده از SFCها و یا string templateها می‌باشد. اما همانطور که در [محدودیت‌های تجزیه تمپلیت در DOM](/guide/essentials/component-basics#in-dom-template-parsing-caveats) صبحت شد، تگ‌های PascalCase در in-DOM templates قابل استفاده نیستند.

خوشبختانه Vue از تبدیل تگ‌های kebab-case به کامپوننت‌های ثبت‌شده با PascalCase پشتیبانی می‌کند. این به این معناست که کامپوننت ثبت شده `MyComponents` می‌تواند در تمپلیت هم به شکل `<MyComponent>` و هم به شکل `<my-component>` رفرنس داده شود. این قابلیت به ما اجازه می‌دهد تا همان ثبت کردن کامپوننت در جاوااسکریپت را بدون در نظر گرفتن نحوه نوشتن آن در تمپلیت استفاده کنیم.
