# تلپورت - Teleport {#teleport}

 <VueSchoolLink href="https://vueschool.io/lessons/vue-3-teleport" title="Free Vue.js Teleport Lesson"/>

`<Teleport>` یک کامپوننت داخلی است که به ما این امکان را می‌دهد که یک بخش از قالب یک کامپوننت را به یک گره DOM منتقل کنیم که در سلسله مراتب DOM آن کامپوننت وجود ندارد.

## استفاده پایه {#basic-usage}

گاهی اوقات ممکن است به این وضعیت برخورد کنیم که یک بخش از تمپلیت یک کامپوننت از نظر منطقی به آن تعلق دارد، اما از نظر ظاهری باید در مکان دیگری در DOM نمایش داده شود، حتی خارج از ساختار DOM برنامه.

یکی از مثال‌های رایج این وضعیت زمانی است که یک مُدال تمام صفحه ای ایجاد می‌کنیم. بهتر است کد دکمه مدال و خود مدال در داخل همان کامپوننت قرار داشته باشند، زیرا هر دو به وضعیت باز/بسته بودن مدال مرتبط هستند. اما این به این معناست که مدال به همراه دکمه در سلسله مراتب DOM برنامه نمایش داده می‌شود و در نتیجه ممکن است موقعیت دهی مدال با استفاده از CSS مشکل‌ساز شود.

ساختار HTML زیر را در نظر بگیرید.

```vue-html
<div class="outer">
  <h3>Vue Teleport Example</h3>
  <div>
    <MyModal />
  </div>
</div>
```

و در ادامه پیاده‌سازی کامپوننت `<MyModal>` آمده است:

<div class="composition-api">

```vue
<script setup>
import { ref } from 'vue'

const open = ref(false)
</script>

<template>
  <button @click="open = true">Open Modal</button>

  <div v-if="open" class="modal">
    <p>Hello from the modal!</p>
    <button @click="open = false">Close</button>
  </div>
</template>

<style scoped>
.modal {
  position: fixed;
  z-index: 999;
  top: 20%;
  left: 50%;
  width: 300px;
  margin-left: -150px;
}
</style>
```

</div>
<div class="options-api">

```vue
<script>
export default {
  data() {
    return {
      open: false
    }
  }
}
</script>

<template>
  <button @click="open = true">Open Modal</button>

  <div v-if="open" class="modal">
    <p>Hello from the modal!</p>
    <button @click="open = false">Close</button>
  </div>
</template>

<style scoped>
.modal {
  position: fixed;
  z-index: 999;
  top: 20%;
  left: 50%;
  width: 300px;
  margin-left: -150px;
}
</style>
```

</div>

این کامپوننت شامل یک `<button>` برای ایجاد مدال و یک `<div>` با کلاس `‎.modal` است که حاوی محتوای مدال و یک دکمه برای بستن مدال به صورت خودکار می‌باشد.

هنگام استفاده از این کامپوننت در ساختار اولیه HTML، ممکن است با چندین مشکل مواجه شوید:

- خاصیت `position: fixed` ، زمانی که هیچ عنصر والدی خاصیت‌های `transform` یا `perspective` یا `filter` را نداشته باشد، به عنصر نسبت به viewport موقعیت می‌دهد . به عنوان مثال، اگر بخواهیم ویژگی‌ `transform` را روی عنصر `‎<div class="outer">‎` اعمال کنیم، ممکن است ساختار مدال را خراب کند!

- ویژگی `z-index` مدال توسط عناصر محتوایی که در آن قرار دارند، محدود می‌شود. اگر عنصر دیگری وجود داشته باشد که با `‎<div class="outer">‎` همپوشانی داشته باشد و دارای `z-index` بالاتری باشد، این عنصر ممکن است مدال ما را پوشش دهد.

`<Teleport>` راه مناسبی را برای حل این مشکلات فراهم می‌کند، زیرا به ما امکان می‌دهد از ساختار DOM تو در تو خارج شویم. در مثال زیر کامپوننت `<MyModal>` را تغییر می دهیم تا از `<Teleport>` استفاده کنیم:

```vue-html{3,8}
<button @click="open = true">Open Modal</button>

<Teleport to="body">
  <div v-if="open" class="modal">
    <p>Hello from the modal!</p>
    <button @click="open = false">Close</button>
  </div>
</Teleport>
```

وقتی از کامپوننت `<Teleport>` استفاده می‌کنید، باید مشخص کنید که محتوای آن باید به کجا "منتقل" شود. این کار را می‌توانید با ارائه یک استرینگ سلکتور CSS یا یک عنصر به **to** انجام دهید. در این مورد، به اصطلاح به Vue می‌گوییم: "این قطعه تمپلیت را به تگ body منتقل کن".

شما می‌توانید روی دکمه زیر کلیک کنید و تگ `<body>`را از طریق inspect بررسی کنید:

