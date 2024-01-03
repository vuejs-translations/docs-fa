# Provide / Inject {#provide-inject}

>در این صفحه فرض شده که شما از قبل [مبانی کامپوننت‌ها](/guide/essentials/component-basics) را مطالعه کرده اید. اگر با کامپوننت‌ها آشنایی ندارید، ابتدا آن را بخوانید.

## انتقال پراپ به اعماق درخت کامپوننت‌ها - Prop Drilling {#prop-drilling}

معمولاً وقتی می‌خواهیم داده‌ای را از والد به فرزند منتقل کنیم، از [props](/guide/components/props) استفاده می‌کنیم. اما حالتی را تصور کنید که کامپوننت‌های تو در توی زیادی داریم و یک کامپوننت در عمق درخت نیاز به داده‌ای از یک کامپوننت اجدادی با فاصله زیاد دارد. در این حالت، با استفاده از props باید همان پراپ را در تمام مسیر بین کامپوننت‌ها انتقال دهیم:

![prop drilling diagram](./images/prop-drilling.png)

<!-- https://www.figma.com/file/yNDTtReM2xVgjcGVRzChss/prop-drilling -->

ملاحظه می‌کنید اگرچه کامپوننت `<Footer>` شاید نیازی به این پراپ‌ها ندارد، ولی باز هم باید آن‌ها را تعریف و منتقل کند تا `<DeepChild>` بتواند به آن‌ها دسترسی داشته باشد. اگر زنجیره والدین‌ها طولانی‌تر باشد، کامپوننت‌های بیشتری در مسیر تاثیر می‌گیرند. این موضوع را "props drilling" (انتقال پراپ به اعماق درخت کامپوننت‌ها) می‌نامند و حتماً کار لذت‌بخشی نیست.

می‌توانیم با استفاده از `provide` و `inject` این مشکل را حل کنیم. کامپوننت والد می‌تواند به عنوان یک **ارائه‌دهنده dependencyها** برای تمام فرزندانش عمل کند. هر کامپوننتی در درخت فرزندان، صرف‌نظر از عمق آن، می‌تواند dependencyهای ارائه شده توسط کامپوننت‌های بالاتر در زنجیره والدین را تزریق (inject) کند.

![Provide/inject scheme](./images/provide-inject.png)

<!-- https://www.figma.com/file/PbTJ9oXis5KUawEOWdy2cE/provide-inject -->

## Provide - ارائه {#provide}

<div class="composition-api">

