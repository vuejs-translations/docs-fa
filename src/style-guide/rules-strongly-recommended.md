# قوانین اولویت B : به شدت توصیه می‌شوند {#priority-b-rules-strongly-recommended}

این قوانین برای بهبود خوانایی و یا تجربه توسعه‌ دهنده در اکثر پروژه‌ها، ایجاد شده اند. اگر این قوانین را نقض کنید، کد شما هنوز اجرا خواهد شد، اما نقض‌ها باید نادر و به خوبی توجیه شده باشند.

## فایل‌های کامپوننت {#component-files}

**هرگاه یک سیستم ساخت (build system) برای ادغام فایل‌ها موجود باشد، هر کامپوننت باید در یک فایل جداگانه قرار گیرد.**

این کمک می‌کند تا هنگامی که نیاز به ویرایش یک کامپوننت دارید یا می‌خواهید نحوه استفاده از آن را بررسی کنید، با سرعت بیشتری آن کامپوننت را پیدا کنید.

<div class="style-example style-example-bad">
<h3>بد</h3>

```js
app.component('TodoList', {
  // ...
})

app.component('TodoItem', {
  // ...
})
```

</div>

<div class="style-example style-example-good">
<h3>خوب</h3>

```
components/
|- TodoList.js
|- TodoItem.js
```

```
components/
|- TodoList.vue
|- TodoItem.vue
```

</div>

## فرمت نامگذاری کامپوننت‌های تک فایلی {#single-file-component-filename-casing}

**نام‌ فایل‌ کامپوننت‌های تک فایلی ([Single-File Components](/guide/scaling-up/sfc)) باید همیشه به صورت PascalCase یا همیشه kebab-case باشند.**

PascalCase بهترین عملکرد را در تکمیل خودکار در ویرایشگرهای کد دارد، زیرا با نحوه ارجاع به کامپوننت‌ها در JS یا JSX و تمپلیت‌ها تا جای ممکن هماهنگ است. با این حال، نام‌ فایل با مخلوط حروف بزرگ و کوچک ممکن است گاهی مشکلاتی را در سیستم‌های حساس به حروف بزرگ و کوچک ایجاد کند، به همین دلیل kebab-case هم کاملاً قابل قبول است.

<div class="style-example style-example-bad">
<h3>بد</h3>

```
components/
|- mycomponent.vue
```

```
components/
|- myComponent.vue
```

</div>

<div class="style-example style-example-good">
<h3>خوب</h3>

```
components/
|- MyComponent.vue
```

```
components/
|- my-component.vue
```

</div>

## نامگذاری کامپوننت‌های پایه {#base-component-names}

**کامپوننت های پایه (همچنین به عنوان presentational، dumb، یا pure components شناخته می شوند) که از استایل و قراردادهای خاص برنامه برخوردارند، همگی باید با یک پیشوند خاص شروع شوند، مانند `Base`، `App` یا `V`.**

::: details <nav style="cursor: pointer; display: inline-block;">توضیحات بیشتر</nav>
کامپوننت های پایه، پایه‌گذاری برای استایل و رفتار یکنواخت را در برنامه شما فراهم می‌کنند. آن‌ها امکان دارد **تنها** شامل موارد زیر باشند:

- عناصر HTML
- سایر کامپوننت‌های پایه
- کامپوننت‌های UI سوم شخص (third-party) (کامپوننت‌های اضافه شده از یک کتابخانه یا فریمورک خارجی مثل vuetify)

