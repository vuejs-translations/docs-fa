# API واکنش پذیری: توابع کاربردی {#reactivity-api-utilities}

## isRef() {#isref}

بررسی می‌کند که آیا یک مقدار، یک شی ref است یا خیر.

- **تایپ (Type)**

  ```ts
  function isRef<T>(r: Ref<T> | unknown): r is Ref<T>
  ```

  دقت کنید که مقدار بازگشتی یک [گزاره نوع](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates) است؛ که یعنی میتوان از `isRef` به عنوان یک نوع محافظتی استفاده کرد. 

  ```ts
  let foo: unknown
  if (isRef(foo)) {
    // foo's type is narrowed to Ref<unknown>
    foo.value
  }
  ```

## unref() {#unref}

اگر آرگومان یک ref باشد مقدار داخلی را برمی‌گرداند، در غیر این صورت خود آرگومان را برمی‌گرداند. این یک تابع ساده‌سازی شده برای `val = isRef(val) ? val.value : val` است. 

- **تایپ (Type)**

  ```ts
  function unref<T>(ref: T | Ref<T>): T
  ```

- **مثال**

  ```ts
  function useFoo(x: number | Ref<number>) {
    const unwrapped = unref(x)
    // اکنون تضمین می‌شود که این متغیر یک نوع عددی است.
  }
  ```

## toRef() {#toref}

میتوان از آن برای نرمال‌سازی و تبدیل مقدارها، refها و getterها به ref استفاده کرد. (از ورژن ۳.۳ به بالا)

همچنین برای ساخت یک ref از روی یک پروپرتی داخل یک شی واکنش‌پذیر، میتوان از این تابع استفاده کرد. ref ساخته شده با منبع آن همگام‌سازی می‌شود؛ یعنی با تغییر منبع، ref هم تغییر میکند و برعکس.

- **تایپ (Type)**

  ```ts
  // امضای نرمال‌سازی (3.3+)
  function toRef<T>(
    value: T
  ): T extends () => infer R
    ? Readonly<Ref<R>>
    : T extends Ref
    ? T
    : Ref<UnwrapRef<T>>

  // امضای پروپرتی شی
  function toRef<T extends object, K extends keyof T>(
    object: T,
    key: K,
    defaultValue?: T[K]
  ): ToRef<T[K]>

  type ToRef<T> = T extends Ref ? T : Ref<T>
  ```

