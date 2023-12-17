<script setup>
import { onMounted } from 'vue'

if (typeof window !== 'undefined') {
  const hash = window.location.hash

  // The docs for v-model used to be part of this page. Attempt to redirect outdated links.
  if ([
    '#usage-with-v-model',
    '#v-model-arguments',
    '#multiple-v-model-bindings',
    '#handling-v-model-modifiers'
  ].includes(hash)) {
    onMounted(() => {
      window.location = './v-model.html' + hash
    })
  }
}
</script>

# رویدادهای کامپوننت {#component-events}

> این صفحه فرض می کند که شما از قبل [اصول اولیه کامپوننت‌ها](/guide/essentials/component-basics) را خوانده اید. اگر در مبحث کامپوننت ها تازه وارد هستید اول آن را مطالعه کنید .

<div class="options-api">
  <VueSchoolLink href="https://vueschool.io/lessons/defining-custom-events-emits" title="Free Vue.js Lesson on Defining Custom Events"/>
</div>

## اِمیت کردن و گوش دادن به رویدادها {#emitting-and-listening-to-events}

یک کامپوننت می‌تواند رویدادهای سفارشی را مستقیماً در عبارات تمپلیت (مثلاً در کنترل‌کننده «v-on») با استفاده از روش «$emit» نهادینه شده منتشر کند:

```vue-html
<!-- MyComponent -->
<button @click="$emit('someEvent')">click me</button>
```

<div class="options-api">

روش `$emit()` نیز در نمونه کامپوننت به عنوان `this.$emit()` موجود است:

```js
export default {
  methods: {
    submit() {
      this.$emit('someEvent')
    }
  }
}
```

</div>

والد بعدا می تواند با استفاده از `v-on` به آن گوش دهد:

```vue-html
<MyComponent @some-event="callback" />
```

پیراینده `.once` در شنوندگان رویداد(event listeners) کامپوننت نیز پشتیبانی می‌شود:

```vue-html
<MyComponent @some-event.once="callback" />
```

