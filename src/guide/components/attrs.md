---
outline: deep
---

# Fallthrough Attributes {#fallthrough-attributes}

>در این صفحه فرض شده که شما از قبل [مبانی کامپوننت‌ها](/guide/essentials/component-basics) را مطالعه کرده اید. اگر با کامپوننت‌ها آشنایی ندارید، ابتدا آن را بخوانید.

## ارث‌بری اتریبیوت {#attribute-inheritance}

یک "fallthrough attribute" یک ویژگی یا listener رویداد `v-on` است که به کامپوننت پاس داده می‌شود، اما به طور روشن در [props](./props) یا [emits](./events#declaring-emitted-events)  تعریف نشده است. نمونه‌های رایج آن ویژگی‌های `class` ، `style` و `id` هستند.

وقتی یک کامپوننت (فقط) یک root element را رندر می‌کند، ویژگی‌های fallthrough به طور خودکار به اتریبیوت‌های آن root element اضافه می‌شوند. به عنوان مثال، با در نظر گرفتن یک کامپوننت `<MyButton>` با تمپلیت زیر:

```vue-html
<!-- template of <MyButton> -->
<button>click me</button>
```

و یک والد که از این کامپوننت به شکل زیر استفاده می‌کند:

```vue-html
<MyButton class="large" />
```

DOM نهایی رندر شده به این صورت خواهد بود:

```html
<button class="large">click me</button>
```

در اینجا، `<MyButton>`  ویژگی `class` را به عنوان یک prop پذیرفته شده اعلام نکرده است. بنابراین، `class` به عنوان یک ویژگی fallthrough در نظر گرفته شده و به طور خودکار به root element کامپوننت `<MyButton>` اضافه می‌شود.

### ادغام `class` و `style` {#class-and-style-merging}

اگر root element کامپوننت فرزند از قبل ویژگی‌های `class` یا `style` را داشته باشد، (مقادیر) آنها با مقادیر `class` و `style` به ارث برده شده از والد ادغام می‌شود. فرض کنید تمپلیت `<MyButton>` در مثال قبلی را به این صورت تغییر دهیم:

```vue-html
<!-- template of <MyButton> -->
<button class="btn">click me</button>
```

سپس DOM نهایی رندر شده به این صورت خواهد بود:

```html
<button class="btn large">click me</button>
```

### ارث‌بری listenerهای `v-on` {#v-on-listener-inheritance}

همان قانون برای listenerهای رویداد `v-on` اعمال می‌شود:

```vue-html
<MyButton @click="onClick" />
```

دریافت‌کننده رویداد `click` به root element کامپوننت `<MyButton>` اضافه می‌شود، یعنی `<button>`. وقتی روی `<button>` اصلی کلیک شود، متد `onClick` از کامپوننت والد را فراخوانی می‌کند. اگر `<button>` از قبل یک دریافت‌کننده رویداد `click` با `v-on` داشته باشد، آنگاه هر دو فراخوانی می‌شوند.

### ارث‌بری کامپوننت‌های تودرتو {#nested-component-inheritance}

اگر یک کامپوننت، کامپوننت دیگری را به عنوان node ریشه‌اش (root node) رندر کند، به عنوان مثال،  `<MyButton>` را بازنویسی کردیم تا `<BaseButton>` را به عنوان ریشه‌اش رندر کند:

```vue-html
<!-- که صرفاً یک کامپوننت دیگر را رندر می‌کند <MyButton/> تمپلیت -->
<BaseButton />
```

سپس ویژگی‌های fallthrough دریافت شده توسط `<MyButton>` به طور خودکار به `<BaseButton>` ارسال می‌شوند.

توجه داشته باشید که:

1. ویژگی‌های ارسال شده شامل هیچ‌کدام از اتریبیوت‌هایی که به عنوان props تعریف شده‌اند، یا listenerهای `v-on` رویدادهای تعریف شده توسط `<MyButton>` نمی‌شوند - به عبارت دیگر، props و listenerهای **تعریف شده** توسط `<MyButton>` "مصرف" شده‌اند.

2. ویژگی‌های ارسال شده ممکن است به عنوان props توسط `<BaseButton>` پذیرفته شوند، اگر توسط آن اعلام شده باشند.

## غیرفعال کردن ارث‌بری اتریبیوت {#disabling-attribute-inheritance}

اگر **نمی‌خواهید** یک کامپوننت به طور خودکار ویژگی‌ها را به ارث ببرد، می‌توانید `inheritAttrs: false` را در آپشن‌های کامپوننت تنظیم کنید.

<div class="composition-api">

از نسخه 3.3 می‌توانید از [`defineOptions`](/api/sfc-script-setup#defineoptions) مستقیماً در `<script setup>` استفاده کنید:

```vue
<script setup>
defineOptions({
  inheritAttrs: false
})
// ...setup logic
</script>
```

</div>

سناریوی معمول برای غیرفعال کردن وراثت ویژگی‌ها زمانی است که attributeها نیاز دارند به عناصر دیگری به غیر از node ریشه اعمال شوند. با تنظیم گزینه `inheritAttrs` بر روی `false`، می‌توانید کنترل کاملی بر اینکه ویژگی‌های fallthrough کجا باید اعمال شوند، داشته باشید.

می‌توانید به این ویژگی‌های fallthrough مستقیماً در  expression‌های تمپلیت به عنوان `‎$attrs` دسترسی داشته باشید:

```vue-html
<span>Fallthrough attributes: {{ $attrs }}</span>
```

شی `‎$attrs` شامل تمام ویژگی‌هایی است که توسط `props` یا `emits` کامپوننت اعلام نشده‌اند (مثلا `class`، `style`، `v-on` و غیره).

توجه داشته باشید که:

- برخلاف props، ویژگی‌های fallthrough (حساسیت به) حروف بزرگ و کوچک اصلی خود را در جاوااسکریپت حفظ می‌کنند، بنابراین یک ویژگی مثل `foo-bar` نیاز دارد که به صورت `‎$attrs['foo-bar']` صدا زده شود.

- یک دریافت‌کننده رویداد `v-on` مثل `‎@click` در آبجکت به عنوان یک تابع تحت `‎$attrs.onClick` در دسترس است.

با استفاده از [مثال کامپوننت](#attribute-inheritance) `<MyButton>` از بخش قبلی - گاهی اوقات ممکن است (برای پاسخ به) اهداف مرتبط با استایل، نیاز داشته باشیم `<button>` واقعی را درون یک `<div>` اضافی قرار دهیم:

```vue-html
<div class="btn-wrapper">
  <button class="btn">click me</button>
</div>
```

(در عین حال) می‌خواهیم تمام ویژگی‌های fallthrough مثل `class` و listenerهای `v-on` به `<button>` داخلی اعمال شوند، نه `<div>` بیرونی. می‌توانیم با استفاده از `inheritAttrs: false` و `v-bind="$attrs"‎` این کار را انجام دهیم:

```vue-html{2}
<div class="btn-wrapper">
  <button class="btn" v-bind="$attrs">click me</button>
</div>
```

به یاد داشته باشید که [v-bind بدون آرگومان](/guide/essentials/template-syntax#dynamically-binding-multiple-attributes) تمام پراپرتی‌های یک شی را به عنوان attributeهای عنصر هدف bind می‌کند.

## ارث‌بری اتریبیوت‌ها در چندین Root Nodes {#attribute-inheritance-on-multiple-root-nodes}

برخلاف کامپوننت‌هایی با یک root node، کامپوننت‌هایی با چندین root node رفتار اتصال خودکار اتریبیوت‌ها را ندارند. اگر `‎$attrs` به طور صریح اتصال داده نشده باشد، یک هشدار زمان اجرا صادر می‌شود.

```vue-html
<CustomLayout id="custom-layout" @click="changeValue" />
```

اگر `<CustomLayout>` تمپلیت چند ریشه‌ای زیر را داشته باشد، به دلیل اینکه Vue نمی‌تواند مطمئن باشد که ویژگی‌ها را کجا اعمال کند، هشداری نمایش داده می‌شود:

```vue-html
<header>...</header>
<main>...</main>
<footer>...</footer>
```

اگر `‎$attrs` به طور واضح متصل شود، هشدار دیگر نمایش داده نخواهد شد:

```vue-html{2}
<header>...</header>
<main v-bind="$attrs">...</main>
<footer>...</footer>
```

## دسترسی به Fallthrough Attributes در جاوااسکریپت {#accessing-fallthrough-attributes-in-javascript}

<div class="composition-api">

در صورت نیاز، می‌توانید در `<script setup>` با استفاده از API تعریف شده `useAttrs()‎` به ویژگی‌های fallthrough یک کامپوننت دسترسی پیدا کنید:

```vue
<script setup>
import { useAttrs } from 'vue'

const attrs = useAttrs()
</script>
```

اگر از `<script setup>` استفاده نمی‌کنید، `attrs` به عنوان یک خاصیت از context در `setup()‎` در دسترس خواهد بود:

```js
export default {
  setup(props, ctx) {
    // در دسترس هستند ctx.attrs به عنوان fallthrough ویژگی‌های
    console.log(ctx.attrs)
  }
}
```

توجه داشته باشید اگرچه در اینجا آبجکت `attrs` همیشه آخرین fallthrough attributes را برمی گرداند، اما reactive نیست (به خاطر دلایل عملکردی). نمی‌توانید از watcherها برای مشاهده تغییرات آن استفاده کنید. اگر به reactivity نیاز دارید، از یک prop استفاده کنید. به عنوان جایگزین، می‌توانید از `onUpdated()‎` برای افکت جانبی با آخرین `attrs` در هر به‌روزرسانی استفاده کنید.

</div>

<div class="options-api">

در صورت نیاز، می‌توانید از طریق خاصیت `‎$attrs` در مثال به fallthrough attributes یک کامپوننت دسترسی پیدا کنید:

```js
export default {
  created() {
    console.log(this.$attrs)
  }
}
```

</div>
