# تایپ اسکریپت با Options API {#typescript-with-options-api}

>در این صفحه فرض شده که شما از قبل بخش [بررسی کلی استفاده از Vue با تایپ اسکریپت](./overview) را مطالعه کرده اید.

:::tip نکته
در حالی که Vue قابلیت پشتیبانی استفاده از تایپ اسکریپت را با Options API دارد، توصیه می‌شود که Vue را از طریق Composition API با تایپ اسکریپت استفاده کنید، زیرا این روش ساده‌تر، کارآمدتر و دارای تعیین خودکار تایپ قوی‌تری است.
:::

## تعریف تایپ Props کامپوننت  {#typing-component-props}

برای تعیین خودکار تایپ props در Options API نیاز است که کامپوننت با استفاده از `()defineComponent` تعریف شود. با این روش Vue قادر است بر اساس آپشن `props` تایپ props را تعیین کند و همچنین آپشن‌های اضافی مانند `required: true` و `default` را در نظر بگیرد:

```ts
import { defineComponent } from 'vue'

export default defineComponent({
  // تعیین خودکار تایپ فعال شده است
  props: {
    name: String,
    id: [Number, String],
    msg: { type: String, required: true },
    metadata: null
  },
  mounted() {
    this.name // تایپ: string | undefined
    this.id // تایپ: number | string | undefined
    this.msg // تایپ: string
    this.metadata // تایپ: any
  }
})
```

اما آپشن `props` در زمان اجرای ران‌تایم تنها از توابع سازنده به عنوان تایپ پایه prop پشتیبانی می‌کنند - هیچ راهی برای مشخص کردن تایپ‌های پیچیده مانند آبجکت‌هایی با ویژگی‌های تو در تو یا تشخیص امضای فراخوانی تابع وجود ندارد.

برای تعیین ویژگی‌های پیچیده‌ی تایپ‌های props، می‌توانیم از `PropType` ابزاری برای تعیین تایپ استفاده کنیم.

```ts
import { defineComponent } from 'vue'
import type { PropType } from 'vue'

interface Book {
  title: string
  author: string
  year: number
}

export default defineComponent({
  props: {
    book: {
      //  `Object` ارائه تایپ دقیق‌تر به
      type: Object as PropType<Book>,
      required: true
    },
    // می‌توان توابع را نیز تعیین کرد
    callback: Function as PropType<(id: number) => void>
  },
  mounted() {
    this.book.title // string
    this.book.year // number

    // خطای Ts : نمی‌تواند 'string' آرگومان از تایپ 
    // اختصاص داده شود 'number' به پارامتر از تایپ 
    this.callback?.('123')
  }
})
```

### احتیاط‌ها {#caveats}

اگر نسخه TypeScript شما کمتر از `4.7` است، باید هنگام استفاده از مقادیر تابع برای گزینه‌های `validator` و `default` در props احتیاط کنید - مطمئن شوید که از arrow functions استفاده می‌کنید:

```ts
import { defineComponent } from 'vue'
import type { PropType } from 'vue'

interface Book {
  title: string
  year?: number
}

export default defineComponent({
  props: {
    bookA: {
      type: Object as PropType<Book>,
      // استفاده می‌کنید arrow functions اگر نسخه تایپ اسکریپت شما کمتر از 4.7 است مطمئن شوید که از
      default: () => ({
        title: 'Arrow Function Expression'
      }),
      validator: (book: Book) => !!book.title
    }
  }
})
```

