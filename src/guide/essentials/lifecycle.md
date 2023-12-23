# هوک‌های چرخه حیات - Lifecycle Hooks {#lifecycle-hooks}

هر نمونه کامپوننت Vue در هنگام ساخت مجموعه‌ای از مراحل را طی می‌کند - برای مثال،  نیاز دارد که مشاهده‌گر داده را راه‌اندازی کند، کامپایل کردن تمپلیت، نمونه ساخته شده را به DOM منتقل کند و DOM را هنگام تغییر داده به‌روز کند. همچنین در طول این مسیر توابعی به نام هوک‌های چرخه‌ حیات اجرا می‌شوند که به کاربران امکان می‌دهند کد خود را در مراحل خاصی اضافه کند.

## ثبت هوک‌های چرخه حیات {#registering-lifecycle-hooks}

برای مثال <span class="composition-api">هوک `onMounted`</span><span class="options-api">هوک `mounted`</span> برای اجرای کد بعد از اینکه کامپوننت رِندر اولیه را به اتمام رساند و نودهای DOM ایجاد شدند مورد استفاده قرار می‌گیرد:

<div class="composition-api">

```vue
<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  console.log(`شده است mount کامپوننت اکنون`)
})
</script>
```

</div>
<div class="options-api">

```js
export default {
  mounted() {
    console.log(`شده است mount کامپوننت اکنون`)
  }
}
```

</div>

هوک‌های دیگری وجود دارد که در مراحل مختلفی از چرخه حیات کامپوننت صدا زده می‌شوند که رایج‌ترین آنها هوک‌های <span class="composition-api">[`onMounted`](/api/composition-api-lifecycle#onmounted) و [`onUpdated`](/api/composition-api-lifecycle#onupdated) و [`onUnmounted`](/api/composition-api-lifecycle#onunmounted) است.</span><span class="options-api">[`mounted`](/api/options-lifecycle#mounted) و [`updated`](/api/options-lifecycle#updated) و [`unmounted`](/api/options-lifecycle#unmounted) است.</span>

<div class="options-api">

همه هوک‌های چرخه حیات همراه با کلمه کلیدی `this` متعلق به آنها که به نمونه فعال کامپوننت فعلی که آن را فراخوانی می‌کند اشاره دارد، صدا زده می‌شوند. توجه داشته باشید این به این معنی است که شما باید از نوشتن هوک‌های چرخه حیات به صورت تابع پیکانی (arrow function) خودداری کنید، در صورت انجام چنین کاری قادر به دستیابی به نمونه ساخته شده کامپوننت از طریق کلمه کلیدی `this` نخواهید بود.

</div>

<div class="composition-api">

هنگامی که هوک `onMounted` صدا زده می شود، Vue به صورت خودکار تابع callback ثبت شده را با نمونه کامپوننت فعال فعلی مرتبط می کند. این امر مستلزم این است که این هوک ها در طول راه اندازی کامپوننت به صورت **همزمان** (synchronously) ثبت شوند. برای مثال کار زیر را انجام ندهید:

```js
setTimeout(() => {
  onMounted(() => {
    // این کار نخواهد کرد
  })
}, 100)
```

توجه داشته باشید این به این معنی نیست که فراخوانی حتما باید درون `setup()‎` یا `<script setup>` قرار داشته باشد. هوک `onMounted()‎` می‌تواند در یک تابع خارجی فراخوانی شود تا زمانی که پشته فراخوانی همگام باشد و از درون `setup()‎` شروع شود.

</div>

## نمودار چرخه حیات {#lifecycle-diagram}

در زیر نموداری برای چرخه حیات نمونه آورده شده است. در حال حاضر نیاز نیست همه چیز را به طور کامل درک کنید، اما با یادگیری و تجربه ساخت بیشتر، مرجعی مفید خواهد بود.

![نمودار چرخه حیات کامپوننت](./images/lifecycle.png)

<!-- https://www.figma.com/file/Xw3UeNMOralY6NV7gSjWdS/Vue-Lifecycle -->

برای کنکاش در جزئیات بیشتر در مورد هوک‌های چرخه حیات و موارد استفاده مربوطه به <span class="composition-api">[مرجع API هوک‌های چرخه حیات](/api/composition-api-lifecycle)</span><span class="options-api">[مرجع API هوک‌های چرخه حیات](/api/options-lifecycle)</span> مراجعه کنید.
