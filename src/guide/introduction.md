---
footer: false
---

# معرفی {#introduction}

:::info شما در حال خواندن مستندات نسخه ۳ از Vue هستید!

- پشتیبانی نسخه ۲ در تاریخ ۱۰ دی ۱۴۰۲ به اتمام می‌رسد. درباره [تداوم نسخه‌ی پایدار ۲](https://v2.vuejs.org/lts/) بیشتر بدانید.
- مستندات نسخه ۲ به [v2.vuejs.org](https://v2.vuejs.org/) منتقل شده است.
- درحال ارتقا از نسخه ۲ هستید؟ [راهنمای مهاجرت](https://v3-migration.vuejs.org/) را مطالعه کنید.
  :::

<style src="@theme/styles/vue-mastery.css"></style>
<div class="vue-mastery-link" dir="rtl">
  <a href="https://www.vuemastery.com/courses/" target="_blank">
    <div class="banner-wrapper">
      <img class="banner" alt="Vue Mastery banner" width="96px" height="56px" src="https://storage.googleapis.com/vue-mastery.appspot.com/flamelink/media/vuemastery-graphical-link-96x56.png" />
    </div>
    <p class="description">می‌توانید Vue را با آموزش‌های ویدیویی در <span>VueMastery.com</span> بیاموزید.</p>
    <div class="logo-wrapper">
        <img alt="Vue Mastery Logo" width="25px" src="https://storage.googleapis.com/vue-mastery.appspot.com/flamelink/media/vue-mastery-logo.png" />
    </div>
  </a>
</div>

## Vue چیست؟ {#what-is-vue}

Vue (که مانند واژه "view" خوانده می‌شود) یک فریمورک جاوااسکریپت برای ساخت رابط کاربری است. این فریمورک بر روی استانداردهای CSS ، HTML و جاوااسکریپت استوار است و یک مدل برنامه‌نویسی اعلامی و مبتنی بر کامپوننت را فراهم می‌کند که به شما کمک می‌کند به طور کارآمد رابط کاربری را توسعه دهید، چه ساده باشد یا پیچیده.

در اینجا یک نمونه ساده آورده شده است:

<div class="options-api">

```js
import { createApp } from 'vue'

createApp({
  data() {
    return {
      count: 0
    }
  }
}).mount('#app')
```

</div>
<div class="composition-api">

```js
import { createApp, ref } from 'vue'

createApp({
  setup() {
    return {
      count: ref(0)
    }
  }
}).mount('#app')
```

</div>

```vue-html
<div id="app">
  <button @click="count++">
    Count is: {{ count }}
  </button>
</div>
```

**نتیجه**

<script setup>
import { ref } from 'vue'
const count = ref(0)
</script>

<div class="demo">
  <button @click="count++">
    Count is: {{ count }}
  </button>
</div>

نمونه فوق دو ویژگی اصلی Vue را نشان می‌دهد:

- **Declarative Rendering**: فریمورک Vue با ارائه ساختار تمپلیت که به ما اجازه می‌دهد به صورت اعلامی خروجی HTML را بر اساس وضعیت جاوااسکریپت توصیف کنیم، HTML استاندارد را توسعه می‌دهد.

- **Reactivity**: فریمورک Vue به طور خودکار تغییرات وضعیت جاوااسکریپت را پیگیری می‌کند و هنگامی که تغییرات رخ دهد، به طور کارآمد DOM را به‌روز می‌کند.

شما ممکن است هم اکنون سوالاتی داشته باشید - نگران نباشید. ما در بقیه مستندات، به ریز جزئیات می‌پردازیم. اکنون، لطفاً ادامه دهید تا بتوانید درک کلی از امکاناتی که Vue ارائه می‌دهد داشته باشید.

:::tip پیش‌نیازها
برای ادامه مطالعه مستندات، آشنایی پایه با HTML و CSS و JavaScript لازم است. اگر کاملاً تازه‌کار هستید، شاید بهتر باشد که بلافاصله به سراغ یک فریم‌ورک نروید و ابتدا مباحث پایه را یاد بگیرید. می‌توانید با مرور این مقالات درباره [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/A_re-introduction_to_JavaScript) و [HTML](https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML) و [CSS](https://developer.mozilla.org/en-US/docs/Learn/CSS/First_steps) سطح آشنایی خود را بسنجید. تجربه قبلی با سایر فریم‌ورک‌ها مفید است ولی الزامی نیست.
:::

## فریمورک پیش‌رونده {#the-progressive-framework}

Vue یک فریمورک و اکوسیستم است که بیشتر ویژگی‌های متداول مورد نیاز در توسعه فرانت‌اند را پوشش می‌دهد. اما وب بسیار متنوع است - چیزهایی که ما روی وب می‌سازیم ممکن است از نظر شکل و مقیاس به طور جدی متفاوت باشد. با این نظر، Vue به گونه‌ای طراحی شده است که انعطاف‌پذیر و به صورت گام‌به‌گام قابل پذیرش باشد. بسته به مورد استفاده شما، Vue می‌تواند به روش‌های مختلفی استفاده شود:

- بهبود HTML استاتیک بدون build step
- تعبیه به عنوان وب کامپوننت‌ها در هر صفحه
- برنامه تک صفحه‌ای (SPA)
- فول‌استک / رندر سمت سرور (SSR)
- Jamstack / تولید سایت استاتیک (SSG)
- برای دسکتاپ، موبایل، WebGL و حتی ترمینال

اگر این مفاهیم را ترسناک می‌یابید، نگران نباشید! آموزش و راهنما فقط به دانش ابتدایی HTML و جاوااسکریپت نیاز دارند و شما باید بتوانید بدون اینکه در هیچ یک از این موارد متخصص باشید، ادامه دهید.

اگر شما یک توسعه‌دهنده با تجربه هستید که به دنبال راه بهترین ادغام Vue در مجموعه‌ی تکنولوژی‌های خود هستید، یا کنجکاو هستید که معنی این واژگان چیست، ما در مورد آنها در [روش‌های استفاده مختلف از Vue](/guide/extras/ways-of-using-vue) به تفصیل بحث می‌کنیم.

علیرغم این انعطاف‌پذیری، دانش اصلی در مورد نحوه کارکرد Vue در تمام این موارد استفاده مشترک است. حتی اگر شما هم‌اکنون فقط یک مبتدی هستید، دانشی که در طول مسیر به دست می‌آورید در آینده، هنگامی که با هدف‌های بلند پروازانه‌تر مواجه می‌شوید، مفید خواهد بود. اگر شما یک کارآزموده هستید، می‌توانید راه بهینه برای استفاده از Vue را بر اساس مشکلاتی که سعی دارید حل کنید انتخاب کنید، در حالی که همان بهره‌وری را حفظ می‌کنید. به همین دلیل است که ما Vue را "The Progressive Framework" می‌نامیم: این یک فریمورک است که می‌تواند با شما رشد کند و به نیازهای شما واکنش نشان دهد.

## کامپوننت‌های تک‌فایل (SFC) {#single-file-components}

در بیشتر پروژه‌های Vue که از build-tool استفاده می‌کنند، ما کامپوننت‌های Vue را با استفاده از یک فرمت فایل شبیه به HTML به نام **Single-File Components** نوشته‌ایم (همچنین به عنوان فایل‌های ‍‍`‎*.vue` شناخته شده و به اختصار SFC نامیده می‌شود). یک SFC در Vue، همان‌طور که از نام آن پیداست، منطق کامپوننت (جاوااسکریپت)، تمپلیت (HTML) و استایل‌ها (CSS) را در یک فایل جمع‌آوری می‌کند. در اینجا نمونه قبلی که به فرمت SFC نوشته شده است را مشاهده می‌کنید:

<div class="options-api">

```vue
<script>
export default {
  data() {
    return {
      count: 0
    }
  }
}
</script>

<template>
  <button @click="count++">Count is: {{ count }}</button>
</template>

<style scoped>
button {
  font-weight: bold;
}
</style>
```

</div>
<div class="composition-api">

```vue
<script setup>
import { ref } from 'vue'
const count = ref(0)
</script>

<template>
  <button @click="count++">Count is: {{ count }}</button>
</template>

<style scoped>
button {
  font-weight: bold;
}
</style>
```

</div>

SFC یک ویژگی معین‌کننده در Vue است و روش پیشنهادی برای نوشتن کامپوننت‌های Vue است **اگر** مورد استفاده شما نیاز به یک تنظیمات Build داشته باشد. شما می‌توانید بیشتر در مورد آن بیاموزید [چگونگی و چرای SFC](/guide/scaling-up/sfc) اما فعلاً فقط بدانید که Vue تمام تنظیمات Build را برای شما انجام می‌دهد.

## سبک APIها {#api-styles}

کامپوننت‌های Vue می‌توانند با دو سبک API مختلف نوشته شوند: **Options API** و **Composition API**.

### Options API {#options-api}

با استفاده از Options API، ما منطق یک کامپوننت را با استفاده از یک آبجکت از آپشن‌ها تعریف می‌کنیم مانند `data` ، `methods` و `mounted`. ویژگی‌هایی که توسط هر یک از آپشن‌ها تعریف شده‌اند، در داخل `this` قرار داده می‌شوند که به نمونه ساخته شده از کامپوننت اشاره دارد:

```vue
<script>
export default {
  // می‌شوند reactive state تبدیل به data() مقادیر بر گشت داده شده از
  // قابل دسترسی خواهند بود `this` و روی
  data() {
    return {
      count: 0
    }
  },

  // را تغییر می‌دهند و به‌روزرسانی‌ها را فعال می‌کنند state متدها توابعی هستند که
  // آنها می‌توانند به عنوان کنترل‌کننده‌های رویداد در تمپلیت‌ها متصل شوند
  methods: {
    increment() {
      this.count++
    }
  },

  // هوک‌های چرخه حیات در مراحل مختلفی 
  // از چرخه حیات یک کامپوننت صدا زده می‌شوند
  // شد صدا زده خواهد شد mount این تابع هنگامی که کامپوننت
  mounted() {
    console.log(`The initial count is ${this.count}.`)
  }
}
</script>

<template>
  <button @click="increment">Count is: {{ count }}</button>
</template>
```

[آن را در Playground امتحان کنید](https://play.vuejs.org/#eNptkMFqxCAQhl9lkB522ZL0HNKlpa/Qo4e1ZpLIGhUdl5bgu9es2eSyIMio833zO7NP56pbRNawNkivHJ25wV9nPUGHvYiaYOYGoK7Bo5CkbgiBBOFy2AkSh2N5APmeojePCkDaaKiBt1KnZUuv3Ky0PppMsyYAjYJgigu0oEGYDsirYUAP0WULhqVrQhptF5qHQhnpcUJD+wyQaSpUd/Xp9NysVY/yT2qE0dprIS/vsds5Mg9mNVbaDofL94jZpUgJXUKBCvAy76ZUXY53CTd5tfX2k7kgnJzOCXIF0P5EImvgQ2olr++cbRE4O3+t6JxvXj0ptXVpye1tvbFY+ge/NJZt)

### Composition API {#composition-api}

با استفاده از Composition API ما منطق یک کامپوننت را با استفاده از توابع API که import شده‌اند تعریف می‌کنیم. در SFCها، معمولاً Composition API با [`<script setup>`](/api/sfc-script-setup) استفاده می‌شود. ویژگی `setup` یک نکته است که باعث می‌شود Vue تبدیل‌های زمان کامپایل را انجام دهد که به ما اجازه می‌دهد از Composition API استفاده کنیم با استفاده از کدهای کمتر. به عنوان مثال: import شده‌ها و متغیرها / توابع سطح بالا که در `<script setup>` تعریف شده‌اند، مستقیماً در تمپلیت قابل استفاده هستند.

در اینجا همان کامپوننت است، با دقیقاً همان تمپلیت، اما با استفاده از Composition API و `<script setup>` :

```vue
<script setup>
import { ref, onMounted } from 'vue'

// reactive state
const count = ref(0)

// را تغییر می‌دهند و به روز رسانی را راه‌اندازی می‌کنند state توابعی که
function increment() {
  count.value++
}

// هوک‌های چرخه حیات
onMounted(() => {
  console.log(`The initial count is ${count.value}.`)
})
</script>

<template>
  <button @click="increment">Count is: {{ count }}</button>
</template>
```

[آن را در Playground امتحان کنید](https://play.vuejs.org/#eNpNkMFqwzAQRH9lMYU4pNg9Bye09NxbjzrEVda2iLwS0spQjP69a+yYHnRYad7MaOfiw/tqSliciybqYDxDRE7+qsiM3gWGGQJ2r+DoyyVivEOGLrgRDkIdFCmqa1G0ms2EELllVKQdRQa9AHBZ+PLtuEm7RCKVd+ChZRjTQqwctHQHDqbvMUDyd7mKip4AGNIBRyQujzArgtW/mlqb8HRSlLcEazrUv9oiDM49xGGvXgp5uT5his5iZV1f3r4HFHvDprVbaxPhZf4XkKub/CDLaep1T7IhGRhHb6WoTADNT2KWpu/aGv24qGKvrIrr5+Z7hnneQnJu6hURvKl3ryL/ARrVkuI=)

### کدام را انتخاب کنیم؟ {#which-to-choose}

هر دو سبک API کاملاً قادر به پوشش موارد استفاده متداول هستند. آن‌ها واسط‌های متفاوتی هستند که دقیقاً از یک سیستم قدرت می‌‌گیرند. در واقع، Options API بر روی Composition API پیاده‌سازی شده است! مفاهیم اساسی و دانش در مورد Vue در دو سبک به اشتراک گذاشته شده است.

Options API بر مفهوم "component instance" متمرکز است (که در مثال به عنوان ‍`this` دیده می‌شود)، که معمولاً برای کاربرانی که از پس‌زمینه‌هایی با زبان OOP می‌آیند، بهتر با مدل ذهنی مبتنی بر کلاس تطابق دارد. همچنین با پنهان کردن جزئیات reactivity و اجبار به سازماندهی کد از طریق آپشن‌های مختلف، برای مبتدیان دوستانه‌تر است.

Composition API، متغیرهای reactiv را مستقیماً در اسکوپ تابع تعریف می‌کند و با ترکیب وضعیت از چندین تابع با یکدیگر به مدیریت پیچیدگی می‌پردازد. این روش بیشتر از آزادی برخوردار است و برای استفاده موثر نیازمند درک از عملکرد reactivity در Vue می‌باشد. درازای این کار؛ انعطاف پذیری آن الگوهای قدرتمندتری را برای سازماندهی و استفاده مجدد از منطق فراهم می‌کند.

شما می‌توانید در مورد مقایسه بین دو سبک و مزایای بالقوه Composition API بیشتر بیاموزید در [سوالات متداول Composition API](/guide/extras/composition-api-faq).

اگر شما تازه وارد به Vue هستید، توصیه کلی ما در اینجا آمده است:

- برای اهداف یادگیری، با سبکی که برایتان آسان‌تر به نظر می‌رسد پیش بروید. بیشتر مفاهیم اصلی بین دو سبک به اشتراک گذاشته شده است. شما همیشه می‌توانید بعداً سبک دیگر را یاد بگیرید.

- برای استفاده در محیط پروداکشن:

  - اگر از build tools استفاده نمی‌کنید، یا قصد دارید Vue را عمدتاً در سناریوهای کم‌پیچیدگی استفاده کنید، مثل بهبود تدریجی، با Options API پیش بروید.

  - اگر قصد دارید نرم‌افزارهای کامل با Vue بسازید، با Composition API + کامپوننت‌های Single-File پیش بروید.

شما در طول مرحله یادگیری نیازی به پایبندی به فقط یک سبک ندارید. بقیه مستندات نمونه‌ کدها را در هر دو سبک (جایی که کاربردی باشد) ارائه خواهد داد، و شما می‌توانید در هر زمان با استفاده از کلید API در بالای نوار کناری سمت چپ بین Composition و Options جابجا شوید.

## هنوز هم سوالی دارید؟ {#still-got-questions}

به [سوالات متداول](/about/faq) ما سر بزنید.

## مسیر یادگیری خود را انتخاب کنید {#pick-your-learning-path}

توسعه‌دهندگان مختلف، سبک‌های متفاوتی در یادگیری دارند. بدون هیچ مشکلی مسیر یادگیری را انتخاب کنید که به سلیقه شما نزدیک است - اگرچه ما توصیه می‌کنیم اگر امکان دارد، تمام محتوا را مطالعه کنید!

<div class="vt-box-container next-steps">
  <a class="vt-box" href="/tutorial/">
    <p class="next-steps-link">امتحان آموزش</p>
    <p class="next-steps-caption">برای کسانی که ترجیح می‌دهند چیزها را به صورت عملی یاد بگیرند.</p>
  </a>
  <a class="vt-box" href="/guide/quick-start.html">
    <p class="next-steps-link">خواندن راهنما</p>
    <p class="next-steps-caption">راهنما شما را به تمام جنبه‌های فریمورک با جزئیات کامل هدایت می‌کند.</p>
  </a>
  <a class="vt-box" href="/examples/">
    <p class="next-steps-link">بررسی مثال‌ها</p>
    <p class="next-steps-caption">مثال‌هایی از ویژگی‌های اصلی و وظایف رایج رابط کاربری را کاوش کنید.</p>
  </a>
</div>
