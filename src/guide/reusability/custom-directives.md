# دایرکتیوهای سفارشی - Custom Directives {#custom-directives}

<script setup>
const vHighlight = {
  mounted: el => {
    el.classList.add('is-highlight')
  }
}
</script>

<style>
.vt-doc p.is-highlight {
  margin-bottom: 0;
}

.is-highlight {
  background-color: yellow;
  color: black;
}
</style>

## معرفی {#introduction}

Vue به شما امکان می‌دهد علاوه بر مجموعه دایرکتیوهایی که به صورت پیش فرض وجود دارد (مانند `v-model` یا `v-show`)، دایرکتیوهای سفارشی خود را ثبت کنید.

ما دو روش باز استفاده کد در Vue را معرفی کردیم: [کامپوننت ها](/guide/essentials/component-basics) و [کامپوزبل ها](./composables). کامپوننت‌ها قالب‌های اصلی ساخت هستند در حالیکه کامپوزبل‌ها روی استفاده دوباره منطق با نگه داشتن وضعیت قبلی سیستم تمرکز کرده‌اند. از طرف دیگر، دایرکتیو‌های سفارشی، اساسا برای استفاده دوباره منطقی که شامل دسترسی سطح پایین DOM به المنت‌های ساده هستند تعیین شدند.

یک دایرکتیو سفارشی به عنوان یک آبجکت شامل هوک‌های چرخه حیات می‌باشد که مشابه هوک‌های کامپوننت هستند. هوک‌‌ها المنتی که به دایرکتیو متصل (bound) هست را دریافت می‌کنند. در اینجا مثالی از یک دایرکتیو آورده شده که یک کلاس را هنگامی که Vue المنت را درون DOM وارد می‌کند اضافه می‌کند:

<div class="composition-api">

```vue
<script setup>
// enables v-highlight in templates
const vHighlight = {
  mounted: (el) => {
    el.classList.add('is-highlight')
  }
}
</script>

<template>
  <p v-highlight>This sentence is important!</p>
</template>
```

</div>

<div class="options-api">

```js
const highlight = {
  mounted: (el) => el.classList.add('is-highlight')
}

export default {
  directives: {
    // enables v-highlight in template
    highlight
  }
}
```

```vue-html
<p v-highlight>This sentence is important!</p>
```

</div>

<div class="demo">
  <p v-highlight>This sentence is important!</p>
</div>

<div class="composition-api">

در `<script setup>`، هر متغیر camelCase که با پیشوند `v` شروع شود می‌تواند به عنوان یک دایرکتیو سفارشی استفاده شود. در مثال بالا، `vHighlight` می‌تواند در تمپلیت به صورت `v-highlight` استفاده شود.

اگر از `<script setup>` استفاده نمی‌کنید، دایرکتیوهای سفارشی می‌توانند با استفاده از آپشن `directives` ثبت شوند:

```js
export default {
  setup() {
    /*...*/
  },
  directives: {
    // enables v-highlight in template
    highlight: {
      /* ... */
    }
  }
}
```

</div>

<div class="options-api">

مشابه کامپوننت‌ها، دایرکتیوهای سفارشی نیز باید ثبت شوند تا بتوان از آن‌ها در تمپلیت‌ها استفاده کرد. در مثال بالا، ما از ثبت محلی از طریق آپشن `directives` استفاده می‌کنیم.

</div>

همچنین ثبت سراسری دایرکتیو‌های سفارشی در سطح برنامه معمول است:

```js
const app = createApp({})

// make v-highlight usable in all components
app.directive('highlight', {
  /* ... */
})
```

## چه زمانی از دایرکتیوهای سفارشی استفاده کنیم {#when-to-use}

دایرکتیوهای سفارشی فقط باید زمانی استفاده شوند که عملکرد مورد نظر تنها از طریق دستکاری مستقیم DOM قابل دستیابی باشد.

یک مثال رایج از این مورد، دایرکتیو سفارشی `v-focus` است که یک المان را در حالت فوکوس قرار می‌دهد.

<div class="composition-api">