اما آنها **هیچگاه** شامل یک state سراسری (برای مثال از یک [Pinia](https://pinia.vuejs.org/) store) نمی‌شوند.

نام آنها اغلب شامل نام عنصری می‌شود که در بر می‌گیرند (برای مثال `BaseButton`, `BaseTable`)، مگر آنکه هیچ عنصری برای هدف خاص آنها وجود نداشته باشد (مثل `BaseIcon` که در آن از نام عنصر HTML استفاده نشده است). اگر کامپوننت های مشابهی را برای یک زمینه خاص تر بسازید، تقریباً همیشه این کامپوننت ها را به کار می برند (برای مثال `BaseButton` ممکن است در `ButtonSubmit` استفاده شود).

برخی از از مزایای این قرارداد:

- زمانی که کامپوننت های اصلی برنامه شما در ویرایشگرها به ترتیب حروف الفبا سازماندهی می‌شوند، همگی در کنار هم لیست می‌شوند، که این امر تشخیص و شناسایی آن‌ها را آسان‌تر می‌کند.

- از آنجا که نام‌های کامپوننت ها همیشه باید چندکلمه‌ای باشند، این قرارداد از لزوم انتخاب پیشوند دلخواه برای پوشاننده های کامپوننت های ساده (برای مثال `MyButton`، `VueButton`) جلوگیری می کند.

- از آنجا که این کامپوننت ها به طور متداول استفاده می‌شوند، ممکن است بخواهید آن‌ها را به صورت سراسری اعمال کنید به جای آن که همیشه آن‌ها را import کنید. یک پیشوند این امکان را با Webpack ممکن می‌سازد :

  ```js
  const requireComponent = require.context(
    './src',
    true,
    /Base[A-Z]\w+\.(vue|js)$/
  )
  requireComponent.keys().forEach(function (fileName) {
    let baseComponentConfig = requireComponent(fileName)
    baseComponentConfig =
      baseComponentConfig.default || baseComponentConfig
    const baseComponentName =
      baseComponentConfig.name ||
      fileName.replace(/^.+\//, '').replace(/\.\w+$/, '')
    app.component(baseComponentName, baseComponentConfig)
  })
  ```

  :::

<div class="style-example style-example-bad">
<h3>بد</h3>

```
components/
|- MyButton.vue
|- VueTable.vue
|- Icon.vue
```

</div>

<div class="style-example style-example-good">
<h3>خوب</h3>

```
components/
|- BaseButton.vue
|- BaseTable.vue
|- BaseIcon.vue
```

```
components/
|- AppButton.vue
|- AppTable.vue
|- AppIcon.vue
```

```
components/
|- VButton.vue
|- VTable.vue
|- VIcon.vue
```

</div>

## نامگذاری کامپوننت‌های تک نمونه‌ای {#single-instance-component-names}

**کامپوننت هایی که تنها باید یک نمونه فعال داشته باشند، باید با پیشوند `The` شروع شوند تا نشان دهند که تنها می‌تواند یک نمونه از آن وجود داشته باشد.**

این به این معنا نیست که این کامپوننت تنها در یک صفحه استفاده می‌شود، بلکه تنها یک بار _برای هر صفحه_ استفاده خواهد شد. این کامپوننت‌ها هرگز پراپ‌ها را قبول نمی‌کنند، زیرا بطور خاص برای برنامه‌ی شما ساخته شده‌اند نه اینکه محتوایشان در برنامه‌ی شما هم استفاده شود. اگر نیاز به افزودن پراپ پیدا کنید، این نشانگر خوبی است که در واقع این یک کامپوننت قابل استفاده مجدد است که _در حال حاضر_ فقط یکبار _برای هر صفحه_ استفاده می‌شود.

<div class="style-example style-example-bad">
<h3>بد</h3>

```
components/
|- Heading.vue
|- MySidebar.vue
```

</div>

<div class="style-example style-example-good">
<h3>خوب</h3>

```
components/
|- TheHeading.vue
|- TheSidebar.vue
```

</div>

## نام‌گذاری کامپوننت های مرتبط {#tightly-coupled-component-names}

**کامپوننت های فرزندی که به شدت با والد خود ارتباط دارند، باید نام والد را به عنوان پیشوند شامل شوند.**

اگر دلیل وجود یک کامپوننت، فقط استفاده در بخشی از یک کامپوننت والد باشد، این رابطه باید در نام آن واضح باشد. از آنجا که ویرایشگرها معمولاً فایل‌ها را به ترتیب الفبا مرتب می‌کنند، این همچنین باعث می‌شود تا این فایل‌های مرتبط در کنار یکدیگر قرار گیرند.

::: details <nav style="cursor: pointer; display: inline-block;">توضیحات بیشتر</nav>
ممکن است شما تمایل داشته باشید که این مسئله را با جایگذاری کامپوننت‌های فرزند در پوشه‌هایی با نام والدین خود حل کنید. به عنوان مثال :

```
components/
|- TodoList/
   |- Item/
      |- index.vue
      |- Button.vue
   |- index.vue
```

یا :

```
components/
|- TodoList/
   |- Item/
      |- Button.vue
   |- Item.vue
|- TodoList.vue
```

این توصیه نمی‌شود زیرا منجر می‌شود به :

- فایل‌های زیاد با نام مشابه، سبب ایجاد مشکل در جابجایی سریع بین فایل‌ها در ویرایشگر می‌شود.
- وجود زیرپوشه‌های فراوان (sub-directories)، زمان مورد نیاز برای مرور کامپوننت‌ها در نوار کناری ویرایشگر را افزایش می‌دهد.
  :::

<div class="style-example style-example-bad">
<h3>بد</h3>

```
components/
|- TodoList.vue
|- TodoItem.vue
|- TodoButton.vue
```

```
components/
|- SearchSidebar.vue
|- NavigationForSearchSidebar.vue
```

</div>

<div class="style-example style-example-good">
<h3>خوب</h3>

```
components/
|- TodoList.vue
|- TodoListItem.vue
|- TodoListItemButton.vue
```

```
components/
|- SearchSidebar.vue
|- SearchSidebarNavigation.vue
```

</div>

## ترتیب کلمات در نامگذاری کامپوننت ها {#order-of-words-in-component-names}

**نام‌های کامپوننت‌ها باید با کلمات سطح بالا (معمولاً کلمات عمومی‌تر) شروع شده و با کلمات توصیفی و اصلاح کننده به پایان برسند.**

::: details <nav style="cursor: pointer; display: inline-block;">توضیحات بیشتر</nav>
ممکن است برایتان جالب باشد :

> "چرا ما می‌خواهیم نام‌های کامپوننت ها را به کمترین میزان استفاده از زبان طبیعی وادار کنیم؟"

در زبان انگلیسی عادی، صفات و توصیف‌های دیگر معمولاً قبل از اسم‌ها ظاهر می‌شوند، در حالی که استثناها نیاز به کلمات رابط دارند. به عنوان مثال:

- Coffee _with_ milk
- Soup _of the_ day
- Visitor _to the_ museum

مطمئناً می‌توانید این کلمات رابط را در نام‌های کامپوننت‌ها استفاده کنید، اما ترتیب همچنان مهم است.

همچنین توجه داشته باشید که **آنچه "بالاترین سطح" در نظر گرفته می شود، با برنامه شما مرتبط خواهد بود**. به عنوان مثال، اپلیکیشنی را با فرم جستجو را تصور کنید. ممکن است شامل کامپوننت هایی مانند این باشد: 

```
components/
|- ClearSearchButton.vue
|- ExcludeFromSearchInput.vue
|- LaunchOnStartupCheckbox.vue
|- RunSearchButton.vue
|- SearchInput.vue
|- TermsCheckbox.vue
```

همانطور که ممکن است متوجه شوید، خیلی سخت است که ببینید کدام کامپوننت‌ها به طور خاص مربوط به جستجو هستند. حالا بیایید کامپوننت ها را براساس این قاعده تغییر نام دهیم :

```
components/
|- SearchButtonClear.vue
|- SearchButtonRun.vue
|- SearchInputExcludeGlob.vue
|- SearchInputQuery.vue
|- SettingsCheckboxLaunchOnStartup.vue
|- SettingsCheckboxTerms.vue
```

از آنجا که ویرایشگرها به طور معمول فایل‌ها را به ترتیب الفبا مرتب می‌کنند، اکنون تمام ارتباطات مهم بین کامپوننت‌ها با یک نگاه آشکار می‌شوند.

ممکن است شما تمایل داشته باشید که این مشکل را به شیوه های مختلف حل کنید، به عنوان مثال تمام کامپوننت‌های جستجو را زیر یک پوشه با نام "search" و سپس تمام کامپوننت‌های تنظیمات را زیر یک پوشه با نام "settings" قرار دهید. اما ما تنها این رویکرد را در اپلیکیشن‌های بسیار بزرگ (مانند 100+ کامپوننت) توصیه می‌کنیم، به این دلیل :

- عموماً زمان بیشتری برای پیمایش درون زیرپوشه‌های تو در تو نیاز است تا اینکه از طریق یک پوشه تکی با نام `components` پیمایش شوند.
- تداخل نام (برای مثال، وجود چندین کامپوننت با نام `ButtonDelete.vue`) باعث می‌شود که پیمایش سریع به یک کامپوننت خاص در ویرایشگر کد دشوارتر شود.
- تغییر ساختار دشوارتر می شود، زیرا یافتن و جایگزینی، اغلب برای به روزرسانی ارجاعات نسبی به یک کامپوننت کافی نیست.
  :::

<div class="style-example style-example-bad">
<h3>بد</h3>

```
components/
|- ClearSearchButton.vue
|- ExcludeFromSearchInput.vue
|- LaunchOnStartupCheckbox.vue
|- RunSearchButton.vue
|- SearchInput.vue
|- TermsCheckbox.vue
```

</div>

<div class="style-example style-example-good">
<h3>خوب</h3>

```
components/
|- SearchButtonClear.vue
|- SearchButtonRun.vue
|- SearchInputQuery.vue
|- SearchInputExcludeGlob.vue
|- SettingsCheckboxTerms.vue
|- SettingsCheckboxLaunchOnStartup.vue
```

</div>

## کامپوننت های خود بسته شونده {#self-closing-components}

**کامپوننت های بدون محتوا درون تگ html خود، باید در کامپوننت های تک فایلی ([Single-File Components](/guide/scaling-up/sfc))، تمپلیت‌های رشته‌ای و [JSX](/guide/extras/render-function#jsx-tsx) بصورت خود بسته شونده (self-closing) باشند، اما در تمپلیت‌های تعریف شده درون DOM ها هرگز.**

کامپوننت هایی که خود بسته می شوند این پیام را می‌رسانند که نه تنها محتوایی ندارند، بلکه قرار است محتوایی نداشته باشند. این تفاوت میان یک صفحه خالی در یک کتاب و یک صفحه با برچسب "این صفحه عمدا خالی مانده است" می باشد. همچنین کد شما بدون تگ‌های بسته غیرضروری تمیزتر خواهد بود.

متأسفانه، HTML اجازه نمی‌دهد که عناصر سفارشی خودشان به صورت خودکار بسته شوند. - تنها [official "void" elements](https://www.w3.org/TR/html/syntax.html#void-elements) این قابلیت را دارند. به همین دلیل است که این استراتژی فقط زمانی امکان‌پذیر است که کامپایلر تمپلیت Vue قادر به دسترسی به تمپلیت قبل از DOM باشد و سپس HTML مطابق با استاندارد DOM را ارائه دهد.

<div class="style-example style-example-bad">
<h3>بد</h3>

```vue-html
<!-- JSX در کامپوننت های تک فایلی، تمپلیت‌های رشته‌ای و -->
<MyComponent></MyComponent>
```

```vue-html
<!-- DOM در تمپلیت‌های داخل -->
<my-component/>
```

</div>

<div class="style-example style-example-good">
<h3>خوب</h3>

```vue-html
<!-- JSX در کامپوننت های تک فایلی، تمپلیت‌های رشته‌ای و -->
<MyComponent/>
```

```vue-html
<!-- DOM در تمپلیت‌های داخل -->
<my-component></my-component>
```

</div>

## فرمت نامگذاری کامپوننت ها در تمپلیت‌ها {#component-name-casing-in-templates}

**در بیشتر پروژه‌ها، نام کامپوننت ها باید در [Single-File Components](/guide/scaling-up/sfc) و تمپلیت‌های رشته‌ای به صورت PascalCase باشد، اما در تمپلیت‌های داخل DOM به صورت kebab-case باشد.**

PascalCase در مقایسه با kebab-case مزایایی دارد :
- ویرایشگرها می‌توانند در تمپلیت‌ها نام کامپوننت ها را به صورت خودکار تکمیل کنند، زیرا PascalCase در جاوااسکریپت هم استفاده می‌شود.

- `<MyComponent>` (فرم PascalCase) از لحاظ بصری بیشتر از `<my-component>` (فرم kebab-case) از عناصر خود HTML مجزا است، زیرا به اندازه دو کاراکتر میان آنها تفاوت وجود دارد (دو حرف بزرگ در حالت PascalCase) در حالی که در حالت kebab-case تنها یک تفاوت وجود دارد (خط فاصله).
- اگر شما از هرگونه عنصر غیر Vue در تمپلیت خود استفاده کنید، مانند یک کامپوننت وب، PascalCase اطمینان حاصل می کند که کامپوننت های Vue شما به صورت مجزا قابل رویت باقی می‌مانند.

متاسفانه، بنابر عدم حساسیت HTML به حروف بزرگ و کوچک (case insensitivity)، در تمپلیت‌های داخل DOM بایستی همچنان از kebab-case استفاده نماییم.

همچنین توجه داشته باشید که اگر قبلاً روی kebab-case سرمایه گذاری زیادی کرده اید، سازگاری با قراردادهای HTML و امکان استفاده از پوشش یکسان در تمام پروژه های شما ممکن است مهمتر از مزایای ذکر شده در بالا باشد. در آن حالت ها، **استفاده از kebab-case در همه جا هم قابل قبول است.**

<div class="style-example style-example-bad">
<h3>بد</h3>

```vue-html
<!-- در کامپوننت های تک فایلی و تمپلیت‌های رشته‌ای -->
<mycomponent/>
```

```vue-html
<!-- در کامپوننت های تک فایلی و تمپلیت‌های رشته‌ای -->
<myComponent/>
```

```vue-html
<!-- DOM در تمپلیت‌های داخل -->
<MyComponent></MyComponent>
```

</div>

<div class="style-example style-example-good">
<h3>خوب</h3>

```vue-html
<!-- در کامپوننت های تک فایلی و تمپلیت‌های رشته‌ای -->
<MyComponent/>
```

```vue-html
<!-- DOM در تمپلیت‌های داخل -->
<my-component></my-component>
```

یا

```vue-html
<!-- همه جا -->
<my-component></my-component>
```

</div>

## نامگذاری کامپوننت ها و فرمت آن در JS/JSX {#component-name-casing-in-js-jsx}

**نامگذاری کامپوننت ها در JS/[JSX](/guide/extras/render-function#jsx-tsx) باید همواره به صورت PascalCase باشد، گرچه ممکن است آنها در داخل رشته‌ها در برنامه‌های ساده‌تر که تنها از کامپوننت سراسری `app.component` استفاده می‌کنند به صورت kebab-case باشند.**

::: details <nav style="cursor: pointer; display: inline-block;">توضیحات بیشتر</nav>
در جاوااسکریپت، PascalCase قراردادی برای نامگذاری کلاس‌ها و سازنده‌های نمونه اولیه (prototype constructors) می‌باشد - اساسا، هر چیزی که می‌تواند دارای نمونه‌های مجزا باشد. کامپوننت‌های Vue هم چنین نمونه‌هایی دارند، بنابراین منطقی است که آنها نیز از PascalCase استفاده کنند. طبق یکی از فواید گفته شده درباره آن، استفاده از PascalCase به همراه JSX (و تمپلیت‌ها)، به خواننده های کدها اجازه می‌دهد که راحت تر کامپوننت ها و عناصر HTML را از هم تشخیص بدهند

اما، برای برنامه‌هایی که **تنها** از کامپوننت سراسری که به وسیله `app.component` تعریف می‌شود استفاده می‌کنند، ما استفاده از kebab-case را به جای PascalCase توصیه می‌کنیم. به دلایل زیر:

- کامپوننت های سراسری به ندرت در جاوااسکریپت ارجاع می‌شوند، بنابراین پیروی از یک قرارداد برای جاوااسکریپت منطقی به نظر نمی‌رسد.
- این برنامه ها همواره شامل تعداد زیادی تمپلیت داخل دام (in-DOM templates) هستند، جایی که [kebab-case **باید** استفاده شود](#component-name-casing-in-templates).
:::

<div class="style-example style-example-bad">
<h3>بد</h3>

```js
app.component('myComponent', {
  // ...
})
```

```js
import myComponent from './MyComponent.vue'
```

```js
export default {
  name: 'myComponent'
  // ...
}
```

```js
export default {
  name: 'my-component'
  // ...
}
```

</div>

<div class="style-example style-example-good">
<h3>خوب</h3>

```js
app.component('MyComponent', {
  // ...
})
```

```js
app.component('my-component', {
  // ...
})
```

```js
import MyComponent from './MyComponent.vue'
```

```js
export default {
  name: 'MyComponent'
  // ...
}
```

</div>

## نام گذاری کامل کامپوننت‌ها {#full-word-component-names}

**در نامگذاری کامپوننت‌ها واژگان بصورت کامل باید به واژگان اختصاری ترجیح داده شوند.**

کامل کردن خودکار کلمات در ویرایشگرها، زحمت نوشتن نام‌های طولانی‌تر را خیلی کم می‌کند، در حالی که وضوحی که ایجاد می‌کند بسیار ارزشمند است. همواره باید از اختصارهای غیر رایج پرهیز نمود.

<div class="style-example style-example-bad">
<h3>بد</h3>

```
components/
|- SdSettings.vue
|- UProfOpts.vue
```

</div>

<div class="style-example style-example-good">
<h3>خوب</h3>

```
components/
|- StudentDashboardSettings.vue
|- UserProfileOptions.vue
```

</div>

## فرمت نام گذاری prop ها {#prop-name-casing}

**نامگذاری prop ها باید همواره با استفاده از فرمت camelCase (کلمه اول حرف کوچک، کلمه دوم حرف بزرگ) در حین تعریف کردن صورت بپذیرد. وقتی که از prop در تمپلیت‌های داخل DOM استفاده می شود، آنها باید به صورت kebab-case باشند. تمپلیت‌های کامپوننت های تک فایلی و [JSX](/guide/extras/render-function#jsx-tsx) می توانند هم از prop ها به صورت kebab-case و هم camelCase استفاده نمایند. فرمت باید به صورت ثابت و استوار باشد. اگر شما انتخاب کردید که از prop ها به صورت camelCase استفاده کنید، اطمینان حاصل کنید که در طول برنامه خود از حالت kebab-case استفاده نمی‌کنید.**

<div class="style-example style-example-bad">
<h3>بد</h3>

<div class="options-api">

```js
props: {
  'greeting-text': String
}
```

</div>

<div class="composition-api">

```js
const props = defineProps({
  'greeting-text': String
})
```

</div>

```vue-html
// DOM برای تمپلیت‌های داخل
<welcome-message greetingText="hi"></welcome-message>
```

</div>

<div class="style-example style-example-good">
<h3>خوب</h3>

<div class="options-api">

```js
props: {
  greetingText: String
}
```

</div>

<div class="composition-api">

```js
const props = defineProps({
  greetingText: String
})
```

</div>

```vue-html
// برای کامپوننت های تک فایلی، لطفا اطمینان حاصل کنید که فرمت در تمام پروژه ثابت می‌ماند
// شما می‌توانید از هر قراردادی استفاده کنید ولی ما ترکیب کردن دو نوع فرمت استایل دهی را پیشنهاد نمی‌کنیم
<WelcomeMessage greeting-text="hi"/>
// یا
<WelcomeMessage greetingText="hi"/>
```

```vue-html
// DOM برای تمپلیت‌های داخل
<welcome-message greeting-text="hi"></welcome-message>
```

</div>

## عناصر چند صفتی {#multi-attribute-elements}

**عناصر (elements) با چند صفت (attribute) باید در چند خط گسترده شوند، به صورت یک attribute در هر خط.**

در جاوااسکریپت، جدا کردن پراپرتی‌ها در چند خط در آبجکت‌های دارای چند پراپرتی به طور گسترده‌ای به عنوان یک قرارداد خوب در نظر گرفته می‌شود، زیرا خواندن آن آسان‌تر است. این موضوع برای تمپلیت‌های ما در Vue و [JSX](/guide/extras/render-function#jsx-tsx) نیز همین گونه در نظر گرفته می‌شود.

<div class="style-example style-example-bad">
<h3>بد</h3>

```vue-html
<img src="https://vuejs.org/images/logo.png" alt="Vue Logo">
```

```vue-html
<MyComponent foo="a" bar="b" baz="c"/>
```

</div>

<div class="style-example style-example-good">
<h3>خوب</h3>

```vue-html
<img
  src="https://vuejs.org/images/logo.png"
  alt="Vue Logo"
>
```

```vue-html
<MyComponent
  foo="a"
  bar="b"
  baz="c"
/>
```

</div>

## استفاده از عبارات ساده در تمپلیت‌ها {#simple-expressions-in-templates}

**تمپلیت‌های کامپوننت باید تنها شامل عبارات ساده باشند، عبارات پیچیده تر در داخل method یا پراپرتی‌های computed (همان computed در Vue) نوشته می‌شوند.**

عبارات پیچیده در تمپلیت‌های شما، آنها را کمتر قابل درک می سازد. ما باید تلاش کنیم تا مقداری که باید ظاهر شود را توصیف کنیم، نه چگونگی محاسبه آن مقدار را. method یا پراپرتی‌های computed کد‌های ما را قابل استفاده مجدد می‌کند.

<div class="style-example style-example-bad">
<h3>بد</h3>

```vue-html
{{
  fullName.split(' ').map((word) => {
    return word[0].toUpperCase() + word.slice(1)
  }).join(' ')
}}
```

</div>

<div class="style-example style-example-good">
<h3>خوب</h3>

```vue-html
<!-- داخل یک تمپلیت -->
{{ normalizedFullName }}
```

<div class="options-api">

```js
// عبارت پیچیده به داخل یک پراپرتی کامپیوتد منتقل شده است
computed: {
  normalizedFullName() {
    return this.fullName.split(' ')
      .map(word => word[0].toUpperCase() + word.slice(1))
      .join(' ')
  }
}
```

</div>

<div class="composition-api">

```js
// عبارت پیچیده به داخل یک پراپرتی کامپیوتد منتقل شده است
const normalizedFullName = computed(() =>
  fullName.value
    .split(' ')
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(' ')
)
```

</div>

</div>

## پراپرتی‌های computed ساده {#simple-computed-properties}

**پراپرتی‌های computed پیچیده باید تا جای ممکن به تعدادی پراپرتی ساده تر تقسیم شوند.**

::: details <nav style="cursor: pointer; display: inline-block;">توضیحات بیشتر</nav>
پراپرتی‌های computed ساده تر با نامگذاری بهتر:

- **راحت تر تست می شوند**

  در حالی که هر پراپرتی computed دارای تنها یک عبارت ساده، با تعداد خیلی کمی از وابستگی می‌باشد، نوشتن تست‌هایی که تأیید می‌کنند درست کار می‌کند بسیار آسان‌تر است.

- **راحت تر خوانده می‌شوند**

  ساده سازی پراپرتی‌های computed شما را وادار می کند که به هر مقداری یک نام توصیفی بدهید، حتی اگر آن مقدار دوباره استفاده نشود. این عمل کار را برای سایر توسعه دهندگان (و خودتان در آینده) راحت تر می‌کند تا روی بخشی از کد که برایتان مهم است تمرکز کنید و بفهمید که چه اتفاقی در حال رخ دادن است.

- **با نیازهای در حال تغییر سازگاری بیشتری دارد**

  هر مقداری که می‌تواند نامگذاری شود، می‌تواند برای نمایش دادن کاربردی باشد. برای مثال، ما ممکن است که تصمیم بگیریم که پیامی را به کاربر نمایش دهیم که به او می‌گوید چه مقدار پول صرفه جویی کرده است. ما ممکن است همچنین تصمیم بگیریم که مالیات بر فروش را محاسبه کنیم، اما ممکن است آن را جداگانه نمایش دهیم، نه به عنوان بخشی از قیمت نهایی.

  پراپرتی‌های computed کوچک و متمرکز، مفروضات چگونگی استفاده از اطلاعات را کاهش می‌دهند، بنابراین به بازنویسی کمتری در هر تغییر داده های مورد نیاز، نیاز دارند.
  :::

<div class="style-example style-example-bad">
<h3>بد</h3>

<div class="options-api">

```js
computed: {
  price() {
    const basePrice = this.manufactureCost / (1 - this.profitMargin)
    return (
      basePrice -
      basePrice * (this.discountPercent || 0)
    )
  }
}
```

</div>

<div class="composition-api">

```js
const price = computed(() => {
  const basePrice = manufactureCost.value / (1 - profitMargin.value)
  return basePrice - basePrice * (discountPercent.value || 0)
})
```

</div>

</div>

<div class="style-example style-example-good">
<h3>خوب</h3>

<div class="options-api">

```js
computed: {
  basePrice() {
    return this.manufactureCost / (1 - this.profitMargin)
  },

  discount() {
    return this.basePrice * (this.discountPercent || 0)
  },

  finalPrice() {
    return this.basePrice - this.discount
  }
}
```

</div>

<div class="composition-api">

```js
const basePrice = computed(
  () => manufactureCost.value / (1 - profitMargin.value)
)

const discount = computed(
  () => basePrice.value * (discountPercent.value || 0)
)

const finalPrice = computed(() => basePrice.value - discount.value)
```

</div>

</div>

## مقادیر attribute با علامت نقل و قول (" ") {#quoted-attribute-values}

**مقادیر attribute عناصر HTML غیرخالی باید همواره در داخل علامت نقل و قول (" ") (به صورت تک کوت یا دابل کوت، هر کدام که در کد JS داخل آن استفاده نشده باشد) استفاده شوند.**

در حالی که مقادیر attribute بدون داشتن هیچ فاصله (space) نیازی به داشتن کوت در HTML ندارند، این عادت که اغلب منجر به _پرهیز از_ فاصله ها می‌شود، مقادیر attribute را ناخوانا می‌کند.

<div class="style-example style-example-bad">
<h3>بد</h3>

```vue-html
<input type=text>
```

```vue-html
<AppSidebar :style={width:sidebarWidth+'px'}>
```

</div>

<div class="style-example style-example-good">
<h3>خوب</h3>

```vue-html
<input type="text">
```

```vue-html
<AppSidebar :style="{ width: sidebarWidth + 'px' }">
```

</div>

## دستورالعمل‌های کوتاه نویسی {#directive-shorthands}

**دستورالعمل‌های کوتاه نویسی (Directive shorthands) (`:` برای `:v-bind`, `@` برای `:v-on` برای `#` برای `v-slot`) باید یا همواره استفاده شده یا هیچوقت استفاده نشوند.**

<div class="style-example style-example-bad">
<h3>بد</h3>

```vue-html
<input
  v-bind:value="newTodoText"
  :placeholder="newTodoInstructions"
>
```

```vue-html
<input
  v-on:input="onInput"
  @focus="onFocus"
>
```

```vue-html
<template v-slot:header>
  <h1>Here might be a page title</h1>
</template>

<template #footer>
  <p>Here's some contact info</p>
</template>
```

</div>

<div class="style-example style-example-good">
<h3>خوب</h3>

```vue-html
<input
  :value="newTodoText"
  :placeholder="newTodoInstructions"
>
```

```vue-html
<input
  v-bind:value="newTodoText"
  v-bind:placeholder="newTodoInstructions"
>
```

```vue-html
<input
  @input="onInput"
  @focus="onFocus"
>
```

```vue-html
<input
  v-on:input="onInput"
  v-on:focus="onFocus"
>
```

```vue-html
<template v-slot:header>
  <h1>Here might be a page title</h1>
</template>

<template v-slot:footer>
  <p>Here's some contact info</p>
</template>
```

```vue-html
<template #header>
  <h1>Here might be a page title</h1>
</template>

<template #footer>
  <p>Here's some contact info</p>
</template>
```

</div>
