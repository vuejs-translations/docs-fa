# سینتکس قالب {#template-syntax}

Vue  از سینتکس قالب برپایه HTML استفاده میکند که این اجازه رو به شما میدهد تا DOM نمایش داده شده را به دیتای نمونه کامپوننت پایه متصل کند. 
تمام قالبهای Vue از لحاظ سینتکس،HTML  معتبر هستند که میتوانند توسط مرورگرهای با مشخصات سازگار و تحلیل کننده‌های HTML تحلیل شوند.

در ماءواری ماجرا، Vue قالبها را به کد جاوا اسکریپت بسیار بهینه شده کامپایل میکند. همراه با سیستم واکنش پذیری، Vue میتواند بصورت هوشمندانه از حداقل تعداد کامپوننتهایی که باید مجددا رندر شوند و در هنگام تغییر وضعیت برنامه، حداقل دستکاری‌های DOM را اعمال کند.

اگر با کلیت Virtual DOM آشنا هستید و قدرت خالص جاوااسکریپت را ترجیح می‌دهید، شما همچنین می‌توانید [مستقیما توابع مربوط به تحلیل را](/guide/extras/render-function) بجای قالبها، با پشتیبانی اختیاری از JSX بنویسید.

## درج متن {#text-interpolation}

پایه‌ای ترین شکل بایند داده درج متن با سینتکس سیبیل (دو آکولاد) میباشد:

```vue-html
<span>پیام: {{ msg }}</span>
```