- **مثال**

  امضای نرمال‌سازی (3.3+):

  ```js
  // ref های موجود را همانطور که هست برمی گرداند
  toRef(existingRef)

  // یک ref فقط خواندنی ایجاد می کند که هنگام دسترسی با .value گیرنده آن فراخوانی میشود.
  toRef(() => props.foo)

  // از مقادیر غیر تابعی ref های معمولی ایجاد می کند
  // معادل است با ref(1)
  toRef(1)
  ```

  امضای پروپرتی شی:

  ```js
  const state = reactive({
    foo: 1,
    bar: 2
  })

  // یک ref دو طرفه که با پروپرتی اصلی همگام می شود
  const fooRef = toRef(state, 'foo')

  // تغییر ref نسخه اصلی را به روز می کند
  fooRef.value++
  console.log(state.foo) // 2

  // تغییر در نسخه اصلی نیز ref را به روز می کند
  state.foo++
  console.log(fooRef.value) // 3
  ```

  توجه داشته باشید که این متفاوت است:

  ```js
  const fooRef = ref(state.foo)
  ```

  این ref با `state.foo` همگام نیست، زیرا `ref()` فقط یک مقداری عددی دریافت کرده است.
  
  `toRef()` هنگامی مفید است که میخواهید ref یک prop را به یک تابع ترکیب پذیر پاس دهید:

  ```vue
  <script setup>
  import { toRef } from 'vue'

  const props = defineProps(/* ... */)

  // تبدیل `props.foo` به یک ref, سپس پاس به یک ترکیب‌پذیر
  useSomeFeature(toRef(props, 'foo'))

  // سینتکس getter - از ورژن ۳.۳ به بعد توصیه می‌شود
  useSomeFeature(toRef(() => props.foo))
  </script>
  ```

  وقتی که از `toRef` با propهای کامپوننت استفاده میکنید، محدودیت تغییر prop همچنان اعمال میشود. تلاش برای اختصاص یک مقدار جدید به ref معادل تلاش برای تغییر مستقیم prop است و مجاز نیست. در آن سناریو ممکن است بخواهید از [`computed`](./reactivity-core#computed) با `get` و `set` استفاده کنید. برای اطلاعات بیشتر به راهنمای [استفاده از `v-model` با کامپوننت‌ها](/guide/components/v-model) مراجعه کنید.

  هنگام استفاده از امضای پروپرتی شی، `toRef()` یک ref قابل استفاده برمیگرداند حتی اگر پروپرتی منبع در حال حاضر وجود نداشته باشد. این کار با پروپرتی‌های اختیاری را ممکن می‌سازد، که توسط [`toRefs`](#torefs) قابل دریافت نیستند.

## toValue() <sup class="vt-badge" data-text="3.3+" /> {#tovalue}

مقدارها، refها و getterها را به مقدار نرمال‌سازی می‌کند. این شبیه به [unref()](#unref) است، با این تفاوت که getterها را نیز نرمال‌سازی می‌کند. اگر آرگومان getter باشد، فراخوانی می شود و مقدار برگشتی آن برگردانده می شود.

این را می توان در [ترکیب‌پذیرها](/guide/reusability/composables.html) برای نرمال‌سازی آرگومان استفاده کرد که می تواند مقدار، ref یا getter باشد.

- **تایپ (Type)**

  ```ts
  function toValue<T>(source: T | Ref<T> | (() => T)): T
  ```

- **مثال**

  ```js
  toValue(1) //       --> 1
  toValue(ref(1)) //  --> 1
  toValue(() => 1) // --> 1
  ```

  نرمال‌سازی آرگومان ها در ترکیب‌پذیرها:

  ```ts
  import type { MaybeRefOrGetter } from 'vue'

  function useFeature(id: MaybeRefOrGetter<number>) {
    watch(() => toValue(id), id => {
      // واکنش به تغییر id
    })
  }

  // این ترکیب‌پذیر همه این حالات را پشتیبانی میکند
  useFeature(1)
  useFeature(ref(1))
  useFeature(() => 1)
  ```

## toRefs() {#torefs}

یک شی واکنش‌پذیر را به یک شیء ساده تبدیل می کند که در آن هر پروپرتی از شیء به دست آمده یک ref است که به پروپرتی متناظر شی اصلی اشاره می کند. هر مرجع با استفاده از [`toRef()`](#toref) ایجاد می شود.

- **تایپ (Type)**

  ```ts
  function toRefs<T extends object>(
    object: T
  ): {
    [K in keyof T]: ToRef<T[K]>
  }

  type ToRef = T extends Ref ? T : Ref<T>
  ```

- **مثال**

  ```js
  const state = reactive({
    foo: 1,
    bar: 2
  })

  const stateAsRefs = toRefs(state)
  /*
  Type of stateAsRefs: {
    foo: Ref<number>,
    bar: Ref<number>
  }
  */

  // ref و پروپرتی اصلی به هم متصل اند.
  state.foo++
  console.log(stateAsRefs.foo.value) // 2

  stateAsRefs.foo.value++
  console.log(state.foo) // 3
  ```

  `toRefs` برای برگرداندن یک شی واکنشی از یک تابع ترکیب‌پذیر مفید است، به طوری که کامپوننت مصرف‌کننده می‌تواند شیء برگشتی را بدون از دست دادن واکنش‌پذیری، destructure یا spread کند:

  ```js
  function useFeatureX() {
    const state = reactive({
      foo: 1,
      bar: 2
    })

    // ...عملیات منطقی روی state

    // در هنگام بازگشت به refs تبدیل میشود
    return toRefs(state)
  }

  // میتوان destructure کرد بدون از دست دادن واکنش‌پذیری
  const { foo, bar } = useFeatureX()
  ```

  `toRefs` فقط برای پروپرتی‌هایی که در زمان فراخوانی روی شی مبدأ قابل شمارش هستند، ref ایجاد می کند. برای ایجاد ref برای پروپرتی ای که ممکن است هنوز وجود نداشته باشد، به جای آن از [`toRef`](#toref) استفاده کنید.

## isProxy() {#isproxy}

بررسی میکند که آیا یک شی، proxy ای است که توسط [`reactive()`](./reactivity-core#reactive), [`readonly()`](./reactivity-core#readonly), [`shallowReactive()`](./reactivity-advanced#shallowreactive) یا [`shallowReadonly()`](./reactivity-advanced#shallowreadonly) ساخته شده است یا خیر.

- **تایپ (Type)**

  ```ts
  function isProxy(value: unknown): boolean
  ```

## isReactive() {#isreactive}

بررسی میکند که آیا یک شی، proxy ای است که توسط [`reactive()`](./reactivity-core#reactive) یا [`shallowReactive()`](./reactivity-advanced#shallowreactive) ساخته شده است یا خیر.

- **تایپ (Type)**

  ```ts
  function isReactive(value: unknown): boolean
  ```

## isReadonly() {#isreadonly}

بررسی می کند که آیا مقدار ارسال شده، یک شی “فقط خواندنی” است یا خیر. پروپرتی‌های یک شی فقط خواندنی می‌تواند تغییر کند، اما نمی‌توان آنها را مستقیماً از طریق شی ارسال شده انتساب داد.

proxyهای ایجاد شده توسط [`readonly()`](./reactivity-core#readonly) و [`shallowReadonly()`](./reactivity-advanced#shallowreadonly) هر دو فقط خواندنی در نظر گرفته می شوند، همانطور که [`computed()`](./reactivity-core#computed) بدون تابع `set` فقط خواندنی در نظر گرفته می‌شود.

- **تایپ (Type)**

  ```ts
  function isReadonly(value: unknown): boolean
  ```
