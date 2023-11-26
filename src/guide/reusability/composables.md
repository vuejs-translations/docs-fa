# ترکیب‌پذیرها {#composables}

<script setup>
import { useMouse } from './mouse'
const { x, y } = useMouse()
</script>

:::tip نکته
این بخش به دانش پایه‌ای در مورد Composition API نیاز دارد. اگر تاکنون فقط با Options API آشنا شده‌اید، می‌توانید اولویت API را به Composition API تغییر دهید (با استفاده از تاگل در بالای نوار کناری سمت چپ) و فصل‌های [مبانی واکنش‌گرایی](/guide/essentials/reactivity-fundamentals) و [قلاب‌های چرخه حیات](/guide/essentials/lifecycle) را مجدداً مطالعه کنید.
:::

## یک "ترکیب پذیر" چیست؟ {#what-is-a-composable}

در برنامه‌های Vue، یک "ترکیب‌پذیر" تابعی است که از Composition API استفاده می‌کند تا منطق **دارای حالت** را کپسوله‌سازی و قابل استفاده مجدد کند.

هنگام ساخت برنامه‌های فرانت‌اند، اغلب به استفاده مجدد از منطق برای انجام وظایف مشترک نیاز داریم. به عنوان مثال، ممکن است بخواهیم تاریخ‌ها را در بسیاری از نقاط فرمت کنیم، بنابراین یک تابع قابل استفاده مجدد برای این کار استخراج می‌کنیم. این تابع فرمت‌کننده منطق بدون حالت را کپسوله می‌کند: ورودی‌هایی را دریافت می‌کند و بلافاصله خروجی مورد انتظار را برمی‌گرداند. کتابخانه‌های زیادی برای استفاده مجدد از منطق بدون حالت وجود دارند - به عنوان مثال lodash و date-fns که ممکن است شما از آن‌ها شنیده باشید.

در مقابل، منطق دارای حالت شامل مدیریت حالت‌هایی است که با گذر زمان تغییر می‌کنند. یک مثال ساده ردیابی موقعیت فعلی ماوس در یک صفحه است. در سناریوهای واقعی‌تر، می‌تواند منطق پیچیده‌تری مانند حرکات لمسی یا وضعیت اتصال به یک پایگاه داده باشد.

## مثال ردیاب ماوس {#mouse-tracker-example}

اگر بخواهیم عملکرد ردیابی ماوس را با استفاده از Composition API مستقیماً در داخل یک کامپوننت پیاده سازی کنیم، به شکل زیر خواهد بود:

```vue
<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const x = ref(0)
const y = ref(0)

function update(event) {
  x.value = event.pageX
  y.value = event.pageY
}

onMounted(() => window.addEventListener('mousemove', update))
onUnmounted(() => window.removeEventListener('mousemove', update))
</script>

<template>Mouse position is at: {{ x }}, {{ y }}</template>
```

اما اگر بخواهیم از یک منطق در چندین کامپوننت دوباره استفاده کنیم، چه؟ ما می توانیم منطق را به عنوان یک تابع ترکیبی در یک فایل خارجی استخراج کنیم:

```js
// mouse.js
import { ref, onMounted, onUnmounted } from 'vue'

// by convention, composable function names start with "use"
export function useMouse() {
  // state encapsulated and managed by the composable
  const x = ref(0)
  const y = ref(0)

  // a composable can update its managed state over time.
  function update(event) {
    x.value = event.pageX
    y.value = event.pageY
  }

  // a composable can also hook into its owner component's
  // lifecycle to setup and teardown side effects.
  onMounted(() => window.addEventListener('mousemove', update))
  onUnmounted(() => window.removeEventListener('mousemove', update))

  // expose managed state as return value
  return { x, y }
}
```

و به این صورت می توان از آن در کامپوننت ها استفاده کرد:

```vue
<script setup>
import { useMouse } from './mouse.js'

const { x, y } = useMouse()
</script>

<template>Mouse position is at: {{ x }}, {{ y }}</template>
```

<div class="demo">
  Mouse position is at: {{ x }}, {{ y }}
</div>

