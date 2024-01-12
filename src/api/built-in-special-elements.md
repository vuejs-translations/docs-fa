# عناصر خاص ساخته شده {#built-in-special-elements}

:::info Not Components
`<component>`، `<slot>` و `<template>` ویژگی هایی هستند که بخشی از سینتکس تمپلیت هستند. آنها کامپوننت های واقعی نیستند و در هنگام ترجمه تمپلیت حذف می شوند. به همین دلیل، معمولا با حروف کوچک در تمپلیت ها نوشته می شوند.
:::

## `<component>` {#component}
یک «متا کامپوننت» برای رندر کردن کامپوننت ها یا عناصر پویا.

- **Props**

  ```ts
  interface DynamicComponentProps {
    is: string | Component
  }
  ```

- **جزئیات**

قطعه ای که باید رندر شود توسط پراپ `is` تعیین می شود.

•  وقتی `is` یک رشته باشد، می تواند یا نام یک تگ HTML یا نام ثبت شده یک کامپوننت باشد.

•  به عنوان جایگزین، `is` همچنین می تواند مستقیما به تعریف یک کامپوننت متصل شود.

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

  [قطعه های ساخته شده](./built-in-components) می توانند همه به `is` داده شوند، اما اگر می خواهید آنها را با نام بدهید، باید آنها را ثبت کنید. برای مثال:

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

 اگر `v-model` روی تگ `<component>` استفاده شود، ترجمه کننده تمپلیت آن را به یک پراپ `modelValue` و یک رویداد گوش دهنده `update:modelValue` گسترش می دهد، مانند آنچه که برای هر کامپوننت دیگری انجام می شود. اما این با عناصر HTML بومی، مانند `<input>` یا `<select>`، سازگار نیست. در نتیجه، استفاده از `v-model` با یک عنصر بومی ایجاد شده به صورت پویا کار نمی کند:

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

  در عمل، این حالت حاشیه ای رایج نیست زیرا فیلدهای فرم بومی معمولا در برنامه های واقعی درون قطعه ها قرار می گیرند. اگر شما نیاز داشته باشید از یک عنصر بومی به طور مستقیم استفاده کنید، میتوانید `v-model` را به یک ویژگی و یک رویداد به صورت دستی تقسیم کنید.

- **همچنین ببینید** [کامپوننت های پویا](/guide/essentials/component-basics#dynamic-components)

## `<slot>` {#slot}

 نشان دهنده خروجی های محتوای شکاف در الگوها.

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

- **جزپیات**

عنصر `<slot>` می تواند از ویژگی `name` برای مشخص کردن نام شکاف استفاده کند. وقتی هیچ `name` مشخص نشود، شکاف پیشفرض را رندر میکند. ویژگیهای اضافی که به عنصر شکاف داده میشوند، به عنوان پراپ شکاف به شکاف اسکوپ شده که در والد تعریف شده اند، منتقل می شوند.

خود عنصر با محتوای شکاف مطابقت یافتهاش جایگزین میشود.

عناصر `<slot>` در الگوهای Vue به جاوا اسکریپت ترجمه می شوند، بنابراین نباید با [عناصر `<slot>` بومی](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/slot) اشتباه گرفته شوند.

- **همچنین ببینید** [کامپوننت - شکاف ها](/guide/components/slots)

## `<template>` {#template}

 تگ `<template>` بعنوان یک جایگزین استفاده می شود وقتی می خواهیم از یک دستور داخلی استفاده کنیم بدون اینکه یک عنصر را در DOM رندر کنیم.

- **جزئیات**

 رفتار ویژه برای `<template>` فقط زمانی فعال می شود که با یکی از این دستورها استفاده شود:

  - `v-if`, `v-else-if`, or `v-else`
  - `v-for`
  - `v-slot`

 اگر هیچ کدام از این دستورها وجود نداشته باشند، به جای آن به عنوان یک [عنصر `<template>` بومی](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/template) رندر میشود.

  A `<template>` with a `v-for` can also have a [`key` attribute](/api/built-in-special-attributes#key). All other attributes and directives will be discarded, as they aren't meaningful without a corresponding element.

  Single-file components use a [top-level `<template>` tag](/api/sfc-spec#language-blocks) to wrap the entire template. That usage is separate from the use of `<template>` described above. That top-level tag is not part of the template itself and doesn't support template syntax, such as directives.

یک `<template>` با یک `v-for` همچنین میتواند یک ویژگی [`key`] داشته باشد. تمام ویژگیها و دستورهای دیگر حذف خواهند شد، زیرا بدون یک عنصر متناظر معنادار نیستند.

قطعههای تکفایلی از یک تگ [بالاترین سطح `<template>`] برای بستهبندی کل الگو استفاده میکنند. این کاربرد جدا از استفاده از `<template>` که در بالا توضیح داده شده است، است. این تگ بالاترین سطح بخشی از خود الگو نیست و از نحو الگو، مانند دستورها، پشتیبانی نمیکند.

- **همچنین ببینید**
  - [Guide - `v-if` on `<template>`](/guide/essentials/conditional#v-if-on-template)
  - [Guide - `v-for` on `<template>`](/guide/essentials/list#v-for-on-template)
  - [Guide - Named slots](/guide/components/slots#named-slots)
