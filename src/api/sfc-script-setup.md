# \<script setup> {#script-setup}

`<script setup>` یک مدل نوشتاری راحت‌تر در زمان کامپایل برای استفاده از Composition API درون فایل‌های Single-File Components(SFCs) می‌باشد. اگر از SFCها و Composition API استفاده می‌کنید، توصیه می‌شود از تگ `setup` نیز استفاده کنید. نسب به `<script>` معمولی دارای نقاط مثبت زیر است:

- کد مختصرتر با کار کمتر
- قابلیت تعریف props و emit events با استفاده از تایپ اسکریپت
- کارایی و پرفورمنس بهتر در زمان اجرا (تمپلیت در همان اسکوپ به یک render function تبدیل می‌شود، بدون پروکسی میانی)
- پرفورمنس بهتر IDE برای تشخیص type-inference (برای تشخیص نوع داده ها کار کمتری انجام می‌شود)

## سینتکس ساده {#basic-syntax}

به منظور استفاده از این سینتکس، اتریبیوت `setup` را به تگ `<script>` اضافه کنید

```vue
<script setup>
console.log('hello script setup')
</script>
```

کد داخل اسکریپت تبدیل می‌شود به محتوای داخل تابع `()setup` کامپوننت. به این معنی که برخلاف تگ معمولی اسکریپت `<script>`، که فقط یک بار زمانی که کامپوننت برای بار اول ایمپورت شده است اجرا می‌شود، کد داخل `<script setup>` **هر با که یک instance از کامپوننت ساخته شود، اجرا می‌شود**.

### Top-level bindings are exposed to template {#top-level-bindings-are-exposed-to-template}

زمانی که از `<script setup>` استفاده می‌کنید، هر top-level bindings (شامل متغیرها، توابع و ایمپورت ها) که داخل `<script setup>` قرار دارند، به صورت مستقیم در تمپلیت قابل استفاده هستند:

```vue
<script setup>
// variable
const msg = 'Hello!'

// functions
function log() {
  console.log(msg)
}
</script>

<template>
  <button @click="log">{{ msg }}</button>
</template>
```

ایپمرت‌ها هم به همین صورت قابل استفاده هستند. به این معنی که شما می‌توانید به صورت مستقیم از یک متد کمکی که ایمپورت کرده‌اید بدون تعریف کردن آن در `methods` به صورت مستقیم در تمپلیت استفاده کنید:

```vue
<script setup>
import { capitalize } from './helpers'
</script>

<template>
  <div>{{ capitalize('hello') }}</div>
</template>
```

## Reactivity {#reactivity}

Reactive states باید دقیقا با استفاده از [Reactivity APIs](./reactivity-core) ساخته شوند. همانند دیتاهایی که از تابع `setup()` برگردانده می‌شوند، refs ها هم به صورت خودکار بدون نیاز به `.value` قابل استفاده هستند:

```vue
<script setup>
import { ref } from 'vue'

const count = ref(0)
</script>

<template>
  <button @click="count++">{{ count }}</button>
</template>
```

## استفاده از کامپوننت‌ها {#using-components}

مقادیر در  `<script setup>` به صورت مستقیم به عنوان تگ‌های یک کامپوننت قابل استفاده می‌باشد:

```vue
<script setup>
import MyComponent from './MyComponent.vue'
</script>

<template>
  <MyComponent />
</template>
```

MyComponent را یک referenced variable در نظر بگیرید. اگر تاکنون از JSX استفاده کرده‌اید، مدل فکری شبیه به همان است. نوشتار kebab-case که می‌شود `<my-component>` در تمپلیت قابل استفاده است. اما استفاده از تگ‌های PascalCase بخاطر امکان تشخیص راحت تر از تگ‌های بومی HTML بیشتر توصیه می‌شود.

### کامپوننت‌های Dynamic {#dynamic-components}