برای ارائه دادن داده به فرزندان یک کامپوننت، از تابع [`provide()‎`](/api/composition-api-dependency-injection#provide) استفاده کنید:

```vue
<script setup>
import { provide } from 'vue'

provide(/* key */ 'message', /* value */ 'hello!')
</script>
```

اگر از `<script setup>` استفاده نمی‌کنید، اطمینان حاصل کنید که `provide()‎` به صورت همگام (synchronous) درون `setup()‎` صدا زده می‌شود:

```js
import { provide } from 'vue'

export default {
  setup() {
    provide(/* key */ 'message', /* value */ 'hello!')
  }
}
```

تابع `provide()‎` دو آرگومان دریافت می‌کند. آرگومان اول **injection key** نام دارد که می‌تواند یک رشته یا یک `Symbol` باشد. injection key توسط کامپوننت‌های فرزند برای پیدا کردن داده مورد نظر استفاده می‌شود. یک کامپوننت می‌تواند `provide()‎` را چندین بار با injection key های متفاوت صدا بزند تا مقادیر مختلفی را ارائه دهد.

آرگومان دوم value ارائه شده است. این value می‌تواند از هر نوعی باشد، از جمله stateهای reactive مانند ref ها:

```js
import { ref, provide } from 'vue'

const count = ref(0)
provide('key', count)
```

ارائه داده‌های reactive به کامپوننت‌های فرزند این امکان را می‌دهد تا یک ارتباط reactive با کامپوننت ارائه‌دهنده برقرار کنند.

</div>

<div class="options-api">

برای ارائه دادن داده به فرزندان یک کامپوننت، از آپشن [`provide`](/api/options-composition#provide) استفاده کنید:

```js
export default {
  provide: {
    message: 'hello!'
  }
}
```

برای هر پراپرتی در آبجکت `provide`، کلید برای پیدا کردن مقدار صحیح جهت تزریق توسط کامپوننت‌های فرزند استفاده می‌شود، در حالی که مقدار آن، همان چیزی است که در نهایت تزریق می‌شود.

اگر نیاز داریم تا stateهایی خاص را ارائه دهیم، مثلاً داده‌های تعریف شده توسط `data()‎`، آنگاه `provide` باید از سینتکس تابع که داده‌ای را برمی‌گرداند استفاده کند:

```js{7-12}
export default {
  data() {
    return {
      message: 'hello!'
    }
  },
  provide() {
    // دسترسی داشته باشیم `this` از سینتکس تابع استفاده می‌کنیم تا به
    return {
      message: this.message
    }
  }
}
```

با اینحال، توجه داشته باشید این کار به طور reactive تزریق را **انجام نمی‌دهد**. در ادامه در مورد [reactive کردن injection ها](#working-with-reactivity) بحث خواهیم کرد.

</div>

## ارائه در سطح اپلیکیشن - App-level Provide {#app-level-provide}

علاوه بر ارائه دادن داده در یک کامپوننت، می‌توانیم در سطح اپلیکیشن هم داده را ارائه دهیم:

```js
import { createApp } from 'vue'

const app = createApp({})

app.provide(/* key */ 'message', /* value */ 'hello!')
```

ارائه‌های سطح اپلیکیشن برای تمام کامپوننت‌های رندر شده در اپلیکیشن قابل دسترسی هستند. این مورد به خصوص زمانی مفید است که [پلاگین‌ها](/guide/reusability/plugins) را می‌نویسیم، چرا که پلاگین‌ها معمولاً قادر نیستند از طریق کامپوننت‌ها مقادیری را ارائه کنند.

## Inject - تزریق {#inject}

<div class="composition-api">

برای تزریق داده‌های ارائه شده توسط یک کامپوننت اجدادی، از تابع [`inject()‎`](/api/composition-api-dependency-injection#inject) استفاده کنید:

```vue
<script setup>
import { inject } from 'vue'

const message = inject('message')
</script>
```

اگر مقدار ارائه شده یک ref باشد، بدون تغییر تزریق می‌شود و به طور خودکار unwrap نمی‌شود. این امکان اتصال reactive به کامپوننت ارائه‌دهنده را برای کامپوننت تزریق‌کننده حفظ می‌کند. به عبارت دیگر، مقدار به صورت "as-is" و بدون تغییر تزریق می‌شود.

[نمونه کامل از provide و inject با reactive](https://play.vuejs.org/#eNqFUUFugzAQ/MrKF1IpxfeIVKp66Kk/8MWFDXYFtmUbpArx967BhURRU9/WOzO7MzuxV+fKcUB2YlWovXYRAsbBvQije2d9hAk8Xo7gvB11gzDDxdseCuIUG+ZN6a7JjZIvVRIlgDCcw+d3pmvTglz1okJ499I0C3qB1dJQT9YRooVaSdNiACWdQ5OICj2WwtTWhAg9hiBbhHNSOxQKu84WT8LkNQ9FBhTHXyg1K75aJHNUROxdJyNSBVBp44YI43NvG+zOgmWWYGt7dcipqPhGZEe2ef07wN3lltD+lWN6tNkV/37+rdKjK2rzhRTt7f3u41xhe37/xJZGAL2PLECXa9NKdD/a6QTTtGnP88LgiXJtYv4BaLHhvg==)

دوباره تاکید می‌کنیم اگر از `<script setup>` استفاده نمی‌کنید، `inject()‎` باید فقط به صورت همگام درون `setup()‎` صدا زده شود:

```js
import { inject } from 'vue'

export default {
  setup() {
    const message = inject('message')
    return { message }
  }
}
```

</div>

<div class="options-api">

برای تزریق داده‌های ارائه شده توسط یک کامپوننت اجدادی، از آپشن [`inject`](/api/options-composition#inject) استفاده کنید:

```js
export default {
  inject: ['message'],
  created() {
    console.log(this.message) // مقدار تزریق شده
  }
}
```

تزریق‌ها **قبل** از state خود کامپوننت انجام می‌شوند، بنابراین می‌توانید در `data()‎` به خاصیت‌های تزریق شده دسترسی داشته باشید:

```js
export default {
  inject: ['message'],
  data() {
    return {
      // مقدار دهی اولیه داده بر اساس مقدار تزریق شده
      fullMessage: this.message
    }
  }
}
```

[نمونه کامل از provide + inject](https://play.vuejs.org/#eNqNkcFqwzAQRH9l0EUthOhuRKH00FO/oO7B2JtERZaEvA4F43+vZCdOTAIJCImRdpi32kG8h7A99iQKobs6msBvpTNt8JHxcTC2wS76FnKrJpVLZelKR39TSUO7qreMoXRA7ZPPkeOuwHByj5v8EqI/moZeXudCIBL30Z0V0FLXVXsqIA9krU8R+XbMR9rS0mqhS4KpDbZiSgrQc5JKQqvlRWzEQnyvuc9YuWbd4eXq+TZn0IvzOeKr8FvsNcaK/R6Ocb9Uc4FvefpE+fMwP0wH8DU7wB77nIo6x6a2hvNEME5D0CpbrjnHf+8excI=)

### Injection Aliasing \* {#injection-aliasing}

وقتی از سینتکس آرایه برای `inject` استفاده می‌کنیم، پراپرتی‌های تزریق شده با همان کلید در نمونه کامپوننت در دسترس قرار می‌گیرند. در مثال بالا، پراپرتی با کلید `"message"` ارائه شده بود و به عنوان `this.message` تزریق شد. local key همان injection key است.

اگر می‌خواهیم خاصیت را با local key متفاوتی تزریق کنیم، نیاز است از سینتکس آبجکت برای آپشن `inject` استفاده کنیم:

```js
export default {
  inject: {
    /* local key */ localMessage: {
      from: /* injection key */ 'message'
    }
  }
}
```

در اینجا، کامپوننت یک پراپرتی ارائه شده با کلید `"message"` را پیدا می‌کند و سپس آن را به عنوان `this.localMessage` در اختیار قرار می‌دهد.

</div>

### Injection Default Values {#injection-default-values}

به طور پیش‌فرض، `inject` فرض می‌کند injection key در جایی در زنجیره والدین ارائه شده است. در صورتی که کلید ارائه نشده باشد، یک هشدار در زمان اجرا نمایش داده می‌شود.

اگر می‌خواهیم یک پراپرتی تزریق شده با optional provider ها کار کند، نیاز است مقدار پیش‌فرضی را مشابه props تعریف کنیم:

<div class="composition-api">

```js
// خواهد بود "default value" مقدار `value`
// ارائه نشده باشد "message" اگر هیچ داده‌ای با کلید
const value = inject('message', 'default value')
```

در برخی موارد، مقدار پیش‌فرض نیاز به صدا زدن تابع یا مقداردهی اولیه یک کلاس جدید دارد. برای جلوگیری از محاسبات یا عوارض جانبی غیرضروری در صورتی که مقدار اختیاری استفاده نشود، می‌توانیم از factory function برای ساخت مقدار پیش‌فرض استفاده کنیم:

```js
const value = inject('key', () => new ExpensiveClass(), true)
```

پارامتر سوم نشان می‌دهد مقدار پیش‌فرض باید به عنوان factory function در نظر گرفته شود.

</div>

<div class="options-api">

```js
export default {
  // سینتکس آبجکت الزامی است
  // هنگام تعریف مقادیر پیش‌فرض برای تزریق‌ها
  inject: {
    message: {
      from: 'message', // اختیاری است اگر همان کلید تزریق استفاده شود
      default: 'default value'
    },
    user: {
      // non-primitive برای مقادیر factory function از
      // یا مواردی که باید برای هر کامپوننت منحصربفرد باشند، استفاده کنید
      default: () => ({ name: 'John' })
    }
  }
}
```

</div>

## کار با Reactive {#working-with-reactivity}

<div class="composition-api">

هنگام استفاده از مقادیر reactive برای provide / inject ، **توصیه می‌شود هر جا امکان دارد تغییرات reactive state را درون _provider_ نگه دارید**. این اطمینان می‌دهد که state ارائه شده و تغییرات احتمالی آن در یک کامپوننت قرار دارند تا نگهداری آن‌ها در آینده آسان‌تر باشد.

ممکن است مواردی باشد که نیاز داشته باشیم داده را از یک کامپوننت تزریق کننده به‌روزرسانی کنیم. در چنین مواردی، توصیه می‌کنیم تابعی را ارائه کنیم که مسئول تغییر دادن state باشد:

```vue{7-9,13}
<!-- inside provider component -->
<script setup>
import { provide, ref } from 'vue'

const location = ref('North Pole')

function updateLocation() {
  location.value = 'South Pole'
}

provide('location', {
  location,
  updateLocation
})
</script>
```

```vue{5}
<!-- in injector component -->
<script setup>
import { inject } from 'vue'

const { location, updateLocation } = inject('location')
</script>

<template>
  <button @click="updateLocation">{{ location }}</button>
</template>
```

در نهایت، می‌توانید مقدار ارائه شده را داخل [`readonly()‎`](/api/reactivity-core#readonly) قرار دهید تا اطمینان حاصل کنید داده‌های انتقال داده شده از طریق `provide` توسط کامپوننت تزریق‌کننده قابل تغییر نیستند.

```vue
<script setup>
import { ref, provide, readonly } from 'vue'

const count = ref(0)
provide('read-only-count', readonly(count))
</script>
```

</div>

<div class="options-api">

برای ایجاد لینک reactive بین injections و provider، نیاز است یک پراپرتی computed با استفاده از تابع [computed()‎](/api/reactivity-core#computed) ارائه کنیم:

```js{10}
import { computed } from 'vue'

export default {
  data() {
    return {
      message: 'hello!'
    }
  },
  provide() {
    return {
      // explicitly provide a computed property
      message: computed(() => this.message)
    }
  }
}
```

[نمونه کامل از provide + inject همراه با Reactivity](https://play.vuejs.org/#eNqNUctqwzAQ/JVFFyeQxnfjBEoPPfULqh6EtYlV9EKWTcH43ytZtmPTQA0CsdqZ2dlRT16tPXctkoKUTeWE9VeqhbLGeXirheRwc0ZBds7HKkKzBdBDZZRtPXIYJlzqU40/I4LjjbUyIKmGEWw0at8UgZrUh1PscObZ4ZhQAA596/RcAShsGnbHArIapTRBP74O8Up060wnOO5QmP0eAvZyBV+L5jw1j2tZqsMp8yWRUHhUVjKPoQIohQ460L0ow1FeKJlEKEnttFweijJfiORElhCf5f3umObb0B9PU/I7kk17PJj7FloN/2t7a2Pj/Zkdob+x8gV8ZlMs2de/8+14AXwkBngD9zgVqjg2rNXPvwjD+EdlHilrn8MvtvD1+Q==)

تابع `computed()‎` معمولاً در کامپوننت‌های Composition API استفاده می‌شود، اما می‌تواند برای پوشش برخی کاربردها در Options API نیز کمک کننده باشد. می‌توانید بیشتر در مورد نحوه استفاده از آن با مطالعه [مبانی Reactivity](/guide/essentials/reactivity-fundamentals) و [Computed Properties](/guide/essentials/computed) با تنظیم API Preference به Composition API بیاموزید.

</div>

## کار با کلیدهای Symbol {#working-with-symbol-keys}

تا اینجا، در مثال‌ها از کلیدهای رشته‌ای برای تزریق داده استفاده کرده‌ایم. اگر در یک برنامه بزرگ با بسیاری ارائه‌دهنده‌های وابستگی کار می‌کنید، یا قصد دارید کامپوننت‌هایی بنویسید که توسط سایر توسعه‌دهندگان استفاده خواهند شد، بهتر است از کلیدهای تزریق Symbol برای جلوگیری از برخورد احتمالی استفاده کنید.

توصیه می‌شود Symbolsها را در یک فایل جداگانه export کنید:

```js
// keys.js
export const myInjectionKey = Symbol()
```

<div class="composition-api">

```js
// in provider component
import { provide } from 'vue'
import { myInjectionKey } from './keys.js'

provide(myInjectionKey, {
  /* data to provide */
})
```

```js
// in injector component
import { inject } from 'vue'
import { myInjectionKey } from './keys.js'

const injected = inject(myInjectionKey)
```

همچنین ببینید: [Typing Provide / Inject](/guide/typescript/composition-api#typing-provide-inject) <sup class="vt-badge ts" />

</div>

<div class="options-api">

```js
// in provider component
import { myInjectionKey } from './keys.js'

export default {
  provide() {
    return {
      [myInjectionKey]: {
        /* data to provide */
      }
    }
  }
}
```

```js
// in injector component
import { myInjectionKey } from './keys.js'

export default {
  inject: {
    injected: { from: myInjectionKey }
  }
}
```

</div>
