# Composition API: setup()‎ {#composition-api-setup}

## کاربرد عمومی {#basic-usage}

هوک `setup()‎` در شرایط زیر، زمانی که قصد استفاده از Composition API را داریم، به عنوان اولین قدم استفاده می‌شود:

1. استفاده از Composition API بدون مرحله ساخت (build)
2. ترکیب کدهای نوشته شده با Composition API در یک کامپوننت با ساختار Options API

:::tip نکات تکمیلی
اگر از کامپوننت های تک فایلی (Single-File) با Composition API استفاده می‌کنید، برای داشتن کدهای کوتاه‌تر و ارگونومیک‌تر توصیه می‌شود از [`<script setup>`](/api/sfc-script-setup) استفاده کنید.
:::

با استفاده از [Reactivity APIs](./reactivity-core) و گرفتن خروجی از یک آبجکت از تابع `setup()‎`، می‌توان reactive state را تعریف نمود. پراپرتی‌های آبجکتی که از آن خروجی گرفته‌ایم نیز در نمونه ساخته شده از کامپوننت، قابل دسترس خواهد بود (به شرط آنکه سایر آپشن‌ها نیز استفاده شوند):

```vue
<script>
import { ref } from 'vue'

export default {
  setup() {
    const count = ref(0)

    // expose to template and other options API hooks
    return {
      count
    }
  },

  mounted() {
    console.log(this.count) // 0
  }
}
</script>

<template>
  <button @click="count++">{{ count }}</button>
</template>
```

خروجی [refs](/api/reactivity-core#ref) زمانی که در تمپلیت قابل دسترس باشد، بصورت خودکار از `setup` [تفکیک](/guide/essentials/reactivity-fundamentals#deep-reactivity) می‌شود، در نتیجه برای دسترسی به آن نیازی به استفاده از `.value` نیست. علاوه بر این، در شرایطی که از `this` استفاده می‌کنیم نیز به صورت خودکار تفکیک خواهند شد.

تایع `setup()‎` به تنهایی دسترسی به نمونه ساخته شده از کامپوننت را ندارد - در تابع `setup()‎` عبارت `this` مقدار تعریف نشده (`undefined`) دارد. تنها می‌توان از طریق Options API به مقادیر Composition-API-exposed دسترسی داشت، و نه برعکس.

تابع `setup()‎` باید یک آبجکت از نوع _synchronously_ خروجی دهد. تنها زمانی می‌شود از `async setup()‎` استفاده کرد که کامپوننت از نوع [Suspense](../guide/built-ins/suspense) باشد.

## دسترسی به Props {#accessing-props}

اولین آرگومان تابع `setup` مقادیر `props` می‌باشد. درست همانند سایر کامپوننت‌های استاندارد، مقدار `props` درون تایع `setup` متغیر بوده و با پاس دادن متغیر جدید، به‌ روز رسانی خواهد شد.

```js
export default {
  props: {
    title: String
  },
  setup(props) {
    console.log(props.title)
  }
}
```

توجه داشته باشید که با تعمیم (destructure) کردن آبجکت `props`، متغیرهای تعمیم داده‌شده دینامیک بودن خود را از دست می‌دهند. درنتیجه توصیه می‌شود همواره از طریق فرم `props.xxx` به مقادیر `props` دسترسی داشته باشید.
اما اگر اصرار به تعمیم دادن متغیرهای درونی props دارید، یا اینکه با حفظ دینامیک بودن آن قصد پاس کردن یک prop به تابع خارجی را دارید، می‌توان از ‌APIهای [toRefs()‎](./reactivity-utilities#torefs) یا [toRef()‎](/api/reactivity-utilities#toref) استفاده کنید:

```js
import { toRefs, toRef } from 'vue'

export default {
  setup(props) {
    // turn `props` into an object of refs, then destructure
    const { title } = toRefs(props)
    // `title` is a ref that tracks `props.title`
    console.log(title.value)

    // OR, turn a single property on `props` into a ref
    const title = toRef(props, 'title')
  }
}
```

## آبجکت Setup Context {#setup-context}

دومین آرگومانی که به تابع `setup` داده می‌شود، آبجکت **Setup Context** می‌باشد. سایر پارامترهایی که ممکن است در تابع `setup` استفاده گردد، از طریق این آبجکت وارد می‌شود:

```js
export default {
  setup(props, context) {
    // Attributes (Non-reactive object, equivalent to $attrs)
    console.log(context.attrs)

    // Slots (Non-reactive object, equivalent to $slots)
    console.log(context.slots)

    // Emit events (Function, equivalent to $emit)
    console.log(context.emit)

    // Expose public properties (Function)
    console.log(context.expose)
  }
}
```

از آنجا که آبجکت context دینامیک نمی‌باشد، با اطمینان خاطر قابل تعمیم دادن است:

```js
export default {
  setup(props, { attrs, slots, emit, expose }) {
    ...
  }
}
```

مقادیر `attrs` و `slots` آبجکت‌های stateful هستند و همیشه با آپدیت شدن کامپوننت، مقادیر تازه دریافت می‌کنند. این بدین معنا است که مقادیر آنها نباید تعمیم داده شوند و باید بصورت `attrs.x` یا `slots.x` مورد استفاده قرار گیرند. توجه داشته باشید که برخلاف `props`، مقادیر `attrs` و `slots` دینامیک (reactive) **نیستند**. اعمال تاثیرات جانبی (side effects) روی مقادیر `attrs` و `slots` باید در چرخه عمر (lifecycle) هوک انجام شود.

### استفاده از مقادیر عمومی {#exposing-public-properties}

تابع `expose` زمانی که مقادیر نمونه ساخته شده از کامپوننت، توسط کامپوننت مادر از طریق [template refs](/guide/essentials/template-refs#ref-on-component) در دسترس قرار گرفته باشد، برای محدودسازی صریح این مقادیر مورد استفاده قرار می‌گیرد:

```js{5,10}
export default {
  setup(props, { expose }) {
    // make the instance "closed" -
    // i.e. do not expose anything to the parent
    expose()

    const publicCount = ref(0)
    const privateCount = ref(0)
    // selectively expose local state
    expose({ count: publicCount })
  }
}
```

## استفاده با Render Functions {#usage-with-render-functions}

تابع `setup` می‌تواند یک خروجی از نوع [render function](/guide/extras/render-function) نیز داشته باشد. از این طریق می‌توان بصورت مستقیم از reactive state تعریف شده در اسکوپ (scope) استفاده کرد:

```js{6}
import { h, ref } from 'vue'

export default {
  setup() {
    const count = ref(0)
    return () => h('div', count.value)
  }
}
```

زمانی که یک render function خروجی داده می‌شود، امکان خروجی گرفتن از مقادیر دیگر وجود ندارد. زمانی که مقادیر تنها در این کامپوننت استفاده شوند، مشکلی برای ما بوجود نمی‌آورد. اما در حالتی که نیاز باشد توابع کامپوننت از طریق template refs به کامپوننت مادر ارجاع داده شوند، این روش مشکل ساز خواهد بود.
با فراخواندن تابع [`expose()‎`](#exposing-public-properties) می‌توان این مشکل را برطرف نمود:

```js{8-10}
import { h, ref } from 'vue'

export default {
  setup(props, { expose }) {
    const count = ref(0)
    const increment = () => ++count.value

    expose({
      increment
    })

    return () => h('div', count.value)
  }
}
```

تابع `increment` از طریق template ref در کامپوننت مادر قابل دسترسی خواهد بود.
