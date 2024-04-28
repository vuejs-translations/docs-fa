# ویژگی‌های CSS در SFC {#sfc-css-features}

## CSS دارای اسکوپ {#scoped-css}

وقتی یک تگ `<style>` دارای اتریبیوت `scoped` باشد، CSS نوشته شده در آن تنها بر عناصر کامپوننت فعلی اعمال می‌شود. این شبیه به کپسوله‌سازی استایل در Shadow DOM است، اما نیازی به پلی‌فیل ندارد. این کار با استفاده از PostCSS برای تبدیل موارد زیر:

```vue
<style scoped>
.example {
  color: red;
}
</style>

<template>
  <div class="example">hi</div>
</template>
```

به موارد زیر:

```vue
<style>
.example[data-v-f3f3eg9] {
  color: red;
}
</style>

<template>
  <div class="example" data-v-f3f3eg9>hi</div>
</template>
```

### المنت ریشه کامپوننت فرزند {#child-component-root-elements}

با `scoped`، استایل‌های کامپوننت والد به کامپوننت‌های فرزند نشت پیدا نمی‌کنند. با این حال، المنت ریشه کامپوننت فرزند تحت تأثیر هر دو CSS دارای scope والد و فرزند قرار می‌گیرد. به طور عمد برای این طراحی شده است که والد بتواند عنصر ریشه فرزند را برای اهداف چیدمان، استایل بدهد.

### انتخابگرهای عمیق {#deep-selectors}

اگر می‌خواهید یک سلکتور در استایل‌های `scoped` اصطلاحا "deep" باشد، یعنی کامپوننت‌های فرزند را تحت تأثیر قرار دهد، می‌توانید از شبه‌کلاس ‍`‎:deep()‎`‍ استفاده کنید:

```vue
<style scoped>
.a :deep(.b) {
  /* ... */
}
</style>
```

مورد فوق به صورت زیر کامپایل می‌شود:

```css
.a[data-v-f3f3eg9] .b {
  /* ... */
}
```

:::tip نکته
محتوای DOM ایجاد شده با ‍`v-html`‍ تحت تأثیر استایل‌های دارای scope قرار نمی‌گیرند، اما همچنان می‌توانید آن‌ها را با استفاده از deep selectors استایل دهید.
:::

### انتخابگرهای Slotted {#slotted-selectors}

به طور پیش‌فرض، استایل‌های دارای scope بر محتوای رندر شده توسط ‍`‎<slot/>‎`‍ تأثیر نمی‌گذارند، زیرا آن‌ها متعلق به کامپوننت والدی در نظر گرفته می‌شوند که آن‌ها را ارسال کرده است. برای هدف قرار دادن صریح محتوای اسلات، از شبه‌کلاس ‍`‎:slotted`‍ استفاده کنید:

```vue
<style scoped>
:slotted(div) {
  color: red;
}
</style>
```

### انتخابگرهای سراسری {#global-selectors}

اگر می‌خواهید فقط یک قاعده به صورت سراسری اعمال شود، می‌توانید از شبه‌کلاس ‍`‎:global`‍ به جای ایجاد یک ‍`<style>`‍ دیگر استفاده کنید (در زیر مشاهده کنید):

```vue
<style scoped>
:global(.red) {
  color: red;
}
</style>
```

### مخلوط کردن استایل‌های محلی و سراسری {#mixing-local-and-global-styles}

همچنین می‌توانید هم استایل‌های دارای scope و هم بدون scope را در یک کامپوننت داشته باشید:

```vue
<style>
/* استایل‌های سراسری */
</style>

<style scoped>
/* استایل‌های محلی */
</style>
```

### نکاتی درباره استایل‌های دارای scope {#scoped-style-tips}

- **استایل‌های دارای scope نیاز به کلاس‌ها را از بین نمی‌برند**. به دلیل شیوه رندر انواع انتخابگرهای CSS در مرورگرها، `p { color: red }` زمانی که دارای scope است (یعنی وقتی با یک انتخابگر اتریبیوت ترکیب می شود) چندین برابر کندتر خواهد بود. اگر به جای آن از کلاس‌ها یا شناسه‌ها استفاده کنید، مانند `‎.example { color: red }`، آنگاه عملاً آن افت عملکرد را حذف می‌کنید.

