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

  -   [TypeScript Vue Plugin](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) نیز برای پشتیبانی از وارد کردن `*.vue` در فایل‌های TS مورد نیاز است.

- [WebStorm](https://www.jetbrains.com/webstorm/) نیز پشتیبانی از TypeScript و Vue را از طریق تنظیمات پیش فرض فراهم می کند. محیط‌های توسعه یکپارچه (IDE) دیگر JetBrains نیز به طور پیش فرض یا از طریق یک افزونه رایگان، آن‌ها را پشتیبانی می کنند. از نسخه 2023.2 به بعد، WebStorm و Vue Plugin به صورت پشتیبانی داخلی برای سرور زبان Vue اضافه شده است. شما می توانید سرویس Vue را برای استفاده از Volar که با تمام نسخه‌های Typescript ادغام شده استفاده کنید ، در  تنظیمات > زبان‌ها و چارچوب‌ها > تایپ اسکریپت > ویو آن‌ را تنظیم کنید. به طور پیش فرض، Volar برای نسخه‌های TypeScript 5.0 به بالا استفاده خواهد شد.

### پیکربندی `tsconfig.json` {#configuring-tsconfig-json}

پروژه‌های ساخته شده با `create-vue` به همراه یک فایل `tsconfig.json` از پیش‌ پیکربندی شده هستند. تنظیمات پایه در بسته [`@vue/tsconfig`](https://github.com/vuejs/tsconfig) انتزاع شده است. در داخل پروژه، از [ارجاعات پروژه](https://www.typescriptlang.org/docs/handbook/project-references.html) استفاده می‌کنیم تا اطمینان حاصل شود که نوع‌های صحیح برای کدی که در محیط‌های مختلف اجرا می‌شود (مانند کد برنامه و کد تست) وجود داشته باشد.

در هنگام پیکربندی `tsconfig.json` به صورت دستی، برخی از گزینه‌های قابل توجه عبارتند از:

- در فایل تنظیمات [`compilerOptions.isolatedModules`](https://www.typescriptlang.org/tsconfig#isolatedModules)  به دلیل استفاده از ابزار [esbuild](https://esbuild.github.io/) برای ترجمه TypeScript و محدودیت‌های مربوط به ترجمه فقط در یک فایل، بر روی `true` تنظیم شده است. همچنین، [`compilerOptions.verbatimModuleSyntax`](https://www.typescriptlang.org/tsconfig#verbatimModuleSyntax) که یک [یک مجموعه دست بالا `isolatedModules`](https://github.com/microsoft/TypeScript/issues/53601) است هم یک گزینه خوب است. این تنظیمات در واقع در پروژه `[@vue/tsconfig](https://github.com/vuejs/tsconfig)` نیز استفاده می‌شوند.

- اگر از Options API استفاده می‌کنید، برای بهره‌برداری از بررسی نوع `this` در گزینه‌های کامپوننت، باید [`compilerOptions.strict`](https://www.typescriptlang.org/tsconfig#strict) را برابر با `true` قرار دهید (یا حداقل [`compilerOptions.noImplicitThis`](https://www.typescriptlang.org/tsconfig#noImplicitThis) را فعال کنید که بخشی از پرچم `strict` است). در غیر این صورت، `this` به عنوان `any` در نظر گرفته خواهد شد.

- اگر شما تنظیمات resolver aliases را در ابزار ساخت پروژه خود داشته باشید، به عنوان مثال alias `@/*` که به طور پیش‌فرض در یک پروژه `create-vue` تنظیم شده است، شما نیاز دارید که آن را نیز برای TypeScript از طریق [`compilerOptions.paths`](https://www.typescriptlang.org/tsconfig#paths) تنظیم کنید.

همچنین ببینید:

- [مستندات رسمی گزینه های کامپایلر TypeScript](https://www.typescriptlang.org/docs/handbook/compiler-options.html)
- [موارد قابل توجه در کامپایل TypeScript با استفاده از ابزار esbuild ](https://esbuild.github.io/content-types/#typescript-caveats)

###  حالت تصرف توسط Volar  {#volar-takeover-mode}

> این بخش فقط برای استفاده از VSCode + Volar اعمال می شود.

برای استفاده همزمان از فایل‌های Vue SFC و TypeScript، Volar یک نمونه جداگانه از سرویس زبان TypeScript را با پشتیبانی ویژه برای Vue ایجاد می‌کند و از آن در فایل‌های Vue SFC استفاده می‌کند. در عین حال، فایل‌های معمولی TypeScript همچنان توسط سرویس زبان TypeScript داخلی VSCode پردازش می‌شوند، به همین دلیل نیاز به پلاگین [TypeScript Vue Plugin](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) برای پشتیبانی وارد کردن فایل‌های Vue SFC در فایل‌های TS وجود دارد. این تنظیم پیش‌فرض کار می‌کند، اما برای هر پروژه دو نمونه از سرویس زبان TypeScript در حال اجرا است: یکی از Volar و دیگری از سرویس داخلی VSCode. این کار کمی غیربهینه است و ممکن است منجر به مشکلات عملکردی در پروژه‌های بزرگ شود.

Volar امکانی به نام "حالت تصرف" (Takeover Mode) را برای بهبود عملکرد فراهم می‌کند. در حالت تصرف، Volar با استفاده از یک نمونه تنها از سرویس زبان TypeScript، پشتیبانی را برای فایل‌های Vue و TS ارائه می‌دهد. به این ترتیب، فقط یک نمونه از سرویس زبان TypeScript برای هر دو نوع فایل استفاده می‌شود که باعث بهبود عملکرد و کاهش مشکلات عملکردی در پروژه‌های بزرگ می‌شود.

برای فعال‌سازی حالت تصرف، شما باید سرویس زبان TS داخلی VSCode را **فقط در فضای کاری پروژه خود** غیرفعال کنید. برای انجام این کار، مراحل زیر را دنبال کنید:

1. In your project workspace, bring up the command palette with `Ctrl + Shift + P` (macOS: `Cmd + Shift + P`).
2. Type `built` and select "Extensions: Show Built-in Extensions".
3. Type `typescript` in the extension search box (do not remove `@builtin` prefix).
4. Click the little gear icon of "TypeScript and JavaScript Language Features", and select "Disable (Workspace)".
5. Reload the workspace. Takeover mode will be enabled when you open a Vue or TS file.

<img src="./images/takeover-mode.png" width="590" height="426" style="margin:0px auto;border-radius:8px">

### Note on Vue CLI and `ts-loader` {#note-on-vue-cli-and-ts-loader}

In webpack-based setups such as Vue CLI, it is common to perform type checking as part of the module transform pipeline, for example with `ts-loader`. This, however, isn't a clean solution because the type system needs knowledge of the entire module graph to perform type checks. Individual module's transform step simply is not the right place for the task. It leads to the following problems:

- `ts-loader` can only type check post-transform code. This doesn't align with the errors we see in IDEs or from `vue-tsc`, which map directly back to the source code.

- Type checking can be slow. When it is performed in the same thread / process with code transformations, it significantly affects the build speed of the entire application.

- We already have type checking running right in our IDE in a separate process, so the cost of dev experience slow down simply isn't a good trade-off.

If you are currently using Vue 3 + TypeScript via Vue CLI, we strongly recommend migrating over to Vite. We are also working on CLI options to enable transpile-only TS support, so that you can switch to `vue-tsc` for type checking.

## General Usage Notes {#general-usage-notes}

### `defineComponent()` {#definecomponent}

To let TypeScript properly infer types inside component options, we need to define components with [`defineComponent()`](/api/general#definecomponent):

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

`defineComponent()` also supports inferring the props passed to `setup()` when using Composition API without `<script setup>`:

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

See also:

- [Note on webpack Treeshaking](/api/general#note-on-webpack-treeshaking)
- [type tests for `defineComponent`](https://github.com/vuejs/core/blob/main/packages/dts-test/defineComponent.test-d.tsx)

:::tip
`defineComponent()` also enables type inference for components defined in plain JavaScript.
:::

### Usage in Single-File Components {#usage-in-single-file-components}

To use TypeScript in SFCs, add the `lang="ts"` attribute to `<script>` tags. When `lang="ts"` is present, all template expressions also enjoy stricter type checking.

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

`lang="ts"` can also be used with `<script setup>`:

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

### TypeScript in Templates {#typescript-in-templates}

The `<template>` also supports TypeScript in binding expressions when `<script lang="ts">` or `<script setup lang="ts">` is used. This is useful in cases where you need to perform type casting in template expressions.

Here's a contrived example:

```vue
<script setup lang="ts">
let x: string | number = 1
</script>

<template>
  <!-- error because x could be a string -->
  {{ x.toFixed(2) }}
</template>
```

This can be worked around with an inline type cast:

```vue{6}
<script setup lang="ts">
let x: string | number = 1
</script>

<template>
  {{ (x as number).toFixed(2) }}
</template>
```

:::tip
If using Vue CLI or a webpack-based setup, TypeScript in template expressions requires `vue-loader@^16.8.0`.
:::

### Usage with TSX

Vue also supports authoring components with JSX / TSX. Details are covered in the [Render Function & JSX](/guide/extras/render-function.html#jsx-tsx) guide.

## Generic Components {#generic-components}

Generic components are supported in two cases:

- In SFCs: [`<script setup>` with the `generic` attribute](/api/sfc-script-setup.html#generics)
- Render function / JSX components: [`defineComponent()`'s function signature](/api/general.html#function-signature)

## API-Specific Recipes {#api-specific-recipes}

- [TS with Composition API](./composition-api)
- [TS with Options API](./options-api)
