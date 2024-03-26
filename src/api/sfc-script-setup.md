# \<script setup> {#script-setup}

`<script setup>` یک مدل نوشتاری راحت تر در زمان کامپایل برای استفاده از Composition API درون فایل های Single-File Components(SFCs) می باشد. اگر از SFCها و Composition API استفاده میکنید، توصیه میشود از تگ `setup` نیز استفاده کنید. نسب به `<script>` معمولی دارای نقاط مثبت زیر است:

- کد مختصر تر با کار کمتر
- قابلیت تعریف props و emit events با استفاده از تایپ اسکریپت
- کارایی و پرفرمونس بهتر در زمان اجرا (تمپلیت در همان اسکوپ به یک render function تبدیل می شود، بدون پروکس میانی)
- پرفرمونس بهتر IDE برای تشخیص type-inference (برای تشخیص نوع داده ها کار کمتری انجام می شود)

## سینتکس ساده {#basic-syntax}

به منظور استفاده از این سینتکس، اتریبیوت `setup` را به تگ `<script>` اضافه کنید

```vue
<script setup>
console.log('hello script setup')
</script>
```

کد داخل اسکریپت تبدیل می شود به محتوای داخل تابع `()setup` کامپوننت. به این معنی که برخلاف تگ معمولی اسکریپت `<script>`, که فقط یک بار زمانی که کامپوننت برای بار اول ایمپرت شده است اجرا می شود, کد داخل `<script setup>` **هر با که یک instance از کامپوننت ساخته شود، اجرا می شود**.

### Top-level bindings are exposed to template {#top-level-bindings-are-exposed-to-template}

زمانی که از `<script setup>` استفاده میکنید, هر top-level bindings (شامل متغیرها, توابع و ایمپرت ها) که داخل `<script setup>` قرار دارند، به صورت مستقیم در تمپلیت قابل استفاده هستند:

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

ایپمرت ها هم به همین صورت قابل استفاده هستند. به این معنی که شما میتوانید به صورت مستقیم از یک متد کمکی که ایمپرت کرده اید بدون تعریف کردن آن در `methods` به صورت مستقیم در تمپلیت استفاده کنید:

```vue
<script setup>
import { capitalize } from './helpers'
</script>

<template>
  <div>{{ capitalize('hello') }}</div>
</template>
```

## Reactivity {#reactivity}
Reactive states باید دقیقا با استفاده از [Reactivity APIs](./reactivity-core) ساخته شوند. همانند دیتاهایی که از تابع `setup()` برگردانده می شوند، refs ها هم به صورت خودکار بدون نیاز به `.value` قابل استفاده هستند:

```vue
<script setup>
import { ref } from 'vue'

const count = ref(0)
</script>

<template>
  <button @click="count++">{{ count }}</button>
</template>
```

## استفاده از کامپوننت ها {#using-components}

مقادیر در  `<script setup>` به صورت مستقیم به عنوان تگ های یک کامپوننت قابل استفاده می باشد:

```vue
<script setup>
import MyComponent from './MyComponent.vue'
</script>

<template>
  <MyComponent />
</template>
```

`MyComponent` را به عنوان یک referenced variable در نظر بگیرید. اگر از JSX استفاده کرده اید, مدل فکری شبیه است. معادل kebab-case `<my-component>` در تمپلیت قابل استفاده است - اگرچه استفاده از تگ های PascalCase برای یکپارچگی توصیه می شود.
همچنین برای تشخیص بهتر از Native HTML Elements بهتر است.

### کامپوننت های Dynamic {#dynamic-components}

از آن جایی که کامپوننت ها به جای کامپوننت های رجیستر شده با کلید، به عنوان referenced values در نظر گرفته می شوند , در `script setup` هنگام استفاده از کامپوننت های داینامیک باید از `is:` استفاده کنیم:

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

توجه داشته باشید در یک ternary expression کامپوننت ها به عنوان متغیر استفاده می شوند.

### کامپوننت های Recursive {#recursive-components}

<!-- An SFC can implicitly refer to itself via its filename. E.g. a file named `FooBar.vue` can refer to itself as `<FooBar/>` in its template.

Note this has lower priority than imported components. If you have a named import that conflicts with the component's inferred name, you can alias the import: -->
یک SFC میتواند صراحتا با استناد به اسم فایلش به خودش رفرنس شود.
برای مثال یک فایل با اسم `FooBar.vue` می تواند به صورت `</ FooBar>` در تمپلیت استفاده شود.


