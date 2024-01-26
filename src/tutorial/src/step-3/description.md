# Attribute Bindings {#attribute-bindings}

در Vue، از علامت `{{}}` فقط برای نمایش متن استفاده می‌شود. برای اتصال دادن یک اتریبیوت HTML به یک مقدار پویا (مثل یک متغیر)، از دستورالعمل `v-bind` استفاده می‌کنیم:

```vue-html
<div v-bind:id="dynamicId"></div>
```

یک directive صفت ویژه‌ای است که با پیشوند `v-‎` شروع می‌شود. آنها بخشی از سینتکس تمپلیت Vue هستند. مشابه `{{}}`، مقادیر directive عبارت‌های جاوااسکریپت هستند که به state کامپوننت‌ها دسترسی دارند. جزئیات کامل `v-bind` و سینتکس directive ها در <a target="_blank" href="/guide/essentials/template-syntax.html"> راهنما - Template Syntax </a>.

قسمت بعد از دونقطه (`‎:id`) به عنوان «آرگومان» directive شناخته می‌شود. در اینجا، خاصیت `id` عنصر (اینجا div) با خاصیت `dynamicId` از state کامپوننت Vue همگام‌سازی خواهد شد.

از آنجا که `v-bind` به طور مکرر استفاده می‌شود، سینتکس مختصر خود را دارد:

```vue-html
<div :id="dynamicId"></div>
```

اکنون، سعی کنید یک اتصال (binding) `class` پویا به `<h1>` اضافه کنید، با استفاده از <span class="options-api">خاصیت data</span><span class="composition-api">ref</span> `titleClass` به عنوان مقدار آن. اگر به درستی متصل شده باشد، متن قرمز می‌شود.
