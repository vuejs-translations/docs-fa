# آپشن: لایف سایکل {#options-lifecycle}

:::info همچنین دیدن کنید از
برای استفاده مشترک از هوک‌های لایف سایکل، از [راهنما - هوک‌های لایف سایکل](/guide/essentials/lifecycle) دیدن کنید.
:::

## beforeCreate {#beforecreate}

زمانی فراخوانی می‌شود که نمونه مقداردهی اولیه شود.

- **تایپ**

  ```ts
  interface ComponentOptions {
    beforeCreate?(this: ComponentPublicInstance): void
  }
  ```

- **جزئیات**

  فراخوانی فورا انجام می‌شود هنگامی که نمونه مقداردهی اولیه شده است، پس از رفع مشکل پراپ‌ها، قبل از پردازش سایر گزینه‌ها مانند `داده()` یا `computed`.

  <!-- Note that the `setup()` hook of Composition API is called before any Options API hooks, even `beforeCreate()`. -->
  توجه داشته باشید که هوک `setup()` از Composition API قبل از هر هوک Options API، حتی `beforeCreate()` فراخوانی می‌شود.

## created {#created}

پس از اتمام پردازش تمام گزینه‌های مربوط به حالت نمونه، فراخوانی می‌شود.

- **تایپ**

  ```ts
  interface ComponentOptions {
    created?(this: ComponentPublicInstance): void
  }
  ```

- **جزئیات**

  هنگامی که این هوک فراخوانی می‌شود، موارد زیر تنظیم شده‌اند: داده‌های reactive، پراپرتی‌های computed، متدها و watchها. با این حال، فاز نصب هنوز شروع نشده است و ویژگی `$el` هنوز در دسترس نیست.

## beforeMount {#beforemount}

درست قبل از اینکه کامپوننت نصب شود فراخوانی شده است.

- **تایپ**

  ```ts
  interface ComponentOptions {
    beforeMount?(this: ComponentPublicInstance): void
  }
  ```

- **جزئیات**

  هنگامی که این هوک فراخوانی می‌شود، کامپوننت تنظیم حالت reactive state خود را به پایان رسانده است، اما هنوز هیچ گره DOM ایجاد نشده است. قرار است برای اولین بار اثر رندر DOM خود را اجرا کند.

  **این هوک در هنگام رندر سمت سرور فراخوانی نمی‌شود.**


## mounted {#mounted}

پس از نصب کامپوننت فراخوانی می‌شود.

- **تایپ**

  ```ts
  interface ComponentOptions {
    mounted?(this: ComponentPublicInstance): void
  }
  ```

- **جزئیات**

  یک کامپوننت نصب شده در نظر گرفته میشود پس از اینکه:

  - همه کامپوننت‌های فرزند آن همزمان نصب شده اند(شامل کامپوننت‌های async یا کامپوننت‌های درون درختان `<Suspense>` نمی‌شود.)

  - درخت DOM خود را ایجاد کرده و درون کانتینر والد قرار داده است. توجه داشته باشید که این فقط تضمین می‌کند که درخت DOM کامپوننت در سند است اگر والد کانتینر اصلی برنامه نیز در سند باشد.

  این هوک به طور معمول برای انجام اثرات جانبی استفاده می‌شود که به دسترسی به DOM اجزاای رندر شده کامپوننت نیاز دارند، یا برای محدود کردن کد مربوط به DOM به سمت مشتری در یک [برنامه رندر شده در سمت سرور](/guide/scaling-up/ssr).

  **این هوک در هنگام رندر سمت سرور فراخوانی نمی‌شود.**

## beforeUpdate {#beforeupdate}

درست قبل از اینکه کامپوننت به دلیل تغییر reactive state درخت DOM خود را به روز کند فراخوانی شده است.

- **تایپ**

  ```ts
  interface ComponentOptions {
    beforeUpdate?(this: ComponentPublicInstance): void
  }
  ```

- **جزئیات**

این هوک می‌تواند برای دسترسی به وضعیت DOM قبل از به‌روزرسانی DOM توسط Vue استفاده شود. همچنین، امکان ایجاد تغییر در وضعیت کامپوننت در داخل این هوک نیز امن است.  

  **این هوک در هنگام رندر سمت سرور فراخوانی نمی‌شود.**

## updated {#updated}

پس از آنکه کامپوننت درخت DOM خود را به دلیل تغییر reactive state به روز رسانی کرد، فراخوانی میشود.

