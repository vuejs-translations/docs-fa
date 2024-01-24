# Composition API: هوک‌های چرخه حیات {#composition-api-lifecycle-hooks}

:::info نکته استفاده
تمام API های لیست‌شده در این صفحه باید به صورت همگام، در هنگام فاز `()setup` یک کامپوننت استفاده‌شوند. برای جزییات بیشتر [راهنما - هوک‌های چرخه حیات](/guide/essentials/lifecycle) را ببینید.
:::

## ()onMounted {#onmounted}

یک تابع callback را ثبت می‌کند تا در زمان mount شدن کامپوننت، فراخوانی شود.

- **تایپ**

  ```ts
  function onMounted(callback: () => void): void
  ```

- **جزییات**

  یک کامپوننت mount شده محسوب می‌شود بعد از اینکه:

  - تمام کامپوننت‌های همگام فرزند آن mount شده باشند (شامل کامپوننت‌های ناهمگام یا کامپوننت‌های داخل تگ `<Suspense>` نمی‌شود).

  - درخت DOM آن ایجادشده و به داخل تگ دربرگیرنده آن اضافه شده‌باشد. توجه داشته باشید که تنها زمانی می‌توان تضمین کرد که درخت DOM کامپوننت در داخل DOM اصلی موجود است که تگ دربرگیرنده‌اش هم در DOM  اصلی وجود داشته باشد.

  این هوک معمولا برای انجام عوارض جانبی که نیاز به دسترسی به DOM رندر شده کامپوننت دارند، یا برای محدودکردن کدهای مرتبط با DOM در یک اپلیکیشن رندر شده توسط سرور ([server-rendered application](/guide/scaling-up/ssr)) استفاده می‌شود.

  **این هوک در هنگام رندر سمت سرور فراخوانی نمی‌شود.**

- **مثال**

  دسترسی به یک المنت به وسیله ref تمپلیت:

  ```vue
  <script setup>
  import { ref, onMounted } from 'vue'

  const el = ref()

  onMounted(() => {
    el.value // <div>
  })
  </script>

  <template>
    <div ref="el"></div>
  </template>
  ```

## ()onUpdated {#onupdated}

یک تابع callback را ثبت می‌کند تا بعد از اینکه کامپوننت درخت DOM خودش را به سبب تغییر یک state واکنش‌گرا (reactive) به‌روزرسانی کرد، فراخوانی شود.

- **تایپ**

  ```ts
  function onUpdated(callback: () => void): void
  ```

- **جزییات**

  هوک updated یک کامپوننت والد بعد از کامپوننت‌های فرزند آن فراخوانی می‌شود.

  این هوک بعد از هرگونه به‌روزرسانی DOM کامپوننت فراخوانی می‌شود، که می‌تواند توسط تغییرات مختلف state ایجاد شود، زیرا چندین تغییر state را می‌توان به دلایل عملکردی در یک چرخه رندر واحد دسته‌بندی کرد. اگر نیاز دارید که بعد از تغییر یک state خاص به DOM به‌روزرسانی شده دسترسی داشته باشید، به‌جای آن از `()nextTick` استفاده کنید.

    **این هوک در حین رندر سمت سرور فراخوانی نمی‌شود.**

  :::warning هشدار
  state کامپوننت را در داخل هوک updated تغییر ندهید - این احتمالا منجر به یک حلقه به‌روزرسانی بی‌نهایت می‌شود!
  :::

- **مثال**

  دسترسی به DOM به‌روزرسانی شده:

  ```vue
  <script setup>
  import { ref, onUpdated } from 'vue'

  const count = ref(0)

  onUpdated(() => {
    // text content should be the same as current `count.value`
    console.log(document.getElementById('count').textContent)
  })
  </script>

  <template>
    <button id="count" @click="count++">{{ count }}</button>
  </template>
  ```

## ()onUnmounted {#onunmounted}

یک تابع callback را ثبت می‌کند تا بعد از اینکه کامپوننت unmount شد، فراخوانی شود.

- **تایپ**

  ```ts
  function onUnmounted(callback: () => void): void
  ```

- **جزییات**

  یک کامپوننت زمانی unmount شده قلمداد می‌شود که:

  - تمام کامپوننت‌های فرزند آن unmount شده باشند.

  - تمام اثرات واکنش‌گرا مرتبط به آن (اثر رندر و computed یا  watcherها در هنگام `()setup`) متوقف شده‌باشند.

  از این هوک برای پاکسازی عوارض جانبی ایجادشده به‌صورت دستی مانند تایمر‌ها، گوش‌دهنده‌های رویداد DOM یا اتصالات سرور استفاده کنید.

  **این هوک در زمان رندر سمت سرور فراخوانی نمی‌شود.**

- **مثال**

  ```vue
  <script setup>
  import { onMounted, onUnmounted } from 'vue'

  let intervalId
  onMounted(() => {
    intervalId = setInterval(() => {
      // ...
    })
  })

  onUnmounted(() => clearInterval(intervalId))
  </script>
  ```

## ()onBeforeMount {#onbeforemount}

