# نمونه کامپوننت (component instance) {#component-instance}

:::info
این صفحه پراپرتی‌ها و توابع داخلی که در نمونه عمومی (public instance) کامپوننت exposed شده یعنی `this` را مستند سازی می‌کند.

تمام پراپرتی‌هایی که در این صفحه لیست شده اند readonly هستند (به غیر از پراپرتی‌های تو در تو در `data$`)
:::

## data$ {#data}

آبجکت بازگردانده شده از آپشن [`data`](./options-state#data) که توسط کامپوننت reactive شده. نمونه کامپوننت دسترسی به پراپرتی‌ها روی ابجکت data خودش را پراکسی می‌کند.

- **تایپ (Type)**

  ```ts
  interface ComponentPublicInstance {
    $data: object
  }
  ```

## props$ {#props}

این آبجکت prop های کنونی resolve شده کامپوننت را نشان میدهد.

- **تایپ (Type)**

  ```ts
  interface ComponentPublicInstance {
    $props: object
  }
  ```

- **جزئیات**

  تنها propهای تعریف شده توسط [`props`](./options-state#props) شامل این آبجکت خواهند شد. کامپوننت نمونه دسترسی به پراپرتی‌ها روی آبجکت props را پراکسی می‌کند.

## el$ {#el}

همان root DOM node است که نمونه کامپوننت در حال مدیریت آن است.

- **تایپ (Type)**

  ```ts
  interface ComponentPublicInstance {
    $el: Node | undefined
  }
  ```

- **جزئیات**

  مقدار `el$` برابر با `undefined` خواهد بود تا زمانی که کامپوننت [mounted](./options-lifecycle#mounted) شود.
  
    - برای کامپوننت‌هایی که یک المنت root دارند `el$` به آن المنت اشاره خواهد کرد.
  - برای کامپوننت‌هایی که متن (text) به عنوان root دارند `el$` به text node اشاره خواهد کرد.
  - برای کامپوننت‌هایی که چندین root node دارند `el$` همان placeholder DOM node خواهد بود که Vue برای پیگیری کردن از موقعیت کامپوننت‌ها در DOM استفاده می‌کند (یک text node یا یک comment node در حالت SSR hydration)

  :::tip نکته
  برای ثبات بهتر توصیه می‌شود که از [template refs](/guide/essentials/template-refs) برای دسترسی مستقیم به المنت‌ها به جای `el$` استفاده کنید.
  :::

## options$ {#options}

  آپشن‌های resolved شده کامپوننت که برای نمونه سازی از نمونه کامپوننت کنونی استفاده شده است.

- **تایپ (Type)**

  ```ts
  interface ComponentPublicInstance {
    $options: ComponentOptions
  }
  ```

- **جزئیات**
  
  آبجکت `options$` آپشن‌های resolve شده برای کامپوننت کنونی را نمایش می‌دهد و حاصل ادغام این منابع ممکن است:

  - mixinهای سراسری
  - کامپوننت‌های بر پایه `extends`
  - mixinهای کامپوننت

  معمولا برای پشتیبانی از آپشن‌های سفارشی کامپوننت استفاده می‌شود:

  ```js
  const app = createApp({
    customOption: 'foo',
    created() {
      console.log(this.$options.customOption) // => 'foo'
    }
  })
  ```

- **همچنین ببینید** [`app.config.optionMergeStrategies`](/api/application#app-config-optionmergestrategies)

## parent$ {#parent}

پراپرتی parent$ اگر نمونه جاری یک والد داشته باشد شامل نمونه والد (parent instance) است. برای خود نمونه ریشه (root instance) پراپرتی parent$ برابر با مقدار `null` خواهد بود.

- **تایپ (Type)**

  ```ts
  interface ComponentPublicInstance {
    $parent: ComponentPublicInstance | null
  }
  ```

## root$ {#root}

نمونه کامپوننت ریشه متعلق به درخت کامپوننت (component tree) کنونی. اگر نمونه کنونی والدی نداشته باشد این مقدار برابر با خودش خواهد بود.

- **تایپ (Type)**

  ```ts
  interface ComponentPublicInstance {
    $root: ComponentPublicInstance
  }
  ```

## slots$ {#slots}

یک ابجکت که [اسلات‌های](/guide/components/slots) pass شده توسط کامپوننت والد را منتشر می‌کند.

- **تایپ (Type)**

  ```ts
  interface ComponentPublicInstance {
    $slots: { [name: string]: Slot }
  }

  type Slot = (...args: any[]) => VNode[]
  ```

- **جزئیات**


  معمولا زمانی که به شکل دستی در حال ساخت [render functionها](/guide/extras/render-function) هستیم از آن استفاده می‌شود اما همچنین می‌تواند برای تشخیص اینکه یک اسلات موجود است یا خیر استفاده شود.
  هر اسلات روی `this.$slots` به عنوان یک تابع که یک آرایه از vnodeها را برمی‌گرداند را منتشر می‌کند که متصل به کلید مربوط به نام آن اسلات است. اسلات پیش‌فرض به عنوان this.$slots.default منتشر شده است.

  اگر یک اسلات یک [scoped slot](/guide/components/slots#scoped-slots) باشد آرگومان‌های پاس داده شده به توابع slot به عنوان slot props در دسترس slot قرار می‌گیرند.

- **همچنین ببینید** [Render Functions - Rendering Slots](/guide/extras/render-function#rendering-slots)

## refs$ {#refs}

یک آبجکت از المنت‌های DOM و نمونه‌های کامپوننت که توسط [template refs](/guide/essentials/template-refs) ثبت شده‌اند.

- **تایپ (Type)**

  ```ts
  interface ComponentPublicInstance {
    $refs: { [name: string]: Element | ComponentPublicInstance | null }
  }
  ```

- **همچنین ببینید**

  - [Template refs](/guide/essentials/template-refs)
  - [Special Attributes - ref](./built-in-special-attributes.md#ref)

## attrs$ {#attrs}

یک آبجکت که شامل ویژگی‌های fallthrough متعلق به کامپوننت است.

- **تایپ (Type)**

  ```ts
  interface ComponentPublicInstance {
    $attrs: object
  }
  ```

- **جزئیات**

  [Fallthrough Attributes](/guide/components/attrs) ویژگی‌ها و event handler هایی هستند که توسط کامپوننت والد پاس داده می‌شوند اما به عنوان یک prop یا یک emitted event توسط کامپوننت فرزند تعریف نشده‌اند.

  اگر فقط یک المنت ریشه وجود داشته باشد به صورت پیش‌فرض همه چیز در ‍`attrs$` به صورت خودکار بر روی المنت ریشه کامپوننت به ارث برده می‌شود . اگر کامپوننت چندین node ریشه‌ای داشته باشد این رفتار غیر فعال می‌شود. این رفتار می‌تواند به صورت مشخص با آپشن [`inheritAttrs`](./options-misc#inheritattrs) غیر فعال شود.

- **همچنین ببینید**

  - [Fallthrough Attributes](/guide/components/attrs)

## ()watch$ {#watch}

یک API دستوری برای ساخت wathcerها.

- **تایپ (Type)**

  ```ts
  interface ComponentPublicInstance {
    $watch(
      source: string | (() => any),
      callback: WatchCallback,
      options?: WatchOptions
    ): StopHandle
  }

  type WatchCallback<T> = (
    value: T,
    oldValue: T,
    onCleanup: (cleanupFn: () => void) => void
  ) => void

  interface WatchOptions {
    immediate?: boolean // default: false
    deep?: boolean // default: false
    flush?: 'pre' | 'post' | 'sync' // default: 'pre'
    onTrack?: (event: DebuggerEvent) => void
    onTrigger?: (event: DebuggerEvent) => void
  }

  type StopHandle = () => void
  ```

- **جزئیات**

  اولین آرگومان منبع watch است که می‌تواند یک string نام متعلق به یک پراپرتی از یک کامپوننت، یک dot-delimited path string، یک string ساده و یا یک تابع getter باشد.

  دومین آرگومان یک تابع callback است. این تابع مقدار جدید و قدیم متعلق به منبع watch را دریافت می‌کند.
  
  - **`immediate`**: تابع callback را بلافاصله در موقع ساخت watcher فراخوانی می‌کند. در فراخوانی اول مقدار قدیمی `undefined` خواهد بود.
  - **`deep`**: اگر منبع یک آبجکت باشد پیمایش عمیق (deep traversal) را روی آن تحمیل می‌کند و تابع callback هنگام تغییرات عمیق (deep mutations) روی آبجکت فراخوانی می‌شود. همچنین [Deep Watchers](/guide/essentials/watchers#deep-watchers) را مطالعه کنید.
  - **`flush`**: زمانبندی flush مربوط به تابع  callback را تنظیم می‌کند. همچنین [Callback Flush Timing](/guide/essentials/watchers#callback-flush-timing) و [`()watchEffect`](/api/reactivity-core#watcheffect) را مطالعه کنید.
  - **`onTrack / onTrigger`**: برای دیباگ کردن وابستگی‌های watcher استفاده می‌شود. همچنین [Watcher Debugging](/guide/extras/reactivity-in-depth#watcher-debugging) را مطالعه کنید.

- **مثال**

  watch کردن نام یک پراپرتی:

  ```js
  this.$watch('a', (newVal, oldVal) => {})
  ```

  Watch کردن یک مسیر dot-delimited:

  ```js
  this.$watch('a.b', (newVal, oldVal) => {})
  ```

  استفاده از getter برای عبارات پیچیده تر:

  ```js
  this.$watch(
    // every time the expression `this.a + this.b` yields
    // a different result, the handler will be called.
    // It's as if we were watching a computed property
    // without defining the computed property itself.
    () => this.a + this.b,
    (newVal, oldVal) => {}
  )
  ```

  متوقف کردن یک watcher:

  ```js
  const unwatch = this.$watch('a', cb)

  // later...
  unwatch()
  ```

- **همچنین ببینید**
  - [Options - `watch`](/api/options-state#watch)
  - [Guide - Watchers](/guide/essentials/watchers)

## ()emit$ {#emit}

فراخوانی یک رویداد سفارشی روی نمونه (instance) حاضر. هر آرگومان اضافه‌ای به تابع callback متعلق به listener پاس داده می‌شود.

- **تایپ (Type)**

  ```ts
  interface ComponentPublicInstance {
    $emit(event: string, ...args: any[]): void
  }
  ```

- **نمونه**

  ```js
  export default {
    created() {
      // only event
      this.$emit('foo')
      // with additional arguments
      this.$emit('bar', 1, 2, 3)
    }
  }
  ```

- **همچنین ببینید**

  - [کامپوننت‌ها - رویدادها](/guide/components/events)
  - [آپشن `emits`](./options-state#emits)

## ()forceUpdate$ {#forceupdate}

نمونه کامپوننت را مجبور می‌کند تا دوباره رندر (re-render) شوند.

- **تایپ (Type)**

  ```ts
  interface ComponentPublicInstance {
    $forceUpdate(): void
  }
  ```

- **جزئیات**
  
  با توجه به سیستم خودکار reactivity متعلق به Vue این به ندرت مورد نیاز قرار میگیرد. تنها زمانی به آن نیاز دارید که شما در یک کامپوننت به صورت مشخص یک non-reactive state در کامپوننت به کمک reactivity API ها ایجاد کرده باشید.

## ()nextTick$ {#nexttick}

نسخه Instance-bound از نسخه سراسری [`()nextTick`](./general#nexttick).

- **تایپ (Type)**

  ```ts
  interface ComponentPublicInstance {
    $nextTick(callback?: (this: ComponentPublicInstance) => void): Promise<void>
  }
  ```

- **جزئیات**

  تنها تفاوت نسبت به نسخه سراسری `()nextTick` این است که callback پاس داده شده به `()this.$nextTick` دارای ‍`this` context  متصل شده به نمونه فعلی کامپوننت خواهد بود.

- **همچنین ببینید** [`()nextTick`](./general#nexttick)