این کار جلوگیری می‌کند از حدس زدن تایپ `this` در داخل توابع توسط تایپ اسکریپت، که متأسفانه گاهی می‌تواند باعث ایجاد مشکل در تعیین خودکار تایپ شود. این مشکل بیشتر به عنوان یک [محدودیت طراحی](https://github.com/microsoft/TypeScript/issues/38845) شناخته می‌شد، و اکنون در [تایپ اسکریپت 4.7](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-7.html#improved-function-inference-in-objects-and-methods) بهبود یافته است.

## تعریف تایپ Emits کامپوننت {#typing-component-emits}

ما می‌توانیم تایپ داده‌ مورد انتظار برای یک رویداد emit شده را با استفاده از سینتکس آبجکت از آپشن `emits` اعلام کنیم. همچنین، تمام رویدادهای emit شده‌ای که اعلام نشده‌اند، هنگام فراخوانی، خطای تایپ ایجاد می‌کنند:

```ts
import { defineComponent } from 'vue'

export default defineComponent({
  emits: {
    addBook(payload: { bookName: string }) {
      // اجرای اعتبارسنجی در زمان اجرا
      return payload.bookName.length > 0
    }
  },
  methods: {
    onSubmit() {
      this.$emit('addBook', {
        bookName: 123 // خطای تایپ!
      })

      this.$emit('non-declared-event') // خطای تایپ!
    }
  }
})
```

## تعریف تایپ پراپرتی‌های Computed {#typing-computed-properties}

یک پراپرتی computed، تایپ خود را بر اساس مقدار بازگشتی‌اش تعیین می‌کند:

```ts
import { defineComponent } from 'vue'

export default defineComponent({
  data() {
    return {
      message: 'Hello!'
    }
  },
  computed: {
    greeting() {
      return this.message + '!'
    }
  },
  mounted() {
    this.greeting // تایپ: string
  }
})
```

در برخی موارد، ممکن است بخواهید به صراحت تایپ یک پراپرتی‌ computed  را مشخص کنید تا از صحت پیاده‌سازی آن اطمینان حاصل کنید:

```ts
import { defineComponent } from 'vue'

export default defineComponent({
  data() {
    return {
      message: 'Hello!'
    }
  },
  computed: {
    // به صراحت تایپ بازگشت را مشخص کردن
    greeting(): string {
      return this.message + '!'
    },

    // قابل نوشتن computed مشخص کردن تایپ یک پراپرتی
    greetingUppercased: {
      get(): string {
        return this.greeting.toUpperCase()
      },
      set(newValue: string) {
        this.message = newValue.toUpperCase()
      }
    }
  }
})
```

در برخی موارد خاص که TypeScript به دلیل حلقه‌های استنباط دایره‌ای نمی‌تواند تعیین خودکار تایپ یک ویژگی computed را انجام دهد، استفاده از annotation های صریح نیز ممکن است لازم باشد.

## تایپ Event Handlers {#typing-event-handlers}

هنگام کار با رویدادهای بومی DOM، تعیین دقیق نوع آرگومانی که به تابع رویدادگیر ارسال می‌شود، ممکن است مفید باشد. برای درک بهتر، به مثال زیر توجه کنیم:

```vue
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  methods: {
    handleChange(event) {
      // دارد `any` به صورت ضمنی نوع `event`
      console.log(event.target.value)
    }
  }
})
</script>

<template>
  <input type="text" @change="handleChange" />
</template>
```

بدون تعیین نوع ضمنی، آرگومان event به صورت ضمنی نوع `any` را خواهد داشت. این امر همچنین در صورت استفاده از `"strict": true` یا `"noImplicitAny": true` در `tsconfig.json` منجر به خطای TS می‌شود. بنابراین توصیه می‌شود که به صورت صریح نوع آرگومان رویدادگیرها را مشخص کنید. علاوه بر این، ممکن است نیاز به استفاده از ادعاهای نوعی (type assertions) هنگام دسترسی به پراپرتی‌های event باشید:

```ts
import { defineComponent } from 'vue'

export default defineComponent({
  methods: {
    handleChange(event: Event) {
      console.log((event.target as HTMLInputElement).value)
    }
  }
})
```

## افزایش پراپرتی‌های سراسری {#augmenting-global-properties}

برخی از پلاگین‌ها پراپرتی‌های سراسری را در تمام نمونه‌های ساخته شده از کامپوننت، از طریق [`app.config.globalProperties`](/api/application#app-config-globalproperties) نصب می‌کنند. به عنوان مثال، ما ممکن است `this.$http` را برای دریافت داده‌ها یا `this.$translate` را برای چند زبانه کردن نصب کنیم. برای اینکه این امکان به خوبی با TypeScript کار کند، Vue یک رابط `ComponentCustomProperties` را ارائه می‌دهد که طراحی شده است تا از طریق [افزایش ماژول TypeScript](https://www.typescriptlang.org/docs/handbook/declaration-merging.html#module-augmentation) افزایش یابد:

```ts
import axios from 'axios'

declare module 'vue' {
  interface ComponentCustomProperties {
    $http: typeof axios
    $translate: (key: string) => string
  }
}
```

همچنین ببینید:

- [یونیت تست‌ها در TypeScript برای افزونگی تایپ کامپوننت](https://github.com/vuejs/core/blob/main/packages-private/dts-test/componentTypeExtensions.test-d.tsx)

### مکان قرارگیری افزایش تایپ {#type-augmentation-placement}

ما می‌توانیم این افزایش تایپ را در یک فایل `.ts` قرار دهیم، یا در یک فایل پروژه‌ای `*.d.ts`. به هر حال، اطمینان حاصل کنید که در `tsconfig.json` گنجانده شده است. برای نویسندگان کتابخانه/پلاگین، این فایل باید در ویژگی `types` در `package.json` مشخص شود.

برای بهره‌برداری از افزایش ماژول، شما باید اطمینان حاصل کنید که افزایش در یک [ماژول TypeScript](https://www.typescriptlang.org/docs/handbook/modules.html) قرار گرفته است. به این معنا که فایل باید حداقل شامل یک `import` یا `export` در سطح بالا باشد، حتی اگر فقط `export {}` باشد. اگر افزایش خارج از یک ماژول قرار گیرد، به جای افزایش دادن، تایپ‌های اصلی را بازنویسی خواهد کرد!

```ts
// کار نمی‌کند، تایپ‌های اصلی را بازنویسی می‌کند
declare module 'vue' {
  interface ComponentCustomProperties {
    $translate: (key: string) => string
  }
}
```

```ts
// به درستی کار می‌کند
export {}

declare module 'vue' {
  interface ComponentCustomProperties {
    $translate: (key: string) => string
  }
}
```

## افزایش آپشن‌های سفارشی {#augmenting-custom-options}

برخی از پلاگین‌ها، به عنوان مثال `vue-router`، پشتیبانی از آپشن‌های سفارشی کامپوننت مانند `beforeRouteEnter` را فراهم می‌کنند:

```ts
import { defineComponent } from 'vue'

export default defineComponent({
  beforeRouteEnter(to, from, next) {
    // ...
  }
})
```

بدون افزایش تایپ مناسب، آرگومان‌های این هوک به صورت ضمنی نوع `any` خواهند داشت. ما می‌توانیم رابط `ComponentCustomOptions` را برای پشتیبانی از این آپشن‌های سفارشی افزایش دهیم:

```ts
import { Route } from 'vue-router'

declare module 'vue' {
  interface ComponentCustomOptions {
    beforeRouteEnter?(to: Route, from: Route, next: () => void): void
  }
}
```

حالا آپشن `beforeRouteEnter` به درستی تایپ خواهد شد. توجه داشته باشید که این فقط یک مثال است - کتابخانه‌هایی با تایپ‌های مناسب مانند `vue-router` باید به صورت خودکار این افزایش‌ها را در تعریف تایپ‌های خود انجام دهند.

مکان قرارگیری این افزایش مشمول [همان محدودیت‌ها](#type-augmentation-placement) به عنوان افزایش‌های ویژگی سراسری است.

همچنین ببینید:

- [یونیت تست‌ها در TypeScript برای افزونگی نوع کامپوننت](https://github.com/vuejs/core/blob/main/packages-private/dts-test/componentTypeExtensions.test-d.tsx)

## تایپ‌دهی دایرکتیو‌های سفارشی سراسری {#typing-global-custom-directives}

مراجعه کنید به: [تایپ‌دهی دایرکتیو‌های سفارشی سراسری](/guide/typescript/composition-api#typing-global-custom-directives) <sup class="vt-badge ts" />
