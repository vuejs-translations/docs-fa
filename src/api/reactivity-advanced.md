# Reactivity API: مفاهیم پیشرفته {#reactivity-api-advanced}

## shallowRef {#shallowref}

نسخه سطحی یا Shallow از [`ref`](./reactivity-core#ref).

- **تایپ**

  ```ts
  function shallowRef<T>(value: T): ShallowRef<T>

  interface ShallowRef<T> {
    value: T
  }
  ```

- **جزییات**

برخلاف `ref`، مقدار درونی یک `shallowRef` همانطور که هست ذخیره و بازیابی می شود و عمیقا reactive نمی‌شود. فقط دسترسی مقدار «value» از آن reactive خواهد بود.

   ‍`shallowRef` معمولاً برای بهینه‌سازی عملکرد داده ساختار های بزرگ و یا ادغام با سیستم‌های مدیریت state خارجی، استفاده می‌شود.

- **مثال**

  ```js
  const state = shallowRef({ count: 1 })

  // باعث بروز تغییر نمی شود
  state.value.count = 2

  // باعث بروز تغییر می شود
  state.value = { count: 2 }
  ```
  تنها زمانی بروز تغییر اتفاق می افتد که reference مقدار `value` تغییر کرده باشد.

- **این مطالب را هم ببینید**
  - [راهنما - کاهش هزینه‌ی بیش از حد واکنش‌پذیری برای ساختارهای بزرگِ غیرقابل تغییر](/guide/best-practices/performance#reduce-reactivity-overhead-for-large-immutable-structures)
  - [راهنما - یکپارچه‌سازی با سیستم‌های مدیریت state خارجی](/guide/extras/reactivity-in-depth#integration-with-external-state-systems)

## triggerRef {#triggerref}

این تابع Effect هایی را که به یک [shallow ref](#shallowref) وابسه هستند، به صورت اجباری، اجرا می کند. از این تابع معمولا زمانی استفاده می شود که بر روی value داخلی یک `shallowRef` تغییرات عمیق (تغییراتی که reference را تغییر نمی دهند) انجام شده باشد.


- **تایپ**

  ```ts
  function triggerRef(ref: ShallowRef): void
  ```

- **مثال**

  ```js
  const shallow = shallowRef({
    greet: 'Hello, world'
  })

  // Logs "Hello, world" once for the first run-through
  watchEffect(() => {
    console.log(shallow.value.greet)
  })

  // This won't trigger the effect because the ref is shallow
  shallow.value.greet = 'Hello, universe'

  // Logs "Hello, universe"
  triggerRef(shallow)
  ```

## customRef {#customref}

این تابع، یک ref سفارشی با امکان کنترل صریح ردیابی وابستگی (Dependency-Tracking) و زمان بروزرسانی، ایجاد می‌کند.

- **تایپ**

  ```ts
  function customRef<T>(factory: CustomRefFactory<T>): Ref<T>

  type CustomRefFactory<T> = (
    track: () => void,
    trigger: () => void
  ) => {
    get: () => T
    set: (value: T) => void
  }
  ```

- **جزییات**

`customRef` انتظار یک تابع Factory دارد. این تابع Factory، توابع `track` و `trigger` را به عنوان آرگومان دریافت کرده و باید یک شی را با متدهای `get` و `set` برگرداند.

   به طور کلی، `track` باید در داخل `get`، و `trigger` باید در داخل `set` فراخوانی شود. با این حال، کنترل اینکه چه زمانی باید آنها را فراخوانی کرد یا اینکه آیا اصلاً نیازی به فراخوانی آنها است یا خیر، با شماست.

- **مثال**

ایجاد یک ref تاخیر خورده (Debounced) که فقط پس از یک بازه زمانی مشخص از آخرین فراخوانی `set`، مقدار را به‌روزرسانی می‌کند:

  ```js
  import { customRef } from 'vue'

  export function useDebouncedRef(value, delay = 200) {
    let timeout
    return customRef((track, trigger) => {
      return {
        get() {
          track()
          return value
        },
        set(newValue) {
          clearTimeout(timeout)
          timeout = setTimeout(() => {
            value = newValue
            trigger()
          }, delay)
        }
      }
    })
  }
  ```

استفاده از آن در کامپوننت:

  ```vue
  <script setup>
  import { useDebouncedRef } from './debouncedRef'
  const text = useDebouncedRef('hello')
  </script>

  <template>
    <input v-model="text" />
  </template>
  ```

  [در Playground امتحان کنید](https://play.vuejs.org/#eNplUkFugzAQ/MqKC1SiIekxIpEq9QVV1BMXCguhBdsyaxqE/PcuGAhNfYGd3Z0ZDwzeq1K7zqB39OI205UiaJGMOieiapTUBAOYFt/wUxqRYf6OBVgotGzA30X5Bt59tX4iMilaAsIbwelxMfCvWNfSD+Gw3++fEhFHTpLFuCBsVJ0ScgUQjw6Az+VatY5PiroHo3IeaeHANlkrh7Qg1NBL43cILUmlMAfqVSXK40QUOSYmHAZHZO0KVkIZgu65kTnWp8Qb+4kHEXfjaDXkhd7DTTmuNZ7MsGyzDYbz5CgSgbdppOBFqqT4l0eX1gZDYOm057heOBQYRl81coZVg9LQWGr+IlrchYKAdJp9h0C6KkvUT3A6u8V1dq4ASqRgZnVnWg04/QWYNyYzC2rD5Y3/hkDgz8fY/cOT1ZjqizMZzGY3rDPC12KGZYyd3J26M8ny1KKx7c3X25q1c1wrZN3L9LCMWs/+AmeG6xI=)

## shallowReactive {#shallowreactive}

نسخه سطحی یا Shallow از  [`reactive`](./reactivity-core#reactive).

- **تایپ**

  ```ts
  function shallowReactive<T extends object>(target: T): T
  ```

- **جزییات**
  
برخلاف `reactive`، فقط ویژگی های سطح اول یا ریشه، به شکل reactive هستند. مقادیر ویژگی‌ها همانطور که هست ذخیره و بازیابی می شود - این همچنین به این معنی است که ویژگی‌های تعریف شده با `ref` به‌طور خودکار Unwrap **نمی‌شوند**.


  :::warning با احتیاط استفاده کنید
  داده ساختار های Shallow، صرفا باید برای State های سطح اول یا ریشه استفاده شوند. از Nest کردن آن در یک شی که به شکل عمیق Reactive است (همانند ref)، پرهیز کنید، چراکه با این کار، درخت Dependency Tracking نا پایدار شده و باعث ایجاد مشکل در فهم و یا Debug کد می شود.
  :::

- **مثال**

  ```js
  const state = shallowReactive({
    foo: 1,
    nested: {
      bar: 2
    }
  })

  // mutating state's own properties is reactive
  state.foo++

  // ...but does not convert nested objects
  isReactive(state.nested) // false

  // NOT reactive
  state.nested.bar++
  ```

## shallowReadonly {#shallowreadonly}

نسخه سطحی یا Shallow از [`readonly`](./reactivity-core#readonly).

- **تایپ**

  ```ts
  function shallowReadonly<T extends object>(target: T): Readonly<T>
  ```

- **جزییات**
  
برخلاف `readonly`، فقط ویژگی های سطح اول یا ریشه، به شکل readonly هستند. مقادیر ویژگی‌ها همانطور که هست ذخیره و بازیابی می شود - این همچنین به این معنی است که ویژگی‌های تعریف شده با `ref` به‌طور خودکار Unwrap **نمی‌شوند**.


 :::warning با احتیاط استفاده کنید
  داده ساختار های Shallow، صرفا باید برای State های سطح اول یا ریشه استفاده شوند. از Nest کردن آن در یک شی که به شکل عمیق Reactive است (همانند ref)، پرهیز کنید، چراکه با این کار، درخت Dependency Tracking نا پایدار شده و باعث ایجاد مشکل در فهم و یا Debug کد می شود.
  :::

- **مثال**

  ```js
  const state = shallowReadonly({
    foo: 1,
    nested: {
      bar: 2
    }
  })

  // mutating state's own properties will fail
  state.foo++

  // ...but works on nested objects
  isReadonly(state.nested) // false

  // works
  state.nested.bar++
  ```

## toRaw {#toraw}

شیء خام و اصلی یک پروکسی ایجاد شده از Vue را برمی گرداند.

- **تایپ**

  ```ts
  function toRaw<T>(proxy: T): T
  ```

- **جزییات**

`toRaw` می تواند شی اصلی که به کمک یکی از توابع [`reactive`](./reactivity-core#reactive), [`readonly`](./reactivity-core#readonly), [`shallowReactive`](#shallowreactive) و یا [`shallowReadonly`](#shallowreadonly) ایجاد شده است، برگرداند.

این یک ترفند است که می‌تواند برای خواندن موقت بدون نیاز به دسترسی به Proxy / سربار Dependency Tracking و یا نوشتن بدون ایجاد Reactive Effect استفاده شود. اینکه یک ارجاع مدارم به خروجی این تابع داشته باشید، **توصیه نمی شود**. با احتیاط استفاده کنید.

- **مثال**

  ```js
  const foo = {}
  const reactiveFoo = reactive(foo)

  console.log(toRaw(reactiveFoo) === foo) // true
  ```

## markRaw {#markraw}

یک شی را طوری علامت گذاری می کند که هرگز به Proxy تبدیل نشود و به عنوان خروجی، خود شی را برمی گرداند.

- **تایپ**

  ```ts
  function markRaw<T extends object>(value: T): T
  ```

- **مثال**

  ```js
  const foo = markRaw({})
  console.log(isReactive(reactive(foo))) // false

  // also works when nested inside other reactive objects
  const bar = reactive({ foo })
  console.log(isReactive(bar.foo)) // false
  ```

  :::warning با احتیاط استفاده کنید
  markRaw و APIهای سطحی مانند shallowReactive به شما این امکان را می دهند که به طور انتخابی یا Opt-in از تبدیل عمیق reactive/readonly، که به صورت پیش فرض انجام می شود، خودداری کنید و اشیاء Raw و غیر Proxy شده را در گراف State خود قرار کنید. دلیل استفاده از این API ها می تواند موارد زیر باشد:


  - برخی مقادیر، نیازی به Reactive شدن ندارند، برای مثال، یک شی پیچیده از کلاس کتابخانه Third-Party و یا یک شی کامپوننت Vue.
  
  - Skip کردن تبدیل Proxy، می‌تواند هنگام رندر فهرست‌های بزرگ با منابع داده Immutable و یا غیر قابل تغییر،  عملکرد را بهبود بخشد.

  این API ها پیشرفته در نظر گرفته می شوند، چراکه Skip کردن Reactivity صرفا در سطح ریشه است، بنابراین اگر یک شی تودرتو که با markRaw علامت گذاری نشده را در یک شی Reactive تنظیم کنید و سپس دوباره به آن دسترسی پیدا کنید، نسخه Proxy شده آن را دریافت می کنید. این می تواند منجر به **خطرات هویتی** شود - یعنی انجام عملیاتی که بر هویت شی متکی است، اما از هر دو نسخه Raw و Proxy یک شی استفاده می کند:

  ```js
  const foo = markRaw({
    nested: {}
  })

  const bar = reactive({
    // although `foo` is marked as raw, foo.nested is not.
    nested: foo.nested
  })

  console.log(foo.nested === bar.nested) // false
  ```

  خطرات هویتی به طور کلی نادر هستند. با این حال، برای استفاده صحیح از این APIها و همچنین اجتناب از خطرات هویتی، نیاز به درک کاملی از نحوه عملکرد سیستم واکنش پذیری وجود دارد.

  :::

## effectScope {#effectscope}

یک شی Effect Scope ایجاد می کند که می تواند Effect های Reactivity (همانند `computed` و یا `watch`) ایجاد شده در خود را نگه دارد تا این Effect ها با هم حذف شوند. برای موارد استفاده دقیق از این API، لطفاً به [RFC](https://github.com/vuejs/rfcs/blob/master/active-rfcs/0041-reactivity-effect-scope.md) مربوطه آن مراجعه کنید .


- **تایپ**

  ```ts
  function effectScope(detached?: boolean): EffectScope

  interface EffectScope {
    run<T>(fn: () => T): T | undefined // undefined if scope is inactive
    stop(): void
  }
  ```

- **مثال**

  ```js
  const scope = effectScope()

  scope.run(() => {
    const doubled = computed(() => counter.value * 2)

    watch(doubled, () => console.log(doubled.value))

    watchEffect(() => console.log('Count: ', doubled.value))
  })

  // to dispose all effects in the scope
  scope.stop()
  ```

## getCurrentScope {#getcurrentscope}

[effect scope](#effectscope) فعال را (در صورتی که اصلا وجود داشته باشد) بر می گرداند.

- **تایپ**

  ```ts
  function getCurrentScope(): EffectScope | undefined
  ```

## onScopeDispose {#onscopedispose}

ثبت یک Callback بر روی رویداد پاک شدن [effect scope](#effectscope) فعال. این Callback زمانی فراخوانی می شود که Effect Scope متوقف شده باشد.

این تابع می تواند به عنوان جایگزین `onUnmounted`، در توابع Composition استفاده شود با این تفاوت که وابستگی به خود کامپوننت نخواهد داشت. عدم این وابستی بدین خاطر است که تابع `setup` از کامپوننت Vue، خود در یک Effect Scope اجرا می شود.

- **تایپ**

  ```ts
  function onScopeDispose(fn: () => void): void
  ```