<script setup>
import { ref } from 'vue'
const open = ref(false)
</script>

<div class="demo">
  <button @click="open = true">Open Modal</button>
  <ClientOnly>
    <Teleport to="body">
      <div v-if="open" class="demo modal-demo">
        <p style="margin-bottom:20px">Hello from the modal!</p>
        <button @click="open = false">Close</button>
      </div>
    </Teleport>
  </ClientOnly>
</div>

<style>
.modal-demo {
  position: fixed;
  z-index: 999;
  top: 20%;
  left: 50%;
  width: 300px;
  margin-left: -150px;
  background-color: var(--vt-c-bg);
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}
</style>

شما می‌توانید `<Teleport>` را با [`<Transition>`](./transition) ترکیب کنید تا مدال‌هایی با انیمیشن ایجاد کنید - مثال را در [اینجا](/examples/#modal) ببینید. 

:::tip نکته
کامپوننت هدف (to) باید قبل از نصب کامپوننت `<Teleport>` در DOM موجود باشد. ایده‌آل است که این عنصر به عنوان یک عنصر خارج از ساختار کلی برنامه Vue در نظر گرفته شود. در صورتی که هدف انتخاب شده در داخل Vue باشد، باید اطمینان حاصل شود که این عنصر قبل از نصب و اجرای `<Teleport>` آماده و موجود باشد.
:::

## استفاده از آن با کامپوننت‌ها {#using-with-components}

`<Teleport>` تنها ساختار DOM نمایشی را تغییر می‌دهد و بر ساختار منطقی کامپوننت‌ها تأثیری نمی‌گذارد. به عبارت دیگر، اگر `<Teleport>` شامل یک کامپوننت باشد، آن کامپوننت همچنان به عنوان فرزند منطقی کامپوننت والدین حاوی `<Teleport>` باقی می‌ماند. انتقال پارامترها (props) و ارسال رویدادها به همان شیوه معمول انجام خواهد شد.

همچنین این معنی را دارد که injection انجام شده از کامپوننت والد به درستی عمل می‌کنند و کامپوننت فرزند در ابزارهای توسعه Vue زیر کامپوننت والد نمایش داده می‌شود، به جای اینکه در مکانی که محتوای واقعی به آن منتقل شده است قرار گیرد.

## غیرفعال کردن تلپورت {#disabling-teleport}

در برخی موارد، ممکن است بخواهیم `<Teleport>` را به صورت شرطی غیرفعال کنیم. به عنوان مثال، ممکن است بخواهیم یک کامپوننت را به عنوان یک لایه نمایشی برای دسکتاپ نمایش دهیم، اما در دستگاه‌های موبایل، به صورت تعاملی نمایش دهیم. `<Teleport>` از ویژگی `disabled` پشتیبانی می‌کند که می‌توان آن را به صورت پویا تغییر داد:

```vue-html
<Teleport :disabled="isMobile">
  ...
</Teleport>
```

سپس می‌توانیم به صورت پویا `isMobile` را به روز کنیم.

## چندین تلپورت بر روی یک هدف {#multiple-teleports-on-the-same-target}

یک مورد رایج می‌تواند شامل کامپوننت `<Modal>` باشد که امکان فعال شدن همزمان چندین نمونه را فراهم می‌کند. در این نوع سناریو، چندین کامپوننت `<Teleport>` می‌توانند محتوای خود را به همان عنصر هدف منتقل کنند. ترتیب اضافه کردن المان‌ها، به ترتیب انتقال‌دهی خواهد بود، به این معنا که المان‌های بعدی پس از المان‌های انتقالی اولیه در داخل عنصر هدف قرار می‌گیرند، اما همه در داخل همان عنصر هدف خواهند بود.

با توجه به موارد زیر:

```vue-html
<Teleport to="#modals">
  <div>A</div>
</Teleport>
<Teleport to="#modals">
  <div>B</div>
</Teleport>
```

نتیجه‌ی نهایی به صورت زیر خواهد بود:

```html
<div id="modals">
  <div>A</div>
  <div>B</div>
</div>
```

## Deferred Teleport <sup class="vt-badge" data-text="3.5+" /> {#deferred-teleport}

In Vue 3.5 and above, we can use the `defer` prop to defer the target resolving of a Teleport until other parts of the application have mounted. This allows the Teleport to target a container element that is rendered by Vue, but in a later part of the component tree:

```vue-html
<Teleport defer to="#late-div">...</Teleport>

<!-- somewhere later in the template -->
<div id="late-div"></div>
```

Note that the target element must be rendered in the same mount / update tick with the Teleport - i.e. if the `<div>` is only mounted a second later, the Teleport will still report an error. The defer works similarly to the `mounted` lifecycle hook.

---

**مرتبط**

- [مستندات ‎`<Teleport>`‎ API](/api/built-in-components#teleport)
- [مدیریت تله‌پورت‌ها در SSR](/guide/scaling-up/ssr#teleports)
