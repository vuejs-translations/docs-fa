---
outline: deep
---

# توابع رندر و JSX {#render-functions-jsx}

Vue به شما توصیه می‌کند که در اکثر موارد از تمپلیت ها برای ایجاد برنامه‌ها استفاده کنید. اما گاهی نیاز به استفاده از قدرت بیشتر برنامه‌نویسی جاوااسکریپت و تغییرات بیشتر در ساختار صفحه دارید. در این صورت، می‌توانید از **تابع رندر** استفاده کنید.

> اگر تازه با مفهوم DOM مجازی و توابع رندر آشنا شده‌اید، حتماً ابتدا فصل [مکانیسم رندر](/guide/extras/rendering-mechanism) را مطالعه کنید.

## کاربرد پایه {#basic-usage}

### ایجاد Vnodes {#creating-vnodes}

ویو یک تابع `h()` برای ایجاد vnode ها فراهم می‌کند:

```js
import { h } from 'vue'

const vnode = h(
  'div', // تایپ
  { id: 'foo', class: 'bar' }, // پراپ ها
  [
    /* فرزندان */
  ]
)
```

تابع `h()` با نام **hyperscript** شناخته می‌شود، که به طور خلاصه به "جاوا اسکریپتی که HTML تولید می‌کند" اشاره دارد. این نام از استفاده‌های متداول در معماری‌های مختلف DOM مجازی الهام گرفته شده است. احتمالاً می‌توانستیم از یک نام مفصل‌تر مانند `createVnode()` استفاده کنیم، اما استفاده از یک نام کوتاه‌تر به ویژه زمانی که شما این تابع را بارها در یک تابع رندر فراخوانی می‌کنید بهتر است.

تابع `h()` بسیار انعطاف‌پذیر طراحی شده است.

```js
// بجز تایپ ، بقیه آرگومان ها اختیاری هستند
h('div')
h('div', { id: 'foo' })

// هر دو ویژگی‌ها و پراپرتی ها می‌توانند در پراپ ها استفاده شوند.
// Vue  به طور خودکار روش مناسب برای اختصاص دادن آن را انتخاب می‌کند.
h('div', { class: 'bar', innerHTML: 'hello' })

// می‌توان پسوندهای پراپ ها مانند `.prop` و `.attr` را اضافه کرد.
// به ترتیب با پیشوندهای `.` و `^`.
h('div', { '.name': 'some-name', '^width': '100' })

// کلاس و استایل دارای یک شیء / آرایه یکسان هستند.
// پشتیبانی از مقادیری که در تمپلیت ها وجود دارند
h('div', { class: [foo, { bar }], style: { color: 'red' } })

// لیسنر های ایونت باید به صورت onXxx ارسال شوند.
h('div', { onClick: () => {} })

// آرگومان فرزندان میتواند رشته باشد
h('div', { id: 'foo' }, 'hello')

// وقتی پراپ ها وجود ندارد، می‌توان پراپ ها را حذف کرد.
h('div', 'hello')
h('div', [h('span', 'hello')])

// آرایه فرزندان می‌تواند شامل vnodes و رشته‌های مختلط باشد.
h('div', ['hello', h('span', 'hello')])
```

نتیجه نهایی Vnode به صورت زیر است:

```js
const vnode = h('div', { id: 'foo' }, [])

vnode.type // 'div'
vnode.props // { id: 'foo' }
vnode.children // []
vnode.key // null
```

:::warning هشدار
رابط کامل `VNode` شامل خصوصیات داخلی دیگری نیز می‌شود، اما به شدت توصیه می‌شود که از هر خصوصیتی به جز آن‌هایی که در اینجا لیست شده‌اند، استفاده نشود. این کار باعث جلوگیری از خطاهای غیرمنتظره در صورت تغییر خصوصیات داخلی می‌شود.
:::

### تعریف توابع رندر {#declaring-render-functions}

<div class="composition-api">