از آن جایی که کامپوننت‌ها به جای کامپوننت‌های رجیستر شده با کلید، به عنوان referenced values در نظر گرفته می‌شوند ، در `script setup` هنگام استفاده از کامپوننت‌های داینامیک باید از `is:` استفاده کنیم:

```vue
<script setup>
import Foo from './Foo.vue'
import Bar from './Bar.vue'
</script>

<template>
  <component :is="Foo" />
  <component :is="someCondition ? Foo : Bar" />
</template>
```

توجه داشته باشید در یک ternary expression کامپوننت‌ها به عنوان متغیر استفاده می‌شوند.

### کامپوننت‌های Recursive {#recursive-components}

یک SFC می‌تواند صراحتا با استناد به اسم فایلش به خودش رفرنس شود. برای مثال یک فایل با اسم `FooBar.vue` می‌تواند به صورت `</ FooBar>` در تمپلیت استفاده شود.

توجه داشته باشید که اولویت کمتری نسبت به کامپوننت‌های ایمپورت شده دارد. اگر یک import با نام دارید که با نام استنباط شده کامپوننت در تضاد است، می توانید با نام مستعار import کنید:

```js
import { FooBar as FooBarChild } from './components'
```

### کامپوننت‌های Namespaced {#namespaced-components}

برای استفاده از کامپوننت‌های درون آبجکت ایمپورت شده، می‌توان از ` . ` (نقطه) در تگ‌های کامپوننت استفاده کرد. برای زمانی مناسب است که از یک فایل چندین کامپوننت ایمپورت می‌کنید:

```vue
<script setup>
import * as Form from './form-components'
</script>

<template>
  <Form.Input>
    <Form.Label>label</Form.Label>
  </Form.Input>
</template>
```

## Using Custom Directives (Directiveهای سفارشی سازی شده) {#using-custom-directives}

Directiveهای سفارشی‌سازی‌شده‌ی گلوبال به صورت نرمال قابل استفاده هستند. دایرکتیو‌های سفارشی‌سازی‌شده‌ی سراسری به صورت نرمال قابل استفاده هستند. دایرکتیو‌های محلی نیازی ندارند که حتما در `<script setup>` رجسیتر شوند، اما برای نام گذاری باید از این اسکیما و طرح پیروی کنند `vNameOfDirective` :

```vue
<script setup>
const vMyDirective = {
  beforeMount: (el) => {
    // یک تغییری روی المان ایجاد کن
  }
}
</script>
<template>
  <h1 v-my-directive>این یک h1 است</h1>
</template>
```

اگر یک directive .را از جای دیگری ایمپورت می‌کنید، می‌توانید به نام دلخواه خود تغییرش دهید.

```vue
<script setup>
import { myDirective as vMyDirective } from './MyDirective.js'
</script>
```

## defineProps() & defineEmits() {#defineprops-defineemits}

برای تعریف کردن `props` و `emits` با پشتیبانی کامل تایپ اسکریپت، می‌توان از APIهای `defineProps` و `defineEmits` استفاده کرد که بصورت پیشفرض در `<script setup>` قابل دسترسی هستند:

```vue
<script setup>
const props = defineProps({
  foo: String
})

const emit = defineEmits(['change'، 'delete'])
// کد setup
</script>
```

- `defineProps` و `defineEmits` جزو **ماکرو‌های کامپایلر** هستند و فقط داخل `<script setup>` قابل استفاده هستند. نیازی به ایمپورت کردن آنها نیست، و هنگامی که `script setup` پردازش می‌شود، کامپایل می شوند.

- `defineProps` همان مقادیری را می‌پذیرد که در آپشن `props` استفاده می‌شود، در حالی که `defineEmits` مقادیری مشابه با آپشن `emits` را می‌پذیرد.

- `defineProps` و `defineEmits` بر اساس آپشن‌های پاس‌داده‌شده تایپ یابی صحیحی (type inference) ارائه می‌دهند.

