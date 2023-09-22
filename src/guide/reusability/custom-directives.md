# دایرکتیوهای شخصی سازی شده {#custom-directives}

<script setup>
const vFocus = {
  mounted: el => {
    el.focus()
  }
}
</script>

## مقدمه {#introduction}

<!-- In addition to the default set of directives shipped in core (like `v-model` or `v-show`), Vue also allows you to register your own custom directives. -->

 Vue به شما امکان می دهد علاوه بر مجموعه دایرکتیوهایی که به صورت پیش فرض وجود دارد
 (مانند `v-model` یا `v-show`), دایرکتیوهای شخصی سازی شده خود را ثبت کنید.


<!-- We have introduced two forms of code reuse in Vue: [components](/guide/essentials/component-basics) and [composables](./composables). Components are the main building blocks, while composables are focused on reusing stateful logic. Custom directives, on the other hand, are mainly intended for reusing logic that involves low-level DOM access on plain elements. -->

ما دو روش کد که در ویو باز استفاده می شوند را معرفی کردیم: [کامپوننت ها](/guide/essentials/component-basics) و [کامپوزبل ها](./composables). کامپوننت ها قالب های اصلی ساخت هستند در حالیکه کامپوزبل ها روی استفاده دوباره منطق حالتی تمرکز کرده اند. دایرکتیو های شخصی سازی شده, از طرف دیگر , اساسا برای استفاده دوباره منطقی که شامل دسترسی سطح پایین DOM به المنت های ساده هستند تعیین شدند.

<!-- A custom directive is defined as an object containing lifecycle hooks similar to those of a component. The hooks receive the element the directive is bound to. Here is an example of a directive that focuses an input when the element is inserted into the DOM by Vue: -->

یک دایرکتیو شخصی سازی شده به عنوان یک شی (object) شامل هوک های چرخه حیات می باشد که مشابه هوک های کامپوننت هستند. هوک ها المنتی که به دایرکتیو متصل (bound) هست را دریافت می کنند. در اینجا مثالی از یک دایرکتیو آورده شده که عمل فوکس(focus) را بر روی المنت اینپوت(input) هنگاهی که Vue اینپوت را درون DOM وارد می کند انجام می دهد:

<div class="composition-api">

```vue
<script setup>
// v-focus را در تمپلیت ها فعال می کند
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
    // v-focus را در تمپلیت ها فعال می کند
    focus
  }
}
```

```vue-html
<input v-focus />
```

</div>

<div class="demo">
  <input v-focus placeholder="اینجا باید در حالت فوکس باشد" />
</div>

<!-- Assuming you haven't clicked elsewhere on the page, the input above should be auto-focused. This directive is more useful than the `autofocus` attribute because it works not just on page load - it also works when the element is dynamically inserted by Vue. -->

با فرض اینکه شما هیچ جای صفحه کلیک نکرده باشید, اینپوت مثال بالا باید به صورت خودکار فوکس شده باشد. دایرکتیو از ویژگی `autofocus` مفیدتر است زیرا نه تنها در صفحه لود شده کار می دهد بلکه درون المنت هایی که به صورت پویا (dynamic) ساخته شده اند کار می دهد.

<div class="composition-api">

<!-- In `<script setup>`, any camelCase variable that starts with the `v` prefix can be used as a custom directive. In the example above, `vFocus` can be used in the template as `v-focus`. -->

درون `<script setup>`, هر متغیری به شکل camelCase که با پیشوند `v` شروع می شود می تواند به عنوان یک دایرکتیو شخصی سازی شده استفاده بشه. در مثال بالا, `vFocus` میتواند درون تمپلیت (template) به صورت `v-focus` استفاده بشه.

<!-- If not using `<script setup>`, custom directives can be registered using the `directives` option: -->

اگه از `<script setup>` استفاده نمی کنید, دایرکتیو های شخصی سازی شده می تونن با استفاده از گزینه (option) `directives` استفاده شوند.

```js
export default {
  setup() {
    /*...*/
  },
  directives: {
    // v-focus را در تمپلیت فعال می کند
    focus: {
      /* ... */
    }
  }
}
```

</div>

<div class="options-api">

<!-- Similar to components, custom directives must be registered so that they can be used in templates. In the example above, we are using local registration via the `directives` option. -->

مشابه با کامپوننت ها، دایرکتیوهای شخصی سازی شده برای استفاده در تمپلیت ها بایستی حتما ثبت (register) شوند. در مثال بالا، داریم از ثبت محلی (local registeration) با گزینه (option) `directives` استفاده می کنیم.

</div>

<!-- It is also common to globally register custom directives at the app level: -->

همچنین روش رایج دیگر، ثبت کردن دایرکتیوهای شخصی سازی شده در سطح app به صورت همگانی (globally) می باشد:

```js
const app = createApp({})

// v-focus را درون همه کامپوننت ها قابل استفاده کن
app.directive('focus', {
  /* ... */
})
```

:::tip نکته
<!-- Custom directives should only be used when the desired functionality can only be achieved via direct DOM manipulation. Prefer declarative templating using built-in directives such as `v-bind` when possible because they are more efficient and server-rendering friendly. -->

دایرکتیوهای شخصی سازی شده فقط باید زمانی استفاده شوند که عملکرد مورد نظر فقط از طریق دستکاری مستقیم DOM حاصل شود. در صورت امکان، قالب اعلامی با استفاده از دایرکتیوهای نهادینه شده مانند `v-bind` را ترجیح دهید زیرا کارامد تر و سرور-رندر دوستانه تر هستند.
:::

## هوک های دایرکتیو {#directive-hooks}

<!-- A directive definition object can provide several hook functions (all optional): -->

یک شی دایرکتیو میتونه چندین تابع هوک چرخه حیات را فراهم کند (همگی اختیاری هستند):

```js
const myDirective = {
  // قبل از اتصال ویژگی های المنت 
  // یا اعمال شدن event listeners ها صدا زده می شود
  created(el, binding, vnode, prevVnode) {
    // see below for details on arguments
  },
  // درست قبل از اینکه المنت وارد DOM شود صدا زده می شود.
  beforeMount(el, binding, vnode, prevVnode) {},
  // هنگامی صدا زده می شود که تمام المنت های کامپوننت والد
  // به همراه تمامی فرزندانش درون DOM قرار گرفته 
  mounted(el, binding, vnode, prevVnode) {},
  // قبل از اینکه کامپوننت والد بروز رسانی شود صدا زده می شود
  beforeUpdate(el, binding, vnode, prevVnode) {},
  // بعد از اینکه کامپوننت والد و 
  // همه فرزاندش به روز رسانی شدند صدا زده می شود
  updated(el, binding, vnode, prevVnode) {},
  // قبل از اینکه کامپوننت والد آنمانت شود صدا زده می شود
  beforeUnmount(el, binding, vnode, prevVnode) {},
  // هنگامی صدا زده می شود که کامپوننت والد آنمانت شده
  unmounted(el, binding, vnode, prevVnode) {}
}
```

### آرگومان های هوک {#hook-arguments}

<!-- Directive hooks are passed these arguments: -->

هوک های دایرکتیو آرگومان های زیر را قبول می کنند:

<!-- - `el`: the element the directive is bound to. This can be used to directly manipulate the DOM. -->

- `el`: المنتی که دایرکتیو به آن متصل است. این آرگومان می تواند مستقیما برای دستکاری DOM استفاده شود. 

<!-- - `binding`: an object containing the following properties. -->

- `binding`: این شی شامل پراپرتی های زیر است.
  <!-- - `value`: The value passed to the directive. For example in `v-my-directive="1 + 1"`, the value would be `2`. -->

  - `value`: مقداری که به دایرکتیو ارسال میشود. برای مثال در `v-my-directive="1 + 1"`, مقدار ارسال شده `2` خواهد بود.


  <!-- - `oldValue`: The previous value, only available in `beforeUpdate` and `updated`. It is available whether or not the value has changed. -->

  - `oldValue`: مقدار قبلی، تنها درون هوک های `beforeUpdate` و `updated` قابل دسترس هست. خواه مقدار تغییر بکند خواه نکند این پراپرتی در دسترس هست.

  <!-- - `arg`: The argument passed to the directive, if any. For example in `v-my-directive:foo`, the arg would be `"foo"`. -->

  - `arg`: آرگومانی که در صورت وجود به دایرکتیو ارسال می شود. برای مثال در `v-my-directive:foo`, آرگومان `"foo"` می باشد.

  <!-- - `modifiers`: An object containing modifiers, if any. For example in `v-my-directive.foo.bar`, the modifiers object would be `{ foo: true, bar: true }`. -->

  - `modifiers`:  یک شی که شامل مدیفایرها هست که در صورت وجود به دایرکتیو ارسال می شود. برای مثال در `v-my-directive.foo.bar`,  شی شامل مدیفایرهای `{ foo: true, bar: true }` می باشد.

  <!-- - `instance`: The instance of the component where the directive is used. -->

  - `instance`: نمونه ای از کامپوننتی که دایرکتیو درون آن استفاده شده.

  <!-- - `dir`: the directive definition object. -->

  - `dir`: مشخصات شی دایرکتیو

<!-- - `vnode`: the underlying VNode representing the bound element. -->

- `vnode`: نود اصلی که ارائه دهنده المنت متصل است

<!-- - `prevNode`: the VNode representing the bound element from the previous render. Only available in the `beforeUpdate` and `updated` hooks. -->

