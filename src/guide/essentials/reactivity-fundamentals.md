---
outline: deep
---

# مبانی Reactivity {#reactivity-fundamentals}

:::tip API Preference
این صفحه و بسیاری از صفحات دیگر در این راهنما حاوی محتوای متفاوتی برای Options API و Composition API است. ترجیح فعلی شما <span class="options-api">Options API</span><span class="composition-api">Composition API</span> است. شما می‌توانید سبک‌های API را با استفاده از سوئیچ "سبک مرجع API" در بالای نوار کناری سمت چپ تغییر دهید.
:::

در Vue قابلیت Reactivity به ما این امکان را می‌دهد تا نسبت به تغییر دیتای یک متغیر آگاهی داشته باشیم. بطور کلی هنگامی که یک reactive توسط بخشی از برنامه خوانده می‌شود یا نوشته می‌شود سیستم Reactivity فریمورک از آن اطلاع می‌یابد و می‌تواند اعمال مختلفی را انجام دهد از جمله بروز رسانی DOM. توجه داشته باشید که وقتی از reactive صحبت می‌شود در اصل هدف reactive state است که در برخی از قسمت‌ها برای راحتی به آن reactive گفته می‌شود. در Vue چند روش برای تعریف reactive وجود دارد که در ادامه به آن می‌پردازیم. (مترجم)

<div class="options-api">

## تعریف Reactive State \* {#declaring-reactive-state}

در Options API، از آپشن `data` برای اعلام reactive state در یک کامپوننت استفاده می‌کنیم. مقدار آپشن `data` باید تابعی باشد که یک آبجکت برمی‌گرداند. Vue زمانی که یک نمونه جدید از کامپوننت ایجاد می‌کند، این تابع را صدا می‌زند و آبجکت برگشتی را در سیستم reactivity خود قرار می‌دهد. هر پراپرتی top-level (مرتبه اول) این آبجکت بر روی نمونه ساخته شده از کامپوننت (‍`this` در متدها و چرخه حیات) proxy می‌شود:

```js{2-6}
export default {
  data() {
    return {
      count: 1
    }
  },

  // یک هوک چرخه حیات است که بعداً توضیح می‌دهیم `mounted`
  mounted() {
    // به نمونه ساخته شده از کامپوننت اشاره می‌کند `this`
    console.log(this.count) // => 1

    // دیتا آن هم می‌تواند تغییر کند
    this.count = 2
  }
}
```