هوکی را ثبت می‌کند تا دقیقا در لحظه قبل از mount شدن کامپوننت فراخوانی شود.

- **تایپ**

  ```ts
  function onBeforeMount(callback: () => void): void
  ```

- **جزییات**

  هنگامی که این هوک فراخوانی می‌شود، کامپوننت راه‌اندازی state واکنش‌پذیر خود را به اتمام رسانده‌است، اما هنوز هیچ نودی در DOM ایجاد نشده‌است. قرار است که برای اولین بار کامپوننت اثر رندر DOM خودش را اجرا کند.

  **این هوک در زمان رندر سمت سرور فراخوانی نمی‌شود.**

## ()onBeforeUpdate {#onbeforeupdate}

هوکی را ثبت می‌کند تا دقیقا در لحظه‌ای که کامپوننت قرار است درخت DOM خود را به وسیله تغییر یک استیت واکنش‌گرا به‌روزرسانی کند، فراخوانی شود.

- **تایپ**

  ```ts
  function onBeforeUpdate(callback: () => void): void
  ```

- **جزییات**

  این هوک می‌تواند برای دسترسی به وضعیت DOM قبل از به‌روزرسانی DOM توسط Vue استفاده کرد. همچنین تغییر state کامپوننت در داخل این هوک ایمن است.

  **این هوک در زمان رندر سمت سرور فراخوانی نمی‌شود.**

## ()onBeforeUnmount {#onbeforeunmount}

هوکی را ثبت می‌کند تا دقیقا قبل از اینکه نمونه کامپوننت unmount شود، فراخوانی شود.

- **تایپ**

  ```ts
  function onBeforeUnmount(callback: () => void): void
  ```

- **جزییات**

  هنگامی که این هوک فراخوانی می‌شود، نمونه کامپوننت همچنان کاملا فعال و کاربردی است.

  **این هوک در زمان رندر سمت سرور فراخوانی نمی‌شود.**

## ()onErrorCaptured {#onerrorcaptured}

هوکی را ثبت می‌کند تا در زمانی که خطای درحال انتشار از یک کامپوننت اصلی گرفته شده‌است، فراخوانی شود.

- **تایپ**

  ```ts
  function onErrorCaptured(callback: ErrorCapturedHook): void

  type ErrorCapturedHook = (
    err: unknown,
    instance: ComponentPublicInstance | null,
    info: string
  ) => boolean | void
  ```

