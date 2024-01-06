# سینتکس کامپوننت های تک فایلی | SFC {#sfc-syntax-specification}

## نمای کلی {#overview}

کامپوننت تک فایلی (SFC) در Vue که معمولاً از پسوند فایل `*.vue` استفاده می‌کند، یک قالب فایل سفارشی است که از سینتکسی شبیه به HTML برای توصیف یک کامپوننت Vue استفاده می‌کند. کامپوننت تک فایلی (SFC)  از نظر سینتکس با HTML سازگار است.

هر فایل `*.vue` از سه نوع بلوک زبان سطح بالا تشکیل شده است: `<template>` و `<script>` و `<style>` و همچنین می‌توان به صورت اختیاری بلوک های سفارشی اضافه کرد:

```vue
<template>
  <div class="example">{{ msg }}</div>
</template>

<script>
export default {
  data() {
    return {
      msg: 'Hello world!'
    }
  }
}
</script>

<style>
.example {
  color: red;
}
</style>

<custom1>
  This could be e.g. documentation for the component.
</custom1>
```

## بلوک های زبان {#language-blocks}

### `<template>` {#template}

- هر فایل `*.vue` می تواند حداکثر یک بلوک `<template>` در سطح بالا داشته باشد.

- محتویات این بلوک استخراج و به `vue/compiler-dom@` منتقل می‌شوند، از قبل در توابع رندر جاوا اسکریپت کامپایل می‌شوند و به‌عنوان گزینه `render` به کامپوننت صادر شده پیوست می‌شوند.

### `<script>` {#script}

- هر فایل `*.vue` می تواند حداکثر یک بلوک `<script>` داشته باشد (به استثنای  [`<script setup>`](/api/sfc-script-setup)).

- اسکریپت به عنوان یک ماژول ES اجرا می شود.

- در این بلوک، **default export** باید یک آبجکت از آپشن های کامپوننت  Vue باشد، چه به‌عنوان یک آبجکت ساده یا به‌عنوان مقدار بازگشتی از [defineComponent](/api/general#definecomponent).

### `<script setup>` {#script-setup}

- هر فایل `*.vue` می تواند حداکثر یک بلوک `<script setup>` داشته باشد (به استثنای `<script>` معمولی).

- اسکریپت از قبل پردازش شده و به عنوان تابع کامپوننت `()setup` استفاده می شود، به این معنی که **برای هر نمونه (Instance) از کامپوننت** اجرا می شود. پیوندهای سطح بالا در `<script setup>` به طور خودکار در template قرار می گیرند. برای جزئیات بیشتر، [اسناد اختصاصی در `<script setup>`](/api/sfc-script-setup) را ببینید.


### `<style>` {#style}

- یک فایل `*.vue` می‌تواند حاوی چندین تگ `<style>` باشد.

- یک تگ `<style>` می‌تواند دارای ویژگی‌های `scoped` یا `module` باشد (برای جزئیات بیشتر به [SFC Style Features](/api/sfc-css-features) مراجعه کنید) تا به کپسوله کردن سبک‌ها در مؤلفه فعلی کمک کند. چندین تگ `<style>` با حالت‌های کپسوله‌سازی متفاوت را می‌توان در یک جزء ترکیب کرد.
- A `<style>` tag can have `scoped` or `module` attributes (see [SFC Style Features](/api/sfc-css-features) for more details) to help encapsulate the styles to the current component. Multiple `<style>` tags with different encapsulation modes can be mixed in the same component.

### Custom Blocks {#custom-blocks}

Additional custom blocks can be included in a `*.vue` file for any project-specific needs, for example a `<docs>` block. Some real-world examples of custom blocks include:

- [Gridsome: `<page-query>`](https://gridsome.org/docs/querying-data/)
- [vite-plugin-vue-gql: `<gql>`](https://github.com/wheatjs/vite-plugin-vue-gql)
- [vue-i18n: `<i18n>`](https://github.com/intlify/bundle-tools/tree/main/packages/vite-plugin-vue-i18n#i18n-custom-block)

Handling of Custom Blocks will depend on tooling - if you want to build your own custom block integrations, see the [SFC custom block integrations tooling section](/guide/scaling-up/tooling#sfc-custom-block-integrations) for more details.

## Automatic Name Inference {#automatic-name-inference}

An SFC automatically infers the component's name from its **filename** in the following cases:

- Dev warning formatting
- DevTools inspection
- Recursive self-reference, e.g. a file named `FooBar.vue` can refer to itself as `<FooBar/>` in its template. This has lower priority than explicitly registered/imported components.

## Pre-Processors {#pre-processors}

Blocks can declare pre-processor languages using the `lang` attribute. The most common case is using TypeScript for the `<script>` block:

```vue-html
<script lang="ts">
  // use TypeScript
</script>
```

`lang` can be applied to any block - for example we can use `<style>` with [Sass](https://sass-lang.com/) and `<template>` with [Pug](https://pugjs.org/api/getting-started.html):

```vue-html
<template lang="pug">
p {{ msg }}
</template>

<style lang="scss">
  $primary-color: #333;
  body {
    color: $primary-color;
  }
</style>
```

Note that integration with various pre-processors may differ by toolchain. Check out the respective documentation for examples:

- [Vite](https://vitejs.dev/guide/features.html#css-pre-processors)
- [Vue CLI](https://cli.vuejs.org/guide/css.html#pre-processors)
- [webpack + vue-loader](https://vue-loader.vuejs.org/guide/pre-processors.html#using-pre-processors)

## `src` Imports {#src-imports}

If you prefer splitting up your `*.vue` components into multiple files, you can use the `src` attribute to import an external file for a language block:

```vue
<template src="./template.html"></template>
<style src="./style.css"></style>
<script src="./script.js"></script>
```

Beware that `src` imports follow the same path resolution rules as webpack module requests, which means:

- Relative paths need to start with `./`
- You can import resources from npm dependencies:

```vue
<!-- import a file from the installed "todomvc-app-css" npm package -->
<style src="todomvc-app-css/index.css" />
```

`src` imports also work with custom blocks, e.g.:

```vue
<unit-test src="./unit-test.js">
</unit-test>
```

## Comments {#comments}

Inside each block you shall use the comment syntax of the language being used (HTML, CSS, JavaScript, Pug, etc.). For top-level comments, use HTML comment syntax: `<!-- comment contents here -->`
