# قوانین اولویت C: پیشنهاد‌‌ شده {#priority-c-rules-recommended}

زمانی که که آپشن های متعدد و به یک اندازه خوب وجود دارد، می‌توان برای حفظ ثبات، یک انتخاب دلخواه انجام داد.
در این قوانین، ما هر یک از آپشن های قابل قبول را شرح داده و یک انتخاب پیش‌فرض را پیشنهاد می دهیم.

*این به این معنا است که شما آزاد هستید تا انتخاب های متفاوتی در کدهای خودتان داشته باشید، تا زمانی که ‌آنها ثابت و دلیل معقولی برایشان دارید.
البته لطفا امّا دلیل معقولی داشته باشید !

با سازگار شدن با استندارد های کامیونیتی:
1. شما ذهن خود را آموزش می دهید تا بسیاری از کد های کامیونیتی که با آنها مواجه می شوید را تجزیه و تحلیل کنید.
2. قادر خواهید بود بیشتر کد های کامیونیتی را بدون تغییر دادن، کپی و پیست کنید.
3. اغلب می‌بینید که استخدام‌کننده های جدید، از قبل به سبک کد نویسی شما عادت کرده اند.(حداقل در مورد Vue)

## ترتیب آ‌پشن های کامپوننت/نمونه {#component-instance-options-order}

**آپشن های کامپوننت/نمونه باید همیشه به طور ثابت مرتب شوند.**

این ترتیب پیش‌‌‌فرضی است که ما برای آپشن‌های کامپوننت پیشنهاد می‌دهیم. آنها به دسته‌هایی تقسیم می‌شوند تا بدانید در کجا پراپرتی‌های جدید را از طریق افزونه‌ها اضافه کنید.

1. **Global Awareness** (نیاز به دانشی فراتر از کامپوننت دارد)

   - `name`

2. **Template Compiler Options** (روشی که تمپلیت ها کامپایل می‌شوند را تغییر می‌دهد)

   - `compilerOptions`

3. **Template Dependencies** (فایل هایی که در تمپلیت استفاده شده است)

   - `components`
   - `directives`

4. **Composition** (پراپرتی هارا با آپشن ها ادغام می‌کند)

   - `extends`
   - `mixins`
   - `provide`/`inject`

5. **Interface** (رابط کامپوننت)

   - `inheritAttrs`
   - `props`
   - `emits`

6. **Composition API** (نقطه ورود برای استفاده از Composition API)

   - `setup`

7. **Local State** (پراپرتی های محلیِ واکنش‌پذیر)

   - `data`
   - `computed`

8. **Events** (تماس های بازگشتی که به واسطه رویداد های واکنش‌پذیر ایجاد می شوند)

   - `watch`
   - رویداد های چرخه‌ی زندگی (در ترتیبی که‌ فرا‌خوانده می‌شوند)
     - `beforeCreate`
     - `created`
     - `beforeMount`
     - `mounted`
     - `beforeUpdate`
     - `updated`
     - `activated`
     - `deactivated`
     - `beforeUnmount`
     - `unmounted`
     - `errorCaptured`
     - `renderTracked`
     - `renderTriggered`

9. **Non-Reactive Properties** (صفات نمونه، مستقل از سیستم واکنش‌پذیری)

   - `methods`

10. **Rendering** (توضیحاتِ اخباریِ خروجیِ کامپوننت)
    - `template`/`render`

## ترتیب صفات المان ها {#element-attribute-order}

**صفات المان ها (از جمله کامپوننت ها)، باید همیشه به طور ثابت مرتب شوند.**
این ترتیب پیش‌‌فرضی است که ما برای آپشن های کامپوننت پیشنهاد می‌دهیم.
 آنها به دسته هایی تقسیم می شوند تا بدانید در کجا از صفات و دایرکتیو های شخصی سازی شده استفاده کنید.

1. **Definition** (آپشن های کامپوننت را فراهم می کند)

   - `is`

2. **List Rendering** (نسخه های متفاوتی از یک المان می سازد)

   - `v-for`

3. **Conditionals** (رندر/نمایش‌ داده شدن یا نشدن یک المان را تعیین می کند)

   - `v-if`
   - `v-else-if`
   - `v-else`
   - `v-show`
   - `v-cloak`

4. **Render Modifiers** (نحوه رندر شدن المان را تغییر می دهد)

   - `v-pre`
   - `v-once`

