# اپلیکیشن API {#application-api}

## createApp()‎ {#createapp}

  یک نمونه یا instance از اپلیکیشن را می‌سازد.

- **تایپ**

  ```ts
  function createApp(rootComponent: Component, rootProps?: object): App
  ```

- **جزئیات**

  آرگومان اول، کامپوننت ریشه(root) است. آرگومان دوم اختیاری‌ست و شامل پراپ‌هایی می شود که به کامپوننت اصلی ارسال می‌گردد.

- **مثال**

  با استفاده از کامپوننت ریشه در همان خط کد:

  ```js
  import { createApp } from 'vue'

  const app = createApp({
    /* گزینه‌های کامپوننت اصلی */
  })
  ```

  با استفاده از کامپوننت فراخوانی‌شده:

  ```js
  import { createApp } from 'vue'
  import App from './App.vue'

  const app = createApp(App)
  ```

- **مشاهده بیشتر** [راهنما - ساخت یک اپلیکیشن Vue](/guide/essentials/application)

## createSSRApp()‎ {#createssrapp}

نمونه‌ای از برنامه را در حالت [  فعال سازی سمت سرور  (SSR Hydration)](/guide/scaling-up/ssr#client-hydration) ایجاد می‌کند. استفاده از آن دقیقاً مانند `createApp()` است.

## app.mount()‎ {#app-mount}

 نمونه ای از برنامه را در یک المان قرار می دهد. این کار باعث می‌شود که برنامه‌ی شما به صورت تعاملی درون آن المان قرار بگیرد و تغییرات و عملکرد مربوط به برنامه در آن المان نمایش داده شود.

- **تایپ**

  ```ts
  interface App {
    mount(rootContainer: Element | string): ComponentPublicInstance
  }
  ```

- **جزئیات**

  آرگومان می‌تواند یک المان در DOM یا یک سلکتور CSS باشد (اولین المان منطبق با سلکتور ، استفاده می شود) و نمونه اصلی کامپوننت را برمی‌گرداند.

  اگر کامپوننت دارای یک قالب یا تابع باشد، هر گونه نود DOM موجود درون آن را جایگزین خواهد کرد. در غیر این صورت، اگر کامپایلر زمان اجرا در دسترس باشد، `innerHTML` کامپوننت به عنوان قالب استفاده خواهد شد.

   وقتی از "فعال‌سازی سمت سرور" یا SSR استفاده شده، صفحه‌های وب ابتدا روی سرور ساخته می شوند و بعد به مرورگر فرستاده می شوند. این فرآیند به کمک "تغذیه نودهای DOM" که درون یک قسمت خاص از صفحه قرار دارند، انجام می شود. اگر چیزی با خروجی مورد نظر ([عدم تطابق](/guide/scaling-up/ssr#hydration-mismatch)) داشته باشد، بخش‌های مختلف صفحه در مرورگر تغییر می‌کنند تا به خروجی درست برسند.

  از `mount()‎` می‌توان فقط یک بار برای هر نمونه از برنامه استفاده کرد.

- **مثال**

  ```js
  import { createApp } from 'vue'
  const app = createApp(/* ... */)

  app.mount('#app')
  ```

  همچنین می‌تواند به یک المان واقعی در DOM متصل شود.

  ```js
  app.mount(document.body.firstChild)
  ```

## app.unmount()‎ {#app-unmount}

  این عبارت باعث غیر فعال کردن یک نمونه برنامه‌ای که قبلاً راه‌اندازی شده است می‌شود و همچنین با فعال‌سازی چرخهٔ عمر لغو (the unmount lifecycle)، رویدادهای لغو برای تمامی کامپوننت‌ها در درخت کامپوننت‌های برنامه را راه اندازی می‌کند.

- **تایپ**

  ```ts
  interface App {
    unmount(): void
  }
  ```

## app.component()‎ {#app-component}

اگر نام و تعریف کامپوننت هر دو به عنوان ورودی داده شود ، یک کامپوننت به صورت گلوبال ثبت می‌شود. اما اگر فقط نام داده شود، کامپوننتی که قبلاً ثبت شده، بازیابی می شود.

- **تایپ**

  ```ts
  interface App {
    component(name: string): Component | undefined
    component(name: string, component: Component): this
  }
  ```

- **مثال**

  ```js
  import { createApp } from 'vue'

  const app = createApp({})

  // register an options object
  app.component('my-component', {
    /* ... */
  })

  // retrieve a registered component
  const MyComponent = app.component('my-component')
  ```

- **مشاهده بیشتر** [ثبت المان](/guide/components/registration)

## app.directive()‎ {#app-directive}

اگر هر دو آرگومان نام و تعریف دایرکتیو به عنوان ورودی داده شود، یک دستور سفارشی گلوبال ثبت می‌شود، و یا اگر فقط نام داده شود، یک دستور سفارشی که قبلاً ثبت شده باشد، بازیابی می‌شود.

- **تایپ**

  ```ts
  interface App {
    directive(name: string): Directive | undefined
    directive(name: string, directive: Directive): this
  }
  ```

- **جزئیات**

  ```js
  import { createApp } from 'vue'

  const app = createApp({
    /* ... */
  })

  // register (object directive)
  app.directive('my-directive', {
    /* custom directive hooks */
  })

  // register (function directive shorthand)
  app.directive('my-directive', () => {
    /* ... */
  })

  // retrieve a registered directive
  const myDirective = app.directive('my-directive')
  ```

- **مشاهده بیشتر** [دایرکتیوهای شخصی سازی شده](/guide/reusability/custom-directives)

## app.use()‎ {#app-use}

 یک [پلاگین](/guide/reusability/plugins) را نصب می کند.

- **تایپ**

  ```ts
  interface App {
    use(plugin: Plugin, ...options: any[]): this
  }
  ```

- **جزئیات**

  اولین آرگومان این تابع باید پلاگین باشد و آرگومان دوم اختیاری است و گزینه‌های پلاگین را مشخص می‌کند.

  پلاگین می‌تواند یک شیء با یک متد `install()‎` باشد یا فقط یک تابع که به عنوان متد `install()‎` استفاده می‌شود. گزینه‌ها (آرگومان دوم `app.use()‎`) به متد `install()‎` پلاگین منتقل می‌شوند.

  وقتی `app.use()` بر روی یک پلاگین چندبار فراخوانی شود، پلاگین فقط یک بار نصب می‌شود.

- **مثال**

  ```js
  import { createApp } from 'vue'
  import MyPlugin from './plugins/MyPlugin'

  const app = createApp({
    /* ... */
  })

  app.use(MyPlugin)
  ```

- **مشاهده بیشتر** [پلاگین ها](/guide/reusability/plugins)

## app.mixin()‎ {#app-mixin}

 یک میکسین گلوبال را اعمال می‌کند که محدود به برنامه است.  این میکسین گزینه‌های خود را برای هر نمونه از کامپوننت‌ها در برنامه اعمال می‌کند.

:::warning توصیه نمی شود
در Vue 3، میکسین‌ها به‌طور عمده برای سازگاری با نسخه‌های قدیمی استفاده می‌شوند که در کتابخانه‌های مختلف رواج داشتند. اما بهتر است از استفاده از میکسین‌ها، به‌ویژه میکسین‌های گلوبال، در کد برنامه پرهیز شود.

برای استفاده مجدد از قطعات منطقی، بهتر است به جای میکسین‌ها، از [ترکیب‌پذیرها](/guide/reusability/composables) استفاده کنید.
:::

- **تایپ**

  ```ts
  interface App {
    mixin(mixin: ComponentOptions): this
  }
  ```

## app.provide()‎ {#app-provide}

یک مقدار ارائه می دهد که می‌تواند به همه‌ی کامپوننت‌های زیرمجموعه داخل برنامه تزریق شود.

- **تایپ**

  ```ts
  interface App {
    provide<T>(key: InjectionKey<T> | symbol | string, value: T): this
  }
  ```

- **جزئیات**

   از کلید به عنوان آرگومان اول و مقدار ارائه شده به عنوان آرگومان دوم استفاده می‌کند. خود نمونه‌ی برنامه را برمی‌گرداند.
  
- **مثال**

  ```js
  import { createApp } from 'vue'

  const app = createApp(/* ... */)

  app.provide('message', 'hello')
  ```

  درون یک کامپوننت در برنامه:

  <div class="composition-api">

  ```js
  import { inject } from 'vue'

  export default {
    setup() {
      console.log(inject('message')) // 'hello'
    }
  }
  ```

  </div>
  <div class="options-api">

  ```js
  export default {
    inject: ['message'],
    created() {
      console.log(this.message) // 'hello'
    }
  }
  ```

  </div>

- **مشاهده بیشتر**
  - [Provide / Inject](/guide/components/provide-inject)
  - [App-level Provide](/guide/components/provide-inject#app-level-provide)
  - [app.runWithContext()](#app-runwithcontext)

## app.runWithContext()‎<sup class="vt-badge" data-text="3.3+" /> {#app-runwithcontext}

از برنامه فعلی به عنوان زمینه استفاده و یک تابع بازگشتی (callback) انجام می دهد.

- **تایپ**

  ```ts
  interface App {
    runWithContext<T>(fn: () => T): T
  }
  ```

- **جزئیات**

  یک تابع بازگشتی فوراً اجرا می‌شود. در زمان اجرای همزمان این تابع، فراخوانی‌های `inject()` می‌توانند از مقادیری که برنامه فعلی فراهم کرده استفاده کنند، حتی اگر هیچ نمونه فعالی از کامپوننت وجود نداشته باشد. همچنین، مقدار بازگشتی از تابع بازگشتی به عنوان نتیجه برگشت داده می‌شود.

- **مثال**

  ```js
  import { inject } from 'vue'

  app.provide('id', 1)

  const injected = app.runWithContext(() => {
    return inject('id')
  })

  console.log(injected) // 1
  ```

## app.version {#app-version}

 این نسخه‌ی Vue که برای ساخت برنامه استفاده شده را ، فراهم می‌کند. به خصوص برای استفاده در [پلاگین‌ها](/guide/reusability/plugins) که ممکن است نیاز به منطق شرطی بر اساس نسخه‌های مختلف Vue داشته باشند.

- **تایپ**

  ```ts
  interface App {
    version: string
  }
  ```

- **مثال**

  در حال انجام بررسی نسخه داخل یک پلاگین:

  ```js
  export default {
    install(app) {
      const version = Number(app.version.split('.')[0])
      if (version < 3) {
        console.warn('This plugin requires Vue 3')
      }
    }
  }
  ```

- **مشاهده بیشتر** [Global API - version](/api/general#version)

## app.config {#app-config}

هر نمونه از برنامه، یک شیء `config` را دارد که حاوی تنظیمات پیکربندی آن برنامه است. می‌توانید ویژگی‌های آن را که در زیر توضیح داده شده‌اند، قبل از نصب برنامه، تغییر دهید.

```js
import { createApp } from 'vue'

const app = createApp(/* ... */)

console.log(app.config)
```

## app.config.errorHandler {#app-config-errorhandler}

 یک ناظر گلوبال برای خطاهای ناشناخته که از داخل برنامه منتشر می‌شوند تعیین میکند.

- **تایپ**

  ```ts
  interface AppConfig {
    errorHandler?: (
      err: unknown,
      instance: ComponentPublicInstance | null,
      // `info` اطلاعات خطای مربوط به Vue است،
     // به عنوان مثال، کدام هوک Lifecycle باعث این خطا شده است
      info: string
    ) => void
  }
  ```

- **جزئیات**

  ناظر خطا سه آرگومان را دریافت می‌کند: خطا، نمونه کامپوننتی که باعث خطا شد، و یک رشته اطلاعات که تایپ منبع خطا را مشخص می‌کند.

   می‌تواند خطاها را از منابع زیر گرفته و نگه دارد:

  - رندر کردن کامپوننت
  - ناظران رویداد (Event handlers)
  - هوک‌های چرخه‌ی عمر (Lifecycle hooks)
  - تابع `setup()‎`
  - ناظرها
  - هوک‌های دایرکتیو شخصی سازی شده
  - هوک‌های ترنزیشن

  :::tip نکته
  در محیط تولید، آرگومان سوم (`info`) به جای رشته اطلاعات کامل، کد کوتاه‌شده‌ای خواهد بود. شما می‌توانید نگاشت کد به رشته را در رفرنس خطای کد پروداکشن پیدا کنید.
  :::

- **مثال**

  ```js
  app.config.errorHandler = (err, instance, info) => {
    // مدیریت خطا، مثلاً گزارش به یک سرویس
  }
  ```

## app.config.warnHandler {#app-config-warnhandler}

  یک ناظر سفارشی برای هشدارهای زمان اجرای Vue تعیین می کند.

- **تایپ**

  ```ts
  interface AppConfig {
    warnHandler?: (
      msg: string,
      instance: ComponentPublicInstance | null,
      trace: string
    ) => void
  }
  ```

- **جزئیات**

  ناظر هشدار پیام هشدار را به عنوان آرگومان اول، نمونه کامپوننت منبع را به عنوان آرگومان دوم و یک رشته‌ی ردیابی کامپوننت را به عنوان آرگومان سوم دریافت می‌کند.

   این برای فیلتر کردن هشدارهای خاص و کاهش تعداد پیام‌های کنسول استفاده می‌شود. تمام هشدارهای Vue باید در طول توسعه رفع شوند، بنابراین این تنها در جلسات دیباگ برای تمرکز بر روی هشدارهای خاص پیشنهاد می‌شود و باید پس از اتمام دیباگ حذف شود.

  :::tip نکته
   هشدارها تنها در حالت توسعه کار می‌کنند، بنابراین این تنظیمات در حالت پروداکشن نادیده گرفته می‌شود.
  :::

- **مثال**

  ```js
  app.config.warnHandler = (msg, instance, trace) => {
    // `trace` is the component hierarchy trace
  }
  ```

## app.config.performance {#app-config-performance}

برای رصد عملکرد کامپوننت‌ها و مراحل init، compile، render و patch در پنل کارایی/زمانبندی ابزار توسعه مرورگر، این مقدار را `true` قرار دهید. این ویژگی تنها در حالت توسعه و در مرورگرهایی که [performance.mark](https://developer.mozilla.org/en-US/docs/Web/API/Performance/mark) API را پشتیبانی می‌کنند، فعال می‌شود.

- **تایپ:** `boolean`

- **مشاهده بیشتر** [راهنما - کارایی](/guide/best-practices/performance)

## app.config.compilerOptions {#app-config-compileroptions}

 این شیء، گزینه‌های کامپایلر را در زمان اجرا تنظیم می‌کند. مقادیر تنظیم شده در این شیء به کامپایلر منتقل می‌شوند و بر روی هر کامپوننت در برنامه تأثیر می‌گذارند. می‌توانید این گزینه‌ها را برای هر کامپوننت به صورت جداگانه با استفاده از گزینه [`compilerOptions`](/api/options-rendering#compileroptions) تغییر دهید.

::: warning هشدار
 
   این تنظیم تنها زمانی معتبر است که از نسخه کامل (مانند vue.js که قالب‌ها را در مرورگر کامپایل می‌کند) استفاده می‌کنید. اگر از نسخه در حال اجرا با build setup استفاده می‌کنید، باید گزینه‌های کامپایلر را از طریق تنظیمات به @vue/compiler-dom منتقل کنید.

  - برای `vue-loader`: از طریق گزینه [`compilerOptions`](https://vue-loader.vuejs.org/options.html#compileroptions) در لودر، این تنظیمات را پاس دهید. همچنین می‌توانید نحوه [پیکربندی](https://cli.vuejs.org/guide/webpack.html#modifying-options-of-a-loader) آن در `vue-cli` را مشاهده کنید.

  - برای `vite`: از طریق گزینه‌های `@vitejs/plugin-vue` این تنظیمات را [اعمال](https://github.com/vitejs/vite-plugin-vue/tree/main/packages/plugin-vue#options) کنید.
  :::

### app.config.compilerOptions.isCustomElement {#app-config-compileroptions-iscustomelement}

  یک متد برای شناسایی عناصر سفارشی نیتیو تعیین می کند.

- **تایپ:** `(tag: string) => boolean`

- **جزئیات**
   این تابع باید در صورت نیاز به شناسایی یک تگ به عنوان یک عنصر سفارشی نیتیو، مقدار `true` را بازگرداند. در صورت همخوانی یک تگ با این الگو، Vue آن را به به جای سعی در تفسیر آن به عنوان یک کامپوننت  به عنوان یک عنصر نیتیو نمایش می‌دهد .

   تگ‌های HTML و SVG به طور خودکار توسط پارسر Vue شناسایی می‌شوند و نیازی به تطابق در این تابع ندارند.
- **مثال**

  ```js
  // همه‌ی تگ‌هایی که با 'ion-' شروع می‌شوند را به عنوان عناصر سفارشی در نظر بگیرید.
  app.config.compilerOptions.isCustomElement = (tag) => {
    return tag.startsWith('ion-')
  }
  ```

- **مشاهده بیشتر** [Vue and Web Components](/guide/extras/web-components)

### app.config.compilerOptions.whitespace {#app-config-compileroptions-whitespace}

این تنظیمات حالت مدیریت فضای خالی (whitespace) را در قالب تغییر می‌دهد.

- **تایپ:** `'condense' | 'preserve'`

- **پیش فرض:** `'condense'`

- **جزئیات**

  Vue از فضای خالی در قالب‌ها برای تولید خروجی کامپایل شده‌ای که بهینه‌تر استفاده می‌شود، استفاده می‌کند. این فضاهای خالی را حذف یا فشرده می‌کند. استراتژی پیش‌فرض آن "condense" است با این رفتارها:

1. حروف فضای خالی در ابتدا و انتهای داخل یک المان به یک فضای خالی کاهش می‌یابند.
2. حروف فضای خالی بین المان‌ها، از جمله خطوط جدید، حذف می‌شوند.
3. حروف فضای خالی متوالی در گره‌های متنی به یک فضای خالی کاهش می‌یابند.

تنظیم این گزینه به `'preserve'` باعث غیرفعال شدن مورد (2) و (3) می‌شود.

- **مثال**

  ```js
  app.config.compilerOptions.whitespace = 'preserve'
  ```

### app.config.compilerOptions.delimiters {#app-config-compileroptions-delimiters}

این تنظیمات، جداکننده های (delimiter) مورد استفاده برای رفتار متن در قالب را تعیین می‌کند.

- **تایپ:** `[string, string]`

- **پیش فرض:** `{{ "['\u007b\u007b', '\u007d\u007d']" }}`

- **جزئیات**

  این معمولاً برای جلوگیری از تداخل با چارچوب‌های سمت سرور استفاده می‌شود که از دستورات مشابه mustache استفاده می‌کنند.
- **مثال**

  ```js
  // جداکننده ها به سبک تمپلیت استرینگ ES6 تغییر کردند
  app.config.compilerOptions.delimiters = ['${', '}']
  ```

### app.config.compilerOptions.comments {#app-config-compileroptions-comments}

این تنظیمات مربوط به رفتار کامنت‌های HTML در قالب‌ها است.

- **تایپ:** `boolean`

- **پیش فرض:** `false`

- **جزئیات**

  به طور پیش‌فرض، Vue در حالت پروداکشن ، نظرات(comments)  را حذف می‌کند. تنظیم این گزینه به مقدار `true` باعث می شود Vue، حتی در حالت پروداکشن نیز نظرات را حفظ کند. نظرات همیشه در حالت توسعه حفظ می‌شوند. این گزینه معمولاً زمانی استفاده می‌شود که Vue با کتابخانه‌های دیگری که وابسته به نظرات HTML هستند، استفاده می‌شود.

- **مثال**

  ```js
  app.config.compilerOptions.comments = true
  ```

## app.config.globalProperties {#app-config-globalproperties}

یک شیء است که می‌توان برای ثبت ویژگی‌های سراسری استفاده کرد که در هر نمونه‌ی کامپوننت داخل برنامه قابل دسترسی باشند.

- **تایپ:**

  ```ts
  interface AppConfig {
    globalProperties: Record<string, any>
  }
  ```

- **جزئیات**

  این یک جایگزین برای `Vue.prototype` در Vue 2 است که در Vue 3 دیگر وجود ندارد. همانطور که با هر ویژگی سراسری، باید با احتیاط استفاده شود.
  
  اگر یک خصوصیت سراسری با یک خصوصیت مشابه درون کامپوننت تداخل داشته باشد، خصوصیت کامپوننت اولویت بیشتری خواهد داشت.

  - **مورد استفاده**

  ```js
  app.config.globalProperties.msg = 'hello'
  ```
  این باعث می‌شود که `msg`، در قالب هر کامپوننتی در برنامه و همچنین در `this`  هر نمونه‌ای از کامپوننت در دسترس قرار گیرد.

  ```js
  export default {
    mounted() {
      console.log(this.msg) // 'hello'
    }
  }
  ```

- **مشاهده بیشتر** [راهنما - افزودن ویژگی‌های سراسری](/guide/typescript/options-api#augmenting-global-properties) <sup class="vt-badge ts" />

## app.config.optionMergeStrategies {#app-config-optionmergestrategies}

  این شیء برای تعیین رویکردهای ادغام برای گزینه‌های سفارشی کامپوننت‌ها مورد استفاده قرار می‌گیرد.
- **تایپ**

  ```ts
  interface AppConfig {
    optionMergeStrategies: Record<string, OptionMergeFunction>
  }

  type OptionMergeFunction = (to: unknown, from: unknown) => any
  ```

- **جزئیات**

  برخی از پلاگین‌ها/کتابخانه‌ها قادرند پشتیبانی برای گزینه‌های سفارشی کامپوننت را اضافه کنند (با استفاده از تزریق mixins سراسری). این گزینه‌ها ممکن است به منطق ادغام خاصی نیاز داشته باشند، به‌ویژه زمانی که همان گزینه باید از منابع مختلف (مثلاً mixins یا ارث بری کامپوننت) "ادغام" شود.

  یک تابع استراتژی ادغام برای یک گزینه سفارشی می‌تواند با اختصاص آن به عنوان کلید با نام گزینه در شیء `app.config.optionMergeStrategies` ثبت شود.

  تابع استراتژی ادغام مقدار آن گزینه را از نمونه‌های والدین و فرزندان به ترتیب به عنوان آرگومان اول و دوم دریافت می‌کند.

- **مثال**

  ```js
  const app = createApp({
    // گزینه های خودش
    msg: 'Vue',
    // گزینه های میکسین
    mixins: [
      {
        msg: 'Hello '
      }
    ],
    mounted() {
      // گزینه های ادغام شده در معرض this.$options
      console.log(this.$options.msg)
    }
  })

  // یک استراتژی ادغام سفارشی برای `msg` تعریف می کند
  app.config.optionMergeStrategies.msg = (parent, child) => {
    return (parent || '') + (child || '')
  }

  app.mount('#app')
  // 'Hello Vue' را لاگ میگیرد
  ```

- **مشاهده بیشتر** [نمونه کامپوننت  - `$options`](/api/component-instance#options)