- آپشن‌های پاس‌داده‌شده به `defineProps` و `defineEmits` به اسکوپ ماژول برده می‌شوند (hoisted). بنابراین، این آپشن‌ها نمی‌توانند به متغیرهای محلی که درون محدوده setup تعریف شده‌اند ارجاع دهند؛ در غیر این صورت، با خطای کامپایل مواجه می‌شوید. اما می‌توانند به متغیرهای ایمپورت شده (imported bindings) ارجاع دهند، زیرا آن‌ها نیز در اسکوپ ماژول هستند.

### Type-only props/emit declarations<sup class="vt-badge ts" /> {#type-only-props-emit-declarations}

پراپ‌ها و امیت‌ها همچنین می‌توانند با استفاده از pure-type syntax با پاس دادن یک literal type به `defineProps` یا `defineEmits` استفاده کرد:

```ts
const props = defineProps<{
  foo: string
  bar?: number
}>()

const emit = defineEmits<{
  (e: 'change'، id: number): void
  (e: 'update'، value: string): void
}>()

// 3.3+: alternative، more succinct syntax
const emit = defineEmits<{
  change: [id: number] // named tuple syntax
  update: [value: string]
}>()
```

- از `defineProps` یا `defineEmits` یا در type  declaration و یا type declaration استفاده می‌شود. استفاده از هر دو به صورت همزمان باعث ایجاد کامپایل ارور می‌شود.

- هنگام استفاده از type declaration، برای اطمینان از عملکرد درست هنگام اجرا معادل runtime declaration به صورت خودکار از روی static analysis ساخته می‌شود تا تعاریف تکراری را حذف کند.

  - در حالت توسعه، کامپایلر تلاش می‌کند تا تایپ داده‌ها را بر اساس اعتبارسنجی متناظر آن‌ها تشخیص دهد. برای مثال `foo: String` از تایپ `foo: string` تشخیص داده می‌شود. به دلیل این که کامپایلر اطلاعی از فایل‌های خارجی ندارد اگر  به یک تایپ که ایمپورت شده (imported type) رفرنس داده شود، تایپی که در نظر گرفته می‌شود `foo: null` خواهد بود (معادل `any`).
  
  - در ورژن 3.2 و پایین‌تر، پارامترهایی از جنس generic برای `()defineProps` به literal type و یا یک رفرنس به اینترفیس محلی (local interface) محدود بود.

  این محدودیت در ورژن 3.3 رفع شده است. آخرین ورژن از ویو از refenrencing imported و یک قسمتی از انواع پیچیده در type parameter position پشتیبانی می‌کند.

  اگرچه، به دلیل اینکه تبدیل نوع در هنگام اجرا هنوز AST-based می‌باشد، بعضی از انواع پیچیده نیازمند تحلیل نوع واقعی می‌باشند. برای مثال انواع شرطی (conditional types) پشتیبانی نمی‌شوند. می‌توانید از انواع شرطی برای نوع یک یک پراپ استفاده کنید، اما نه برای کل آبجکت پراپ‌ها.

### Reactive Props Destructure <sup class="vt-badge" data-text="3.5+" /> {#reactive-props-destructure}

در Vue 3.5 و بالاتر، متغیرهایی که از مقدار بازگشتی `defineProps` استخراج می‌شوند، reactive هستند. کامپایلر Vue به‌صورت خودکار `props.‎` را به کد اضافه می‌کند زمانی که در همان بلاک `<script setup>` به متغیرهای استخراج‌شده از `defineProps` دسترسی پیدا می‌شود:

```ts
const { foo } = defineProps(['foo'])

watchEffect(() => {
  // runs only once before 3.5
  // re-runs when the "foo" prop changes in 3.5+
  console.log(foo)
})
```

کد بالا به معادل زیر کامپایل می‌شود:

```js {5}
const props = defineProps(['foo'])

watchEffect(() => {
  // `foo` transformed to `props.foo` by the compiler
  console.log(props.foo)
})
```

