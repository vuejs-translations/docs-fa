---
outline: deep
---

<script setup>
import SpreadSheet from './demos/SpreadSheet.vue'
</script>

# واکنش‌پذیری به تفضیل | Reactivity in Depth {#reactivity-in-depth}

یکی از ویژگی‌های بارز Vue سیستم واکنش‌پذیری نامحسوس آن است. state کامپوننت‌ها از شی‌های جاوااسکریپت واکنش‌پذیر (reactive) تشکیل شده است. وقتی شما آن‌ها را تغییر می‌دهید، view به‌روزرسانی می‌شود. این امر مدیریت state را ساده و شهودی می‌کند، اما درک نحوه کار آن برای اجتناب از برخی مشکلات رایج نیز مهم است. در این بخش قصد داریم به برخی از جزئیات سطح پایین‌تر سیستم واکنش‌پذیری Vue بپردازیم.

## واکنش‌پذیری چیست؟ {#what-is-reactivity}

این اصطلاح امروزه در برنامه‌نویسی کاربرد زیادی دارد، اما منظور از آن چیست؟ واکنش‌پذیری یک پارادایم برنامه‌نویسی است که به ما امکان می‌دهد به تغییرات به شیوه‌ای اعلانی واکنش نشان دهیم. مثال کلاسیکی که معمولاً نشان داده می‌شود چون خیلی خوب است، جداول اکسل است:

<SpreadSheet />

در اینجا سلول A2 از طریق فرمول `‎= A0 + A1` تعریف شده است (می‌توانید روی A2 کلیک کنید تا فرمول را مشاهده یا ویرایش کنید)، بنابراین جدول نتیجه 3 را نشان می‌دهد. تا اینجا هیچ شگفتی نیست. اما اگر A0 یا A1 را تغییر دهید، متوجه می‌شوید که A2 نیز به طور خودکار به‌روزرسانی می‌شود.

جاوااسکریپت معمولاً به این شیوه کار نمی‌کند. اگر بخواهیم چیزی مشابه در جاوااسکریپت بنویسیم:

```js
let A0 = 1
let A1 = 2
let A2 = A0 + A1

console.log(A2) // 3

A0 = 2
console.log(A2) // همچنان 3
```

وقتی `A0` را تغییر می‌دهیم، `A2` به طور خودکار تغییر نمی‌کند.

پس چگونه می‌توانیم این کار را در جاوااسکریپت انجام دهیم؟ ابتدا برای اجرای مجدد کدی که `A2` را به‌روز می‌کند، آن را درون تابعی قرار می‌دهیم:

```js
let A2

function update() {
  A2 = A0 + A1
}
```

سپس باید چند اصطلاح را تعریف کنیم:

- تابع `update()‎` یک **افکت جانبی (side effect)** یا به اختصار **افکت (effect)** تولید می‌کند، چون وضعیت برنامه را تغییر می‌دهد.

- `A0` و `A1` به عنوان **وابستگی‌های**  این افکت در نظر گرفته می‌شوند، زیرا مقادیر آنها برای اعمال افکت استفاده می‌شود. گفته می‌شود افکت  **دنباله‌رو** وابستگی‌های خود است.

آنچه نیاز داریم تابع جادویی است که بتواند هرزمان `A0` یا `A1` (**وابستگی‌ها**) تغییر کنند، `update()‎` (**افکت**) را فراخوانی کند:

```js
whenDepsChange(update)
```

تابع `whenDepsChange()‎` وظایف زیر را دارد:

1. ردیابی زمانی که یک متغیر خوانده می‌شود. مثلاً هنگام ارزیابی عبارت `A0 + A1`، هر دو `A0` و `A1` خوانده می‌شوند.

2. اگر زمانی که یک افکت در حال اجرا وجود دارد یک متغیر خوانده شود، آن افکت را دنباله‌رو آن متغیر کند.مثلاً چون `A0` و `A1` هنگام اجرای تابع `update()‎` خوانده می‌شوند، پس از اولین فراخوانی، تابع `update()‎` به عنوان دنباله‌رو هر دو `A0` و `A1` ثبت می‌شود.

3. تشخیص زمانی که یک متغیر تغییر می‌کند. مثلاً وقتی `A0` مقداری جدید می‌گیرد، همه افکت‌های دنباله‌رو آن را برای اجرای مجدد صدا می‌زند.

## واکنش‌پذیری در Vue چگونه کار می‌کند؟ {#how-reactivity-works-in-vue}

