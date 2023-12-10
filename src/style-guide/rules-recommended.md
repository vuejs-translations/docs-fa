# قوانین اولویت C: پیشنهاد‌‌ شده {#priority-c-rules-recommended}

زمانی که که انتخاب‌های متعدد و به یک اندازه خوب وجود دارد، می‌توان برای حفظ ثبات، یک انتخاب دلخواه انجام داد. در این قوانین، ما هر یک از انتخاب‌های قابل قبول را شرح داده و یک انتخاب پیش‌فرض را پیشنهاد می‌دهیم. این به این معنا است که شما آزاد هستید تا انتخاب های متفاوتی در کدهای خودتان داشته باشید، تا زمانی که ‌در آنها ثابت هستید و برایشان دلیل معقولی دارید. لطفا دلیل معقول و منطبق با کامیونیتی خود داشته باشید. با منطبق شدن با استندارد های کامیونیتی شما:

1. ذهن خود را آموزش می‌دهید تا بسیاری از کدهای کامیونیتی که با آنها مواجه می‌شوید را تجزیه و تحلیل کنید.
2. قادر خواهید بود بیشتر کدهای کامیونیتی را بدون تغییر دادن، کپی و پیست کنید.
3. غالباً می‌بینید کارمندان جدید استخدام شده، دست کم در مورد Vue، از قبل به سبک کدنویسی مورد علاقه شما عادت کرده‌اند.

## ترتیب آ‌پشن‌های کامپوننت/نمونه {#component-instance-options-order}

**آپشن‌های کامپوننت/نمونه باید همیشه به طور ثابت مرتب شوند.**

این ترتیب پیش‌‌‌فرضی است که ما برای آپشن‌های کامپوننت پیشنهاد می‌دهیم. آنها به دسته‌هایی تقسیم می‌شوند تا بدانید در کجا پراپرتی‌های جدید را از طریق افزونه‌ها اضافه کنید.

1. **Global Awareness** (نیاز به دانشی فراتر از کامپوننت دارد)

   - `name`

2. **Template Compiler Options** (روشی که تمپلیت‌ها کامپایل می‌شوند را تغییر می‌دهد)

   - `compilerOptions`

3. **Template Dependencies** (فایل‌هایی که در تمپلیت استفاده شده است)

   - `components`
   - `directives`

4. **Composition** (پراپرتی‌ها را با آپشن‌ها ادغام می‌کند)

   - `extends`
   - `mixins`
   - `provide`/`inject`

5. **Interface** (رابط کامپوننت)

   - `inheritAttrs`
   - `props`
   - `emits`

6. **Composition API** (نقطه ورود برای استفاده از Composition API)

   - `setup`

7. **Local State** (پراپرتی‌های محلیِ reactive)

   - `data`
   - `computed`

8. **Events** (تماس‌های بازگشتی که به واسطه رویداد‌های reactive ایجاد می‌شوند)

   - `watch`
   - رویداد‌های چرخه ی حیات (به ترتیبی که‌ فرا‌خوان می‌شوند)
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

9. **Non-Reactive Properties** (پراپرتی‌های نمونه مستقل از سیستم reactivity)

   - `methods`

10. **Rendering** (توضیحاتِ اخباریِ خروجیِ کامپوننت)
    - `template`/`render`

## ترتیب صفات المان‌ها {#element-attribute-order}

**صفات المان‌ها (از جمله کامپوننت ها)، باید همیشه به طور ثابت مرتب شوند.**

این ترتیب پیش‌‌فرضی است که ما برای آپشن‌های کامپوننت پیشنهاد می‌دهیم. آنها به دسته‌هایی تقسیم می‌شوند تا بدانید در کجا از صفات و دایرکتیو‌های شخصی سازی شده استفاده کنید.

1. **Definition** (آپشن‌های کامپوننت را فراهم می‌کند)

   - `is`

2. **List Rendering** (نسخه‌های متفاوتی از یک المان می‌سازد)

   - `v-for`

3. **Conditionals** (رندر/نمایش‌ داده شدن یا نشدن یک المان را تعیین می‌کند)

   - `v-if`
   - `v-else-if`
   - `v-else`
   - `v-show`
   - `v-cloak`

4. **Render Modifiers** (نحوه رندر شدن المان را تغییر می‌دهد)

   - `v-pre`
   - `v-once`

5. **Global Awareness** (نیاز به دانشی فراتر از کامپوننت دارد)

   - `id`

6. **Unique Attributes** (صفاتی که به مقادیر منحصر به فرد نیاز دارد)

   - `ref`
   - `key`

7. **Two-Way Binding** (ترکیب اتصال و رویداد‌ها)

   - `v-model`

8. **Other Attributes** (تمام صفاتِ مشخص نشدهِ محدود شده و محدود نشده)

9. **Events** (دریافت کننده‌های رویداد‌های کامپوننت)

   - `v-on`

10. **Content** (محتوای المان را بازنویسی می‌کند)
    - `v-html`
    - `v-text`

## خطوط خالی در آپشن های کامپوننت/نمونه {#empty-lines-in-component-instance-options}

**شاید بخواهید یک خط خالی بین پراپرتی‌های چندخطی اضافه کنید، به ویژه اگر آپشن‌ها دیگر بدون اسکرول کردن نمی‌توانند در صفحه شما جا بگیرند.**

زمانی که احساس می‌کنید کامپوننت‌ها شلوغ یا به سختی خوانده می‌شوند، اضافه کردن فاصله بین پراپرتی‌های چندخطی می‌تواند باعث شود دوباره بتوان به راحتی آن‌ها را مرور کرد. در برخی ویرایشگرها مانند Vim، گزینه‌های قالب‌بندی مثل این می‌تواند باعث شود حرکت بین آن‌ها با صفحه‌کلید راحت‌تر باشد.

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
