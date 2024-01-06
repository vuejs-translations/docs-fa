# Component v-model {#component-v-model}

## استفاده پایه {#basic-usage}

با استفاده از `v-model` روی یک کامپوننت می‌توان یک اتصال دوطرفه ایجاد کرد.

<div class="composition-api">

از Vue 3.4 به بعد، رویکرد توصیه شده برای انجام این کار استفاده از ماکرو [`defineModel()‎`](/api/sfc-script-setup#definemodel) است:

```vue
<!-- Child.vue -->
<script setup>
const model = defineModel()

function update() {
  model.value++
}
</script>

<template>
  <div>parent bound v-model is: {{ model }}</div>
</template>
```

سپس والد می‌تواند مقدار را با `v-model` متصل کند:

```vue-html
<!-- Parent.vue -->
<Child v-model="count" />
```

مقدار برگردانده شده توسط `defineModel()‎` یک ref است. می‌توان به آن دسترسی یافت و آن را تغییر داد مانند هر ref دیگری، به جز اینکه به عنوان یک اتصال دوطرفه بین داده والد و داده محلی عمل می‌کند:

- `‎.value` آن با مقدار متصل شده توسط `v-model` والد همگام‌سازی می‌شود؛
- هنگامی که توسط فرزند تغییر داده شود، باعث به‌روزرسانی مقدار متصل شده والد نیز می‌شود.

این بدان معناست که می‌توانید این ref را نیز با `v-model` به یک عنصر input ساده متصل کنید، که پیاده‌سازی عناصر input را در حال استفاده از `v-model` را ساده می‌سازد:

```vue
<script setup>
const model = defineModel()
</script>

<template>
  <input v-model="model" />
</template>
```

[مثال در Playground](https://play.vuejs.org/#eNqFUtFKwzAU/ZWYl06YLbK30Q10DFSYigq+5KW0t11mmoQknZPSf/cm3eqEsT0l555zuefmpKV3WsfbBuiUpjY3XDtiwTV6ziSvtTKOLNZcFKQ0qiZRnATkG6JB0BIDJen2kp5iMlfSOlLbisw8P4oeQAhFPpURxVV0zWSa9PNwEgIHtRaZA0SEpOvbeduG5q5LE0Sh2jvZ3tSqADFjFHlGSYJkmhz10zF1FseXvIo3VklcrfX9jOaq1lyAedGOoz1GpyQwnsvQ3fdTqDnTwPhQz9eQf52ob+zO1xh9NWDBbIHRgXOZqcD19PL9GXZ4H0h03whUnyHfwCrReI+97L6RBdo+0gW3j+H9uaw+7HLnQNrDUt6oV3ZBzyhmsjiz+p/dSTwJfUx2+IpD1ic+xz5enwQGXEDJJaw8Gl2I1upMzlc/hEvdOBR6SNKAjqP1J6P/o6XdL11L5h4=)

### در زیر پوسته {#under-the-hood}

`defineModel` یک ماکرو میانبر است. کامپایلر آن را برای موارد زیر توسعه می‌دهد:

- یک پراپ به نام `modelValue` که مقدار ref محلی با آن همگام‌سازی می‌شود؛
- یک رویداد به نام `update:modelValue` که هنگام تغییر مقدار ref محلی ارسال می‌شود.

روش پیاده‌سازی همان کامپوننت فرزند نشان داده شده در بالا قبل از نسخه 3.4 به این صورت است:

```vue
<script setup>
const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <input
    :value="props.modelValue"
    @input="emit('update:modelValue', $event.target.value)"
  />
</template>
```

همان‌طور که می‌بینید، کمی طولانی‌تر است. با این حال، درک آنچه در زیر پوسته اتفاق می‌افتد مفید است.

از آن‌جا که `defineModel` یک پراپ تعریف می‌کند، بنابراین می‌توانید آپشن‌های زیرین پراپ را با پاس دادن آن به `defineModel` اعلام کنید:

```js
// v-model اجباری کردن
const model = defineModel({ required: true })

// ارائه یک مقدار پیش‌فرض
const model = defineModel({ default: 0 })
```

</div>

<div class="options-api">

در ابتدا بیایید نگاهی دوباره داشته باشیم که چطور `v-model` روی المان‌‌های بومی Html استفاده می‌شود:

```vue-html
<input v-model="searchText" />
```

در پشت پرده، کامپایلر تمپلیت، `v-model` را به معادل کامل‌تری برای ما تبدیل می‌کند. بنابراین کد بالا همان کار را انجام می‌دهد که کد زیر انجام می‌دهد:

```vue-html
<input
  :value="searchText"
  @input="searchText = $event.target.value"
/>
```

وقتی `v-model` روی یک کامپوننت استفاده شود، به جای حالت بالا به صورت زیر تبدیل می‌شود:

```vue-html
<CustomInput
  :model-value="searchText"
  @update:model-value="newValue => searchText = newValue"
/>
```

اما برای اینکه این کار واقعا انجام شود، کامپوننت `<CustomInput>` باید دو کار انجام دهد:

1. مقدار شاخصه `value` یک المان `<input>` بومی را به پراپ `modelValue` متصل کند
2. وقتی یک رویداد `input` بومی رخ می‌دهد، یک رویداد سفارشی `update:modelValue` با مقدار جدید را منتشر کند

در اینجا این کار در عمل نمایش داده شده:

```vue
<!-- CustomInput.vue -->
<script>
export default {
  props: ['modelValue'],
  emits: ['update:modelValue']
}
</script>

<template>
  <input
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>
```

حالا `v-model` باید به خوبی با این کامپوننت کار کند:

```vue-html
<CustomInput v-model="searchText" />
```

[آزمایش این مورد در Playground](https://play.vuejs.org/#eNqFkctqwzAQRX9lEAEn4Np744aWrvoD3URdiHiSGvRCHpmC8b93JDfGKYGCkJjXvTrSJF69r8aIohHtcA69p6O0vfEuELzFgZx5tz4SXIIzUFT1JpfGCmmlxe/c3uFFRU0wSQtwdqxh0dLQwHSnNJep3ilS+8PSCxCQYrC3CMDgMKgrNlB8odaOXVJ2TgdvvNp6vSwHhMZrRcgRQLs1G5+M61A/S/ErKQXUR5immwXMWW1VEKX4g3j3Mo9QfXCeKU9FtvpQmp/lM0Oi6RP/qYieebHZNvyL0acLLODNmGYSxCogxVJ6yW1c2iWz/QOnEnY48kdUpMIVGSllD8t8zVZb+PkHqPG4iw==)

یک راه دیگر برای پیاده‌سازی `v-model` درون این کامپوننت استفاده از یک پراپرتی `computed` قابل نوشتن با یک getter و یک setter است. تابع `get` باید مقدار پراپ `modelValue` را برگرداند و تابع `set` باید رویداد مربوط را منتشر کند:

```vue
<!-- CustomInput.vue -->
<script>
export default {
  props: ['modelValue'],
  emits: ['update:modelValue'],
  computed: {
    value: {
      get() {
        return this.modelValue
      },
      set(value) {
        this.$emit('update:modelValue', value)
      }
    }
  }
}
</script>

<template>
  <input v-model="value" />
</template>
```

</div>

## آرگومان‌های v-model {#v-model-arguments}

همچنین `v-model` روی کامپوننت می‌تواند آرگومان بپذیرد:

```vue-html
<MyComponent v-model:title="bookTitle" />
```

<div class="composition-api">

در کامپوننت فرزند، می‌توانیم آرگومان مربوطه را با پاس دادن یک رشته به عنوان اولین آرگومان `defineModel()‎` پشتیبانی کنیم:

```vue
<!-- MyComponent.vue -->
<script setup>
const title = defineModel('title')
</script>

<template>
  <input type="text" v-model="title" />
</template>
```

[آزمایش این مورد در Playground](https://play.vuejs.org/#eNqFkl9PwjAUxb9K05dhglsMb2SQqOFBE9Soj31Zxh0Uu7bpHxxZ9t29LWOiQXzaes7p2a+9a+mt1unOA53S3JaGa0csOK/nTPJaK+NISwxUpCOVUTVJMJoM1nJ/r/BNgnS9nWYnWujFMCFMlkpaRxx3AsgsFI6S3XWtViBIYda+Dg3QFLUWkFwxmWcHFqTAhQPUCwe4IiTf3Mzbtq/qujzDddRPYfruaUzNGI1PRkmG0Twb+uiY/sI9cw0/0VdQcQnL0D5KovgfL5fa4/69jiDQOOTo+S6SOYtfrvg63VolkauNN0lLxOUCzLN2HMkYnZLoBK8QQn0+Rs0ZD+OjXm6g/Dijb20TNEZfDFgwOwQZPIdzAWQN9uLtKXIPJtL7gH3BfAWrhA+Mh9idlyvEPslF2of4J3G5freLxoG0x0MF0JDsYp5RHE6Y1F9H/8adpJO4j8mOdl/Hw/nf)

اگر آپشن‌های پراپ نیز مورد نیاز است، باید پس از نام مدل پاس داده شوند:

```js
const title = defineModel('title', { required: true })
```

<details>
<summary>استفاده قبل از 3.4</summary>

```vue
<!-- MyComponent.vue -->
<script setup>
defineProps(['title'])
defineEmits(['update:title'])
</script>

<template>
  <input
    type="text"
    :value="title"
    @input="$emit('update:title', $event.target.value)"
  />
</template>
```

[آزمایش این مورد در Playground](https://play.vuejs.org/#eNp9kE1rwzAMhv+KMIW00DXsGtKyMXYc7D7vEBplM8QfOHJoCfnvk+1QsjJ2svVKevRKk3h27jAGFJWoh7NXjmBACu4kjdLOeoIJPHYwQ+ethoJLi1vq7fpi+WfQ0JI+lCstcrkYQJqzNQMBKeoRjhG4LcYHbVvsofFfQUcCXhrteix20tRl9sIuOCBkvSHkCKD+fjxN04Ka57rkOOlrMwu7SlVHKdIrBZRcWpc3ntiLO7t/nKHFThl899YN248ikYpP9pj1V60o6sG1TMwDU/q/FZRxgeIPgK4uGcQLSZGlamz6sHKd1afUxOoGeeT298A9bHCMKxBfE3mTSNjl1vud5x8qNa76)

</details>
</div>
<div class="options-api">

در این مورد، به جای پراپ پیش‌فرض `modelValue` و رویداد `update:modelValue`، کامپوننت فرزند باید یک پراپ `title` و رویداد `update:title` برای به‌روزرسانی مقدار والد انتظار داشته باشد:

```vue
<!-- MyComponent.vue -->
<script>
export default {
  props: ['title'],
  emits: ['update:title']
}
</script>

<template>
  <input
    type="text"
    :value="title"
    @input="$emit('update:title', $event.target.value)"
  />
</template>
```

[آزمایش این مورد در Playground](https://play.vuejs.org/#eNqFUNFqwzAM/BVhCm6ha9hryMrGnvcFdR9Mo26B2DGuHFJC/n2yvZakDAohtuTTne5G8eHcrg8oSlFdTr5xtFe2Ma7zBF/Xz45vFi3B2XcG5K6Y9eKYVFZZHBK8xrMOLcGoLMDphrqUMC6Ypm18rzXp9SZjATxS8PZWAVBDLZYg+xfT1diC9t/BxGEctHFtlI2wKR78468q7ttzQcgoTcgVQPXzuh/HzAnTVBVcp/58qz+lMqHelEinElAwtCrufGIrHhJYBPdfEs53jkM4yEQpj8k+miYmc5DBcRKYZeXxqZXGukDZPF1dWhQHUiK3yl63YbZ97r6nIe6uoup6KbmFFfbRCnHGyI4iwyaPPnqffgGMlsEM)

</div>

## اتصال `v-model` چندگانه {#multiple-v-model-bindings}

با استفاده از توانایی هدف قراردادن یک پراپ و رویداد خاص که در [آرگومان‌های `v-model`](#v-model-arguments) یاد گرفتیم، حالا می‌توانیم اتصال‌های `v-model` چندگانه، روی یک کامپوننت تکی ایجاد کنیم.

هر `v-model` بدون نیاز به گزینه‌های اضافه در کامپوننت با یک پراپ مختلف همگام‌سازی می‌شود:

```vue-html
<UserName
  v-model:first-name="first"
  v-model:last-name="last"
/>
```

<div class="composition-api">

```vue
<script setup>
const firstName = defineModel('firstName')
const lastName = defineModel('lastName')
</script>

<template>
  <input type="text" v-model="firstName" />
  <input type="text" v-model="lastName" />
</template>
```

[آزمایش این مورد در Playground](https://play.vuejs.org/#eNqFkstuwjAQRX/F8iZUAqKKHQpIfbAoUmnVx86bKEzANLEt26FUkf+9Y4MDSAg2UWbu9fjckVv6oNRw2wAd08wUmitLDNhGTZngtZLakpZoKIkjpZY1SdCadNK3Ab3IazhowzQ2/ES0MVFIYSwpucbvxA/qJXO5FsldlKr8qDxL8EKW7kEQAQsLtapyC1gRkq3vp217mOccwf8wwLksRSlYIoMvCNkOarmEahyODAT2J4yGgtFzhx8UDf5/r6c4NEs7CNqnpxkvbO0kcVjNhCyh5AJe/SW9pBPOV3DJGvu3dsKFaiyxf8qTW9gheQwVs4Z90BDm5oF47cF/Ht4aZC75argxUmD61g9ktJC14hXoN2U5ZmJ0TILitbyq5O889KxuoB/7xRqKnwv9jdn5HqPvGnDVWwTpNJvrFSCul2efi4DeiRigqdB9RfwAI6vGM+5tj41YIvaJL9C+hOfNxerLzHYWhImhPKh3uuBnFJ/A05XoR9zRcBTOMeGo+wcs+yse)

<details>
<summary>استفاده قبل از 3.4</summary>

```vue
<script setup>
defineProps({
  firstName: String,
  lastName: String
})

defineEmits(['update:firstName', 'update:lastName'])
</script>

<template>
  <input
    type="text"
    :value="firstName"
    @input="$emit('update:firstName', $event.target.value)"
  />
  <input
    type="text"
    :value="lastName"
    @input="$emit('update:lastName', $event.target.value)"
  />
</template>
```

[آزمایش این مورد در Playground](https://play.vuejs.org/#eNqNUc1qwzAMfhVjCk6hTdg1pGWD7bLDGIydlh1Cq7SGxDaOEjaC332yU6cdFNpLsPRJ348y8idj0qEHnvOi21lpkHWAvdmWSrZGW2Qjs1Azx2qrWyZoVMzQZwf2rWrhhKVZbHhGGivVTqsOWS0tfTeeKBGv+qjEMkJNdUaeNXigyCYjZIEKhNY0FQJVjBXHh+04nvicY/QOBM4VGUFhJHrwBWPDutV7aPKwslbU35Q8FCX/P+GJ4oB/T3hGpEU2m+ArfpnxytX2UEsF71abLhk9QxDzCzn7QCvVYeW7XuGyWSpH0eP6SyuxS75Eb/akOpn302LFYi8SiO8bJ5PK9DhFxV/j0yH8zOnzoWr6+SbhbifkMSwSsgByk1zzsoABFKZY2QNgGpiW57Pdrx2z3JCeI99Svvxh7g8muf2x)

</details>
</div>
<div class="options-api">

```vue
<script>
export default {
  props: {
    firstName: String,
    lastName: String
  },
  emits: ['update:firstName', 'update:lastName']
}
</script>

<template>
  <input
    type="text"
    :value="firstName"
    @input="$emit('update:firstName', $event.target.value)"
  />
  <input
    type="text"
    :value="lastName"
    @input="$emit('update:lastName', $event.target.value)"
  />
</template>
```

[آزمایش این مورد در Playground](https://play.vuejs.org/#eNqNkk1rg0AQhv/KIAETSJRexYYWeuqhl9JTt4clmSSC7i7rKCnif+/ObtYkELAiujPzztejQ/JqTNZ3mBRJ2e5sZWgrVNUYbQm+WrQfskE4WN1AmuXRwQmpUELh2Qv3eJBdTTAIBbDTLluhoraA4VpjXHNwL0kuV0EIYJE6q6IFcKhsSwWk7/qkUq/nq5be+aa5JztGfrmHu8t8GtoZhI2pJaGzAMrT03YYQk0YR3BnruSOZe5CXhKnC3X7TaP3WBc+ZaOc/1kk3hDJvYILRQGfQzx3Rct8GiJZJ7fA7gg/AmesNszMrUIXFpxbwCfZSh09D0Hc7tbN6sAWm4qZf6edcZgxrMHSdA3RF7PTn1l8lTIdhbXp1/CmhOeJRNHLupv4eIaXyItPdJEFD7R8NM0Ce/d/ZCTtESnzlVZXhP/vHbeZaT0tPdf59uONfx7mDVM=)

</div>

## مدیریت modifierهای `v-model` {#handling-v-model-modifiers}

وقتی درحال یادگیری اتصال‌های input در form‌ها بودیم، مشاهده کردیم که `v-model` دارای [modifierهای داخلی](/guide/essentials/forms#modifiers) `‎.trim` و `‎.number` و `‎.lazy` بود. گاهی اوقات همچنین ممکن است بخواهید که `v-model`‌ای که روی کامپوننت سفارشی‌شده input خود قرار دادید هم قابلیت پشتیبانی از modifierهای سفارشی را داشته باشد.

بیایید یک نمونه modifier سفارشی بسازیم، `capitalize`، که وظیفه داشته باشد حرف اول هر رشته‌ای که توسط اتصال `v-model` فراهم‌شده را به حالت بزرگ آن تبدیل کند:

```vue-html
<MyComponent v-model.capitalize="myText" />
```

<div class="composition-api">

می‌توان به modifierهای اضافه شده به یک `v-model` در کامپوننت فرزند با ساختارشکنی مقدار بازگشت داده شده از `defineModel()‎` به این صورت دسترسی یافت:

```vue{4}
<script setup>
const [model, modifiers] = defineModel()

console.log(modifiers) // { capitalize: true }
</script>

<template>
  <input type="text" v-model="model" />
</template>
```

برای تنظیم شرطی نحوه خواندن/نوشتن مقدار بر اساس modifierها، می‌توان آپشن‌های `get` و `set` را به `defineModel()‎` پاس داد. این دو آپشن مقدار داده را در هنگام خواندن/نوشتن ref مدل دریافت می‌کنند و باید مقدار تبدیل شده را برگردانند. در ادامه نحوه استفاده از آپشن `set` برای پیاده‌سازی modifier مورد نظر یعنی capitalize را می‌بینیم:

```vue{6-8}
<script setup>
const [model, modifiers] = defineModel({
  set(value) {
    if (modifiers.capitalize) {
      return value.charAt(0).toUpperCase() + value.slice(1)
    }
    return value
  }
})
</script>

<template>
  <input type="text" v-model="model" />
</template>
```

[آزمایش این مورد در Playground](https://play.vuejs.org/#eNp9UsFu2zAM/RVClzhY5mzoLUgHdEUPG9Bt2LLTtIPh0Ik6WxIkyosb5N9LybFrFG1OkvgeyccnHsWNtXkbUKzE2pdOWQKPFOwnqVVjjSM4gsMKTlA508CMqbMRuu9uDd80ajrD+XISi3WZDCB1abQnaLoNHgiuY8VsNptLvV72TbkdPwgbWxeE/ALY7JUHpW0gKAurqKjVI3rAFl1He6V30JkA3AbdKvLXUzXt+8Zssc6fM6+l6NtLAUtusF6O3cRCvFB9yY2SiYFw+8KSYcY/qfEC+FCVQuf/8rxbrJTG+4hkxyiWq2ZtUQecQ3oDqAqyMWeieyQAu0bBaUh5ebkv3A1lH+Y5md/WorstPGZzeHfGfa1KzD6yxzH11B/TCjHC4dPlX1j3P0CdjQ5S79/Z3WhpPF91lDz7Uald/uCNZj/TFFJE91SN7rslxX5JsRrmk6Koa/P/a4qRC7gY4uUey3+vxB/8Icak+OHQo2tRihGjwu2QtUb47te3pHsEWXWomX0B/Ine1CFq7Gmfg96y7Akvqf2StoKXcePvDoTaD0NFocnhxJeClyRu2FujP8u9yq+GnxGnJxSEO+M=)

<details>
<summary>استفاده قبل از 3.4</summary>

```vue{11-13}
<script setup>
const props = defineProps({
  modelValue: String,
  modelModifiers: { default: () => ({}) }
})

const emit = defineEmits(['update:modelValue'])

function emitValue(e) {
  let value = e.target.value
  if (props.modelModifiers.capitalize) {
    value = value.charAt(0).toUpperCase() + value.slice(1)
  }
  emit('update:modelValue', value)
}
</script>

<template>
  <input type="text" :value="modelValue" @input="emitValue" />
</template>
```

[آزمایش این مورد در Playground](https://play.vuejs.org/#eNp9Us1Og0AQfpUJF5ZYqV4JNTaNxyYmVi/igdCh3QR2N7tDIza8u7NLpdU0nmB+v5/ZY7Q0Jj10GGVR7iorDYFD6sxDoWRrtCU4gsUaBqitbiHm1ngqrfuV5j+Fik7ldH6R83u5GaBQlVaOoO03+Emw8BtFHCeFyucjKMNxQNiapiTkCGCzlw6kMh1BVRpJZSO/0AEe0Pa0l2oHve6AYdBmvj+/ZHO4bfUWm/Q8uSiiEb6IYM4A+XxCi2bRH9ZX3BgVGKuNYwFbrKXCZx+Jo0cPcG9l02EGL2SZ3mxKr/VW1hKty9hMniy7hjIQCSweQByHBIZCDWzGDwi20ps0Yjxx4MR73Jktc83OOPFHGKk7VZHUKkyFgsAEAqcG2Qif4WWYUml3yOp8wldlDSLISX+TvPDstAemLeGbVvvSLkncJSnpV2PQrkqHLOfmVHeNrFDcMz3w0iBQE1cUzMYBbuS2f55CPj4D6o0/I41HzMKsP+u0kLOPoZWzkx1X7j18A8s0DEY=)

</details>
</div>

<div class="options-api">

modifierهای اضافه شده به یک `v-model` کامپوننت از طریق پراپ `modelModifiers` به کامپوننت ارائه می‌شوند. در مثال زیر، ما یک کامپوننت ساخته‌ایم که شامل یک پراپ `modelModifiers` با مقدار پیش‌فرض آبجکت خالی است:

```vue{11}
<script>
export default {
  props: {
    modelValue: String,
    modelModifiers: {
      default: () => ({})
    }
  },
  emits: ['update:modelValue'],
  created() {
    console.log(this.modelModifiers) // { capitalize: true }
  }
}
</script>

<template>
  <input
    type="text"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>
```

توجه کنید که پراپ `modelModifiers` شامل `capitalize` است و مقدارش `true` تنظیم شده‌ چرا که در `v-model` متصل‌شده، تنظیم شده است.

حالا که پراپ خود را تنظیم کرده‌ایم، می‌توانیم کلیدهای شی `modelModifiers` را بررسی کنیم و یک handler برای تغییر مقدار منتشرشده بنویسیم. در قطعه کد زیر، ما حروف رشته را هر زمان که المان `‎<input />‎` یک رویداد `input` انتشار دهد، به حالت بزرگ تبدیل می‌کنیم.

```vue{13-15}
<script>
export default {
  props: {
    modelValue: String,
    modelModifiers: {
      default: () => ({})
    }
  },
  emits: ['update:modelValue'],
  methods: {
    emitValue(e) {
      let value = e.target.value
      if (this.modelModifiers.capitalize) {
        value = value.charAt(0).toUpperCase() + value.slice(1)
      }
      this.$emit('update:modelValue', value)
    }
  }
}
</script>

<template>
  <input type="text" :value="modelValue" @input="emitValue" />
</template>
```

[آزمایش این مورد در Playground](https://play.vuejs.org/#eNqFks1qg0AQgF9lkIKGpqa9iikNOefUtJfaw6KTZEHdZR1DbPDdO7saf0qgIq47//PNXL2N1uG5Ri/y4io1UtNrUspCK0Owa7aK/0osCQ5GFeCHq4nMuvlJCZCUeHEOGR5EnRNcrTS92VURXGex2qXVZ4JEsOhsAQxSbcrbDaBo9nihCHyXAaC1B3/4jVdDoXwhLHQuCPkGsD/JCmSpa4JUaEkilz9YAZ7RNHSS5REaVQPXgCay9vG0rPNToTLMw9FznXhdHYkHK04Qr4Zs3tL7g2JG8B4QbZS2LLqGXK5PkdcYwTsZrs1R6RU7lcmDRDPaM7AuWARMbf0KwbVdTNk4dyyk5f3l15r5YjRm8b+dQYF0UtkY1jo4fYDDLAByZBxWCmvAkIQ5IvdoBTcLeYCAiVbhvNwJvEk4GIK5M0xPwmwoeF6EpD60RrMVFXJXj72+ymWKwUvfXt+gfVzGB1tzcKfDZec+o/LfxsTdtlCj7bSpm3Xk4tjpD8FZ+uZMWTowu7MW7S+CWR77)

</div>

### modifierها برای v-model‌های آرگومان‌دار {#modifiers-for-v-model-with-arguments}

<div class="options-api">

برای اتصال‌های `v-model`‌ای که هم پیراینده و هم آرگومان دارند، نام پراپ تولیدشده به شکل `arg + "Modifiers"‎` خواهد بود. برای مثال:

```vue-html
<MyComponent v-model:title.capitalize="myText">
```

تعاریف متناظر باید به این شکل باشند:

```js
export default {
  props: ['title', 'titleModifiers'],
  emits: ['update:title'],
  created() {
    console.log(this.titleModifiers) // { capitalize: true }
  }
}
```

</div>

اینجا مثال دیگری از استفاده از پیراینده‌ها با `v-model` چندگانه با آرگومان‌های مختلف را مشاهده می‌کنید:

```vue-html
<UserName
  v-model:first-name.capitalize="first"
  v-model:last-name.uppercase="last"
/>
```

<div class="composition-api">

```vue
<script setup>
const [firstName, firstNameModifiers] = defineModel('firstName')
const [lastName, lastNameModifiers] = defineModel('lastName')

console.log(firstNameModifiers) // { capitalize: true }
console.log(lastNameModifiers) // { uppercase: true}
</script>
```

<details>
<summary>استفاده قبل از 3.4</summary>

```vue{5,6,10,11}
<script setup>
const props = defineProps({
firstName: String,
lastName: String,
firstNameModifiers: { default: () => ({}) },
lastNameModifiers: { default: () => ({}) }
})
defineEmits(['update:firstName', 'update:lastName'])

console.log(props.firstNameModifiers) // { capitalize: true }
console.log(props.lastNameModifiers) // { uppercase: true}
</script>
```

</details>
</div>
<div class="options-api">

```vue{15,16}
<script>
export default {
  props: {
    firstName: String,
    lastName: String,
    firstNameModifiers: {
      default: () => ({})
    },
    lastNameModifiers: {
      default: () => ({})
    }
  },
  emits: ['update:firstName', 'update:lastName'],
  created() {
    console.log(this.firstNameModifiers) // { capitalize: true }
    console.log(this.lastNameModifiers) // { uppercase: true}
  }
}
</script>
```

</div>