در واقع نمی‌توانیم مانند مثال بالا متغیرهای محلی را ردیابی کنیم. در جاوااسکریپت ساده هیچ مکانیزمی برای انجام این کار وجود ندارد. اما آنچه **می‌توانیم** انجام دهیم رهگیری خواندن و نوشتن **خواص شیء** است.

دو روش برای رهگیری دسترسی به خاصیت در جاوااسکریپت وجود دارد: آنها [getter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get)/[setters](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/set) و [Proxies](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) هستند. Vue 2 به دلیل محدودیت‌های پشتیبانی مرورگرها فقط از getter / setters استفاده می‌کرد. در Vue 3 از پراکسی برای شی‌های واکنش‌پذیر (reactive objects) و از getter / setters برای رف‌ها (ref) استفاده می‌شود. شبه‌کد زیر نحوه کار آن‌ها را نشان می‌دهد:

```js{4,9,17,22}
function reactive(obj) {
  return new Proxy(obj, {
    get(target, key) {
      track(target, key)
      return target[key]
    },
    set(target, key, value) {
      target[key] = value
      trigger(target, key)
    }
  })
}

function ref(value) {
  const refObject = {
    get value() {
      track(refObject, 'value')
      return value
    },
    set value(newValue) {
      value = newValue
      trigger(refObject, 'value')
    }
  }
  return refObject
}
```

:::tip نکته
قطعات کد اینجا و پایین‌تر برای توضیح مفاهیم اصلی به ساده‌ترین شکل ممکن هستند، بنابراین بسیاری از جزئیات حذف شده‌اند و موارد حاشیه‌ای نادیده گرفته شده‌اند.
:::

