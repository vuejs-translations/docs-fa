# قوانین اولویت A: ضروری {#priority-a-rules-essential}

این قوانین به جلوگیری از خطاها کمک می‌کنند، پس حتماً آنها را یاد بگیرید و همیشه از آنها پیروی کنید. ممکن است استثناهایی وجود داشته باشد، اما باید بسیار نادر باشند و توسط کسانی که در vue و جاوااسکریپت حرفه ای هستند، اعمال شوند.

## از نام‌های چند کلمه‌ای برای کامپوننت‌ها استفاده کنید {#use-multi-word-component-names}

نام کامپوننت‌های استفاده شده باید همیشه چند کلمه‌ای باشند، به جز برای کامپوننت ریشه یا همان کامپوننت `App`.  به این صورت از [ناسازگاری](https://html.spec.whatwg.org/multipage/custom-elements.html#valid-custom-element-name) با تگ‌های HTML جلوگیری می‌شود، چون تگ‌های HTML همیشه یک کلمه‌ای هستند.

<div class="style-example style-example-bad">
<h3>بد</h3>

```vue-html
<!-- in pre-compiled templates -->
<Item />

<!-- in in-DOM templates -->
<item></item>
```

</div>

<div class="style-example style-example-good">
<h3>خوب</h3>

```vue-html
<!-- in pre-compiled templates -->
<TodoItem />

<!-- in in-DOM templates -->
<todo-item></todo-item>
```

</div>

## تعریف دقیقی از پراپ‌ها ارائه دهید {#use-detailed-prop-definitions}

در کد های متعهدانه، تعاریف پراپ باید همیشه تا جایی که امکان دارد مشخص و شامل حداقل یک تایپ باشد.

::: details توضیحات بیشتر
[پراپ های تعریف شده مشخص](/guide/components/props#prop-validation) دو مزیت دارند:

- آنها API کامپوننت‌ها را مستند می‌کنند، و دیدن نحوه استفاده کامپوننت آسان می‌شود.
- در هنگام توسعه، اگر به کامپوننتی پراپ با فرمت غلط داده شده باشد Vue به شما هشدار می‌دهد و این باعث تشخیص خطا می‌شود.
  :::

<div class="options-api">

<div class="style-example style-example-bad">
<h3>بد</h3>

```js
// This is only OK when prototyping
props: ['status']
```

</div>

<div class="style-example style-example-good">
<h3>خوب</h3>

```js
props: {
  status: String
}
```

```js
// even better!
props: {
  status: {
    type: String,
    required: true,

    validator: value => {
      return [
        'syncing',
        'synced',
        'version-conflict',
        'error'
      ].includes(value)
    }
  }
}
```

</div>

</div>

<div class="composition-api">

<div class="style-example style-example-bad">
<h3>بد</h3>

```js
// This is only OK when prototyping
const props = defineProps(['status'])
```

</div>

<div class="style-example style-example-good">
<h3>خوب</h3>

```js
const props = defineProps({
  status: String
})
```

```js
// even better!

const props = defineProps({
  status: {
    type: String,
    required: true,

    validator: (value) => {
      return ['syncing', 'synced', 'version-conflict', 'error'].includes(
        value
      )
    }
  }
})
```

</div>

</div>

## از `v-for` با `key` استفاده کنید {#use-keyed-v-for}

استفاده از `key` همراه با `v-for` در کامپوننت‌ها  الزامی است تا وضعیت هر کامپوننت در سرتاسر زیرشاخه‌ها حفظ شود. حتی برای المنت‌ها، بهتره که برای ایجاد رفتار قابل پیش بینی مثل [ثبات آبجکت](https://bost.ocks.org/mike/constancy/) در انیمیشن استفاده بشه.

::: details توضیحات بیشتر
فرض کنید فهرستی از کارها دارید:

<div class="options-api">

```js
data() {
  return {
    todos: [
      {
        id: 1,
        text: 'Learn to use v-for'
      },
      {
        id: 2,
        text: 'Learn to use key'
      }
    ]
  }
}
```

</div>

<div class="composition-api">

```js
const todos = ref([
  {
    id: 1,
    text: 'Learn to use v-for'
  },
  {
    id: 2,
    text: 'Learn to use key'
  }
])
```

</div>

سپس شما آن را با ترتیب الفبا مرتب سازی می‌کنید. Vue برای بهینه سازی رندر DOM سعی می‌کند حداقل تغییرات را در DOM انجام بدهد. این کار شاید باعث حذف مورد اول سپس اضافه کردن آن در آخر لیست شود.

مشکل که به وجود می‌آید این است که: گاهی ممکن است مهم باشد که المنت از توی DOM حذف نشود. برای مثال شما ممکنه که از `<transition-group>` برای انیمیت کردن مرتب سازی لیست استفاده کنید یا شاید برای المنت `<input>` حالت focus رو پیاده سازی بکنید. در این حالات اضافه کردن key منحصر به فرد به هر آیتم مثل `‎:key="todo.id"‎` به Vue کمک می‌کند تا رفتار قابل پیش بینی تری داشته باشد.

بنا به تجارب ما _همیشه_ بهتر است که یک key منحصر به فرد اضافه شود تا شما و تیم‌تان نگران اینگونه موارد خاص نباشید. بعدا در مواردی که پرفرمنس مهم است و ثبات آبجکت لازم نیست می‌توانید استثنا قائل شوید.
:::

<div class="style-example style-example-bad">
<h3>بد</h3>

```vue-html
<ul>
  <li v-for="todo in todos">
    {{ todo.text }}
  </li>
</ul>
```

</div>

<div class="style-example style-example-good">
<h3>خوب</h3>

```vue-html
<ul>
  <li
    v-for="todo in todos"
    :key="todo.id"
  >
    {{ todo.text }}
  </li>
</ul>
```

</div>

## از استفاده `v-if` با `v-for` اجتناب کنید {#avoid-v-if-with-v-for}

**هرگز از `v-if` به همراه  `v-for` روی یک المنت استفاده نکنید.**

دو مورد رایج وجود دارد که ممکن است این کار لازم به نظر رسد:

- برای فیلتر کردن آیتم‌های لیست (برای مثال `v-for="user in users" v-if="user.isActive"‎`). برای این حالت به جای `users` از یک computed برای فیلتر کردن استفاده کنید (مثال `activeUsers`).

- برای جلوگیری از رندر لیست در حالتی که لازم است hidden باشد (برای مثال `v-for="user in users" v-if="shouldShowUsers"‎`). برای این نوع موارد  `v-if` رو به یک المنت کانتینر دیگر انتقال دهید (برای مثال `ul`، `ol`).

::: details توضیحات بیشتر
وقتی Vue دایرکتیو ها را پردازش می‌کند، `v-if` نسبت به `v-for` اولویت بیشتری دارد، پس این تمپلیت:

```vue-html
<ul>
  <li
    v-for="user in users"
    v-if="user.isActive"
    :key="user.id"
  >
    {{ user.name }}
  </li>
</ul>
```

باعث خطا می‌شود چون دایرکتیو `v-if` اول ارزیابی می‌شود و متغیر  `user` در آن لحظه هنوز وجود ندارد.

این مشکل می‌تواند با استفاده از یک computed موقع استفاده حلقه درست شود.

<div class="options-api">

```js
computed: {
  activeUsers() {
    return this.users.filter(user => user.isActive)
  }
}
```

</div>

<div class="composition-api">

```js
const activeUsers = computed(() => {
  return users.filter((user) => user.isActive)
})
```

</div>

```vue-html
<ul>
  <li
    v-for="user in activeUsers"
    :key="user.id"
  >
    {{ user.name }}
  </li>
</ul>
```

به صورت جایگزین، می‌توانیم از تگ `<template>` با `v-for` برای نگهداری المنت `<li>` استفاده کنیم:

```vue-html
<ul>
  <template v-for="user in users" :key="user.id">
    <li v-if="user.isActive">
      {{ user.name }}
    </li>
  </template>
</ul>
```

:::

<div class="style-example style-example-bad">
<h3>بد</h3>

```vue-html
<ul>
  <li
    v-for="user in users"
    v-if="user.isActive"
    :key="user.id"
  >
    {{ user.name }}
  </li>
</ul>
```

</div>

<div class="style-example style-example-good">
<h3>خوب</h3>

```vue-html
<ul>
  <li
    v-for="user in activeUsers"
    :key="user.id"
  >
    {{ user.name }}
  </li>
</ul>
```

```vue-html
<ul>
  <template v-for="user in users" :key="user.id">
    <li v-if="user.isActive">
      {{ user.name }}
    </li>
  </template>
</ul>
```

</div>

## استفاده از استایل‌گذاری محدود به کامپوننت {#use-component-scoped-styling}

برای اپلیکیشن‌ها، استایل سطح بالا در کامپوننت `App` و کامپوننت‌های layout ممکن است به صورت سراسری باشد، ولی برای کامپوننت‌های دیگر همیشه باید استایل‌ها به صورت scoped باشد.

این تنها در مورد [Single-File Components](/guide/scaling-up/sfc) مرتبط است. این موضوع نیازی به استفاده از [`scoped` attribute](https://vue-loader.vuejs.org/en/features/scoped-css.html) ندارد. این محدود کردن می‌تواند از طریق [ماژول‌های CSS](https://vue-loader.vuejs.org/en/features/css-modules)، یک استراتژی مبتنی بر کلاس مانند [BEM](http://getbem.com/) یا یک کتابخانه/توافق دیگر باشد.

**اما کتابخانه‌های کامپوننت، بهتر است به جای استفاده از ویژگی `scoped`، از یک استراتژی مبتنی بر کلاس استفاده کنند.**

این امر انجام تغییر در استایل‌های داخلی را آسان‌تر می‌کند، با نام‌گذاری‌های کلاس قابل فهم برای انسان که لازم نیست خیلی به خصوص باشد، اما هنوز احتمال وقوع تداخل را به شدت کاهش می‌دهند.

::: details توضیحات بیشتر
اگر در حال توسعه یک پروژه بزرگ هستید، با دیگر توسعه‌دهندگان همکاری می‌کنید یا گاهی اوقات کد HTML/CSS شخص ثالث را وارد می‌کنید (مثلاً از Auth0)، استفاده مداوم از اسکوپ اطمینان حاصل می‌کند که استایل‌های شما فقط بر روی کامپوننت‌هایی که برایشان طراحی شده‌اند، اعمال شوند.

علاوه بر ویژگی `scoped`، استفاده از نام‌های کلاس منحصر به فرد می‌تواند به اطمینان از اینکه CSS شخص ثالث بر روی HTML شما اعمال نشود، کمک کند. به عنوان مثال، بسیاری از پروژه‌ها از نام‌های کلاسی مانند `button`، `btn` یا `icon` استفاده می‌کنند، پس حتی اگر از استراتژیی مانند BEM استفاده نمی‌کنید، اضافه کردن یک پیشوند خاص برای برنامه یا کامپوننت (مثلاً `ButtonClose-icon`) می‌تواند تا حدی باعث محافظت شود.
:::

<div class="style-example style-example-bad">
<h3>بد</h3>

```vue-html
<template>
  <button class="btn btn-close">×</button>
</template>

<style>
.btn-close {
  background-color: red;
}
</style>
```

</div>

<div class="style-example style-example-good">
<h3>خوب</h3>

```vue-html
<template>
  <button class="button button-close">×</button>
</template>

<!-- Using the `scoped` attribute -->
<style scoped>
.button {
  border: none;
  border-radius: 2px;
}

.button-close {
  background-color: red;
}
</style>
```

```vue-html
<template>
  <button :class="[$style.button, $style.buttonClose]">×</button>
</template>

<!-- Using CSS modules -->
<style module>
.button {
  border: none;
  border-radius: 2px;
}

.buttonClose {
  background-color: red;
}
</style>
```

```vue-html
<template>
  <button class="c-Button c-Button--close">×</button>
</template>

<!-- Using the BEM convention -->
<style>
.c-Button {
  border: none;
  border-radius: 2px;
}

.c-Button--close {
  background-color: red;
}
</style>
```

</div>
