# Component Registration {#component-registration}

>در این صفحه فرض شده است که شما از قبل [Components Basics](/guide/essentials/component-basics) را مطالعه کرده اید. اگر با مبحث کامپوننت ها آشنا نیستید صفحه معرفی شده را بخوانید.

<VueSchoolLink href="https://vueschool.io/lessons/vue-3-global-vs-local-vue-components" title="Free Vue.js Component Registration Lesson"/>

به منظور این که Vue موقع برخورد با کامپوننت در template بتواند آن را پیدا کند و پیاده سازی کند، هر کامپوننت باید رجیستر شود.
دو راه برای رجیستر کردن کامپوننت وجود دارد: سراسری و محلی.

## رجیستر کردن سراسری {#global-registration}
میتوانیم با استفاده از متد `.component()` یک کامپوننت را بصورت سراسری در
[برنامه ویو](/guide/essentials/application) قابل دسترسی کنیم.


```js
import { createApp } from 'vue'

const app = createApp({})

app.component(
  // اسم رجیستر شده
  'MyComponent',
  // پیاده سازی کد
  {
    /* ... */
  }
)
```

اگر از SFCها استفاده میکنید، با import کردن فایل های `.vue` میتوانید کامپوننت ها را رجیستر کنید.

```js
import MyComponent from './App.vue'

app.component('MyComponent', MyComponent)
```

متد `.component()` میتواند بصورت زنجیره ای استفاده شود.

```js
app
  .component('ComponentA', ComponentA)
  .component('ComponentB', ComponentB)
  .component('ComponentC', ComponentC)
```

کامپوننت هایی که بصورت سراسری تعریف شده اند در template کامپوننت های تمام برنامه قابل استفاده اند.

```vue-html
<!-- این کامپوننت ها در تمام کامپوننت های دیگر برنامه قابل استفاده هستند -->
<ComponentA/>
<ComponentB/>
<ComponentC/>
```

این قاعده برای کامپوننت های درون یک کامپوننت هم صادق است، به این معنی که هر سه این کامپوننت ها داخل یکدیگر قابل استفاده هستند.

## رجیستر کردن محلی {#local-registration}

رجیستر کردن سراسری کامپوننت ها آسان است اما چند اشکال دارد:

1. رجیستر کردن سراسری کامپوننت مانع build systemها می شود تا کامپوننت های استفاده نشده را شناسایی و حذف کند(tree shaking). اگر یک کامپوننت بصورت سراسری رجیستر شده باشد و در هیچ کجای برنامه استفاده نشود، در باندل نهایی برنامه وجود خواهد داشت.

2. رجیستر کردن سراسری باعث مبهم و نامشخص شدن روابط وابستگی در برنامه های بزرگ می شود. همچنین باعث می شود پیدا کردن child component در parent component سخت تر شود.
این موارد میتنوانند همان اثری را داشته باشند که استفاده کردن از متغیر های سراسری زیاد در نگه داری بلند مدت برنامه داشته باشند.

<div class="composition-api">

هنگام استفاده از `<script setup>`، کامپوننت های import شده میتوانند بصورت محلی بدون رجیستر شدن استفاده شوند:

```vue
<script setup>
import ComponentA from './ComponentA.vue'
</script>

<template>
  <ComponentA />
</template>
```

در صورت عدم استفاده از `<script setup>`، نیاز به رجیستر کردن کامپوننت در آپشن components دارید:

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

رجیستر کردن محلی با استفاده از "components" انجام می شود:

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

برای هر property در آبجکت `components`، یک key برای اسم کامپوننت ساخته خواهد شد و value هم پیاده سازی کامپوننت می باشد. مثال بالا استفاده کردن از ویژگی shorthand در ES2015 است که معادل کد زیر می باشد:

```js
export default {
  components: {
    ComponentA: ComponentA
  }
  // ...
}
```

 به یاد داشته باشید که **کامپوننت های محلی رجیستر شده در کامپوننت های هم تراز(descendant or sibling components) قابل استفاده نیستند**. در این صورت `ComponentA` فقط در همان کامپوننت قابل استفاده است و کامپوننت های child و descendant به آن دسترسی ندارند.

## نام گذاری کامپوننت ها {#component-name-casing}

در این قسمت، ما از PascalCase برای رجیستر کردن کامپوننت ها استفاده میکنیم. به این دلایل:

1. اسامی Pascal Case شناسه گر های معتبر جاوااسکریپت هستند.
باعث راحت تر شدن import و register کردن کامپوننت ها می شود. همپنین به auto-complation IDEها کمک میکند.

2. `<PascalCase />` بصورت واضح تر بیان میکند که به جای المان های نیتیو HTML یک کامپوننت Vue در template داریم.

این روش پیشنهادی هنگام استفاده از SFCها و یا string templateها می باشد.
اما همانطور که در [in-DOM Template Parsing Caveats](/guide/essentials/component-basics#in-dom-template-parsing-caveats) صبحت شد، تگ های PascalCase در in-DOM templates قابل استفاده نیستند.

خوشبختانه، Vue از تبدیل کردن تگ های PascalCase به تگ های kebab-case پشتیبانی میکند.
این به این معناست که کامپوننت رجیستر شده `MyComponents` میتواند در template بصورت `MyComponent` و هم `<my-component>` رفرنس داده شود.
این قابلیت به ما اجازه میدهد تا همان رجیستر کردن کامپوننت در جاوااسکریپت را بدون درنظر گرفتن سورس کد template استفاده کنیم.