هنگام استفاده از تمپلیت ها با Composition API، مقدار برگشتی از هوک `setup()` برای ارائه داده‌ها به تمپلیت ها استفاده می‌شود. اما هنگام استفاده از توابع رندر، می‌توانیم مستقیماً تابع رندر را برگردانیم.

```js
import { ref, h } from 'vue'

export default {
  props: {
    /* ... */
  },
  setup(props) {
    const count = ref(1)

    // برگرداندن تابع رندر
    return () => h('div', props.msg + count.value)
  }
}
```

تابع رندر درون تابع `setup()` اعلام می‌شود، بنابراین به طور طبیعی دسترسی به پروپ‌ها و هر وضعیت واکنشی اعلام‌شده در همان دامنه را دارد.

علاوه بر برگرداندن یک vnode انفرادی، همچنین می‌توانید رشته‌ها یا آرایه‌ها را برگردانید.

```js
export default {
  setup() {
    return () => 'hello world!'
  }
}
```

```js
import { h } from 'vue'

export default {
  setup() {
    // استفاده از آرایه برای برگردادن چندین المان اصلی
    return () => [h('div'), h('div'), h('div')]
  }
}
```

:::tip نکته
اطمینان حاصل کنید که به جای مستقیم برگرداندن مقادیر، یک تابع را برگردانید! تابع `setup()` تنها یکبار برای هر کامپوننت فراخوانی می‌شود، در حالی که تابع رندر برگردانده شده ممکن است چندین بار فراخوانی شود.
:::

</div>
<div class="options-api">

می‌توانیم از گزینه `render` برای اعلام توابع رندر استفاده کنیم:

```js
import { h } from 'vue'

export default {
  data() {
    return {
      msg: 'hello'
    }
  },
  render() {
    return h('div', this.msg)
  }
}
```

تابع `render()` دسترسی به نمونه کامپوننت از طریق `this` را دارد.

علاوه بر برگرداندن یک vnode همچنین می‌توانید رشته‌ها یا آرایه‌ها را برگردانید.

```js
export default {
  render() {
    return 'hello world!'
  }
}
```

```js
import { h } from 'vue'

export default {
  render() {
    // استفاده از آرایه برای برگردادن چندین المان اصلی
    return [h('div'), h('div'), h('div')]
  }
}
```

</div>

اگر تابع رندر یک کامپوننت نیازی به هیچ وضعیت نمونه‌ای ندارد، می‌توانید آن را مستقیماً به عنوان یک تابع اعلام کنید تا کوتاه‌تر و روان‌تر باشد.

```js
function Hello() {
  return 'hello world!'
}
```

