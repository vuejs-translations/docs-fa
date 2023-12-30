# Options: State {#options-state}

## دیتا {#data}

 یک تابع که مقدار reactive کامپوننت نمونه را برمی‌گرداند .

- **type**

  ```ts
  interface ComponentOptions {
    data?(
      this: ComponentPublicInstance,
      vm: ComponentPublicInstance
    ): object
  }
  ```

- **جزئیات**

  همانطور که انتظار می‌رود این تابع یک آبجکت ساده جاوااسکریپتی را برمی‌گرداند که توسط vue به صورت reactive ساخته می‌شود. وقتی نمونه ساخته شد، داده های آبجکت reactive توسط `this.$data` قابل دسترسی است. همچنین کامپوننت نمونه تمام ویژگی‌های موجود در داده آبجکت را پروکسی می‌کند، بنابراین `this.a` معادل با `this.$data.a` خواهد بود.

  تمام دیتای پراپرتی‌های مرتبه اول باید با دیتا آبجکت برگردانده شود. اضافه کردن ویژگی‌های جدید به this.$data امکان‌پذیر است، اما توصیه نمی‌شود. اگر مقدار مورد نظر یک ویژگی هنوز در دسترس نیست، می‌توان یک مقدار خالی مانند undefined یا null را به عنوان یک جایگزین قرار داد تا اطمینان حاصل شود که Vue می‌داند که ویژگی وجود دارد.

  ویژگی‌هایی که با `_` یا `$` شروع می‌شوند، **نباید** به صورت پروکسی در کامپوننت نمونه قرار گیرند زیرا ممکن است با ویژگی‌ها و روش‌های داخلی و API Vue تداخل داشته باشند. شما می‌توانید به آن‌ها توسط `this.$data._property` دسترسی داشته باشید.

  توصیه می‌شود که آبجکت‌هایی که دارای رفتار قابل تغییر مانند آبجکت‌های API مرورگر و خصوصیات پروتوتایپی خود می‌باشد، برگردانده نشود. بهتر است که آبجکت برگردانده شده یک آبجکت ساده باشد که تنها وضعیت کامپوننت را نشان می‌دهد.

- **مثال**

  ```js
  export default {
    data() {
      return { a: 1 }
    },
    created() {
      console.log(this.a) // 1
      console.log(this.$data) // { a: 1 }
    }
  }
  ```

توجه کنید که اگر از یک تابع arrow با ویژگی `data` استفاده کنید، `this` نمی‌تواند نمونه کامپوننت باشد، اما هنوز می‌توانید به نمونه به عنوان آرگومان اول تابع دسترسی داشته باشید.

  ```js
  data: (vm) => ({ a: vm.myProp })
  ```

- **اینجا را ببینید** [Reactivity in Depth](/guide/extras/reactivity-in-depth)

## پراپ‌ها {#props}

تعریف پراپ‌ها در یک کامپوننت.

- **تایپ**

  ```ts
  interface ComponentOptions {
    props?: ArrayPropsOptions | ObjectPropsOptions
  }

  type ArrayPropsOptions = string[]

  type ObjectPropsOptions = { [key: string]: Prop }

  type Prop<T = any> = PropOptions<T> | PropType<T> | null

  interface PropOptions<T> {
    type?: PropType<T>
    required?: boolean
    default?: T | ((rawProps: object) => T)
    validator?: (value: unknown, rawProps: object) => boolean
  }

  type PropType<T> = { new (): T } | { new (): T }[]
  ```

  > تایپ ها برای خوانایی ساده شده‌اند.

