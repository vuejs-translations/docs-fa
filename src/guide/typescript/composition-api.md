# تایپ اسکریپت با Composition API {#typescript-with-composition-api}

> در این صفحه فرض شده است که شما از قبل بخش مرور کلیِ [استفاده از Vue با TypeScript](./overview) را مطالعه کرده‌اید.

## تعریف تایپ برای Prop های کامپوننت‌ {#typing-component-props}

### استفاده از `<script setup>` {#using-script-setup}

هنگام استفاده از `<script setup>`, دستور `defineProps()‎` به طور خودکار تایپ‌ها را برای `props` بر اساس آرگومان‌های آن تشخیص می‌دهد.

```vue
<script setup lang="ts">
const props = defineProps({
  foo: { type: String, required: true },
  bar: Number
})

props.foo // string
props.bar // number | undefined
</script>
```

این روش "runtime declaration" نامیده می‌شود، زیرا آرگومان‌های پاس‌داده‌شده به `defineProps()‎` به عنوان آپشن‌های `props` در زمان اجرا استفاده می‌شوند.

با این حال، معمولاً تعریف `props` با استفاده از تایپ‌های pure و از طریق یک آرگومان تایپ عمومی (generic type argument) ساده‌تر است:

```vue
<script setup lang="ts">
const props = defineProps<{
  foo: string
  bar?: number
}>()
</script>
```

به این روش "type-based declaration" (تعریف مبتنی بر تایپ) گفته می‌شود. کامپایلر سعی می‌کند تا حد امکان runtime آپشن های معادل را بر اساس تایپ آرگیومنت تشخیص دهد. در این حالت، مثال دوم ما دقیقاً به همان runtime آپشن هایی کامپایل می‌شود که در مثال اول داشتیم.

می‌توانید از "type-based declaration" (تعریف مبتنی بر تایپ) یا "runtime declaration" ( تعریف در زمان اجرا ) استفاده کنید، اما نمی‌توانید هر دو را همزمان به کار بگیرید.

همچنین می‌توانیم انواع Props را در یک interface مجزا تعریف کنیم:

```vue
<script setup lang="ts">
interface Props {
  foo: string
  bar?: number
}

const props = defineProps<Props>()
</script>
```

این روش حتی زمانی که `Props` از یک منبع خارجی ایمپورت شده باشد نیز کار می‌کند. این قابلیت نیازمند آن است که TypeScript به عنوان یک وابستگی هم‌سطح (peer dependency) برای Vue باشد.

```vue
<script setup lang="ts">
import type { Props } from './foo'

const props = defineProps<Props>()
</script>
```

#### محدودیت‌های سینتکسی {#syntax-limitations}

این محدودیت در نسخه 3.3 برطرف شده است. آخرین نسخه Vue از ارجاع به تایپ‌های ایمپورت شده و مجموعه‌ای محدود از تایپ‌های پیچیده در جایگاه پارامتر تایپ پشتیبانی می‌کند.با این حال، از آنجا که فرآیند تبدیل تایپ به کد اجرایی (runtime conversion) همچنان مبتنی بر AST است، برخی تایپ‌های پیچیده که نیاز به تحلیل تایپ واقعی دارند (مانند conditional types) پشتیبانی نمی‌شوند. شما می‌توانید از conditional types برای تایپ یک prop مجزا استفاده کنید، اما نه برای کل شیء props.

### مقادیر پیش‌فرض props {#props-default-values}