درست است، این یک کامپوننت معتبر Vue است! برای اطلاعات بیشتر درباره این دستور، به [کامپوننت‌های تابعی](#functional-components) مراجعه کنید.

### Vnode ها باید یکتا باشند {#vnodes-must-be-unique}

تمام VNode‌ها در درخت کامپوننتی باید منحصر به فرد باشند، به این معنا که تابع رندر زیر نامعتبر است:

```js
function render() {
  const p = h('p', 'hi')
  return h('div', [
    // ای وای - VNode های تکراری!
    p,
    p
  ])
}
```

اگر می‌خواهید همان عنصر / کامپوننت را بارها تکرار کنید، می‌توانید از یک تابع فکتوری استفاده کنید. به عنوان مثال، تابع رندر زیر یک روش کاملاً معتبر برای نمایش 20 پاراگراف یکسان است:

```js
function render() {
  return h(
    'div',
    Array.from({ length: 20 }).map(() => {
      return h('p', 'hi')
    })
  )
}
```

## JSX / TSX {#jsx-tsx}

[JSX](https://facebook.github.io/jsx/) یک افزونه شبیه به XML برای جاوااسکریپت است که به ما اجازه می‌دهد کد زیر را بنویسیم:

```jsx
const vnode = <div>hello</div>
```

در عبارات JSX، از آکولاد استفاده کنید تا مقادیر پویا را درج کنید:

```jsx
const vnode = <div id={dynamicId}>hello, {userName}</div>
```
هر دو `create-vue` و Vue CLI گزینه‌هایی برای ساخت پروژه‌ها با پشتیبانی از JSX پیش‌تنظیم شده دارند. اگر شما می‌خواهید به‌صورت دستی JSX را پیکربندی کنید، لطفاً به مستندات [`@vue/babel-plugin-jsx`](https://github.com/vuejs/jsx-next) مراجعه کنید.

اگرچه JSX ابتدا توسط React معرفی شد، اما در واقع هیچ قانونی برای سمانتیک زمان اجرا مشخص نشده است و می‌توان آن را به خروجی‌های مختلف متفاوت ترجمه کرد. اگر قبلاً با JSX کار کرده‌اید، توجه داشته باشید که **تبدیل JSX Vue متفاوت از تبدیل JSX React است**، بنابراین نمی‌توانید تبدیل JSX React را در برنامه‌های Vue استفاده کنید. برخی از تفاوت‌های قابل توجه با JSX React عبارتند از:

- شما می‌توانید از ویژگی‌های HTML مانند `class` و `for` به عنوان پراپ‌ها استفاده کنید - نیازی به استفاده از `className` یا `htmlFor` نیست.
- انتقال فرزندان به کامپوننت‌ها (به عبارتی اسلات‌ها) [به شیوه‌ای متفاوت کار می‌کند](#passing-slots).

تعریف نوع Vue در TSX نیز قابلیت تعیین نوع را فراهم می‌کند.وقتی از TSX استفاده می‌کنید، برای تبدیل JSX به Vue، بهتر است `"jsx": "preserve"` را در `tsconfig.json` تنظیم کنید.
### تشخیص تایپ JSX {#jsx-type-inference}

مشابه تبدیل، JSX Vue نیاز به تعاریف‌ تایپ مختلف دارد.

از نسخه 3.4 Vue به بعد، Vue دیگر نیم اسپیس `JSX` را به‌طور خودکار ثبت نمی‌کند. برای اطمینان از اینکه TypeScript به درستی تعاریف نوع JSX Vue را تشخیص می‌دهد، حتماً مطمئن شوید که موارد زیر را در `tsconfig.json` خود قرار داده‌اید:

```json
{
  "compilerOptions": {
    "jsx": "preserve",
    "jsxImportSource": "vue"
    // ...
  }
}
```
همچنین می‌توانید با اضافه کردن یک توضیحات `/* @jsxImportSource vue */` در ابتدای فایل، به طور مستقیم برای هر فایل، این تنظیمات را اعمال کنید.

اگر کدی وجود دارد که به نیم اس‍پیس `JSX` گلوبال وابسته است، می‌توانید رفتار گلوبال قبل از نسخه 3.4 را به‌طور دقیق با ارجاع دادن به `vue/jsx` در پروژه خود حفظ کنید. این عمل باعث ثبت نیم اس‍پیس `JSX` گلوبال می‌شود.

## دستورالعمل‌های تابع رندر {#render-function-recipes}

در زیر، چندین دستورالعمل متداول برای پیاده‌سازی ویژگی‌های تمپلیت به عنوان معادل آنها در توابع رندر / JSX ارائه خواهیم داد.

### `v-if` {#v-if}

تمپلیت:

```vue-html
<div>
  <div v-if="ok">yes</div>
  <span v-else>no</span>
</div>
```

معادل تابع رندر / JSX:

<div class="composition-api">

```js
h('div', [ok.value ? h('div', 'yes') : h('span', 'no')])
```

```jsx
<div>{ok.value ? <div>yes</div> : <span>no</span>}</div>
```

</div>
<div class="options-api">

```js
h('div', [this.ok ? h('div', 'yes') : h('span', 'no')])
```

```jsx
<div>{this.ok ? <div>yes</div> : <span>no</span>}</div>
```

</div>

### `v-for` {#v-for}

تمپلیت:

```vue-html
<ul>
  <li v-for="{ id, text } in items" :key="id">
    {{ text }}
  </li>
</ul>
```
معادل تابع رندر / JSX:

<div class="composition-api">

```js
h(
  'ul',
  // فرض کنید `items` یک مرجع با مقدار آرایه است
  items.value.map(({ id, text }) => {
    return h('li', { key: id }, text)
  })
)
```

```jsx
<ul>
  {items.value.map(({ id, text }) => {
    return <li key={id}>{text}</li>
  })}
</ul>
```

</div>
<div class="options-api">

```js
h(
  'ul',
  this.items.map(({ id, text }) => {
    return h('li', { key: id }, text)
  })
)
```

```jsx
<ul>
  {this.items.map(({ id, text }) => {
    return <li key={id}>{text}</li>
  })}
</ul>
```

</div>

### `v-on` {#v-on}

پراپ‌هایی که با `on` شروع شده و دنبال شده توسط یک حرف بزرگ اند به عنوان لیسنر های رویداد تلقی می‌شوند. به عنوان مثال، `onClick` معادل `@click` در تمپلیت ها است.

```js
h(
  'button',
  {
    onClick(event) {
      /* ... */
    }
  },
  'click me'
)
```

```jsx
<button
  onClick={(event) => {
    /* ... */
  }}
>
  click me
</button>
```

#### مدیفایرهای رویداد {#event-modifiers}

برای مدیفایرهای `.passive`، `.capture` و `.once`، می‌توانید پس از نام رویداد با استفاده از camelCase آنها را اضافه کنید.
برای مثال:

```js
h('input', {
  onClickCapture() {
    /* لیسنر رویداد capture */
  },
  onKeyupOnce() {
    /* فقط یک بار فعال می‌شود */
  },
  onMouseoverOnceCapture() {
    /* یکبار + capture */
  }
})
```

```jsx
<input
  onClickCapture={() => {}}
  onKeyupOnce={() => {}}
  onMouseoverOnceCapture={() => {}}
/>
```
برای مشاهده سایر مدیفایرهای رویداد و کلید، می‌توانید از راهنمای [`withModifiers`](/api/render-function#withmodifiers) استفاده کنید.

```js
import { withModifiers } from 'vue'

h('div', {
  onClick: withModifiers(() => {}, ['self'])
})
```

```jsx
<div onClick={withModifiers(() => {}, ['self'])} />
```

### کامپوننت ها {#components}

برای ایجاد یک vnode برای یک کامپوننت، اولین آرگومانی که به `h()` ارسال می‌شود باید تعریف کامپوننت باشد. این بدان معناست که در استفاده از توابع رندر، نیازی به ثبت کامپوننت‌ها نیست - می‌توانید به طور مستقیم از کامپوننت‌های ایمپورت شده استفاده کنید:

```js
import Foo from './Foo.vue'
import Bar from './Bar.jsx'

function render() {
  return h('div', [h(Foo), h(Bar)])
}
```

```jsx
function render() {
  return (
    <div>
      <Foo />
      <Bar />
    </div>
  )
}
```
همانطور که مشاهده می‌شود، تابع `h` می‌تواند با کامپوننت‌های ورودی از هر فرمت فایلی کار کند، تا زمانی که کامپوننت Vue معتبری باشد.

کامپوننت‌های پویا با استفاده از توابع رندر به راحتی قابل ایجاد هستند.

```js
import Foo from './Foo.vue'
import Bar from './Bar.jsx'

function render() {
  return ok.value ? h(Foo) : h(Bar)
}
```

```jsx
function render() {
  return ok.value ? <Foo /> : <Bar />
}
```
اگر یک کامپوننت با نام ثبت شده و به صورت مستقیم قابل دسترسی نباشد (به عنوان مثال، در یک کتابخانه ثبت شده باشد)، می‌توانید از روش [`resolveComponent()`](/api/render-function#resolvecomponent) برای حل این موضوع استفاده کنید.

### رندر کردن اسلات‌ها {#rendering-slots}

<div class="composition-api">

در توابع رندر، اسلات‌ها از محیط `setup()` قابل دسترسی هستند. هر اسلات در شی `slots` یک **تابع است که یک آرایه از vnodeها را برمی‌گرداند**:

```js
export default {
  props: ['message'],
  setup(props, { slots }) {
    return () => [
      // اسلات پیشفرض:
      // <div><slot /></div>
      h('div', slots.default()),

      // اسلات نامگذاری شده:
      // <div><slot name="footer" :text="message" /></div>
      h(
        'div',
        slots.footer({
          text: props.message
        })
      )
    ]
  }
}
```

معادل JSX:

```jsx
// پیشفرض
<div>{slots.default()}</div>

//  نامگذاری شده
<div>{slots.footer({ text: props.message })}</div>
```

</div>
<div class="options-api">

در توابع رندر، می‌توانید به اسلات‌ها از طریق[`this.$slots`](/api/component-instance#slots) دسترسی پیدا کنید:

```js
export default {
  props: ['message'],
  render() {
    return [
      // <div><slot /></div>
      h('div', this.$slots.default()),

      // <div><slot name="footer" :text="message" /></div>
      h(
        'div',
        this.$slots.footer({
          text: this.message
        })
      )
    ]
  }
}
```

معادل JSX:

```jsx
// <div><slot /></div>
<div>{this.$slots.default()}</div>

// <div><slot name="footer" :text="message" /></div>
<div>{this.$slots.footer({ text: this.message })}</div>
```

</div>

### انتقال اسلات‌ها {#passing-slots}

در ارسال فرزندان به کامپوننت‌ها، روش کمی با ارسال فرزندان به عناصر معمول متفاوت است. به جای یک آرایه، باید یک تابع اسلات یا یک شیء از توابع اسلات ارسال کنیم. توابع اسلات می‌توانند هر چیزی که یک تابع رندر عادی می‌تواند بازگرداند را برگردانند. وقتی که در کامپوننت فرزند دسترسی پیدا می‌کند، این توابع به صورت همیشگی به آرایه‌های vnodes تبدیل می‌شوند.

```js
// اسلات پیش‌فرض
h(MyComponent, () => 'hello')

// اسلات های نام گذاری شده
// استفاده از `null` ضروری است تا از اینکه اشیاء اسلات به عنوان پراپ‌ها تلقی شوند، جلوگیری شود.
h(MyComponent, null, {
  default: () => 'default slot',
  foo: () => h('div', 'foo'),
  bar: () => [h('span', 'one'), h('span', 'two')]
})
```

معادل JSX:

```jsx
// پیشفرض
<MyComponent>{() => 'hello'}</MyComponent>

//  نامگذاری شده
<MyComponent>{{
  default: () => 'default slot',
  foo: () => <div>foo</div>,
  bar: () => [<span>one</span>, <span>two</span>]
}}</MyComponent>
```
انتقال اسلات به عنوان توابع به آن‌ها اجازه می‌دهد که به طور تنبلانه توسط کامپوننت فرزند فراخوانی شوند. این باعث می‌شود وابستگی‌های اسلات توسط کامپوننت فرزند و نه والدین پیگیری شود، که بهبود عملکرد و دقت بروزرسانی‌ها را فراهم می‌کند.

### اسلات های محدود شده {#scoped-slots}

برای رندر کردن یک اسلات محدود شده (Scoped Slot) در کامپوننت والد، یک اسلات به کامپوننت فرزند ارسال می‌شود. توجه کنید که اسلات اکنون یک پارامتر، مانند `text`، دارد. اسلات در کامپوننت فرزند فراخوانی می‌شود و داده‌های کامپوننت فرزند به کامپوننت والد ارسال می‌شود.

```js
// کامپوننت والد
export default {
  setup() {
    return () =>
      h(MyComp, null, {
        default: ({ text }) => h('p', text)
      })
  }
}
```
به یاد داشته باشید که `null` را ارسال کنید که با اسلات‌ها به عنوان پراپ‌ها رفتار نشود.

```js
// کامپوننت فرزند
export default {
  setup(props, { slots }) {
    const text = ref('hi')
    return () => h('div', null, slots.default({ text: text.value }))
  }
}
```

معادل JSX:

```jsx
<MyComponent>
  {{
    default: ({ text }) => <p>{text}</p>
  }}
</MyComponent>
```

### کامپوننت‌های داخلی {#built-in-components}

کامپوننت‌های داخلی مانند `<KeepAlive>`، `<Transition>`، `<TransitionGroup>`، `<Teleport>` و `<Suspense>` باید ایمپورت شوند تا بتوانند در توابع رندر استفاده شوند.

<div class="composition-api">

```js
import { h, KeepAlive, Teleport, Transition, TransitionGroup } from 'vue'

export default {
  setup() {
    return () => h(Transition, { mode: 'out-in' } /* ... */)
  }
}
```

</div>
<div class="options-api">

```js
import { h, KeepAlive, Teleport, Transition, TransitionGroup } from 'vue'

export default {
  render() {
    return h(Transition, { mode: 'out-in' } /* ... */)
  }
}
```

</div>

### `v-model` {#v-model}

در زمان کامپایل، `v-model` به `modelValue` و `onUpdate:modelValue` تبدیل می‌شود. ما باید این دو پراپ‌ را خودمان ارائه دهیم.

<div class="composition-api">

```js
export default {
  props: ['modelValue'],
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    return () =>
      h(SomeComponent, {
        modelValue: props.modelValue,
        'onUpdate:modelValue': (value) => emit('update:modelValue', value)
      })
  }
}
```

</div>
<div class="options-api">

```js
export default {
  props: ['modelValue'],
  emits: ['update:modelValue'],
  render() {
    return h(SomeComponent, {
      modelValue: this.modelValue,
      'onUpdate:modelValue': (value) =>
        this.$emit('update:modelValue', value)
    })
  }
}
```

</div>

### دایرکتیو های سفارشی {#custom-directives}

می‌توانید دایرکتیوهای سفارشی را با استفاده از [`withDirectives`](/api/render-function#withdirectives) به یک vnode اعمال کنید.

```js
import { h, withDirectives } from 'vue'

// یک دایرکتیو سفارشی
const pin = {
  mounted() {
    /* ... */
  },
  updated() {
    /* ... */
  }
}

// <div v-pin:top.animate="200"></div>
const vnode = withDirectives(h('div'), [
  [pin, 200, 'top', { animate: true }]
])
```
اگر یک دستورالعمل با نام ثبت شده ایمپورت شده و به طور مستقیم در دسترس نباشد، می‌توانید از راهنمای [`resolveDirective`](/api/render-function#resolvedirective) برای حل این مشکل استفاده کنید.

### Template Refs {#template-refs}

<div class="composition-api">

در Composition API رف ها با ارسال `ref()` به عنوان یک پراپ به vnode ایجاد می‌شوند.

```js
import { h, ref } from 'vue'

export default {
  setup() {
    const divEl = ref()

    // <div ref="divEl">
    return () => h('div', { ref: divEl })
  }
}
```

</div>
<div class="options-api">

در Options API گزینه‌ها، رف ها با ارسال نام ref به عنوان یک رشته در پراپ‌های vnode ایجاد می‌شوند.

```js
export default {
  render() {
    // <div ref="divEl">
    return h('div', { ref: 'divEl' })
  }
}
```

</div>

## کامپوننت‌های تابعی {#functional-components}

کامپوننت‌های تابعی یک شکل جایگزین از کامپوننت‌ها هستند که هیچ وضعیتی از خود ندارند. آن‌ها مانند توابع خالص عمل می‌کنند: ورودی‌ها به عنوان پراپ‌ها دریافت می‌شوند و vnodes به عنوان خروجی تولید می‌شوند. آن‌ها بدون ایجاد نمونه کامپوننت رندر می‌شوند (به عبارتی بدون `this`) و بدون هوک‌های چرخه عمر معمول کامپوننت.

برای ایجاد یک کامپوننت تابعی، از یک تابع ساده به جای یک شیء گزینه‌ها استفاده می‌کنیم. این تابع در واقع تابع `render` برای کامپوننت است.

<div class="composition-api">

الگوی یک کامپوننت تابعی همانند هوک `setup()` است.

```js
function MyComponent(props, { slots, emit, attrs }) {
  // ...
}
```

</div>
<div class="options-api">

زیرا در کامپوننت تابعی، مفهوم `this` وجود ندارد، بنابراین Vue `props` را به عنوان اولین آرگومان ارسال می‌کند.

```js
function MyComponent(props, context) {
  // ...
}
```
دومین آرگومان، `context`، شامل سه ویژگی است: `attrs`، `emit` و `slots`. این‌ها به ترتیب معادل ویژگی‌های نمونه [`$attrs`](/api/component-instance#attrs)، [`$emit`](/api/component-instance#emit) و [`$slots`](/api/component-instance#slots) هستند.

</div>

بیشتر گزینه‌های معمولی پیکربندی برای کامپوننت‌ها برای کامپوننت‌های تابعی در دسترس نیستند. با این حال، امکان تعریف [`props`](/api/options-state#props) و [`emits`](/api/options-state#emits) با اضافه کردن آن‌ها به عنوان خصوصیت‌ وجود دارد.

```js
MyComponent.props = ['value']
MyComponent.emits = ['click']
```
اگر گزینه `props` مشخص نشده باشد، آن‌گاه تمام ویژگی‌ها به عنوان `props` به تابع ارسال می‌شوند، مانند `attrs`. همچنین توجه داشته باشید که نام‌های پراپ به camelCase نرمال‌سازی نمی‌شوند مگر اینکه گزینه `props` مشخص شده باشد.

برای کامپوننت‌های تابعی با `props` صریح، [پراکندگی ویژگی](/guide/components/attrs) بطور مشابهی با کامپوننت‌های عادی کار می‌کند. با این حال، برای کامپوننت‌های تابعی که به طور صریح `props` خود را مشخص نمی‌کنند، فقط `class`، `style` و لیسنر رویداد `onXxx` به طور پیش‌فرض از `attrs` به ارث می‌برند. در هر دو حالت، `inheritAttrs` می‌تواند به `false` تنظیم شود تا ارث گرفتن ویژگی‌ها غیرفعال شود:

```js
MyComponent.inheritAttrs = false
```
کامپوننت‌های تابعی می‌توانند مانند کامپوننت‌های عادی ثبت و مصرف شوند. اگر یک تابع را به عنوان آرگومان اول به `h()` ارسال کنید، به عنوان یک کامپوننت تابعی مورد استفاده قرار می‌گیرد.

### تعیین تایپ کامپوننت‌های تابعی<sup class="vt-badge ts" /> {#typing-functional-components}

انواع کامپوننت‌های تابعی می‌توانند بر اساس اینکه آیا نام دارند یا ندارند، تعیین تایپ شوند. همچنین Volar از امکان بررسی صحیح نوع کامپوننت‌های تابعی را هنگام مصرف آنها در الگوهای SFC پشتیبانی می‌کند.

**کامپوننت تابعی نامگذاری‌شده**

```tsx
import type { SetupContext } from 'vue'
type FComponentProps = {
  message: string
}

type Events = {
  sendMessage(message: string): void
}

function FComponent(
  props: FComponentProps,
  context: SetupContext<Events>
) {
  return (
    <button onClick={() => context.emit('sendMessage', props.message)}>
      {props.message}{' '}
    </button>
  )
}

FComponent.props = {
  message: {
    type: String,
    required: true
  }
}

FComponent.emits = {
  sendMessage: (value: unknown) => typeof value === 'string'
}
```
**کامپوننت تابعی بی نام**

```tsx
import type { FunctionalComponent } from 'vue'

type FComponentProps = {
  message: string
}

type Events = {
  sendMessage(message: string): void
}

const FComponent: FunctionalComponent<FComponentProps, Events> = (
  props,
  context
) => {
  return (
    <button onClick={() => context.emit('sendMessage', props.message)}>
        {props.message} {' '}
    </button>
  )
}

FComponent.props = {
  message: {
    type: String,
    required: true
  }
}

FComponent.emits = {
  sendMessage: (value) => typeof value === 'string'
}
```