تگ سیبیل با مقدار `msg`، [پراپرتی از شی کامپوننت مربوطه] (/guide/essentials/reactivity-fundamentals#declaring-reactive-state) جایگزین خواهد شد. همچنین این مقدار با هر تغییر در پراپرتی `msg` بروزرسانی خواهد شد.


## HTML خام {#raw-html}

آکولاد دوتایی داده را به عنوان متن ساده تفسیر میکند. برای خروجی HTML واقعی باید از [دایرکتیو `v-html`](/api/built-in-directives#v-html) استفاده کنید.

```vue-html
<p>استفاده از درون‌یابی متن: {{ rawHtml }}</p>
<p>استفاده از دایرکتیو v-html: <span v-html="rawHtml"></span></p>
```

<script setup>
  const rawHtml = '<span style="color: red">این باید قرمز باشد.</span>'
</script>

<div class="demo">
  <p>استفاده از درون‌یابی متن: {{ rawHtml }}</p>
  <p>استفاده از دایرکتیو v-html: <span v-html="rawHtml"></span></p>
</div>

اینجا با چیزی جدید مواجه شده ایم. اتریبیوت `v-html` همانطور که می‌بینید **دایرکتیو** نام گذاری شده است. دایرکتیوها پیشوند `v-` دارند تا نمایش دهنده این باشد که آنها اتریبیوت خاصی هستند که توسط Vue عرضه شده است و همانطور که ممکن است حدس زده باشید، آنها رفتار واکنشی ویژه ای را به DOM رندر شده اعمال می کنند. اینجاست که ما اساسا می‌گوییم "این عنصر داخلی HTML را با پراپرتی `rawHTML` بر شی فعال حال حاضر بروز رسانی نگهدارید.

محتوای `span` با مقدار پراپرتی `rawHtml` جایگزین خواهد شد، که بعنوان HTML ساده تفسیر میشود. بایند دیتا در اینجا نادیده گرفته میشود. در نظر داشته باشید که شما نمیتوانید از `v-html` برای بایند بخشی از قالب استفاده کنید، زیرا که Vue یک موتور قالب‌بندی برپایه استرینگ نیست. در عوض، کامپوننت‌ها به عنوان واحدهای اساسی برای استفاده مجدد و بایند UI ارجحتر هستند.


:::warning هشدار امنیتی
رندر داینامیکی HTML دلخواه بر وبسایت شما میتواند بسیار خطرناک باشد زیرا که میتواند به آسانی منجر به ]آسیب پذیری XSS [ (https://en.wikipedia.org/wiki/Cross-site_scripting) شود. از `v-html` فقط بر مطالب مورد اعتماد استفاده کنید و **هرگز** بر محتوای ارائه شده توسط کاربر استفاده نکنید.
:::


## بایند اتریبیوت {#attribute-bindings}

آکولادها نمیتوانند در اتریبیوت HTML استفاده شوند. در عوض یک [دایرکتیو `v-bind`](/api/built-in-directives#v-bind):

```vue-html
<div v-bind:id="dynamicId"></div>
```

دایرکتیو `v-bind` به Vue دستور میدهد تا اتریبیوت `id` یک المنت را همگام با پراپرتی `dynamicId` کامپوننت نگهدارد. اگر مقدار مقید شده برابر با `null` یا `undefined` باشد، سپس اتریبیوت از المنت رندر شده حذف خواهد شد.

### مختصر نویسی {#shorthand}

به این دلیل که `v-bind` استفاده خیلی رایجی دارد. درنتیجه یک قاعده دستوری اختصاصی مختصر نویسی دارد:

```vue-html
<div :id="dynamicId"></div>
```


اتریبیوتهایی که با `:` شروع میشوند ممکن است یه مقدار نسب به HTML عادی متفاوت بنظر بیان، اما این درواقع یک کاراکتر صحیح برای نامهای اتریبیوت است و تمام مرورگرهایی که از Vue پشتیبانی میکنند، میتوانند آنرا بدرستی پارس کنند. علاوه بر این، آنها در علامت نهایی رندر شده ظاهر نمیشوند. قاعده دستوری اختصاصی اختیاری میباشد، اما شما بخوبی از آن قدردان خواهید شد وقتی که از کاربردهای آن بعدا بیشتر یاد بگیرید.

> For the rest of the guide, we will be using the shorthand syntax in code examples, as that's the most common usage for Vue developers.

### اتریبیوت‌های بولین {#boolean-attributes}

[اتریبیوتهای بولین](https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#boolean-attributes) اتریبیوتهایی هستند که میتواند true / false بودن مقادیر را با حضور آنها بر یک المنت نشان داد. برای مثال، [`disabled`](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/disabled) یکی رایج ترین اتریبیوتهای بولین استفاده شده میباشد.


`v-bind` در این مورد مقداری متفاوت عمل میکند:

```vue-html
<button :disabled="isButtonDisabled">دکمه</button>
```

اگر  `isButtonDisabled` [یک مقدار ترو](https://developer.mozilla.org/en-US/docs/Glossary/Truthy) داشته باشد شامل اتریبیوت `disabled` خواهد شد. آن همچنان شامل خواهد شد اگر مقدار یک رشته خالی است، حفظ سازگاری با `<button disabled="">`.  برای بقیه [مقدارهای فالس](https://developer.mozilla.org/en-US/docs/Glossary/Falsy) اتریبیوت حذف خواهد شد.

### بایند داینامیک چندین اتریبیوت {#dynamically-binding-multiple-attributes}

اگر یک آبجکت جاوا اسکریپت دارید که چندین اتریبیوت را نمایش میدهد که مانند این است:

<div class="composition-api">

```js
const objectOfAttrs = {
  id: 'container',
  class: 'wrapper'
}
```

</div>
<div class="options-api">

```js
data() {
  return {
    objectOfAttrs: {
      id: 'container',
      class: 'wrapper'
    }
  }
}
```

</div>

شما می‌توانید آنهارا با یک المنت واحد با استفاده از `v-bind` بدون آرگیومنت بایند کنید

```vue-html
<div v-bind="objectOfAttrs"></div>
```

## استفاده از عبارات جاوا اسکریپت {#using-javascript-expressions}


تا کنون ما فقط به بایند کلیدهای پراپرتی ساده در قالب خود پرداختیم. اما Vue درواقع بطور قوی از عبارات جاوااسکریپت در تمام بایندهای دیتا پشتیبانی میکند

```vue-html
{{ number + 1 }}

{{ ok ? 'YES' : 'NO' }}

{{ message.split('').reverse().join('') }}

<div :id="`list-${id}`"></div>
```

این عبارات بعنوان جاوااسکریپت در محدوده داده شی کامپوننت حال حاضر ارزیابی خواهند شد

در قالبهای Vue، عبارات جاوااسکریپت میتوانند در جایگاه‌های زیر استفاده شوند

- داخل درون‌یابیهای متن (آکولادها)
- در مقدارهای اتریبیوت و هر یک از دایرکتیوهای Vue (اتریبیوتهای خاصی که با `v-` آغاز می‌شوند)
- In the attribute value of any Vue directives (special attributes that start with `v-`)

### فقط عبارات {#expressions-only}

هر بایندی میتواند فقط شامل **یک تک اصطلاح** باشد. یک عبارتیک تکه از کدی است که میتواند برابر با یک مقداری باشد. یک بررسی ساده این است که آیا می توان از آن پس از "بازگشت" استفاده کرد یا خیر.

بنابراین موارد زیر کار **نمیکند**

```vue-html
<!-- این یک جمله است، نه اصطلاح: -->
{{ var a = 1 }}

<!-- کنترل جریان نیز کار نمی کند، از عبارت های سه تایی استفاده کنید -->
{{ if (ok) { return message } }}
```

### فراخوانی توابع {#calling-functions}

این ممکن است که متد کامپوننت شده درون اصلاح بایندی فراخوانی شود

```vue-html
<time :title="toTitleDate(date)" :datetime="date">
  {{ formatDate(date) }}
</time>
```

:::راهنمایی
توابعی که داخلی عبارات بایندی فراخوانی شده اند، هر دفعه که کامپوننت آپدیت میشود فراخونی خواهد شد، بنابراین آنها **نباید** هیچ اثر جانبی داشته باشد،
همچون تغییر داده ها یا شروع عملیات ناهمزمان.
:::

### دسترسی سراسری محدود شده {#restricted-globals-access}

عبارات قالب سندباکس هستند و فقط به [لیست سراسریهای محدود شده](https://github.com/vuejs/core/blob/main/packages/shared/src/globalsAllowList.ts#L3) دسترسی دارند. این لیست سراسریهای داخلی که رایج‌ در استفاده هستند را نمایش میدهد، مانند `Math` و `Date`.

سراسریها به صراحت در این لیست گنجانده نشده‌اند، برای مثال پراپرتی‌های پیوست شده توسط کاربر بر `window`، در عبارات قالب دسترس نخواهد بود. شما میتوانید، اگرچه، بطور صریح سراسریهای بیشتر برای تمام عبارات Vue با افزودن آنها به [`app.config.globalProperties`](/api/application#app-config-globalproperties) تعریف کنید.

## دایرکتیوها {#directives}

دایرکتیوها اتریبیوتهای ویژه‌ای هستند با پیشوند `v-`. Vue تعدادی [دایرکتیو داخلی](/api/built-in-directives) فراهم میکند، از جمله `v-html` و `v-bind` که ما بالاتر معرفی کردیم.

مقادیر اتریبیوت دایرکتیو مورد انتظار است تا یک تک عبارتجاوا اسکریپتی باشد (با استثنا `v-for`، `v-on` و `v-slot`، که بعدا در بخشهای مربوط به آنها مورد بحث قرار خواهد گرفت). کار یک دایرکتیو اعمال کردن تغییرات به دام بصورت فعال میباشد وقتی که مقدار عبارت آن تغییر میکند. [`v-if`](/api/built-in-directives#v-if) را به عنوان مثال درنظر بگیرید:

```vue-html
<p v-if="seen">حالا منو میبینی</p>
```

اینجا دایرکتیو `v-if` افزوده / حذف خواهد کرد المنت `<p>` را بر پایه ترو بودن مقدار عبارت `seen`.

### Arguments {#arguments}

Some directives can take an "argument", denoted by a colon after the directive name. For example, the `v-bind` directive is used to reactively update an HTML attribute:

```vue-html
<a v-bind:href="url"> ... </a>

<!-- shorthand -->
<a :href="url"> ... </a>
```

Here, `href` is the argument, which tells the `v-bind` directive to bind the element's `href` attribute to the value of the expression `url`. In the shorthand, everything before the argument (i.e., `v-bind:`) is condensed into a single character, `:`.

Another example is the `v-on` directive, which listens to DOM events:

```vue-html
<a v-on:click="doSomething"> ... </a>

<!-- shorthand -->
<a @click="doSomething"> ... </a>
```

Here, the argument is the event name to listen to: `click`. `v-on` has a corresponding shorthand, namely the `@` character. We will talk about event handling in more detail too.

### Dynamic Arguments {#dynamic-arguments}

It is also possible to use a JavaScript expression in a directive argument by wrapping it with square brackets:

```vue-html
<!--
Note that there are some constraints to the argument expression,
as explained in the "Dynamic Argument Value Constraints" and "Dynamic Argument Syntax Constraints" sections below.
-->
<a v-bind:[attributeName]="url"> ... </a>

<!-- shorthand -->
<a :[attributeName]="url"> ... </a>
```

Here, `attributeName` will be dynamically evaluated as a JavaScript expression, and its evaluated value will be used as the final value for the argument. For example, if your component instance has a data property, `attributeName`, whose value is `"href"`, then this binding will be equivalent to `v-bind:href`.

Similarly, you can use dynamic arguments to bind a handler to a dynamic event name:

```vue-html
<a v-on:[eventName]="doSomething"> ... </a>

<!-- shorthand -->
<a @[eventName]="doSomething">
```

In this example, when `eventName`'s value is `"focus"`, `v-on:[eventName]` will be equivalent to `v-on:focus`.

#### Dynamic Argument Value Constraints {#dynamic-argument-value-constraints}

Dynamic arguments are expected to evaluate to a string, with the exception of `null`. The special value `null` can be used to explicitly remove the binding. Any other non-string value will trigger a warning.

#### Dynamic Argument Syntax Constraints {#dynamic-argument-syntax-constraints}

Dynamic argument expressions have some syntax constraints because certain characters, such as spaces and quotes, are invalid inside HTML attribute names. For example, the following is invalid:

```vue-html
<!-- This will trigger a compiler warning. -->
<a :['foo' + bar]="value"> ... </a>
```

If you need to pass a complex dynamic argument, it's probably better to use a [computed property](./computed), which we will cover shortly.

When using in-DOM templates (templates directly written in an HTML file), you should also avoid naming keys with uppercase characters, as browsers will coerce attribute names into lowercase:

```vue-html
<a :[someAttr]="value"> ... </a>
```

The above will be converted to `:[someattr]` in in-DOM templates. If your component has a `someAttr` property instead of `someattr`, your code won't work. Templates inside Single-File Components are **not** subject to this constraint.

### Modifiers {#modifiers}

Modifiers are special postfixes denoted by a dot, which indicate that a directive should be bound in some special way. For example, the `.prevent` modifier tells the `v-on` directive to call `event.preventDefault()` on the triggered event:

```vue-html
<form @submit.prevent="onSubmit">...</form>
```

You'll see other examples of modifiers later, [for `v-on`](./event-handling#event-modifiers) and [for `v-model`](./forms#modifiers), when we explore those features.

And finally, here's the full directive syntax visualized:

![directive syntax graph](./images/directive.png)

<!-- https://www.figma.com/file/BGWUknIrtY9HOmbmad0vFr/Directive -->
