# مدیریت رویدادها - Event Handling {#event-handling}

<div class="options-api">
  <VueSchoolLink href="https://vueschool.io/lessons/user-events-in-vue-3" title="Free Vue.js Events Lesson"/>
</div>

<div class="composition-api">
  <VueSchoolLink href="https://vueschool.io/lessons/vue-fundamentals-capi-user-events-in-vue-3" title="Free Vue.js Events Lesson"/>
</div>

## گوش دادن به رویدادها {#listening-to-events}

برای گوش دادن به رویدادهای DOM و اجرای کد جاوااسکریپت در زمانی‌که آن رویدادها رخ می‌دهند، می‌توانیم از دستور `v-on` استفاده کنیم که معمولاً آن را به `@` خلاصه می‌کنیم. استفاده از آن به صورت `v-on:click="handler"‎` یا با میانبر `‎@click="handler"‎` خواهد بود.

مقدار handler می‌تواند یکی از موارد زیر باشد:

1. **Inline handlers**: جاوااسکریپت درون‌خطی برای اجرا شدن هنگامی که رویداد رخ می‌دهد (مشابه attribute داخلی onclick).

2. **Method handlers**: نام یک پراپرتی یا مسیری که به یک متد تعریف شده روی کامپوننت اشاره می‌کند.

## Inline Handlers {#inline-handlers}

Inline handlers معمولاً در موارد ساده استفاده می‌شوند، به عنوان مثال:

<div class="composition-api">

```js
const count = ref(0)
```

</div>
<div class="options-api">

```js
data() {
  return {
    count: 0
  }
}
```

</div>

```vue-html
<button @click="count++">Add 1</button>
<p>Count is: {{ count }}</p>
```

<div class="composition-api">

