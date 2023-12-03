# Options: State {#options-state}

## data {#data}

این یک تابع است که وضعیت راکتیو اولیه را برای نمونه کامپوننت برمی‌گرداند.

- **نوع**

  ```ts
  interface ComponentOptions {
    data?(
      this: ComponentPublicInstance,
      vm: ComponentPublicInstance
    ): object
  }
  ```

- **جزئیات**

  انتظار می‌رود که این تابع یک آبجکت ساده جاوا اسکریپتی را برگرداند که توسط Vue به صورت reactive قرار می‌گیرد. پس از ایجاد نمونه، آبجکت داده راکتیو به عنوان `this.$data` قابل دسترسی است. همچنین نمونه کامپوننت تمام ویژگی‌های موجود در آبجکت داده را پروکسی می‌کند، بنابراین `this.a` معادل با `this.$data.a` خواهد بود.

در اینجا آمده است که تمام ویژگی‌های داده سطح بالا باید در آبجکت داده برگردانده شوند. اضافه کردن ویژگی‌های جدید به this.$data امکان‌پذیر است، اما توصیه نمی‌شود. اگر مقدار مورد نظر یک ویژگی هنوز در دسترس نیست، می‌توان یک مقدار خالی مانند undefined یا null را به عنوان یک جایگزین قرار داد تا اطمینان حاصل شود که Vue می‌داند که ویژگی وجود دارد.

  ویژگی‌هایی که با `_` یا `$` شروع می‌شوند، **نباید** به صورت پروکسی در نمونه کامپوننت قرار گیرند زیرا ممکن است با ویژگی‌ها و روش‌های داخلی و API Vue تداخل داشته باشند. شما باید به آن‌ها به عنوان `this.$data._property` دسترسی داشته باشید.

این توصیه نمی‌شود که آبجکت‌هایی که دارای رفتار قابل تغییر مانند آبجکت‌ها API مرورگر و خصوصیات پروتوتایپی خود باشند، برگردانده شوند. بهتر است که آبجکت برگردانده شده یک آبجکت ساده باشد که تنها وضعیت کامپوننت را نشان می‌دهد.

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

توجه کنید که اگر از یک تابع arrow با ویژگی data استفاده کنید، this نمی‌تواند نمونه کامپوننت باشد، اما هنوز می‌توانید به نمونه به عنوان آرگومان اول تابع دسترسی داشته باشید.

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
    validator?: (value: unknown) => boolean
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

تعریف ویژگی‌های کامپیوت را بر روی نمونه کامپوننت اعلام کنید.

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

  گزینه یک آبجکت را قبول می‌کند که کلید آن نام ویژگی محاسبه شده است و مقدار آن یک getter محاسبه شده یا یک آبجکت با متدهای get و set است (برای ویژگی‌های محاسبه شده قابل نوشتن).

  همه getters و setters که دارای `this` هستند که به صورت خودکار به نمونه کامپوننت متصل می‌شوند.

  توجه کنید که اگر از یک تابع arrow با یک ویژگی محاسبه شده استفاده کنید، `this` به نمونه کامپوننت اشاره نخواهد کرد، اما هنوز می‌توانید به عنوان آرگومان اول تابع به نمونه دسترسی داشته باشید:

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

- **See also**
  - [Guide - Computed Properties](/guide/essentials/computed)
  - [Guide - Typing Computed Properties](/guide/typescript/options-api#typing-computed-properties) <sup class="vt-badge ts" />

## methods {#methods}

Declare methods to be mixed into the component instance.

- **Type**

  ```ts
  interface ComponentOptions {
    methods?: {
      [key: string]: (this: ComponentPublicInstance, ...args: any[]) => any
    }
  }
  ```

- **Details**

  Declared methods can be directly accessed on the component instance, or used in template expressions. All methods have their `this` context automatically bound to the component instance, even when passed around.

  Avoid using arrow functions when declaring methods, as they will not have access to the component instance via `this`.

- **Example**

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

  > Types are simplified for readability.

- **Details**

  The `watch` option expects an object where keys are the reactive component instance properties to watch (e.g. properties declared via `data` or `computed`) — and values are the corresponding callbacks. The callback receives the new value and the old value of the watched source.

  In addition to a root-level property, the key can also be a simple dot-delimited path, e.g. `a.b.c`. Note that this usage does **not** support complex expressions - only dot-delimited paths are supported. If you need to watch complex data sources, use the imperative [`$watch()`](/api/component-instance#watch) API instead.

  The value can also be a string of a method name (declared via `methods`), or an object that contains additional options. When using the object syntax, the callback should be declared under the `handler` field. Additional options include:

  - **`immediate`**: trigger the callback immediately on watcher creation. Old value will be `undefined` on the first call.
  - **`deep`**: force deep traversal of the source if it is an object or an array, so that the callback fires on deep mutations. See [Deep Watchers](/guide/essentials/watchers#deep-watchers).
  - **`flush`**: adjust the callback's flush timing. See [Callback Flush Timing](/guide/essentials/watchers#callback-flush-timing) and [`watchEffect()`](/api/reactivity-core#watcheffect).
  - **`onTrack / onTrigger`**: debug the watcher's dependencies. See [Watcher Debugging](/guide/extras/reactivity-in-depth#watcher-debugging).

  Avoid using arrow functions when declaring watch callbacks as they will not have access to the component instance via `this`.

- **Example**

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

- **See also** [Watchers](/guide/essentials/watchers)

## emits {#emits}

Declare the custom events emitted by the component.

- **Type**

  ```ts
  interface ComponentOptions {
    emits?: ArrayEmitsOptions | ObjectEmitsOptions
  }

  type ArrayEmitsOptions = string[]

  type ObjectEmitsOptions = { [key: string]: EmitValidator | null }

  type EmitValidator = (...args: unknown[]) => boolean
  ```

- **Details**

  Emitted events can be declared in two forms:

  - Simple form using an array of strings
  - Full form using an object where each property key is the name of the event, and the value is either `null` or a validator function.

  The validation function will receive the additional arguments passed to the component's `$emit` call. For example, if `this.$emit('foo', 1)` is called, the corresponding validator for `foo` will receive the argument `1`. The validator function should return a boolean to indicate whether the event arguments are valid.

  Note that the `emits` option affects which event listeners are considered component event listeners, rather than native DOM event listeners. The listeners for declared events will be removed from the component's `$attrs` object, so they will not be passed through to the component's root element. See [Fallthrough Attributes](/guide/components/attrs) for more details.

- **Example**

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

- **See also**
  - [Guide - Fallthrough Attributes](/guide/components/attrs)
  - [Guide - Typing Component Emits](/guide/typescript/options-api#typing-component-emits) <sup class="vt-badge ts" />

## expose {#expose}

Declare exposed public properties when the component instance is accessed by a parent via template refs.

- **Type**

  ```ts
  interface ComponentOptions {
    expose?: string[]
  }
  ```

- **Details**

  By default, a component instance exposes all instance properties to the parent when accessed via `$parent`, `$root`, or template refs. This can be undesirable, since a component most likely has internal state or methods that should be kept private to avoid tight coupling.

  The `expose` option expects a list of property name strings. When `expose` is used, only the properties explicitly listed will be exposed on the component's public instance.

  `expose` only affects user-defined properties - it does not filter out built-in component instance properties.

- **Example**

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
