# Reactivity API: هسته {#reactivity-api-core}

:::info همچنین ببینید
برای درک بهتر API های Reactivity، توصیه می‌شود فصل‌های زیر در راهنما را بخوانید:

- [مبانی Reactivity](/guide/essentials/reactivity-fundamentals) (با اولویت APIای که روی Composition API تنظیم شده است)
- [Reactivity به صورت عمیق](/guide/extras/reactivity-in-depth)
  :::

## ref()‎ {#ref}

یک مقدار داخلی می‌گیرد و یک ref Object قابل تغییر (mutable) و reactive برمی‌گرداند که یک پراپرتی تکی به شکل `‎.value` دارد که به همان مقدار داخلی اشاره می‌کند.

- **تایپ (Type)**

  ```ts
  function ref<T>(value: T): Ref<UnwrapRef<T>>

  interface Ref<T> {
    value: T
  }
  ```

- **جزئیات**

  ‌ref object گفته شده قابل تغییر است - یعنی شما می‌توانید به `‎.value` مقدار جدید نسبت دهید. همچنین reactive است یعنی هر عملیات خواندن که مربوط به `‎.value` است رهگیری (tracked) می‌شود.

  اگر یک آبجکت به عنوان یک مقدار از ref در نظر گرفته شود، آن آبجکت با [reactive()‎](#reactive) عمیقا reactive می‌شود. این جمله همچنین به این معنی است که اگر آن آبجکت ref های تو در تو داشته باشد آنها عمیقا از پوشش خارج می‌شوند (unwrapped).

  برای جلوگیری از تبدیل عمیق (deep conversion) می‌توانید به جای ref از [`shallowRef()‎`](./reactivity-advanced#shallowref) استفاده کنید.

- **مثال**

  ```js
  const count = ref(0)
  console.log(count.value) // 0

  count.value = 1
  console.log(count.value) // 1
  ```

- **همچنین ببینید**
  - [راهنما - مبانی Reactivity با `ref()‎`](/guide/essentials/reactivity-fundamentals#ref)
  - [راهنما - Typing `ref()‎`](/guide/typescript/composition-api#typing-ref) <sup class="vt-badge ts" />

## computed()‎ {#computed}

یک تابع getter می‌گیرد و به ازای مقدار بازگشت داده شده از getter یک آبجکت [ref](#ref) که readonly و reactive است را برمی‌گرداند. همچنین می‌تواند یک آبجکت با تابع‌های `get` و `set` برای ایجاد یک آبجکت ref که writable است را بگیرد.

- **تایپ (Type)**

  ```ts
  // read-only
  function computed<T>(
    getter: (oldValue: T | undefined) => T,
    // see "Computed Debugging" link below
    debuggerOptions?: DebuggerOptions
  ): Readonly<Ref<Readonly<T>>>

  // writable
  function computed<T>(
    options: {
      get: (oldValue: T | undefined) => T
      set: (value: T) => void
    },
    debuggerOptions?: DebuggerOptions
  ): Ref<T>
  ```

- **مثال**

  ایجاد کردن یک computed ref که readonly است:

  ```js
  const count = ref(1)
  const plusOne = computed(() => count.value + 1)

  console.log(plusOne.value) // 2

  plusOne.value++ // error
  ```

  ایجاد کردن یک computed ref که writable است:

  ```js
  const count = ref(1)
  const plusOne = computed({
    get: () => count.value + 1,
    set: (val) => {
      count.value = val - 1
    }
  })

  plusOne.value = 1
  console.log(count.value) // 0
  ```

  دیباگ کردن:

  ```js
  const plusOne = computed(() => count.value + 1, {
    onTrack(e) {
      debugger
    },
    onTrigger(e) {
      debugger
    }
  })
  ```

- **همچنین ببینید**
  - [راهنما - پراپرتی‌‌های Computed](/guide/essentials/computed)
  - [راهنما - دیباگ کردن Computed ](/guide/extras/reactivity-in-depth#computed-debugging)
  - [راهنما - Typing `computed()‎`](/guide/typescript/composition-api#typing-computed) <sup class="vt-badge ts" />
  - [راهنما - کارایی - Computed Stability](/guide/best-practices/performance#computed-stability) <sup class="vt-badge" data-text="3.4+" />

## reactive()‎ {#reactive}

یک پروکسی reactive از آبجکت را بر‌می‌گرداند.

- **تایپ (Type)**

  ```ts
  function reactive<T extends object>(target: T): UnwrapNestedRefs<T>
  ```

- **جزئیات**

  تبدیل reactive عمیق است: روی تمام پراپرتی‌های تو در تو اثر می‌گذارد. همچنین یک آبجکت reactive در عین حالی که reactivity حفظ می‌کند به شکل عمیق هر پراپرتی‌ای که [refs](#ref) است را unwrapped می‌کند.

  همچنین لازم به ذکر است که وقتی ref به عنوان یک المنت از یک آرایه‌ی reactive یا یک تایپ مجموعه‌ی بومی (native collection) مانند `Map` قابل دسترسی است هیچ ref unwrapping صورت نمی‌گیرد.

  برای جلوگیری از تبدیل عمیق و برای نگه‌داشتن reactivity تنها در سطح root به جای reactive از [shallowReactive()‎](./reactivity-advanced#shallowreactive) استفاده کنید.

  آبجکت بازگشت داده شده و آبجکت‌های تو در توی آن به‌وسیله‌ی [ES Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) دربرگرفته می‌شوند (wrapped) و با آبجکت‌های اصلی یکی **نیستند**. توصیه می‌شود که منحصرا با reactive proxy کار کنید و از اعتماد کردن به آبجکت اصلی خودداری کنید.

- **مثال**

  ایجاد کردن یک آبجکت reactive:

  ```js
  const obj = reactive({ count: 0 })
  obj.count++
  ```

  unwrap کردنِ ref:

  ```ts
  const count = ref(1)
  const obj = reactive({ count })

  // ref will be unwrapped
  console.log(obj.count === count.value) // true

  // it will update `obj.count`
  count.value++
  console.log(count.value) // 2
  console.log(obj.count) // 2

  // it will also update `count` ref
  obj.count++
  console.log(obj.count) // 3
  console.log(count.value) // 3
  ```

  توجه داشته باشید که refها زمانی که به عنوان آرایه یا المنت‌های یک collection در دسترس‌اند unwrapped **نیستند**:

  ```js
  const books = reactive([ref('Vue 3 Guide')])
  // need .value here
  console.log(books[0].value)

  const map = reactive(new Map([['count', ref(0)]]))
  // need .value here
  console.log(map.get('count').value)
  ```

  هنگامی که یک [ref](#ref) را به یک پراپرتی `reactive` اختصاص می‌دهیم (assigning), آن ref به صورت خودکار unwrapp می‌شود:

  ```ts
  const count = ref(1)
  const obj = reactive({})

  obj.count = count

  console.log(obj.count) // 1
  console.log(obj.count === count.value) // true
  ```

- **همچنین ببینید**
  - [راهنما - مبانی Reactivity](/guide/essentials/reactivity-fundamentals)
  - [راهنما - Typing `reactive()‎`](/guide/typescript/composition-api#typing-reactive) <sup class="vt-badge ts" />

## readonly()‎ {#readonly}

یک آبجکت (reactive یا معمولی) یا یک [ref](#ref) را می‌گیرد و یک پروکسی readonly را به نسخه اصلی برمی‌گرداند.

- **تایپ (Type)**

  ```ts
  function readonly<T extends object>(
    target: T
  ): DeepReadonly<UnwrapNestedRefs<T>>
  ```

- **جزئیات**

  یک پروکسی readonly عمیق است: هر پراپرتی تو در تویی که دسترسی داشته باشید نیز readonly خواهد بود. علاوه بر این readonly رفتاری مشابه `reactive()‎` در ref-unwrapping دارد، به استثنای مقادیر unwrapp شده که همچنان readonly ساخته خواهند شد.

  جهت اجتناب از تبدیل عمیق، به جای readonly از [shallowReadonly()‎](./reactivity-advanced#shallowreadonly) استفاده کنید.

- **مثال**

  ```js
  const original = reactive({ count: 0 })

  const copy = readonly(original)

  watchEffect(() => {
    // works for reactivity tracking
    console.log(copy.count)
  })

  // mutating original will trigger watchers relying on the copy
  original.count++

  // mutating the copy will fail and result in a warning
  copy.count++ // warning!
  ```

## watchEffect()‎ {#watcheffect}

یک تابع را در حالی که وابستگی‌های آن را به صورت reactive رهگیری (tracking) می‌کند، بلافاصله اجرا می‌کند و هر زمان که وابستگی‌ها (dependencies) تغییر کردند، دوباره آن را اجرا می‌کند.

- **تایپ (Type)**

  ```ts
  function watchEffect(
    effect: (onCleanup: OnCleanup) => void,
    options?: WatchEffectOptions
  ): StopHandle

  type OnCleanup = (cleanupFn: () => void) => void

  interface WatchEffectOptions {
    flush?: 'pre' | 'post' | 'sync' // default: 'pre'
    onTrack?: (event: DebuggerEvent) => void
    onTrigger?: (event: DebuggerEvent) => void
  }

  type StopHandle = () => void
  ```

- **جزئیات**

  اولین آرگومان، تابع effect است که باید اجرا شود. تابع effect یک تابع دریافت می‌کند که می‌تواند برای ثبت یک cleanup callback استفاده شود. این cleanup callback درست قبل از دفعه‌ی بعدی که effect قرار است دوباره اجرا شود، صدا زده می‌شود، و می‌تواند برای پاکسازی (cleanup) عوارض جانبی غیر معتبر (invalidated side effects) استفاده شود؛ به عنوان مثال یک ریکوئست async در حال انتظار (pending async request) (مثال زیر را ببینید).

  دومین آرگومان، یک options object اختیاری است که می‌تواند برای تنظیم‌کردن عوارض زمانبندی اجرا (flush timing) یا دیباگ کردنِ effect's dependencies استفاده شود.

  به صورت پیش‌فرض، ناظران درست قبل از رندر شدن کامپوننت اجرا می‌شوند. قرار دادن `flush: 'post'` ناظر را تا بعد از رندر شدن کامپوننت به تعویق می‌اندازد. برای اطلاعات بیشتر [زمانبندی اجرای callback](/guide/essentials/watchers#callback-flush-timing) را ببینید. در موارد نادری، ممکن است به‌کار انداختن (trigger) یک ناظر بلافاصله وقتی که reactive dependency تغییر می‌کند الزامی باشد، مثلا برای باطل‌کردن یک کش. این امکان با استفاده از `flush: 'sync'` میسر است. هر چند که این تنظیم باید با احتیاط استفاده شود، چرا که می‌تواند باعث مشکلاتی در پرفورمنس و data consistency [اگر چندین پراپرتی همزمان آپدیت شوند] شود.

  مقداری که برگشت داده می‌شود یک تابع هندل کننده‌ است که می‌تواند برای متوقف کردن effect از اجرای دوباره صدا زده شود.

- **مثال**

  ```js
  const count = ref(0)

  watchEffect(() => console.log(count.value))
  // -> logs 0

  count.value++
  // -> logs 1
  ```

  پاکسازیِ عوارض جانبی (Side effect cleanup):

  ```js
  watchEffect(async (onCleanup) => {
    const { response, cancel } = doAsyncWork(id.value)
    // `cancel` will be called if `id` changes
    // so that previous pending request will be cancelled
    // if not yet completed
    onCleanup(cancel)
    data.value = await response
  })
  ```

  متوقف کردن ناظر:

  ```js
  const stop = watchEffect(() => {})

  // when the watcher is no longer needed:
  stop()
  ```

  آپشن‌ها:

  ```js
  watchEffect(() => {}, {
    flush: 'post',
    onTrack(e) {
      debugger
    },
    onTrigger(e) {
      debugger
    }
  })
  ```

- **همچنین ببینید**
  - [راهنما - ناظران](/guide/essentials/watchers#watcheffect)
  - [راهنما - دیباگ‌ کردن ناظر](/guide/extras/reactivity-in-depth#watcher-debugging)

## watchPostEffect()‎ {#watchposteffect}

نام مستعاری از [`watchEffect()‎`](#watcheffect) با آپشن `flush: 'post'`.

## watchSyncEffect()‎ {#watchsynceffect}

نام مستعاری از [`watchEffect()‎`](#watcheffect) با آپشن `flush: 'sync'`.

## watch()‎ {#watch}

یک یا چند داده‌ی reactive را نظارت ‌می‌کند و هر زمان که منابع (sources) تغییر کردند یک callback function را اجرا می‌کند.

- **تایپ (Type)**

  ```ts
  // watching single source
  function watch<T>(
    source: WatchSource<T>,
    callback: WatchCallback<T>,
    options?: WatchOptions
  ): StopHandle

  // watching multiple sources
  function watch<T>(
    sources: WatchSource<T>[],
    callback: WatchCallback<T[]>,
    options?: WatchOptions
  ): StopHandle

  type WatchCallback<T> = (
    value: T,
    oldValue: T,
    onCleanup: (cleanupFn: () => void) => void
  ) => void

  type WatchSource<T> =
    | Ref<T> // ref
    | (() => T) // getter
    | T extends object
    ? T
    : never // reactive object

  interface WatchOptions extends WatchEffectOptions {
    immediate?: boolean // default: false
    deep?: boolean // default: false
    flush?: 'pre' | 'post' | 'sync' // default: 'pre'
    onTrack?: (event: DebuggerEvent) => void
    onTrigger?: (event: DebuggerEvent) => void
    once?: boolean // default: false (3.4+)
  }
  ```

  > تایپ‌ها به جهت خوانایی ساده‌سازی شده‌اند.

- **جزئیات**

  `watch()‎` به صورت پیش‌فرض تنبل (lazy) است به این معنی که callback تنها زمانی که منبع مورد نظارت تغییر کرده باشد فراخوانی میشود.

  اولین آرگومان، **منبعِ** watcher است. منبع‌ (source) می‌تواند یکی از موارد زیر باشد:

  - یک تابع getter که یک مقدار را برمی‌گرداند
  - یک ref
  - یک آبجکت reactive
  - ... یا آرایه‌ای از موارد بالا.

  دومین آرگومان callback است که با تغییر منبع فراخوانی می‌شود.‌این callback سه آرگومان می‌گیرد: مقدار جدید، مقدار قدیمی، و یک تابع برای ثبت یک کال‌بک پاکسازِ عوارض جانبی (side effect cleanup callback).این cleanup callback درست پیش از آنکه تاثیرات دوباره اجرا شود فراخوانی می‌گردد و می‌تواند برای پاکسازیِ عوارض جانبی غیرمعتبر (invalidated side effects) استفاده شود به عنوان مثال یک ریکوئست async در حال انتظار (pending async request).

  زمانی که چندین منبع نظارت می‌شوند، این callback دو آرایه که شامل مقادیر جدید / قدیم مربوط به آرایه منبع می‌باشند را دریافت می‌کند.

  سومین آرگومان اختیاری یک options object است که گزینه‌های زیر را پشتیبانی می‌کند:

  - **`immediate`**: ‌کال‌بک (callback) را درست در زمان ایجاد ناظر به‌کار می‌اندازد. در اولین فراخوانی مقدار قدیمی `undefined` خواهد بود.
  - **`deep`**: اگر منبع، یک آبجکت باشد باالاجبار منبع را به شکل عمیق پیمایش می‌کند تا callback در تغییرات عمیق منبع نیز اجرا شود. ببینید [ناظران عمیق](/guide/essentials/watchers#deep-watchers).
  - **`flush`**: زمانبندی اجرای callback را تنظیم می‌کند. ببینید [زمانبندی اجرای Callback](/guide/essentials/watchers#callback-flush-timing) و [`watchEffect()‎`](/api/reactivity-core#watcheffect).
  - **`onTrack / onTrigger`**: وابستگی‌های ناظر را دیباگ می‌کند. ببینید [دیباگ‌ کردن ناظر](/guide/extras/reactivity-in-depth#watcher-debugging).
  - **`once`**: تنها یک بار کالبک را اجرا کند. ناظر پس از اولین اجرای کالبک به طور خودکار متوقف می‌شود. <sup class="vt-badge" data-text="3.4+" />

  ‌`watch()‎`در مقایسه با [`watchEffect()‎`](#watcheffect) به ما اجازه می‌دهد که:

  - به شکل تنبلانه (lazily) با عارضه‌جانبی (side effect) برخورد کنیم؛
  - در مورد اینکه کدام state باید ناظر را برای اجرای مجدد به کار بیاندازد جزئی‌تر باشیم؛
  - به هر دو مقدار فعلی و قبلی از state نظارت شده دسترسی داشته باشیم.

- **مثال**

  نظارت کردن یک getter:

  ```js
  const state = reactive({ count: 0 })
  watch(
    () => state.count,
    (count, prevCount) => {
      /* ... */
    }
  )
  ```

  نظارت کردن یک ref:

  ```js
  const count = ref(0)
  watch(count, (count, prevCount) => {
    /* ... */
  })
  ```

  هنگامی که چندین منبع را نظارت می‌کنیم، callback آرایه‌هایی از مقادیر جدید / قدیم که مرتبط با آرایه منبع هستند را دریافت می‌کند:

  ```js
  watch([fooRef, barRef], ([foo, bar], [prevFoo, prevBar]) => {
    /* ... */
  })
  ```

  زمانی که از یک منبع getter استفاده می‌کنیم، ناظر تنها زمانی فعال می‌شود که مقدار برگشت داده شده از getter تغییر کرده باشد . اگر می‌خواهید که callback حتی زمانی که تغییرات عمیق صورت می‌گیرد نیز فعال شود باید صراحتا با حالت عمیق `{ deep: true }`ناظر را مجبور به این کار کنید. لازم به ذکر است که در حالت عمیق، اگر callback با یک تغییر عمیق (deep mutation) به کار افتاده باشد (triggered) مقدار جدید و قدیمی آبجکت‌هایی مشابه خواهند بود:

  ```js
  const state = reactive({ count: 0 })
  watch(
    () => state,
    (newValue, oldValue) => {
      // newValue === oldValue
    },
    { deep: true }
  )
  ```

  زمانی که مستقیما یک آبجکت reactive را نظارت می‌کنیم،‌ نظارت به شکل خودبخود در حالت عمیق می‌باشد:

  ```js
  const state = reactive({ count: 0 })
  watch(state, () => {
    /* triggers on deep mutation to state */
  })
  ```

  `watch()‎`همان گزینه‌های دیباگ کردن و زمانبندی اجرا را با [`watchEffect()‎`](#watcheffect) به اشتراک می‌گذارد:

  ```js
  watch(source, callback, {
    flush: 'post',
    onTrack(e) {
      debugger
    },
    onTrigger(e) {
      debugger
    }
  })
  ```

  متوقف کردن ناظر:

  ```js
  const stop = watch(source, callback)

  // when the watcher is no longer needed:
  stop()
  ```

  پاکسازِ عوارض جانبی (Side effect cleanup):

  ```js
  watch(id, async (newId, oldId, onCleanup) => {
    const { response, cancel } = doAsyncWork(newId)
    // `cancel` will be called if `id` changes, cancelling
    // the previous request if it hasn't completed yet
    onCleanup(cancel)
    data.value = await response
  })
  ```

- **همچنین ببینید**

  - [راهنما - ناظران](/guide/essentials/watchers)
  - [راهنما - دیباگ کردن ناظران](/guide/extras/reactivity-in-depth#watcher-debugging)