این موارد چند [محدودیت شی‌های واکنش‌پذیر](/guide/essentials/reactivity-fundamentals#limitations-of-reactive) را توضیح می‌دهد که در بخش مبانی به آن‌ها پرداخته‌ایم:

- وقتی شما یک خاصیت از یک شیء واکنش‌پذیر را به یک متغیر محلی نسبت می‌دهید، آن متغیر جدید غیرواکنش‌پذیر است زیرا دیگر تله‌های get / set را روی شیء اصلی فعال را نمی‌کند (در اینجا تله به معنای مکانیزمی است که عملیات روی یک شیء پراکسی را شنود می‌کند.) توجه داشته باشید این "قطع ارتباط" فقط متغیری که خاصیت به آن نسبت داده شده است را تحت تاثیر قرار می‌دهد. اگر متغیر به یک مقدار غیراولیه مانند یک شیء اشاره کند، شیء همچنان واکنش‌پذیر خواهد بود.

- پراکسی برگشت‌داده شده از `reactive()‎`, اگرچه دقیقا مانند اصلی رفتار می‌کند، اگر آن را با اصلی با استفاده از عملگر `===` مقایسه کنیم هویت متفاوتی دارد.

درون `track()‎`, بررسی می‌کنیم که آیا افکت فعالی در حال اجراست یا خیر. اگر افکتی وجود داشته باشد، افکت‌های دنباله‌رو (که در یک Set ذخیره شده‌اند) را برای ویژگی مورد ردیابی برسی می کنیم و افکت را به آن Set اضافه می‌کنیم:

```js
// این مقدار درست قبل از اجرای افکت تنظیم می‌شود
// بعدا به آن می‌پردازیم
let activeEffect

function track(target, key) {
  if (activeEffect) {
    const effects = getSubscribersForProperty(target, key)
    effects.add(activeEffect)
  }
}
```

دنباله‌رو‌های افکت (effect) در یک ساختار داده `WeakMap<target, Map<key, Set<effect>>>‎` سراسری ذخیره می‌شوند. اگر هیچ Set ای برای افکت‌های دنباله‌رو‌ برای یک خاصیت پیدا نشد (برای اولین بار ردیابی شد)، یک نمونه ایجاد خواهد شد. تابع `getSubscribersForProperty()‎` دقیقا همین کار را انجام می‌دهد. به خاطر سادگی، از جزئیات آن صرف‌نظر می‌کنیم.

در داخل `trigger()‎`، دوباره افکت‌های دنباله‌رو‌ برای آن خاصیت را جستجو می‌کنیم. اما این بار آن‌ها را فراخوانی می‌کنیم:

```js
function trigger(target, key) {
  const effects = getSubscribersForProperty(target, key)
  effects.forEach((effect) => effect())
}
```

اکنون برگردیم به تابع `whenDepsChange()‎`:

```js
function whenDepsChange(update) {
  const effect = () => {
    activeEffect = effect
    update()
    activeEffect = null
  }
  effect()
}
```

آن تابع خام `update` را در یک افکت گذاشته است که قبل از اجرای به‌روزرسانی واقعی خودش را به عنوان افکت فعال جاری تنظیم می‌کند. این امر به `track()‎` اجازه می‌دهد تا افکت فعال جاری را حین به‌روزرسانی پیدا کند.

در این نقطه، افکتی ایجاد کرده‌ایم که به طور خودکار وابستگی‌های خود را ردیابی می‌کند و هر بار که وابستگی تغییر کند، مجددا اجرا می‌شود. به این **افکت واکنش‌پذیر** می‌گوییم.

Vue برای ما API ‌ای را فراهم می‌کند که به شما اجازه می‌دهد افکت‌های واکنش‌پذیر ایجاد کنید: [`watchEffect()‎`](/api/reactivity-core#watcheffect). در واقع، شما شاید متوجه شده باشید که آن خیلی شبیه به تابع جادویی `whenDepsChange()‎` در مثال عمل می‌کند. اکنون می‌توانیم مثال اصلی را با استفاده از API های واقعی Vue بازنویسی کنیم:

```js
import { ref, watchEffect } from 'vue'

const A0 = ref(0)
const A1 = ref(1)
const A2 = ref()

watchEffect(() => {
  // را ردیابی می‌کند A1 و A0
  A2.value = A0.value + A1.value
})

// افکت را فعال می‌کند
A0.value = 2
```

استفاده از یک افکت واکنش‌پذیر برای تغییردادن یک ref جالب‌ترین کاربرد ممکن نیست - در واقع، استفاده از یک کامپیوتد آن را اعلانی‌تر می‌کند:

```js
import { ref, computed } from 'vue'

const A0 = ref(0)
const A1 = ref(1)
const A2 = computed(() => A0.value + A1.value)

A0.value = 2
```

درونیاً، `computed` با استفاده از یک افکت واکنش‌پذیر، نامعتبرسازی و محاسبه مجدد خود را مدیریت می‌کند.

پس چه نمونه‌ای از افکت واکنش‌پذیر متداول و مفید وجود دارد؟ خوب، به‌روزرسانی DOM! می‌توانیم "رندرکردن واکنش‌پذیر" ساده‌ای مانند این پیاده‌سازی کنیم:

```js
import { ref, watchEffect } from 'vue'

const count = ref(0)

watchEffect(() => {
  document.body.innerHTML = `count is: ${count.value}`
})

// را بروز می‌کند DOM
count.value++
```

در واقع، این خیلی نزدیک به نحوه همگام‌سازی state و DOM توسط کامپوننت‌های Vue است - هر نمونه کامپوننت افکت واکنش‌پذیری ایجاد می‌کند تا DOM را رندر و به‌روزرسانی کند. البته، کامپوننت‌های Vue از راه‌های بسیار کارآمدتری برای به‌روزرسانی DOM نسبت به `innerHTML` استفاده می‌کنند. این موضوع در [مکانیسم رندرینگ](./rendering-mechanism) بحث شده است.

<div class="options-api">

The `ref()`, `computed()` and `watchEffect()` APIs are all part of the Composition API. If you have only been using Options API with Vue so far, you'll notice that Composition API is closer to how Vue's reactivity system works under the hood. In fact, in Vue 3 the Options API is implemented on top of the Composition API. All property access on the component instance (`this`) triggers getter / setters for reactivity tracking, and options like `watch` and `computed` invoke their Composition API equivalents internally.

</div>

## واکنش‌پذیری در زمان اجرا در برابر واکنش‌پذیری در زمان کامپایل {#runtime-vs-compile-time-reactivity}

سیستم واکنش‌پذیری Vue بر پایه زمان اجرا است (runtime-based): ردیابی و فعال‌سازی در حین اجرای کد مستقیماً در مرورگر انجام می‌شود. مزایای واکنش‌پذیری در زمان اجرا این است که می‌تواند بدون مرحله ساخت (build step) کار کند، و حالت‌های استثناء کمتری دارد. از سوی دیگر، این باعث می شود که توسط محدودیت های نحوی جاوا اسکریپت محدود شود، که منجر به نیاز به کانتینرهای مقدار مثل Vue refs می‌شود.

انتخاب برخی فریمورک‌ها، مثل [Svelte](https://svelte.dev/) برای غلبه بر چنین محدودیت‌هایی این است که واکنش‌پذیری را در طول کامپایل پیاده‌سازی کنند. آن‌ها کد را تجزیه و تحلیل و تبدیل می‌کنند تا واکنش‌پذیری را شبیه‌سازی کنند. مرحله کامپایل به فریمورک اجازه می‌دهد تا معنای (semantic) خود JavaScript را تغییر دهد - به عنوان مثال، کدی را تزریق کند که تجزیه و تحلیل وابستگی و فعال‌سازی افکت را در اطراف دسترسی به متغیرهای تعریف شده انجام دهد. معایب آن این است که چنین تبدیل‌هایی نیاز به یک مرحله ساخت دارند، و تغییر semantic زبان JavaScript در واقع ایجاد یک زبان است که شبیه JavaScript به نظر می‌رسد اما به چیز دیگری کامپایل می‌شود.

تیم Vue این مسیر را از طریق ویژگی آزمایشی به نام [Reactivity Transform](/guide/extras/reactivity-transform) بررسی کرده است، اما در نهایت تصمیم گرفته‌ایم به [دلایلی که اینجا آمده](https://github.com/vuejs/rfcs/discussions/369#discussioncomment-5059028) برای پروژه مناسب نیست.

## دیباگ کردن واکنش‌پذیری {#reactivity-debugging}

خیلی خوب است که سیستم واکنش‌پذیری Vue به صورت خودکار وابستگی‌ها را ردیابی می‌کند، اما در برخی موارد ممکن است بخواهیم دقیقاً مشخص کنیم چه چیزی در حال ردیابی است، یا چه چیزی باعث رندر مجدد یک کامپوننت می‌شود.

### هوک‌های دیباگ کامپوننت {#component-debugging-hooks}

ما می‌توانیم با استفاده از هوک‌های چرخه حیات <span class="options-api">`renderTracked`</span><span class="composition-api">`onRenderTracked`</span> و <span class="options-api">`renderTriggered`</span><span class="composition-api">`onRenderTriggered`</span> دیباگ کنیم که در طول رندر یک کامپوننت از چه وابستگی‌هایی استفاده می‌شود و کدام وابستگی باعث به‌روزرسانی می‌شود. هر دو هوک یک event دریافت می‌کنند که حاوی اطلاعاتی درباره وابستگی مورد نظر است. توصیه می‌شود برای بررسی تعاملی وابستگی، دستور `debugger` را در کالبک‌ها قرار دهید:

<div class="composition-api">

```vue
<script setup>
import { onRenderTracked, onRenderTriggered } from 'vue'

onRenderTracked((event) => {
  debugger
})

onRenderTriggered((event) => {
  debugger
})
</script>
```

</div>
<div class="options-api">

```js
export default {
  renderTracked(event) {
    debugger
  },
  renderTriggered(event) {
    debugger
  }
}
```

</div>

:::tip نکته
هوک‌های دیباگ کامپوننت فقط در حالت توسعه (development mode) کار می‌کنند.
:::

آبجکت‌های رویداد دیباگ از تایپ زیر هستند:

<span id="debugger-event"></span>

```ts
type DebuggerEvent = {
  effect: ReactiveEffect
  target: object
  type:
    | TrackOpTypes /* 'get' | 'has' | 'iterate' */
    | TriggerOpTypes /* 'set' | 'add' | 'delete' | 'clear' */
  key: any
  newValue?: any
  oldValue?: any
  oldTarget?: Map<any, any> | Set<any>
}
```

### دیباگ کردن کامپیوتد {#computed-debugging}

<!-- TODO options API equivalent -->

می‌توانیم کامپیوتدها را با پاس دادن آبجکت آپشن به پارامتر دوم `computed()‎` با توابع کالبک `onTrack` و `onTrigger` دیباگ کنیم:

- `onTrack` هنگامی فراخوانی می‌شود که یک ویژگی واکنش‌پذیر یا یک ref به عنوان یک وابستگی ردیابی شود.
- `onTrigger` هنگامی فراخوانی می‌شود که کالبک watcher توسط تغییر یک وابستگی فعال شود.

هر دو کالبک رویدادهای دیباگر را در [فرمت مشابه](#debugger-event) به هوک‌های دیباگ کامپوننت دریافت می‌کنند:

```js
const plusOne = computed(() => count.value + 1, {
  onTrack(e) {
    // به عنوان وابستگی ردیابی می‌شود فراخوانی می‌شود count.value هنگامی که
    debugger
  },
  onTrigger(e) {
    // تغییر می‌کند فراخوانی می‌شود count.value هنگامی که
    debugger
  }
})

// را فراخوانی کند onTrack باید plusOne دسترسی به
console.log(plusOne.value)

// را فراخوانی کند onTrigger باید count.value تغییر
count.value++
```

:::tip نکته
آپشن‌های `onTrack` و `onTrigger` کامپیوتدها فقط در حالت توسعه (development mode) کار می‌کنند.
:::

### Watcher Debugging {#watcher-debugging}

<!-- TODO options API equivalent -->

مشابه `computed()‎`, واچرها نیز از گزینه‌های `onTrack` و `onTrigger` پشتیبانی می‌کنند:

```js
watch(source, callback, {
  onTrack(e) {
    debugger
  },
  onTrigger(e) {
    debugger
  }
})

watchEffect(callback, {
  onTrack(e) {
    debugger
  },
  onTrigger(e) {
    debugger
  }
})
```

:::tip
آپشن‌های `onTrack` و `onTrigger` واچر فقط در حالت توسعه (development mode) کار می‌کنند.
:::

## یکپارچه‌سازی با سیستم‌های مدیریت state خارجی {#integration-with-external-state-systems}

سیستم واکنش‌پذیری Vue با تبدیل عمیق اشیای ساده JavaScript به پراکسی‌های واکنش‌پذیر کار می‌کند. این تبدیل عمیق (deep conversion) ممکن است هنگام یکپارچه‌سازی با سیستم‌های مدیریت state خارجی (مثلا اگر سیستم مدیریت state خارجی هم از پراکسی‌ها برای مدیریت state استفاده کند) غیرضروری یا ناخواسته باشد.

ایده کلی یکپارچه‌سازی سیستم واکنش‌پذیری Vue با یک راه حل مدیریت state خارجی این است که state خارجی را در یک [`shallowRef`](/api/reactivity-advanced#shallowref) نگه داریم. یک shallow ref فقط هنگامی که به `‎.value` آن دسترسی شود واکنش‌پذیر است - مقدار داخلی بدون تغییر باقی می‌ماند. هنگامی که state خارجی تغییر کرد، مقدار ref را جایگزین کنید تا به‌روزرسانی‌ها را فعال کنید.

### Immutable Data {#immutable-data}

اگر شما در حال پیاده‌سازی یک ویژگی undo / redo برو هستید، احتمالا می‌خواهید از state برنامه در هر ویرایش کاربر یک نسخه تهیه کنید. با این حال، سیستم واکنش‌پذیری قابل تغییر Vue برای این کار مناسب نیست اگر درخت state بزرگ باشد، سریالایز کردن کل شی state در هر به‌روزرسانی می‌تواند از نظر هزینه‌های CPU و حافظه گران باشد.

[ساختارهای داده‌ای نامتغیر (immutable data structures)](https://en.wikipedia.org/wiki/Persistent_data_structure) این مشکل را با عدم تغییر state اشیا حل می‌کنند - به جای آن، اشیای جدیدی ایجاد می‌کنند که بخش‌های یکسان و بدون تغییر را با اشیای قدیمی به اشتراک می‌گذارند. راه‌های مختلفی برای استفاده از داده‌های نامتغیر در JavaScript وجود دارد، اما ما استفاده از [Immer](https://immerjs.github.io/immer/) را با Vue توصیه می‌کنیم زیرا اجازه می‌دهد از داده‌های نامتغیر استفاده کنید در حالی که سینتکس قابل تغییر راحت‌تر را حفظ می‌کند.

ما می‌توانیم Immer را با استفاده از یک composable ساده با Vue یکپارچه کنیم:

```js
import produce from 'immer'
import { shallowRef } from 'vue'

export function useImmer(baseState) {
  const state = shallowRef(baseState)
  const update = (updater) => {
    state.value = produce(state.value, updater)
  }

  return [state, update]
}
```

[امتحان این مورد در Playground](https://play.vuejs.org/#eNplU8Fu2zAM/RXOlzpAYu82zEu67lhgpw3bJcrBs5VYqywJkpxmMPzvoyjZNRodbJF84iOppzH7ZkxxHXhWZXvXWGE8OO4H88iU6I22HkYYHH/ue25hgrPVPTwUpQh28dc9MAXAVKOV83AUnvduC4Npa8+fg3GCw3I8PwbwGD64vPCSV8Cy77y2Cn4PnGXbFGu1wpC36EPHRO67c78cD6fgVfgOiOB9gnMtXczA1GnDFFPnQTVeaAVeXy6SSsyFavltE/OvKs+pGTg8zsxkHwl9KgIBtvbhzkl0yIWU+zIOFEeJBgKNxORoAewHSX/cSQHX3VnbA8vyMXa3pfqxb0i1CRXZWZb6w1U1snYOT40JvQ4+NVI0Lxi865NliTisMRHChOVSNaUUscCSKtyXq7LRdP6fDNvYPw3G85vftbzRtg6TrUAKxXe+s3q4dF/mQdC5bJtFTe362qB4tELVURKWAthhNc87+OhSw2V33htXleWgzMulaHQfFfj0ufhYfCpb4XySJHc9Zv7a63aQqKh0+xNRR8kiZ1K2sYhqeBI1xVHPi+xdV0upX3/w8yJ8fCiIYIrfCLPIaZH4n9rxnx7nlQQVH4YLHpTLW8YV8A0W1Ye4PO7sZiU/ylFca4mSP8yl5yvv/O4sZcSmw8/iW8bXdSTcjDiFgUz/AcH6WZQ=)

### State Machines {#state-machines}

[State Machine](https://en.wikipedia.org/wiki/Finite-state_machine) مدلی برای توصیف تمام حالت‌های ممکن است که یک برنامه می‌تواند در آن‌ها باشد، و تمام راه‌های ممکن برای انتقال از یک حالت به حالت دیگر است. در حالی که ممکن است برای کامپوننت‌های ساده افراطی باشد، می‌تواند به جریان‌های پیچیده حالت کمک کند تا مقاوم‌تر و قابل مدیریت‌تر شوند.

یکی از محبوب‌ترین پیاده‌سازی‌های ماشین حالت، [XState](https://xstate.js.org/) است. اینجا یک composable داریم که با آن یکپارچه شده:

```js
import { createMachine, interpret } from 'xstate'
import { shallowRef } from 'vue'

export function useMachine(options) {
  const machine = createMachine(options)
  const state = shallowRef(machine.initialState)
  const service = interpret(machine)
    .onTransition((newState) => (state.value = newState))
    .start()
  const send = (event) => service.send(event)

  return [state, send]
}
```

[امتحان این مورد در Playground](https://play.vuejs.org/#eNp1U81unDAQfpWRL7DSFqqqUiXEJumhyqVVpDa3ugcKZtcJjC1syEqId8/YBu/uIRcEM9/P/DGz71pn0yhYwUpTD1JbMMKO+o6j7LUaLMwwGvGrqk8SBSzQDqqHJMv7EMleTMIRgGOt0Fj4a2xlxZ5EsPkHhytuOjucbApIrDoeO5HsfQCllVVHUYlVbeW0xr2OKcCzHCwkKQAK3fP56fHx5w/irSyqbfFMgA+h0cKBHZYey45jmYfeqWv6sKLXHbnTF0D5f7RWITzUnaxfD5y5ztIkSCY7zjwKYJ5DyVlf2fokTMrZ5sbZDu6Bs6e25QwK94b0svgKyjwYkEyZR2e2Z2H8n/pK04wV0oL8KEjWJwxncTicnb23C3F2slabIs9H1K/HrFZ9HrIPX7Mv37LPuTC5xEacSfa+V83YEW+bBfleFkuW8QbqQZDEuso9rcOKQQ/CxosIHnQLkWJOVdept9+ijSA6NEJwFGePaUekAdFwr65EaRcxu9BbOKq1JDqnmzIi9oL0RRDu4p1u/ayH9schrhlimGTtOLGnjeJRAJnC56FCQ3SFaYriLWjA4Q7SsPOp6kYnEXMbldKDTW/ssCFgKiaB1kusBWT+rkLYjQiAKhkHvP2j3IqWd5iMQ+M=)

### RxJS {#rxjs}

[RxJS](https://rxjs.dev/) کتابخانه‌ای برای کار با جریان‌ رویدادهای آسنکرون است. کتابخانه [VueUse](https://vueuse.org/) افزونه [`‎@vueuse/rxjs`](https://vueuse.org/rxjs/readme.html) را برای اتصال جریان‌های RxJS به سیستم واکنش‌پذیری Vue فراهم می‌کند.

## اتصال به سیگنال‌ها {#connection-to-signals}

چندین فریمورک دیگر هم مفاهیم اولیه واکنش‌پذیری مشابه refs از Composition API Vue را با عنوان "سیگنال‌ها" معرفی کرده‌اند:

- [سیگنال‌ها در Solid](https://www.solidjs.com/docs/latest/api#createsignal)
- [سیگنال‌ها در Angular](https://angular.io/guide/signals)
- [سیگنال‌ها در Preact](https://preactjs.com/guide/v10/signals/)
- [سیگنال‌ها در Qwik](https://qwik.builder.io/docs/components/state/#usesignal)

از نظر اصولی، سیگنال‌ها همان نوع ابتدایی واکنش‌پذیری مثل refs در Vue هستند. یک کانتینر که ردیابی وابستگی را در دسترسی و فعال‌سازی افکت جانبی در تغییر فراهم می‌کند. این پارادایم مبتنی بر اصول واکنش‌پذیری مفهوم جدیدی در دنیای فرانت‌اند نیست: به پیاده‌سازی‌هایی مثل [observables در Knockout](https://knockoutjs.com/documentation/observables.html) و [Tracker در Meteor](https://docs.meteor.com/api/tracker.html) بیش از یک دهه پیش برمی‌گردد. Options API در Vue و کتابخانه مدیریت state React به نام [MobX](https://mobx.js.org/) نیز بر همان اصول مبتنی هستند.

اگرچه لزومی برای تعریف چیزی به عنوان سیگنال نیست، امروزه این مفهوم اغلب در کنار مدل رندرینگی مطرح می‌شود که به‌روزرسانی‌ها از طریق اشتراک‌های ظریف‌تر انجام می‌شود. به دلیل استفاده از DOM مجازی، Vue در حال حاضر به [کامپایلرها برای دستیابی به بهینه‌سازی‌های مشابه متکی است](/guide/extras/rendering-mechanism#compiler-informed-virtual-dom). با این حال، ما همچنین در حال بررسی یک استراتژی کامپایل جدید الهام گرفته از Solid (حالت Vapor) هستیم که به DOM مجازی متکی نیست و از سیستم واکنش‌پذیری درونی Vue بیشتر استفاده می‌کند.

### بده بستان طراحی API {#api-design-trade-offs}

طراحی سیگنال‌ها در Preact و Qwik بسیار شبیه به [shallowRef](/api/reactivity-advanced#shallowref) در Vue است: هر سه امکان تغییر مقدار را از طریق ویژگی `‎.value` به کاربر می‌دهند. بحث را روی سیگنال‌های Solid و Angular متمرکز خواهیم کرد.

#### Solid Signals {#solid-signals}

طراحی `createSignal()‎` در Solid بر جداسازی خواندن و نوشتن تأکید دارد. سیگنال‌ها به عنوان یک گتر فقط-خواندنی و یک ستر جداگانه در اختیار قرار می‌گیرند:

```js
const [count, setCount] = createSignal(0)

count() // دسترسی به مقدار
setCount(1) // به‌روزرسانی مقدار
```

توجه کنید که سیگنال `count` می‌تواند بدون ستر پاس داده شود. این اطمینان می‌دهد که state هرگز نمی‌تواند تغییر کند مگر اینکه ستر نیز صریحاً در اختیار قرار گرفته باشد. اینکه آیا این ضمانت امنیتی سینتکس بیشتر را توجیه می‌کند یا خیر می‌تواند بستگی به نیازهای پروژه و سلیقه شخصی داشته باشد - اما در صورت ترجیح این سبک API، می‌توانید آن را به راحتی در Vue تکرار کنید:

```js
import { shallowRef, triggerRef } from 'vue'

export function createSignal(value, options) {
  const r = shallowRef(value)
  const get = () => r.value
  const set = (v) => {
    r.value = typeof v === 'function' ? v(r.value) : v
    if (options?.equals === false) triggerRef(r)
  }
  return [get, set]
}
```

[امتحان این مورد در Playground](https://play.vuejs.org/#eNpdUk1TgzAQ/Ss7uQAjgr12oNXxH+ix9IAYaDQkMV/qMPx3N6G0Uy9Msu/tvn2PTORJqcI7SrakMp1myoKh1qldI9iopLYwQadpa+krG0TLYYZeyxGSojSSs/d7E8vFh0ka0YhOCmPh0EknbB4mPYfTEeqbIelD1oiqXPRQCS+WjoojAW8A1Wmzm1A39KYZzHNVYiUib85aKeCx46z7rBuySqQe6h14uINN1pDIBWACVUcqbGwtl17EqvIiR3LyzwcmcXFuTi3n8vuF9jlYzYaBajxfMsDcomv6E/m9E51luN2NV99yR3OQKkAmgykss+SkMZerxMLEZFZ4oBYJGAA600VEryAaD6CPaJwJKwnr9ldR2WMedV1Dsi6WwB58emZlsAV/zqmH9LzfvqBfruUmNvZ4QN7VearjenP4aHwmWsABt4x/+tiImcx/z27Jqw==)

#### Angular Signals {#angular-signals}

Angular در حال انجام تغییرات بنیادینی با کنار گذاشتن dirty-checking و معرفی پیاده‌سازی خود از واکنش‌پذیری است. API سیگنال Angular به این شکل است:

```js
const count = signal(0)

count() // دسترسی به مقدار
count.set(1) // تنظیم مقدار جدید
count.update((v) => v + 1) // به‌روزرسانی بر اساس مقدار قبلی
```

ما می‌توانیم این API را به راحتی در Vue تکرار کنیم:

```js
import { shallowRef } from 'vue'

export function signal(initialValue) {
  const r = shallowRef(initialValue)
  const s = () => r.value
  s.set = (value) => {
    r.value = value
  }
  s.update = (updater) => {
    r.value = updater(r.value)
  }
  return s
}
```

[امتحان این مورد در Playground](https://play.vuejs.org/#eNp9Ul1v0zAU/SuWX9ZCSRh7m9IKGHuAB0AD8WQJZclt6s2xLX+ESlH+O9d2krbr1Df7nnPu17k9/aR11nmgt7SwleHaEQvO6w2TvNXKONITyxtZihWpVKu9g5oMZGtUS66yvJSNF6V5lyjZk71ikslKSeuQ7qUj61G+eL+cgFr5RwGITAkXiyVZb5IAn2/IB+QWeeoHO8GPg1aL0gH+CCl215u7mJ3bW9L3s3IYihyxifMlFRpJqewL1qN3TknysRK8el4zGjNlXtdYa9GFrjryllwvGY18QrisDLQgXZTnSX8pF64zzD7pDWDghbbI5/Hoip7tFL05eLErhVD/HmB75Edpyd8zc9DUaAbso3TrZeU4tjfawSV3vBR/SuFhSfrQUXLHBMvmKqe8A8siK7lmsi5gAbJhWARiIGD9hM7BIfHSgjGaHljzlDyGF2MEPQs6g5dpcAIm8Xs+2XxODTgUn0xVYdJ5RxPhKOd4gdMsA/rgLEq3vEEHlEQPYrbgaqu5APNDh6KWUTyuZC2jcWvfYswZD6spXu2gen4l/mT3Icboz3AWpgNGZ8yVBttM8P2v77DH9wy2qvYC2RfAB7BK+NBjon32ssa2j3ix26/xsrhsftv7vQNpp6FCo4E5RD6jeE93F0Y/tHuT3URd2OLwHyXleRY=)

در مقایسه با refs در Vue، سبک API مبتنی بر گتر در Solid و Angular بده بستان جالبی را در استفاده در کامپوننت‌های Vue ارائه می‌دهد:

- دسترسی به مقدار با `()` انجام می‌شود که کمی کوتاه‌تر از `‎.value` در Vue است. اما برای به‌روز کردن مقدار باید از توابع جداگانه‌ای مثل set استفاده کرد که کد را کمی طولانی‌تر می‌کند.
- در این API نیازی به باز کردن پیچیدگی یک ref (مثل count.value) نیست و همیشه `count()‎` استفاده می‌شود. این باعث یکنواختی در دسترسی به مقادیر می‌شود. همچنین این امکان را می‌دهد که سیگنال‌های خام را مستقیماً به عنوان props ارسال کرد.

اینکه آیا این سبک‌های API برای شما مناسب است تا حدودی ذهنی است. هدف ما در اینجا نشان دادن شباهت اساسی و بده بستان‌های بین این طراحی‌های API مختلف است. همچنین می‌خواهیم نشان دهیم که Vue انعطاف‌پذیر است: شما واقعاً در API‌های موجود گیر نمی‌افتید. در صورت لزوم، می‌توانید API ابتدایی واکنش‌پذیری خود را برای برآورده کردن نیازهای خاص ایجاد کنید.
