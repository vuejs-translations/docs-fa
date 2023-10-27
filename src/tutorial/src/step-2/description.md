# رندرینگ صریح {#declarative-rendering}

<div class="sfc">

آنچه در ادیتور می‌بینید یک Single-File Component (SFC) است. یک SFC یک بلوک کد خودمختار و قابل استفاده مجدد است که CSS، HTML و JavaScript مرتبط به هم را در یک فایل `‎.vue` کپسوله می‌کند.

</div>

ویژگی اصلی Vue **رندرینگ صریح** است: با استفاده از ساختار تمپلیت که HTML را توسعه می‌دهد، می‌توانیم توصیف کنیم که HTML باید بر اساس state فعلی JavaScript چگونه به نظر برسد. هنگامی که state تغییر می‌کند، HTML به صورت خودکار به‌روزرسانی می‌شود.

<div class="composition-api">

state هایی که هنگام تغییر می‌توانند باعث به‌روزرسانی شوند، واکنش‌پذیر (reactive) در نظر گرفته می‌شوند. می‌توانیم state های واکنش‌پذیر را با استفاده از API مربوط به آن یعنی `reactive()‎` در Vue اعلام کنیم. شیءهای ساخته شده از `reactive()‎` شیءهای [Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) در JavaScript هستند که دقیقا مثل شیءهای عادی کار می‌کنند:

```js
import { reactive } from 'vue'‎

const counter = reactive({‎
  count: 0
‎})‎

console.log(counter.count) // 0
counter.count++‎
```

`reactive()‎` فقط روی شیءها (شامل آرایه‌ها و انواع داخلی مثل `Map` و `Set`) کار می‌کند. از طرف دیگر، `ref()‎` می‌تواند هر نوع مقداری را بگیرد و یک شیء ایجاد کند که مقدار داخلی را تحت یک پراپرتی `‎.value` عرضه می‌کند:

```js
import { ref } from 'vue'‎

const message = ref('Hello World!')

console.log(message.value) // "Hello World!"‎
message.value = 'Changed'‎
```

جزئیات `reactive()‎` و `ref()‎` در <a target="_blank" href="/guide/essentials/reactivity-fundamentals.html">راهنما - مبانی واکنش‌پذیری</a> گفته شده است.

<div class="sfc">

state های reactive اعلام شده در بلوک `<script setup>` کامپوننت می‌توانند به صورت مستقیم در تمپلیت استفاده شوند. اینجا چگونگی رندرینگ متن پویا بر اساس مقدار شیء `counter` و `message` که ref است را با استفاده از سینتکس mustache مشاهده کنید:

</div>

<div class="html">

شیءی که به `createApp()‎` پاس داده می‌شود یک کامپوننت Vue است. state یک کامپوننت باید داخل تابع `setup()‎` آن اعلام شود و با استفاده از یک شیء برگردانده شود:

```js{2,5}
setup() {‎
  const counter = reactive({ count: 0 })
  const message = ref('Hello World!')
  return {‎
    counter,‎
    message
  ‎}‎ 
‎}‎
```

پراپرتی‌های شیء برگردانده شده در تمپلیت در دسترس خواهند بود. این نحوه رندر متن بصورت پویا بر اساس مقدار `message` با استفاده از سینتکس mustache است:

</div>

```vue-html
<h1>{{ message }}</h1>
<p>count is: {{ counter.count }}</p>
```

توجه کنید که نیازی به استفاده از `‎.value` هنگام دسترسی به `message` که ref است در تمپلیت‌ها نیست: به طور خودکار برای کوتاه‌سازی تبدیل می‌شود.

</div>

<div class="options-api">

state هایی که هنگام تغییر می‌توانند باعث به‌روزرسانی شوند، در Vue **واکنش‌پذیر (reactive)** در نظر گرفته می‌شوند. در Vue ما، state های واکنش‌پذیر را در کامپوننت‌ها نگهداری می‌‌کنیم. <span class="html">در کد مثال، شیءی که به `createApp()‎` پاس داده می‌شود یک کامپوننت است.</span>

می‌توانیم state های واکنش‌پذیر را با استفاده از گزینه `data` کامپوننت که باید یک تابع باشد که یک شیء را برمی‌گرداند، اعلام کنیم:

<div class="sfc">

```js{3-5}
export default {‎
  data() {‎ 
    return {‎   
      message: 'Hello World!'‎      
    ‎}‎    
  ‎}‎  
‎}‎
```

</div>
<div class="html">

```js{3-5}
createApp({‎
  data() {‎  
    return {‎    
      message: 'Hello World!'‎      
    ‎}‎    
  ‎}‎  
‎})‎
```

</div>

خاصیت `message` در تمپلیت در دسترس خواهد بود. این چگونگی رندر متن بصورت پویا بر اساس مقدار `message` با استفاده از سینتکس mustache است:

```vue-html
<h1>{{ message }}</h1>
```

</div>

محتوای داخل mustache محدود به identifier یا path نیست - می‌توانیم از هر عبارت JavaScript معتبری استفاده کنیم:

```vue-html
<h1>{{ message.split('').reverse().join('') }}</h1>
```

<div class="composition-api">

حالا سعی کنید خودتان چند state واکنش‌پذیر ایجاد کنید و از آن‌ها برای رندر محتوای متنی بصورت پویا برای `<h1>` در تمپلیت استفاده کنید.

</div>

<div class="options-api">

حالا سعی کنید خودتان یک خاصیت data ایجاد کنید و از آن به عنوان محتوای متنی برای `<h1>` در تمپلیت استفاده کنید.

</div>