علاوه بر این، می‌توانید از سینتکس مقدار پیش‌فرض بومی جاوااسکریپت برای تعیین مقادیر پیش‌فرض پراپ‌ها استفاده کنید. این ویژگی به خصوص زمانی مفید است که از تعریف پراپ‌ها به‌صورت type-based استفاده می‌کنید:

```ts
interface Props {
  msg?: string
  labels?: string[]
}

const { msg = 'hello', labels = ['one', 'two'] } = defineProps<Props>()
```

### مقادیر پیش‌فرض برای پراپس‌ها هنگام استفاده از تعریف تایپ <sup class="vt-badge ts" /> {#default-props-values-when-using-type-declaration}

در نسخه 3.5 و بالاتر، می‌توان مقدار پیش‌فرض را به‌صورت طبیعی هنگام استفاده از استخراج پراپ‌های reactive تعیین کرد. اما در نسخه 3.4 و پایین‌تر، ویژگی استخراج پراپ‌های reactive به‌صورت پیش‌فرض فعال نیست. برای اعلام مقدار پیش‌فرض پراپ‌ها همراه با تعریف مبتنی بر تایپ (type-based)، ماکرو کامپایلر `withDefaults` مورد نیاز است:

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

نتیجه قطعه کد بالا معادل پراپ‌ها با مقدار پیش‌فرض در options API خواهد بود. علاوه بر این `withDefaults` برای مقادیر پیش‌فرض، نوع مقادیر را هم بررسی خواهد کرد و باعث می‌شود خروجی `props` پراپرتی‌هایی که مقدار پیش فرض دارند، اختیاری نباشند.

:::info
توجه داشته باشید که هنگام استفاده از `withDefaults`، مقدار پیش‌فرض برای تایپ‌های رفرنس داده شده قابل تغییر (مانند آرایه‌ها یا آبجکت‌ها) باید درون توابع قرار گیرند تا از تغییرات تصادفی و اثرات جانبی خارجی جلوگیری شود. این کار تضمین می‌کند که هر نمونه از کامپوننت، نسخه مخصوص به خود از مقدار پیش‌فرض را دریافت کند. این کار هنگام استفاده از مقادیر پیش‌فرض با استخراج (destructure) ضروری نیست.
:::

## defineModel()‎ {#definemodel}

- پشتیبانی شده در ورژن 3.3+.

از این macro برای تعریف کردن پراپی استفاده می‌شود که با استفاده از v-model در کامپوننت والد عمل two-way binding برای آن‌ها اجرا شود. مثال‌های برای چگونگی استفاده کردن در [Component `v-model`](/guide/components/v-model) در دسترسی است.

پشت پرده، این macro یک model prop و یک ایونت متناسب با آپدیت شدن آن می‌سازد. اگر آرگومان اول یک رشته باشد، از آن برای استفاده از نام prop استفاده می‌شود؛ در غیر این صورت نام prop به طور پیش فرض به `"modelValue"` تغییر می‌کند.

```js
// declares "modelValue" prop، consumed by parent via v-model
const model = defineModel()
// OR: declares "modelValue" prop with options
const model = defineModel({ type: String })

// emits "update:modelValue" when mutated
model.value = 'hello'

// declares "count" prop، consumed by parent via v-model:count
const count = defineModel('count')
// OR: declares "count" prop with options
const count = defineModel('count'، { type: Number، default: 0 })

function inc() {
  // emits "update:count" when mutated
  count.value++
}
```

:::warning هشدار
اگر مقدار پیش‌فرض برای پراپ `defineModel` تعریف شده باشد و مقداری از کامپوننت والد برای آن فراهم نشده باشد، می‌تواند باعث ناهماهنگی بین کامپوننت والد و فرزند شود. در مثال پایین، `myRef` والد تعریف نشده است، ولی در کامپوننت فرزند `model` برابر با 1 است:

```vue [Child.vue]
<script setup>
const model = defineModel({ default: 1 })
</script>
```