- **تایپ**

  ```ts
  interface ComponentOptions {
    updated?(this: ComponentPublicInstance): void
  }
  ```

- **جزئیات**

  هوک به روز شده یک کامپوننت والد پس از کامپوننت‌های فرزندش فراخوانی خواهد شد.

  این هوک پس از هر به روز رسانی DOM کامپوننت فراخوانی میشود که میتواند ناشی از تغییرات state باشد. اگر بعد از تغییر یک state خاص نیاز به دسترسی به DOM به روز شده دارید، از [nextTick()](/api/general#nexttick) استفاده کنید.

  **این هوک در هنگام رندر سمت سرور فراخوانی نمی‌شود.**

  :::warning هشدار
  state کامپوننت را در هوک به روز شده تغییر ندهید - این کار احتمالا منجر به یک لوپ بی‌نهایت خواهد شد!
  :::

## beforeUnmount {#beforeunmount}

درست قبل از اینکه یک کامپوننت نمونه unmounted شود فراخوانی می‌شود.

- **تایپ**

  ```ts
  interface ComponentOptions {
    beforeUnmount?(this: ComponentPublicInstance): void
  }
  ```

- **جزئیات**

  هنگامی که این هوک فراخوانی می‌شود، کامپوننت نمونه هنوز کاملا functional است.

  **این هوک در هنگام رندر سمت سرور فراخوانی نمی‌شود.**

## unmounted {#unmounted}

پس از اینکه کامپوننت unmounted می‌شود فراخوانی میشود.

- **تایپ**

  ```ts
  interface ComponentOptions {
    unmounted?(this: ComponentPublicInstance): void
  }
  ```

- **جزئیات**

  یک کامپوننت unmounted در نظر گرفته میشود پس از:

  - همه کامپوننت های فرزند آن unmounted شده باشند.

  - تمام اثرات reactive های مرتبط با آن (اثر رندر و computed / watch های ساخته شده در طول `setup()`) متوقف شده‌اند.

  از این هوک برای پاکسازی اثرات جانبی ایجاد شده به صورت دستی مانند تایمرها، DOM event listeners یا اتصالات سرور استفاده کنید.

  **این هوک در هنگام رندر سمت سرور فراخوانی نمی‌شود.**

## errorCaptured {#errorcaptured}

زمانی فراخوانی میشود که یک خطای انتشار از یک کامپوننت اصلی ثبت شده باشد.

- **تایپ**

  ```ts
  interface ComponentOptions {
    errorCaptured?(
      this: ComponentPublicInstance,
      err: unknown,
      instance: ComponentPublicInstance | null,
      info: string
    ): boolean | void
  }
  ```

- **جزئیات**

  خطاها را میتوان از منابع زیر دریافت کرد:

  - Component renders
  - Event handlers
  - Lifecycle hooks
  - `setup()` function
  - Watchers
  - Custom directive hooks
  - Transition hooks

  این هوک سه آرگومان دریافت میکند: خطا، کامپوننت نمونه که خطا را فعال می‌کند، و یک رشته اطلاعات که نوع منبع خطا را مشخص می‌کند.

  شما می‌توانید در `errorCaptured()` state کامپوننت را تغییر داده و یک state خطا به کاربر نشان دهید. با این حال، مهم است که state خطا محتوای اصلی که خطا را ایجاد کرده است را نشان ندهد؛ در غیر این صورت، کامپوننت در یک لوپ بی‌نهایت اجرا خواهد شد.

  این هوک می‌تواند `false` را برگرداند تا از انتشار بیشتر خطا جلوگیری کند. جزئیات انتشار خطا را در زیر ببینید.

  **قوانین انتشار خطا**

  - به طور پیش‌فرض، همه خطاها همچنان به سطح برنامه [`app.config.errorHandler`](/api/application#app-config-errorhandler) ارسال می‌شوند اگر که تعریف شده باشند، به طوری که همچنان می‌توان این خطاها را به یک سرویس آنالیزگر گزارش کرد.

  - اگر چندین هوک `errorCaptured` در زنجیره وراثت یا زنجیره والد یک کامپوننت وجود داشته باشد، تمام آن‌ها به ترتیب از پایین به بالا در همان خطا فراخوانی می‌شوند. این مکانیسم مشابه مکانیسم حبابی رویدادهای DOM اصلی است.

  - اگر هوک `errorCaptured` خودش خطایی ایجاد کند، هم این خطا و هم خطای اصلی که ثبت شده است به `app.config.errorHandler` ارسال می‌شوند.

  - یک هوک `errorCaptured` می‌تواند `false` را برگرداند تا از انتشار بیشتر خطا جلوگیری کند. این اساسا می‌گوید "این خطا کنترل شده است و باید نادیده گرفته شود." این جلوگیری از فراخوانی هوک‌های `errorCaptured` یا `app.config.errorHandler` اضافی برای این خطاها جلوگیری می‌کند.
  

## renderTracked <sup class="vt-badge dev-only" /> {#rendertracked}

زمانی فراخوانی می‌شود ک یک وابستگی reactive از اثر رندر کامپوننت یافته شده باشد.

**این هوک فقط در حات توسعه وجود دارد و در هنگام رندر سمت سرور فراخوانی نمی‌شود.**

- **تایپ**

  ```ts
  interface ComponentOptions {
    renderTracked?(this: ComponentPublicInstance, e: DebuggerEvent): void
  }

  type DebuggerEvent = {
    effect: ReactiveEffect
    target: object
    type: TrackOpTypes /* 'get' | 'has' | 'iterate' */
    key: any
  }
  ```

- **همچنان دیدن کنید از** [Reactivity in Depth](/guide/extras/reactivity-in-depth)

## renderTriggered <sup class="vt-badge dev-only" /> {#rendertriggered}

زمانی فراخوانی می‌شود که یک وابستگی reactive اثر رندر کامپوننت را برای اجرای مجدد راه اندازی کند.

**این هوک فقط در حات توسعه وجود دارد و در هنگام رندر سمت سرور فراخوانی نمی‌شود.**

- **تایپ**

  ```ts
  interface ComponentOptions {
    renderTriggered?(this: ComponentPublicInstance, e: DebuggerEvent): void
  }

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

- **همچنان دیدن کنید از** [Reactivity in Depth](/guide/extras/reactivity-in-depth)

## activated {#activated}

پس از درج کامپوننت نمونه در DOM به عنوان بخشی از درخت ذخیره شده توسط [`<KeepAlive>`](/api/built-in-components#keepalive) فراخوانی می‌شود.

**این هوک در هنگام رندر سمت سرور فراخوانی نمی‌شود.**

- **تایپ**

  ```ts
  interface ComponentOptions {
    activated?(this: ComponentPublicInstance): void
  }
  ```

- **همچنان دیدن کنید از** [Guide - Lifecycle of Cached Instance](/guide/built-ins/keep-alive#lifecycle-of-cached-instance)

## deactivated {#deactivated}

پس از درج کامپوننت نمونه در DOM به عنوان بخشی از درخت ذخیره شده توسط [`<KeepAlive>`](/api/built-in-components#keepalive) فراخوانی می‌شود.

[`<KeepAlive>`](/api/built-in-components#keepalive).

**این هوک در هنگام رندر سمت سرور فراخوانی نمی‌شود.**

- **تایپ**

  ```ts
  interface ComponentOptions {
    deactivated?(this: ComponentPublicInstance): void
  }
  ```

- **همچنان دیدن کنید از** [Guide - Lifecycle of Cached Instance](/guide/built-ins/keep-alive#lifecycle-of-cached-instance)

## serverPrefetch <sup class="vt-badge" data-text="SSR only" /> {#serverprefetch}

تابع Async که قبل از اینکه کامپوننت نمونه بر روی سرور رندر شود بایل حل شود.

- **تایپ**

  ```ts
  interface ComponentOptions {
    serverPrefetch?(this: ComponentPublicInstance): Promise<any>
  }
  ```

- **جزئیات**

  اگر هوک یک promise را برگرداند، رندر سرور منتظر می‌ماند تا این promise قبل از رندر کردن کامپوننت حل شود.

  این هوک تنها در هنگام رندر سمت سرور فراخوانی می‌شود و برای انجام بازیابی داده‌های س تنها سرور استفاده می‌شود.

- **مثال**

  ```js
  export default {
    data() {
      return {
        data: null
      }
    },
    async serverPrefetch() {
      // component is rendered as part of the initial request
      // pre-fetch data on server as it is faster than on the client
      this.data = await fetchOnServer(/* ... */)
    },
    async mounted() {
      if (!this.data) {
        // if data is null on mount, it means the component
        // is dynamically rendered on the client. Perform a
        // client-side fetch instead.
        this.data = await fetchOnClient(/* ... */)
      }
    }
  }
  ```

- **همچنان دیدن کنید از** [Server-Side Rendering](/guide/scaling-up/ssr)