- **هنگام استفاده از انتخابگرهای فرزند در کامپوننت‌های بازگشتی مراقب باشید!** (کامپوننت بازگشتی یک نوع کامپوننت است که در داخل خود، از خود استفاده می‌کند) برای یک قاعده CSS با انتخابگر `‎.a .b`، اگر عنصری که `‎.a` را مچ می‌کند حاوی یک کامپوننت فرزند بازگشتی باشد، آنگاه همه `‎.b` در آن کامپوننت فرزند توسط این قاعده مچ خواهند شد.

## CSS Modules {#css-modules}

یک تگ `<style module>` به عنوان [CSS Modules](https://github.com/css-modules/css-modules) کامپایل می‌شود و کلاس‌های CSS حاصل را به عنوان یک آبجکت تحت کلید `‎$style` در اختیار کامپوننت قرار می‌دهد:

```vue
<template>
  <p :class="$style.red">This should be red</p>
</template>

<style module>
.red {
  color: red;
}
</style>
```

کلاس‌های حاصل هش می‌شوند تا از تداخل جلوگیری شود، که همان اثر کپسوله کردن CSS به کامپوننت فعلی را ایجاد می‌کند.

برای جزئیات بیشتر مانند [استثنائات سراسری](https://github.com/css-modules/css-modules/blob/master/docs/composition.md#exceptions) و [ترکیب](https://github.com/css-modules/css-modules/blob/master/docs/composition.md#composition)، به [CSS Modules spec](https://github.com/css-modules/css-modules) مراجعه کنید.

### سفارشی سازی نام ماژول تزریق شده{#custom-inject-name}

می‌توانید نام آبجکتی که کلاس‌های تزریق شده را ارائه می‌دهد را با دادن یک مقدار به اتریبیوت `module` سفارشی کنید:

```vue
<template>
  <p :class="classes.red">red</p>
</template>

<style module="classes">
.red {
  color: red;
}
</style>
```

### استفاده با Composition API {#usage-with-composition-api}

می‌توان به کلاس‌های تزریق شده در `setup()‎` و `<script setup>` از طریق `useCssModule` دسترسی پیدا کرد. برای بلوک‌های `<style module>` با نام‌های تزریقی سفارشی، `useCssModule` مقدار خاصیت `module` مطابق را به عنوان اولین آرگومان می‌پذیرد:

```js
import { useCssModule } from 'vue'

// setup() در محدوده
// بازمی‌گرداند <style module> به طور پیش‌فرض، کلاس‌ها را برای
useCssModule()

// بازمی‌گرداند <style module="classes"> برای نامگذاری شده، کلاس‌ها را برای
useCssModule('classes')
```

## `v-bind()‎` در CSS {#v-bind-in-css}

تگ‌های `<style>` در SFC از لینک کردن مقادیر CSS به state پویای کامپوننت با استفاده از تابع CSS `v-bind` پشتیبانی می‌کنند:

```vue
<template>
  <div class="text">hello</div>
</template>

<script>
export default {
  data() {
    return {
      color: 'red'
    }
  }
}
</script>

<style>
.text {
  color: v-bind(color);
}
</style>
```

سینتکس آن با [`<script setup>`](./sfc-script-setup) کار می‌کند و از عبارات جاوااسکریپت (باید در داخل گیومه قرار گیرند) پشتیبانی می‌کند:

```vue
<script setup>
import { ref } from 'vue'
const theme = ref({
    color: 'red',
})
</script>

<template>
  <p>hello</p>
</template>

<style scoped>
p {
  color: v-bind('theme.color');
}
</style>
```

مقدار واقعی به یک پراپرتی سفارشی CSS، بصورت هش شده تبدیل خواهد شد، بنابراین CSS همچنان استاتیک است. این پراپرتی سفارشی به عنصر ریشه کامپوننت از طریق استایل‌های درون‌خطی اعمال می‌شود و اگر مقدار منبع تغییر کند، به صورت reactive بروزرسانی می‌شود.