```js
import { FooBar as FooBarChild } from './components'
```

### کامپوننت های Namespaced {#namespaced-components}

برای استفاده از کامپوننت های درون آبجکت ایمپرت شده، میتوان از dot در تگ های کامپوننت استفاده کرد.
برای زمانی مناسب است که از یک فایل چندین کامپوننت ایمپرت میکنید:

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

Directiveهای سفارشی سازی شده ی گلوبال به صورت نرمال قابل استفاده هستند.
Directiveهای مخلی نیازی ندارند که حتما در `<script setup>` رجسیتر شوند، اما برای نام گذاری باید از این اسکیما و طرح پیروی کنند `vNameOfDirective` : 

```vue
<script setup>
const vMyDirective = {
  beforeMount: (el) => {
    // do something with the element
  }
}
</script>
<template>
  <h1 v-my-directive>این یک h1 است</h1>
</template>
```

اگر یک directive .را از جای دیگری ایمپرت میکنید، میتوانید به نام دلخواه خود تغییرش دهید.

اسکیما:


```vue
<script setup>
import { myDirective as vMyDirective } from './MyDirective.js'
</script>
```

## defineProps() & defineEmits() {#defineprops-defineemits}

برای تعریف کردن `props` و `emits` با پشتیبانی کامل تایپ, می توان از APIهای `defineProps` و `defineEmits` استفاده کرد که بصورت پیشفرض در `<script setup>` قابل دسترسی هستند:

```vue
<script setup>
const props = defineProps({
  foo: String
})

const emit = defineEmits(['change', 'delete'])
// setup code
</script>
```

- `defineProps` و `defineEmits` جزو **compiler macros** هستند و فقط داخل `<script setup>` قابل استفاده هستند. نیازی به ایمپرت کردن آن ها نیست, و هنگامی که `script setup` پردازش می شود، کامپایل می شوند.

- `defineProps` همان مقداری که آپشن props دریافت میکرد را دریافت میکند, 
- `defineProps` و `defineEmits`بر اساس دیتاهای ورودی تشخیص نوع داده مناسبی دارند .

آپشن پاس داده شده به `defineProps` و `defineEmits` از تابع host، setup میشوند به خارج از اسکوپ ماژول.

### Type-only props/emit declarations<sup class="vt-badge ts" /> {#type-only-props-emit-declarations}

پراپ ها و امیت ها همچنین می توانند با استفاده از pure-type syntax با پاس دادن یک literal type به `defineProps` یا `defineEmits` استفاده کرد: 

```ts
const props = defineProps<{
  foo: string
  bar?: number
}>()

const emit = defineEmits<{
  (e: 'change', id: number): void
  (e: 'update', value: string): void
}>()

// 3.3+: alternative, more succinct syntax
const emit = defineEmits<{
  change: [id: number] // named tuple syntax
  update: [value: string]
}>()
```

- از `defineProps` یا `defineEmits` یا در type  declaration و یا type declaration استفاده می شود . استفاده از هر دو به صورت همزمان باعث ایجاد کامپایل ارور می شود.

- هنگام استفاده از type declaration, برای اطمینان از عملکرد درست هنگام اجرا معادل runtime declaration به صورت خودکار از روی static analysis ساخته می شود تا تعاریف دوپلیکت را حذف کند.

  - در حالت توسعه, کامپایلر تلاش میکند تا نوع داده ها را بر اساس اعتبارسنجی متناظر آن ها تشخیص دهد.
  For example here `foo: String` is inferred from the `foo: string` type. If the type is a reference to an imported type, the inferred result will be `foo: null` (equal to `any` type) since the compiler does not have information of external files.

  - در حالت پروداکشن, کامپایلر به منظور کاهش حجم باندل، یک آرایه از فرمت تعریف شده درست خواهد کرد (پراپ ها به `['foo', 'bar']` کامپایل می شوند)

- In version 3.2 and below, the generic type parameter for `defineProps()` were limited to a type literal or a reference to a local interface.

  This limitation has been resolved in 3.3. The latest version of Vue supports referencing imported and a limited set of complex types in the type parameter position. However, because the type to runtime conversion is still AST-based, some complex types that require actual type analysis, e.g. conditional types, are not supported. You can use conditional types for the type of a single prop, but not the entire props object.

