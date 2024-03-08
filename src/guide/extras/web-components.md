# Vue و کامپوننت‌های وب {#vue-and-web-components}

[کامپوننت‌های وب](https://developer.mozilla.org/en-US/docs/Web/Web\\_Components) یک اصطلاح کلی برای مجموعه‌ای از APIهای بومی وب است که به توسعه‌دهندگان امکان می‌دهد تا المنت‌های سفارشی قابل استفاده‌ مجدد ایجاد کنند.

ما Vue و کامپوننت‌های وب را فناوری‌های مکمل یکدیگر در نظر می‌گیریم. Vue پشتیبانی عالی از استفاده و ایجاد المنت‌های سفارشی ارائه می‌دهد. چه در حال یکپارچه‌سازی المنت‌های سفارشی موجود در یک برنامه Vue باشید یا از Vue برای ساخت و توزیع المنت‌های سفارشی استفاده کنید، در جایگاه خوبی قرار دارید.

## استفاده از المنت‌های سفارشی در Vue {#using-custom-elements-in-vue}

Vue [نمره ‎100% را در همه تست‌های المنت‌های سفارشی کسب کرده است](https://custom-elements-everywhere.com/libraries/vue/results/results.html). استفاده از المنت‌های سفارشی داخل برنامه Vue تا حد زیادی مانند استفاده از المنت‌های HTML بومی عمل می‌کند، با چند نکته که باید به آن‌ها توجه داشت:

### گذشتن از Component Resolution {#skipping-component-resolution}

به طور پیش‌فرض، Vue تلاش می‌کند قبل از اینکه یک تگ HTML غیربومی را به عنوان المنت سفارشی قبول کند به عنوان یک کامپوننت Vue ثبت‌شده در نظر بگیرد. این باعث می‌شود Vue در حین توسعه هشدار "failed to resolve component" را منتشر کند. برای اطلاع دادن به Vue که برخی المنت باید به عنوان المنت‌های سفارشی در نظر گرفته شوند، می‌توانیم از [آپشن `compilerOptions.isCustomElement`](/api/application#app-config-compileroptions) استفاده کنیم.

اگر از Vue با یک بیلد ستاپ استفاده می‌کنید، این آپشن باید از طریق تنظیمات بیلد ارسال شود زیرا یک آپشن زمان کامپایل است.

#### مثال از تنظیمات درون مرورگر {#example-in-browser-config}

```js
// اگر فقط از کامپایل درون مرورگر استفاده می‌کنید کار می‌کند
// اگر از ابزارهای بیلد استفاده می‌کنید، مثال‌های پایین را ببینید
app.config.compilerOptions.isCustomElement = (tag) => tag.includes('-')
```

#### مثال از تنظیمات Vite {#example-vite-config}

```js
// vite.config.js
import vue from '@vitejs/plugin-vue'

export default {
  plugins: [
    vue({
      template: {
        compilerOptions: {
          // همه تگ‌های دارای خط‌تیره را به‌عنوان المنت‌های سفارشی در نظر بگیر
          isCustomElement: (tag) => tag.includes('-')
        }
      }
    })
  ]
}
```

#### مثال از تنظیمات Vue CLI {#example-vue-cli-config}

```js
// vue.config.js
module.exports = {
  chainWebpack: config => {
    config.module
      .rule('vue')
      .use('vue-loader')
      .tap(options => ({
        ...options,
        compilerOptions: {
          // شروع شود را به‌عنوان المنت‌های سفارشی در نظر بگیر ion- هر تگی که با
          isCustomElement: tag => tag.startsWith('ion-')
        }
      }))
  }
}
```

### Passing DOM Properties {#passing-dom-properties}

از آنجایی که اتریبیوت‌ها در DOM تنها می‌توانند رشته باشند، برای انتقال داده‌های پیچیده به المنت‌های سفارشی به پراپرتی‌های DOM نیاز داریم. هنگام تنظیم props روی یک المنت سفارشی، Vue 3 به طور خودکار با استفاده از عملگر `in` وجود پراپرتی DOM را بررسی می‌کند و اگر کلید وجود داشته باشد، ترجیح می‌دهد مقدار را به عنوان پراپرتی DOM تنظیم کند. این بدان معناست که در اکثر موارد، اگر المنت سفارشی از [شیوه‌های توصیه شده](https://web.dev/custom-elements-best-practices/) پیروی کند، نیاز نیست در مورد این موضوع فکر کنید.

با این حال، ممکن است موارد نادری وجود داشته باشد که داده‌ها باید به عنوان پراپرتی DOM انتقال یابند، اما المنت سفارشی به درستی پراپرتی را تعریف/انعکاس نمی‌دهد (باعث شکست بررسی `in` می‌شود). در این مورد، می‌توانید یک اتصال `v-bind` را با استفاده از مُدیفایر `‎.prop` مجبور به تنظیم به عنوان پراپرتی DOM کنید:

```vue-html
<my-element :user.prop="{ name: 'jack' }"></my-element>

<!-- معادل مختصر -->
<my-element .user="{ name: 'jack' }"></my-element>
```

## ساخت المنت‌های سفارشی با Vue {#building-custom-elements-with-vue}

مزیت اصلی المنت‌های سفارشی این است که می‌توانند با هر فریم‌ورکی یا حتی بدون فریم‌ورک استفاده شوند. این آن‌ها را برای توزیع کامپوننت‌ها در مواردی که مصرف‌کننده نهایی ممکن است از یک استک فرانت‌اند مشابه استفاده نکند یا زمانی که می‌خواهید از جزئیات پیاده‌سازی کامپوننت‌ها در برنامه نهایی محافظت کنید، ایده‌آل می‌سازد.

### defineCustomElement {#definecustomelement}

Vue از طریق متد [`defineCustomElement`](/api/general#definecustomelement) از ایجاد المنت‌های سفارشی با استفاده از دقیقاً همان APIهای کامپوننت Vue پشتیبانی می‌کند. این متد همان آرگومان‌های [`defineComponent`](/api/general#definecomponent) را می‌پذیرد، اما به جای آن یک سازنده المنت سفارشی را که از `HTMLElement` مشتق شده را بازمی‌گرداند:

```vue-html
<my-vue-element></my-vue-element>
```

```js
import { defineCustomElement } from 'vue'

const MyVueElement = defineCustomElement({
  // در اینجاست Vue آپشن‌های معمول کامپوننت
  props: {},
  emits: {},
  template: `...`,

  // defineCustomElement only: CSS to be injected into shadow root
  styles: [`/* inlined css */`]
})

// المنت سفارشی را ثبت کنید
// `<my-vue-element>` پس از ثبت، همه تگ‌های
// روی صفحه ارتقا خواهند یافت
customElements.define('my-vue-element', MyVueElement)

// همچنین می‌توانید از طریق کد المنت را مقداردهی اولیه کنید:
// (فقط پس از ثبت امکان‌پذیر است)
document.body.appendChild(
  new MyVueElement({
    // اولیه (اختیاری) props
  })
)
```

#### چرخه حیات {#lifecycle}

- یک المنت سفارشی Vue یک نمونه کامپوننت Vue داخلی را در shadow root اش مانت می‌کند زمانی که [`connectedCallback`](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements#using_the_lifecycle_callbacks) المنت برای اولین بار فراخوانی می‌شود.

- زمانی که `disconnectedCallback` المنت فراخوانی می‌شود، Vue پس از یک تیک microtask بررسی می‌کند که آیا المنت از سند جدا شده است.

  - اگر المنت هنوز در سند باشد، این یک جابه‌جایی است و نمونه کامپوننت حفظ می‌شود.

  - اگر المنت از سند جدا شده باشد، این یک حذف است و نمونه کامپوننت آنمانت می‌شود.

#### Props {#props}

- همه‌ی prop های تعریف‌شده با آپشن `props` به عنوان پراپرتی‌های روی المنت سفارشی تعریف می‌شوند. Vue به طور خودکار انعکاس بین اتریبیوت‌ها/پراپرتی‌ها را در جای مناسب انجام می‌دهد.

  - اتریبیوت‌ها همیشه به پراپرتی‌های متناظر انعکاس داده می‌شوند.

  - پراپرتی‌ها با تایپ داده اولیه (‍`string‍` یا `‍boolean‍` یا `‍number`) به عنوان اتریبیوت‌ها انعکاس داده می‌شوند.

- Vue همچنین خودکار props اعلام‌شده با تایپ‌های `Boolean` یا `Number` را زمانی که به عنوان اتریبیوت‌ها (که همیشه رشته هستند) تنظیم می‌شوند، به نوع مورد نظر تبدیل می‌کند. به عنوان مثال، با توجه به اعلام props زیر:

  ```js
  props: {
    selected: Boolean,
    index: Number
  }
  ```

  و استفاده از المنت سفارشی:

  ```vue-html
  <my-element selected index="1"></my-element>
  ```

  در کامپوننت، `selected` به `true` (تایپ: Boolean) و `index` به `1` (تایپ: Number) تبدیل خواهد شد.

#### رویدادها {#events}

رویدادهایی که از طریق ‍`this.$emit‍` یا `‍emit‍` موجود در setup، ارسال می‌شوند، به عنوان [CustomEvents](https://developer.mozilla.org/en-US/docs/Web/Events/Creating_and_triggering_events#adding_custom_data_%E2%80%93_customevent) بومی روی المنت سفارشی ارسال می‌شوند. آرگومان‌های اضافی رویداد (payload) به عنوان یک آرایه روی آبجکت CustomEvent از پراپرتی ‍`detail‍` آن قابل دسترسی خواهند بود.

#### Slots {#slots}

درون کامپوننت، اسلات‌ها می‌توانند با استفاده از المنت `‎<slot/>‎` مثل همیشه رندر شوند. با این حال هنگام استفاده، المنت حاصل فقط از سینتکس [اسلات بومی](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_templates_and_slots) پشتیبانی می‌کند:

- [اسلات‌های دارای اسکوپ](/guide/components/slots#scoped-slots) پشتیبانی نمی‌شوند.

- هنگام ارسال اسلات‌های نامگذاری‌شده، از خاصیت `slot` به جای دایرکتیو `v-slot` استفاده کنید:

  ```vue-html
  <my-element>
    <div slot="named">hello</div>
  </my-element>
  ```

#### Provide / Inject {#provide-inject}

API مربوط به [Provide / Inject](/guide/components/provide-inject#provide-inject) و [معادل آن در Composition API](/api/composition-api-dependency-injection#provide) در المنت‌های سفارشی تعریف‌شده با Vue کار می‌کنند. با این حال، توجه داشته باشید که این فقط بین المنت‌های سفارشی کار می‌کند. یعنی یک المنت سفارشی تعریف‌شده در Vue نمی‌تواند پراپرتی‌های ارائه‌شده توسط یک کامپوننت Vue غیرسفارشی را تزریق کند.

### SFC به عنوان المنت سفارشی {#sfc-as-custom-element}

`‍defineCustomElement‍` همچنین با Vue Single-File Components (SFCs) کار می‌کند. با این حال، با تنظیم پیش‌فرض ابزار، ‍`<style>`‍ داخل SFCها در حین بیلد پروداکشن استخراج و با هم به یک فایل CSS ترکیب می‌شوند. هنگام استفاده از یک SFC به عنوان یک المنت سفارشی، اغلب مطلوب است که تگ‌های `‍<style>`‍ را به جای آن به shadow root المنت سفارشی تزریق کنیم.

ابزارهای رسمی SFC از import کردن SFCها در "حالت المنت سفارشی" پشتیبانی می‌کنند (نیازمند ‍`‎@vitejs/plugin-vue@^1.4.0‍` یا ‍`vue-loader@^16.5.0‍`). یک SFC بارگذاری‌شده در حالت المنت سفارشی، تگ‌های `‍<style>`‍ خود را به عنوان رشته‌هایی از CSS درون‌خطی تبدیل می‌کند و آن‌ها را تحت آپشن `styles` کامپوننت قرار می‌دهد. این مورد توسط `‍defineCustomElement‍` برداشته می‌شود و هنگام مقداردهی اولیه المنت به shadow root آن تزریق می‌شود.

برای فعال کردن این حالت، کافی است نام فایل کامپوننت خود را با ‍`‎.ce.vue‍` تمام کنید:

```js
import { defineCustomElement } from 'vue'
import Example from './Example.ce.vue'

console.log(Example.styles) // ["/* inlined css */"]

// convert into custom element constructor
const ExampleElement = defineCustomElement(Example)

// register
customElements.define('my-example', ExampleElement)
```

برای سفارشی‌سازی اینکه کدام فایل‌ها باید در حالت المنت سفارشی import شوند (برای مثال، در نظر گرفتن _همه_ SFCها به عنوان المنت‌های سفارشی)، می‌توانید آپشن `customElement` را به پلاگین‌های بیلد مربوطه ارسال کنید:

- [‎@vitejs/plugin-vue](https://github.com/vitejs/vite-plugin-vue/tree/main/packages/plugin-vue#using-vue-sfcs-as-custom-elements)
- [vue-loader](https://github.com/vuejs/vue-loader/tree/next#v16-only-options)

### نکاتی برای کتابخانه المنت‌های سفارشی Vue {#tips-for-a-vue-custom-elements-library}

هنگام ساخت المنت‌های سفارشی با Vue، المنت‌های به رانتایم Vue وابسته خواهند بود. یک هزینه پایه حدود ‎~16kb بسته به اینکه از چه ویژگی‌هایی در حال استفاده هستند، وجود دارد. این بدان معناست که استفاده از Vue ایده‌آل نیست اگر در حال ارسال یک المنت سفارشی تکی هستید - شاید بخواهید از جاوااسکریپت خالص، [petite-vue](https://github.com/vuejs/petite-vue)، یا فریم‌ورک‌هایی که در اندازه رانتایم کوچک تخصص دارند، استفاده کنید. با این حال، اگر در حال ارسال تعداد زیادی از المنت‌های سفارشی با منطق پیچیده هستید، اندازه پایه بیش از حد، توجیه‌پذیر است. زیرا Vue به هر کامپوننت اجازه می‌دهد با کد خیلی کمتری نوشته شود. هر چه المنت‌های بیشتری را با هم ارسال کنید، مبادله بهتر است.

اگر المنت‌های سفارشی در یک برنامه‌ای که از Vue هم استفاده می‌کند مورد استفاده قرار بگیرند، می‌توانید انتخاب کنید Vue را از باندل خارجی استفاده کنید تا المنت‌ها از همان کپی Vue موجود در برنامه میزبان استفاده کنند.

توصیه می‌شود سازنده‌های المنت‌های جدا از هم را export کنید تا به کاربرانتان انعطاف‌پذیری بدهید آن‌ها را در زمان نیاز import کنند و با نام تگ دلخواه ثبت نمایند. همچنین می‌توانید یک تابع مقداردهی اولیه را export کنید تا خودکار همه المنت‌ها را ثبت کند. مثالی از نقطه ورود یک کتابخانه المنت‌های سفارشی Vue:

```js
import { defineCustomElement } from 'vue'
import Foo from './MyFoo.ce.vue'
import Bar from './MyBar.ce.vue'

const MyFoo = defineCustomElement(Foo)
const MyBar = defineCustomElement(Bar)

// export individual elements
export { MyFoo, MyBar }

export function register() {
  customElements.define('my-foo', MyFoo)
  customElements.define('my-bar', MyBar)
}
```

اگر کامپوننت‌های زیادی دارید، می‌توانید از ویژگی‌های ابزارهای بیلد مانند [glob import](https://vitejs.dev/guide/features.html#glob-import) در Vite یا [`require.context`](https://webpack.js.org/guides/dependency-management/#requirecontext) وب‌پک برای بارگذاری همه کامپوننت‌ها از یک دایرکتوری هم استفاده کنید.

### Web Components and TypeScript {#web-components-and-typescript}

اگر در حال توسعه یک برنامه یا کتابخانه هستید، ممکن است بخواهید کامپوننت‌های Vue خود از جمله آن‌هایی که به عنوان المنت‌های سفارشی تعریف شده‌اند را [type check](/guide/scaling-up/tooling.html#typescript) کنید.

المنت‌های سفارشی به طور سراسری با استفاده از APIهای بومی ثبت می‌شوند، بنابراین به طور پیش‌فرض هنگام استفاده در تمپلیت‌های Vue ما type inference نخواهیم داشت. برای فراهم کردن پشتیبانی از تایپ برای کامپوننت‌های Vue ما، که به عنوان المنت‌های سفارشی ثبت شده‌اند، می‌توانیم تایپ‌های سراسری کامپوننت را با استفاده از [`GlobalComponents` interface](https://github.com/vuejs/language-tools/blob/master/packages/vscode-vue/README.md#usage) در تمپلیت‌های Vue و یا در [JSX](https://www.typescriptlang.org/docs/handbook/jsx.html#intrinsic-elements) ثبت کنیم:

```typescript
import { defineCustomElement } from 'vue'

// vue SFC
import CounterSFC from './src/components/counter.ce.vue'

// turn component into web components
export const Counter = defineCustomElement(CounterSFC)

// register global typings
declare module 'vue' {
  export interface GlobalComponents {
    'Counter': typeof Counter,
  }
}
```

## کامپوننت‌های Web در مقابل کامپوننت‌های Vue {#web-components-vs-vue-components}

برخی توسعه‌دهندگان باور دارند که باید از مدل‌های کامپوننت مخصوص به فریمورک اجتناب شود و استفاده انحصاری از المنت‌های سفارشی، در بروزرسانی‌های آینده برنامه را "پایدار" می‌کند. در اینجا تلاش می‌کنیم توضیح دهیم که چرا فکر می‌کنیم که این نگرش بیش از حد ساده‌گرا به مسئله است.

بدون شک، یک سطح مشخص از همپوشانی ویژگی بین المنت‌های سفارشی و کامپوننت‌های Vue وجود دارد: هر دو به ما این امکان را می‌دهند که کامپوننت‌های قابل استفاده با انتقال داده، ایجاد رویداد و مدیریت چرخه حیات تعریف کنیم. با این حال، APIهای کامپوننت‌های Web به نسبت سطح پایین و ابتدایی هستند. برای ساخت یک برنامه واقعی، ما به چندین قابلیت اضافی نیاز داریم که پلتفرم آنها را پوشش نمی‌دهد:

- یک سیستم تمپلیت‌نویسی اعلامی و کارآمد؛

- یک سیستم reactive state management که استخراج و استفاده از منطق مشترک بین کامپوننت‌ها را تسهیل می‌کند؛

- روش کارآمد برای رندر کردن کامپوننت‌ها در سرور و قرار دادن آنها در مرورگر (SSR)، که برای بهینه‌سازی SEO و [متریک‌های Web Vitals مانند LCP](https://web.dev/vitals/) اهمیت دارد. رندر المنت‌های سفارشی SSR معمولاً شامل شبیه‌سازی DOM در Node.js و سپس سریالی‌سازی DOM متغیر می‌شود، در حالی که SSR در Vue هر زمان که امکان دارد به رشته های پیوسته کامپایل می شود، که به مراتب کارآمدتر است.

مدل کامپوننت Vue با توجه به این نیازها به عنوان یک سیستم منسجم طراحی شده است.

با یک تیم مهندسی ماهر، احتمالاً می‌توانید معادل آن را بر روی المنت‌های سفارشی اصلی بسازید - اما این همچنین به معنای به‌عهده‌گیری از بار نگهداری بلندمدت یک فریم‌ورک داخلی است، در حالی که از مزایای جامعه و اکوسیستم یک فریم‌ورک بالغ مانند Vue خارج می‌شوید.

همچنین فریم‌ورک‌هایی وجود دارند که با استفاده از المنت‌های سفارشی به عنوان پایه مدل کامپوننت خود ساخته شده‌اند، اما همگی ناگزیراً باید به راه‌حل‌های اختصاصی خود برای مشکلات فوق اشاره کنند. استفاده از این فریم‌ورک‌ها به معنای پذیرفتن تصمیمات فنی آن‌ها درباره چگونگی حل این مشکلات است - که علی‌رغم تبلیغات ممکن است به صورت خودکار شما را از مشکلات احتمالی آینده محافظت نکند.

همچنین برخی حوزه‌ها هستند که ما محدودیت‌های المنت‌های سفارشی را پیدا می‌کنیم:

- ارزیابی فوری اسلات مانع از ترکیب کامپوننت می‌شود. [اسلات‌های دارای اسکوپ](/guide/components/slots#scoped-slots) Vue یک مکانیسم قدرتمند برای ترکیب کامپوننت‌ها هست که به دلیل ماهیت فوری اسلات‌های اصلی، توسط المنت‌های سفارشی پشتیبانی نمی‌شوند. اسلات‌های فوری همچنین به این معناست که کامپوننت دریافت‌کننده نمی‌تواند زمان یا اینکه آیا یک قطعه از محتوای اسلات را ارائه کند یا خیر، کنترل کند.

- ارسال المنت‌های سفارشی با CSS محدود به اسکوپ shadow DOM امروزه نیازمند قرار دادن CSS درون JavaScript است تا بتوانند در زمان اجرا به shadow root ها تزریق شوند. این نیز به معنای [بروزرسانی‌هایی](https://github.com/whatwg/html/pull/4898/) است که در این زمینه در حال انجام است - اما تا به حال به صورت یکپارچه پشتیبانی نشده‌اند و هنوز نگرانی‌های کارآیی پروداکشن / SSR باید برطرف شوند. در همین حال، Vue SFC [مکانیزم های اسکوپینگ CSS](/api/sfc-css-features) را فراهم می‌کنند که از استخراج استایل‌ها به فایل‌های CSS ساده پشتیبانی می‌کنند.

Vue همیشه با آخرین استانداردهای پلتفرم وب همگام خواهد ماند، و اگر پلتفرم چیزی ارائه کند که کار ما را آسان‌تر کند، ما با خوشحالی از آن استفاده خواهیم کرد. با این حال، هدف ما ارائه راهکارهایی است که به خوبی کار کنند. این به این معناست که ما باید با یک دید انتقادی و توجه به ویژگی‌های جدید پلتفرم، آنها را یکپارچه کنیم - و این به معنای پر کردن شکاف‌ها در جایی است که استانداردها هنوز به‌طور کامل آنها را پوشش نداده‌اند تا زمانی که این موضوع وجود دارد.