- **جزئیات**

  در Vue، همهٔ پراپ‌های کامپوننت باید به صورت صریح اعلام شوند. پراپ‌های کامپوننت می‌توانند به دو شکل اعلام شوند:

  - فرم ساده با استفاده از یک آرایه از رشته‌ها
  - فرم کامل با استفاده از یک آبجکت که هر کلید خاصیت نام پراپ است و مقدار آن نوع پراپ (یک تابع سازنده) یا گزینه‌های پیشرفته است.

  با استفاده از object-based، هر پراپ می‌تواند گزینه‌های زیر را تعریف کند:

  - **`type`**: می‌تواند یکی از سازندگان اصلی زیر باشد: `String`، `Number`، `Boolean`، `Array`، `Object`، `Date`، `Function`، `Symbol`، هر تابع سازنده سفارشی یا یک آرایه از آن‌ها. در حالت توسعه، Vue بررسی می‌کند که آیا مقدار یک پراپ با نوع اعلام شده مطابقت دارد و در صورت عدم مطابقت، یک هشدار را نمایش می‌دهد. برای اطلاعات بیشتر، به [اعتبارسنجی پراپ](/guide/components/props#prop-validation) مراجعه کنید.

    همچنین توجه کنید که یک پراپ با نوع `Boolean` رفتار تبدیل مقدار خود را در هر دو حالت توسعه و تولید تحت تأثیر قرار می‌دهد. برای اطلاعات بیشتر، به [تبدیل بولین](/guide/components/props#boolean-casting) مراجعه کنید.

  - **`default`**: یک مقدار پیش‌فرض برای پراپ تعیین می‌کند که در صورت عدم ارسال آن توسط والدین یا داشتن مقدار `undefined`، استفاده می‌شود. مقادیر پیش‌فرض شیء یا آرایه باید با استفاده از یک تابع سازنده برگردانده شوند. تابع سازنده همچنین آبجکت‌ها پراپ‌های خام را به عنوان آرگومان دریافت می‌کند.

  - **`required`**: در این قسمت از کد، می‌توانید مشخص کنید که آیا یک پراپ مورد نیاز است یا خیر. در محیطی که در آن برنامه در حال توسعه است، اگر این مقدار حقیقی باشد و پراپ ارسال نشود، یک هشدار در کنسول نمایش داده خواهد شد.

  - **`validator`**: در این قسمت از کد، یک تابع اعتبارسنجی سفارشی وجود دارد که مقدار پراپ را به عنوان تنها آرگومان دریافت می‌کند. در حالت توسعه، اگر این تابع یک مقدار غیرحقیقی (یعنی اعتبارسنجی ناموفق است) برگرداند، یک هشدار در کنسول نمایش داده خواهد شد.

- **نمونه**

  اعلام ساده:

  ```js
  export default {
    props: ['size', 'myMessage']
  }
  ```

  تعریف آبجکت همراه با اعتبار‌سنجنی:

  ```js
  export default {
    props: {
      // type check
      height: Number,
      // type check plus other validations
      age: {
        type: Number,
        default: 0,
        required: true,
        validator: (value) => {
          return value >= 0
        }
      }
    }
  }
  ```

- **این مطالب را هم ببینید**
  - [راهنما - پراپ‌ها](/guide/components/props)
  - [راهنما - Typing Component Props](/guide/typescript/options-api#typing-component-props) <sup class="vt-badge ts" />

## computed {#computed}

مقدار computed را برای قرار گرفتن در کامپونیت نمونه مشخص کنید

- **Type**

  ```ts
  interface ComponentOptions {
    computed?: {
      [key: string]: ComputedGetter<any> | WritableComputedOptions<any>
    }
  }

  type ComputedGetter<T> = (
    this: ComponentPublicInstance,
    vm: ComponentPublicInstance
  ) => T

  type ComputedSetter<T> = (
    this: ComponentPublicInstance,
    value: T
  ) => void

  type WritableComputedOptions<T> = {
    get: ComputedGetter<T>
    set: ComputedSetter<T>
  }
  ```

- **جزئیات**

در این روش یک آبجکت هر جا که یک `key` به نام یک مقدار computed باشد آن را می‌پذیرد
.و مقدار یا گیرنده computed است یا یک آبجکت با متد های `gey` یا `set` (برای computed هایی که مقدار های قابل نوشتن داشته باشند)

در این کد، ما می‌توانیم ویژگی‌های computed را با استفاده از یک آبجکت تعریف کنیم. هر ویژگی computed شامل یک نام و یک تابع محاسبه است. این تابع محاسبه می‌تواند یک تابع ساده باشد که مقدار computed را بر اساس مقادیر دیگر در کامپوننت برگرداند.

همچنین، ما می‌توانیم ویژگی‌های computed قابل تغییر را تعریف کنیم. برای این کار، باید یک آبجکت با دو متد `get` و `set` تعریف کنیم. متد `get` مقدار computed را برگردانده و متد `set` مقدار جدید را تنظیم می‌کند.

در نهایت، باید توجه کنیم که اگر از یک تابع `arrow` با ویژگی computed استفاده می‌کنیم، `this` به نمونه کامپوننت اشاره نخواهد کرد. اما می‌توانیم به نمونه کامپوننت به عنوان آرگومان اول تابع دسترسی داشته باشیم.

  ```js
  export default {
    computed: {
      aDouble: (vm) => vm.a * 2
    }
  }
  ```

- **مثال**

  ```js
  export default {
    data() {
      return { a: 1 }
    },
    computed: {
      // readonly
      aDouble() {
        return this.a * 2
      },
      // writable
      aPlus: {
        get() {
          return this.a + 1
        },
        set(v) {
          this.a = v - 1
        }
      }
    },
    created() {
      console.log(this.aDouble) // => 2
      console.log(this.aPlus) // => 2

      this.aPlus = 3
      console.log(this.a) // => 2
      console.log(this.aDouble) // => 4
    }
  }
  ```

- **همچنین ببینید**
  - [راهنما - Computed Properties](/guide/essentials/computed)
  - [راهنما - Typing Computed Properties](/guide/typescript/options-api#typing-computed-properties) <sup class="vt-badge ts" />

## متدها {#methods}

متدها را مشخص کنید که با کامپوننت نمونه میکس شود

- **Type**

  ```ts
  interface ComponentOptions {
    methods?: {
      [key: string]: (this: ComponentPublicInstance, ...args: any[]) => any
    }
  }
  ```

- **جزئیات**

متد‌های خواسته شده را می‌توان مستقیما در کامپوننت نمونه مشاهده کرد یا در template استفاده کرد. همه متد‌های دارای `this` وقتی که مقادیر را به اطراف پاس می‌کند به صورت اتوماتیک به کامپوننت نمونه متصل است

  هنگام استفاده از فاکشن arrow وقتی که متد‌ها را مشخص کرده‌اید توسط `this` به کامپوننت نمونه دسترسی ندارند

- **مثال**

  ```js
  export default {
    data() {
      return { a: 1 }
    },
    methods: {
      plus() {
        this.a++
      }
    },
    created() {
      this.plus()
      console.log(this.a) // => 2
    }
  }
  ```

- **See also** [Event Handling](/guide/essentials/event-handling)

## watch {#watch}

Declare watch callbacks to be invoked on data change.

- **Type**

  ```ts
  interface ComponentOptions {
    watch?: {
      [key: string]: WatchOptionItem | WatchOptionItem[]
    }
  }

  type WatchOptionItem = string | WatchCallback | ObjectWatchOptionItem

  type WatchCallback<T> = (
    value: T,
    oldValue: T,
    onCleanup: (cleanupFn: () => void) => void
  ) => void

  type ObjectWatchOptionItem = {
    handler: WatchCallback | string
    immediate?: boolean // default: false
    deep?: boolean // default: false
    flush?: 'pre' | 'post' | 'sync' // default: 'pre'
    onTrack?: (event: DebuggerEvent) => void
    onTrigger?: (event: DebuggerEvent) => void
  }
  ```

  >  تایپ ها برای خوانایی ساده شده‌اند.

- **جزئیات**

  گزینه watch یک آبجکت را صدا می‌زند که key این آبجکت نام خصوصیت های reative کامپوننت نمونه هستند که می‌خواهید آن ها را پایش کنید. این پراپرتی ها می‌تواند از طریق گزینه های `data` و  `computed` کامپوننت فراخوانی شود.مقادیر آبجکت watch توابع برگشتی هر خصوصیت پایش شده هستند که هنگام تغییر خصوصیت های پایش شده فراخوانی می‌شوند. هر تابع دو مقدار قدیم و جدید آرگومان را دریافت می‌کند

  به علاوه‌ی پراپرتی های root-level، key می‌تواند یک مسیر ساده نقطه‌گذاری شده باشد، به عنوان مثال `a.b.c`. لطفا توجه داشته باشید که این روش فقط از مسیرهای نقطه‌گذاری شده پشتیبانی می‌کند و از عبارات پیچیده **پشتیبانی نمی‌کند**. اگر منابع داده‌ای پیچیده را می‌خواهید پایش کنید، به جای آن از API `$watch()` استفاده کنید., use the imperative [`$watch()`](/api/component-instance#watch) API instead.

  مقدار می‌تواند رشته ای از نام متد (مشخص شده توسط `methods`) یا یک آبجکت همراه با گزینه‌های دلخواه باشد.هنگام استفاده از سینتکس آبجکت, کال‌بک در زیر فیلد `handler` تعیین می‌شود. مقادریر دلخواه می‌تواند :

  - **`immediate`** : بلافاصله بعد از watcher ساخته شده برمی‌گردد. مقدار قدیمی در اولین call کردن `undefined` برمی‌گرداند
  - **`deep`**: اجبار می‌کند که منبع آیا یک آبجکت است یا آرایه و آن را به صورت عمیق برمی‌گرداند. ببینید [Deep Watchers](/guide/essentials/watchers#deep-watchers).
  - **`flush`**: تنظیم کنید که چه زمانی مقدار را برگرداند. ببینید [Callback Flush Timing](/guide/essentials/watchers#callback-flush-timing) و [`watchEffect()`](/api/reactivity-core#watcheffect).
  - **`onTrack / onTrigger`**: دیباگ کردن وابستگی های watcher. ببینید [Watcher Debugging](/guide/extras/reactivity-in-depth#watcher-debugging).

  دقت کنید که هنگام استفاده از فاکشن arrow هنگامی که مقدار برگشتی را از watch نمی‌توانید بگیرید زیرا کامپوننت نمونه به `this` دسترسی ندارد

- **مثال**

  ```js
  export default {
    data() {
      return {
        a: 1,
        b: 2,
        c: {
          d: 4
        },
        e: 5,
        f: 6
      }
    },
    watch: {
      // watching top-level property
      a(val, oldVal) {
        console.log(`new: ${val}, old: ${oldVal}`)
      },
      // string method name
      b: 'someMethod',
      // the callback will be called whenever any of the watched object properties change regardless of their nested depth
      c: {
        handler(val, oldVal) {
          console.log('c changed')
        },
        deep: true
      },
      // watching a single nested property:
      'c.d': function (val, oldVal) {
        // do something
      },
      // the callback will be called immediately after the start of the observation
      e: {
        handler(val, oldVal) {
          console.log('e changed')
        },
        immediate: true
      },
      // you can pass array of callbacks, they will be called one-by-one
      f: [
        'handle1',
        function handle2(val, oldVal) {
          console.log('handle2 triggered')
        },
        {
          handler: function handle3(val, oldVal) {
            console.log('handle3 triggered')
          }
          /* ... */
        }
      ]
    },
    methods: {
      someMethod() {
        console.log('b changed')
      },
      handle1() {
        console.log('handle 1 triggered')
      }
    },
    created() {
      this.a = 3 // => new: 3, old: 1
    }
  }
  ```

- **همچنین ببینید** [Watchers](/guide/essentials/watchers)

## emits {#emits}

یک event سفارشی را با کامپوننت emit کنیم

- **Type**

  ```ts
  interface ComponentOptions {
    emits?: ArrayEmitsOptions | ObjectEmitsOptions
  }

  type ArrayEmitsOptions = string[]

  type ObjectEmitsOptions = { [key: string]: EmitValidator | null }

  type EmitValidator = (...args: unknown[]) => boolean
  ```

- **جزئیات**

  emited events می‌تواند به دو روش فراخوانی شود:

  - روش ساده: در این روش یک از یک آرایه از رشته‌ها استفاده می‌کنیم.
  - روش کامل : در این روش از یک آبجکت استفاده می‌کنیم که `key` هر پراپرتی برابر با نام یک `event` است, و مقدار یا `null` یا یک فاکشن ارزیابی validator است

  فاکشن validator آرگومان‌های انتخابی را پس از دریافت به کامپوننت `$emit` ارسال می‌کند.برای مثال, اگر `this.$emit(`foo`, 1)` صدا زده شود, متناظر validator برای `foo` آرگومان `1` را دریافت می‌کند.فاکشن validator می‌تواند یک booleon را برگرداند تا از صحت آرگومان مطمين شود.

  لطفا توجه کنید که `emits` بر روی event listeners کامپوننت تأثیر می‌گذارد، نه event listener DOM اصلی. event listeners های مشخص شده از آبجکت کامپوننت `$attrs` حذف خواهند شد، بنابراین المنت ها را به کامپوننت root بر نمی‌گرداند [Fallthrough Attributes](/guide/components/attrs) برای کسب اطلاعات بیشتر بخوانید.

- **مثال**

  Array syntax:

  ```js
  export default {
    emits: ['check'],
    created() {
      this.$emit('check')
    }
  }
  ```

  Object syntax:

  ```js
  export default {
    emits: {
      // no validation
      click: null,

      // with validation
      submit: (payload) => {
        if (payload.email && payload.password) {
          return true
        } else {
          console.warn(`Invalid submit event payload!`)
          return false
        }
      }
    }
  }
  ```

- **همچنین ببینید**
  - [راهنما - Fallthrough Attributes](/guide/components/attrs)
  - [راهنما - Typing Component Emits](/guide/typescript/options-api#typing-component-emits) <sup class="vt-badge ts" />

## expose {#expose}

مشخص کردن پراپرتی‌های عمومی وقتی که کامپوننت به پراپرتی ها توسط والد template refs دسترسی دارد

- **Type**

  ```ts
  interface ComponentOptions {
    expose?: string[]
  }
  ```

- **جزئیات**

به طور پیشفرض, یک کامپوننت instance تمام پراپرتی‌ها را در دسترس والد خود قرار می‌دهد و این برای حفظ محرمانگی برخی اطلاعات در `$parent` , `$root` یا template refs ایجاد مشکل می‌کند.

در اینجا ما از `expose` استفاده می‌کنیم. تنها پراپرتی‌هایی که نام آنها را نوشته اید هنگاهی که از `expose` استفاده می‌کنید به شما می‌دهد.تنها مقادیری که شما مشخص کرده اید در کامپوننت به صورت عمومی قابل دیدن است

`expose` تنها بر روی پراپرتی‌های کاربری تاثیر میگذارد و هیچ کدام از build-in properties های کامپوننت را فیلتر نمی‌کند

- **مثال**

  ```js
  export default {
    // only `publicMethod` will be available on the public instance
    expose: ['publicMethod'],
    methods: {
      publicMethod() {
        // ...
      },
      privateMethod() {
        // ...
      }
    }
  }
  ```