```vue [Parent.vue]
<script setup>
const myRef = ref()
</script>

<template>
  <Child v-model="myRef"></Child>
</template>
```

:::

### مودیفایرها و تغییردهندگان {#modifiers-and-transformers}

برای دسترسی به مدیفایرهایی که با دایرکتیو `v-model` استفاده می‌شوند، می‌توان مقدار خروجی را از `()defineModel` به این صورت تجزیه کرد:

```js
const [modelValue، modelModifiers] = defineModel()

// v-model.trim معادل با
if (modelModifiers.trim) {
  // ...
}
```

در صورت وجود یک مودیفایر، ممکن است نیاز داشته باشیم قبل از آپدیت کردن مقدار آن در کامپوننت والد، تغییری روی مقدار جدید اعمال کنیم، می‌توان با استفاده از `get` و `set` این کار را انجام:

```js
const [modelValue، modelModifiers] = defineModel({
  // حذف می شود به زیرا در اینجا نیاز نیست get()
  set(value) {
    // اگر مودیفایر حذف کننده‌ی فاصله استفاده شده بود، مقدار بدون فاصله را برمی‌گرداند
    if (modelModifiers.trim) {
      return value.trim()
    }
    // در غیر این صورت، همان مقداری که وارد شده بر گردانده می‌شود
    return value
  }
})
```

### استفاده با تایپ اسکریپت <sup class="vt-badge ts" /> {#usage-with-typescript}

همانند `defineProps` و `defineEmits`، `defineModel` هم می‌تواند برای تعیین نوع مقدار و مودیفایرهایش آرگومان‌های نوع دریافت کند:

```ts
const modelValue = defineModel<string>()
//    ^? Ref<string | undefined>

// default model with options، required removes possible undefined values
const modelValue = defineModel<string>({ required: true })
//    ^? Ref<string>

const [modelValue، modifiers] = defineModel<string، 'trim' | 'uppercase'>()
//                 ^? Record<'trim' | 'uppercase'، true | undefined>
```

## ()defineExpose {#defineexpose}

کامپوننت‌های `script setup` به طور پیش‌فرض **بسته هستند** و متدها، متغیرها و ... که درون آن‌ها هستند، به صورت قابل برای کامپوننت‌های دیگر قابل دسترسی نیست. برای مثال یک کامپوننت عمومی که از با template refs یا زنجیره `parent$` به آن دسترسی داریم، هیچ اطلاعاتی که در `<script setup>` تعریف شده است را نشان نمی‌دهد.

برای دسترسی به پراپرتی‌های داخل یک کامپوننت `<script setup>` از `defineExpose` استفاده می‌شود:

```vue
<script setup>
import { ref } from 'vue'

const a = 1
const b = ref(2)

defineExpose({
  a،
  b
})
</script>
```

وقتی توسط template refsها به یک کامپوننت دسترسی داریم، مقدار برگردانده شده بصورت `{ a: number، b: number }` خواهد بود.(نیازی به استفاده از value. نیست)

## ()defineOptions {#defineoptions}

- پشتیبانی شده در ورژن 3.3+.

از این macro برای تعریف مستقیم پراپرتی‌های کامپوننت، داخل `<script setup>` بدون نیاز به استفاده از یک بلاک `<script>` جدا استفاده می‌شود:

```vue
<script setup>
defineOptions({
  inheritAttrs: false,
  customOptions: {
    /* ... */
  }
})
</script>
```

- این یک ماکرو است. ویژیگی‌های تعریف شده hoist می‌شوند و در `<script setup>` قابل دسترسی نیستند.

## defineSlots()<sup class="vt-badge ts"/> {#defineslots}

- پشتیبانی شده در ورژن 3.3+.

از این macro برای فراهم کردن نشانع های تایپ به IDE و چک کردن نوع داده ها استفاده می‌شود.

