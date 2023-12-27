# ویژگی‌های خاص ساخته شده {#built-in-special-attributes}

## key {#key}

ویژگی خاص `key` به عنوان یک راهنما برای الگوریتم DOM مجازی Vue استفاده می‌شود تا هنگام تفاوت‌یابی لیست جدید نودها با لیست قدیمی، vnodes را شناسایی کند.

- **انتظارات:** `number | string | symbol`

- **جزئیات**

  بدون Vue ، Key از یک الگوریتم استفاده می‌کند که حرکت عناصر را به حداقل می‌رساند و سعی می‌کند عناصر هم نوع را تا حد امکان در جای خود ترمیم/باز استفاده کند. با key، این عناصر را بر اساس تغییر ترتیب keyها مرتب می‌کند و عناصری که دارای `key`هایی هستند که دیگر وجود ندارند، همیشه حذف / نابود می‌شوند.

  فرزندان یک والد مشترک باید دارای key های منحصر به فرد باشند. key های تکراری باعث خطاهای رندر می‌شوند.

  رایج‌ترین مورد استفاده این ویژگی، همراه با `v-for` است:

  ```vue-html
  <ul>
    <li v-for="item in items" :key="item.id">...</li>
  </ul>
  ```

این ویژگی را میتوان برای اجبار جایگزینی یک عنصر/کامپوننت به جای باز استفاده از آن نیز استفاده کرد. این میتواند زمانی مفید باشد که شما بخواهید:

•  به درستی هوک های چرخه حیات یک کامپوننت را فعال کنید

•  ترنزیشن را فعال کنید

برای مثال:

  ```vue-html
  <transition>
    <span :key="text">{{ text }}</span>
  </transition>
  ```

  وقتی `text` تغییر کند، همیشه المنت `<span>`  جایگزین می‌شود به جای اینکه صرفا متن آن تغییر کند، بنابراین ترنزیشین فعال می‌شود.

- **همچنین ببینید** [راهنما - لیست رندرینگ - حفظ state با `key`](/guide/essentials/list#maintaining-state-with-key)

## ref {#ref}

یک [ارجاع از طریق تمپلیت](/guide/essentials/template-refs) را نشان می‌دهد.

- **انتظارات:** `string | Function`

- **جزئیات**

  `ref` برای ثبت یک ارجاع به یک عنصر یا یک کامپوننت فرزند استفاده می‌شود.

  در Option API ارجاع تحت آبجکت `this.$refs‎` کامپوننت ثبت می‌شود:

  ```vue-html
  <!-- stored as this.$refs.p -->
  <p ref="p">hello</p>
  ```

  در Composition API، ارجاع در یک ref با نام منطبق ذخیره می‌شود:

  ```vue
  <script setup>
  import { ref } from 'vue'

  const p = ref()
  </script>

  <template>
    <p ref="p">hello</p>
  </template>
  ```

  اگر از این ویژگی روی یک عنصر DOM ساده استفاده شود، ارجاع همان عنصر خواهد بود؛ اگر روی یک کامپوننت فرزند استفاده شود، ارجاع نمونه ساخته شده از کامپوننت فرزند خواهد بود.

  به طور جایگزین `ref` میتواند یک مقدار تابعی را بپذیرد که کنترل کاملی روی اینکه کجا رفرنس دریافت شده را ذخیره کنید، فراهم می‌کند:

  ```vue-html
  <ChildComponent :ref="(el) => child = el" />
  ```

  یک نکته مهم در مورد زمان ثبت ref این است که چون ref ها خودشان به عنوان نتیجه تابع رندر ایجاد می‌شوند، شما باید تا زمانی که کامپوننت mount شود، صبر کنید تا به آنها دسترسی پیدا کنید.

  `this.$refs` همچنین reactive نیست، بنابراین شما نباید سعی کنید که از آن در تمپلیت‌ها برای اتصال دادن داده استفاده کنید.

- **همچنین ببینید**
  - [راهنما - تمپلیت مراجع](/guide/essentials/template-refs)
  - [راهنما - نوع تمپلیت مراجع](/guide/typescript/composition-api#typing-template-refs) <sup class="vt-badge ts" />
  - [راهنما - نوع کامپوننت تمپلیت مراجع](/guide/typescript/composition-api#typing-component-template-refs) <sup class="vt-badge ts" />

## is {#is}

برای اتصال [کامپوننت های داینامیک](/guide/essentials/component-basics#dynamic-components) استفاده میشود.

- **انتظارات:** `string | Component`

- **استفاده در عناصر بومی** <sup class="vt-badge">3.1+</sup>

  وقتی ویژگی `is` روی یک عنصر HTML بومی استفاده شود، به عنوان یک <a href="https://html.spec.whatwg.org/multipage/custom-elements.html#custom-elements-customized-builtin-example">عنصر سفارشی ساخته شده</a> تفسیر می‌شود، که یک ویژگی بومی پلتفرم وب است.

  اما یک مورد استفاده وجود دارد که شما ممکن است نیاز داشته باشید که Vue یک عنصر بومی را با یک کامپوننت Vue جایگزین کند، که در [محدودیت‌های تجزیه تمپلیت در DOM](/guide/essentials/component-basics#in-dom-template-parsing-caveats) توضیح داده شده است. شما میتوانید مقدار ویژگی `is` را با `vue:‎` پیشوند کنید تا Vue عنصر را به عنوان یک کامپوننت Vue رندر کند:

  ```vue-html
  <table>
    <tr is="vue:my-row-component"></tr>
  </table>
  ```

- **همچنین ببینید**

  - [عنصر خاص ساخته شده - `<component>`](/api/built-in-special-elements#component)
  - [کامپوننت های داینامیک](/guide/essentials/component-basics#dynamic-components)