[امتحان این مورد در Playground](https://play.vuejs.org/#eNo9jssKgzAURH/lko0tgrbbEqX+Q5fZaLxiqHmQ3LgJ+fdqFZcD58xMYp1z1RqRvRgP0itHEJCia4VR2llPkMDjBBkmbzUUG1oII4y0JhBIGw2hh2Znbo+7MLw+WjZ/C4TaLT3hnogPkcgaeMtFyW8j2GmXpWBtN47w5PWBHLhrPzPCKfWDXRHmPsCAaOBfgSOkdH3IGUhpDBWv9/e8vsZZ/gFFhFJN)

</div>
<div class="options-api">

[امتحان این مورد در Playground](https://play.vuejs.org/#eNo9jcEKgzAQRH9lyKlF0PYqqdR/6DGXaLYo1RjiRgrivzepIizLzu7sm1XUzuVLIFEKObe+d1wpS183eYahtw4DY1UWMJr15ZpmxYAnDt7uF0BxOwXL5Evc0kbxlmyxxZLFyY2CaXSDZkqKZROYJ4tnO/Tt56HEgckyJaraGNxlsVt2u6teHeF40s20EDo9oyGy+CPIYF1xULBt4H6kOZeFiwBZnOFi+wH0B1hk)

</div>

## Method Handlers {#method-handlers}

منطق بسیاری از کنترل کننده‌های رویداد (event handlers) پیچیده‌تر است و احتمالا با کنترل کننده‌های inline امکان‌پذیر نیست. به همین دلیل `v-on` همچنین می‌تواند نام یا مسیری از متدِ کامپوننت که می‌خواهید صدا بزنید، بپذیرد.

به عنوان مثال:

<div class="composition-api">

```js
const name = ref('Vue.js')

function greet(event) {
  alert(`Hello ${name.value}!`)
  // است DOM رویداد بومی `event`
  if (event) {
    alert(event.target.tagName)
  }
}
```

</div>
<div class="options-api">

```js
data() {
  return {
    name: 'Vue.js'
  }
},
methods: {
  greet(event) {
    // داخل متدها به نمونه کامپوننت فعال کنونی اشاره می‌کند `this`
    alert(`Hello ${this.name}!`)
    // است DOM رویداد بومی `event`
    if (event) {
      alert(event.target.tagName)
    }
  }
}
```

</div>

```vue-html
<!-- نام متد تعریف شده در بالا است `greet` -->
<button @click="greet">Greet</button>
```

<div class="composition-api">

[امتحان این مورد در Playground](https://play.vuejs.org/#eNpVj0FLxDAQhf/KMwjtXtq7dBcFQS/qzVMOrWFao2kSkkkvpf/dJIuCEBgm771vZnbx4H23JRJ3YogqaM+IxMlfpNWrd4GxI9CMA3NwK5psbaSVVjkbGXZaCediaJv3RN1XbE5FnZNVrJ3FEoi4pY0sn7BLC0yGArfjMxnjcLsXQrdNJtFxM+Ys0PcYa2CEjuBPylNYb4THtxdUobj0jH/YX3D963gKC5WyvGZ+xR7S5jf01yPzeblhWr2ZmErHw0dizivfK6PV91mKursUl6dSh/4qZ+vQ/+XE8QODonDi)

</div>
<div class="options-api">

[امتحان این مورد در Playground](https://play.vuejs.org/#eNplUE1LxDAQ/StjEbYL0t5LXRQEvag3Tz00prNtNE1CMilC6X83SUkRhJDJfLz3Jm8tHo2pFo9FU7SOW2Ho0in8MdoSDHhlXhKsnQIYGLHyvL8BLJK3KmcAis3YwOnDY/XlTnt1i2G7i/eMNOnBNRkwWkQqcUFFByVAXUNPk3A9COXEgBkGRgtFDkgDTQjcWxuAwDiJBeMsMcUxszCJlsr+BaXUcLtGwiqut930579KST1IBd5Aqlgie3p/hdTIk+IK//bMGqleEbMjxjC+BZVDIv0+m9CpcNr6MDgkhLORjDBm1H56Iq3ggUvBv++7IhnUFZfnGNt6b4fRtj5wxfYL9p+Sjw==)

</div>

متد کنترل کننده به طور خودکار آبجکت event بومی DOM، که رویداد آن را پاس می‌دهد، دریافت می‌کند - در مثال بالا، ما قادر به دسترسی به نام عنصر ارسال کننده رویداد از طریق `event.target.tagName` هستیم.

<div class="composition-api">

همچنین ببینید: [تایپِ کنترل کننده‌های رویداد](/guide/typescript/composition-api#typing-event-handlers) <sup class="vt-badge ts" />

</div>
<div class="options-api">

همچنین ببینید: [تایپِ کنترل کننده‌های رویداد](/guide/typescript/options-api#typing-event-handlers) <sup class="vt-badge ts" />

</div>

### Method در مقابل Inline Detection {#method-vs-inline-detection}

کامپایلر تمپلیت، کنترل کننده‌های متد را با بررسی اینکه آیا مقدار رشته `v-on` یک شناسه جاوااسکریپت معتبر یا مسیر دسترسی به یک پراپرتی است، تشخیص می‌دهد. به عنوان مثال `foo` و `foo.bar` و `foo['bar']` به عنوان کنترل کننده‌های متد در نظر گرفته می‌شوند، در حالی که `foo()‎` و `count++‎` به عنوان کنترل کننده‌های درون خطی در نظر گرفته می‌شوند.

## صدا زدن متدها در Inline Handlers {#calling-methods-in-inline-handlers}

به جای اتصال مستقیم به نام متد، ما همچنین می‌توانیم متدها را در یک  inline handler صدا بزنیم. این به ما اجازه می‌دهد تا به جای رویداد بومی، آرگومان‌های سفارشی به متد ارسال کنیم:

<div class="composition-api">

```js
function say(message) {
  alert(message)
}
```

</div>
<div class="options-api">

```js
methods: {
  say(message) {
    alert(message)
  }
}
```

</div>

```vue-html
<button @click="say('hello')">Say hello</button>
<button @click="say('bye')">Say bye</button>
```

<div class="composition-api">

[امتحان این مورد در Playground](https://play.vuejs.org/#eNp9jTEOwjAMRa8SeSld6I5CBWdg9ZJGBiJSN2ocpKjq3UmpFDGx+Vn//b/ANYTjOxGcQEc7uyAqkqTQI98TW3ETq2jyYaQYzYNatSArZTzNUn/IK7Ludr2IBYTG4I3QRqKHJFJ6LtY7+zojbIXNk7yfmhahv5msvqS7PfnHGjJVp9w/hu7qKKwfEd1NSg==)

</div>
<div class="options-api">

[امتحان این مورد در Playground](https://play.vuejs.org/#eNptjUEKwjAQRa8yZFO7sfsSi57B7WzGdjTBtA3NVC2ldzehEFwIw8D7vM9f1cX742tmVSsd2sl6aXDgjx8ngY7vNDuBFQeAnsWMXagToQAEWg49h0APLncDAIUcT5LzlKJsqRBfPF3ljQjCvXcknEj0bRYZBzi3zrbPE6o0UBhblKiaKy1grK52J/oA//23IcmNBD8dXeVBtX0BF0pXsg==)

</div>

## دسترسی به آرگومان event در Inline Handlers {#accessing-event-argument-in-inline-handlers}

گاهی اوقات ما همچنین نیاز به دسترسی به رویداد DOM اصلی در یک کنترل کننده درون خطی داریم. شما می‌توانید آن را با استفاده از متغیر ویژه `‎$event` به یک متد منتقل کنید، یا از یک arrow function تک خطی استفاده کنید:

```vue-html
<!-- $event استفاده از متغیر ویژه --> 
<button @click="warn('Form cannot be submitted yet.', $event)">
  Submit
</button>

<!-- inline arrow function استفاده از  -->
<button @click="(event) => warn('Form cannot be submitted yet.', event)">
  Submit
</button>
```

<div class="composition-api">

```js
function warn(message, event) {
  // اکنون ما دسترسی به رویداد بومی داریم
  if (event) {
    event.preventDefault()
  }
  alert(message)
}
```

</div>
<div class="options-api">

```js
methods: {
  warn(message, event) {
    // اکنون ما دسترسی به رویداد بومی داریم
    if (event) {
      event.preventDefault()
    }
    alert(message)
  }
}
```

</div>

## تغییردهنده‌های رویداد - Event Modifiers {#event-modifiers}

نیاز بسیار متداولی است که `event.preventDefault()‎` یا `event.stopPropagation()‎` را در داخل کنترل‌کننده‌های رویداد صدا بزنیم. اگرچه ما می‌توانیم به راحتی این کار را در داخل متدها انجام دهیم، بهتر است متدها به‌طور خاص برای یک عمل طراحی شده باشند و نیازی نباشد با جزئیات رویدادهای DOM سروکار داشته باشند.

برای حل این مشکل، Vue **تغییردهنده‌های رویداد (event modifiers)**  را برای v-on ارائه می‌دهد. به یاد داشته باشید که تغییردهنده‌ها، پسوندهای دایرکتیوها هستند که با یک نقطه مشخص می‌شوند.

- `‎.stop`
- `‎.prevent`
- `‎.self`
- `‎.capture`
- `‎.once`
- `‎.passive`

```vue-html
<!-- the click event's propagation will be stopped -->
<a @click.stop="doThis"></a>

<!-- the submit event will no longer reload the page -->
<form @submit.prevent="onSubmit"></form>

<!-- modifiers can be chained -->
<a @click.stop.prevent="doThat"></a>

<!-- just the modifier -->
<form @submit.prevent></form>

<!-- only trigger handler if event.target is the element itself -->
<!-- i.e. not from a child element -->
<div @click.self="doThat">...</div>
```

::: tip نکته
هنگامی که از تغییردهنده‌ها استفاده می‌کنید ترتیب اهمیت دارد زیرا کد مربوطه با همان ترتیب ساخته می‌شود. بنابراین استفاده از `‎@click.prevent.self` **از ارسال پیش فرض کلیک روی خود عنصر و فرزندان آن جلوگیری می‌کند**، در حالی که `‎@click.self.prevent` فقط از ارسال پیش‌فرض کلیک روی خود عنصر جلوگیری خواهد کرد.
:::

تغییردهنده‌های `‎.capture` و `‎.once` و `‎.passive` نماینده [آپشن‌های متد بومی `addEventListener`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#options) هستند:

```vue-html
<!-- استفاده کن capture هنگام اضافه کردن کنترل کننده رویداد از حالت -->
<!-- یعنی رویدادی که یک عنصر داخلی را هدف قرار می‌دهد قبل از اینکه توسط آن عنصر مدیریت شود در اینجا مدیریت می‌شود -->
<div @click.capture="doThis">...</div>

<!-- رویداد کلیک حداکثر یک بار فعال می شود -->
<a @click.once="doThis"></a>

<!-- رفتار پیش‌فرض رویداد اسکرول (پیمایش) اتفاق می‌افتد    -->
<!-- باشید «onScroll» بلافاصله، به جای اینکه منتظر تکمیل  -->
<!-- باشد «event.preventDefault()» در صورتی که حاوی      -->
<div @scroll.passive="onScroll">...</div>
```

تغییردهنده‌ `‎.passive` معمولاً با کنترل کننده‌های رویداد لمسی برای [بهبود عملکرد روی دستگاه‌های موبایل](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#improving_scroll_performance_using_passive_listeners) استفاده می‌شود.

::: tip توجه
از ترکیب `‎.passive` و `‎.prevent` استفاده نکنید، زیرا `‎.passive` در واقع به مرورگر اعلام می‌کند که شما قصد ندارید از رفتار پیش فرض رویداد جلوگیری کنید، و احتمالاً اخطاری از مرورگر می‌بینید اگر این کار را انجام دهید.
:::

## Key Modifiers {#key-modifiers}

وقتی که می‌خواهیم به رویدادهای صفحه‌کلید گوش دهیم، اغلب باید کلیدهای خاصی را بررسی کنیم. Vue اجازه اضافه کردن modifier های کلید را برای `v-on` یا `@` هنگام گوش دادن به رویدادهای صفحه‌کلید می‌دهد:

```vue-html
<!-- صدا می‌زند `submit` باشد `Enter` ، `key` فقط زمانی که -->
<input @keyup.enter="submit" />
```

شما می‌توانید مستقیماً از هر نام کلید معتبری که از طریق [`KeyboardEvent.key`](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values) در اختیار قرار گرفته است به عنوان تغییردهنده‌ با تبدیل آن‌ها به فرم kebab-case استفاده کنید.

```vue-html
<input @keyup.page-down="onPageDown" />
```

در مثال بالا، کنترل کننده فقط در صورتی صدا زده خواهد شد که `‎$event.key` برابر با `'PageDown'` باشد.

### Key Aliases {#key-aliases}

Vue میانبرهایی برای پرکاربردترین کلیدها ارائه می‌دهد:

- `‎.enter`
- `‎.tab`
- `‎.delete` (هم کلید «Delete» و هم «Backspace» را شامل می‌شود)
- `‎.esc`
- `‎.space`
- `‎.up`
- `‎.down`
- `‎.left`
- `‎.right`

### System Modifier Keys {#system-modifier-keys}

شما می‌توانید از تغییردهنده‌های زیر برای فعال کردن کنترل‌کننده‌های رویداد ماوس یا صفحه‌کلید فقط زمانی‌که کلید مربوطه فشرده شده باشد، استفاده کنید:

- `‎.ctrl`
- `‎.alt`
- `‎.shift`
- `‎.meta`

::: tip توجه
روی صفحه‌کلیدهای مکینتاش، کلید meta همان کلید command (⌘) است. روی صفحه‌کلیدهای Windows، کلید meta کلید Windows (⊞) است. روی صفحه‌کلیدهای Sun Microsystems، کلید meta با الماس جامد (◆) مشخص شده‌ است. روی برخی از صفحه‌کلیدها، به‌طور مشخص صفحه‌کلیدهای MIT و Lisp و جانشینان آن‌ها مانند صفحه‌کلید Knight و space-cadet، کلید meta برچسب «META» دارد. روی صفحه‌کلیدهای Symbolics، کلید meta برچسب «META» یا «Meta» دارد.
:::

به‌عنوان مثال:

```vue-html
<!-- Alt + Enter -->
<input @keyup.alt.enter="clear" />

<!-- Ctrl + Click -->
<div @click.ctrl="doSomething">Do something</div>
```

::: tip نکته
توجه کنید که کلیدهای تغییردهنده‌ با کلیدهای معمولی متفاوت هستند و هنگام استفاده با رویدادهای `keyup`، باید هنگام بروز رویداد فشرده شده باشند. به عبارت دیگر، `keyup.ctrl` فقط زمانی اتفاق می‌افتد که یک کلید را رها کنید در حالی که کلید `ctrl` را پایین نگه داشته‌اید. اگر فقط کلید `ctrl` را رها کنید اتفاق نمی‌افتد.
:::

### `‎.exact` Modifier {#exact-modifier}

تغییردهنده‌ `‎.exact` اجازه کنترل ترکیب دقیق تغییردهنده‌های سیستم مورد نیاز برای فعال سازی یک رویداد را می‌دهد.

```vue-html
<!-- هم فشرده شود اجرا می‌شود Alt یا Shift این حتی اگر -->
<button @click.ctrl="onClick">A</button>

<!-- فشرده شده و هیچ کلید دیگری نباشد اجرا می‌شود Ctrl این فقط هنگامی که فقط  --> 
<button @click.ctrl.exact="onCtrlClick">A</button>

<!-- دیگری فشرده نشده باشد modifier این فقط زمانی اجرا می‌شود که هیچ -->
<button @click.exact="onClick">A</button>
```

## Mouse Button Modifiers {#mouse-button-modifiers}

- `‎.left`
- `‎.right`
- `‎.middle`

این تغییردهنده‌ها، کنترل‌کننده را محدود به رویدادهایی می‌کنند که توسط دکمه خاصی از ماوس فعال شده‌اند.