### مقادیر پیش فرض پراپ ها هنگام تعریف پراپ ها {#default-props-values-when-using-type-declaration}

یکی از نقاط منفی استفاده از `defineProps` این است که راهی برای مقدار دهی پیش فرض به پراپ ها ندارد. برای حل این مشکل از compiler macro `withDefaults` استفاده میکنیم:

```ts
export interface Props {
  msg?: string
  labels?: string[]
}

const props = withDefaults(defineProps<Props>(), {
  msg: 'hello',
  labels: () => ['one', 'two']
})
```

This will be compiled to equivalent runtime props `default` options. In addition, the `withDefaults` helper provides type checks for the default values, and ensures the returned `props` type has the optional flags removed for properties that do have default values declared.

## defineModel() <sup class="vt-badge" data-text="3.4+" /> {#definemodel}

This macro can be used to declare a two-way binding prop that can be consumed via `v-model` from the parent component. Example usage is also discussed in the [Component `v-model`](/guide/components/v-model) guide.

Under the hood, this macro declares a model prop and a corresponding value update event. If the first argument is a literal string, it will be used as the prop name; Otherwise the prop name will default to `"modelValue"`. In both cases, you can also pass an additional object which can include the prop's options and the model ref's value transform options.

```js
// declares "modelValue" prop, consumed by parent via v-model
const model = defineModel()
// OR: declares "modelValue" prop with options
const model = defineModel({ type: String })

// emits "update:modelValue" when mutated
model.value = 'hello'

// declares "count" prop, consumed by parent via v-model:count
const count = defineModel('count')
// OR: declares "count" prop with options
const count = defineModel('count', { type: Number, default: 0 })

function inc() {
  // emits "update:count" when mutated
  count.value++
}
```

:::هشدار
If you have a `default` value for `defineModel` prop and you don't provide any value for this prop from the parent component, it can cause a de-synchronization between parent and child components. In the example below, the parent's `myRef` is undefined, but the child's `model` is 1:

```js
// child component:
const model = defineModel({ default: 1 })

// parent component:
const myRef = ref()
```

```html
<Child v-model="myRef"></Child>
```

:::

### Modifiers and Transformers {#modifiers-and-transformers}

To access modifiers used with the `v-model` directive, we can destructure the return value of `defineModel()` like this:

```js
const [modelValue, modelModifiers] = defineModel()

// corresponds to v-model.trim
if (modelModifiers.trim) {
  // ...
}
```

When a modifier is present, we likely need to transform the value when reading or syncing it back to the parent. We can achieve this by using the `get` and `set` transformer options:

```js
const [modelValue, modelModifiers] = defineModel({
  // get() omitted as it is not needed here
  set(value) {
    // if the .trim modifier is used, return trimmed value
    if (modelModifiers.trim) {
      return value.trim()
    }
    // otherwise, return the value as-is
    return value
  }
})
```

### استفاده با تایپ اسکریپت <sup class="vt-badge ts" /> {#usage-with-typescript}

Like `defineProps` and `defineEmits`, `defineModel` can also receive type arguments to specify the types of the model value and the modifiers:

```ts
const modelValue = defineModel<string>()
//    ^? Ref<string | undefined>

// default model with options, required removes possible undefined values
const modelValue = defineModel<string>({ required: true })
//    ^? Ref<string>

const [modelValue, modifiers] = defineModel<string, 'trim' | 'uppercase'>()
//                 ^? Record<'trim' | 'uppercase', true | undefined>
```

## defineExpose() {#defineexpose}

Components using `<script setup>` are **closed by default** - i.e. the public instance of the component, which is retrieved via template refs or `$parent` chains, will **not** expose any of the bindings declared inside `<script setup>`.

To explicitly expose properties in a `<script setup>` component, use the `defineExpose` compiler macro:

```vue
<script setup>
import { ref } from 'vue'

const a = 1
const b = ref(2)

defineExpose({
  a,
  b
})
</script>
```

When a parent gets an instance of this component via template refs, the retrieved instance will be of the shape `{ a: number, b: number }` (refs are automatically unwrapped just like on normal instances).

## defineOptions() <sup class="vt-badge" data-text="3.3+" /> {#defineoptions}

This macro can be used to declare component options directly inside `<script setup>` without having to use a separate `<script>` block:

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

- Only supported in 3.3+.
- This is a macro. The options will be hoisted to module scope and cannot access local variables in `<script setup>` that are not literal constants.

