# Lifecycle and Template Refs {#lifecycle-and-template-refs}

تا اینجا Vue به ما کمک کرده است تا تمام به‌روزرسانی‌های DOM به صورت خودکار انجام شود، از طریق reactivity (واکنش‌پذیری) و declarative rendering (رندرینگ صریح). با این حال، بدون شک مواردی وجود دارد که نیاز به دسترسی مستقیم به DOM داریم.

می‌توانیم یک template ref را با استفاده از <a target="_blank" href="/api/built-in-special-attributes.html#ref">اتریبیوت مخصوصی به نام ref</a> دریافت کنیم (به عبارت دقیق‌تر یک ارجاع به یک عنصر در تمپلیت):

```vue-html
<p ref="pElementRef">hello</p>
```

<div class="composition-api">

برای دسترسی به ref (ارجاع از عنصر)، باید یک ref (reactive state) با همان نام تعریف کنیم<span class="html"> و اجازه دهیم تا کدهای دیگر به این ref دسترسی پیدا کنند</span>:

<div class="sfc">

```js
const pElementRef = ref(null)
```

</div>
<div class="html">

```js
setup() {
  const pElementRef = ref(null)

  return {
    pElementRef
  }
}
```

</div>

توجه کنید که ref با مقدار null مقداردهی اولیه می‌شود. این به این دلیل است که عنصر هنوز وجود ندارد زمانی که <span class="sfc">`<script setup>`</span> <span class="html">`setup()‎`</span> اجرا می‌شوند. template ref تنها پس از اینکه کامپوننت به صورت **mounted** شده باشد، قابل دسترسی است.

برای اجرای کد بعد از mount شدن، می‌توانیم از تابع `onMounted()‎` استفاده کنیم:

<div class="sfc">

```js
import { onMounted } from 'vue'

onMounted(() => {
  // component is now mounted.
})
```

</div>
<div class="html">

```js
import { onMounted } from 'vue'

createApp({
  setup() {
    onMounted(() => {
      // component is now mounted.
    })
  }
})
```

</div>
</div>

<div class="options-api">

عنصر به عنوان `this.$refs.pElementRef` در `this.$refs` قابل دسترسی خواهد بود. با این حال، شما فقط زمانی می‌توانید به آن دسترسی پیدا کنید پس از اینکه کامپوننت به صورت **mounted** باشد.

برای اجرای کد بعد از mount شدن، می‌توانیم از گزینه `mounted` استفاده کنیم:

<div class="sfc">

```js
export default {
  mounted() {
    // component is now mounted.
  }
}
```

</div>
<div class="html">

```js
createApp({
  mounted() {
    // component is now mounted.
  }
})
```

</div>
</div>

این به نام **هوک‌های چرخه حیات (lifecycle hook)** نیز شناخته می‌شود - این به ما امکان می‌دهد تا بازخوردی را در زمان‌های خاصی از چرخه حیات کامپوننت دریافت کنیم. هوک‌های دیگری نیز وجود دارند مانند <span class="options-api">`created` و `updated`</span><span class="composition-api">`onUpdated` و `onUnmounted`</span>. جهت کسب اطلاعات بیشتر می‌توانید به <a target="_blank" href="/guide/essentials/lifecycle.html#lifecycle-diagram">نمودار چرخه حیات (Lifecycle Diagram)</a> مراجعه کنید.

حالا تلاش کنید تا یک هوک <span class="options-api">`mounted`</span><span class="composition-api">`onMounted`</span> اضافه کنید، از طریق <span class="options-api">`this.$refs.pElementRef`</span><span class="composition-api">`pElementRef.value`</span> به عنصر `<p>` دسترسی پیدا کنید و عملیات مستقیمی روی DOM انجام دهید (مثلاً تغییر `textContent` آن).