`defineSlots` فقط تایپ پارامتر می‌پذیرد و هیچ runtime arguments نمی‌پذیرد. تایپ پارامتر باید یک type literal باشد به طوری که کلید آن اسم اسلات، و مقدار آن تابع آن اسلات می باشد.  آرگومان اول تابع آن پراپی می‌باشد که اسلات انتظار دارد آن را دریافت کند، و نوع آن برای استفاده در تمپلیت اسلات استفاده می‌شود. نوع خروجی در حال حاضر نادیده گرفته می‌شود (`any`)، اما در آینده ممکن است برای بررسی محتوای اسلات ها تغییراتی بدهیم.

همچنین مقدار `slots` را برمی‌گرداند، که معادل آبجکت `slots` می باشد که در setup context یا توسط `()useSlots` به آن دسترسی داریم.

```vue
<script setup lang="ts">
const slots = defineSlots<{
  default(props: { msg: string }): any
}>()
</script>
```

## `useSlots()` و `useAttrs()` {#useslots-useattrs}

از آنجایی که در `<script setup>` مستقیما می‌توان از `$slots` و `$attrs` استفاده کرد، استفاده از `slots` و `attrs` به ندرت پیش خواهد آمد. در صورتی که نیاز به استفاده از آنها داشتید، به صورت زیر از کمکی‌های `useSlots` و `useAttrs` استفاده کنید:

```vue
<script setup>
import { useSlots, useAttrs } from 'vue'

const slots = useSlots()
const attrs = useAttrs()
</script>
```

`useSlots` و `useAttrs` در حقیقت runtime functions هستند که معادل `setupContext.slots` و `setupContext.attrs` می باشند. می‌توان آن‌ها را در Composition API به عنوان توابع استفاده کرد.

## استفاده همزمان با اسکریپت معمولی {#usage-alongside-normal-script}

`<script setup>` میتواند کنار یک `script` معمولی استفاده شود. یک `<script>` معمولی در شرایط زیر ممکن است نیاز باشد:

