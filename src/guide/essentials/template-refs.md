# ارجاع از طریق تمپلیت - Template Refs {#template-refs}

درحالیکه مدل رندر اعلامی Vue بیشتر عملیات های مرتبط با DOM را برای شما جدا می‌کند، در مواردی پیش می‌آید که نیاز داریم به المنت های DOM دسترسی مستقیم داشته باشیم. برای رسیدن به این هدف، می‌توانیم از ویژگی به خصوص `ref` بهره ببریم:

```vue-html
<input ref="input">
```

ویژگی `ref` همانند ویژگی `key` که در بخش `v-for` مورد بحث قرار گرفت، یک ویژگی به خصوص است. این ویژگی به ما اجازه می‌دهد ارجاعی مستقیم، به المنت مشخصی از DOM یا کامپوننت فرزند بعد از اینکه در DOM قرار گرفت (mount شد) بدست بیاوریم. به عنوان مثال، این ویژگی ممکن است هنگامی مفید باشد که شما بخواهید توسط کد عمل فوکس را بر روی یک input درون کامپوننتی که مانت شده انجام دهید یا یک کتابخانه شخص ثالث را بر روی المنتی مقدار دهی اولیه کنید.

## دسترسی به ارجاع {#accessing-the-refs}

<div class="composition-api">

برای دسترسی به ارجاع در Composition API، نیاز داریم که یک ref هم نام با آن تعریف کنیم:

```vue
<script setup>
import { ref, onMounted } from 'vue'

// برای نگهداری از ارجاع المنت تعریف کن ref یک
// باید با مقدار ارجاع تمپلیت یکسان باشد ref نام
const input = ref(null)

onMounted(() => {
  input.value.focus()
})
</script>

<template>
  <input ref="input" />
</template>
```

اگر از `<script setup>` استفاده نمی‌کنید، اطمینان حاصل کنید که ref را از `setup()‎` برگشت دهید:

```js{6}
export default {
  setup() {
    const input = ref(null)
    // ...
    return {
      input
    }
  }
}
```

</div>
<div class="options-api">

ارجاع حاصل بر روی `this.$refs` نمایش داده می‌شود:

```vue
<script>
export default {
  mounted() {
    this.$refs.input.focus()
  }
}
</script>

<template>
  <input ref="input" />
</template>
```

</div>

توجه داشته باشید که شما فقط **بعد از اینکه کامپوننت mount شد** می‌توانید به ref دسترسی داشته باشید. اگر شما سعی کنید که به <span class="options-api">`‎$refs.input`</span><span class="composition-api">`input`</span> درون یک عبارت تمپلیت دسترسی داشته باشید، در اولین رندر مقدار <span class="options-api">`undefined`</span><span class="composition-api">`null`</span> را خواهد داشت. این به این دلیل است که المنت تا بعد از اولین رندر موجود نمی‌باشد.

<div class="composition-api">

اگر سعی داشته باشید که تغییرات ارجاع تمپلیت را watch کنید، اطمینان حاصل کنید در موردی که مقدار ارجاع `null` است را نظر بگیرید :

```js
watchEffect(() => {
  if (input.value) {
    input.value.focus()
  } else {
    // (v-if برای مثال توسط) قرار دارد unmounted نشده یا در حالت mount المنت هنوز
  }
})
```