[Try it in the Playground](https://play.vuejs.org/#eNqNkj1rwzAQhv/KocUOGKVzSAIdurVjoQUvJj4XlfgkJNmxMfrvPcmJkkKHLrbu69H7SlrEszFyHFDsxN6drDIeHPrBHGtSvdHWwwKDwzfNHwjQWd1DIbd9jOW3K2qq6aTJxb6pgpl7Dnmg3NS0365YBnLgsTfnxiNHACvUaKe80gTKQeN3sDAIQqjignEhIvKYqMRta1acFVrsKtDEQPLYxuU7cV8Msmg2mdTilIa6gU5p27tYWKKq1c3ENphaPrGFW25+yMXsHWFaFlfiiOSvFIBJjs15QJ5JeWmaL/xYS/Mfpc9YYrPxl52ULOpwhIuiVl9k07Yvsf9VOY+EtizSWfR6xKK6itgkvQ/+fyNs6v4XJXIsPwVL+WprCiL8AEUxw5s=)

همانطور که می‌بینید، منطق اصلی یکسان باقی مانده است - تنها کاری که باید انجام می‌دادیم این بود که آن را در یک تابع خارجی جابجا کنیم و حالت‌هایی که باید نشان داده شوند را برگردانیم. درست مثل داخل یک کامپوننت، می‌توانید از تمام API‌های [Composition](/api/#composition-api) در ترکیب‌پذیرها استفاده کنید. همان `useMouse()` می‌تواند حالا در هر کامپوننتی استفاده شود.

قسمت جالب ترکیب‌پذیرها این است که می‌توانید آن‌ها را درون هم قرار دهید: یک تابع ترکیب‌پذیر می‌تواند یک یا چند تابع ترکیب‌پذیر دیگر را صدا بزند. این امکان به ما می‌دهد تا منطق پیچیده را با استفاده از واحدهای کوچک و مجزا ترکیب کنیم، شبیه به چگونگی ترکیب یک برنامه کامل با استفاده از کامپوننت‌ها. در واقع، همین دلیلی بود که تصمیم گرفتیم مجموعه API‌هایی که این الگو را ممکن می‌سازند را Composition API بنامیم.

به عنوان مثال، می‌توانیم منطق افزودن و حذف یک شنونده رویداد DOM را در composable خودش استخراج کنیم:

```js
// event.js
import { onMounted, onUnmounted } from 'vue'

export function useEventListener(target, event, callback) {
  // if you want, you can also make this
  // support selector strings as target
  onMounted(() => target.addEventListener(event, callback))
  onUnmounted(() => target.removeEventListener(event, callback))
}
```

و حالا useMouse() ترکیب‌پذیر ما می‌تواند ساده‌تر شود:

```js{3,9-12}
// mouse.js
import { ref } from 'vue'
import { useEventListener } from './event'

export function useMouse() {
  const x = ref(0)
  const y = ref(0)

  useEventListener(window, 'mousemove', (event) => {
    x.value = event.pageX
    y.value = event.pageY
  })

  return { x, y }
}
```

:::tip نکته
هر مثال کامپوننت که `useMouse()` را صدا می‌زند، کپی‌های خود را از حالت‌های `x` و `y` ایجاد می‌کند تا با یکدیگر تداخل پیدا نکنند. اگر می‌خواهید حالت مشترک بین کامپوننت‌ها را مدیریت کنید، فصل [مدیریت حالت](/guide/scaling-up/state-management) را بخوانید.
:::

## مثال حالت Async {#async-state-example}

ترکیب‌پذیر `useMouse()` هیچ آرگومانی نمی‌پذیرد، پس یک مثال دیگر را که از یک آرگومان استفاده می‌کند بررسی کنیم. هنگام دریافت داده‌های Async اغلب باید حالت‌های مختلف را مدیریت کنیم: بارگذاری، موفقیت و خطا:

```vue
<script setup>
import { ref } from 'vue'

const data = ref(null)
const error = ref(null)

fetch('...')
  .then((res) => res.json())
  .then((json) => (data.value = json))
  .catch((err) => (error.value = err))
</script>

<template>
  <div v-if="error">Oops! Error encountered: {{ error.message }}</div>
  <div v-else-if="data">
    Data loaded:
    <pre>{{ data }}</pre>
  </div>
  <div v-else>Loading...</div>
</template>
```

تکرار این الگو در هر کامپوننتی که نیاز به دریافت داده دارد، خسته‌کننده خواهد بود. بیایید آن را در یک ترکیب‌پذیر استخراج کنیم:

```js
// fetch.js
import { ref } from 'vue'

export function useFetch(url) {
  const data = ref(null)
  const error = ref(null)

  fetch(url)
    .then((res) => res.json())
    .then((json) => (data.value = json))
    .catch((err) => (error.value = err))

  return { data, error }
}
```

حالا در کامپوننت ما می‌توانیم فقط این کار را انجام دهیم:

```vue
<script setup>
import { useFetch } from './fetch.js'

const { data, error } = useFetch('...')
</script>
```

### Accepting Reactive State {#accepting-reactive-state}

`useFetch()` takes a static URL string as input - so it performs the fetch only once and is then done. What if we want it to re-fetch whenever the URL changes? In order to achieve this, we need to pass reactive state into the composable function, and let the composable create watchers that perform actions using the passed state.

For example, `useFetch()` should be able to accept a ref:

```js
const url = ref('/initial-url')

const { data, error } = useFetch(url)

// this should trigger a re-fetch
url.value = '/new-url'
```

Or, accept a getter function:

```js
// re-fetch when props.id changes
const { data, error } = useFetch(() => `/posts/${props.id}`)
```

We can refactor our existing implementation with the [`watchEffect()`](/api/reactivity-core.html#watcheffect) and [`toValue()`](/api/reactivity-utilities.html#tovalue) APIs:

```js{8,13}
// fetch.js
import { ref, watchEffect, toValue } from 'vue'

export function useFetch(url) {
  const data = ref(null)
  const error = ref(null)

  const fetchData = () => {
    // reset state before fetching..
    data.value = null
    error.value = null

    fetch(toValue(url))
      .then((res) => res.json())
      .then((json) => (data.value = json))
      .catch((err) => (error.value = err))
  }

  watchEffect(() => {
    fetchData()
  })

  return { data, error }
}
```

`toValue()` is an API added in 3.3. It is designed to normalize refs or getters into values. If the argument is a ref, it returns the ref's value; if the argument is a function, it will call the function and return its return value. Otherwise, it returns the argument as-is. It works similarly to [`unref()`](/api/reactivity-utilities.html#unref), but with special treatment for functions.

Notice that `toValue(url)` is called **inside** the `watchEffect` callback. This ensures that any reactive dependencies accessed during the `toValue()` normalization are tracked by the watcher.

This version of `useFetch()` now accepts static URL strings, refs, and getters, making it much more flexible. The watch effect will run immediately, and will track any dependencies accessed during `toValue(url)`. If no dependencies are tracked (e.g. url is already a string), the effect runs only once; otherwise, it will re-run whenever a tracked dependency changes.

Here's [the updated version of `useFetch()`](https://play.vuejs.org/#eNp9Vdtu40YM/RVWL1ZQr5RF0JfAMXpLgRZtd5Fu90kvY4mKJ5FnhLnYMQz/+5IcSZF3g30IbPNyyHPIYU7ZL31f7CNmt9nK1073ATyG2K8ro3e9dQFO4LBdQm13fQzYwBlaZ3ewoKTFLCh6/ANDvZ38RTmaiidPkZWprfEBNsrj/66DO1hsQ+j9bVk+eWv6TtW4tV2DrgjHXte2wYKKlsE21pcEkNJ1Q5nUUb54v7gajVHwxhbz/Aru1lOhHymn2KsuIsWPGSdoVFBLQOeso57vJgI5gc0CHQZ3JHfCPFUGJjimQH1dGt6T5VyZVZnUJB3pR8Ad8QtIvwD+tqqB3gqXWzasNjEEa2D/rrXurso0aAM/VRn8XHe6fmYLk9ZVtj6dQMP5vCpTiqBXYdXoPWXrlkKFEEUyMEH36w+29z/AvfBEIhVNQIfNLRCWBBc79F49ouDy4CVx6GlqQXQg3Af+nNWn0JLKp2+pD+w8pmZYY8r5nT6gI9pcdtU7ZB7sSyXp95sYa1ZKm8eiKEb/qpykzJbZbMFofy/39aDIcd+2WIclBPtZ5nO5u5XBF0lpo6mDJrYXO5CGnbZAmk17Z2LH+zF60gJ95eK/WQO58kdTz1cIoCwphZ4a+EBsYIM0e4SWqwvlFMV1p91i+GROc/vWPoe23R4hbFEeRwrlLrbOGht9dwRvQYeFh+BU/UwPW3lQE0CDPZqG9uUIm+MFFyE4sifspOzdqPHwfF674eczcBZk5YJuda1VR0U6dQTqVpmGxpJWl+ULAOqgdICgd2jjUJTNBBANa30FB911/DyjM8KTrANP3SZmim38QIbSlsLcQfukS4oVlA1nM5DI8E77gUAYb4AngqkjmRCTFLZ8KAT9YlApkrJoMa0ZFTtDzTJCjsNqfTtJHCL54yxHCEaGXx0sOTKVeUPPykzrPKmX6g1IBg/wkZ4B6ZDnw6IsyflE051vKC3npwHgYnPp3rWQ/6PCtkiDI+8aroubGS0uJsAjeabPb/oyhEvm3I+cp3zxkBZBfi2uXlMHWZZwc30tVhbnTBcgeJpQqx9FaLoBgl5l/J9Ad+g+9KyDrzK6dsNIM9V19vCX2IKLuBzt9Rbr5zfsT/6FbVX2kd+r22OVTb6g3COG5L7/7198oe+Tc2eb2FH0d5wPLFLkHlPYr9E01PYsTrr9Uy4bnYVP/v4loPEjKW5U5JD4KqO79tt3qL+2e1PcSB6reP4CbzCltA==), with an artificial delay and randomized error for demo purposes.

## Conventions and Best Practices {#conventions-and-best-practices}

### Naming {#naming}

It is a convention to name composable functions with camelCase names that start with "use".

### Input Arguments {#input-arguments}

A composable can accept ref or getter arguments even if it doesn't rely on them for reactivity. If you are writing a composable that may be used by other developers, it's a good idea to handle the case of input arguments being refs or getters instead of raw values. The [`toValue()`](/api/reactivity-utilities#tovalue) utility function will come in handy for this purpose:

```js
import { toValue } from 'vue'

function useFeature(maybeRefOrGetter) {
  // If maybeRefOrGetter is a ref or a getter,
  // its normalized value will be returned.
  // Otherwise, it is returned as-is.
  const value = toValue(maybeRefOrGetter)
}
```

If your composable creates reactive effects when the input is a ref or a getter, make sure to either explicitly watch the ref / getter with `watch()`, or call `toValue()` inside a `watchEffect()` so that it is properly tracked.

The [useFetch() implementation discussed earlier](#accepting-reactive-state) provides a concrete example of a composable that accepts refs, getters and plain values as input argument.

### Return Values {#return-values}

You have probably noticed that we have been exclusively using `ref()` instead of `reactive()` in composables. The recommended convention is for composables to always return a plain, non-reactive object containing multiple refs. This allows it to be destructured in components while retaining reactivity:

```js
// x and y are refs
const { x, y } = useMouse()
```

Returning a reactive object from a composable will cause such destructures to lose the reactivity connection to the state inside the composable, while the refs will retain that connection.

If you prefer to use returned state from composables as object properties, you can wrap the returned object with `reactive()` so that the refs are unwrapped. For example:

```js
const mouse = reactive(useMouse())
// mouse.x is linked to original ref
console.log(mouse.x)
```

```vue-html
Mouse position is at: {{ mouse.x }}, {{ mouse.y }}
```

### Side Effects {#side-effects}

It is OK to perform side effects (e.g. adding DOM event listeners or fetching data) in composables, but pay attention to the following rules:

- If you are working on an application that uses [Server-Side Rendering](/guide/scaling-up/ssr) (SSR), make sure to perform DOM-specific side effects in post-mount lifecycle hooks, e.g. `onMounted()`. These hooks are only called in the browser, so you can be sure that code inside them has access to the DOM.

- Remember to clean up side effects in `onUnmounted()`. For example, if a composable sets up a DOM event listener, it should remove that listener in `onUnmounted()` as we have seen in the `useMouse()` example. It can be a good idea to use a composable that automatically does this for you, like the `useEventListener()` example.

### Usage Restrictions {#usage-restrictions}

Composables should only be called in `<script setup>` or the `setup()` hook. They should also be called **synchronously** in these contexts. In some cases, you can also call them in lifecycle hooks like `onMounted()`.

These restrictions are important because these are the contexts where Vue is able to determine the current active component instance. Access to an active component instance is necessary so that:

1. Lifecycle hooks can be registered to it.

2. Computed properties and watchers can be linked to it, so that they can be disposed when the instance is unmounted to prevent memory leaks.

:::tip
`<script setup>` is the only place where you can call composables **after** using `await`. The compiler automatically restores the active instance context for you after the async operation.
:::

## Extracting Composables for Code Organization {#extracting-composables-for-code-organization}

Composables can be extracted not only for reuse, but also for code organization. As the complexity of your components grow, you may end up with components that are too large to navigate and reason about. Composition API gives you the full flexibility to organize your component code into smaller functions based on logical concerns:

```vue
<script setup>
import { useFeatureA } from './featureA.js'
import { useFeatureB } from './featureB.js'
import { useFeatureC } from './featureC.js'

const { foo, bar } = useFeatureA()
const { baz } = useFeatureB(foo)
const { qux } = useFeatureC(baz)
</script>
```

To some extent, you can think of these extracted composables as component-scoped services that can talk to one another.

## Using Composables in Options API {#using-composables-in-options-api}

If you are using Options API, composables must be called inside `setup()`, and the returned bindings must be returned from `setup()` so that they are exposed to `this` and the template:

```js
import { useMouse } from './mouse.js'
import { useFetch } from './fetch.js'

export default {
  setup() {
    const { x, y } = useMouse()
    const { data, error } = useFetch('...')
    return { x, y, data, error }
  },
  mounted() {
    // setup() exposed properties can be accessed on `this`
    console.log(this.x)
  }
  // ...other options
}
```

## Comparisons with Other Techniques {#comparisons-with-other-techniques}

### vs. Mixins {#vs-mixins}

Users coming from Vue 2 may be familiar with the [mixins](/api/options-composition#mixins) option, which also allows us to extract component logic into reusable units. There are three primary drawbacks to mixins:

1. **Unclear source of properties**: when using many mixins, it becomes unclear which instance property is injected by which mixin, making it difficult to trace the implementation and understand the component's behavior. This is also why we recommend using the refs + destructure pattern for composables: it makes the property source clear in consuming components.

2. **Namespace collisions**: multiple mixins from different authors can potentially register the same property keys, causing namespace collisions. With composables, you can rename the destructured variables if there are conflicting keys from different composables.

3. **Implicit cross-mixin communication**: multiple mixins that need to interact with one another have to rely on shared property keys, making them implicitly coupled. With composables, values returned from one composable can be passed into another as arguments, just like normal functions.

For the above reasons, we no longer recommend using mixins in Vue 3. The feature is kept only for migration and familiarity reasons.

### vs. Renderless Components {#vs-renderless-components}

In the component slots chapter, we discussed the [Renderless Component](/guide/components/slots#renderless-components) pattern based on scoped slots. We even implemented the same mouse tracking demo using renderless components.

The main advantage of composables over renderless components is that composables do not incur the extra component instance overhead. When used across an entire application, the amount of extra component instances created by the renderless component pattern can become a noticeable performance overhead.

The recommendation is to use composables when reusing pure logic, and use components when reusing both logic and visual layout.

### vs. React Hooks {#vs-react-hooks}

If you have experience with React, you may notice that this looks very similar to custom React hooks. Composition API was in part inspired by React hooks, and Vue composables are indeed similar to React hooks in terms of logic composition capabilities. However, Vue composables are based on Vue's fine-grained reactivity system, which is fundamentally different from React hooks' execution model. This is discussed in more detail in the [Composition API FAQ](/guide/extras/composition-api-faq#comparison-with-react-hooks).

## Further Reading {#further-reading}

- [Reactivity In Depth](/guide/extras/reactivity-in-depth): for a low-level understanding of how Vue's reactivity system works.
- [State Management](/guide/scaling-up/state-management): for patterns of managing state shared by multiple components.
- [Testing Composables](/guide/scaling-up/testing#testing-composables): tips on unit testing composables.
- [VueUse](https://vueuse.org/): an ever-growing collection of Vue composables. The source code is also a great learning resource.