- تعریف پراپرتی‌های که در `<script setup>` قابل انجام نیست، برای مثال `inheritAttrs` یا قابلیت‌های اختصاصی پلاگین‌ها (`inheritAttrs` در ورژن‌های 3.3+ قابل تعریف است[`defineOptions`](/api/sfc-script-setup#defineoptions)).
- تعریف named exports.
- اجرای side effects و یا ساختن آبجکت‌هایی که فقط یک بار باید اجرا شوند.

```vue
<script>
// اسکریپت معمولی، فقط یکبار در اسکوپ ماژول اجرا می‌شود
runSideEffectOnce()
// تعریف پراپرتی‌های اضافه‌تر
// declare additional options
export default {
  inheritAttrs: false،
  customOptions: {}
}
</script>

<script setup>
// اجرا شده در اسکوپ setup() (به ازای هر instance)
</script>
```

پشتیبانی برای استفاده همزمان از `<script setup>` و `<script>` در یک کامپوننت محدود به حالت‌های توضیح داده شده در بالا است. توجه داشته باشید:

- برای کارهایی که در `<script setup>` قابل انجام دادن هستند، از یک `script` جدا استفاده **نکنید**، مثل `props` و `emits`.
- متغیرهای ساخته شده داخل `<script setup>` به عنوان پراپرتی‌های یک کامپوننت به کامپوننت اضافه نمی‌شوند، بنابراین امکان دسترسی به آنها در Options API وجود ندارد. استفاده همزمان از Options API و Composition API اشتباه است.

اگر حالتی پیش آمد که هیچ کدام از حالت‌های تعریف شده نبود، استفاده کردن از تابع [`()setup`](/api/composition-api-setup) به جای `<script setup>` مناسب‌تر است.

## Top-level `await` {#top-level-await}

`await` می‌تواند در `<script setup>` استفاده شود. کد نهایی کامپایل می‌شود به `()async setup`:

```vue
<script setup>
const post = await fetch(`/api/post/1`).then((r) => r.json())
</script>
```

به علاوه، عبارتی که await می‌شود، به طور خودکار به حالتی تبدیل می‌شود که حالت فعلی اش را حفظ می‌کند.

:::warning نکته
`()async setup` باید همراه با [`Suspense`](/guide/built-ins/suspense.html) استفاده شود، که هنوز یک ویژگی آزمایشی است. ما قصد نهایی کردن مستندات را در یک ریلیز آینده خواهیم داشت - اما اگر کنجکاو هستید، می‌توانید با مشاهده گیت‌هاب [tests](https://github.com/vuejs/core/blob/main/packages/runtime-core/__tests__/components/Suspense.spec.ts) ببینید به چه صورت کار می‌کند.
:::

## عبارات Import {#imports-statements}

عبارات import در Vue از مشخصات ماژول ECMAScript پیروی می‌کنند.
علاوه بر این، شما می‌توانید از نام‌های مستعار (aliases) که در تنظیمات ابزار ساخت خود تعریف کرده‌اید استفاده کنید.

```vue
<script setup>
import { ref } from 'vue'
import { componentA } from './Components'
import { componentB } from '@/Components'
import { componentC } from '~/Components'
</script>
```

## جنریک‌ها <sup class="vt-badge ts" /> {#generics}

با اضافه کردن اتریبیوت `generic` به تگ `<script>` می‌توان از پارامترهای تایپ جنریک استفاده کرد:

```vue
<script setup lang="ts" generic="T">
defineProps<{
  items: T[]
  selected: T
}>()
</script>
```

مقدار `generic` دقیقا به همان شکل لیست پارامترهای بین `<...>` در تایپ اسکریپت عمل می‌کند. برای مثال، می‌توان از چندین پارامتر، محدودیت‌های `extends`، مقادیر پیش‌فرض و اشاره به تایپ‌های و اشاره شده (reference imported) استفاده کرد:

```vue
<script
  setup
  lang="ts"
  generic="T extends string | number، U extends Item"
>
import type { Item } from './types'
defineProps<{
  id: T
  list: U[]
}>()
</script>
```

می‌توانید از دستور `‎@vue-generic` برای مشخص کردن تایپ‌ها به‌صورت صریح استفاده کنید، مخصوصاً زمانی که تایپ به‌صورت خودکار قابل تشخیص نیست.

```vue
<template>
  <!-- @vue-generic {import('@/api').Actor} -->
  <ApiSelect v-model="peopleIds" endpoint="/api/actors" id-prop="actorId" />

  <!-- @vue-generic {import('@/api').Genre} -->
  <ApiSelect v-model="genreIds" endpoint="/api/genres" id-prop="genreId" />
</template>
```

برای استفاده از ارجاع به یک کامپوننت عمومی در یک `ref`، شما نیاز دارید از کتابخانه [`vue-component-type-helpers`](https://www.npmjs.com/package/vue-component-type-helpers) استفاده کنید زیرا `InstanceType` کار نخواهد کرد.

```vue
<script
  setup
  lang="ts"
>
import componentWithoutGenerics from '../component-without-generics.vue';
import genericComponent from '../generic-component.vue';

import type { ComponentExposed } from 'vue-component-type-helpers';

// Works for a component without generics
ref<InstanceType<typeof componentWithoutGenerics>>();

ref<ComponentExposed<typeof genericComponent>>();
```

## محدودیت‌ها {#restrictions}

- بخاطر تفاوت در معناشناسی اجرای ماژول‌ها، کد داخل `<script setup>` وابسته به محتوای داخل SFC می‌باشد. انتقال آن به یک فایل خارجی `js.` یا `ts.`، ممکن است منجر به سردرگمی برای توسعه‌دهندگان و ابزارها شود. بنابراین **`<script setup>`** همراه با اتریبیوت `src` قابل استفاده نیست.
- `<script setup>` از In-DOM Root Component Templateها پشتیبانی نمی کند. ([بحث مربوط](https://github.com/vuejs/core/issues/8391))
