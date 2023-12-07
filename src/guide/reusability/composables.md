`<script setup>
import { useMouse } from './mouse'
const { x, y } = useMouse()
</script>
`
# ترکیب‌‌‌ پذیری

این مبحث دربرگیرنده دانش پایه‌ از ترکیب بندی API می‌باشد. اگر vuo را با اِی‌پی‌آی گزینه‌ای یاد گرفته‌اید، می‌توانید الویت API را به روش ترکیب‌کردن تغییر دهید (با کلیک برروی قسمت بالایی نوار سمت چپ) و مباحث [مبانی واکنش پذیری](/guide/essentials/reactivity-fundamentals) و [چرخه زندگی هوک‌ها ](/guide/essentials/lifecycle) را دوباره مطالعه کنید.



## "ترکیب‌‌‌ پذیری" چیست؟

در یک برنامه کاربردی vuo، ترکیب پذیری به معنای روشی (تابعی) برای کپسوله سازی و استفاده مجدد از یک بخش منطقی است.

هنگام ساخت فرانت اند برنامه‌های کاربردی، اکثرا به استفاده‌ مجدد از یک منطق در موقعیت‌های تکراری نیاز داریم. برای مثال، ممکن است برای موقعیت‌های زیادی بخواهیم تبدیل تاریخ انجام دهیم؛ پس یک تابع برای استفاده مجدد از آن تعریف می‌کنیم. این تابع مبدل تاریخ، یک منطق را بدون نیاز به وضعیتی مشخص کپسوله می‌کند: ورودی‌هایی می‌گیرد و انتظار می‌رود بلافاصله خروجی را برگرداند. کتابخانه‌های زیادی برای استفاده از منطق‌های این‌چنینی وجود دارد. برای مثال کتابخانه های [لودش](https://lodash.com/) و [date-fns](https://date-fns.org/) که شاید اسم آنها را شنیده باشید.

## مثال: دنبال‌کننده ماوس  {#mouse-tracker-example}

اگر بخواهیم یک دنبال‌کننده ماوس را با استفاده از ترکیب‌ کردن اِی‌پی‌آی ها مستقیما درون یک کامپوننت پیاده‌سازی کنیم به صورت زیر می‌باشد
```vue
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

اما اگر بخواهیم از یک منطق در کامپوننت‌های زیادی استفاده کنیم چه؟ می‌توانیم منطق را به عنوان یک تابع ترکیب‌پذیر در یک فایل خارجی تعریف‌ کنیم
```js
// mouse.js
import { ref, onMounted, onUnmounted } from 'vue'

// by convention, composable function names start with "use"
export function useMouse() {
  // state encapsulated and managed by the composable
  const x = ref(0)
  const y = ref(0)

  // a composable can update its managed state over time.
  function update(event) {
    x.value = event.pageX
    y.value = event.pageY
  }

  // a composable can also hook into its owner component's
  // lifecycle to setup and teardown side effects.
  onMounted(() => window.addEventListener('mousemove', update))
  onUnmounted(() => window.removeEventListener('mousemove', update))

  // expose managed state as return value
  return { x, y }
}
```

کد زیر روش استفاده از آن در کامپوننت‌  را نشان می‌دهد
```vue
<script setup>
import { useMouse } from './mouse.js'

const { x, y } = useMouse()
</script>

<template>Mouse position is at: {{ x }}, {{ y }}</template>
```
[آن را در payground امتحان کنید](https://play.vuejs.org/#eNqNkj1rwzAQhv/KocUOGKVzSAIdurVjoQUvJj4XlfgkJNmxMfrvPcmJkkKHLrbu69H7SlrEszFyHFDsxN6drDIeHPrBHGtSvdHWwwKDwzfNHwjQWd1DIbd9jOW3K2qq6aTJxb6pgpl7Dnmg3NS0365YBnLgsTfnxiNHACvUaKe80gTKQeN3sDAIQqjignEhIvKYqMRta1acFVrsKtDEQPLYxuU7cV8Msmg2mdTilIa6gU5p27tYWKKq1c3ENphaPrGFW25+yMXsHWFaFlfiiOSvFIBJjs15QJ5JeWmaL/xYS/Mfpc9YYrPxl52ULOpwhIuiVl9k07Yvsf9VOY+EtizSWfR6xKK6itgkvQ/+fyNs6v4XJXIsPwVL+WprCiL8AEUxw5s=)


همانطور که می‌بینیم، منطق اصلی تغییر نمی‌کند و ما فقط باید آن را به یک فایل خارجی منتقل کنیم و به جاهایی که باید، ارجاع دهیم. دقیقا  مانند استفاده از ویژگی ترکیب پذیری در توابع ای پی آی های ترکیب پذیر. حالا می‌توان از تابع ()useMouse باعملکرد یکسان در هر کامپوننتی استفاده کرد.
 

نکته دیگر در مورد ترکیب پذیری این است که می‌توان آن را تو در تو کرد: یک تابع ترکیب پذیر میتواند یک یا چند تابع دیگر را فراخوانی کند. این ویژگی به ما کمک میکند تا با منطق‌های کوچک، یک منطق بزرگتر و پیچیده بنویسیم. مانند وقتی که برای نوشتن یک برنامه کامل، کامپوننت‌های مختلف را استفاده می‌کنیم. در حقیقت به همین دلیل تصمیم گرفتیم مجموعه API هایی که این الگو را امکان‌پذیر می‌کنند را ترکیب API بنامیم.

برای مثال، میتوانیم یک منطق برای اضافه و حذف کردن یک گوش دهنده رویداد DOM بنویسیم: 
```js
// event.js
import { onMounted, onUnmounted } from 'vue'

export function useEventListener(target, event, callback) {
  // if you want, you can also make this
  // support selector strings as target
  onMounted(() => target.addEventListener(event, callback))
  onUnmounted(() => target.removeEventListener(event, callback))
}
```
حالا تابع `()useMethod` را می‌توان به صورت زیر ساده کرد: 
```js{3,9-12}
// mouse.js
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


در هر کامپوننت که تابع `()useMouse` صدا زده می‌شود،  یک کپی از متغیر های x و y ایجاد می‌کند تا با یکدیگر تداخل نداشته باشند. برای یادگیری مدیریت متغیرهای مشترک بین کامپوننت‌ها می‌نوانید فصل  [مدیریت stateها](/guide/scaling-up/state-management) را بخوانید. 


## مثال از stateهای غیر همگام (#async-state-example)


تابع ترکیب پذیر `()useMouse` آرگومانی نمیگیرد، پس بیایید نگاهی به مثالی دیگر برای ساختن یک تابع با یک آرگومان ورودی داشته باشیم. هنگام واکشی اطلاعات غیرهمگام اکثرا نیاز داریم حالت های متفاوت را هماهنگ کنیم: بارگذاری، موفقیت و خطا. 

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

ممکن است خسته کننده باشد اما این الگو در همه کامپوننت‌هایی که نیاز به واکشی اطلاعات دارند باید تکرار شود. بیایید آن را در یک تابع ترکیب پذیر درست کنیم:

```js
// fetch.js
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


حالا فقط لازم است در هر کامپوننت کد زیر را بزنیم:
```vue
<script setup>
import { useFetch } from './fetch.js'

const { data, error } = useFetch('...')
</script>
```


## قبول کردن state های واکنش پذیر {#accepting-reactive-state} 

تابع `()useFetch` یک آدرس استرینگی به عنوان ورودی میگیرد، بعد یک‌بار آن را واکشی می‌کند. در این صورت کار خود را کرده انجام داده است. ولی اگر بخواهیم هربار که ULR عوض شود واکشی دوباره انجام شود چه؟ برای رسیدن به این هدف، باید حالت واکنشی را به داخل تابع ترکیب‌پذیر پاس دهیم و بگذاریم ترکیب پذیری بیننده هایی برای انجام کارهایی با استفاده از حالت پاس داده شده ایجاد کند 

برای مثال تابع `()useFetch` باید بتواند یک `ref` را قبول کند:   

```js
const url = ref('/initial-url')

const { data, error } = useFetch(url)

// this should trigger a re-fetch
url.value = '/new-url'
```
یا یک تابع دریافت کننده (getter) را قبول کند:

```js
// re-fetch when props.id changes
const { data, error } = useFetch(() => `/posts/${props.id}`)
```
میتوانیم مثال پیاده‌سازی شده خود را با API های [`toValue()`](/api/reactivity-utilities.html#tovalue) و [`watchEffect()`](/api/reactivity-core.html#watcheffect) بازنویسی کنیم:

```js{8,13}
// fetch.js
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

تابع `()toValue` یک API است که در ورژن ۳.۳ اضافه شده که برای عادی سازی ref ها یا دریافت کننده ها طراحی شده: اگر آرگومان یک ref باشد، مقدار ref برگردانده می‌شود، اگر آرگومان یک تابع باشد، تابع را صدا می‌زند و مقدار بازگشتی آن را برمی‌گرداند؛ در غیر این صورت، آرگومان را همانطور که هست برمیگرداند. به طور مشابه `()unref` اما با عملکرد مخصوص برای تابع‌ها.
توجه داشته باشید که `()toValue` درون تابع بازگشتی `watchEffect` فراخوانده می‌شود. این تضمین می‌کند که وابستگی های واکنشی که در طول اجرای `()toValue` به آن دسترسی پیدا می‌کند توسط بیننده دنبال میشوند.
 این نسخه از `()useEffect` رشته های URL ایستا، refs، و تابع های دریافت کننده را قبول می‌کند. این ویژگی آن را انعطاف پذیرتر می کند؛ بیننده بلافاصله اجرا می شود و وابستگی هایی که در طول `()toValue` به آنها دسترسی پیدا کرده را ردیابی میکند، اگر هیچ وابستگی دنبال نشود ،مثلا آدرس همان موقع هم یک رشته باشد، تاثیر (effect) فقط یکبار اجرا میشود؛ درغیر این صورت هربار که وابستگی دنبال شده تغییر کند دوباره اجرا می شود.
 
 اینجا [مسخه به روز رسانی شده از`()useFetch`](https://play.vuejs.org/#eNp9Vdtu40YM/RVWL1ZQr5RF0JfAMXpLgRZtd5Fu90kvY4mKJ5FnhLnYMQz/+5IcSZF3g30IbPNyyHPIYU7ZL31f7CNmt9nK1073ATyG2K8ro3e9dQFO4LBdQm13fQzYwBlaZ3ewoKTFLCh6/ANDvZ38RTmaiidPkZWprfEBNsrj/66DO1hsQ+j9bVk+eWv6TtW4tV2DrgjHXte2wYKKlsE21pcEkNJ1Q5nUUb54v7gajVHwxhbz/Aru1lOhHymn2KsuIsWPGSdoVFBLQOeso57vJgI5gc0CHQZ3JHfCPFUGJjimQH1dGt6T5VyZVZnUJB3pR8Ad8QtIvwD+tqqB3gqXWzasNjEEa2D/rrXurso0aAM/VRn8XHe6fmYLk9ZVtj6dQMP5vCpTiqBXYdXoPWXrlkKFEEUyMEH36w+29z/AvfBEIhVNQIfNLRCWBBc79F49ouDy4CVx6GlqQXQg3Af+nNWn0JLKp2+pD+w8pmZYY8r5nT6gI9pcdtU7ZB7sSyXp95sYa1ZKm8eiKEb/qpykzJbZbMFofy/39aDIcd+2WIclBPtZ5nO5u5XBF0lpo6mDJrYXO5CGnbZAmk17Z2LH+zF60gJ95eK/WQO58kdTz1cIoCwphZ4a+EBsYIM0e4SWqwvlFMV1p91i+GROc/vWPoe23R4hbFEeRwrlLrbOGht9dwRvQYeFh+BU/UwPW3lQE0CDPZqG9uUIm+MFFyE4sifspOzdqPHwfF674eczcBZk5YJuda1VR0U6dQTqVpmGxpJWl+ULAOqgdICgd2jjUJTNBBANa30FB911/DyjM8KTrANP3SZmim38QIbSlsLcQfukS4oVlA1nM5DI8E77gUAYb4AngqkjmRCTFLZ8KAT9YlApkrJoMa0ZFTtDzTJCjsNqfTtJHCL54yxHCEaGXx0sOTKVeUPPykzrPKmX6g1IBg/wkZ4B6ZDnw6IsyflE051vKC3npwHgYnPp3rWQ/6PCtkiDI+8aroubGS0uJsAjeabPb/oyhEvm3I+cp3zxkBZBfi2uXlMHWZZwc30tVhbnTBcgeJpQqx9FaLoBgl5l/J9Ad+g+9KyDrzK6dsNIM9V19vCX2IKLuBzt9Rbr5zfsT/6FbVX2kd+r22OVTb6g3COG5L7/7198oe+Tc2eb2FH0d5wPLFLkHlPYr9E01PYsTrr9Uy4bnYVP/v4loPEjKW5U5JD4KqO79tt3qL+2e1PcSB6reP4CbzCltA==), با تاخیر مصنوعی و خطای تصادفی برای اهداف نسخه ی نمایشی است.


## قرارداد ها و بهترین شیوه‌ها {#conventions-and-best-practices}


### نام‌گذاری (#naming)

این یک قرارداد است که تابع های ترکیب پذیر به صورت camelCase و با کلمه use شروع شوند.


### آرگومان های ورودی {#input-arguments}

ک ترکیب پذیر می تواند آرگومان های ref یا دریافت کننده را قبول کند، حتی اگر برای واکنش پذیری به انها نیازی نداشته باشذ، اگر در حال نوشتن یک ترکیب پذیر هستید که ممکن است توسط توسعه دهندگان دیگر استفاده شود، ایده خوبی است که به جای مقادیر خام، آرگومان های ورودی refs یا دریافت کننده باشند. تابع [`()toValue`](/api/reactivity-utilities#tovalue) با هدف زیر مغید خواهد بود: 

```js
import { toValue } from 'vue'

function useFeature(maybeRefOrGetter) {
  // If maybeRefOrGetter is a ref or a getter,
  // its normalized value will be returned.
  // Otherwise, it is returned as-is.
  const value = toValue(maybeRefOrGetter)
}
```
اگر ترکیب پذیر شما موقعی که یک ref دریافت کننده میگیرد effect ای واکنشی ایجاد می‌کند، مطمئن شوید که ref/دریافت‌کننده را به طور واضح با `()watch` می بینید. همچنین `()toValue` را درون `()watchEffect` صدا بزنید تا به درستی ردیابی شود.

پیاده‌سازی [useFetch() implementation discussed earlier](#accepting-reactive-state) که قبلاً مورد بحث قرار گرفت، یک مثال واضح از یک ترکیب پذیر ارائه می‌کند که ref، دریافت‌کننده و مقادیر ساده را به عنوان آرگومان ورودی قبول می‌کند.



### مقادیر بازگشتی

احتمالاً توجه کرده اید که ما به جای `()reactive` در ترکیب پذیر ها به طور انحصاری از `()ref` استفاده کرده ایم. قرارداد پیشنهادی این است که ترکیب پذیرها همیشه یک شی ساده و غیرواکنشی حاوی چندین ref را برمی گرداند. این عملکرد اجازه می دهد تا در اجزای سازنده با حفظ واکنش پذیری تجزیه شود:
```js
// x and y are refs
const { x, y } = useMouse()
```
برگرداندن یک شی واکنش‌پذیر از یک ترکیب‌پذیر باعث می‌شود که چنین ساختارهایی ارتباط واکنش‌پذیری را با فضای داخل ترکیب پذیری را از دست بدهد در حالی که ref میتواند ارتباط را حفظ کند.

:اگر ترجیح میدهید از این حالت بازگشتی تابع های ترکیب پذیر به عنوان  ویژگی های شی استفاده کنید، می توانید  شی برگشتی را با `()reactive` پیش ببرید تا ref ها قابل دسترسی شوند، برای مثال:

```js
const mouse = reactive(useMouse())
// mouse.x is linked to original ref
console.log(mouse.x)
```

```vue-html
Mouse position is at: {{ mouse.x }}, {{ mouse.y }}
```

### تاثیرات (effect) جانبی {#side-effects}

افزودن تاثیرات جانبی؛ مانند رویدادهای گوش دهنده DOM یا واکشی داده ایرادی ندارد اما باید قوانین زیر را مد نظر داشت:


- اگر روی برنامه‌ای کار می‌کنید که از [پردازش‌گر سمت سرور](/guide/scaling-up/ssr) (SSR) استفاده می کند، مطمئن شوید که effectهای جانبی خاص DOM در چرخه هوک های نصب شده انجام می شوند. مثلا `()onUnmounted`. ین هوک هافقط در مرورگر فراخوانی می شوند، پس می توان مطمئن باشید که کدهای آن به DOM دسترسی دارند.

- به یاد داشته باشید که effectهای جانبی را در `()onUnmounted` حذف کنید، برای مثال اگر یک ترکیب پذیر، یک شنونده رویداد DOM را راه اندازی کند، باید آن شنونده را در ()onUnmounted حذف کند. همانطور که در مثال ()useMouse دیدیم؛ یک ایده خوب این است که از ترکیب پذیری استفاده کنیم که به طور خودکار این کار را انجام دهد. مثلا `()useEventListener`


## محدودیت در استفاده {#usage-restrictions}

 پذیرها ترکیب‌ها فقط باید در `<script setup>`  یا هوک ()setup به صورت همزمان صدا زده شوند. در بعضی موارد می‌توان در چرخه هوک هایی مانند `()onMounted` نیز فراخوانی شوند.
 
 این محدودیت‌ها مهم هستند. زیرا با این مضمون vuo می‌تواند تشخیص دهد کدام یک از کامپوننت‌های فعلی، فعال هستند. دسترسی به یک نمونه از کامپوننت های فعال، به دلایل زیر ضروری است:
 
۱. امکان ثبت چرخه زندگی یک هوک

۲. ویژگی ها و بیننده‌های نصب شده را می‌توان به آن پیوند کرد. به طوری که بعدا میتوان هنگام جدا کردن یک مورد، برای جلوگیری از نشت حافظه آن را دور انداخت



تنها جایی که می‌توانید ترکیب پذیرهارا بعد از کلمه `await` صدا بزنید `<script setup>` است.  کامپایلر بعد از اجرای موارد `async`، محتوای موارد فعال را بازیابی می‌کند.

## استفاده ترکیب پذیرها برای سازماندهی کد

ترکیب پذیرها نه فقط برای استفاده دوباره، بلکه برای سازماندهی کردن کد نیز می‌توانند استفاده شوند. به نسبت افزایش پیچیدگی کامپوننت‌ها، ممکن است با کامپوننت‌هایی مواجه شوید که برای پیمایش و استدلال بسیار بزرگ هستند، ترکیب بندی API به شما انعطاف پذیری کاملی را می‌دهد تا کد کامپوننت خود را بر اساس منطق های مرتبط سازماندهی کنید:
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

تا حدودی می توان این ترکیب پذیرهای نوشته شده را به عنوان سرویس هایی با کامپوننت‌های مشخص‌شده‌ای در نظر گرفت که می‌توانند با یکدیگر تعامل کنند:


## استفاده از ترکیب پذیری در option API

اگر از option API استفاده میکنید، ترکیب پذیرها باید درون `()setup` صدا زده شوند و پیوند برگردانده شده نیز باید از `()setup` باشد. پس به صورت this و با الگوی زیر نشان داده می‌شود: 
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
    // setup() exposed properties can be accessed on `this`
    console.log(this.x)
  }
  // ...other options
}
```


## مقایسه با سایر تکنیک‌ها


### در مقابل میکسین

کاربرانی که از نسخه ۲ می‌آیند ممکن است با آپشن میکسین آشنا باشند که همچنین به ما امکان می‌دهد که منطق کامپوننت را در واحد هایی با قابلیت استفاده مجدد بنویسیم. سه اشکال اصلی برای میکسین وجود دارد:  

۱. منبع نامشخص برای پراپرتی‌ها: هنگام استفاده از بسیاری از میکسین‌ها، مشخص نمی‌شود که کدام نوع پراپرتی توسط کدام mixin تزریق می‌شود و ردیابی پیاده‌سازی و درک رفتار کامپوننت را دشوار می‌کند.  همچنین به همین دلیل است که ما استفاده از الگوی ساختار + refs را برای ترکیب‌پذیرها توصیه می‌کنیم: این موضوع منبع پراپرتی را در کامپوننت‌های استفاده کتتده مشخص می‌کند.

۲. تلاقی فضای نام‌ها: چندین میکسن از نویسندگان مختلف به طور بالقوه می توانند کلیدهای پراپرتی یکسانی را ثبت کنند و باعث برخورد فضای نام شوند، اما هنگام استفاده از ترکیب پذیرها، اگر کلیدهای متناقض از ترکیب پذیرهای مختلف وجود داشته باشد، می‌توان نام متغیرهای تخریب شده را تغغیر داد.

۳. ارتباط بی قید و شرط ترکیب‌های مقابل: چندین میکسین که نیاز به تعامل با یکدیگر دارند، باید به کلیدهای پراپرتی مشترک تکیه کنند و آنها را بدون شرط جفت می کند. با استفاده از ترکیب پذیرها می‌توان مقادیر بازگشتی یک ترکیب پذیر را به عنوان آرگومان به دیگری ارسال کرد. درست مانند توابع عادی

 به دلایل بالا، استفاده از میکسین ها را از این به‌بعد در Vue ۳ توصیه نمی‌کنیم؛ این ویژگی فقط به دلایل آشنایی و مهاجرت نگه‌داری می‌شود.


### در مقابل کامپوننت‌های بدون رندر {#vs-renderless-components}

در فصل شکاف‌های (slots) کامپوننت، الگوی [کامپوننت بدون رندر](/guide/components/slots#renderless-components) را بر اساس شکاف‌های محدوده مورد بحث قرار دادیم. حتی همان نسخه نمایشی ردیابی ماوس را با استفاده از اجزای رندر اجرا کردیم.

مزیت اصلی ترکیب‌ها ها نسبت به کامپوننت های بدون رندر این است که ترکیب پذیر ها هزینه های اضافی را متحمل نمی شوند. هنگامی که در همه یک برنامه کاربردی استفاده می شود، تعداد نمونه های اضافی ایجاد شده توسط الگوی کامپوننت بدون رندر می تواند به یک سربار عملکرد قابل توجه تبدیل شود.


توصیه این است که هنگام استفاده مجدد از منطق خالص، از ترکیب پذیری استفاده کنید، و هنگام استفاده مجدد از منطق و طرح بصری، از کامپوننت ها.

### در مقابل هوک های ری‌اکت

اگر تجربه کار با ری‌اکت داشته باشید، ممکن است متوجه شوید که این بسیار شبیه به هوک‌های سفارشی ری‌اکت است. API ترکیبی تا حدی از هوک های ری اکت الهام گرفته شده است و ترکیب‌پذیرهای Vue در واقع از نظر قابلیت‌های ترکیب منطقی شبیه به هوک های ری‌اکت هستند. با این حال، ترکیب‌پذیرهای Vue مبتنی بر سیستم واکنش‌پذیری ریز دانه Vue هستند که اساساً با نوع اجرای هوک‌های ری‌اکت تفاوت دارد. که با جزئیات بیشتر در [سوالات متداول از APIهای ترکیب پذیر](/guide/extras/composition-api-faq#comparison-with-react-hooks) مورد بحث قرار گرفته است.


## مطالعه بیشتر {#further-reading}

- برای درک نحوه عملکرد سیستم واکنش پذیری Vuo در سطح پایین‌تر: [واکنشی در عمق](/guide/extras/reactivity-in-depth)
- برای الگوهای مدیریت state که توسط چندین کامپوننت مشترک هستند: [مدیریت state ها](/guide/scaling-up/state-management)
- نکاتی در مورد تست واحدهای ترکیب پذیر: [تست ترکیب پذیر ها](/guide/scaling-up/testing#testing-composables)
- یک مجموعه با به روز رسانی مداوم از ترکیب پذیری در Vuo؛ کد منبع نیز یک منبع یادگیری عالی است: [استفاده از Vuo](https://vueuse.org/)