- **جزییات**

  خطاها می‌توانند از این منابع گرقته شوند:

  - رندرهای کامپوننت (Component renders)
  - کنترل کننده‌های رویداد (Event handlers)
  - هوک‌های چرخه حیات (Lifecycle hooks)
  - تابع `()setup`
  - واچرها (Watchers)
  - هوک‌های دایرکتیو سفارشی (Custom directive hooks)
  - هوک‌های انتقالی (Transition hooks)

  این هوک سه آرگومان دریافت می‌کند: خطا، نمونه کامپوننتی که مسبب ایجاد خطا شد و و یک رشته اطلاعات که نوع منبع خطا را مشخص می کند.

  :::tip نکته
  در تولید، آرگومان سوم (`info`) به جای رشته با اطلاعات کامل، یک کد کوتاه شده خواهد بود. شما می‌توانید کد مربوط به map کردن رشته را در  [Production Error Code Reference](/error-reference/#runtime-errors) بیابید.
  :::

  شما می‌توانید state کامپوننت را در `()errorCaptured` تغییر دهید تا یک state خطا را به کاربر نمایش دهید. با این حال، مهم است که state خطا نباید محتوای اصلی که باعث خطا شده است را رندر کند. در غیر این صورت کامپوننت در یک حلقه رندر نامتناهی قرار می‌گیرد.

  هوک می‌تواند مقدار `false` را برگرداند تا از انتشار بیشتر خطا جلوگیری کند.

  **قوانین انتشار خطا**

  - به طور پیش‌فرض، تمام خطاها همچنان به [`app.config.errorHandler`](/api/application#app-config-errorhandler) در سطح اپلیکیشن، فرستاده می‌شوند، در صورتی که تعریف شده باشد، به طوری که هنوز می توان این خطاها را در یک مکان به یک سرویس تجزیه و تحلیل گزارش داد.

  - اگر چندین هوک `errorCaptured` در زنجیره ارث‌بری یا زنجیره والد یک کامپوننت وجود داشته باشد، همه آنها به ترتیب از پایین به بالا در همان خطا فراخوانی می‌شوند. این شبیه مکانیسم event bubbling در رویدادهای DOM نیتیو است.

  - اگر هوک `errorCaptured` خودش یک خطا را برگرداند، جفت این خطا و خطای اصلی گرفته‌شده به `app.config.errorHandler` فرستاده می‌شوند.

  - یک هوک `errorCaptured` می‌تواند مقدار `false` را برگرداند تا از انتشار بیشتر خطا جلوگیری کند. این اساسا می‌گوید ((این خطا کنترل شده‌است و باید نادیده گرفته شود)). این از هرگونه فراخوانی هوک `errorCaptured` یا `app.config.errorHandler` اضافی برای این خطا جلوگیری می‌کند.

## ()onRenderTracked <sup class="vt-badge dev-only"> (تنها در حالت توسعه)</sup> {#onrendertracked}

یک هوک اشکال‌زدایی را ثبت می‌کند تا در هنگامی که یک وابستگی واکنش‌گرا توسط اثر رندر کامپوننت ردیابی شده‌‌است، فراخوانی شود.

**این هوک تنها برای حالت توسعه است و در زمان رندر سمت سرور فراخوانی نمی‌شود.**

- **تایپ**

  ```ts
  function onRenderTracked(callback: DebuggerHook): void

  type DebuggerHook = (e: DebuggerEvent) => void

  type DebuggerEvent = {
    effect: ReactiveEffect
    target: object
    type: TrackOpTypes /* 'get' | 'has' | 'iterate' */
    key: any
  }
  ```

- **همچنین ببینید** [Reactivity in Depth](/guide/extras/reactivity-in-depth)

## ()onRenderTriggered <sup class="vt-badge dev-only"> (تنها در حالت توسعه)</sup> {#onrendertriggered}

یک هوک اشکال‌زدایی را ثبت می‌کند تا زمانی‌ که یک وابستگی واکنش‌گرا باعث ایجاد اثر رندر کامپوننت برای اجرای مجدد می‌شود، فراخوانی شود.

**این هوک تنها برای حالت توسعه است و در زمان رندر سمت سرور فراخوانی نمی‌شود.**

- **تایپ**

  ```ts
  function onRenderTriggered(callback: DebuggerHook): void

  type DebuggerHook = (e: DebuggerEvent) => void

  type DebuggerEvent = {
    effect: ReactiveEffect
    target: object
    type: TriggerOpTypes /* 'set' | 'add' | 'delete' | 'clear' */
    key: any
    newValue?: any
    oldValue?: any
    oldTarget?: Map<any, any> | Set<any>
  }
  ```

- **همچنین ببینید** [Reactivity in Depth](/guide/extras/reactivity-in-depth)

## ()onActivated {#onactivated}

یک تابع callback را ثبت می‌کند تا بعد از اینکه نمونه کامپوننت به‌ عنوان قسمتی از درخت که به‌ وسیله [`<KeepAlive>`](/api/built-in-components#keepalive) ذخیره‌شده، به داخل DOM اضافه شد، فراخوانی شود.

  **این هوک در زمان رندر سمت سرور فراخوانی نمی‌شود.**

- **تایپ**

  ```ts
  function onActivated(callback: () => void): void
  ```

- **همچنین ببینید** [Guide - Lifecycle of Cached Instance](/guide/built-ins/keep-alive#lifecycle-of-cached-instance)

## ()onDeactivated {#ondeactivated}

یک تابع callback را ثبت می‌کند تا بعد از اینکه نمونه کامپوننت به‌ عنوان قسمتی از درخت که به‌ وسیله [`<KeepAlive>`](/api/built-in-components#keepalive) ذخیره‌شده، از داخل DOM حذف شد، فراخوانی شود.

  **این هوک در زمان رندر سمت سرور فراخوانی نمی‌شود.**

- **تایپ**

  ```ts
  function onDeactivated(callback: () => void): void
  ```

- **همچنین ببینید** [Guide - Lifecycle of Cached Instance](/guide/built-ins/keep-alive#lifecycle-of-cached-instance)

## ()onServerPrefetch <sup class="vt-badge" data-text="SSR only"> (تنها در رندر سمت سرور)</sup> {#onserverprefetch}

یک تابع ناهمگام را ثبت می‌‌کند تا قبل از اینکه نمونه کامپوننت در سرور رندر شود، حل شود.

- **تایپ**

  ```ts
  function onServerPrefetch(callback: () => Promise<any>): void
  ```

- **جزییات**

  اگر تابع callback یک Promise را برگرداند، رندر کننده سرور منتظر می‌ماند تا Promise قبل از رندر کردن کامپوننت، حل (resolve) شود.

  این هوک تنها در حین رندر سمت سرور فراخوانی می‌شود که می‌تواند برای انجام fetch (واکشی) داده منحصر به سرور استفاده شود.

- **مثال**

  ```vue
  <script setup>
  import { ref, onServerPrefetch, onMounted } from 'vue'

  const data = ref(null)

  onServerPrefetch(async () => {
    // کامپوننت به عنوان بخشی از درخواست اولیه رندر می‌شود
    // داده ها را از قبل بر روی سرور فچ (واکشی) کنید زیرا سریعتر از کلاینت است
    data.value = await fetchOnServer(/* ... */)
  })

  onMounted(async () => {
    if (!data.value) {
      // اگر داده‌ها در مونت خالی باشد، به این معنی است که کامپوننت
      // به صورت داینامیک (پویا) بر روی کلاینت ارائه می‌شود
      // به جای آن یک واکشی سمت کلاینت انجام دهید
      data.value = await fetchOnClient(/* ... */)
    }
  })
  </script>
  ```

- **همچنین ببینید** [Server-Side Rendering](/guide/scaling-up/ssr)