[آزمایش این مورد در Playground](https://play.vuejs.org/#eNpFUNFqhDAQ/JXBpzsoHu2j3B2U/oYPpnGtoetGkrW2iP/eRFsPApthd2Zndilex7H8mqioimu0wY16r4W+Rx8ULXVmYsVSC9AaNafz/gcC6RTkHwHWT6IVnne85rI+1ZLr5YJmyG1qG7gIA3Yd2R/LhN77T8y9sz1mwuyYkXazcQI2SiHz/7iP3VlQexeb5KKjEKEe2lPyMIxeSBROohqxVO4E6yV6ppL9xykTy83tOQvd7tnzoZtDwhrBO2GYNFloYWLyxrzPPOi44WWLWUt618txvASUhhRCKSHgbZt2scKy7HfCujGOqWL9BVfOgyI=)

این پراپرتی‌ها تنها زمانی که نمونه کامپوننت (component instance) برای اولین بار ایجاد می‌شود اضافه می‌گردند، بنابراین باید مطمئن شوید که همه آنها در آبجکت برگشت شده توسط تابع `data` وجود دارند. در صورت لزوم، از `null`، `undefined` یا مقدار دیگری برای پراپرتی‌هایی که مقدار مطلوب آن هنوز در دسترس نیست، استفاده کنید.

امکان اضافه کردن یک پراپرتی جدید مستقیماً به ‍`this` بدون اضافه کردن آن در `data` وجود دارد. با این حال، پراپرتی‌های اضافه شده به این روش قابلیت‌های reactive را ندارند.

Vue از پیشوند `$` هنگام ارائه APIهای تعبیه شده خود از طریق نمونه ساخته شده از کامپوننت استفاده می‌کند. همچنین پیشوند `_` را برای پراپرتی‌های داخلی رزرو می‌کند. شما باید از استفاده از نام‌هایی برای پراپرتی‌های مرتبه اول `data` که با هر یک از این کاراکترها شروع می‌شوند، اجتناب کنید.

### Reactive Proxy در برابر Original \* {#reactive-proxy-vs-original}

در Vue 3، داده‌ها با استفاده از [JavaScript Proxies](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) به reactive تبدیل می‌شوند. کاربرانی که از Vue 2 می‌آیند باید نکته زیر را بدانند:

```js
export default {
  data() {
    return {
      someObject: {}
    }
  },
  mounted() {
    const newObject = {}
    this.someObject = newObject

    console.log(newObject === this.someObject) // false
  }
}
```

وقتی بعد از تخصیص `this.someObject` به آن دسترسی پیدا می‌کنید، مقدار برگردانده شده یک proxy reactive از `newObject` اصلی است. **بر خلاف Vue 2، اینجا `newObject` اصلی دست‌نخورده باقی می‌ماند و reactive نمی‌شود: مطمئن شوید که همیشه از طریق یک پراپرتی از `this` به reactive دسترسی پیدا کنید.**

</div>

<div class="composition-api">

## تعریف Reactive State \*\* {#declaring-reactive-state-1}

### `ref()‎` \*\* {#ref}

در Composition API، روش توصیه شده برای تعریف یک  reactive استفاده از تابع [`ref()‎`](/api/reactivity-core#ref) است:

```js
import { ref } from 'vue'

const count = ref(0)
```

`ref()‎` آرگومان گرفته شده را درون یک آبجکت Ref قرار می‌دهد و با استفاده پراپرتی `‎.value` برمی‌گرداند:

```js
const count = ref(0)

console.log(count) // { value: 0 }
console.log(count.value) // 0

count.value++
console.log(count.value) // 1
```

> همچنین ببینید: [Typing Refs](/guide/typescript/composition-api#typing-ref) <sup class="vt-badge ts" />

برای دسترسی به Refها درون تمپلیت یک کامپوننت، آن‌ها را در تابع `setup()‎` کامپوننت تعریف کنید و برگردانید:

```js{5,9-11}
import { ref } from 'vue'

export default {
  // است Composition API یک هوک ویژه برای `setup`
  setup() {
    const count = ref(0)

    // را در دسترس تمپلیت قرار می‌دهد ref
    return {
      count
    }
  }
}
```

```vue-html
<div>{{ count }}</div>
```

توجه کنید که **نیاز نبود** `‎.value` را برای استفاده از Ref در تمپلیت بنویسیم. برای راحتی، Refها در تمپلیت به طور خودکار تنظیم می‌شوند (با چند [استثنا](#caveat-when-unwrapping-in-templates)).

شما همچنین می‌توانید یک Ref را مستقیماً در event handlerها تغییر دهید:

```vue-html{1}
<button @click="count++">
  {{ count }}
</button>
```

برای زمانی که منطق پیچیده‌تر داریم، می‌توانیم توابعی برای تغییر Refها در همان scope تعریف کنیم و آن‌ها را در کنار state به عنوان متد در دسترس قرار دهیم:

```js{7-10,15}
import { ref } from 'vue'

export default {
  setup() {
    const count = ref(0)

    function increment() {
      // نیاز است JavaScript در .value
      count.value++
    }

    // تابع را هم در دسترس قرار بدهید
    return {
      count,
      increment
    }
  }
}
```

متد‌های در دسترس قرار داده شده می‌توانند به عنوان event handlerها استفاده شوند:

```vue-html{1}
<button @click="increment">
  {{ count }}
</button>
```

مثال در [Codepen](https://codepen.io/vuejs-examples/pen/WNYbaqo) بدون استفاده از ابزار بیلد.

### `<script setup>` \*\* {#script-setup}

ارائه دستی state (متغیرهای reactive) و متدها از طریق `setup()‎` می‌تواند طولانی باشد. خوشبختانه، این کار در استفاده از [Single-File Components (SFCs)](/guide/scaling-up/sfc) قابل اجتناب است. ما می‌توانیم با استفاده از `<script setup>` نحوه استفاده را ساده کنیم:

```vue{1}
<script setup>
import { ref } from 'vue'

const count = ref(0)

function increment() {
  count.value++
}
</script>

<template>
  <button @click="increment">
    {{ count }}
  </button>
</template>
```

[آزمایش این مورد در Playground](https://play.vuejs.org/#eNo9jUEKgzAQRa8yZKMiaNcllvYe2dgwQqiZhDhxE3L3jrW4/DPvv1/UK8Zhz6juSm82uciwIef4MOR8DImhQMIFKiwpeGgEbQwZsoE2BhsyMUwH0d66475ksuwCgSOb0CNx20ExBCc77POase8NVUN6PBdlSwKjj+vMKAlAvzOzWJ52dfYzGXXpjPoBAKX856uopDGeFfnq8XKp+gWq4FAi)

importها، متغیرها و توابع تعریف شده در `<script setup>` به طور خودکار در تمپلیت همان کامپوننت قابل استفاده هستند. به خود تمپلیت مانند یک تابع جاوااسکریپتی تعریف شده در همان scope فکر کنید - به طور طبیعی به هر چیزی که در کنار آن تعریف شده دسترسی دارد.

:::tip
برای بقیه راهنما، ما عمدتاً از سینتکس SFC + `‎<script setup>‎` برای نمونه کدهای Composition API استفاده خواهیم کرد، زیرا این متداول‌ترین روش استفاده برای توسعه‌دهندگان Vue است.

اگر از SFC استفاده نمی‌کنید، همچنان می‌توانید از Composition API با آپشن `setup()‎` استفاده کنید.
:::

### چرا Ref ؟ \*\* {#why-refs}

شاید سؤال کنید چرا نیاز به Refهایی با `‎.value` به جای متغیرهای ساده داریم. برای توضیح این موضوع، نیاز است مختصراً در مورد نحوه کار سیستم Reactivity در Vue بحث کنیم.

وقتی شما یک Ref را در تمپلیت استفاده می‌کنید، و مقدار آن Ref را بعداً تغییر می‌کند، Vue به طور خودکار تغییر را تشخیص داده و DOM را به روزرسانی می‌کند. این کار از طریق سیستم Reactivity مبتنی بر ردیابی وابستگی‌ها امکان‌پذیر است. وقتی یک کامپوننت برای اولین بار Render می‌شود، Vue هر Refی را که در طول Render استفاده شده ردیابی می‌کند. بعداً **وقتی یک Ref تغییر می‌کند**، کامپوننت‌هایی که آن را ردیابی می‌کنند را **مجدداً Render خواهد کرد**.

در جاوااسکریپت استاندارد، هیچ راهی برای تشخیص دسترسی یا تغییر متغیرهای ساده وجود ندارد. با این حال، ما می‌توانیم عملیات Get و Set یک آبجکت را با متدهای Getter و Setter رهگیری کنیم.

پراپرتی `‎.value` به Vue فرصت می‌دهد تا زمانی را که یک Ref دسترسی یا تغییر یافته را تشخیص دهد. در پشت پرده، Vue ردیابی را در Getter خود انجام می‌دهد و تغییرات را در Setter انجام می‌دهد. برای درک مفهوم آن می‌توانید فکر کنید که یک Ref آبجکتی شبیه به این است:

```js
// شبهه کد، پیاده‌سازی واقعی نیست  
const myRef = {
  _value: 0,
  get value() {
    track()
    return this._value
  },
  set value(newValue) {
    this._value = newValue
    trigger()
  }
}
```

ویژگی دیگر Refها این است که بر خلاف متغیرهای ساده، می‌توان آن‌ها را به توابع پاس داد در حالی که دسترسی به آخرین مقدار و ارتباط Reactivity حفظ می‌شود. این به ویژه هنگام Refactor کردن منطق پیچیده به کد قابل استفاده مجدد بسیار مفید است.

در بخش [Reactivity in Depth](/guide/extras/reactivity-in-depth) در مورد سیستم Reactivity به طور مفصل‌تر بحث شده است.
</div>

<div class="options-api">

## تعریف متدها \* {#declaring-methods}

<VueSchoolLink href="https://vueschool.io/lessons/methods-in-vue-3" title="Free Vue.js Methods Lesson"/>

برای اضافه کردن متدها به یک کامپوننت از آپشن `methods` استفاده می‌کنیم. باید یک آبجکت حاوی متدهای مورد نظر باشد:

```js{7-11}
export default {
  data() {
    return {
      count: 0
    }
  },
  methods: {
    increment() {
      this.count++
    }
  },
  mounted() {
    // متدها می‌توانند در هوک‌های چرخه حیات، یا با سایر روش‌ها صدا زده شوند
    this.increment()
  }
}
```

Vue به طور خودکار مقدار `this` را برای `methods` متصل می‌کند تا همیشه به نمونه ساخته شده از کامپوننت ارجاع دهد. این اطمینان می‌دهد که اگر یک متد به عنوان یک listener رویداد یا callback استفاده شود، `this` مقدار صحیح خود را حفظ کند. شما باید از استفاده از arrow functions هنگام تعریف `methods` اجتناب کنید، زیرا این کار مانع Vue برای جلوگیری از متصل کردن مقدار مناسب `this` می‌شود:

```js
export default {
  methods: {
    increment: () => {
      // BAD: در اینجا وجود ندارد `this` دسترسی به
    }
  }
}
```

همانند سایر پراپرتی های کامپوننت، `methods`  از داخل تمپلیت کامپوننت قابل دسترسی هستند. داخل تمپلیت، آن‌ها بیشتر به عنوان listenerهای رویداد استفاده می‌شوند:

```vue-html
<button @click="increment">{{ count }}</button>
```

[آزمایش این مورد در Playground](https://play.vuejs.org/#eNplj9EKwyAMRX8l+LSx0e65uLL9hy+dZlTWqtg4BuK/z1baDgZicsPJgUR2d656B2QN45P02lErDH6c9QQKn10YCKIwAKqj7nAsPYBHCt6sCUDaYKiBS8lpLuk8/yNSb9XUrKg20uOIhnYXAPV6qhbF6fRvmOeodn6hfzwLKkx+vN5OyIFwdENHmBMAfwQia+AmBy1fV8E2gWBtjOUASInXBcxLvN4MLH0BCe1i4Q==)

در مثال بالا، متد `increment` هنگامی که دکمه `<button>` کلیک شود، صدا زده خواهد شد.

</div>

### Reactivity عمیق {#deep-reactivity}

<div class="options-api">

در Vue، به طور پیش‌فرض state به شدت reactive است. این بدان معناست که می‌توانید انتظار داشته باشید تغییرات حتی زمانی که شما اشیاء یا آرایه‌های تو در تو را تغییر می‌دهید نیز تشخیص داده شوند:

```js
export default {
  data() {
    return {
      obj: {
        nested: { count: 0 },
        arr: ['foo', 'bar']
      }
    }
  },
  methods: {
    mutateDeeply() {
      // این‌ها به درستی کار خواهند کرد
      this.obj.nested.count++
      this.obj.arr.push('baz')
    }
  }
}
```

</div>

<div class="composition-api">

Refها می‌توانند هر نوع مقداری را نگه دارند، از جمله آبجکت‌ها یا آرایه‌های تو در تو، یا ساختمان‌‌داد‌ه درونی جاوااسکریپت مثل `Map` و مانند آن.

یک Ref داده خود را به طور عمیق reactive می‌کند. این بدان معناست که می‌توانید انتظار داشته باشید تغییرات حتی زمانی که شما آبجکت‌ها یا آرایه‌های تو در تو را تغییر می‌دهید نیز تشخیص داده شوند:

```js
import { ref } from 'vue'

const obj = ref({
  nested: { count: 0 },
  arr: ['foo', 'bar']
})

function mutateDeeply() {
  // این‌ها به درستی کار خواهند کرد
  obj.value.nested.count++
  obj.value.arr.push('baz')
}
```

مقادیر غیر اولیه (Non-primitive) از طریق [`reactive()‎`](#reactive) به proxy‌های reactive تبدیل می‌شوند که در زیر مورد بحث قرار گرفته است.

همچنین امکان خروج از reactivity عمیق با استفاده از [shallow refs](/api/reactivity-advanced#shallowref) وجود دارد. برای  shallow refs، تنها دسترسی به `‎.value` ردیابی می‌شود.  shallow refs می‌توانند برای بهینه‌سازی عملکرد با اجتناب از هزینه مشاهده اشیاء بزرگ، یا در مواردی که state داخلی توسط یک کتابخانه خارجی مدیریت می‌شود، استفاده شوند.

مطالعه بیشتر:

- [کاهش هزینه‌ی بیش از حد reactivity برای ساختارهای بزرگِ غیرقابل تغییر](/guide/best-practices/performance#reduce-reactivity-overhead-for-large-immutable-structures)
- [یکپارچه‌سازی با سیستم‌های مدیریت state خارجی](/guide/extras/reactivity-in-depth#integration-with-external-state-systems)

</div>

### زمان به روز رسانی DOM {#dom-update-timing}

وقتی state یک reactive را تغییر می‌دهید، DOM به طور خودکار به‌روزرسانی می‌شود. با این حال، باید توجه داشت که به‌روزرسانی‌های DOM به صورت همزمان (synchronous) اعمال نمی‌شوند. به جای آن، Vue آنها را تا "next tick" در چرخه به‌روزرسانی بافر می‌کند تا اطمینان حاصل شود که هر کامپوننت صرف نظر از اینکه چند تغییر state انجام داده‌، تنها یک بار به‌روزرسانی شود.

برای انتظار به پایان رسیدن به‌روزرسانی DOM پس از تغییر state، می‌توانید از API سراسری [nextTick()‎](/api/general#nexttick) استفاده کنید:

<div class="composition-api">

```js
import { nextTick } from 'vue'

async function increment() {
  count.value++
  await nextTick()
  // به‌روزرسانی شده است DOM اکنون
}
```

</div>
<div class="options-api">

```js
import { nextTick } from 'vue'

export default {
  methods: {
    async increment() {
      this.count++
      await nextTick()
      // Now the DOM is updated
    }
  }
}
```

</div>

<div class="composition-api">

## `reactive()‎` \*\* {#reactive}

روش دیگری برای تعریف reactive وجود دارد و آن استفاده از `reactive()‎` است. بر خلاف ref که داده را در یک آبجکت خاص می‌پیچد، `reactive()‎` خودِ آبجکت را reactive می‌کند:

```js
import { reactive } from 'vue'

const state = reactive({ count: 0 })
```

> همچنین ببینید: [Typing Reactive](/guide/typescript/composition-api#typing-reactive) <sup class="vt-badge ts" />

استفاده در تمپلیت:

```vue-html
<button @click="state.count++">
  {{ state.count }}
</button>
```

آبجکت‌هایی که `reactive()‎` برمی‌گرداند در واقع [JavaScript Proxies](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) هستند و دقیقاً مثل آبجکت‌هایی عادی رفتار می‌کنند. تفاوت در این است که Vue قادر است دسترسی و تغییر همه پراپرتی‌های یک آبجکت reactive را برای ردیابی و فعال کردن reactivity برسی کند.

`reactive()‎` آبجکت را به طور عمیق تبدیل و ردیابی می‌کند: اشیاء تو در تو نیز هنگام دسترسی توسط `reactive()‎` پیچیده می‌شوند. همچنین توسط `ref()‎` زمانی که مقدار ref یک آبجکت است صدا زده می‌شود. مشابه shallow refs در اینجا [`shallowReactive()‎`](/api/reactivity-advanced#shallowreactive) برای خارج شدن از reactivity عمیق وجود دارد.

### Reactive Proxy در برابر Original \*\* {#reactive-proxy-vs-original-1}

مهم است که توجه داشته باشید مقدار برگشتی از `reactive()‎` یک [Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) از آبجکت اصلی است که برابر با خودِ آبجکت اصلی نیست:

```js
const raw = {}
const proxy = reactive(raw)

// برابر با اصلی نیست proxy
console.log(proxy === raw) // false
```

تنها خودِ proxy قابلیت reactivity را دارد - تغییر دادن آبجکت اصلی باعث اعمال به‌روزرسانی نمی‌شود. بنابراین، بهترین روش کار با سیستم reactivity در Vue **استفاده مستقیم از نسخه‌های proxy شده state است**.

برای تضمین دسترسی یکسان به proxy، صدا زدن `reactive()‎` روی همان آبجکت همیشه همان proxy را برمی‌گرداند و صدا زدن `reactive()‎` روی یک proxy موجود نیز همان proxy را برمی‌گرداند:

```js
// را برمی‌گرداند proxy روی همان آبجکت همان reactive() صدا زدن
console.log(reactive(raw) === proxy) // true

// خودِ آن را برمی‌گرداند proxy روی یک reactive() صدا زدن
console.log(reactive(proxy) === proxy) // true
```

این قانون برای اشیاء تو در تو نیز صدق می‌کند. به دلیل reactivity عمیق، اشیاء تو در تو درون یک آبجکت reactive نیز proxy هستند:

```js
const proxy = reactive({})

const raw = {}
proxy.nested = raw

console.log(proxy.nested === raw) // false
```

### محدودیت‌های `reactive()‎` \*\* {#limitations-of-reactive}

`reactive()‎` چند محدودیت دارد:

1. **محدودیت در تایپ داده**: تنها بر روی تایپ‌ object (اشیاء، آرایه‌ها و [collection types](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects#keyed_collections) مانند `Map` و `Set`) کار می‌کند. نمی‌تواند [تایپ‌های اولیه](https://developer.mozilla.org/en-US/docs/Glossary/Primitive) مانند `string`، `number` یا `boolean` را نگه دارد.

2. **امکان جایگزینی کامل آبجکت وجود ندارد**: از آنجایی که ردیابی reactivity از طریق دسترسی به پراپرتی‌ها انجام می‌شود، همیشه باید به همان رفرنس آبجکت reactive دسترسی داشته باشیم. این بدان معناست که نمی‌توانیم به راحتی یک آبجکت reactive را "جایگزین" کنیم زیرا ارتباط reactivity با رفرنس اول از دست می‌رود:

   ```js
   let state = reactive({ count: 0 })

   // دیگر ردیابی نمی‌شود ({ count: 0 }) رفرنس بالا
   // (از دست رفته است reactivity ارتباط)
   state = reactive({ count: 1 })
   ```

3. **Not destructure-friendly**: هنگامی که یک پراپرتی از جنس تایپ‌های اولیه جاوااسکریپت از یک آبجکت reactive را به متغیرهای محلی تبدیل می‌کنیم، یا آن پراپرتی را به عنوان ورودی تابعی ارسال می‌کنیم، ارتباط reactivity از دست می‌رود:

   ```js
   const state = reactive({ count: 0 })

   // جدا می‌شود state.count از count شده است destructure زمانی که
   let { count } = state
   // اصلی تحت تأثیر قرار نمی‌گیرد state
   count++

   // تابع یک عدد ساده دریافت می‌کند و  
   // نمی‌تواند تغییرات را ردیابی کند state.count  
   // حفظ شود reactivity باید کل آبجکت را ارسال کنیم تا
   callSomeFunction(state.count)
   ```

به دلیل این محدودیت‌ها، استفاده از `ref()‎` را به عنوان API اولیه برای تعریف reactive state توصیه می‌کنیم.

## جزئیات اضافی درباره تبدیل Ref \*\* {#additional-ref-unwrapping-details}

### به عنوان پراپرتی آبجکت Reactive \*\* {#ref-unwrapping-as-reactive-object-property}

یک Ref وقتی که به‌عنوان پراپرتی از یک آبجکت reactive دسترسی یا تغییر داده می‌شود، به‌صورت خودکار تبدیل می‌شود. به عبارت دیگر، مانند یک پراپرتی معمولی رفتار می‌کند:

```js
const count = ref(0)
const state = reactive({
  count
})

console.log(state.count) // 0

state.count = 1
console.log(count.value) // 1
```

اگر یک Ref جدید به یک پراپرتی که قبلاً لینک شده به یک Ref موجود است اختصاص داده شود، Ref قدیمی را جایگزین خواهد کرد:

```js
const otherCount = ref(2)

state.count = otherCount
console.log(state.count) // 2
// جدا شده است state.count اصلی اکنون از Ref
console.log(count.value) // 1
```

تبدیل Ref تنها زمانی اتفاق می‌افتد که Ref درون یک آبجکت reactive عمیق قرار بگیرد. این قضیه برای پراپرتی یک [آبجکت shallow reactive](/api/reactivity-advanced#shallowreactive) صدق نمی‌کند.

### ملاحظات مهم در آرایه‌ها و کالکشن‌ها \*\* {#caveat-in-arrays-and-collections}

بر خلاف آبجکت‌های reactive، هنگامی که به یک Ref به عنوان عنصری از یک آرایه reactive یا تایپ‌هایی مانند `Map` دسترسی می‌یابیم، **هیچ** تبدیلی انجام نمی‌شود:

```js
const books = reactive([ref('Vue 3 Guide')])
// نیاز دارد .value اینجا به
console.log(books[0].value)

const map = reactive(new Map([['count', ref(0)]]))
// نیاز دارد .value اینجا به
console.log(map.get('count').value)
```

### ملاحظات هنگام باز شدن Ref در تمپلیت‌ها \*\* {#caveat-when-unwrapping-in-templates}

تبدیل کردن Ref در تمپلیت‌ها تنها در صورتی اعمال می‌شود که Ref یک پراپرتی‌ مرتبه اول (top-level) در context رندر شده تمپلیت باشد.

در مثال زیر، `count` و `object` پراپرتی‌های مرتبه اول هستند، اما `object.id` مرتبه اول نیست:

```js
const count = ref(0)
const object = { id: ref(1) }
```

بنابراین، این عبارت به درستی کار می‌کند:

```vue-html
{{ count + 1 }}
```

اما این یکی کار **نمی‌کند**:

```vue-html
{{ object.id + 1 }}
```

نتیجهٔ رندر `‎[object Object]1` خواهد بود زیرا `object.id` هنگام ارزیابی عبارت باز نمی‌شود و یک آبجکت Ref باقی می‌ماند. برای رفع این مشکل، می‌توانیم `id` را به یک خاصیت مرتبه اول تبدیل کنیم:

```js
const { id } = object
```

```vue-html
{{ id + 1 }}
```

حالا نتیجهٔ رندر `2` خواهد بود.

نکته دیگر این است که یک Ref در صورتی باز می‌شود که مقدار نهایی ارزیابی شده یک interpolation متن باشد (یعنی تگ <code v-pre>{{ }}</code>)، بنابراین کد زیر 1 رندر می‌کند:

```vue-html
{{ object.id }}
```

این تنها یک ویژگی برای راحتی است و معادل <code v-pre>{{ object.id.value }}</code> می‌باشد.

</div>

<div class="options-api">

### متدهای Stateful \* {#stateful-methods}

در برخی موارد، ممکن است نیاز به ایجاد متد به صورت پویا باشد، به عنوان مثال ایجاد یک event handler تاخیردار:

```js
import { debounce } from 'lodash-es'

export default {
  methods: {
    // Lodash تاخیر با
    click: debounce(function () {
      // ... پاسخ به کلیک ...
    }, 500)
  }
}
```

با این حال، این رویکرد برای کامپوننت‌هایی که مجدداً استفاده می‌شوند مشکل‌ساز است زیرا تابع تاخیردار stateful است: state داخلی مربوط به زمان سپری شده را نگه می‌دارد. اگر چندین نمونه کامپوننت از همان تابع تاخیردار استفاده کنند، با هم تداخل پیدا می‌کنند.

برای مستقل نگه داشتن تابع تاخیردار هر نمونه کامپوننت از بقیه، می‌توانیم نسخه تاخیردار را در هوک چرخه حیات `created` ایجاد کنیم:

```js
export default {
  created() {
    // تاخیردار دارد handler هر نمونه اکنون نسخه خود را از
    this.debouncedClick = _.debounce(this.click, 500)
  },
  unmounted() {
    // لغو تایمر هم وقتی کامپوننت حذف می‌شود
    // ایده خوبی است
    this.debouncedClick.cancel()
  },
  methods: {
    click() {
      // ... پاسخ به کلیک ...
    }
  }
}
```

</div>
