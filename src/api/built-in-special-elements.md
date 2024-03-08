# عناصر خاص ساخته شده {#built-in-special-elements}

:::info کامپوننت نیستند
`<component>` و `<slot>` و `<template>` شبه-کامپوننت اند و بخشی از سینتکس تمپلیت هستند. آنها کامپوننت‌های واقعی نیستند و در هنگام کامپایل تمپلیت حذف می‌شوند. به همین دلیل، معمولا با حروف کوچک در تمپلیت‌ها نوشته می‌شوند.
:::

## `<component>` {#component}

یک «متا کامپوننت» برای رندر کردن کامپوننت‌ها یا عناصر پویا.

- **Props**

  ```ts
  interface DynamicComponentProps {
    is: string | Component
  }
  ```

- **جزئیات**

  کامپوننت ایی که باید رندر شود توسط پراپ `is` تعیین می شود.

  - وقتی `is` یک رشته باشد، می‌تواند یا نام یک تگ HTML یا نام ثبت شده یک کامپوننت باشد.

  - به عنوان جایگزین، `is` همچنین می‌تواند مستقیما به تعریف یک کامپوننت متصل شود.

- **مثال**

  رندر کردن کامپوننت ها با نام ثبت شده (Options API):

  ```vue
  <script>
  import Foo from './Foo.vue'
  import Bar from './Bar.vue'

  export default {
    components: { Foo, Bar },
    data() {
      return {
        view: 'Foo'
      }
    }
  }
  </script>

  <template>
    <component :is="view" />
  </template>
  ```

  رندر کردن کامپوننت ها با تعریف (Composition API with `<script setup>`):

  ```vue
  <script setup>
  import Foo from './Foo.vue'
  import Bar from './Bar.vue'
  </script>

  <template>
    <component :is="Math.random() > 0.5 ? Foo : Bar" />
  </template>
  ```

  رندر کردن عناصر HTML:

  ```vue-html
  <component :is="href ? 'a' : 'span'"></component>
  ```

  [کامپوننت های ساخته شده](./built-in-components) می توانند همه به `is` داده شوند، اما اگر می خواهید آنها را با نام بدهید، باید آنها را ثبت کنید. برای مثال:

  ```vue
  <script>
  import { Transition, TransitionGroup } from 'vue'

  export default {
    components: {
      Transition,
      TransitionGroup
    }
  }
  </script>

  <template>
    <component :is="isGroup ? 'TransitionGroup' : 'Transition'">
      ...
    </component>
  </template>
  ```

  ثبت نیاز نیست اگر شما خود کامپوننت را به `is` بدهید به جای نام آن، مثلا در `<script setup>`.

  اگر `v-model` روی تگ `<component>` استفاده شود، کامپایلر تمپلیت آن را به یک پراپ `modelValue` و یک گوش دهنده رویداد `update:modelValue` گسترش می دهد، مانند آنچه که برای هر کامپوننت دیگری انجام می‌شود. اما این با عناصر HTML بومی، مانند `<input>` یا `<select>`، سازگار نیست. در نتیجه، استفاده از `v-model` با یک عنصر بومی ایجاد شده به صورت پویا کار نمی‌کند:

  ```vue
  <script setup>
  import { ref } from 'vue'

  const tag = ref('input')
  const username = ref('')
  </script>

  <template>
    <!-- This won't work as 'input' is a native HTML element -->
    <component :is="tag" v-model="username" />
  </template>
  ```

  در عمل، این مورد لبه‌ای رایج نیست زیرا فیلدهای فرم بومی معمولا در برنامه‌های واقعی درون کامپوننت‌ها قرار می‌گیرند. اگر شما نیاز داشته باشید از یک عنصر بومی به طور مستقیم استفاده کنید، می‌توانید `v-model` را به یک ویژگی و یک رویداد به صورت دستی تقسیم کنید.

- **همچنین ببینید** [کامپوننت های پویا](/guide/essentials/component-basics#dynamic-components)

## `<slot>` {#slot}

  نشان دهنده خروجی های محتوای اسلات در تمپلیت ها.

- **Props**

  ```ts
  interface SlotProps {
    /**
     * Any props passed to <slot> to passed as arguments
     * for scoped slots
     */
    [key: string]: any
    /**
     * Reserved for specifying slot name.
     */
    name?: string
  }
  ```

- **جزئیات**

  عنصر `<slot>` می تواند از ویژگی `name` برای مشخص کردن نام اسلات استفاده کند. وقتی هیچ `name` مشخص نشود، اسلات پیشفرض را رندر میکند. ویژگیهای اضافی که به عنصر اسلات داده میشوند، به عنوان پراپ اسلات به اسلات اسکوپ شده که در والد تعریف شده اند، منتقل می شوند.

خود عنصر با محتوای اسلات مطابقت یافته اش جایگزین می شود.

  عناصر `<slot>` در تمپلیت های Vue به جاوا اسکریپت ترجمه می شوند، بنابراین نباید با [عناصر `<slot>` بومی](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/slot) اشتباه گرفته شوند.

- **همچنین ببینید** [کامپوننت - اسلات ها](/guide/components/slots)

## `<template>` {#template}

  وقتی می خواهیم از یک دستور داخلی استفاده کنیم تگ `<template>` بعنوان یک جایگزین استفاده می شود بدون اینکه یک عنصر را در DOM رندر کنیم.

- **جزئیات**

  رفتار ویژه برای `<template>` فقط زمانی فعال می شود که با یکی از این دستورها استفاده شود:

  - `v-if` - `v-else-if` - `v-else`
  - `v-for`
  - `v-slot`

  اگر هیچ کدام از این دستورها وجود نداشته باشند، به جای آن به عنوان یک [عنصر `<template>` بومی](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/template) رندر میشود.

  یک `<template>` با یک `v-for` نیز میتواند یک [ویژگی `key`](/api/built-in-special-attributes#key) داشته باشد. تمام ویژگی ها و دستورهای دیگر حذف خواهند شد، زیرا بدون یک عنصر متناظر معنادار نیستند.

  کامپوننت های تک فایلی از یک [تگ سطح بالای `<template>`](/api/sfc-spec#language-blocks) برای بسته بندی کل تمپلیت استفاده می کنند. این کاربرد جدا از استفاده از `<template>` که در بالا توضیح داده شده است، می باشد. این تگ، بخشی از خود تمپلیت نیست و از سینتکس تمپلیت، مانند دستورها، پشتیبانی نمی کند.

- **همچنین ببینید**
  - [راهنما - `v-if` در `<template>`](/guide/essentials/conditional#v-if-on-template)
  - [راهنما - `v-for` در `<template>`](/guide/essentials/list#v-for-on-template)
  - [راهنما - اسلات های نام دار](/guide/components/slots#named-slots)