```vue
<script setup>
// را در تمپلیت‌‌ها فعال می‌کند v-focus
const vFocus = {
  mounted: (el) => el.focus()
}
</script>

<template>
  <input v-focus />
</template>
```

</div>

<div class="options-api">

```js
const focus = {
  mounted: (el) => el.focus()
}

export default {
  directives: {
    // را در تمپلیت‌‌ها فعال می‌کند v-focus
    focus
  }
}
```

```vue-html
<input v-focus />
```

</div>

این دایرکتیو از اتریبیوت `autofocus` مفیدتر است زیرا نه تنها در صفحه لود شده کار می‌‌کند بلکه درون المنت‌هایی که به صورت پویا (dynamic) توسط Vue ساخته شده‌اند نیز کار می‌‌کند!

دایرکتیوهای سفارشی فقط باید زمانی استفاده شوند که عملکرد مورد نظر فقط از طریق دستکاری مستقیم DOM حاصل شود. در صورت امکان، قالب اعلامی با استفاده از دایرکتیوهای نهادینه شده مانند `v-bind` را ترجیح دهید زیرا کارامد تر و سرور-رندر دوستانه تر هستند.

## هوک‌های دایرکتیو {#directive-hooks}

یک آبجکت دایرکتیو میتونه چندین تابع هوک چرخه حیات را فراهم کند (همگی اختیاری هستند):

```js
const myDirective = {
  // قبل از اتصال اتریبیوت‌های المنت 
  // ها صدا زده می‌شود event listener یا اعمال شدن 
  created(el, binding, vnode) {
    //  برای جزئیات بیشتر در مورد آرگومان‌ها به پایین مراجعه کنید
  },
  // شود صدا زده می‌شود DOM درست قبل از اینکه المنت وارد
  beforeMount(el, binding, vnode) {},
  // هنگامی صدا زده می‌شود که تمام المنت‌های کامپوننت والد
  // قرار گرفته DOM به همراه تمامی فرزندانش درون
  mounted(el, binding, vnode) {},
  // قبل از اینکه کامپوننت والد بروز رسانی شود صدا زده می‌شود
  beforeUpdate(el, binding, vnode, prevVnode) {},
  // بعد از اینکه کامپوننت والد و 
  // همه فرزاندش به روز رسانی شدند صدا زده می‌شود
  updated(el, binding, vnode, prevVnode) {},
  // شود صدا زده می‌شود Unmount قبل از اینکه کامپوننت والد
  beforeUnmount(el, binding, vnode) {},
  // شده Unmount هنگامی صدا زده می‌شود که کامپوننت والد
  unmounted(el, binding, vnode) {}
}
```

### آرگومان‌های هوک {#hook-arguments}

هوک‌های دایرکتیو آرگومان‌های زیر را قبول می‌کنند:

- `el`: المنتی که دایرکتیو به آن متصل است. این آرگومان می‌تواند مستقیما برای دستکاری DOM استفاده شود. 

- `binding`: این آبجکت شامل پراپرتی‌های زیر است.

  - `value`: مقداری که به دایرکتیو ارسال می‌شود. برای مثال در `v-my-directive="1 + 1"‎`، مقدار ارسال شده `2` خواهد بود.
  - `oldValue`: مقدار قبلی، تنها درون هوک‌های `beforeUpdate` و `updated` قابل دسترس هست. خواه مقدار تغییر بکند خواه نکند این پراپرتی در دسترس هست.
  - `arg`: آرگومانی که در صورت وجود به دایرکتیو ارسال می‌شود. برای مثال در `v-my-directive:foo`، آرگومان `"foo"` می‌باشد.
  - `modifiers`:  یک آبجکت که شامل مدیفایرها هست که در صورت وجود به دایرکتیو ارسال می‌شود. برای مثال در `v-my-directive.foo.bar`،  آبجکت شامل مدیفایرهای `{ foo: true, bar: true }` می‌باشد.
  - `instance`: نمونه‌ای از کامپوننتی که دایرکتیو درون آن استفاده شده.
  - `dir`: مشخصات آبجکت دایرکتیو

