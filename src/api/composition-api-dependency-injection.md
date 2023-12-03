# Composition API: <br>تزریق وابستگی (Dependency Injection) {#composition-api-dependency-injection}

##  متد ()provide {#provide}

یک مقدار 
(value)
 را برای 
 inject 
 کردن در کامپوننتهای فرزند فراهم میکند.

- **تایپ (Type)**

  ```ts
  function provide<T>(key: InjectionKey<T> | string, value: T): void
  ```

- **جزئیات**

  تابع `()provide` دو ورودی قبول میکند. کلید (key) که میتواند از نوع string یا symbol باشد و مقدار (value) برای inject کردن.

 در زمان استفاده از تایپ اسکریپت کلید (‌key) میتواند یک symbol  باشد که به `InjectionKey` کست (cast) شده - یک utility type فراهم شده توسط Vue که ‍‍`Symbol` را extends میکند و میتواند برای همگام سازی (sync) تایپ مقدار (value) بین `()provide` و ‍`()inject` استفاده شود.

مشابه API های ثبت  lifecycle hook تابع `()provide` باید به صورت همزمان (synchronous) در طول مرحله ‍‍`()setup` متعلق به کامپوننت فراخوانی شود.

- **مثالها**

  ```vue
  <script setup>
  import { ref, provide } from 'vue'
  import { countSymbol } from './injectionSymbols'

  // provide static value
  provide('path', '/project/')

  // provide reactive value
  const count = ref(0)
  provide('count', count)

  // provide with Symbol keys
  provide(countSymbol, count)
  </script>
  ```

- **همچنین ببینید**
  - [Guide - Provide / Inject](/guide/components/provide-inject)
  - [Guide - Typing Provide / Inject](/guide/typescript/composition-api#typing-provide-inject) <sup class="vt-badge ts" />

## تابع ()inject {#inject}
یک مقدار که توسط کامپوننت‌های اجداد  (ancestor) یا خود اپلیکیشن (توسط ()app.provide) فراهم (provide) شده است را inject میکند.

- **تایپ (Type)**

  ```ts
  // without default value
  function inject<T>(key: InjectionKey<T> | string): T | undefined

  // with default value
  function inject<T>(key: InjectionKey<T> | string, defaultValue: T): T

  // with factory
  function inject<T>(
    key: InjectionKey<T> | string,
    defaultValue: () => T,
    treatDefaultAsFactory: true
  ): T
  ```

- **جزئیات**

  اولین آرگومان Injection Key است. Vue از زنجیره والدین بالا می‌رود تا یک مقدار provide شده با کلید همسان پیدا کند. اگر چندین کامپوننت در زنجیره والدین همان کلید را فراهم کنند، کامپوننتی که به کامپوننت  inject کننده (injecting component) نزدیک‌تر است، مقادیر بالاتر در زنجیره را "shadow" میکند. اگر هیچ مقداری با کلید همسان پیدا نشد، تابع `()inject` مقدار undefined را بر می‌گرداند مگر اینکه یک مقدار پیش‌فرض فراهم شده باشد.

دومین آرگومان اختیاری است و مقدار پیشفرضی است برای استفاده در زمانی که هیچ مقداری پیدا نشده باشد.

دومین آرگومان میتواند یک تابع فکتوری (factory function) باشد که مقادیری را که هزینه ساخت انها زیاد است را بر میگرداند. در این مورد ‍‍مقدار `true` باید به عنوان سومین آرگومان ارسال (pass) شود که نشان دهد تابع باید به عنوان فکتوری استفاده شود و نه خود مقدار (value).

مشابه API های ثبت  lifecycle hook تابع `()inject` 
 باید به صورت همزمان (synchronous) در طول مرحله ‍‍`()setup` متعلق به کامپوننت فراخوانی شود.

در زمان استفاده از تایپ اسکریپت کلید (key) میتواند از تایپ `InjectionKey` باشد -  یک utility type فراهم شده توسط Vue که ‍‍`Symbol` را extends میکند و میتواند برای همگام سازی (sync) تایپ مقدار (value) بین `()provide` و ‍`()inject` استفاده شود.


- **مثالها**

 فرض میکنیم یک کامپوننت والد مقادیری را فراهم میکند همانطور که در مثال قبل برای `()provide` نمایش داده شد:

  ```vue
  <script setup>
  import { inject } from 'vue'
  import { countSymbol } from './injectionSymbols'

  // inject static value without default
  const path = inject('path')

  // inject reactive value
  const count = inject('count')

  // inject with Symbol keys
  const count2 = inject(countSymbol)

  // inject with default value
  const bar = inject('path', '/default-path')

  // inject with function default value
  const fn = inject('function', () => {})

  // inject with default value factory
  const baz = inject('factory', () => new ExpensiveObject(), true)
  </script>
  ```

## تابع ()hasInjectionContext <sup class="vt-badge" data-text="3.3+" /> {#has-injection-context}

این تابع وقتی [()inject](#inject) را بتوان بدون هشدار (warning) درباره فراخوانی در محل اشتباه فراخوانی کرد مقدار true برمیگرداند (برای مثال بیرون از تابع ()setup). این تابع برای استفاده توسط کتابخانه ها طراحی شده که میخواهند از تابع `()inject` به صورت داخلی بدون trigger کردن هشدار به کاربر استفاده کنند.

- **تایپ (Type)**

  ```ts
  function hasInjectionContext(): boolean
  ```

* ** همچنین ببینید **
  - [Guide - Provide / Inject](/guide/components/provide-inject)
  - [Guide - Typing Provide / Inject](/guide/typescript/composition-api#typing-provide-inject) <sup class="vt-badge ts" />