مانند کامپوننت‌ها و پراپ ها، نام رویدادها یک تغییر حالت خودکار را ایجاد می‌کنند. توجه کنید که ما یک رویداد camelCase را منتشر کردیم، اما می‌توانیم آن را با استفاده از شنونده kebab-cased در والد گوش دهیم. مانند [props casing](/guide/components/props#prop-name-casing)، توصیه می‌کنیم از شنونده‌های رویداد kebab-cased در تمپلیت ها استفاده کنید.

:::tip
بر خلاف رویدادهای DOM بومی، رویدادهای اِمیت شده کامپوننت حباب **نمی‌شوند**. شما فقط می توانید به رویدادهای منتشر شده توسط یک کامپوننت مستقیم فرزند گوش دهید. اگر نیاز به برقراری ارتباط بین کامپوننت های خواهر و برادر یا کامپوننت های عمیق تو در تو وجود دارد، از یک گذرگاه رویداد خارجی یا یک [راه حل مدیریت state همگانی](/guide/scaling-up/state-management) استفاده کنید.
:::

## آرگومان های رویداد {#event-arguments}

گاهی اوقات انتشار یک مقدار خاص همراه با یک رویداد مفید است. به عنوان مثال، ممکن است بخواهیم کامپوننت `<BlogPost>` مسئول میزان بزرگ‌نمایی متن باشد. در این موارد، می‌توانیم آرگومان‌های اضافی را به `$emit` ارسال کنیم تا این مقدار را ارائه کنیم:

```vue-html
<button @click="$emit('increaseBy', 1)">
  Increase by 1
</button>
```

سپس، هنگامی که به رویداد در والد گوش می دهیم، می توانیم از یک تابع پیکان درون خطی به عنوان شنونده استفاده کنیم که به ما امکان می دهد به آرگومان رویداد دسترسی پیدا کنیم:

```vue-html
<MyButton @increase-by="(n) => count += n" />
```

یا اگر کنترل کننده رویداد(event handler) یک متد باشد:

```vue-html
<MyButton @increase-by="increaseCount" />
```

سپس مقدار به عنوان اولین پارامتر آن متد ارسال می شود:

<div class="options-api">

```js
methods: {
  increaseCount(n) {
    this.count += n
  }
}
```

</div>
<div class="composition-api">

```js
function increaseCount(n) {
  count.value += n
}
```

</div>

:::tip
همه آرگومان های اضافی پس از اینکه نام رویداد به شنونده ارسال می شود به `$emit()` ارسال می شوند . برای مثال، با `$emit('foo', 1, 2, 3)` تابع شنونده سه آرگومان دریافت خواهد کرد.
:::

## اعلام رویدادهای اِمیت شده {#declaring-emitted-events}

یک کامپوننت به صراحت می تواند رویدادهایی را که اِمیت می کند با استفاده از  <span class="composition-api">ماکرو [`defineEmits()`](/api/sfc-script-setup#defineprops-defineemits) اعلام کند</span><span class="options-api">گزینه(option) [`emits`](/api/options-state#emits) اعلام کند</span>:

<div class="composition-api">

```vue
<script setup>
defineEmits(['inFocus', 'submit'])
</script>
```

روش `$emit` که در `<template>` استفاده کردیم، در بخش `<script setup>` یک کامپوننت قابل دسترسی نیست، اما `defineEmits()` یک تابع معادل را برمی‌گرداند که می‌توانیم به جای آن از آن استفاده کنیم:

```vue
<script setup>
const emit = defineEmits(['inFocus', 'submit'])

function buttonClick() {
  emit('submit')
}
</script>
```

ماکرو `defineEmits()` **نمی‌تواند** در داخل یک تابع استفاده شود، باید مستقیماً در `<script setup>` قرار گیرد، مانند مثال بالا.

اگر از یک تابع `setup` صریح به جای `<script setup>` استفاده می‌کنید، رویدادها باید با استفاده از گزینه [`emits`](/api/options-state#emits) اعلان شوند و تابع `emit` در زمینه  `setup()` نمایش داده شود:

```js
export default {
  emits: ['inFocus', 'submit'],
  setup(props, ctx) {
    ctx.emit('submit')
  }
}
```

همانند سایر ویژگی های زمینه `setup()`، `emit` (destructured) را می توان با خیال راحت جداسازی کرد:

```js
export default {
  emits: ['inFocus', 'submit'],
  setup(props, { emit }) {
    emit('submit')
  }
}
```

</div>
<div class="options-api">

```js
export default {
  emits: ['inFocus', 'submit']
}
```

</div>

آپشن `emits` و ماکرو `defineEmits()‎` همچنین از سینتکس آبجکت پشتیبانی می‌کنند. اگر از TypeScript استفاده می‌کنید، می‌توانید برای آرگومان‌ها تایپ قرار دهید که به ما اجازه اعتبارسنجی زمان اجرا روی payload رویدادهای ارسال شده می‌دهد:

<div class="composition-api">

```vue
<script setup>
const emit = defineEmits({
  submit(payload: { email: string, password: string }) {
    // مقدار `true` یا `false` را برای نشان دادن
    // اعتبارسنجی موفقیت آمیز / شکست خورده برمی گرداند
  }
})
</script>
```

اگر از TypeScript با `<script setup>` استفاده می‌کنید، می‌توانید رویدادهای منتشر شده را با استفاده از حاشیه‌نویسی‌های نوع خالص (pure type annotations) اعلام کنید:

```vue
<script setup lang="ts">
const emit = defineEmits<{
  (e: 'change', id: number): void
  (e: 'update', value: string): void
}>()
</script>
```

جزئیات بیشتر: [Typing Component Emits](/guide/typescript/composition-api#typing-component-emits) <sup class="vt-badge ts" />

</div>
<div class="options-api">

```js
export default {
  emits: {
    submit(payload: { email: string, password: string }) {
      // مقدار `true` یا `false` را برای نشان دادن
      // اعتبارسنجی موفقیت آمیز / شکست خورده برمی گرداند
    }
  }
}
```

همچنین مشاهده کنید: [Typing Component Emits](/guide/typescript/options-api#typing-component-emits) <sup class="vt-badge ts" />

</div>

اگر چه اختیاری است، پیشنهاد می شود همه رویدادهای اِمیت شده را تعریف کنید تا نحوه کار یک کامپوننت را بهتر مستند کنید. همچنین به Vue اجازه می دهد شنوندگان (listeners) شناخته شده را از [fallthrough attributes](/guide/components/attrs#v-on-listener-inheritance) حذف کند، از موارد لبه ناشی از رویدادهای DOM که به صورت دستی توسط کد شخص ثالث ارسال می شوند، اجتناب می کند.

:::tip
اگر یک رویداد بومی (مثلاً `click`) در گزینه `emits` تعریف شده باشد، شنونده اکنون فقط به رویدادهای `click` منتشر شده از کامپوننت گوش می دهد و دیگر به رویدادهای `click` بومی پاسخ نمی دهد.
:::

## اعتبارسنجی رویدادها {#events-validation}

مشابه اعتبارسنجی نوع prop، یک رویداد اِمیت شده می تواند اعتبار سنجی شود اگر به جای نحو آرایه با نحو شی تعریف شده باشد.

برای افزودن اعتبارسنجی، به رویداد تابعی اختصاص داده می‌شود که آرگومان‌های ارسال شده به فراخوانی <span class="options-api">`this.$emit`</span><span class="composition-api">`emit`</span> را دریافت می‌کند و برای نشان دادن معتبر بودن یا نبودن رویداد، یک boolean برمی‌گرداند.

<div class="composition-api">

```vue
<script setup>
const emit = defineEmits({
  // بدون اعتبارسنجی
  click: null,

  // اعتبارسنجی رویداد submit
  submit: ({ email, password }) => {
    if (email && password) {
      return true
    } else {
      console.warn('Invalid submit event payload!')
      return false
    }
  }
})

function submitForm(email, password) {
  emit('submit', { email, password })
}
</script>
```

</div>
<div class="options-api">

```js
export default {
  emits: {
    // بدون اعتبارسنجی
    click: null,

    // اعتبارسنجی رویداد submit
    submit: ({ email, password }) => {
      if (email && password) {
        return true
      } else {
        console.warn('Invalid submit event payload!')
        return false
      }
    }
  },
  methods: {
    submitForm(email, password) {
      this.$emit('submit', { email, password })
    }
  }
}
```

</div>

## رویدادها به عنوان Props {#events-props}

شما همچنین می‌توانید `events` را به عنوان `props` تعریف کرده و پاس دهید، با اضافه کردن پیشوند `on` به نام رویدادی که با حرف بزرگ شروع می‌شود.

استفاده از `props.onEvent` رفتار متفاوتی نسبت به استفاده از `emit('event')` دارد، زیرا اولی تنها شنونده مبتنی بر پراپرتی را پردازش می‌کند (یا `‎@event` یا`‎:on-event`)

:::warning
اگر هر دو `‎:on-event` و `‎@event` پاس داده شوند، `props.onEvent` ممکن است به جای تابع، آرایه‌ای از توابع باشد. این رفتار ثابت نیست و ممکن است در آینده تغییر کند.
:::

به همین دلیل، توصیه می‌شود به جای استفاده از `props.onEvent` برای ارسال رویدادها از `emit('event')` استفاده کنید.
