---
outline: deep
---

# استفاده از Vue با TypeScript {#using-vue-with-typescript}

TypeScript قادر است با تحلیل استاتیک در زمان ساخت بسیاری از خطاهای متداول را تشخیص دهد. این امکان باعث کاهش احتمال خطاهای زمان اجرا در محصول می‌شود و همچنین ما را قادر می‌سازد که با اطمینان بیشتری کد را در برنامه‌های بزرگ مجدداً بازنویسی (refactor) کنیم. TypeScript همچنین با استفاده از تکمیل خودکار مبتنی بر نوع در محیط‌های توسعه یکپارچه (IDE)، راحتی توسعه‌دهندگان را افزایش می‌دهد.

Vue نیز خود با زبان TypeScript نوشته شده و پشتیبانی از TypeScript را به شکل اولویت دار پشتیبانی می‌کند. همه بسته‌های رسمی Vue همراه با بسته‌های یکپارچه و باندل به راحتی و بدون تنظیمات و پیکربندی خاصی کار می‌کنند.

## راه اندازی پروژه {#project-setup}

[`create-vue`](https://github.com/vuejs/create-vue) ابزار رسمی ساختاردهی پروژه، گزینه‌هایی برای یک پروژه Vue که با [Vite](https://vitejs.dev/) کار شده و آماده برای TypeScript است را ارائه می‌دهد.

### بررسی اجمالی {#overview}

در یک راه‌اندازی بر پایه Vite، سرور توسعه و باندلر تنها در عملیات ترجمه شرکت می‌کنند و هیچ نوع بررسی نوعی انجام نمی‌دهند. این امر باعث می‌شود که سرور توسعه Vite حتی هنگام استفاده از TypeScript سرعت بالای خود را حفظ کند.

- در حین توسعه، پیشنهاد می‌کنیم از یک [IDE setup](#ide-support) خوب برای دریافت فوری بازخورد در مواجه با خطاهای type استفاده کنید.

اگر از SFC ها (Single File Components) استفاده می‌کنید، از ابزار [`vue-tsc`](https://github.com/vuejs/language-tools/tree/master/packages/tsc) برای بررسی نوع و تولید اعلان نوع از طریق خط فرمان استفاده کنید. `vue-tsc` یک پوشه برای واسط کاربری خط فرمان `tsc` است که به طور اساسی شبیه به `tsc` عمل می‌کند، با این تفاوت که علاوه بر فایل‌های TypeScript، از فایل‌های Vue SFC نیز پشتیبانی می‌کند. می‌توانید `vue-tsc` را در حالت watch در کنار سرور توسعه Vite اجرا کنید، یا از پلاگین Vite مانند [vite-plugin-checker](https://vite-plugin-checker.netlify.app/) استفاده کنید که بررسی‌ها را در یک thread worker جداگانه اجرا می‌کند.

- Vue CLI نیز پشتیبانی از TypeScript را فراهم می کند، اما دیگر توصیه نمی شود. [یادداشت‌های زیر](https://fa.vuejs.org/guide/typescript/overview.html#note-on-vue-cli-and-ts-loader) را ببینید.

### پشتیبانی از محیط توسعه یکپارچه (IDE) {#ide-support}

- [VSCode](https://code.visualstudio.com/) به خاطر پشتیبانی بی نظیر خود از TypeScript به شدت توصیه می‌شود. 

  - [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) یک افزونه رسمی برای VSCode است که پشتیبانی از TypeScript را در داخل فایل‌های Vue (SFC) همراه با امکانات فوق‌العاده دیگر فراهم می‌کند.

    :::tip
    Volar جایگزین [Vetur](https://marketplace.visualstudio.com/items?itemName=octref.vetur)، افزونه رسمی پیشین ما برای Vue 2 در VSCode است. اگر در حال حاضر Vetur نصب شده است، حتماً آن را در پروژه‌های Vue 3 غیرفعال کنید.
    :::

  - [TypeScript Vue Plugin](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) نیز برای پشتیبانی از وارد کردن `*.vue` در فایل‌های TS مورد نیاز است.

- [WebStorm](https://www.jetbrains.com/webstorm/) نیز پشتیبانی از TypeScript و Vue را از طریق تنظیمات پیش فرض فراهم می کند. محیط‌های توسعه یکپارچه (IDE) دیگر JetBrains نیز به طور پیش فرض یا از طریق یک افزونه رایگان، آن‌ها را پشتیبانی می کنند. از نسخه 2023.2 به بعد، WebStorm و Vue Plugin به صورت پشتیبانی داخلی برای سرور زبان Vue اضافه شده است. شما می توانید سرویس Vue را برای استفاده از Volar که با تمام نسخه‌های Typescript ادغام شده استفاده کنید ، در  تنظیمات > زبان‌ها و چارچوب‌ها > تایپ اسکریپت > ویو آن‌ را تنظیم کنید. به طور پیش فرض، Volar برای نسخه‌های TypeScript 5.0 به بالا استفاده خواهد شد.

### پیکربندی `tsconfig.json` {#configuring-tsconfig-json}

پروژه‌های ساخته شده با `create-vue` به همراه یک فایل `tsconfig.json` از پیش‌ پیکربندی شده هستند. تنظیمات پایه در بسته [`@vue/tsconfig`](https://github.com/vuejs/tsconfig) انتزاع شده است. در داخل پروژه، از [ارجاعات پروژه](https://www.typescriptlang.org/docs/handbook/project-references.html) استفاده می‌کنیم تا اطمینان حاصل شود که نوع‌های صحیح برای کدی که در محیط‌های مختلف اجرا می‌شود (مانند کد برنامه و کد تست) وجود داشته باشد.

در هنگام پیکربندی `tsconfig.json` به صورت دستی، برخی از گزینه‌های قابل توجه عبارتند از:

- `compilerOptions.isolatedModules` به `true` تنظیم شده است زیرا Vite برای ترجمه TypeScript از [esbuild](https://esbuild.github.io/) استفاده می‌کند و تحت محدودیت‌های ترجمه در یک فایل قرار دارد. `compilerOptions.verbatimModuleSyntax` [یک فراگیر برای `isolatedModules`](https://github.com/microsoft/TypeScript/issues/53601) است و یک انتخاب خوب است - همچنین این استفاده شده در [`@vue/tsconfig`](https://github.com/vuejs/tsconfig).

- اگر از Options API استفاده می‌کنید، برای بهره‌برداری از بررسی نوع `this` در گزینه‌های کامپوننت، باید [`compilerOptions.strict`](https://www.typescriptlang.org/tsconfig#strict) را برابر با `true` قرار دهید (یا حداقل [`compilerOptions.noImplicitThis`](https://www.typescriptlang.org/tsconfig#noImplicitThis) را فعال کنید که بخشی از پرچم `strict` است). در غیر این صورت، `this` به عنوان `any` در نظر گرفته خواهد شد.

- اگر شما تنظیمات resolver aliases را در ابزار ساخت پروژه خود داشته باشید، به عنوان مثال alias `@/*` که به طور پیش‌فرض در یک پروژه `create-vue` تنظیم شده است، شما نیاز دارید که آن را نیز برای TypeScript از طریق [`compilerOptions.paths`](https://www.typescriptlang.org/tsconfig#paths) تنظیم کنید.

- اگر قصد استفاده از TSX با Vue را دارید، [`compilerOptions.jsx`](https://www.typescriptlang.org/tsconfig#jsx) را روی `"preserve"` تنظیم کنید و [`compilerOptions.jsxImportSource`](https://www.typescriptlang.org/tsconfig#jsxImportSource) را روی "vue" تنظیم کنید.

همچنین ببینید:

- [مستندات رسمی گزینه های کامپایلر TypeScript](https://www.typescriptlang.org/docs/handbook/compiler-options.html)
- [موارد قابل توجه در کامپایل TypeScript با استفاده از ابزار esbuild ](https://esbuild.github.io/content-types/#typescript-caveats)

###  حالت تصرف توسط Volar  {#volar-takeover-mode}

> این بخش فقط برای استفاده از VSCode + Volar اعمال می شود.

برای استفاده همزمان از فایل‌های Vue SFC و TypeScript، Volar یک نمونه جداگانه از سرویس زبان TypeScript را با پشتیبانی ویژه برای Vue ایجاد می‌کند و از آن در فایل‌های Vue SFC استفاده می‌کند. در عین حال، فایل‌های معمولی TypeScript همچنان توسط سرویس زبان TypeScript داخلی VSCode پردازش می‌شوند، به همین دلیل نیاز به پلاگین [TypeScript Vue Plugin](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) برای پشتیبانی وارد کردن فایل‌های Vue SFC در فایل‌های TS وجود دارد. این تنظیم پیش‌فرض کار می‌کند، اما برای هر پروژه دو نمونه از سرویس زبان TypeScript در حال اجرا است: یکی از Volar و دیگری از سرویس داخلی VSCode. این کار کمی غیربهینه است و ممکن است منجر به مشکلات عملکردی در پروژه‌های بزرگ شود.

Volar امکانی به نام "حالت تصرف" (Takeover Mode) را برای بهبود عملکرد فراهم می‌کند. در حالت تصرف، Volar با استفاده از یک نمونه تنها از سرویس زبان TypeScript، پشتیبانی را برای فایل‌های Vue و TS ارائه می‌دهد. به این ترتیب، فقط یک نمونه از سرویس زبان TypeScript برای هر دو نوع فایل استفاده می‌شود که باعث بهبود عملکرد و کاهش مشکلات عملکردی در پروژه‌های بزرگ می‌شود.

برای فعال‌سازی حالت تصرف، شما باید سرویس زبان TS داخلی VSCode را **فقط در فضای کاری پروژه خود** غیرفعال کنید. برای انجام این کار، مراحل زیر را دنبال کنید:

1. در فضای کاری پروژه خود، پنجره فرمان را با فشار دادن `Ctrl + Shift + P` (macOS: `Cmd + Shift + P`) باز کنید.
2. کلمه `built` را تایپ کنید و "Extensions: Show Built-in Extensions" را انتخاب کنید.
3. در جعبه جستجوی پسوند، کلمه `typescript` را تایپ کنید (پیشوند `@builtin` را حذف نکنید).
4. بر روی آیکون دنده کوچک "TypeScript and JavaScript Language Features" کلیک کنید و "Disable (Workspace)" را انتخاب کنید.
5. فضای کاری را مجدداً بارگذاری کنید. حالت Takeover وقتی که یک فایل Vue یا TS باز کنید، فعال خواهد شد.

<img src="./images/takeover-mode.png" width="590" height="426" style="margin:0px auto;border-radius:8px">

### نکاتی درباره Vue CLI و `ts-loader` {#note-on-vue-cli-and-ts-loader}

در تنظیمات مبتنی بر webpack مانند Vue CLI، رایج است که بررسی نوع به عنوان بخشی از روند تبدیل ماژول انجام شود، به عنوان مثال با استفاده از `ts-loader`. با این حال، این یک راه‌حل تمیز نیست زیرا سیستم نوع برای انجام بررسی‌های نوع نیاز به دانشی از تمام گراف ماژول دارد. مرحله تبدیل جداگانه ماژول به تنهایی مکان مناسبی برای انجام این کار نیست. این می‌تواند به مشکلات زیر منجر می‌شود:

- `ts-loader` فقط می‌تواند کد پس از تبدیل را بررسی کند. این با خطاهایی که در محیط‌های توسعه یکپارچه (IDE) یا از طریق `vue-tsc` مشاهده می‌شوند، که به صورت مستقیم به کد منبع map می‌شوند، هماهنگ نیست.

- بررسی نوع می‌تواند زمانبر باشد. وقتی که در همان ترد / فرآیند با تبدیل کد انجام می‌شود، به طور قابل توجهی سرعت ساخت کل برنامه را تحت تأثیر قرار می‌دهد.

- ما در حال حاضر قابلیت بررسی نوع را در محیط توسعه یکپارچه (IDE) خود به صورت یک فرآیند جداگانه داریم، بنابراین هزینه کاهش سرعت تجربه توسعه‌دهنده به سادگی یک تعادل مطلوب نیست.

اگر در حال حاضر از Vue 3 + TypeScript با استفاده از Vue CLI استفاده می‌کنید، به شدت توصیه می‌شود که به Vite مهاجرت کنید. ما همچنین در حال کار بر روی گزینه‌های CLI هستیم تا امکان پشتیبانی برای ترجمه‌ای (transpile-only) نوع TypeScript را فعال کنیم، به طوری که بتوانید به `vue-tsc` برای بررسی نوع تغییر کنید.

## یادداشت‌های کاربردی عمومی {#general-usage-notes}

### `defineComponent()` {#definecomponent}

برای اینکه TypeScript بتواند نوع‌ها را به درستی در گزینه‌های کامپوننت نمونه‌سازی کند، باید کامپوننت‌ها را با استفاده از `defineComponent()` تعریف کنیم.

```ts
import { defineComponent } from 'vue'

export default defineComponent({
  // type inference enabled
  props: {
    name: String,
    msg: { type: String, required: true }
  },
  data() {
    return {
      count: 1
    }
  },
  mounted() {
    this.name // type: string | undefined
    this.msg // type: string
    this.count // type: number
  }
})
```

`defineComponent()` همچنین از نوع پروپ‌هایی که به `setup()` منتقل می‌شوند وقتی از Composition API بدون `<script setup>` استفاده می‌شود، پشتیبانی می‌کند.

```ts
import { defineComponent } from 'vue'

export default defineComponent({
  // type inference enabled
  props: {
    message: String
  },
  setup(props) {
    props.message // type: string | undefined
  }
})
```

همچنین ببینید:

- [یادداشتی درباره webpack Treeshaking](/api/general#note-on-webpack-treeshaking)
- [تست‌های نوع برای  `defineComponent`](https://github.com/vuejs/core/blob/main/packages/dts-test/defineComponent.test-d.tsx)

:::tip
تابع `defineComponent()` همچنین قابلیت استنباط نوع را برای کامپوننت‌های تعریف شده به صورت جاوااسکریپت ساده فراهم می‌کند.
:::

### استفاده در کامپوننت‌های تک فایلی {#usage-in-single-file-components}

برای استفاده از TypeScript در کامپوننت‌های تک فایلی (Single-File Components)، ویژگی `lang="ts"` را به تگ `<script>` اضافه کنید. وقتی `lang="ts"` موجود است، همه عبارات قالب نیز از یک بررسی نوع دقیق‌تر بهره‌مند می‌شوند.

```vue
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  data() {
    return {
      count: 1
    }
  }
})
</script>

<template>
  <!-- type checking and auto-completion enabled -->
  {{ count.toFixed(2) }}
</template>
```

`lang="ts"` می‌تواند به همراه `<script setup>` استفاده شود:

```vue
<script setup lang="ts">
// TypeScript enabled
import { ref } from 'vue'

const count = ref(1)
</script>

<template>
  <!-- type checking and auto-completion enabled -->
  {{ count.toFixed(2) }}
</template>
```

### تایپ اسکریپت در قالب‌ها   {#typescript-in-templates}

 `<template>` نیز در صورت استفاده از `<script lang="ts">` یا `<script setup lang="ts">` از TypeScript در عبارات بایندینگ پشتیبانی می‌کند. این ویژگی در مواردی مفید است که نیاز به انجام عملگرهای نوعی در عبارات قالب (template expressions) دارید.

در ادامه، یک مثال ساختگی را بررسی می‌کنیم:

```vue
<script setup lang="ts">
let x: string | number = 1
</script>

<template>
  <!-- error because x could be a string -->
  {{ x.toFixed(2) }}
</template>
```

این مسئله با یک تبدیل نوع درون خطی قابل حل است.

```vue{6}
<script setup lang="ts">
let x: string | number = 1
</script>

<template>
  {{ (x as number).toFixed(2) }}
</template>
```

:::tip
در صورت استفاده از Vue CLI یا یک پیکربندی مبتنی بر webpack، استفاده از TypeScript در عبارات قالب نیاز به `vue-loader@^16.8.0` دارد.
:::

### استفاده از TSX {#usage-with-tsx}

Vue نیز از نوشتن کامپوننت‌ها با استفاده از JSX / TSX پشتیبانی می‌کند. جزئیات مربوط به این موضوع در راهنمای [تابع رندر و JSX](/guide/extras/render-function.html#jsx-tsx) توضیح داده شده است.

## کامپوننت‌های جنریک {#generic-components}

کامپوننت‌های جنریک در دو حالت زیر پشتیبانی می‌شوند:

- In SFCs: [`<script setup>` with the `generic` attribute](/api/sfc-script-setup.html#generics)
- Render function / JSX components: [`defineComponent()`'s function signature](/api/general.html#function-signature)

## دستور العمل‌های  API خاص {#api-specific-recipes}

- [TS with Composition API](./composition-api)
- [TS with Options API](./options-api)