همچنین ببینید: [Typing Template Refs](/guide/typescript/composition-api#typing-template-refs) <sup class="vt-badge ts" />

</div>

## استفاده از ارجاع‌ها درون `v-for` {#refs-inside-v-for}

> به نسخه v3.2.25 یا بالاتر نیاز دارد

<div class="composition-api">

هنگامی که `ref` درون `v-for` استفاده می‌شود، ارجاع مربوطه باید شامل مقدار آرایه باشد، که این آرایه بعد از عمل mount با المنت‌ها پُر می‌شود.

```vue
<script setup>
import { ref, onMounted } from 'vue'

const list = ref([
  /* ... */
])

const itemRefs = ref([])

onMounted(() => console.log(itemRefs.value))
</script>

<template>
  <ul>
    <li v-for="item in list" ref="itemRefs">
      {{ item }}
    </li>
  </ul>
</template>
```

[آن را در Playground امتحان کنید](https://play.vuejs.org/#eNpFjs1qwzAQhF9l0CU2uDZtb8UOlJ576bXqwaQyCGRJyCsTEHr3rGwnOehnd2e+nSQ+vW/XqMSH6JdL0J6wKIr+LK2evQuEhKCmBs5+u2hJ/SNjCm7GiV0naaW9OLsQjOZrKNrq97XBW4P3v/o51qTmHzUtd8k+e0CrqsZwRpIWGI0KVN0N7TqaqNp59JUuEt2SutKXY5elmimZT9/t2Tk1F+z0ZiTFFdBHs738Mxrry+TCIEWhQ9sttRQl0tEsK6U4HEBKW3LkfDA6o3dst3H77rFM5BtTfm/P)

</div>
<div class="options-api">

هنگامی که `ref` درون `v-for` استفاده می‌شود، مقدار ارجاع حاصل آرایه‌ای شامل مقادیر مربوطه خواهد بود:

```vue
<script>
export default {
  data() {
    return {
      list: [
        /* ... */
      ]
    }
  },
  mounted() {
    console.log(this.$refs.items)
  }
}
</script>

<template>
  <ul>
    <li v-for="item in list" ref="items">
      {{ item }}
    </li>
  </ul>
</template>
```

[Try it in the Playground](https://play.vuejs.org/#eNpFjk0KwjAQha/yCC4Uaou6kyp4DuOi2KkGYhKSiQildzdNa4WQmTc/37xeXJwr35HEUdTh7pXjszT0cdYzWuqaqBm9NEDbcLPeTDngiaM3PwVoFfiI667AvsDhNpWHMQzF+L9sNEztH3C3JlhNpbaPNT9VKFeeulAqplfY5D1p0qurxVQSqel0w5QUUEedY8q0wnvbWX+SYgRAmWxIiuSzm4tBinkc6HvkuSE7TIBKq4lZZWhdLZfE8AWp4l3T)

</div>

باید توجه داشت که آرایه ساخته شده از ارجاع‌ها تضمین نمی‌کند که به همان ترتیب آرایه مبدا باشد.

## ارجاع با استفاده از تابع {#function-refs}

ویژگی `ref` همچنین می‌تواند به جای استفاده از یک کلید استرینگ به یک تابع وصل شود، که در هر بروزرسانی کامپوننت صدا زده می‌شود و به شما انعطاف کامل درباره اینکه کجا المنت را نگه دارید می‌دهد. تابع ارجاع دهنده، المنت را به عنوان اولین آرگومان دریافت می‌کند:

```vue-html
<input :ref="(el) => { /* اختصاص دهید ref را به یک پراپرتی یا el */ }">
```

توجه داشته باشید ما داریم از یک اتصال `‎:ref` پویا استفاده می‌کنیم تا بتوانیم یک تابع را به جای یک رشته برای نام ارجاع ارسال کنیم. هنگامی که المنت unmounted می‌شود، آرگومان `null` خواهد بود. البته که شما می‌توانید از یک متد به جای تابع خطی استفاده کنید.

## استفاده از ارجاع در کامپوننت {#ref-on-component}

> این قسمت دانش [Components](/guide/essentials/component-basics) را فرض می‌کند. راحت از آن صرف نظر کنید و بعداً برگردید.

`ref` همچنین می‌تواند بر روی کامپوننت فرزند استفاده شود. در این مورد ارجاع، نمونه‌ای از کامپوننت فرزند خواهد بود:

<div class="composition-api">

```vue
<script setup>
import { ref, onMounted } from 'vue'
import Child from './Child.vue'

const child = ref(null)

onMounted(() => {
  // را نگه می‌دارد <Child /> نمونه‌ای از child.value 
})
</script>

<template>
  <Child ref="child" />
</template>
```

</div>
<div class="options-api">

```vue
<script>
import Child from './Child.vue'

export default {
  components: {
    Child
  },
  mounted() {
    // را نگه می‌دارد <Child /> نمونه‌ای از this.$refs.child 
  }
}
</script>

<template>
  <Child ref="child" />
</template>
```

</div>

<span class="composition-api"> اگر کامپوننت فرزند از Options API استفاده می‌کند یا از `<script setup>` استفاده نمی‌کند، نمونه دریافت شده از ارجاع با کلمه کلیدی `this` کامپوننت فرزند یکسان خواهد بود، این به این معنی است که کامپوننت والد به هر پراپرتی و متد کامپوننت فرزند دسترسی خواهد داشت. این کار را آسان می‌کند که جزئیات پیاده سازی کاملا محکمی بین کامپوننت والد و فرزند ایجاد شود، بنابراین می‌توان از ارجاع کامپوننت‌ها در صورت لزوم استفاده کرد - در بیشتر موارد، ابتدا باید سعی کنید که تعاملات بین والد و فرزند را با استفاده از رابط های props و emit به کار ببرید. </span><span class="options-api"> نمونه ارجاع با کلمه کلیدی `this` کامپوننت فرزند یکسان خواهد بود، این به این معنی است که کامپوننت والد به هر پراپرتی و متد کامپوننت فرزند دسترسی خواهد داشت. این کار را آسان می‌کند که جزئیات پیاده سازی کاملا محکمی بین کامپوننت والد و فرزند ایجاد شود، بنابراین باید از ارجاع کامپوننت‌ها در صورت لزوم استفاده کرد - در بیشتر موارد، ابتدا باید سعی کنید که تعاملات بین والد و فرزند را با استفاده از رابط های props و emit به کار ببرید. </span>

<div class="composition-api">

یک استثنا در اینجا وجود دارد، کامپوننت‌هایی که از `<script setup>` استفاده می‌کنند **به صورت پیش‌فرض خصوصی** هستند: کامپوننت والدی که با استفاده از `<script setup>` به کامپوننت فرزند رجوع می‌کند قادر نخواهد بود به چیزی دسترسی پیدا کند مگر اینکه کامپوننت فرزند با استفاده از ماکرو `defineExpose` یک رابط عمومی را در معرض دید قرار دهد:

```vue
<script setup>
import { ref } from 'vue'

const a = 1
const b = ref(2)

// نیاز به ایمپورت شدن ندارند defineExpose ماکروهای کامپایلر، مانند 
defineExpose({
  a,
  b
})
</script>
```

هنگامی که والد نمونه‌ای از این کامپوننت را از طریق ارجاع تمپلیت می‌گیرد، نمونه بازیابی شده به شکل `{ a: number, b: number }` خواهد بود (refها همانند نمونه‌های معمولی به صورت خودکار unwrap می‌شوند)

همچنین ببینید: [Typing Component Template Refs](/guide/typescript/composition-api#typing-component-template-refs) <sup class="vt-badge ts" />

</div>
<div class="options-api">

گزینه `expose` برای محدود کردن دسترسی به نمونه فرزند استفاده می‌شود:

```js
export default {
  expose: ['publicData', 'publicMethod'],
  data() {
    return {
      publicData: 'foo',
      privateData: 'bar'
    }
  },
  methods: {
    publicMethod() {
      /* ... */
    },
    privateMethod() {
      /* ... */
    }
  }
}
```

در مثال بالا، والدی که به این کامپوننت از طریق ارجاع تمپلیت رجوع می‌کند فقط قادر خواهد بود به `publicData` و `publicMethod` دسترسی پیدا کند.

</div>
