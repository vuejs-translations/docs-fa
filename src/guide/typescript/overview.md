---
outline: deep
---

# استفاده از Vue با TypeScript {#using-vue-with-typescript}

یک تایپ سیستم مانند TypeScript می‌تواند بسیاری از خطاهای متداول را با تحلیل استاتیک در زمان ساخت تشخیص دهد. این امکان باعث کاهش احتمال خطاهای زمان اجرا در محصول می‌شود و همچنین ما را قادر می‌سازد که با اطمینان بیشتری کد را در برنامه‌های بزرگ مجدداً بازنویسی (refactor) کنیم. TypeScript همچنین با استفاده از تکمیل خودکار مبتنی بر تایپ در محیط‌های توسعه یکپارچه (IDE)، راحتی توسعه‌دهندگان را افزایش می‌دهد.

Vue نیز خود با زبان تایپ‌اسکریپت نوشته شده و پشتیبانی از تایپ‌اسکریپت را به شکل اولویت دار پشتیبانی می‌کند. تمامی پکیج‌های رسمی Vue همراه با تایپ‌هایی که در آنها تعریف شده، بسته بندی (bundle) شده‌اند که نیاز به تنظیمات اضافی برای استفاده ندارند.

## راه اندازی پروژه {#project-setup}

[`create-vue`](https://github.com/vuejs/create-vue) ابزار رسمی ساختاردهی پروژه، گزینه‌هایی را برای یک پروژه Vue که از [Vite](https://vitejs.dev/) قدرت گرفته و آماده برای تایپ‌اسکریپت است ارائه می‌دهد.

### بررسی اجمالی {#overview}

در یک راه‌اندازی بر پایه Vite، سرور توسعه و باندلر تنها در عملیات ترجمه شرکت می‌کنند و هیچ نوع بررسی تایپی را انجام نمی‌دهند. این امر باعث می‌شود که سرور توسعه Vite حتی هنگام استفاده از تایپ‌اسکریپت سرعت بالای خود را حفظ کند.

- در حین توسعه، پیشنهاد می‌کنیم از یک [IDE setup](#ide-support) خوب برای دریافت فوری بازخورد در مواجه با خطاهای type استفاده کنید.

- اگر از SFC ها (Single File Components) استفاده می‌کنید، از ابزار [`vue-tsc`](https://github.com/vuejs/language-tools/tree/master/packages/tsc) برای بررسی تایپ و تعریف تایپ‌ها استفاده کنید. `vue-tsc` پکیجی است که به دور `tsc` (که همان رابط خط فرمان تایپ‌اسکریپت است) قرار دارد. به طور اساسی شبیه به `tsc` عمل می‌کند، با این تفاوت که علاوه بر فایل‌های TypeScript، از فایل‌های Vue SFC نیز پشتیبانی می‌کند. می‌توانید `vue-tsc` را در حالت watch در کنار سرور توسعه Vite اجرا کنید، یا از پلاگین Vite مانند [vite-plugin-checker](https://vite-plugin-checker.netlify.app/) استفاده کنید که بررسی‌ها را در یک thread worker جداگانه اجرا می‌کند.

- Vue CLI نیز پشتیبانی از TypeScript را فراهم می کند، اما دیگر توصیه نمی‌شود. [یادداشت‌های زیر](https://fa.vuejs.org/guide/typescript/overview.html#note-on-vue-cli-and-ts-loader) را ببینید.

### پشتیبانی از محیط توسعه یکپارچه (IDE) {#ide-support}

- [Visual Studio Code](https://code.visualstudio.com/) یا همان VS Code به خاطر پشتیبانی بی نظیر خود از TypeScript به شدت توصیه می‌شود.

  - [Vue - Official](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (نام قبلی Volar) یک افزونه رسمی برای VS Code است که پشتیبانی از TypeScript را در داخل فایل‌های Vue (SFC) همراه با امکانات فوق‌العاده دیگر فراهم می‌کند.

    :::tip نکته
    افزونه Vue - Official جایگزین [Vetur](https://marketplace.visualstudio.com/items?itemName=octref.vetur)، افزونه رسمی پیشین ما برای Vue 2 در VS Code است. درحال حاضر اگر Vetur نصب شده است، حتماً آن را در پروژه‌های Vue 3 غیرفعال کنید.
    :::

- [WebStorm](https://www.jetbrains.com/webstorm/) نیز پشتیبانی از TypeScript و Vue را از طریق تنظیمات پیش فرض فراهم می‌کند. محیط‌های توسعه یکپارچه (IDE) دیگر JetBrains نیز به طور پیش فرض یا از طریق یک افزونه رایگان، آن‌ها را پشتیبانی می‌کنند. از نسخه 2023.2 به بعد، WebStorm و Vue Plugin به صورت پشتیبانی داخلی برای سرور زبان Vue اضافه شده است. شما می توانید سرویس Vue را برای استفاده از Volar که با تمام نسخه‌های Typescript ادغام شده استفاده کنید ، در  Settings > Languages & Frameworks > TypeScript > Vue آن‌ را تنظیم کنید. به طور پیش فرض، Volar برای نسخه‌های TypeScript 5.0 به بالا استفاده خواهد شد.

### پیکربندی `tsconfig.json` {#configuring-tsconfig-json}

پروژه‌های ساخته شده با `create-vue` به همراه یک فایل `tsconfig.json` از پیش‌ پیکربندی شده هستند. تنظیمات پایه در پکیج [`‎@vue/tsconfig`](https://github.com/vuejs/tsconfig) انتزاع شده است. در داخل پروژه، از [ارجاعات پروژه](https://www.typescriptlang.org/docs/handbook/project-references.html) استفاده می‌کنیم تا اطمینان حاصل شود که تایپ‌های صحیح برای کدی که در محیط‌های مختلف اجرا می‌شود (مانند کد برنامه و کد تست) وجود داشته باشد.

در هنگام پیکربندی `tsconfig.json` به صورت دستی، برخی از گزینه‌های قابل توجه عبارتند از:

- `compilerOptions.isolatedModules` به `true` تنظیم شده است زیرا Vite برای ترجمه تایپ‌اسکریپت از [esbuild](https://esbuild.github.io/) استفاده می‌کند و محدود به ترجمه تک‌فایلی است. `compilerOptions.verbatimModuleSyntax` [یک فراگیر برای `isolatedModules`](https://github.com/microsoft/TypeScript/issues/53601) است و یک انتخاب خوب است - همچنین این استفاده شده در [`‎@vue/tsconfig`](https://github.com/vuejs/tsconfig).

- اگر از Options API استفاده می‌کنید، برای بهره‌برداری از بررسی تایپ `this` در آپشن‌های کامپوننت، باید [`compilerOptions.strict`](https://www.typescriptlang.org/tsconfig#strict) را برابر با `true` قرار دهید (یا حداقل [`compilerOptions.noImplicitThis`](https://www.typescriptlang.org/tsconfig#noImplicitThis) را فعال کنید که بخشی از فلگ `strict` است). در غیر این صورت، `this` به عنوان `any` در نظر گرفته خواهد شد.

- اگر شما تنظیمات resolver aliases را در ابزار ساخت پروژه خود داشته باشید، به عنوان مثال `‎@/*‎` که alias پیش‌فرض در یک پروژه `create-vue` تنظیم شده است، شما نیاز دارید که آن را نیز برای تایپ‌اسکریپت از طریق [`compilerOptions.paths`](https://www.typescriptlang.org/tsconfig#paths) تنظیم کنید.

- اگر قصد استفاده از TSX با Vue را دارید، [`compilerOptions.jsx`](https://www.typescriptlang.org/tsconfig#jsx) را روی `"preserve"` تنظیم کنید و [`compilerOptions.jsxImportSource`](https://www.typescriptlang.org/tsconfig#jsxImportSource) را روی "vue" تنظیم کنید.

همچنین ببینید:

- [مستندات رسمی آپشن‌های کامپایلر TypeScript](https://www.typescriptlang.org/docs/handbook/compiler-options.html)
- [موارد قابل توجه در کامپایل TypeScript با استفاده از ابزار esbuild](https://esbuild.github.io/content-types/#typescript-caveats)

### نکاتی درباره Vue CLI و `ts-loader` {#note-on-vue-cli-and-ts-loader}

در تنظیمات مبتنی بر webpack مانند Vue CLI، رایج است که بررسی تایپ به عنوان بخشی از روند تبدیل ماژول انجام شود، به عنوان مثال با استفاده از `ts-loader`. با این حال، این یک راه‌حل تمیز نیست زیرا سیستم تایپ برای انجام بررسی‌های تایپ نیاز به دانشی از تمام گراف ماژول دارد. مرحله تبدیل جداگانه ماژول به تنهایی مکان مناسبی برای انجام این کار نیست. این می‌تواند به مشکلات زیر منجر می‌شود:

- `ts-loader` فقط می‌تواند کد پس از تبدیل را بررسی کند. این با خطاهایی که در محیط‌های توسعه یکپارچه (IDE) یا از طریق `vue-tsc` مشاهده می‌شوند، که به صورت مستقیم به کد منبع map می‌شوند، هماهنگ نیست.

- بررسی تایپ می‌تواند زمانبر باشد. وقتی که در همان ترد / فرآیند با تبدیل کد انجام می‌شود، به طور قابل توجهی سرعت ساخت کل برنامه را تحت تأثیر قرار می‌دهد.

- ما در حال حاضر قابلیت بررسی تایپ را در محیط توسعه یکپارچه (IDE) خود به صورت یک فرآیند جداگانه داریم، بنابراین هزینه کاهش سرعت تجربه توسعه‌دهنده به سادگی یک تعادل مطلوب نیست.

اگر در حال حاضر از Vue 3 + TypeScript با استفاده از Vue CLI استفاده می‌کنید، به شدت توصیه می‌شود که به Vite مهاجرت کنید. ما همچنین در حال کار بر روی آپشن‌های CLI هستیم تا امکان پشتیبانی تایپ‌اسکریپت برای transpile-only را فعال کنیم، به طوری که بتوانید از `vue-tsc` برای بررسی تایپ استفاده کنید.

## یادداشت‌های کاربردی عمومی {#general-usage-notes}

### `defineComponent()‎` {#definecomponent}

برای اینکه تایپ‌اسکریپت بتواند تایپ‌ها را به درستی در آپشن‌های کامپوننت نمونه‌سازی کند، باید کامپوننت‌ها را با استفاده از `defineComponent()‎` تعریف کنیم.

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

`defineComponent()‎` همچنین از تایپ پراپ‌هایی که به `setup()‎` منتقل می‌شوند وقتی از Composition API بدون `<script setup>` استفاده می‌شود، پشتیبانی می‌کند.

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
- [تست‌های تایپ برای `defineComponent`](https://github.com/vuejs/core/blob/main/packages/dts-test/defineComponent.test-d.tsx)

:::tip نکته
تابع `defineComponent()‎` همچنین قابلیت استنباط تایپ را برای کامپوننت‌های تعریف شده به صورت جاوااسکریپت ساده فراهم می‌کند.
:::

### استفاده در کامپوننت‌های تک فایلی {#usage-in-single-file-components}

برای استفاده از تایپ‌اسکریپت در کامپوننت‌های تک فایلی (Single-File Components)، ویژگی `lang="ts"‎` را به تگ `<script>` اضافه کنید. وقتی `lang="ts"‎` موجود است، همه عبارات تمپلیت نیز از یک بررسی تایپ دقیق‌تر بهره‌مند می‌شوند.

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

`lang="ts"‎` می‌تواند به همراه `<script setup>` استفاده شود:

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

### تایپ‌اسکریپت در تمپلیت‌ها {#typescript-in-templates}

 `<template>` نیز در صورت استفاده از `‎<script lang="ts">‎` یا `‎<script setup lang="ts">‎` از تایپ‌اسکریپت در عبارات بایندینگ پشتیبانی می‌کند. این ویژگی در مواردی مفید است که نیاز به انجام عملگر‌های مبتنی بر تایپ در عبارات تمپلیت (template expressions) دارید.

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

این مسئله با یک تبدیل تایپ درون خطی قابل حل است.

```vue{6}
<script setup lang="ts">
let x: string | number = 1
</script>

<template>
  {{ (x as number).toFixed(2) }}
</template>
```

:::tip نکته
در صورت استفاده از Vue CLI یا یک پیکربندی مبتنی بر webpack، استفاده از تایپ‌اسکریپت در عبارات قالب نیاز به `vue-loader@^16.8.0` دارد.
:::

### استفاده از TSX {#usage-with-tsx}

Vue همچنین از نوشتن کامپوننت‌ها با استفاده از JSX / TSX پشتیبانی می‌کند. جزئیات مربوط به این موضوع در راهنمای [تابع رندر و JSX](/guide/extras/render-function.html#jsx-tsx) توضیح داده شده است.

## کامپوننت‌های جنریک {#generic-components}

کامپوننت‌های جنریک در دو حالت زیر پشتیبانی می‌شوند:

- در SFC ها: [`‎<script setup>‎` با استفاده از اتریبیوت `generic`](/api/sfc-script-setup.html#generics)
- تابع Render / کامپوننت‌های JSX : [امضا تابع `defineComponent()‎`](/api/general.html#function-signature)

## دستور العمل‌های API خاص {#api-specific-recipes}

- [تایپ‌اسکریپت با Composition API](./composition-api)
- [تایپ‌اسکریپت با Options API](./options-api)
