# دایرکتیو‌های داخلی {#built-in-directives}

## v-text {#v-text}

محتوای متنی عنصر را به‌روزرسانی کند.

- **انتظار دریافت ورودی با تایپ `string` دارد.**

- **جزئیات**

  `v-text` با تنظیم پراپرتی [textContent](https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent) عنصر کار می‌کند، بنابراین محتوای موجود درون عنصر را جایگزین خواهد کرد. اگر نیاز به به‌روزرسانی بخشی از `textContent` دارید، باید به جای آن از [قابلیت درج متن](/guide/essentials/template-syntax#text-interpolation) استفاده کنید.

- **مثال**

  ```vue-html
  <span v-text="msg"></span>
  <!-- همانند -->
  <span>{{msg}}</span>
  ```

- **همچنین ببینید** [Template Syntax - درج متن](/guide/essentials/template-syntax#text-interpolation)

## v-html {#v-html}

[innerHTML](https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML) عنصر را به‌روزرسانی می‌کند.

- **انتظار دریافت ورودی با تایپ `string` دارد.**

- **جزئیات**

  محتویات `v-html` به عنوان HTML خام درج می‌شوند - کدهایی که سینتکس تمپلیت Vue را دارند، پردازش نخواهد شد. اگر در حال تلاش برای ترکیب تمپلیت‌ها با استفاده از `v-html` هستید، سعی کنید مجدداً راه حل را با استفاده از کامپوننت‌ها بیاندیشید.

  ::: warning نکته امنیتی
  رندر کردن HTML دلخواه در وبسایت شما می‌تواند بسیار خطرناک باشد زیرا به راحتی می‌تواند منجر به [حملات XSS](https://en.wikipedia.org/wiki/Cross-site_scripting) شود. تنها از `v-html` روی محتوای قابل اعتماد استفاده کنید و **هرگز** روی محتوای تأمین شده توسط کاربر از آن استفاده نکنید.
  :::

  در [کامپوننت‌های Single-File](/guide/scaling-up/sfc)، استایل‌های `scoped` روی محتویات درون `v-html` اعمال نخواهند شد، زیرا این HTML توسط کامپایلر Vue پردازش نشده است. اگر می‌خواهید محتوای `v-html` را با CSS scoped هدف‌گیری کنید، می‌توانید به جای آن از [CSS Modules](./sfc-css-features#css-modules) یا یک عنصر `<style>` سراسری اضافی با یک استراتژی scope دستی مانند BEM استفاده کنید.

- **مثال**

  ```vue-html
  <div v-html="html"></div>
  ```

- **همچنین ببینید** [Template Syntax - Raw HTML](/guide/essentials/template-syntax#raw-html)

## v-show {#v-show}

نمایش عنصر را بر اساس درستی مقدار عبارت تغییر وضعیت می‌دهد.

- **انتظار دریافت ورودی با تایپ `any` دارد.**

- **جزئیات**

  `v-show` با تنظیم پراپرتی `display` در CSS از طریق استایل‌های درون خطی کار می‌کند و سعی می‌کند هنگامی که عنصر نمایش داده شده `display` اولیه را رعایت کند. همچنین هنگامی که شرط آن تغییر کند ترنزیشن‌‌ها را راه‌اندازی می‌کند.

- **همچنین ببینید** [رِندر شرطی - v-show](/guide/essentials/conditional#v-show)

## v-if {#v-if}

یک عنصر یا بخشی از تمپلیت را بر اساس درستی مقدار عبارت ورودی به صورت شرطی رندر می‌کند.

- **انتظار دریافت ورودی با تایپ `any` دارد.**

- **جزئیات**

  هنگامی که یک عنصر `v-if` تغییر وضعیت می‌دهد، عنصر و دایرکتیوها/کامپوننت‌های درون آن نابود و دوباره بازسازی می‌شوند. اگر مقدار شرط اولیه یک عبارت falsy باشد، در آن صورت محتوای داخل آن اصلا رندر نخواهد شد.

  می‌تواند روی `<template>` برای نشان دادن یک بلوک شرطی حاوی تنها متن یا چندین عنصر استفاده شود.

  این دایرکتیو هنگامی که شرط آن تغییر کند ترنزیشن‌ها را راه‌اندازی می‌کند.
  
  هنگام استفاده همزمان، `v-if` نسبت به `v-for` اولویت بالاتری دارد. توصیه نمی‌کنیم این دو دایرکتیو را روی یک عنصر با هم استفاده کنید - برای جزئیات به راهنمای [رندر لیست](/guide/essentials/list#v-for-with-v-if) مراجعه کنید.

- **همچنین ببینید** [رِندر شرطی - v-if](/guide/essentials/conditional#v-if)

## v-else {#v-else}

بلوک "else" را برای `v-if` یا یک زنجیره `v-if` / `v-else-if` مشخص می‌کند.

- **انتظار دریافت هیچ عبارتی را به عنوان ورودی ندارد**

- **جزئیات**

  - محدودیت: عنصر قبلی باید `v-if` یا `v-else-if` داشته باشد.

  - می‌تواند روی `<template>` برای نشان دادن بلوک شرطی حاوی تنها متن یا چند عنصر استفاده شود.

- **مثال**

  ```vue-html
  <div v-if="Math.random() > 0.5">
    Now you see me
  </div>
  <div v-else>
    Now you don't
  </div>
  ```

- **همچنین ببینید** [رِندر شرطی - v-else](/guide/essentials/conditional#v-else)

## v-else-if {#v-else-if}

بلوک "else if" را برای `v-if` مشخص کند. قابل زنجیره‌سازی است.

- **انتظار دریافت ورودی با تایپ `any` دارد.**

- **جزئیات**

  - محدودیت: عنصر قبلی باید `v-if` یا `v-else-if` داشته باشد.

  - می‌تواند روی `<template>` برای نشان دادن بلوک شرطی حاوی تنها متن یا چند عنصر استفاده شود.

- **مثال**

  ```vue-html
  <div v-if="type === 'A'">
    A
  </div>
  <div v-else-if="type === 'B'">
    B
  </div>
  <div v-else-if="type === 'C'">
    C
  </div>
  <div v-else>
    Not A/B/C
  </div>
  ```

- **همچنین ببینید** [رِندر شرطی - v-else-if](/guide/essentials/conditional#v-else-if)

## v-for {#v-for}

عنصر یا بلوک تمپلیت را بر اساس داده‌های منبع چند بار رندر می‌کند.

- **انتظار دریافت ورودی با تایپ `Array | Object | number | string | Iterable` دارد.**

- **جزئیات**

  مقدار دایرکتیو باید از سینتکس ویژه `alias in expression` برای ارائه یک نام مستعار برای عنصر در حال تکرار استفاده کند:

  ```vue-html
  <div v-for="item in items">
    {{ item.text }}
  </div>
  ```

  به عنوان جایگزین، می‌توانید برای اندیس (یا key اگر روی یک آبجکت استفاده می‌شود) نیز نام مستعار مشخص کنید:

  ```vue-html
  <div v-for="(item, index) in items"></div>
  <div v-for="(value, key) in object"></div>
  <div v-for="(value, name, index) in object"></div>
  ```

  رفتار پیش‌فرض `v-for` سعی می‌کند عناصر را بدون جابجایی در مکان فعلی با هم پچ کند. برای وادار کردن آن به مرتب‌سازی عناصر، باید راهنمای مرتب‌سازی با ویژگی خاص `key` ارائه دهید:

  ```vue-html
  <div v-for="item in items" :key="item.id">
    {{ item.text }}
  </div>
  ```

  `v-for` همچنین می‌تواند روی مقادیری که از [Iterable Protocol](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterable_protocol) پیروی می‌کنند، از جمله `Map` و `Set` بومی، کار کند.

- **همچنین ببینید**
  - [رِندر شرطی](/guide/essentials/list)

## v-on {#v-on}

یک گوش‌دهنده رویداد را به عنصر متصل کند.

- **مخفف:** `@`

- **انتظار دریافت ورودی با تایپ `Function | Inline Statement | Object (without argument)` دارد.**

- **آرگومان:** `event` (اختیاری اگر از سینتکس آبجکت استفاده می‌شود)

- **Modifiers**

  - `‎.stop` - عبارت `event.stopPropagation()‎` را صدا بزند.
  - `‎.prevent` - عبارت `event.preventDefault()‎` را صدا بزند.
  - `‎.capture` - گوش‌دهنده رویداد را در حالت capture اضافه کند.
  - `‎.self` - تنها در صورتی که رویداد از این عنصر dispatch شده باشد هندلر را راه‌اندازی کند.
  - `.{keyAlias}` - only trigger handler on certain keys.
  - `‎.once` - تنها یک بار هندلر را راه‌اندازی کند.
  - `‎.left` - تنها هندلر را برای رویدادهای ماوس کلیک چپ راه‌اندازی کند.
  - `‎.right` - تنها هندلر را برای رویدادهای ماوس کلیک راست راه‌اندازی کند.
  - `‎.middle` - تنها هندلر را برای رویدادهای ماوس کلیک وسط راه‌اندازی کند.
  - `‎.passive` - یک رویداد DOM با `{ passive: true }` متصل کند.

- **جزئیات**

  نوع رویداد با آرگومان مشخص می‌شود. عبارت می‌تواند نام یک متد، عبارت درون ‌خطی، یا اگر مُدیفایرهایی وجود داشته باشند، حذف‌شده باشد.

  هنگام استفاده روی یک عنصر معمولی، تنها به [**رویدادهای بومی DOM**](https://developer.mozilla.org/en-US/docs/Web/Events) گوش می‌دهد. هنگام استفاده روی یک کامپوننت سفارشی شده، به ***رویدادهای سفارشی*** منتشرشده روی آن کامپوننت فرزند گوش می‌دهد.

  هنگام گوش دادن به رویدادهای بومی DOM، متد رویداد بومی را به عنوان تنها آرگومان دریافت می‌کند. اگر از عبارت درون خطی استفاده می‌کنید، عبارت به خاصیت ویژه `‎$event` دسترسی دارد: `v-on:click="handle('ok', $event)"‎`.

  `v-on` همچنین از متصل کردن به یک آبجکت از جفت‌های رویداد / گوش‌دهنده بدون آرگومان پشتیبانی می‌کند. توجه داشته باشید هنگام استفاده از سینتکس آبجکت، از هیچ مدیفایری پشتیبانی نمی‌کند.

- **مثال**

  ```vue-html
  <!-- هندلر متد -->
  <button v-on:click="doThis"></button>

  <!-- رویداد پویا -->
  <button v-on:[event]="doThis"></button>

  <!-- عبارت درون خط -->
  <button v-on:click="doThat('hello', $event)"></button>

  <!-- مخفف -->
  <button @click="doThis"></button>

  <!-- مخفف رویداد پویا -->
  <button @[event]="doThis"></button>

  <!-- (stop propagation) متوقف کردن انتشار -->
  <button @click.stop="doThis"></button>

  <!-- (prevent default) جلوگیری از رفتار پیش‌فرض -->
  <button @click.prevent="doThis"></button>

  <!-- جلوگیری از رفتار پیش‌فرض بدون عبارت -->
  <form @submit.prevent></form>

  <!-- زنجیره مدیفایرها -->
  <button @click.stop.prevent="doThis"></button>

  <!-- keyAlias اصلاح‌کننده کلید با استفاده از -->
  <input @keyup.enter="onEnter" />

  <!-- رویداد کلیک حداکثر یکبار راه‌اندازی می‌شود --> 
  <button v-on:click.once="doThis"></button>

  <!-- سینتکس آبجکت -->
  <button v-on="{ mousedown: doThis, mouseup: doThat }"></button>
  ```

  گوش دادن به رویدادهای سفارشی روی یک کامپوننت فرزند (هندلر هنگامی که "my-event" روی کامپوننت فرزند منتشر می‌شود صدا زده می‌شود):

  ```vue-html
  <MyComponent @my-event="handleThis" />

  <!-- عبارت درون خط -->
  <MyComponent @my-event="handleThis(123, $event)" />
  ```

- **همچنین ببینید**
  - [مدیریت رویدادها](/guide/essentials/event-handling)
  - [مبانی کامپوننت‌ها - گوش دادن به رویدادها](/guide/essentials/component-basics#listening-to-events)

## v-bind {#v-bind}

یک یا چند اتریبیوت را به صورت پویا به یک عبارت متصل کند، یا یک prop کامپوننت را به یک عبارت متصل کند.

- **مخفف:**
  - `:` یا `.` (هنگام استفاده از اصلاح‌کننده `‎.prop`)
  - حذف مقدار (هنگامی که نام اتریبیوت و مقدار متصل‌شده یکی باشد)  <sup class="vt-badge">3.4+</sup>

- **انتظار دریافت ورودی با تایپ `any (with argument) | Object (without argument)` دارد.**

- **آرگومان:** `attrOrProp (اختیاری)`

- **Modifiers**

  - `‎.camel` - نام اتریبیوت kebab-case را به camelCase تبدیل کند.
  - `‎.prop` - اتصال را مجبور به تنظیم به عنوان یک پراپرتی DOM کند. <sup class="vt-badge">3.2+</sup>
  - `‎.attr` - اتصال را مجبور به تنظیم به عنوان یک اتریبیوت DOM کند. <sup class="vt-badge">3.2+</sup>

- **کاربرد**

  هنگام استفاده برای متصل کردن `class` یا `style` ، `v-bind` از تایپ‌های داده مانند آرایه یا آبجکت‌ها هم پشتیبانی می‌کند. برای جزئیات بیشتر به بخش راهنمای مرتبط زیر مراجعه کنید.

  هنگام تنظیم یک اتصال روی یک عنصر، Vue به طور پیش‌فرض بررسی می‌کند که آیا عنصر خاصیت مورد نظر را به عنوان یک خاصیت با استفاده از چک `in` تعریف کرده است یا خیر. اگر خاصیت تعریف شده باشد، Vue مقدار را به جای اتریبیوت به عنوان خاصیت DOM تنظیم می‌کند. این در بیشتر موارد کار می‌کند، اما می‌توانید با استفاده صریح از `‎.prop` یا `‎.attr` این رفتار را پشتیبانی نمایید. گاهی اوقات این کار ضروری است، به ویژه هنگام [کار با عناصر سفارشی](/guide/extras/web-components#passing-dom-properties).

  هنگام استفاده برای متصل کردن prop کامپوننت، باید prop به درستی در کامپوننت فرزند اعلام شده باشد.

  هنگام استفاده بدون آرگومان، می‌تواند برای متصل کردن یک آبجکت حاوی جفت‌های نام-مقدار اتریبیوت استفاده شود.

- **مثال**

  ```vue-html
  <!-- متصل کردن یک اتریبیوت -->  
  <img v-bind:src="imageSrc" />

  <!-- نام اتریبیوت پویا -->
  <button v-bind:[key]="value"></button>

  <!-- مخفف -->
  <img :src="imageSrc" />

  <!-- توسعه می‌یابد :src="src" مخفف همنام (3.4+) ، به -->
  <img :src />

  <!-- مخفف نام اتریبیوت پویا -->
  <button :[key]="value"></button>

  <!-- با رشته‌سازی درون‌خطی -->
  <img :src="'/path/to/images/' + fileName" />

  <!-- متصل‌سازی کلاس -->
  <div :class="{ red: isRed }"></div>
  <div :class="[classA, classB]"></div>
  <div :class="[classA, { classB: isB, classC: isC }]"></div>

  <!-- متصل‌سازی استایل -->
  <div :style="{ fontSize: size + 'px' }"></div>
  <div :style="[styleObjectA, styleObjectB]"></div>

  <!-- متصل کردن یک آبجکت از اتریبیوت‌ها -->
  <div v-bind="{ id: someProp, 'other-attr': otherProp }"></div>

  <!-- باید در کامپوننت فرزند اعلام شده باشد "prop" .prop اتصال -->
  <MyComponent :prop="someThing" />

  <!-- های والد مشترک با یک کامپوننت فرزند prop انتقال -->
  <MyComponent v-bind="$props" />

  <!-- XLink -->
  <svg><a :xlink:special="foo"></a></svg>
  ```

  مدیفایر `‎.prop` همچنین دارای یک مخفف اختصاصی `.` است:

  ```vue-html
  <div :someProperty.prop="someObject"></div>

  <!-- معادل -->
  <div .someProperty="someObject"></div>
  ```

  مدیفایر `‎.camel` اجازه camelizing نام یک اتریبیوت `v-bind` را هنگام استفاده از تمپلیت‌های درون-DOM می‌دهد، به عنوان مثال اتریبیوت `viewBox` در SVG:

  ```vue-html
  <svg :view-box.camel="viewBox"></svg>
  ```

  `‎.camel` اگر از تمپلیت‌های رشته‌ای استفاده می‌کنید یا تمپلیت را با یک مرحله بیلد از پیش‌کامپایل می‌کنید، نیاز نیست.

- **همچنین ببینید**
  - [اتصال کلاس و استایل](/guide/essentials/class-and-style)
  - [کامپوننت‌ها - جزئیات پاس دادن پراپ‌ها](/guide/components/props#prop-passing-details)

## v-model {#v-model}

یک اتصال دوطرفه روی یک عنصر فرم ورودی یا یک کامپوننت ایجاد می‌کند.

- **انتظار ورودی:** بسته به مقدار عناصر ورودی فرم یا خروجی کامپوننت‌ها متفاوت است.

- **محدود به:**

  - `<input>`
  - `<select>`
  - `<textarea>`
  - کامپوننت‌ها

- **Modifiers**

  - [`‎.lazy`](/guide/essentials/forms#lazy) - به جای رویداد‌های `input` به `change` گوش دهد
  - [`‎.number`](/guide/essentials/forms#number) - رشته ورودی معتبر را به عدد تبدیل کند
  - [`‎.trim`](/guide/essentials/forms#trim) - فضای خالی اینپوت کاربر به‌طور خودکار بریده شود

- **همچنین ببینید**

  - [اتصال input در فرم](/guide/essentials/forms)
  - [رویدادهای کامپوننت - استفاده با `v-model`](/guide/components/v-model)

## v-slot {#v-slot}

اسلات‌های نامگذاری‌شده یا محدوده‌داری را که انتظار دریافت props دارند، مشخص کند.

- **مخفف:** `#`

- **انتظار ورودی**: عبارت JavaScript که در موقعیت آرگومان تابع معتبر باشد، شامل پشتیبانی از ساختارگشایی. اختیاری - تنها زمانی لازم است که انتظار وجود داشته باشد props به slot پاس داده شود.

- **آرگومان:** نام اسلات (اختیاری، پیش‌فرض `default`)

- **محدود به:**

  - `<template>`
  - [کامپوننت‌ها](/guide/components/slots#scoped-slots)  (برای یک اسلات پیش‌فرض تنها با props)

- **مثال**

  ```vue-html
  <!-- اسلات نامگذاری‌شده -->
  <BaseLayout>
    <template v-slot:header>
      محتوای هدر
    </template>

    <template v-slot:default>
      محتوای اسلات پیش‌فرض
    </template>

    <template v-slot:footer>
      محتوای فوتر
    </template>
  </BaseLayout>

  <!-- دریافت می‌کند props اسلات نامگذاری‌شده که -->
  <InfiniteScroll>
    <template v-slot:item="slotProps">
      <div class="item">
        {{ slotProps.item.text }}
      </div>
    </template>
  </InfiniteScroll>

  <!-- دریافت می‌کند، با ساختارگشایی props اسلات پیش‌فرض که  -->
  <Mouse v-slot="{ x, y }">
    Mouse position: {{ x }}, {{ y }}
  </Mouse>
  ```

- **همچنین ببینید**
  - [کامپوننت‌ها - اسلات‌ها](/guide/components/slots)

## v-pre {#v-pre}

عدم کامپایل برای این عنصر و تمام فرزندان آن.

- **انتظار عبارتی را برای ورودی ندارد**

- **جزئیات**

  در داخل عنصر دارای `v-pre`، تمام دستورالعمل‌های تمپلیت Vue حفظ شده و به‌صورت اصلی نمایش داده می‌شود. مورد استفاده رایج‌تر این است که برای نمایش تگ‌های خام mustache استفاده شود.

- **مثال**

  ```vue-html
  <span v-pre>{{ این قسمت کامپایل نخواهد شد }}</span>
  ```

## v-once {#v-once}

عنصر یا کامپوننت را یکبار رندر کند و به‌روزرسانی‌های آینده را نادیده بگیرد.

- **انتظار عبارتی را برای ورودی ندارد.**

- **جزئیات**

  در بازرسی‌های بعدی، عنصر/کامپوننت و تمام فرزندانش به عنوان محتوای استاتیک درنظر گرفته و نادیده گرفته می‌شوند. این می‌تواند برای بهینه‌سازی عملکرد به‌روزرسانی مورد استفاده قرار گیرد.

  ```vue-html
  <!-- عنصر تکی -->
  <span v-once>این هیچ وقت تغییر نخواهد کرد: {{msg}}</span>
  <!-- عنصر دارای فرزندان -->
  <div v-once>
    <h1>نظر</h1>
    <p>{{msg}}</p>
  </div>
  <!-- کامپوننت -->
  <MyComponent v-once :comment="msg"></MyComponent>
  <!-- `v-for` دایرکتیو -->
  <ul>
    <li v-for="i in list" v-once>{{i}}</li>
  </ul>
  ```

  از نسخه 3.2 به بعد، همچنین می‌توانید بخشی از تمپلیت را با شرایط عدم اعتبار با استفاده از [`v-memo`](#v-memo) memoize کنید.

- **همچنین ببینید**
  - [Data Binding Syntax - interpolations](/guide/essentials/template-syntax#text-interpolation)
  - [v-memo](#v-memo)

## v-cloak {#v-cloak}

برای پنهان کردن تمپلیت غیر-کامپایل شده تا زمان آماده شدن آن استفاده می‌شود.

- **انتظار عبارتی را برای ورودی ندارد.**

- **جزئیات**

  **این دستور تنها در تنظیمات بدون مرحله بیلد نیاز است.**

  هنگام استفاده از تمپلیت‌های درون DOM، ممکن است "فلش تمپلیت‌های غیرکامپایل شده" رخ دهد: کاربر ممکن است برچسب‌های mustache خام را تا زمانی که کامپوننت مانت شده آن‌ها را با محتوای render شده جایگزین کند، ببیند.

  `v-cloak` تا زمانی که نمونه ساخته شده از کامپوننت مرتبط مانت شود، روی عنصر باقی خواهد ماند. در ترکیب با قوانین CSS مانند `‎[v-cloak] { display: none }‎`، می‌تواند برای پنهان کردن تمپلیت‌های خام تا زمان آماده شدن کامپوننت استفاده شود.

- **مثال**

  ```css
  [v-cloak] {
    display: none;
  }
  ```

  ```vue-html
  <div v-cloak>
    {{ message }}
  </div>
  ```

  `<div>` تا زمان اتمام کامپایل دیده نخواهد شد.
