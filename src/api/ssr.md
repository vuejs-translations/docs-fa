# API رندر سمت سرور {#server-side-rendering-api}

## renderToString() {#rendertostring}

- **صادر شده از (exported from) `vue/server-renderer`**

- **تایپ (Type)**

  ```ts
  function renderToString(
    input: App | VNode,
    context?: SSRContext
  ): Promise<string>
  ```

- **مثال**

  ```js
  import { createSSRApp } from 'vue'
  import { renderToString } from 'vue/server-renderer'

  const app = createSSRApp({
    data: () => ({ msg: 'hello' }),
    template: `<div>{{ msg }}</div>`
  })

  ;(async () => {
    const html = await renderToString(app)
    console.log(html)
  })()
  ```

  ### زمینه‌ی رندر سمت سرور (SSR Context) {#ssr-context}

شما می‌توانید یک آبجکت زمینه‌ی(SSR Context) اختیاری ارسال کنید که می‌تواند برای ضبط داده‌های اضافی در طول رندر استفاده شود، به عنوان مثال [دسترسی به محتوای تله‌پورت‌ها](/guide/scaling-up/ssr#teleports):

```js
const ctx = {}
const html = await renderToString(app, ctx)

console.log(ctx.teleports) // { '#teleported': 'teleported content' }
```

اکثر دیگر API های SSR در این صفحه نیز به صورت اختیاری یک آبجکت زمینه را می‌پذیرند. از طریق راهنما [useSSRContext](#usessrcontext) می‌توان به آبجکت زمینه در کد کامپوننت دسترسی داشت.

- **همچنین ببینید** [راهنما - رندرینگ سمت سرور (SSR)](/guide/scaling-up/ssr)

## renderToNodeStream() {#rendertonodestream}

ورودی را به‌صورت [جریان قابل خواندن Node.js](https://nodejs.org/api/stream.html#stream_class_stream_readable) رندر می‌کند.

- **صادر شده از (exported from) `vue/server-renderer`**

- **تایپ (Type)**

  ```ts
  function renderToNodeStream(
    input: App | VNode,
    context?: SSRContext
  ): Readable
  ```

- **مثال**

  ```js
  // inside a Node.js http handler
  renderToNodeStream(app).pipe(res)
  ```

  :::tip نکته
  این روش در بیلد ماژول‌های ECMAScript که از محیط‌های Node.js جدا می‌شود، پشتیبانی نمی‌شود. به جای آن از [`pipeToNodeWritable`](#pipetonodewritable) استفاده کنید.
  :::

## pipeToNodeWritable() {#pipetonodewritable}

رندر کنید و به یک نمونه (instance) موجود [Node.js Writable stream](https://nodejs.org/api/stream.html#stream_writable_streams) ارسال کنید.

- **صادر شده از (exported from) `vue/server-renderer`**

- **تایپ (Type)**

  ```ts
  function pipeToNodeWritable(
    input: App | VNode,
    context: SSRContext = {},
    writable: Writable
  ): void
  ```

- **مثال**

  ```js
  // inside a Node.js http handler
  pipeToNodeWritable(app, {}, res)
  ```

## renderToWebStream() {#rendertowebstream}

ورودی را به صورت [Web ReadableStream](https://developer.mozilla.org/en-US/docs/Web/API/Streams_API) رندر می‌کند.

- **صادر شده از (exported from) `vue/server-renderer`**

- **تایپ (Type)**

  ```ts
  function renderToWebStream(
    input: App | VNode,
    context?: SSRContext
  ): ReadableStream
  ```

- **مثال**

  ```js
  // inside an environment with ReadableStream support
  return new Response(renderToWebStream(app))
  ```

  :::tip Note
  در محیط‌هایی که تابع سازنده `ReadableStream` را در اسکوپ سراسری نشان نمی‌دهند، باید به جای آن از [`pipeToWebWritable()`](#pipetowebwritable) استفاده شود.
  :::

## pipeToWebWritable() {#pipetowebwritable}

رندر کنید و به یک نمونه (instance) موجود [Web WritableStream](https://developer.mozilla.org/en-US/docs/Web/API/WritableStream) منتقل کنید.

- **صادر شده از (exported from) `vue/server-renderer`**

- **تایپ (Type)**

  ```ts
  function pipeToWebWritable(
    input: App | VNode,
    context: SSRContext = {},
    writable: WritableStream
  ): void
  ```

- **مثال**

  این معمولاً در ترکیب با [`TransformStream`](https://developer.mozilla.org/en-US/docs/Web/API/TransformStream) استفاده می‌شود:

  ```js
  // TransformStream is available in environments such as CloudFlare workers.
  // in Node.js, TransformStream needs to be explicitly imported from 'stream/web'
  const { readable, writable } = new TransformStream()
  pipeToWebWritable(app, {}, writable)

  return new Response(readable)
  ```

## renderToSimpleStream() {#rendertosimplestream}

ورودی را در حالت استریم با استفاده از یک رابط (interface) خوانا ساده رندر می‌کند.

- **صادر شده از (exported from) `vue/server-renderer`**

- **تایپ (Type)**

  ```ts
  function renderToSimpleStream(
    input: App | VNode,
    context: SSRContext,
    options: SimpleReadable
  ): SimpleReadable

  interface SimpleReadable {
    push(content: string | null): void
    destroy(err: any): void
  }
  ```

- **مثال**

  ```js
  let res = ''

  renderToSimpleStream(
    app,
    {},
    {
      push(chunk) {
        if (chunk === null) {
          // done
          console(`render complete: ${res}`)
        } else {
          res += chunk
        }
      },
      destroy(err) {
        // error encountered
      }
    }
  )
  ```

## useSSRContext() {#usessrcontext}

یک runtime API برای بازیابی آبجکت زمینه ارسال شده به renderToString() یا دیگر APIهای رندر سرور استفاده می‌شود.

- **تایپ (Type)**

  ```ts
  function useSSRContext<T = Record<string, any>>(): T | undefined
  ```

- **مثال**

زمینه بازیابی شده را می‌توان برای پیوست کردن اطلاعاتی که برای رندر کردن HTML نهایی مورد نیاز است (مانند متادیتای head) استفاده کرد.

```vue
<script setup>
import { useSSRContext } from 'vue'

// فراخوانی کنید SSR مطمئن شوید که این تابع را فقط در زمان
// https://vite.dev/guide/ssr.html#conditional-logic
if (import.meta.env.SSR) {
  const ctx = useSSRContext()
  // ...خواص مورد نیاز را به کانتکست اضافه کنید
}
</script>
```

## data-allow-mismatch <sup class="vt-badge" data-text="3.5+" /> {#data-allow-mismatch}

یک اتریبیوت خاص که می‌تواند برای جلوگیری از هشدارهای [hydration mismatch](/guide/scaling-up/ssr#hydration-mismatch) استفاده شود.

- **مثال**

  ```html
  <div data-allow-mismatch="text">{{ data.toLocaleString() }}</div>
  ```

  مقدار این اتریبیوت می‌تواند عدم تطابق مجاز را به یک تایپ خاص محدود کند. مقادیر مجاز عبارتند از:

  - `text`
  - `children` (فقط عدم تطابق برای فرزندان مستقیم مجاز است)
  - `class`
  - `style`
  - `attribute`

  اگر هیچ مقداری ارائه نشود، تمام انواع عدم تطابق‌ها مجاز خواهند بود.
