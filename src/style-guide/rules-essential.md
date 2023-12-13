# قوانین اولویت A: ضروری {#priority-a-rules-essential}

به کمک این قوانین از ارورها جلوگیری میشه. پس به هر هزینه ای این قوانین را یاد بگیرید و استفاده بکنید. شاید استثناتی به صورت خیلی نادر توسط کسانی که در vue و جاوا اسکریپت حرفه ای هستند وجود داشته باشد.  

## از کامپوننت های چند-اسمی استفاده کنید {#use-multi-word-component-names}

کامپوننت های استفاده شده باید همیشه به صورت چند-اسمی باشند، به جز برای کامپوننت ریشه یا همان کامپوننت `App`.  به این صورت [از نا سازگاری جلوگیری میشود](https://html.spec.whatwg.org/multipage/custom-elements.html#valid-custom-element-name) یعنی از ناسازگاری با تگ های HTML چون تگ های HTML همیشه تک اسمی هستند.


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

## از پراپ ها با تعریف مشخص استفاده کنید {#use-detailed-prop-definitions}

در کد های متعهدانه. تعاریف پراپ باید همیشه تا جایی که امکان دارد مشخص و شامل حداقل یک تایپ باشد.

::: توضیح جزئیات

[پراپ های تعریف شده مشخص](/guide/components/props#prop-validation) دو مزیت دارند:

- آنها API کامپونت هارو مستند میکنند، و دیدن نحوه استفاده کامپوننت آسون میشه.
- در توسعه، اگه به کامپوننتی پراپ با فرمت غلط داده شده باشه Vue به شما هشدار میده، و این باعث تشخیص ارور میشه.
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

در کامپوننت هابرای نگهداری وضعیت هر کامپوننت تا زیرشاخه ها `key` همراه با `v-for` لازمه که _همیشه_ باشه. حتی برای المنت ها, بهتره که برای ایجاد رفتار قابل پیش بینی مثل [ثبات آبجکت](https://bost.ocks.org/mike/constancy/) در انیمیشن استفاده بشه.

::: توضیح جزئیات
به طور مثال شما دو لیستی از آبجکت دارید:

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

سپس شما با ترتیب الفبا مرتب سازی میکنید. Vue برای بهینه سازی رندر DOM سعی میکند حداقل تغییرات را در DOM انجام بدهد. این کار شاید باعث حذف مورد اول سپس اضافه کردن آن در آخر لیست شود.

مشکل که به وجود میاد اینه که: گاهی ممکنه مهم باشه که المنت از توی DOM حذف نشه. برای مثال شما ممکنه که از `<transition-group>` برای انیمیت کردن مرتب سازی لیست استفاده کنید یا شاید برای المنت `<input>` حالت focus رو پیاده سازی بکنید. در این حالات اضافه کردن key منحصر به فرد به هر آیتم مثل `:key="todo.id"` به Vue میگه که رفتار قابل پیش بینی تری داشته باشه.

بنا به تجارب ما _همیشه_ بهتره که یک key منحصر به فرد اضافه بشه، تا شما و تیمتان نگران اینگونه موارد خاص نباشید. بعدا در مواردی که پرفرمنس مهمه و ثبات آبجکت لازم نیست میتوتید استثنا قاعل بشید.
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

**هرگز از `v-if` به همراه  `v-for` در روی یک المنت استفاده نکنید.**

دو حالت پیش میاد که ممکنه این کار به نظر لازم باشه:

- برای فیلتر کردن آیتم ها توی لیست (برای مثال `v-for="user in users" v-if="user.isActive"`). برای این حالت به جای `users` از یک computed لیست دیگه برای فیلتر کردن استفاده کنید (مثال `activeUsers`).

- برای جلوگیری از رندر لیست در حالتی که لازمه hidden باشه (برای مثال `v-for="user in users" v-if="shouldShowUsers"`). برای این نوع موارد  `v-if` رو به یک المنت کانتینر دیگه انتقال بدید (برای مثال `ul`, `ol`).

::: توضیح جزئیات
وقتی Vue دایرکتیو هار پردازش میکنه, `v-if` نسبت به `v-for` اولویت بیشتری داره, پس این تمپلیت:

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

باعث ارور میشه, چون دایرکتیو `v-if` اول ارزیابی میشه و متغیر  `user` در اون موقع هنوز وجود نداره.

این میتونه با استفاده از متغیر computed موقع استفاده حلقه درست بشه.

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

به صورت جایگزین, ما میتونیم از تگ `<template>` با `v-for` برای نگهداری المنت `<li>` استفاده کنیم:

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

## برای استایل دهی از component-scoped استفاده بکنید  {#use-component-scoped-styling}

برای اپلیکیشن ها , استایل سطح بالا در کامپوننت `App` و کامپوننت های layout ممکنه به صورت سراسری باشه ,ولی برای بقیه کامپوننت ها همیشه باید باید استایل ها به صورت scoped باشه.

این مورد فقط مربوط به [Single-File Components](/guide/scaling-up/sfc) میشه. و لازم _نیست_ که [ویژگی `scoped`](https://vue-loader.vuejs.org/en/features/scoped-css.html) استفاده بشه. اسکوپ میتونه با [CSS modules](https://vue-loader.vuejs.org/en/features/css-modules) باشه, و متولوژی بر اساس کلاس مثل [BEM](http://getbem.com/), و یا لایبری ها و یا قرارداد های دیگه.

**با این حال کامپوننت لایبرری ها بهتره که به جای صفت  `scoped` از استایل دهی بر اساس کلاس استفاده کنند.**

این باعث میشه بازنویسی استایل ها با کلاس های با اسامی خوانا که لازم نیست خیلی به خصوص باشه راحتتر باشه، در عین حال احتمالش کمه که باعث تداخل تو نتایج بشه.

::: توضیح جزئیات
 اگه شما در حال توسعه پروژه های با ابعاد بزرگ هستید که با برنامه نویس های دیگه ای روش کار میکنید و یا از HTML/CSS های خارجی (مثل Auth0) استفاده میکنید. استفاده اسکوپ باعث میشه که مطمئن بشید استایل های شما فقط به کامپوننت های مورد نظر اعمال میشن. 

علاوه بر صفت `scoped`, استفاده از اسم کلاس های منحصر به فرد باعث اطمینان میشه که کلاس های CSS های خارجی روی کامپوننت های شما اثری نمیزان. برای مثال در بیشتر پروژه ها از کلاس های `button`, `btn`, یا `icon` استفاده میشه, پس حتی اگه از استراتژی هایی مثل BEM هم استفاده نکنید, اضاقه کردن پیشوند بخصوص اپلیکیشن و یا کامپوننت  ( `ButtonClose-icon` مثل) میتونه تا حدی باعث محافظت بشه.
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
