# دسترسی پذیری | Accessibility {#accessibility}

دسترسی پذیری وب (که به آن a11y هم گفته می شود) به عمل ایجاد وب سایت هایی گفته می شود که توسط هر کسی - اعم از شخصی با معلولیت، اتصال ضعیف، سخت افزار منسوخ یا خراب و یا صرفا کسی در محیط نامساعد - قابل استفاده باشد. به عنوان مثال، اضافه کردن زیرنویس به ویدیو هم به کاربران ناشنوا و کم شنوای شما کمک می کند و هم به کاربرانی که در محیط پرسروصدا هستند و نمی توانند صدای تلفن خود را بشنوند. به همین ترتیب، مطمئن شدن از اینکه متن شما کنتراست کمی ندارد، هم به کاربران کم بینای شما کمک می کند و هم به کاربرانی که در حال تلاش برای استفاده از تلفن خود در نور خورشید زیاد هستند.

برای شروع آماده هستید اما مطمئن نیستید از کجا شروع کنید؟

[راهنمای برنامه ریزی و مدیریت دسترسی پذیری](https://www.w3.org/WAI/planning-and-managing/) وب را که توسط [کنسرسیوم جهانی وب (W3C)](https://www.w3.org/) ارائه شده است، بررسی کنید.

## لینک اسکیپ | ‌Skip link {#skip-link}

شما می‌توانید در بالای هر صفحه لینکی اضافه کنید که مستقیماً به بخش اصلی محتوا برود تا کاربران بتوانند بخش‌هایی را که در صفحات متعدد وب تکرار می شود را اسکیپ کنند. لینک اسکیپ به کاربران کمک می‌کنند تا به سرعت به بخش‌های خاص یک صفحه وب بروند، به جای اینکه به صورت ترتیبی از ابتدا تا انتها صفحه را بخوانند.

معمولاً این کار در بالای `App.vue` انجام می شود زیرا اولین عنصر قابل تمرکز بر روی تمام صفحات شما خواهد بود:

```vue-html
<ul class="skip-links">
  <li>
    <a href="#main" ref="skipLink" class="skip-link">Skip to main content</a>
  </li>
</ul>
```

همچنین برای مخفی سازی لینک تا هنگامی که بر روی آن فوکوس شود می‌توانید از استایل زیر استفاده کنید:

```css
.skip-link {
  white-space: nowrap;
  margin: 1em auto;
  top: 0;
  position: fixed;
  left: 50%;
  margin-left: -72px;
  opacity: 0;
}
.skip-link:focus {
  opacity: 1;
  background-color: white;
  padding: 0.5em;
  border: 1px solid black;
}
```

هنگامی که کاربر route را تغییر می دهد، focus را به لینک اسکیپ بازگردانید. این کار با صدا زدن تابع focus روی template ref پیوند اسکیپ (با فرض استفاده از `vue-router`) امکان پذیر است: (مترجم: به `ref="skipLink"‎` در بالا توجه کنید.)

<div class="options-api">

```vue
<script>
export default {
  watch: {
    $route() {
      this.$refs.skipLink.focus()
    }
  }
}
</script>
```

</div>
<div class="composition-api">

```vue
<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const skipLink = ref()

watch(
  () => route.path,
  () => {
    skipLink.value.focus()
  }
)
</script>
```

</div>

[اسناد اتصال لینک اسکیپ به محتوای اصلی را بخوانید](https://www.w3.org/WAI/WCAG21/Techniques/general/G1.html)

## ساختار محتوا {#content-structure}

یکی از مهمترین بخش‌های دسترسی‌پذیری اطمینان از این است که طراحی می‌تواند از پیاده‌سازی دسترس‌پذیر پشتیبانی کند. طراح نه تنها باید کنتراست رنگ، انتخاب فونت، سایز متن و زبان را در نظر بگیرد، بلکه اینکه محتوا چگونه در برنامه ساختاربندی شده است را نیز باید در نظر بگیرد.

### عناوین | Headings {#headings}

کاربران می‌توانند از طریق عناوین، برنامه را مرور کنند. داشتن عناوین توصیفی برای هر بخش از برنامه، باعث می‌شود پیش‌بینی محتوای هر بخش برای کاربران آسان‌تر شود. در مورد عناوین، چند توصیه در زمینه دسترسی‌پذیری وجود دارد:

- عناوین را بر اساس رتبه‌بندی آن‌ها درون تگ‌های heading قرار دهید: `‎<h1>‎` - `‎<h6>‎`
- در هر section از استفاده از heading صرف‌نظر نکنید
- از تگ‌های واقعی heading به جای استایل دادن متن برای گرفتن ظاهر heading استفاده کنید

[بیشتر در مورد heading بخوانید](https://www.w3.org/TR/UNDERSTANDING-WCAG20/navigation-mechanisms-descriptive.html)

```vue-html
<main role="main" aria-labelledby="main-title">
  <h1 id="main-title">عنوان اصلی</h1>
  <section aria-labelledby="section-title-1">
    <h2 id="section-title-1"> عنوان بخش </h2>
    <h3> زیرعنوان بخش </h3>
    <!-- محتوا -->
  </section>
  <section aria-labelledby="section-title-2">
    <h2 id="section-title-2"> عنوان بخش </h2>
    <h3> زیرعنوان بخش </h3>
    <!-- محتوا  -->
    <h3> زیرعنوان بخش </h3>
    <!-- محتوا -->
  </section>
</main>
```

### Landmarks {#landmarks}

[landmark](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/landmark_role) ها دسترسی برنامه‌ای به بخش‌های درون یک برنامه را فراهم می‌کنند. کاربرانی که بر فناوری کمکی تکیه دارند می‌توانند به هر بخشی از برنامه مراجعه کرده و محتوا را اسکیپ کنند. شما می‌توانید از [role های ARIA](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles) برای دستیابی به این هدف استفاده کنید.

| HTML            | ARIA Role            | Landmark هدف                                                                                                 |
| :---------------: | -------------------- | ----------------------------------------------------------------------------------------------------------------: |
| header          | role="banner"        | عنوان اصلی: عنوان صفحه                                                                      |
| nav             | role="navigation"    | مجموعه‌ای از پیوندهای مناسب برای استفاده هنگام مرور سند یا اسناد مرتبط                       |
| main            | role="main"          | محتوای اصلی یا مرکزی سند                                                                    |
| footer          | role="contentinfo"   | اطلاعات درباره سند اصلی: پانویس/کپی رایت/لینک به بیانیه حریم خصوصی                           |
| aside           | role="complementary" | از محتوای اصلی پشتیبانی می‌کند، اما به تنهایی بامعناست                                       |
| search          | role="search"        | این بخش شامل قابلیت جستجو برای برنامه است                                                   |
| form            | role="form"          | مجموعه‌ای از عناصر مرتبط با فرم                                                              |
| section         | role="region"        | محتوایی که مرتبط با خواست کاربر است و احتمالا کاربران می خواهند به آن مراجعه کنند. لیبل باید برای این عنصر فراهم شود |

:::tip نکته
توصیه می‌شود از landmark HTML به همراه landmark مازاد برای بیشینه کردن سازگاری با [مرورگرهای قدیمی که از عناصر معنایی HTML5 پشتیبانی نمی‌کنند](https://caniuse.com/#feat=html5semantic) استفاده کنید.
:::

[بیشتر در مورد landmark ها بخوانید](https://www.w3.org/TR/wai-aria-1.2/#landmark_roles)

## فرم‌های معنایی | Semantic Forms {#semantic-forms}

هنگام ایجاد یک فرم، می‌توانید از این عناصر استفاده کنید: `‎<form>`, `<label>`, `<input>`, `<textarea>‎` و `‎<button>‎`

لیبل‌ها معمولا در بالا یا در کنار فیلدهای فرم قرار می‌گیرند:

```vue-html
<form action="/dataCollectionLocation" method="post" autocomplete="on">
  <div v-for="item in formItems" :key="item.id" class="form-item">
    <label :for="item.id">{{ item.label }}: </label>
    <input
      :type="item.type"
      :id="item.id"
      :name="item.id"
      v-model="item.value"
    />
  </div>
  <button type="submit">Submit</button>
</form>
```

<!-- <common-codepen-snippet title="Simple Form" slug="dyNzzWZ" :height="368" tab="js,result" theme="light" :preview="false" :editable="false" /> -->

توجه کنید که می‌توانید `autocomplete='on'‎` را روی عنصر form قرار دهید و این ویژگی برای تمام inputهای فرم اعمال می‌شود. همچنین می‌توانید برای هر input [مقدار متفاوتی برای ویژگی autocomplete](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete) تعیین کنید.

### Labels {#labels}

برای هر یک از فیلدها، یک لیبل (label) تعریف کنید تا مشخص شود آن فیلد برای چه منظوری استفاده می‌شود. سپس، ویژگی `id` را برای فیلد و ویژگی `for` را برای لیبل تعریف کنید و مقادیر آن‌ها را برابر هم قرار دهید تا بین لیبل و فیلد ارتباط برقرار شود.

```vue-html
<label for="name">Name: </label>
<input type="text" name="name" id="name" v-model="name" />
```

<!-- <common-codepen-snippet title="Form Label" slug="XWpaaaj" :height="265" tab="js,result" theme="light" :preview="false" :editable="false" /> -->

اگر این عنصر را در developer tools کروم خود بررسی کنید و تب Accessibility را درون تب Elements باز کنید، خواهید دید که چگونه input نام خود را از لیبل دریافت می کند:

![Chrome Developer Tools showing input accessible name from label](./images/AccessibleLabelChromeDevTools.png)

:::warning هشدار
اگرچه ممکن است label هایی را دیده باشید که فیلدهای ورودی را به این صورت دربر گرفته‌باشند:

```vue-html
<label>
  Name:
  <input type="text" name="name" id="name" v-model="name" />
</label>
```

اما تنظیم صریح لیبل‌ها با یک id مطابق توسط فناوری‌های کمکی بهتر پشتیبانی می‌شود.
:::

#### `aria-label` {#aria-label}

همچنین می‌توانید با استفاده از [`aria-label`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-label) به input نام دسترس‌پذیر بدهید.

```vue-html
<label for="name">Name: </label>
<input
  type="text"
  name="name"
  id="name"
  v-model="name"
  :aria-label="nameLabel"
/>
```

<!-- <common-codepen-snippet title="Form ARIA label" slug="NWdvvYQ" :height="265" tab="js,result" theme="light" :preview="false" :editable="false" /> -->

این عنصر را در ابزارهای توسعه‌دهنده کروم بررسی کنید تا ببینید چگونه نام تغییر کرده است:

![Chrome Developer Tools showing input accessible name from aria-label](./images/AccessibleARIAlabelDevTools.png)

#### `aria-labelledby` {#aria-labelledby}

استفاده از [`aria-labelledby`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-labelledby) شبیه `aria-label` است با این تفاوت که زمانی استفاده می‌شود که متن لیبل روی صفحه قابل مشاهده باشد. آن را با سایر عناصر از طریق `id` آن‌ها جفت می‌کنند و می‌توانید چندین `id` را متصل کنید: (مترجم: billing به h1 و name به input برمی‌گرده. input هم از label نام می‌گیره)

```vue-html
<form
  class="demo"
  action="/dataCollectionLocation"
  method="post"
  autocomplete="on"
>
  <h1 id="billing">Billing</h1>
  <div class="form-item">
    <label for="name">Name: </label>
    <input
      type="text"
      name="name"
      id="name"
      v-model="name"
      aria-labelledby="billing name"
    />
  </div>
  <button type="submit">Submit</button>
</form>
```

<!-- <common-codepen-snippet title="Form ARIA labelledby" slug="MWJvvBe" :height="265" tab="js,result" theme="light" :preview="false" :editable="false" /> -->

![Chrome Developer Tools showing input accessible name from aria-labelledby](./images/AccessibleARIAlabelledbyDevTools.png)

#### `aria-describedby` {#aria-describedby}

[aria-describedby](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-describedby) به همان شیوه‌ی `aria-labelledby` استفاده می‌شود با این تفاوت که توضیحاتی با اطلاعات اضافی که کاربر ممکن است نیاز داشته باشد را فراهم می‌کند. این می‌تواند برای توضیح معیارهای هر ورودی استفاده شود:

```vue-html
<form
  class="demo"
  action="/dataCollectionLocation"
  method="post"
  autocomplete="on"
>
  <h1 id="billing">Billing</h1>
  <div class="form-item">
    <label for="name">Full Name: </label>
    <input
      type="text"
      name="name"
      id="name"
      v-model="name"
      aria-labelledby="billing name"
      aria-describedby="nameDescription"
    />
    <p id="nameDescription">Please provide first and last name.</p>
  </div>
  <button type="submit">Submit</button>
</form>
```

<!-- <common-codepen-snippet title="Form ARIA describedby" slug="gOgxxQE" :height="265" tab="js,result" theme="light" :preview="false" :editable="false" /> -->

شما می‌توانید description را با بررسی Chrome DevTools ببینید:

![Chrome Developer Tools showing input accessible name from aria-labelledby and description with aria-describedby](./images/AccessibleARIAdescribedby.png)

### نمونه متن | Placeholder {#placeholder}

از Placeholder ها اجتناب کنید زیرا می‌توانند بسیاری از کاربران را گیج کنند.

یکی از مشکلات Placeholder ها این است که به طور پیش‌فرض [معیارهای کنتراست رنگ](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html) را برآورده نمی‌کنند؛ تصحیح کنتراست رنگ باعث می‌شود Placeholder شبیه داده‌های از پیش‌تکمیل‌شده در فیلدهای ورودی به نظر برسد. با نگاه به مثال زیر، می‌توانید ببینید که Placeholder نام خانوادگی که معیارهای کنتراست رنگ را برآورده می‌کند، شبیه داده‌های پیش‌تکمیل‌شده می‌رسد:

![Accessible placeholder](./images/AccessiblePlaceholder.png)

```vue-html
<form
  class="demo"
  action="/dataCollectionLocation"
  method="post"
  autocomplete="on"
>
  <div v-for="item in formItems" :key="item.id" class="form-item">
    <label :for="item.id">{{ item.label }}: </label>
    <input
      type="text"
      :id="item.id"
      :name="item.id"
      v-model="item.value"
      :placeholder="item.placeholder"
    />
  </div>
  <button type="submit">Submit</button>
</form>
```

```css
/* https://www.w3schools.com/howto/howto_css_placeholder.asp */

#lastName::placeholder {
  /* Chrome, Firefox, Opera, Safari 10.1+ */
  color: black;
  opacity: 1; /* Firefox */
}

#lastName:-ms-input-placeholder {
  /* Internet Explorer 10-11 */
  color: black;
}

#lastName::-ms-input-placeholder {
  /* Microsoft Edge */
  color: black;
}
```

بهتر است تمام اطلاعاتی که کاربر برای پر کردن فرم‌ها نیاز دارد خارج از input ها فراهم شود.

### دستورالعمل‌ها | Instructions {#instructions}

هنگام اضافه کردن دستورالعمل برای فیلدهای ورودی، مطمئن شوید آن را به درستی به ورودی متصل کرده‌اید.
می‌توانید دستورالعمل‌های اضافی ارائه دهید و چندین id را درون [`aria-labelledby`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-labelledby) متصل کنید. این امکان طراحی انعطاف‌پذیرتری را فراهم می‌کند.

```vue-html
<fieldset>
  <legend>Using aria-labelledby</legend>
  <label id="date-label" for="date">Current Date: </label>
  <input
    type="date"
    name="date"
    id="date"
    aria-labelledby="date-label date-instructions"
  />
  <p id="date-instructions">MM/DD/YYYY</p>
</fieldset>
```

به علاوه، می‌توانید دستورالعمل‌ها را با استفاده از [`aria-describedby`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-describedby) به ورودی متصل کنید:

```vue-html
<fieldset>
  <legend>Using aria-describedby</legend>
  <label id="dob" for="dob">Date of Birth: </label>
  <input type="date" name="dob" id="dob" aria-describedby="dob-instructions" />
  <p id="dob-instructions">MM/DD/YYYY</p>
</fieldset>
```

<!-- <common-codepen-snippet title="Form Instructions" slug="WNREEqv" :height="265" tab="js,result" theme="light" :preview="false" :editable="false" /> -->

### پنهان کردن محتوا {#hiding-content}

معمولاً توصیه نمی‌شود label ها را پنهان کرد، حتی اگر input مقدار accessible name را داشته باشد. با این حال، اگر عملکرد ورودی با محتوای اطراف آن قابل درک باشد، می‌توانیم label را بطور بصری پنهان کنیم.

این فیلد سرچ را ببینید:

```vue-html
<form role="search">
  <label for="search" class="hidden-visually">Search: </label>
  <input type="text" name="search" id="search" v-model="search" />
  <button type="submit">Search</button>
</form>
```

می‌توانیم این کار را انجام دهیم زیرا دکمه جستجو به کاربران کمک می‌کند تا هدف فیلد ورودی را شناسایی کنند.

می‌توانیم از CSS برای پنهان کردن بصری عناصر اما نگه داشتن آن‌ها در دسترس فناوری کمکی استفاده کنیم:

```css
.hidden-visually {
  position: absolute;
  overflow: hidden;
  white-space: nowrap;
  margin: 0;
  padding: 0;
  height: 1px;
  width: 1px;
  clip: rect(0 0 0 0);
  clip-path: inset(100%);
}
```

<!-- <common-codepen-snippet title="Form Search" slug="QWdMqWy" :height="265" tab="js,result" theme="light" :preview="false" :editable="false" /> -->

#### `aria-hidden="true"‎` {#aria-hidden-true}

اضافه کردن `aria-hidden="true"‎` عنصر را از دید فناوری کمکی پنهان می‌کند اما آن را به صورت بصری برای سایر کاربران در دسترس نگه می‌دارد. از آن روی عناصر قابل focus استفاده نکنید، صرفاً روی محتوای تزئینی، تکراری یا خارج از صفحه استفاده کنید.

```vue-html
<p> این متن از صفحه خوان پنهان نشده است </p>
<p aria-hidden="true"> این متن از صفحه خوان پنهان شده است <</p>
```

### دکمه‌ها |‌ Buttons {#buttons}

هنگام استفاده از دکمه‌ها درون یک فرم، باید نوع آن‌ها را تنظیم کنید تا از ارسال اشتباهی فرم جلوگیری شود.
همچنین می‌توانید از یک input برای ایجاد دکمه استفاده کنید:

```vue-html
<form action="/dataCollectionLocation" method="post" autocomplete="on">
  <!-- Buttons -->
  <button type="button">Cancel</button>
  <button type="submit">Submit</button>

  <!-- Input buttons -->
  <input type="button" value="Cancel" />
  <input type="submit" value="Submit" />
</form>
```

<!-- <common-codepen-snippet title="Form Buttons" slug="JjEyrYZ" :height="467" tab="js,result" theme="light" :preview="false" :editable="false" /> -->

### Functional Images {#functional-images}

می‌توانید از این تکنیک برای ایجاد تصاویر عملکردی استفاده کنید.

- فیلدهای ورودی

  - این تصاویر مانند دکمه‌ای با نوع submit در فرم‌ها عمل می‌کنند

  ```vue-html
  ‎<form role="search"‎>‎
    ‎<label for="search" class="hidden-visually">Search: </label>‎
    ‎<input type="text" name="search" id="search" v-model="search"‎ />‎
    ‎<input
      type="image"‎
      class="btnImg"‎
      src="https://img.icons8.com/search"‎
      alt="Search"‎
    ‎/>‎
  ‎</form>‎
  ```

- آیکن‌ها

```vue-html
<form role="search">
  <label for="searchIcon" class="hidden-visually">Search: </label>
  <input type="text" name="searchIcon" id="searchIcon" v-model="searchIcon" />
  <button type="submit">
    <i class="fas fa-search" aria-hidden="true"></i>
    <span class="hidden-visually">Search</span>
  </button>
</form>
```

<!-- <common-codepen-snippet title="Functional Images" slug="jOyLGqM" :height="265" tab="js,result" theme="light" :preview="false" :editable="false" /> -->

## استانداردها {#standards}

کنسرسیوم جهانی وب (W3C) و کارگروه دسترس‌پذیری وب (WAI) استانداردهای دسترس‌پذیری وب را برای قسمت‌های مختلف توسعه می‌دهد:

- [User Agent Accessibility Guidelines (UAAG)](https://www.w3.org/WAI/standards-guidelines/uaag/)
  - مرورگرها و پخش‌کننده‌های رسانه‌ای، از جمله برخی ویژگی‌های مرتبط با فناوری‌های کمکی
- [Authoring Tool Accessibility Guidelines (ATAG)](https://www.w3.org/WAI/standards-guidelines/atag/)
  - ابزارهای تولید محتوا
- [Web Content Accessibility Guidelines (WCAG)](https://www.w3.org/WAI/standards-guidelines/wcag/)
  - محتوای وب - توسط توسعه‌دهندگان، ابزارهای تولید محتوا و ابزارهای ارزیابی دسترس‌پذیری مورد استفاده قرار می‌گیرد.

### رهنمودهای دسترسی‌پذیری محتوای وب | Web Content Accessibility Guidelines (WCAG) {#web-content-accessibility-guidelines-wcag}

[WCAG 2.1](https://www.w3.org/TR/WCAG21/) بر اساس [WCAG 2.0](https://www.w3.org/TR/WCAG20/) توسعه یافته و اجرای فناوری‌های جدید را با رسیدگی به تغییرات وب ممکن می‌سازد. W3C توصیه می‌کند هنگام توسعه یا به‌روزرسانی خط‌مشی‌های دسترس‌پذیری وب، از جدیدترین نسخه WCAG استفاده شود.

#### چهار اصل راهنمای اصلی WCAG 2.1 (به اختصار POUR): {#wcag-2-1-four-main-guiding-principles-abbreviated-as-pour}

- [قابل ادراک (Perceivable)](https://www.w3.org/TR/WCAG21/#perceivable)
  - کاربران باید بتوانند اطلاعات ارائه شده را درک کنند
- [قابل استفاده (Operable)](https://www.w3.org/TR/WCAG21/#operable)
  - اجزای رابط کاربری مانند دکمه‌ها، فیلدهای ورود اطلاعات، لینک‌ها و منوها باید برای کاربران قابل دسترسی و استفاده باشد
- [قابل فهم (Understandable)](https://www.w3.org/TR/WCAG21/#understandable)
  - اطلاعات و عملکرد رابط کاربری باید برای همه کاربران قابل فهم باشد
- [انعطاف‌پذیر (Robust)](https://www.w3.org/TR/WCAG21/#robust)
  - محتوای وبسایت باید به گونه‌ای طراحی و پیاده‌سازی شود که با گذشت زمان و ظهور فناوری‌ها و ابزارهای جدید (مثل مرورگرهای جدید، سیستم‌عامل‌های جدید و غیره)، همچنان قابل دسترس و استفاده برای کاربران باقی بماند

#### کارگروه دسترسی‌پذیری وب - راهنماهایی برای برنامه‌های اینترنتی غنی و قابل دسترس (WAI-ARIA) {#web-accessibility-initiative-–-accessible-rich-internet-applications-wai-aria}

کنسرسیوم جهانی وب راهنمایی‌هایی در مورد چگونگی ساخت محتوای تعاملی و رابط کاربری پیشرفته ارائه می‌دهد.

- [Accessible Rich Internet Applications (WAI-ARIA) 1.2](https://www.w3.org/TR/wai-aria-1.2/)
- [WAI-ARIA Authoring Practices 1.2](https://www.w3.org/TR/wai-aria-practices-1.2/)

## منابع {#resources}

### مستندات {#documentation}

- [WCAG 2.0](https://www.w3.org/TR/WCAG20/)
- [WCAG 2.1](https://www.w3.org/TR/WCAG21/)
- [Accessible Rich Internet Applications (WAI-ARIA) 1.2](https://www.w3.org/TR/wai-aria-1.2/)
- [WAI-ARIA Authoring Practices 1.2](https://www.w3.org/TR/wai-aria-practices-1.2/)

### فناوری‌های کمکی {#assistive-technologies}

- صفحه‌خوان
  - [NVDA](https://www.nvaccess.org/download/)
  - [VoiceOver](https://www.apple.com/accessibility/mac/vision/)
  - [JAWS](https://www.freedomscientific.com/products/software/jaws/?utm_term=jaws%20screen%20reader&utm_source=adwords&utm_campaign=All+Products&utm_medium=ppc&hsa_tgt=kwd-394361346638&hsa_cam=200218713&hsa_ad=296201131673&hsa_kw=jaws%20screen%20reader&hsa_grp=52663682111&hsa_net=adwords&hsa_mt=e&hsa_src=g&hsa_acc=1684996396&hsa_ver=3&gclid=Cj0KCQjwnv71BRCOARIsAIkxW9HXKQ6kKNQD0q8a_1TXSJXnIuUyb65KJeTWmtS6BH96-5he9dsNq6oaAh6UEALw_wcB)
  - [ChromeVox](https://chrome.google.com/webstore/detail/chromevox-classic-extensi/kgejglhpjiefppelpmljglcjbhoiplfn?hl=en)
- ابزارهای بزرگنمایی
  - [MAGic](https://www.freedomscientific.com/products/software/magic/)
  - [ZoomText](https://www.freedomscientific.com/products/software/zoomtext/)
  - [Magnifier](https://support.microsoft.com/en-us/help/11542/windows-use-magnifier-to-make-things-easier-to-see)

### تست {#testing}

- ابزار های خودکار سازی
  - [Lighthouse](https://chrome.google.com/webstore/detail/lighthouse/blipmdconlkpinefehnmjammfjpmpbjk)
  - [WAVE](https://chrome.google.com/webstore/detail/wave-evaluation-tool/jbbplnpkjmmeebjpijfedlgcdilocofh)
  - [ARC Toolkit](https://chrome.google.com/webstore/detail/arc-toolkit/chdkkkccnlfncngelccgbgfmjebmkmce?hl=en-US)
- ابزارهای رنگ
  - [WebAim Color Contrast](https://webaim.org/resources/contrastchecker/)
  - [WebAim Link Color Contrast](https://webaim.org/resources/linkcontrastchecker)
- سایر ابزارهای مفید
  - [HeadingMap](https://chrome.google.com/webstore/detail/headingsmap/flbjommegcjonpdmenkdiocclhjacmbi?hl=en…)
  - [Color Oracle](https://colororacle.org)
  - [NerdeFocus](https://chrome.google.com/webstore/detail/nerdefocus/lpfiljldhgjecfepfljnbjnbjfhennpd?hl=en-US…)
  - [Visual Aria](https://chrome.google.com/webstore/detail/visual-aria/lhbmajchkkmakajkjenkchhnhbadmhmk?hl=en-US)
  - [Silktide Website Accessibility Simulator](https://chrome.google.com/webstore/detail/silktide-website-accessib/okcpiimdfkpkjcbihbmhppldhiebhhaf?hl=en-US)

### کاربران {#users}

سازمان بهداشت جهانی تخمین می‌زند که ۱۵ درصد جمعیت جهان دارای نوعی ناتوانی هستند که ۲ تا ۴ درصد آن‌ها به شدت ناتوان می‌باشند. این برآورد حاکی از آن است که حدود یک میلیارد نفر در سراسر جهان دارای ناتوانی هستند؛ بنابراین افراد دارای ناتوانی بزرگ‌ترین گروه اقلیت در جهان را تشکیل می‌دهند.

انواع مختلفی از ناتوانی‌ها وجود دارد که به طور تقریبی می‌توان آن‌ها را به چهار دسته تقسیم کرد:

- _[بینایی](https://webaim.org/articles/visual/)_ - این کاربران می‌توانند از صفحه خوان‌ها، بزرگ‌نمایی صفحه، کنترل کنتراست صفحه یا نمایشگر بریل بهره‌مند شوند.
- _[شنوایی](https://webaim.org/articles/auditory/)_ -  این کاربران می‌توانند از زیرنویس‌ها، پیاده‌سازی متن یا ویدیوهای زبان اشاره بهره‌مند شوند.
- _[حرکتی](https://webaim.org/articles/motor/)_ -  این کاربران می‌توانند از مجموعه‌ای از [فناوری‌های کمکی برای نقص حرکتی](https://webaim.org/articles/motor/assistive) بهره‌مند شوند: نرم‌افزارهای تشخیص گفتار، ردیابی چشم، دسترسی تک‌سوئیچی، عصای سر، سوئیچ مکش و فوت، توپ غلتان بزرگ، صفحه‌کلید سازگار و سایر فناوری‌های کمکی. 
- _[شناختی](https://webaim.org/articles/cognitive/)_ - این کاربران می‌توانند از رسانه‌های تکمیلی، سازماندهی ساختاری محتوا و نوشتار ساده و روشن بهره‌مند شوند.

لینک‌های زیر از WebAim را برای درک بهتر نیاز کاربران بررسی کنید:

- [Web Accessibility Perspectives: Explore the Impact and Benefits for Everyone](https://www.w3.org/WAI/perspective-videos/)
- [Stories of Web Users](https://www.w3.org/WAI/people-use-web/user-stories/)