- `prevNode`: نودی که ارائه دهنده المنت اصلی از رندر قبلی است. فقط درون هوک های `beforeUpdate` و `updated` قابل دسترس هست.

<!-- As an example, consider the following directive usage: -->

به عنوان مثال، کاربرد دایرکتیو زیر را در نظر بگیرید:

```vue-html
<div v-example:foo.bar="baz">
```

<!-- The `binding` argument would be an object in the shape of: -->

آرگومان `binding` یک شی به شکل زیر است:

```js
{
  arg: 'foo',
  modifiers: { bar: true },
  value: /*  مقدار `baz` */,
  oldValue: /* مقدار `baz` از بروزرسانی قبلی */
}
```

<!-- Similar to built-in directives, custom directive arguments can be dynamic. For example: -->

مشابه دایرکتیوهای نهادینه شده, آرگومان های دایرکیتو شخصی سازی شده میتوانند پویا باشند. برای مثال:

```vue-html
<div v-example:[arg]="value"></div>
```

<!-- Here the directive argument will be reactively updated based on `arg` property in our component state. -->

در اینجا آرگومان دایرکتیو بر اساس پراپرتی `arg` درون استیت کامپوننت ما به صورت ری اکتیو بروزرسانی می شود.

:::tip توجه
<!-- Apart from `el`, you should treat these arguments as read-only and never modify them. If you need to share information across hooks, it is recommended to do so through element's [dataset](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset). -->

جدا از `el`, شما باید با این آرگومان ها به صورت فقط خواندنی (read-only) رفتار کنید و هرگز آنها را تغییر ندهید. اگر شما نیاز دارید این اطلاعات را از طریق هوک ها به اشتراک بزارید، پیشنهاد میشه که این کار را از طریق المنت های [dataset](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset) انجام دهید.
:::

## مختصر نویسی تابع {#function-shorthand}

<!-- It's common for a custom directive to have the same behavior for `mounted` and `updated`, with no need for the other hooks. In such cases we can define the directive as a function: -->

معمول است که یک دایرکتیو شخصی سازی شده برای هوک های `mounted` و `updated` رفتار یکسانی داشته باشد، بدون نیاز به هوک های دیگر. در چنین مواردی میتوانیم دایرکتیو را به صورت تابع تعریف کنیم:

```vue-html
<div v-color="color"></div>
```

```js
app.directive('color', (el, binding) => {
  // برای هر دو هوک `mounted` و `updated` صدا زده می شود
  el.style.color = binding.value
})
```

## اشیاء تحت اللفظی {#object-literals}

<!-- If your directive needs multiple values, you can also pass in a JavaScript object literal. Remember, directives can take any valid JavaScript expression. -->

اگر دایرکتیو شما نیازمند مقادیر مختلفی هست، شما میتوانید یک شی تحت اللفظی(object literal) جاوااسکریپتی را بعنوان مقدار تعیین کنید. به یاد داشته باشید، دایرکتیوها می توانند هر عبارت معتبر جاوااسکریپتی را دریافت کنند.

```vue-html
<div v-demo="{ color: 'white', text: 'hello!' }"></div>
```

```js
app.directive('demo', (el, binding) => {
  console.log(binding.value.color) // => "white"
  console.log(binding.value.text) // => "hello!"
})
```

## کاربرد در کامپوننت ها {#usage-on-components}

<!-- When used on components, custom directives will always apply to a component's root node, similar to [Fallthrough Attributes](/guide/components/attrs). -->

دایرکتیوهای شخصی سازی شده همانند [Fallthrough Attributes](/guide/components/attrs) برای استفاده در کامپوننت ها باید در نود ریشه (root node) به کار روند.

```vue-html
<MyComponent v-demo="test" />
```

```vue-html
<!-- template of MyComponent -->

<div> <!-- دایرکتیو v-demo اینجا به کار می رود -->
  <span>My component content</span>
</div>
```

<!-- Note that components can potentially have more than one root node. When applied to a multi-root component, a directive will be ignored and a warning will be thrown. Unlike attributes, directives can't be passed to a different element with `v-bind="$attrs"`. In general, it is **not** recommended to use custom directives on components. -->

توجه داشته باشید که کامپوننت ها به طور بالقوه میتوانند بیشتر از یک نود ریشه داشته باشند. یک دایرکتیو هنگامی که بر کامپوننتی با چندین نود ریشه اعمال می شود نادیده گرفته خواهد شد و اخطار داده می شود. دایرکتیوها برخلاف ویژگی ها(attributes) نمی توانند با استفاده از `v-bind="$attrs"` به المنت دیگری ارسال شوند. به طور کلی، توصیه می شود که از دایرکتیوهای شخصی سازی شده درون کامپوننت ها استفاده **نکنید**.