- `vnode`: نود اصلی که ارائه دهنده المنت متصل است
- `preVnode`: نودی که ارائه دهنده المنت اصلی از رندر قبلی است. فقط درون هوک‌های `beforeUpdate` و `updated` قابل دسترس هست.

به عنوان مثال، کاربرد دایرکتیو زیر را در نظر بگیرید:

```vue-html
<div v-example:foo.bar="baz">
```

آرگومان `binding` یک شی به شکل زیر است:

```js
{
  arg: 'foo',
  modifiers: { bar: true },
  value: /* `baz` مقدار */,
  oldValue: /* از بروزرسانی قبلی `baz` مقدار */
}
```

مشابه دایرکتیوهای نهادینه شده، آرگومان‌های دایرکیتو سفارشی می‌توانند پویا باشند. برای مثال:

```vue-html
<div v-example:[arg]="value"></div>
```

در اینجا آرگومان دایرکتیو بر اساس پراپرتی `arg` درون state کامپوننت ما به صورت reactive بروزرسانی می‌شود.

:::tip توجه
جدا از `el`، شما باید با این آرگومان‌‌ها به صورت فقط خواندنی (read-only) رفتار کنید و هرگز آنها را تغییر ندهید. اگر شما نیاز دارید این اطلاعات را از طریق هوک‌‌ها به اشتراک بزارید، پیشنهاد میشه که این کار را از طریق المنت‌های [dataset](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset) انجام دهید.
:::

## مختصر نویسی تابع {#function-shorthand}

معمول است که یک دایرکتیو سفارشی برای هوک‌های `mounted` و `updated` رفتار یکسانی داشته باشد، بدون نیاز به هوک‌های دیگر. در چنین مواردی میتوانیم دایرکتیو را به صورت تابع تعریف کنیم:

```vue-html
<div v-color="color"></div>
```

```js
app.directive('color', (el, binding) => {
  // صدا زده می‌شود `updated` و `mounted` برای هر دو هوک
  el.style.color = binding.value
})
```

## آبجکت‌های تحت اللفظی {#object-literals}

اگر دایرکتیو شما نیازمند مقادیر مختلفی هست، شما می‌توانید یک آبجکت تحت اللفظی(object literal) جاوااسکریپتی را بعنوان مقدار تعیین کنید. توجه داشته باشید که دایرکتیوها می‌توانند هر عبارت معتبر جاوااسکریپتی را دریافت کنند.

```vue-html
<div v-demo="{ color: 'white', text: 'hello!' }"></div>
```

```js
app.directive('demo', (el, binding) => {
  console.log(binding.value.color) // => "white"
  console.log(binding.value.text) // => "hello!"
})
```

## کاربرد در کامپوننت‌‌ها {#usage-on-components}

:::warning توصیه نمی‌شود
استفاده از دایرکتیوهای سفارشی بر روی کامپوننت‌ها توصیه نمی‌شود. زمانی که یک کامپوننت دارای چندین گره ریشه باشد ممکن است رفتار غیرمنتظره‌ای رخ دهد.
:::

دایرکتیوهای سفارشی همانند [Fallthrough Attributes](/guide/components/attrs) برای استفاده در کامپوننت‌‌ها باید در نود ریشه (root node) به کار روند.

```vue-html
<MyComponent v-demo="test" />
```

```vue-html
<!-- template of MyComponent -->

<div> <!-- اینجا به کار می‌رود v-demo دایرکتیو -->
  <span>My component content</span>
</div>
```

توجه داشته باشید که کامپوننت‌‌ها می‌توانند بیشتر از یک نود ریشه داشته باشند. یک دایرکتیو هنگامی که بر کامپوننتی با چندین نود ریشه اعمال می‌شود نادیده گرفته خواهد شد و اخطار داده می‌شود. دایرکتیوها برخلاف اتریبیوت‌ها نمی‌توانند با استفاده از `v-bind="$attrs"‎` به المنت دیگری ارسال شوند.
