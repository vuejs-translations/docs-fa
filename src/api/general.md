# API سراسری : عمومی {#global-api-general}

## ورژن {#version}

نسخه فعلی Vue را نشان می دهد.

- **تایپ:** `رشته(string) `

- **مثال**

  ```js
  import { version } from 'vue'

  console.log(version)
  ```

## nextTick() {#nexttick}

یک ابزار است که برای انتظار به‌روزرسانی بعدی DOM به‌کار می‌رود.
 
- **تایپ**

  ```ts
  function nextTick(callback?: () => void): Promise<void>
  ```

- **جزییات**

  وقتی در Vue حالت واکنشی(reactive state) را فعال می‌کنید، به‌روزرسانی‌های DOM به صورت همزمان اعمال نمی‌شوند. به جای اینکه Vue آن‌ها را در همان لحظه اعمال کند،بدون توجه به تعداد تغییراتی که در آن حالت ایجاد کرده‌اید،
  آن‌ها را درون «صف انتظار» قرار می‌دهد تا اطمینان حاصل شود که هر مؤلفه فقط یک بار به‌روزرسانی می‌شود.

  می‌توانید `nextTick()` را فوراً پس از تغییر وضعیت صدا بزنید و منتظر بمانید تا به‌روزرسانی‌های DOM اعمال شود. این کار را می‌توان با استفاده از یک تابع فراخوانی یا یک Promise برگشتی ناهمگام انجام داد.

- **مثال**

  <div class="composition-api">

  ```vue
  <script setup>
  import { ref, nextTick } from 'vue'

  const count = ref(0)

  async function increment() {
    count.value++

    // DOM هنوز به روز نشده است
    console.log(document.getElementById('counter').textContent) // 0

    await nextTick()
    // DOM اکنون به روز شده است
    console.log(document.getElementById('counter').textContent) // 1
  }
  </script>

  <template>
    <button id="counter" @click="increment">{{ count }}</button>
  </template>
  ```

  </div>
  <div class="options-api">

  ```vue
  <script>
  import { nextTick } from 'vue'

  export default {
    data() {
      return {
        count: 0
      }
    },
    methods: {
      async increment() {
        this.count++

    // DOM هنوز به روز نشده است
        console.log(document.getElementById('counter').textContent) // 0

        await nextTick()
    // DOM اکنون به روز شده است
        console.log(document.getElementById('counter').textContent) // 1
      }
    }
  }
  </script>

  <template>
    <button id="counter" @click="increment">{{ count }}</button>
  </template>
  ```

  </div>