در هنگام استفاده از type-based declaration (تعریف مبتنی بر تایپ)، امکان تعریف مقادیر پیش‌فرض برای props وجود ندارد. این محدودیت با استفاده از [Reactive Props Destructure](/guide/components/props#reactive-props-destructure) <sup class="vt-badge" data-text="3.5+" /> قابل حل است:

```ts
interface Props {
  msg?: string
  labels?: string[]
}

const { msg = 'hello', labels = ['one', 'two'] } = defineProps<Props>()
```

در نسخه‌های 3.4 و پایین‌تر، قابلیت Reactive Props Destructure به‌صورت پیش‌فرض فعال نیست. راه‌حل جایگزین استفاده از ماکرو کامپایلر `withDefaults` است:

```ts
interface Props {
  msg?: string
  labels?: string[]
}

const props = withDefaults(defineProps<Props>(), {
  msg: 'hello',
  labels: () => ['one', 'two']
})
```

خروجی کامپایل معادل با تعریف گزینه‌های `default` در runtime خواهد بود. همچنین، `withDefaults` بررسی‌های تایپی را برای مقادیر پیش‌فرض اعمال می‌کند و تضمین می‌کند که تایپ بازگشتی `props`، پراپرتی‌هایی که مقدار پیش‌فرض دارند را به عنوان اختیاری (optional) علامت‌گذاری نمی‌کند.

:::info توجه

برای تایپ‌های mutable (مانند آرایه‌ها یا آبجکت‌ها)، مقادیر پیش‌فرض هنگام استفاده از `withDefaults` باید درون توابع قرار داده شوند. این کار از تغییرات ناخواسته و ساید افکت‌های خارجی جلوگیری می‌کند و تضمین می‌دهد که هر instance کامپوننت، کپی مخصوص به خود از مقدار پیش‌فرض را دریافت کند.
این محدودیت هنگام استفاده از مقادیر پیش‌فرض با destructure **اعمال نمی‌شود.**
:::

### بدون `<script setup>` {#without-script-setup}

اگر `<script setup>` به کار نرود، لازم است `defineComponent()‎` را استفاده کنید تا تایپ props به صورت خودکار شناسایی شود. نوع آبجکت props ارسال‌شده به `setup()‎`، از طریق گزینه `props` تعیین می‌شود.

```ts
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    message: String
  },
  setup(props) {
    props.message // <-- type: string
  }
})
```

### انواع پیچیده‌ی پراپ‌ها {#complex-prop-types}

در تعریف مبتنی بر تایپ (type-based declaration)، یک پراپ می‌تواند از تایپ‌های پیچیده استفاده کند، دقیقاً مشابه هر تایپ دیگری:

```vue
<script setup lang="ts">
interface Book {
  title: string
  author: string
  year: number
}

const props = defineProps<{
  book: Book
}>()
</script>
```

برای تعریف در زمان اجرا (runtime)، می‌توانیم از تایپ کمکی `PropType` استفاده کنیم:

```ts
import type { PropType } from 'vue'

const props = defineProps({
  book: Object as PropType<Book>
})
```

این روش تقریباً به همان شکل کار می‌کند اگر مستقیماً گزینه `props` را مشخص کنیم:

```ts
import { defineComponent } from 'vue'
import type { PropType } from 'vue'

export default defineComponent({
  props: {
    book: Object as PropType<Book>
  }
})
```

گزینه `props` معمولاً در Options API بیشتر کاربرد دارد، بنابراین مثال‌های جامع‌تر را می‌توانید در راهنمای [TypeScript با Options API](/guide/typescript/options-api#typing-component-props) مشاهده کنید. روش‌هایی که در آن مثال‌ها آمده، برای تعریف props در حین اجرا (تعاریف runtime) با `defineProps()‎` هم کاربرد دارند.

## تعیین تایپ emit های کامپوننت {#typing-component-emits}

در `<script setup>`، می‌توان تابع `emit` را هم با استفاده از تعریف زمان اجرا (runtime declaration) یا تعریف نوع (type declaration)، تایپ کرد:

```vue
<script setup lang="ts">
// runtime
const emit = defineEmits(['change', 'update'])

// options based
const emit = defineEmits({
  change: (id: number) => {
    // return `true` or `false` to indicate
    // validation pass / fail
  },
  update: (value: string) => {
    // return `true` or `false` to indicate
    // validation pass / fail
  }
})

// type-based
const emit = defineEmits<{
  (e: 'change', id: number): void
  (e: 'update', value: string): void
}>()

// 3.3+: alternative, more succinct syntax
const emit = defineEmits<{
  change: [id: number]
  update: [value: string]
}>()
</script>
```

نوع آرگومان می‌تواند یکی از موارد زیر باشد:

1. یک نوع تابع قابل فراخوانی (به صورت Type Literal با [امضای فراخوانی](https://www.typescriptlang.org/docs/handbook/2/functions.html#call-signatures)) که به عنوان نوع تابع `emit` برگشتی استفاده خواهد شد.
2. یک لیترال تایپ که در آن کلیدها نام ایونت‌ها هستند و مقادیر، انواع آرایه/تاپل هستند که پارامترهای اضافی پذیرفته شده برای ایونت را نشان می‌دهند. مثال بالا از تاپل‌های نام‌دار استفاده می‌کند تا هر آرگومان بتواند یک نام صریح داشته باشد.

همانطور که مشاهده می‌کنید، تعیین نوع (type declaration) کنترل بسیار دقیق‌تری بر محدودیت‌های نوع emitها در اختیار ما قرار می‌دهد.

در صورت عدم استفاده از `<script setup>`، تابع `defineComponent()‎` می‌تواند ایونت‌های مجاز برای تابع `emit` موجود در context setup را به صورت خودکار تشخیص دهد:

```ts
import { defineComponent } from 'vue'

export default defineComponent({
  emits: ['change'],
  setup(props, { emit }) {
    emit('change') // <-- type check / auto-completion
  }
})
```

## تعیین تایپ `ref()‎` {#typing-ref}

مقدارهای ref به طور خودکار نوع داده را از مقدار اولیه‌شان تشخیص می‌دهند:

```ts
import { ref } from 'vue'

// inferred type: Ref<number>
const year = ref(2020)

// => TS Error: Type 'string' is not assignable to type 'number'.
year.value = '2020'
```

در برخی موارد ممکن است نیاز باشد تایپ‌های پیچیده‌تری برای مقدار داخلی یک ref مشخص کنیم. این کار را می‌توان با استفاده از تایپ `Ref` انجام داد:

```ts
import { ref } from 'vue'
import type { Ref } from 'vue'

const year: Ref<string | number> = ref('2020')

year.value = 2020 // ok!
```

یا می‌توان با ارسال یک آرگومان جنریک هنگام فراخوانی `ref()‎`، نوع پیش‌فرض تعیین شده را جایگزین کرد:

```ts
// resulting type: Ref<string | number>
const year = ref<string | number>('2020')

year.value = 2020 // ok!
```

اگر آرگومان تایپ جنریک را مشخص کنید اما مقدار اولیه را تعیین نکنید، نوع نهایی یک یونیون تایپ خواهد بود که `undefined` را نیز شامل می‌شود:

```ts
// inferred type: Ref<number | undefined>
const n = ref<number>()
```

## تعیین تایپ `reactive()‎` {#typing-reactive}

تابع `reactive()‎` به صورت خودکار تایپ را از پارامتر ورودی‌اش تشخیص می‌دهد:

```ts
import { reactive } from 'vue'

// inferred type: { title: string }
const book = reactive({ title: 'Vue 3 Guide' })
```

برای تعیین صریح تایپ یک ویژگی `reactive`، می‌توانیم از اینترفیس‌ها استفاده کنیم:

```ts
import { reactive } from 'vue'

interface Book {
  title: string
  year?: number
}

const book: Book = reactive({ title: 'Vue 3 Guide' })
```

:::tip نکته
پیشنهاد می‌شود از آرگومان جنریک در `reactive()‎` استفاده نکنید، چرا که نوع خروجی (که مسئول باز کردن refهای تو در تو است) با نوع آرگومان جنریک تفاوت دارد.
:::

## تعیین تایپ `computed()‎` {#typing-computed}

تابع `computed()‎` تایپ خروجی رو بر اساس مقداری که getter برمی‌گردونه تعیین می‌کنه:

```ts
import { ref, computed } from 'vue'

const count = ref(0)

// inferred type: ComputedRef<number>
const double = computed(() => count.value * 2)

// => TS Error: Property 'split' does not exist on type 'number'
const result = double.value.split('')
```

میتوانید به صورت مستقیم با تعیین تایپ جنریک، تایپ خروجی را دقیقاً مشخص نمایید:

```ts
const double = computed<number>(() => {
  // type error if this doesn't return a number
})
```

## تعیین تایپ ایونت هندلرها {#typing-event-handlers}

هنگام کار با ایونت‌‎های DOM اصلی، ممکن است تایپ صحیح آرگومان‌های پاس داده شده به هندلر مفید باشد. به این مثال توجه کنید:

```vue
<script setup lang="ts">
function handleChange(event) {
  // `event` implicitly has `any` type
  console.log(event.target.value)
}
</script>

<template>
  <input type="text" @change="handleChange" />
</template>
```

اگر تایپ مشخص نشود، پارامتر `event` به صورت پیش‌فرض تایپ `any` خواهد داشت. این موضوع در صورت فعال بودن تنظیمات `"strict": true` یا `"noImplicitAny": true` در فایل `tsconfig.json` منجر به خطای TypeScript خواهد شد. بنابراین توصیه می‌شود تایپ پارامترهای ایونت هندلرها را به صورت صریح مشخص کنید. همچنین در برخی موارد هنگام دسترسی به پراپرتی‌های `event` ممکن است نیاز به استفاده از type assertion داشته باشید:

```ts
function handleChange(event: Event) {
  console.log((event.target as HTMLInputElement).value)
}
```

## تعیین تایپ Provide / Inject {#typing-provide-inject}

در Vue، معمولاً از provide و inject در کامپوننت‌های مجزا استفاده می‌شود. برای تعیین تایپ صحیح مقادیر inject شده، Vue اینترفیس `InjectionKey` را ارائه می‌دهد که یک جنریک تایپ بوده و از `Symbol` ارث‌بری می‌کند. این اینترفیس برای همگام‌سازی تایپ مقدار inject شده بین provider و consumer استفاده می‌شود:

```ts
import { provide, inject } from 'vue'
import type { InjectionKey } from 'vue'

const key = Symbol() as InjectionKey<string>

provide(key, 'foo') // providing non-string value will result in error

const foo = inject(key) // type of foo: string | undefined
```

توصیه می‌شود InjectionKey را در یک فایل جداگانه قرار دهید تا بتوان آن را در چندین کامپوننت import کرد.

هنگام استفاده از کلیدهای injection استرینگ ، مقدار inject شده به صورت `unknown` در نظر گرفته می‌شود. برای تعیین تایپ دقیق، باید به‌صورت صریح از پارامتر جنریک استفاده کنید.

```ts
const foo = inject<string>('foo') // type: string | undefined
```

توجه داشته باشید که مقدار inject شده ممکن است همچنان `undefined` باشد، زیرا هیچ تضمینی وجود ندارد که Provider این مقدار را در زمان اجرا ارائه کند.

میتوان با تعیین یک مقدار پیش‌فرض، تایپ `undefined` را حذف کرد:

```ts
const foo = inject<string>('foo', 'bar') // type: string
```

اگر مطمئن هستید که مقدار همیشه ارائه (provid) می‌شود، می‌توانید از Type Assertion برای تبدیل اجباری نوع استفاده کنید:

```ts
const foo = inject('foo') as string
```

## تعیین تایپ برای Refsهای تمپلیت {#typing-template-refs}

در Vue 3.5 و `@vue/language-tools` نسخه ۲.۱ (که هم سرویس زبانی IDE و هم `vue-tsc` را پشتیبانی می‌کند)، نوع refهای ایجاد شده توسط `useTemplateRef()‎` در کامپوننت‌های تک فایلی (SFC) می‌تواند **.به صورت خودکار تشخیص داده شود** برای refهای استاتیک بر اساس المانی که ویژگی `ref` روی آن استفاده شده است.

در مواقعی که تشخیص خودکار نوع ممکن نیست، می‌توانید نوع ref تمپلیت را به صورت دستی و با استفاده از پارامتر جنریک تعیین کنید:

```ts
const el = useTemplateRef<HTMLInputElement>('el')
```

<details>
<summary>Usage before 3.5</summary>

برای ایجاد refهای تمپلیت، باید یک پارامتر جنریک برای نوع به صورت صریح مشخص کنید و مقدار اولیه را `null` قرار دهید:

```vue
<script setup lang="ts">
import { ref, onMounted } from 'vue'

const el = ref<HTMLInputElement | null>(null)

onMounted(() => {
  el.value?.focus()
})
</script>

<template>
  <input ref="el" />
</template>
```

</details>

توجه داشته باشید که برای اطمینان از type safety دقیق، لازم است هنگام دسترسی به `el.value` از optional chaining یا type guards استفاده شود. دلیل این موضوع آن است که مقدار اولیه‌ی `ref` برابر با `null` است تا زمانی که کامپوننت mounted شود. همچنین اگر المنت مورد نظر توسط `v-if` به حالت unmount دربیاید مقدار آن می‌تواند دوباره به `null` تغییر کند.

## تعیین تایپ Template Ref های کامپوننت {#typing-component-template-refs}

با انتشار Vue 3.5 و نسخه 2.1 از `@vue/language-tools` (که هم سرویس زبان IDE و هم ابزار `vue-tsc` را پشتیبانی می‌کند)، نوع refهایی که در SFCها با استفاده از `useTemplateRef()‎` ایجاد می‌شوند، برای static refها می‌تواند به‌صورت خودکار تشخیص داده شود؛ این تشخیص بر اساس المنت یا کامپوننتی انجام می‌شود که ویژگی `ref` روی آن اعمال شده است.

در مواردی که تشخیص خودکار نوع ممکن نیست (برای مثال، در استفاده‌های خارج از SFC یا در کامپوننت‌های داینامیک)، همچنان می‌توانید با استفاده از generic argument، نوع مورد نظر خود را به‌صورت صریح برای template ref مشخص کنید.

برای به‌دست آوردن نوع instance یک کامپوننت وارد شده، ابتدا باید نوع آن را با استفاده از `typeof` بدست آوریم و سپس از ابزار داخلی `InstanceType` در تایپ‌اسکریپت برای استخراج نوع instance آن استفاده کنیم.

```vue{5}
<!-- App.vue -->
<script setup lang="ts">
import { useTemplateRef } from 'vue'
import Foo from './Foo.vue'
import Bar from './Bar.vue'

type FooType = InstanceType<typeof Foo>
type BarType = InstanceType<typeof Bar>

const compRef = useTemplateRef<FooType | BarType>('comp')
</script>

<template>
  <component :is="Math.random() > 0.5 ? Foo : Bar" ref="comp" />
</template>
```

در مواردی که نوع دقیق کامپوننت در دسترس نباشد یا اهمیت نداشته باشد، می‌توان از `ComponentPublicInstance` به‌جای آن استفاده کرد. این فقط شامل ویژگی‌هایی خواهد بود که در تمام کامپوننت‌ها مشترک هستند، مانند `$el‎`:

```ts
import { useTemplateRef } from 'vue'
import type { ComponentPublicInstance } from 'vue'

const child = useTemplateRef<ComponentPublicInstance>('child')
```

در مواقعی که کامپوننت رفرنس داده شده یک [کامپوننت جنریک](/guide/typescript/overview.html#generic-components) باشد، مانند `MyGenericModal`:

```vue
<!-- MyGenericModal.vue -->
<script setup lang="ts" generic="ContentType extends string | number">
import { ref } from 'vue'

const content = ref<ContentType | null>(null)

const open = (newContent: ContentType) => (content.value = newContent)

defineExpose({
  open
})
</script>
```

باید از `ComponentExposed` از کتابخانه [`vue-component-type-helpers`](https://www.npmjs.com/package/vue-component-type-helpers) استفاده شود، چرا که `InstanceType` کار نخواهد کرد.

```vue
<!-- App.vue -->
<script setup lang="ts">
import { useTemplateRef } from 'vue'
import MyGenericModal from './MyGenericModal.vue'
import type { ComponentExposed } from 'vue-component-type-helpers'

const modal =
  useTemplateRef<ComponentExposed<typeof MyGenericModal>>('modal')

const openModal = () => {
  modal.value?.open('newValue')
}
</script>
```

توجه داشته باشید که با نسخه 2.1+ از `@vue/language-tools`، نوع static template refها به‌طور خودکار تشخیص داده می‌شود و مورد فوق فقط در موارد خاص و نادر نیاز است.
