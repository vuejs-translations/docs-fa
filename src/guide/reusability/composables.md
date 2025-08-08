# Composables - کامپوزبل ها {#composables}

<script setup>
import { useMouse } from './mouse'
const { x, y } = useMouse()
</script>

:::tip نکته
این بخش به دانش پایه‌ای در مورد Composition API نیاز دارد. اگر تاکنون فقط با Options API آشنا شده‌اید، می‌توانید اولویت API را به Composition API تغییر دهید (با استفاده از تاگل در بالای نوار کناری سمت چپ) و فصل‌های [مبانی Reactivity](/guide/essentials/reactivity-fundamentals) و [هوک‌های چرخه حیات](/guide/essentials/lifecycle) را مجدداً مطالعه کنید.
:::

## یک "Composable" چیست؟ {#what-is-a-composable}

در برنامه‌های Vue، یک "Composable" تابعی است که از Composition API استفاده می‌کند تا منطق **stateful** را کپسوله‌سازی و قابل استفاده مجدد کند. (کلمه stateful به نگه داشتن وضعیت قبلی سیستم و تاثیر گذار بودن آن در پاسخ اشاره دارد در صورتی که کلمه stateless اشاره به این دارد که وضعیت سیستم در پاسخ گویی تاثیری ندارد و در جایی نگه داشته نمی‌شود)