- **مشاهده بیشتر** [`this.$nextTick()`](/api/component-instance#nexttick)

## defineComponent() {#definecomponent}

یک ابزار کمکی برای تعریف یک کامپوننت Vue با استفاده از تعیین تایپ داده‌هاست.

- **تایپ**

  ```ts
  // سینتکس options
  function defineComponent(
    component: ComponentOptions
  ): ComponentConstructor

  // سینتکس تابع (نیاز به ورژن 3.3+)
  function defineComponent(
    setup: ComponentOptions['setup'],
    extraOptions?: ComponentOptions
  ): () => any
  ```

  > تایپ ساده‌تر شده است تا خوانایی بیشتری داشته باشد.

- **جزییات**

  این تابع یک شیء از گزینه‌های کامپوننت را به عنوان آرگومان اول می‌پذیرد. مقدار بازگشتی همان شیء خواهد بود، چرا که این تابع در واقع هیچ عملیاتی انجام نمی‌دهد و تنها برای استنتاج تایپ داده استفاده می‌شود.

  لطفا توجه کنید که تایپ بازگشتی کمی ویژه است: این تایپ بر اساس گزینه‌های ورودی، یک تایپ داده را مشخص می‌کند. وقتی این تایپ به عنوان یک تگ در TSX استفاده می‌شود، از اطلاعات موجود برای تعیین تایپ استفاده می‌کند.

  شما می‌توانید تایپ نمونه‌ای که یک کامپوننت ارائه می‌دهد (که معادل تایپ `this` در گزینه‌های آن است) را با استفاده از تایپ بازگشتی `defineComponent()` به دست آورید.

  ```ts
  const Foo = defineComponent(/* ... */)

  type FooInstance = InstanceType<typeof Foo>
  ```

  ### امضای تابع <sup class="vt-badge" data-text="3.3+" /> {#function-signature}

  `defineComponent()` همچنین یک نوع امضای جایگزین دارد که برای استفاده با Composition API و [توابع رندر یا JSX](/guide/extras/render-function.html) مناسب است.

  به جای ارسال یک شیء از گزینه‌ها، انتظار می‌رود یک تابع مورد استفاده قرار گیرد. این تابع همان‌طور که تابع [`setup()`](/api/composition-api-setup.html#composition-api-setup) در Composition API عمل می‌کند، ورودی‌ها و setup context را دریافت می‌کند. مقدار بازگشتی باید یک تابع رندر باشد که از هر دو `h()` و JSX پشتیبانی می‌کند.

  ```js
  import { ref, h } from 'vue'

  const Comp = defineComponent(
    (props) => {
     // از API ترکیب در اینجا استفاده کنید مانند آنچه در <script setup> انجام می‌دهید
      const count = ref(0)

      return () => {
    // تابع رندر یا JSX
        return h('div', count.value)
      }
    },
   // گزینه‌های اضافی، مثلاً تعریف پراپ ها و emits    {
      props: {
        /* ... */
      }
    }
  )
  ```
   اصلی‌ترین کاربرد این امضای تابع در تایپ‌اسکریپت (مخصوصاً در TSX) است زیرا از ژنریک‌ها پشتیبانی می‌کند:
   
  ```tsx
  const Comp = defineComponent(
    <T extends string | number>(props: { msg: T; list: T[] }) => {

      //در اینجا از Composition API همانند `<script setup>` استفاده کنید.
      const count = ref(0)

      return () => {
        // تابع رندر یا JSX
        return <div>{count.value}</div>
      }
    },
    // تعریف دستی ویژگی‌های زمان اجرا همچنان الزامی است.
    {
      props: ['msg', 'list']
    }
  )
  ```
   در آینده، قصد داریم یک پلاگین Babel ارائه دهیم که به طور خودکار ویژگی‌های زمان اجرا (مانند  `defineProps` در فایل‌های SFC) را استخراج و درج کند، به طوری که تعریف ویژگی‌های زمان اجرا قابل حذف باشد.

  ### یادداشتی درباره ترمیم وب‌پک {#note-on-webpack-treeshaking}

  چون `defineComponent()` یک فراخوانی تابع است، ممکن است به نظر برسد که این عملیات برخی از ابزارهای ساخت مانند webpack را تحت تأثیر قرار می‌دهد. این عمل  باعث می‌شود که حتی اگر کامپوننتی استفاده نشده باشد، کدهای غیرضروری حذف نشوند.

  برای اعلام به webpack که این فراخوانی تابع باید کد های بی استفاده را حذف کند، می‌توانید نشانه کامنت `/*#__PURE__*/` را قبل از فراخوانی تابع اضافه کنید:

  ```js
  export default /*#__PURE__*/ defineComponent(/* ... */)
  ```
  اگر از Vite استفاده می‌کنید، نیازی به این کار نیست؛ چرا که Rollup (بسته‌بندی تولیدی اصلی که Vite از آن استفاده می‌کند) هوشمندانه تشخیص می‌دهد که `defineComponent()` در واقع بدون اثر جانبی است و نیازی به نشانه‌گذاری دستی ندارد.

- **مشاهده بیشتر**  [راهنما - استفاده از Vue با TypeScript](/guide/typescript/overview#general-usage-notes)

## defineAsyncComponent() {#defineasynccomponent}

تعریف یک کامپوننت ناهمگام که تنها زمانی بارگذاری(lazy load) می‌شود که رندر می‌شود. آرگومان می‌تواند یک تابع بارگذاری یا یک شیء از گزینه ها برای کنترل پیشرفته‌تر رفتار بارگذاری باشد.

- **تایپ**

  ```ts
  function defineAsyncComponent(
    source: AsyncComponentLoader | AsyncComponentOptions
  ): Component

  type AsyncComponentLoader = () => Promise<Component>

  interface AsyncComponentOptions {
    loader: AsyncComponentLoader
    loadingComponent?: Component
    errorComponent?: Component
    delay?: number
    timeout?: number
    suspensible?: boolean
    onError?: (
      error: Error,
      retry: () => void,
      fail: () => void,
      attempts: number
    ) => any
  }
  ```

- **مشاهده بیشتر** [راهنما - کامپوننت های ناهمگام](/guide/components/async)

## defineCustomElement() {#definecustomelement}

این تابع همان آرگومانی را که در [`defineComponent`](#definecomponent) استفاده می‌شود را قبول می‌کند، اما به جای آن، یک سازنده (constructor)  کلاس اصلی برای [المان سفارشی](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements)  برمی‌گرداند.

- **تایپ**

  ```ts
  function defineCustomElement(
    component:
      | (ComponentOptions & { styles?: string[] })
      | ComponentOptions['setup']
  ): {
    new (props?: object): HTMLElement
  }
  ```

  > تایپ ساده‌تر شده است تا خوانایی بیشتری داشته باشد.

- **جزییات**

  همچنین، به جز گزینه‌های معمول کامپوننت، `defineCustomElement()` از یک گزینه ویژه به نام `styles` نیز پشتیبانی می‌کند. این گزینه باید شامل یک آرایه از رشته‌های CSS باشد که برای تزریق استایل‌ها به ریشه عنصر موردنظر استفاده می‌شود.

  مقدار بازگشتی ، یک سازنده عنصر سفارشی است که می‌توان از طریق [`customElements.define()`](https://developer.mozilla.org/en-US/docs/Web/API/CustomElementRegistry/define) ثبت نمود.

- **مثال**

  ```js
  import { defineCustomElement } from 'vue'

  const MyVueElement = defineCustomElement({
    /* component گزینه های */
  })

  // المان شخصی سازی شده ثبت می شود.
  customElements.define('my-vue-element', MyVueElement)
  ```

- **مشاهده بیشتر**

  - [راهنما - ساخت المان شخصی سازی شده با  Vue](/guide/extras/web-components#building-custom-elements-with-vue)

  - همچنین به یاد داشته باشید که `defineCustomElement()` وقتی با کامپوننت تک فایلی استفاده می شود نیاز به [تنظیمات ویژه](/guide/extras/web-components#sfc-as-custom-element) دارد.