5. **Global Awareness** (نیاز به دانشی فراتر از کامپوننت دارد)

   - `id`

6. **Unique Attributes** (صفاتی که به مقادیر منحصر به فرد نیاز دارد)

   - `ref`
   - `key`

7. **Two-Way Binding** (ترکیب بایند‌ کردن و رویداد ها)

   - `v-model`

8. **Other Attributes** (تمام صفاتِ مشخص نشدهِ محدود شده و محدود نشده)

9. **Events** (مستمع های کامپوننت)

   - `v-on`

10. **Content** (محتوای المان را بازنویسی می کند)
    - `v-html`
    - `v-text`

## خطوط خالی در آپشن های کامپوننت/نمونه {#empty-lines-in-component-instance-options}

**اگر آپشن ها بدون اسکرول کردن به سختی در مانیتورتان جا می‌شوند، می توانید یک خط خالی بین پراپرتی های چند خطی اضافه کنید.
زمانی که کامپوننت ها فشرده می‌شوند یا خواندنشان سخت می‌شود، افزودن فاصله میان پراپرتی های چند خطی می‌تواند خواندن آنها را سهولت ببخشد. در برخی از ویرایشگر های کد مانند Vim، این نحو از قالب بندی باعث آسانی جابه‌جایی با کیبورد می‌شود.**

<div class="options-api">

<div class="style-example style-example-bad">
<h3>نا‌مناسب</h3>

```js
props: {
  value: {
    type: String,
    required: true
  },

  focused: {
    type: Boolean,
    default: false
  },

  label: String,
  icon: String
},

computed: {
  formattedValue() {
    // ...
  },

  inputClasses() {
    // ...
  }
}
```

</div>

<div class="style-example style-example-good">
<h3>مناسب</h3>

```js
// No spaces are also fine, as long as the component
// is still easy to read and navigate.
props: {
  value: {
    type: String,
    required: true
  },
  focused: {
    type: Boolean,
    default: false
  },
  label: String,
  icon: String
},
computed: {
  formattedValue() {
    // ...
  },
  inputClasses() {
    // ...
  }
}
```

</div>

</div>

<div class="composition-api">

<div class="style-example style-example-bad">
<h3>بد</h3>

```js
defineProps({
  value: {
    type: String,
    required: true
  },
  focused: {
    type: Boolean,
    default: false
  },
  label: String,
  icon: String
})
const formattedValue = computed(() => {
  // ...
})
const inputClasses = computed(() => {
  // ...
})
```

</div>

<div class="style-example style-example-good">
<h3>خوب</h3>

```js
defineProps({
  value: {
    type: String,
    required: true
  },

  focused: {
    type: Boolean,
    default: false
  },

  label: String,
  icon: String
})

const formattedValue = computed(() => {
  // ...
})

const inputClasses = computed(() => {
  // ...
})
```

</div>

</div>

## ترتیب المان‌های مرتبه اول در کامپوننت‌های تک فایلی  {#single-file-component-top-level-element-order}

**[کامپوننت‌های تک‌‌‌‌‌ فایلی](/guide/scaling-up/sfc)  باید  تگ‌های ‍‍`<script>` و `<template>` و `<style>` را ثابت و  به طوری که تگ `<style>` در آخر باشد مرتب کنند. زیرا حداقل یکی از دو تگ دیگر همیشه لازم است.**


<div class="style-example style-example-bad">
<h3>بد</h3>

```vue-html
<style>/* ... */</style>
<script>/* ... */</script>
<template>...</template>
```

```vue-html
<!-- ComponentA.vue -->
<script>/* ... */</script>
<template>...</template>
<style>/* ... */</style>

<!-- ComponentB.vue -->
<template>...</template>
<script>/* ... */</script>
<style>/* ... */</style>
```

</div>

<div class="style-example style-example-good">
<h3>خوب</h3>

```vue-html
<!-- ComponentA.vue -->
<script>/* ... */</script>
<template>...</template>
<style>/* ... */</style>

<!-- ComponentB.vue -->
<script>/* ... */</script>
<template>...</template>
<style>/* ... */</style>
```

```vue-html
<!-- ComponentA.vue -->
<template>...</template>
<script>/* ... */</script>
<style>/* ... */</style>

<!-- ComponentB.vue -->
<template>...</template>
<script>/* ... */</script>
<style>/* ... */</style>
```

</div>