هنگام ساخت برنامه‌های فرانت‌اند، اغلب به استفاده مجدد از کد برای کارهای رایج نیاز داریم. به عنوان مثال، ممکن است بخواهیم تاریخ‌ها را در بسیاری از منطقه‌ها فرمت کنیم، بنابراین یک تابع قابل استفاده مجدد برای این کار قرار می‌دهیم. این تابع فرمت‌کننده منطق را بصورت stateless کپسوله می‌کند: ورودی‌هایی را دریافت می‌کند و بلافاصله خروجی مورد انتظار را برمی‌گرداند. کتابخانه‌های زیادی برای استفاده مجدد از منطق بصورت stateless وجود دارند - به عنوان مثال [lodash](https://lodash.com/) و [date-fns](https://date-fns.org/) که ممکن است شما از آن‌ها شنیده باشید.

در مقابل، منطق stateful شامل مدیریت حالت‌هایی است که با گذر زمان تغییر می‌کنند. یک مثال ساده ردیابی موقعیت فعلی ماوس در یک صفحه است. در سناریوهای واقعی‌تر، می‌تواند منطق پیچیده‌تری مانند حرکات لمسی یا وضعیت اتصال به یک پایگاه داده باشد.

## مثال ردیاب ماوس {#mouse-tracker-example}

اگر بخواهیم عملکرد ردیابی ماوس را با استفاده از Composition API مستقیماً در داخل یک کامپوننت پیاده‌سازی کنیم، به شکل زیر خواهد بود:

```vue [MouseComponent.vue]
<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const x = ref(0)
const y = ref(0)

function update(event) {
  x.value = event.pageX
  y.value = event.pageY
}

onMounted(() => window.addEventListener('mousemove', update))
onUnmounted(() => window.removeEventListener('mousemove', update))
</script>

<template>Mouse position is at: {{ x }}, {{ y }}</template>
```

اما اگر بخواهیم از یک منطق در چندین کامپوننت دوباره استفاده کنیم، چه؟ ما می‌توانیم منطق را به عنوان یک تابع composable در یک فایل خارجی export کنیم:

```js [mouse.js]
import { ref, onMounted, onUnmounted } from 'vue'

// شروع می‌شود "use" با composable طبق قرارداد، نام توابع 
export function useMouse() {
  // مدیریت می‌شود composable کپسوله شده و توسط state
  const x = ref(0)
  const y = ref(0)

  // مدیریت شده خود را در طول زمان به روز کند state می‌تواند composable یک
  function update(event) {
    x.value = event.pageX
    y.value = event.pageY
  }

  // همچنین می‌تواند به چرخه عمر کامپوننت مالک خود متصل شود composable یک
  // تا عوارض جانبی را راه‌اندازی کند و یا از بین ببرد
  onMounted(() => window.addEventListener('mousemove', update))
  onUnmounted(() => window.removeEventListener('mousemove', update))

  // مدیریت شده را در اختیار می‌گذارد state مقدار بازگشت داده شده از    
  return { x, y }
}
```

و به این صورت می‌توان از آن در کامپوننت‌ها استفاده کرد:

```vue [MouseComponent.vue]
<script setup>
import { useMouse } from './mouse.js'

const { x, y } = useMouse()
</script>

<template>Mouse position is at: {{ x }}, {{ y }}</template>
```

<div class="demo">
  Mouse position is at: {{ x }}, {{ y }}
</div>

[آن را در Playground امتحان کنید](https://play.vuejs.org/#eNqNkj1rwzAQhv/KocUOGKVzSAIdurVjoQUvJj4XlfgkJNmxMfrvPcmJkkKHLrbu69H7SlrEszFyHFDsxN6drDIeHPrBHGtSvdHWwwKDwzfNHwjQWd1DIbd9jOW3K2qq6aTJxb6pgpl7Dnmg3NS0365YBnLgsTfnxiNHACvUaKe80gTKQeN3sDAIQqjignEhIvKYqMRta1acFVrsKtDEQPLYxuU7cV8Msmg2mdTilIa6gU5p27tYWKKq1c3ENphaPrGFW25+yMXsHWFaFlfiiOSvFIBJjs15QJ5JeWmaL/xYS/Mfpc9YYrPxl52ULOpwhIuiVl9k07Yvsf9VOY+EtizSWfR6xKK6itgkvQ/+fyNs6v4XJXIsPwVL+WprCiL8AEUxw5s=)

همانطور که می‌بینید، منطق اصلی یکسان باقی مانده است - تنها کاری که باید انجام می‌دادیم این بود که آن را در یک تابع خارجی جابجا کنیم و stateهایی که باید نشان داده شوند را برگردانیم. درست مثل داخل یک کامپوننت، می‌توانید از تمام API‌های [Composition](/api/#composition-api) در composables استفاده کنید. همان `useMouse()‎` می‌تواند حالا در هر کامپوننتی استفاده شود.

قسمت جالب composables این است که می‌توانید آن‌ها را داخل یکدیگر قرار دهید: یک تابع ترکیب‌پذیر می‌تواند یک یا چند تابع ترکیب‌پذیر دیگر را صدا بزند. با داشتن این امکان می‌توانیم منطق پیچیده را با استفاده از واحدهای کوچک و مجزا ترکیب کنیم، شبیه به چگونگی ترکیب یک برنامه کامل با استفاده از کامپوننت‌ها. در واقع، به همین دلیلی بود که تصمیم گرفتیم مجموعه API‌هایی که این الگو را ممکن می‌سازند را Composition API بنامیم.

به عنوان مثال، می‌توانیم منطق افزودن و حذف یک شنونده رویداد DOM را در composable خودش export کنیم:

```js [event.js]
import { onMounted, onUnmounted } from 'vue'

export function useEventListener(target, event, callback) {
  // if you want, you can also make this
  // support selector strings as target
  onMounted(() => target.addEventListener(event, callback))
  onUnmounted(() => target.removeEventListener(event, callback))
}
```

و حالا composable ما یعنی `useMouse()‎` می‌تواند ساده‌تر شود:

```js{2,8-11} [mouse.js]
import { ref } from 'vue'
import { useEventListener } from './event'

export function useMouse() {
  const x = ref(0)
  const y = ref(0)

  useEventListener(window, 'mousemove', (event) => {
    x.value = event.pageX
    y.value = event.pageY
  })

  return { x, y }
}
```

:::tip نکته
هر نمونه ساخته شده از کامپوننت که `useMouse()‎` را صدا می‌زند، کپی‌های خود را از حالت‌های `x` و `y` ایجاد می‌کند تا با یکدیگر تداخل پیدا نکنند. اگر می‌خواهید حالت مشترک بین کامپوننت‌ها را مدیریت کنید، فصل [State Management](/guide/scaling-up/state-management) را بخوانید.
:::

## مثال Async State {#async-state-example}

`useMouse()‎` هیچ آرگومانی را نمی‌پذیرد، پس بیاید یک مثال دیگر که از یک آرگومان استفاده می‌کند را بررسی کنیم. هنگام دریافت داده‌های Async اغلب باید حالت‌های مختلف را مدیریت کنیم: loading و success و error:

```vue
<script setup>
import { ref } from 'vue'

const data = ref(null)
const error = ref(null)

fetch('...')
  .then((res) => res.json())
  .then((json) => (data.value = json))
  .catch((err) => (error.value = err))
</script>

<template>
  <div v-if="error">Oops! Error encountered: {{ error.message }}</div>
  <div v-else-if="data">
    Data loaded:
    <pre>{{ data }}</pre>
  </div>
  <div v-else>Loading...</div>
</template>
```

تکرار این الگو در هر کامپوننتی که نیاز به دریافت داده دارد، خسته‌کننده خواهد بود. بیایید آن را در یک composable بنویسیم:

```js [fetch.js]
import { ref } from 'vue'

export function useFetch(url) {
  const data = ref(null)
  const error = ref(null)

  fetch(url)
    .then((res) => res.json())
    .then((json) => (data.value = json))
    .catch((err) => (error.value = err))

  return { data, error }
}
```

حالا فقط نیاز است در کامپوننت این کار را انجام دهیم:

```vue
<script setup>
import { useFetch } from './fetch.js'

const { data, error } = useFetch('...')
</script>
```

## قبول کردن state های reactive {#accepting-reactive-state}

تابع `useFetch()‎` یک آدرس رشته‌ای به عنوان ورودی می‌گیرد، سپس داده را دریافت می‌کند و کار آن تمام می‌شود. ولی اگر بخواهیم هربار که URL عوض شد دریافت دوباره انجام شود چه؟ برای رسیدن به این هدف، باید reactive را به داخل تابع composable پاس دهیم و بگذاریم ناظرهایی را برای انجام کارهایی با استفاده از state پاس داده شده ایجاد کند.

برای مثال تابع `useFetch()‎` باید بتواند یک `ref` را قبول کند:

```js
const url = ref('/initial-url')

const { data, error } = useFetch(url)

// این باید باعث درخواست مجدد شود
url.value = '/new-url'
```

یا یک [getter function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get#description) را قبول کند:

```js
// تغییر کرد، دوباره درخواست بزند props.id وقتی
const { data, error } = useFetch(() => `/posts/${props.id}`)
```

می‌توانیم مثال پیاده‌سازی شده خود را با API های [`toValue()‎`](/api/reactivity-utilities.html#tovalue) و [`watchEffect()‎`](/api/reactivity-core.html#watcheffect) بازنویسی کنیم:

```js{7,12} [fetch.js]
import { ref, watchEffect, toValue } from 'vue'

export function useFetch(url) {
  const data = ref(null)
  const error = ref(null)

  const fetchData = () => {
    // reset state before fetching..
    data.value = null
    error.value = null

    fetch(toValue(url))
      .then((res) => res.json())
      .then((json) => (data.value = json))
      .catch((err) => (error.value = err))
  }

  watchEffect(() => {
    fetchData()
  })

  return { data, error }
}
```

تابع `toValue()‎` یک API است که در ورژن ۳.۳ اضافه شده که برای عادی سازی ref ها یا getters طراحی شده: اگر آرگومان یک ref باشد، مقدار ref برگردانده می‌شود، اگر آرگومان یک تابع باشد، تابع را صدا می‌زند و مقدار بازگشتی آن را برمی‌گرداند؛ در غیر این صورت، آرگومان را همانطور که هست برمیگرداند. به طور مشابه `unref()‎` اما با عملکرد مخصوص برای تابع‌ها.

توجه داشته باشید که `toValue()‎` درون تابع بازگشتی `watchEffect` فراخوانده می‌شود. این تضمین می‌کند که وابستگی‌های reactive که در طول اجرای `toValue()‎` به آن دسترسی پیدا می‌کند توسط ناظر دنبال می‌شوند.

این نسخه از `useEffect()‎` رشته‌های URL ایستا، refs، و تابع‌های دریافت کننده را قبول می‌کند. این ویژگی آن را انعطاف پذیرتر می‌کند؛ ناظر بلافاصله اجرا می‌شود و وابستگی‌هایی که در طول `toValue()‎` به آنها دسترسی پیدا کرده را ردیابی می‌کند، اگر هیچ وابستگی دنبال نشود، مثلا آدرس همان موقع هم یک رشته باشد، تاثیر (effect) فقط یکبار اجرا می‌شود؛ در غیر این صورت هربار که وابستگی دنبال شده تغییر کند دوباره اجرا می‌شود.

اینجا [نسخه به روز رسانی شده از`()useFetch`](https://play.vuejs.org/#eNp9Vdtu20YQ/ZUpUUA0qpAOjL4YktCbC7Rom8BN8sSHrMihtfZql9iLZEHgv2dml6SpxMiDIWkuZ+acmR2fs1+7rjgEzG6zlaut7Dw49KHbVFruO2M9nMFiu4Ta7LvgsYEeWmv2sKCkxSwoOPwTfb2b/EU5mopHR5GVro12HrbC4UerYA2Lnfeduy3LR2d0p0SNO6MatIU/dbI2DRZUtPSmMa4kgJQuG8qkjvLF28XVaAwRb2wxz69gvZkK/UQ5xUGogBQ/ZpyhEV4sAa01lnpeTwRyApsFWvT2RO6Eea40THBMgfq6NLwlS1/pVZnUJB3ph8c98fNIvwD+MaKBzkQut2xYbYP3RsPhTWvsusokSA0/Vxn8UitZP7GFSX/+8Sz7z1W2OZ9BQt+vypQXS1R+1cgDQciW4iMrimR0wu8270znfoC7SBaJWdAeLTa3QFgxuNijc+IBIy5PPyYOjU19RDEI954/Z/UptKTy6VvqA5XD1AwLTTl/0Aco4s5lV51F5sG+VJJ+v4qxYbmkfiiKYvSvyknPbJnNtoyW+HJpj4Icd22LtV+CN5/ikC4XuNL4HFPaoGsvie3FIqSJp1WIzabl00HxkoyetEVfufhv1kAu3EnX8z0CKEtKofcGzhMb2CItAELL1SPlFMV1pwVj+GROc/vWPoc26oDgdxhfSArlLnbWaBOcOoEzIP3CgbeifqLXLRyICaDBDnVD+3KC7emCSyQ4sifspOx61Hh4Qy/d8BsaOEdkYb1sZS2FoiJKnIC6FbqhsaTVZfk8gDgK6cHLPZowFGUzAQTNWl/BUSrFbzRYHXmSdeAp28RMsI0fyFDaUJg9Spd0SbERZcvZDBRleCPdQMCPh8ARwdRRnBCTjGz5WkT0i0GlSMqixTR6VKyHmmWEHIfV+naSOETyRx8vEYwMv7pa8dJU+hU9Kz2t86ReqjcgaTzCe3oGpEOeD4uyJOcjTXe+obScHwaAi82lo9dC/q/wuyINjrwbuC5uZrS4WAQeyTN9ftOXIVwy537iecoX92kR4q/F1UvqIMsSbq6vo5XF6ekCeEcTauVDFJpuQESvMv53IBXadx3r4KqMrt0w0kwoZY5/R5u3AZejvd5h/fSK/dE9s63K3vN7tQesssnnhX1An9x3//+Hz/R9cu5NExRFf8d5zyIF7jGF/RZ0Q23P4mK3f8XLRmfhg7t79qjdSIobjXLE+Cqju/b7d6i/tHtT3MQ8VrH/Ahstp5A=)، با تاخیر مصنوعی و خطای تصادفی برای اهداف نمایشی موجود است.

## قرارداد‌ها و بهترین شیوه‌ها {#conventions-and-best-practices}

### نام‌گذاری {#naming}

این یک قرارداد است که تابع‌های composable به صورت camelCase و با کلمه use شروع شوند.

### آرگومان‌های ورودی {#input-arguments}

composable می‌تواند refها یا getters را به عنوان آرگومان‌های ورودی قبول کند، حتی اگر برای reactivity به آنها نیازی نداشته باشد، اگر در حال نوشتن یک composable هستید که ممکن است توسط توسعه دهندگان دیگر استفاده شود، ایده خوبی است که حالت‌هایی که ممکن است به جای مقادیر خام، آرگومان های ورودی refs یا getters باشند را هندل کنید. تابع [`()toValue`](/api/reactivity-utilities#tovalue) برای این هدف مفید خواهد بود:

```js
import { toValue } from 'vue'

function useFeature(maybeRefOrGetter) {
  // باشد getter یا ref یک maybeRefOrGetter اگر
  // مقدار نرمال شده آن برگردانده خواهد شد
  // در غیر این صورت همانطور که هست برگردانده می‌شود
  const value = toValue(maybeRefOrGetter)
}
```

اگر زمانی که ورودی composable شما یک ref یا getter هست اثری reactive ایجاد می‌کند، مطمئن شوید که ref یا getter را به طور واضح با `()watch` می‌بینید. همچنین `()toValue` را درون `()watchEffect` صدا بزنید تا به درستی ردیابی شود.

پیاده‌سازی [useFetch()‎ که قبلاً مورد بحث قرار گرفت](#accepting-reactive-state)، یک مثال واضح از یک composable ارائه می‌کند که ref یا getter و یا مقادیر ساده را به عنوان آرگومان ورودی قبول می‌کند.

### مقادیر بازگشتی {#return-values}

احتمالاً توجه کرده اید که ما به جای `()reactive` در composableها به طور انحصاری از `()ref` استفاده کرده ایم. قرارداد پیشنهادی این است که composableها همیشه یک آبجکت ساده و غیر reactive حاوی چندین ref را برگردانند. این عملکرد اجازه می‌دهد تا در کامپوننت‌های سازنده با حفظ reactivity تجزیه شود:

```js
// x and y are refs
const { x, y } = useMouse()
```

برگرداندن یک آبجکت reactive از یک composable باعث می‌شود که ساختار ارتباط واکنش‌پذیری را با فضای داخل composable را از دست بدهد در حالی که ref می‌تواند ارتباط را حفظ کند.

اگر ترجیح می‌دهید از این حالت بازگشتی تابع‌های composable به عنوان  ویژگی های آبجکت استفاده کنید، می‌توانید آبجکت برگشتی را با `()reactive` پیش ببرید تا ref ها قابل دسترسی شوند، برای مثال:

```js
const mouse = reactive(useMouse())
// mouse.x is linked to original ref
console.log(mouse.x)
```

```vue-html
Mouse position is at: {{ mouse.x }}, {{ mouse.y }}
```

### تاثیرات (effect) جانبی {#side-effects}

افزودن تاثیرات جانبی، مانند رویدادهای گوش دهنده DOM یا درخواست داده ایرادی ندارد اما باید قوانین زیر را مد نظر داشت:

- اگر روی برنامه‌ای کار می‌کنید که از [رندر سمت سرور](/guide/scaling-up/ssr) (SSR) استفاده می‌کند، مطمئن شوید که اثرهای جانبی خاص DOM در چرخه هوک‌های نصب شده انجام می‌شوند. مثلا `onUnmounted()‎`. ین هوک‌ها فقط در مرورگر فراخوانی می‌شوند، پس می‌توان مطمئن باشید که کدهای آن به DOM دسترسی دارند.

- به یاد داشته باشید که اثرهای جانبی را در `onUnmounted()‎` حذف کنید، برای مثال اگر یک composable، یک شنونده رویداد DOM را راه اندازی کند، باید آن شنونده را در `onUnmounted()‎` حذف کند. همانطور که در مثال `useMouse()‎` دیدیم؛ یک ایده خوب این است که از composable ایی استفاده کنیم که به طور خودکار این کار را انجام دهد. مثلا `useEventListener()‎`

## محدودیت در استفاده {#usage-restrictions}

composableها فقط باید در `<script setup>`  یا هوک `setup()‎` به صورت **synchronously** (همزمان) صدا زده شوند. در بعضی موارد می‌توان در چرخه هوک‌هایی مانند `onMounted()‎` نیز فراخوانی شوند.

این محدودیت‌ها مهم هستند. زیرا با این مضمون Vue می‌تواند تشخیص دهد کدام یک از کامپوننت‌های فعلی، فعال هستند. دسترسی به یک نمونه از کامپوننت های فعال، به دلایل زیر ضروری است:

1. هوک‌های چرخه حیات را می‌توان در آن ثبت کرد.

2. ویژگی‌های computed و ناظرهای نصب شده را می‌توان به آن پیوند کرد. به طوری که بعدا آنها را هنگام unmounted شدن یک نمونه، دور انداخت تا از نشت حافظه جلوگیری شود.

:::tip نکته
تنها جایی که می‌توانید composableها را بعد از کلمه `await` صدا بزنید `<script setup>` است.  کامپایلر بعد از اجرای موارد `async`، محتوای موارد فعال را بازیابی می‌کند.
:::

## استفاده از composableها برای سازماندهی کد {#extracting-composables-for-code-organization}

composableها نه فقط برای استفاده دوباره، بلکه برای سازماندهی کردن کد نیز می‌توانند استفاده شوند. به نسبت افزایش پیچیدگی کامپوننت‌ها، ممکن است با کامپوننت‌هایی مواجه شوید که برای پیمایش و استدلال بسیار بزرگ هستند، composable کردن API به شما انعطاف پذیری کاملی را می‌دهد تا کد کامپوننت خود را بر اساس منطق های مرتبط سازماندهی کنید:

```vue
<script setup>
import { useFeatureA } from './featureA.js'
import { useFeatureB } from './featureB.js'
import { useFeatureC } from './featureC.js'

const { foo, bar } = useFeatureA()
const { baz } = useFeatureB(foo)
const { qux } = useFeatureC(baz)
</script>
```

تا حدودی می‌توان این composableهای نوشته شده را به عنوان سرویس‌هایی با کامپوننت‌های مشخص‌شده در نظر گرفت که می‌توانند با یکدیگر تعامل کنند.

## استفاده از composable در Options API {#using-composables-in-options-api}

اگر از Options API استفاده می‌کنید، composableها باید درون `setup()‎` صدا زده شوند و پیوند برگردانده شده نیز باید از `setup()‎` برگردانده شوند تا توسط `this` و تمپلیت قابل دسترسی باشند:

```js
import { useMouse } from './mouse.js'
import { useFetch } from './fetch.js'

export default {
  setup() {
    const { x, y } = useMouse()
    const { data, error } = useFetch('...')
    return { x, y, data, error }
  },
  mounted() {
    // مشاهده کرد "this" را می‌توان در setup() ویژگی‌های در معرض نمایش گذاشته شده توسط
    console.log(this.x)
  }
  // ...other options
}
```

## مقایسه با سایر تکنیک‌ها {#comparisons-with-other-techniques}

### در مقابل Mixins {#vs-mixins}

کاربرانی که از نسخه ۲ می‌آیند ممکن است با آپشن mixins آشنا باشند که همچنین به ما امکان می‌دهد که منطق کامپوننت را در واحد‌هایی با قابلیت استفاده مجدد بنویسیم. سه اشکال اصلی برای mixins وجود دارد:  

1. **منبع نامشخص برای پراپرتی‌ها:** هنگام استفاده از بسیاری از mixins‌ها، مشخص نمی‌شود که کدام نوع پراپرتی توسط کدام mixin تزریق می‌شود و ردیابی پیاده‌سازی و درک رفتار کامپوننت را دشوار می‌کند.  همچنین به همین دلیل است که ما استفاده از "refs + destructure pattern" را برای composableها توصیه می‌کنیم: این موضوع منبع پراپرتی را در کامپوننت‌های استفاده کننده مشخص می‌کند.

2. **تلاقی فضای نام‌ها:** چندین mixin از نویسندگان مختلف به طور بالقوه می‌توانند کلیدهای پراپرتی یکسانی را ثبت کنند و باعث برخورد فضای نام شوند، اما هنگام استفاده از composableها، اگر کلیدهای متناقض از composableهای مختلف وجود داشته باشد، می‌توان نام متغیرهای تخریب شده را عوض کرد.

3. **ارتباط بی قید و شرط ترکیب‌های مقابل:** چندین mixins که نیاز به تعامل با یکدیگر دارند، باید به کلیدهای پراپرتی مشترک تکیه کنند و آنها را بدون شرط جفت می‌کند. با استفاده از composableها می‌توان مقادیر بازگشتی یک composable را به عنوان آرگومان به دیگری ارسال کرد. درست مانند توابع عادی

به دلایل بالا، استفاده از mixins ها را از این به‌بعد در Vue ۳ توصیه نمی‌کنیم؛ این ویژگی فقط به دلایل آشنایی و مهاجرت نگه‌داری می‌شود.

### در مقابل کامپوننت‌های بدون رندر {#vs-renderless-components}

در فصل اسلات‌ها، الگوی [کامپوننت بدون رندر](/guide/components/slots#renderless-components) را بر اساس اسلات‌های دارای اسکوپ مورد بحث قرار دادیم. حتی همان نسخه نمایشی ردیابی ماوس را با استفاده از اجزای رندر اجرا کردیم.

مزیت اصلی Composableها نسبت به کامپوننت‌های بدون رندر این است که Composableها هزینه‌های اضافی را متحمل نمی‌شوند. هنگامی که در همه یک برنامه کاربردی استفاده می‌شود، تعداد نمونه های اضافی ایجاد شده توسط الگوی کامپوننت بدون رندر می‌تواند به یک سربار عملکرد قابل توجه تبدیل شود.

توصیه این است که هنگام استفاده مجدد از منطق خالص، از Composables استفاده کنید، و هنگام استفاده مجدد از منطق و طرح بصری، از کامپوننت‌ها.

### در مقابل هوک‌های ری‌اکت {#vs-react-hooks}

اگر تجربه‌ای با React دارید، ممکن است متوجه شوید که این شبیه به کاستوم هوک‌های React به نظر می‌رسد. Composition API تا حدی الهام گرفته از React hooks بوده است، و Vue composables در واقع شبیه به React hooks از نظر توانایی‌های ترکیب منطق هستند. با این حال، Vue composables بر پایه‌ی سیستم واکنش‌پذیری دقیق‌تر ذره‌ای Vue است، که بنیاداً متفاوت از مدل اجرایی React hooks است. این موضوع با جزئیات بیشتری در Composition API FAQ بحث شده است.

اگر تجربه کار با ری‌اکت داشته باشید، ممکن است متوجه شوید که این بسیار شبیه به هوک‌های سفارشی ری‌اکت است. Composition API تا حدی از هوک‌های ری‌اکت الهام گرفته شده است و Composable های Vue در واقع از نظر قابلیت‌های ترکیب منطقی شبیه به هوک های ری‌اکت هستند. با این حال، Composable های Vue مبتنی بر سیستم reactivity دقیق‌تر ذره‌ای Vue هستند که اساساً با نوع اجرای هوک‌های ری‌اکت تفاوت دارد. که با جزئیات بیشتر در [سوالات متداول از Composition API](/guide/extras/composition-api-faq#comparison-with-react-hooks) مورد بحث قرار گرفته است.

## مطالعه بیشتر {#further-reading}

- [reactivity در عمق](/guide/extras/reactivity-in-depth): برای درک نحوه عملکرد سیستم reactivity در Vue در سطح پایین‌تر
- [State Management](/guide/scaling-up/state-management): برای الگوهای مدیریت state که توسط چندین کامپوننت مشترک هستند
- [تست Composables](/guide/scaling-up/testing#testing-composables): نکاتی در مورد تست واحدهای Composables
- [VueUse](https://vueuse.org/): مجموعه ای در حال رشد از Vue composables. کد منبع نیز یک منبع یادگیری عالی است.