## defineSlots()<sup class="vt-badge ts"/> {#defineslots}

This macro can be used to provide type hints to IDEs for slot name and props type checking.

`defineSlots()` only accepts a type parameter and no runtime arguments. The type parameter should be a type literal where the property key is the slot name, and the value type is the slot function. The first argument of the function is the props the slot expects to receive, and its type will be used for slot props in the template. The return type is currently ignored and can be `any`, but we may leverage it for slot content checking in the future.

It also returns the `slots` object, which is equivalent to the `slots` object exposed on the setup context or returned by `useSlots()`.

```vue
<script setup lang="ts">
const slots = defineSlots<{
  default(props: { msg: string }): any
}>()
</script>
```

- Only supported in 3.3+.

## `useSlots()` & `useAttrs()` {#useslots-useattrs}

Usage of `slots` and `attrs` inside `<script setup>` should be relatively rare, since you can access them directly as `$slots` and `$attrs` in the template. In the rare case where you do need them, use the `useSlots` and `useAttrs` helpers respectively:

```vue
<script setup>
import { useSlots, useAttrs } from 'vue'

const slots = useSlots()
const attrs = useAttrs()
</script>
```

`useSlots` and `useAttrs` are actual runtime functions that return the equivalent of `setupContext.slots` and `setupContext.attrs`. They can be used in normal composition API functions as well.

## Usage alongside normal `<script>` {#usage-alongside-normal-script}

`<script setup>` can be used alongside normal `<script>`. A normal `<script>` may be needed in cases where we need to:

- Declare options that cannot be expressed in `<script setup>`, for example `inheritAttrs` or custom options enabled via plugins (Can be replaced by [`defineOptions`](/api/sfc-script-setup#defineoptions) in 3.3+).
- Declaring named exports.
- Run side effects or create objects that should only execute once.

```vue
<script>
// normal <script>, executed in module scope (only once)
runSideEffectOnce()

// declare additional options
export default {
  inheritAttrs: false,
  customOptions: {}
}
</script>

<script setup>
// executed in setup() scope (for each instance)
</script>
```

Support for combining `<script setup>` and `<script>` in the same component is limited to the scenarios described above. Specifically:

- Do **NOT** use a separate `<script>` section for options that can already be defined using `<script setup>`, such as `props` and `emits`.
- Variables created inside `<script setup>` are not added as properties to the component instance, making them inaccessible from the Options API. Mixing APIs in this way is strongly discouraged.

If you find yourself in one of the scenarios that is not supported then you should consider switching to an explicit [`setup()`](/api/composition-api-setup) function, instead of using `<script setup>`.

## Top-level `await` {#top-level-await}

Top-level `await` can be used inside `<script setup>`. The resulting code will be compiled as `async setup()`:

```vue
<script setup>
const post = await fetch(`/api/post/1`).then((r) => r.json())
</script>
```

In addition, the awaited expression will be automatically compiled in a format that preserves the current component instance context after the `await`.

:::warning Note
`async setup()` must be used in combination with `Suspense`, which is currently still an experimental feature. We plan to finalize and document it in a future release - but if you are curious now, you can refer to its [tests](https://github.com/vuejs/core/blob/main/packages/runtime-core/__tests__/components/Suspense.spec.ts) to see how it works.
:::

## Generics <sup class="vt-badge ts" /> {#generics}

Generic type parameters can be declared using the `generic` attribute on the `<script>` tag:

```vue
<script setup lang="ts" generic="T">
defineProps<{
  items: T[]
  selected: T
}>()
</script>
```

The value of `generic` works exactly the same as the parameter list between `<...>` in TypeScript. For example, you can use multiple parameters, `extends` constraints, default types, and reference imported types:

```vue
<script
  setup
  lang="ts"
  generic="T extends string | number, U extends Item"
>
import type { Item } from './types'
defineProps<{
  id: T
  list: U[]
}>()
</script>
```

## Restrictions {#restrictions}

- Due to the difference in module execution semantics, code inside `<script setup>` relies on the context of an SFC. When moved into external `.js` or `.ts` files, it may lead to confusion for both developers and tools. Therefore, **`<script setup>`** cannot be used with the `src` attribute.
- `<script setup>` does not support In-DOM Root Component Template.([Related Discussion](https://github.com/vuejs/core/issues/8391))
