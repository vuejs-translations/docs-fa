# Components {#components}

تا اینجا، ما تنها با یک کامپوننت‌ کار کرده‌ایم. برنامه‌های واقعی Vue معمولاً با کامپوننت‌های تو در تو ایجاد می‌شوند.

یک کامپوننت‌ والد (پدر) می‌تواند کامپوننت‌‌های دیگر را در تمپلیت خود به عنوان کامپوننت‌ فرزند رندر کند. برای استفاده از کامپوننت‌ فرزند، ابتدا باید آن را import کنیم:

<div class="composition-api">
<div class="sfc">

```js
import ChildComp from './ChildComp.vue'
```

</div>
</div>

<div class="options-api">
<div class="sfc">

```js
import ChildComp from './ChildComp.vue'

export default {
  components: {
    ChildComp
  }
}
```

همچنین باید از طریق گزینه `components` کامپوننت را ثبت کنیم. در اینجا ما از اختصار در تعریف یک ویژگی (property) در یک شیء برای ثبت کامپوننت `ChildComp` تحت کلید `ChildComp` استفاده می‌کنیم. (مترجم: این با ‍`ChildComp: ChildComp` برابر است)

</div>
</div>

<div class="sfc">

سپس، می‌توانیم از کامپوننت در تمپلیت به صورت زیر استفاده کنیم:

```vue-html
<ChildComp />
```

</div>

<div class="html">

```js
import ChildComp from './ChildComp.js'

createApp({
  components: {
    ChildComp
  }
})
```

همچنین باید از طریق آپشن `components` کامپوننت را ثبت کنیم. در اینجا ما از اختصار در تعریف یک ویژگی (property) در یک شیء برای ثبت کامپوننت `ChildComp` تحت کلید `ChildComp` استفاده می‌کنیم. (مترجم: این با ‍`ChildComp: ChildComp` برابر است)

بدلیل اینکه ما تمپلیت را در DOM می‌نویسیم، این تمپلیت تحت قوانین تجزیه مرورگر قرار خواهد گرفت، که در مورد نام‌ تگ‌ها، حساس به بزرگی و کوچکی حروف نیست. بنابراین، باید از نام‌های kebab-case (که حروف بزرگ و کوچک را بزرگ‌نمایی نمی‌کنند) برای ارجاع به کامپوننت فرزند استفاده کنیم:

```vue-html
<child-comp></child-comp>
```

</div>


حالا خودتان امتحان کنید - کامپوننت فرزند را import کنید و آن را در تمپلیت نمایش دهید. (مترجم: کامپوننت ‍‍`ChildComp` از `‎./ChildComp.vue`)
