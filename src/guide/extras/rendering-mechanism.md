---
outline: deep
---

# مکانیزم رندرینگ | Rendering Mechanism {#rendering-mechanism}

Vue چگونه یک تمپلیت را می‌گیرد و آن را به نودهای DOM واقعی تبدیل می‌کند؟ Vue چگونه این نودهای DOM را به طور کارآمد به‌روزرسانی می‌کند؟ در اینجا سعی می‌کنیم با برسی مکانیزم رندرینگ داخلی Vue، پاسخی برای این سوالات پیدا کنیم.

## DOM مجازی | Virtual DOM {#virtual-dom}

احتمالا عبارت "virtual DOM" را شنیده‌اید که سیستم رندرینگ Vue بر پایه آن است.

virtual DOM یا VDOM مفهومی برنامه‌نویسی است که در آن نمایش ایده‌آل یا "مجازی" رابط کاربری در حافظه نگهداری می‌شود و با DOM "واقعی" همگام‌سازی می‌شود. این مفهوم توسط [React](https://reactjs.org/) پایه‌گذاری شده و در بسیاری از فریم‌ورک‌های دیگر از جمله Vue با نحوه پیاده‌سازی متفاوت بکار گرفته شده است.

virtual DOM بیشتر از یک پَتِرن برای یک فناوری خاص است، بنابراین پیاده‌سازی رسمی واحدی برای آن وجود ندارد. می‌توانیم این ایده را با یک مثال ساده توضیح دهیم:

```js
const vnode = {
  type: 'div',
  props: {
    id: 'hello'
  },
  children: [
    /* more vnodes */
  ]
}
```

در اینجا، `vnode` یک آبجکت ساده جاوااسکریپت (یک "virtual node") که نمایانگر یک عنصر `<div>` است. این شامل تمام اطلاعاتی است که برای ایجاد عنصر واقعی نیاز داریم. همچنین حاوی vnode های بیشتری است که آن را ریشه درخت DOM مجازی می‌کند.

یک runtime renderer (رندرر رانتایم) می‌تواند یک درخت virtual DOM را پیمایش کند و یک درخت DOM واقعی از آن بسازد. به این فرایند **mount** گفته می‌شود.

اگر دو نسخه مختلف از درخت virtual DOM داشته باشیم، رندرر می‌تواند دو درخت را پیمایش و مقایسه کند تا تفاوت‌ها را مشخص کند و آن تغییرات را بر روی DOM واقعی اعمال کند. به این فرایند **patch** گفته می‌شود که به آن "diffing" یا "reconciliation" هم گفته می‌شود.

دستاورد اصلی virtual DOM این است که به توسعه‌دهنده امکان می‌دهد تا به صورت اختیاری و از طریق کدهایی که به راحتی قابل فهم و تعمیم‌پذیر هستند، ساختارهای UI مورد نیاز خود را تعریف کند، در حالی که اعمال مستقیم بر روی DOM و تعامل با DOM به عهده رندرر (Renderer) باشد.

## رَوند رندرینگ | Render Pipeline {#render-pipeline}

بطور کلی، این اتفاقات هنگام mount یک کامپوننت Vue رخ می‌دهد:

1. **Compile**: تمپلیت‌های Vue به **render functions** کامپایل می‌شوند: یعنی توابعی که درختان virtual DOM را برمی‌گردانند. این مرحله می‌تواند یا از پیش در build step انجام شود یا توسط کامپایلرِ رانتایم به صورت بی‌درنگ در مرورگر انجام شود.

2. **Mount**: رندرر رانتایم render function ها را فراخوانی می‌کند، درخت virtual DOM برگردانده شده را پیمایش می‌کند و بر اساس آن نودهای DOM واقعی ایجاد می‌کند. این مرحله به عنوان [reactive effect](./reactivity-in-depth) انجام می‌شود، بنابراین تمام وابستگی‌های reactive که در طول mount استفاده شده‌اند را پیگیری می‌کند.

3. **Patch**: هنگامی که یک وابستگی مورد استفاده در طول mount تغییر کند، effect مجددا اجرا می‌شود. این بار، یک درخت virtual DOM جدید و به‌روزرسانی شده ایجاد می‌شود. رندرر رانتایم درخت جدید را پیمایش می‌کند، آن را با درخت قدیمی مقایسه می‌کند و به‌روزرسانی‌های لازم را بر روی DOM واقعی اعمال می‌کند.

![render pipeline](./images/render-pipeline.png)

<!-- https://www.figma.com/file/elViLsnxGJ9lsQVsuhwqxM/Rendering-Mechanism -->

## Templates در مقابل Render Functions {#templates-vs-render-functions}

تمپلیت‌های Vue به render function های درخت virtual DOM کامپایل می‌شوند. Vue همچنین APIهایی را فراهم می‌کند که به ما اجازه می‌دهد مرحله کامپایل تمپلیت را رد کنیم و مستقیماً render functionها را بنویسیم. render function ها نسبت به تمپلیت‌ها در مواجهه با منطق بسیار پویا و انعطاف‌پذیرتر هستند، زیرا می‌توانید با استفاده از کامل قدرت جاوااسکریپت با vnodeها کار کنید.

پس چرا Vue به طور پیش‌فرض تمپلیت‌ها را توصیه می‌کند؟ چند دلیل وجود دارد:

1. تمپلیت‌ها نزدیک‌تر به HTML واقعی هستند. این باعث می‌شود استفاده مجدد از اسنیپت‌های موجود HTML یا اعمال روش‌های خوب دسترسی‌پذیری یا استایل دادن با CSS و درک و اصلاح توسط طراحان قالب سایت بسیار آسان‌تر شود.

2. تمپلیت‌ها به دلیل سینتکس خاص‌شان، تحلیل آسان‌تری دارند. این مورد اجازه می‌دهد کامپایلر تمپلیت‌های Vue بسیاری از بهینه‌سازی‌های زمان کامپایل را برای بهبود عملکرد virtual DOM (که در ادامه بحث خواهیم کرد) اعمال کند.

در عمل، تمپلیت‌ها برای اکثر موارد استفاده در برنامه‌ها کافی هستند. render functionها معمولاً فقط در کامپوننت‌های قابل استفاده مجدد که نیاز به مدیریت منطق رندرینگ بسیار پویا دارند، استفاده می‌شوند. استفاده از render functionها در [Render Functions & JSX](./render-function) با جزئیات مورد بحث قرار گرفته است.

## Virtual DOM آگاه از کامپایلر | Compiler-Informed Virtual DOM {#compiler-informed-virtual-dom}

پیاده‌سازی virtual DOM در React و اکثر سایر پیاده‌سازی‌ دیگر virtual DOM صرفاً در رانتایم هستند: الگوریتم reconciliation (تطابق) نمی‌تواند هیچ فرضی در مورد درخت virtual DOM ورودی داشته باشد، بنابراین برای تضمین صحت باید به طور کامل درخت را پیمایش کند و props هر vnode را مقایسه کند. علاوه بر این، حتی اگر قسمتی از درخت هرگز تغییر نکند، مجدداً vnodeهای جدیدی برای آن‌ها در هر بازرندر ایجاد می‌شود که منجر به فشار غیرضروری به حافظه می‌شود. این موضوع یکی از مواردی است که بیشترین انتقاد به virtual DOM وارد کرده است: فرایند reconciliation به نوعی "نیرومند" یا "خشن" است، چرا که بدون در نظر گرفتن بهینه‌سازی‌ها، کل درخت virtual DOM را بررسی و مقایسه می‌کند.این کار باعث افت کارایی می‌شود، اما در عوض این اطمینان را می‌دهد که رندرینگ به درستی انجام می‌شود. بنابراین می‌توان گفت این روش، کارایی را برای declarativeness (تعریفی‌بودن) و صحت قربانی می‌کند.

اما لزومی ندارد این‌گونه باشد. در Vue، فریم‌ورک هم کامپایلر و هم رانتایم را کنترل می‌کند. این به ما اجازه می‌دهد تا بسیاری از بهینه‌سازی‌ها را در زمان کامپایل پیاده‌سازی کنیم که فقط یک رندرر متصل شده به هم می‌تواند از آن‌ها بهره ببرد. کامپایلر می‌تواند تمپلیت را به صورت استاتیک تجزیه و تحلیل کرده و راهنمایی‌هایی در کد تولید شده بگذارد تا رانتایم بتواند هر جا که ممکن است از میان‌بر برود. در عین حال، همچنان قابلیت کاربر برای رفتن به لایه render function برای کنترل مستقیم‌تر در موارد لبه‌ای را حفظ می‌کنیم. به این رویکرد ترکیبی **Compiler-Informed Virtual DOM (Virtual DOM آگاه از کامپایلر)** می‌گوییم.

در ادامه، چندین بهینه‌سازی عمده‌ای را که توسط کامپایلر تمپلیت Vue برای بهبود عملکرد رانتایم virtual DOM انجام می‌شود را بررسی خواهیم کرد.

### Static Hoisting {#static-hoisting}

اغلب اوقات قسمت‌هایی در تمپلیت وجود دارد که هیچ binding پویایی ندارند:

```vue-html{2-3}
<div>
  <div>foo</div> <!-- hoisted -->
  <div>bar</div> <!-- hoisted -->
  <div>{{ dynamic }}</div>
</div>
```

[در Template Explorer بررسی کنید](https://template-explorer.vuejs.org/#eyJzcmMiOiI8ZGl2PlxuICA8ZGl2PmZvbzwvZGl2PiA8IS0tIGhvaXN0ZWQgLS0+XG4gIDxkaXY+YmFyPC9kaXY+IDwhLS0gaG9pc3RlZCAtLT5cbiAgPGRpdj57eyBkeW5hbWljIH19PC9kaXY+XG48L2Rpdj5cbiIsIm9wdGlvbnMiOnsiaG9pc3RTdGF0aWMiOnRydWV9fQ==)

دو تگ div با متن `foo` و `bar` استاتیک هستند - مجدداً ایجاد کردن vnodeها و مقایسه آن‌ها در هر بازرندر غیرضروری است. کامپایلر Vue به صورت خودکار توابع ایجاد vnode آن‌ها را از render function خارج می‌کند و همان vnodeها را در هر رندر مجددا استفاده می‌کند. رندرر همچنین قادر است کاملاً از انجام مقایسه (diffing) خودداری کند زمانی که متوجه می‌شود vnode قدیمی و vnode جدید یکسان هستند.

علاوه بر این، هنگامی که تعداد کافی از عناصر استاتیک پشت سر هم وجود دارد، آن‌ها در یک "static vnode" خلاصه می‌شوند که حاوی رشته HTML ساده برای تمام این نودها است ([مثال](https://template-explorer.vuejs.org/#eyJzcmMiOiI8ZGl2PlxuICA8ZGl2IGNsYXNzPVwiZm9vXCI+Zm9vPC9kaXY+XG4gIDxkaXYgY2xhc3M9XCJmb29cIj5mb288L2Rpdj5cbiAgPGRpdiBjbGFzcz1cImZvb1wiPmZvbzwvZGl2PlxuICA8ZGl2IGNsYXNzPVwiZm9vXCI+Zm9vPC9kaXY+XG4gIDxkaXYgY2xhc3M9XCJmb29cIj5mb288L2Rpdj5cbiAgPGRpdj57eyBkeW5hbWljIH19PC9kaXY+XG48L2Rpdj4iLCJzc3IiOmZhbHNlLCJvcHRpb25zIjp7ImhvaXN0U3RhdGljIjp0cnVlfX0=)). این vnodeهای استاتیک با مستقیماً تنظیم کردن `innerHTML` در برنامه mount می‌شوند. همچنین نودهای DOM متناظر خود را در mount اولیه ذخیره می‌کنند - اگر همان قطعه محتوا در جای دیگر برنامه استفاده شود، نودهای DOM جدید با استفاده از `cloneNode()‎` بومی که بسیار کارآمد است، ایجاد می‌شوند.

### Patch Flags {#patch-flags}

 می‌توانیم در زمان کامپایل اطلاعات زیادی از یک element با bindingهای پویا استنباط کنیم:

```vue-html
<!-- class binding only -->
<div :class="{ active }"></div>

<!-- id and value bindings only -->
<input :id="id" :value="value">

<!-- text children only -->
<div>{{ dynamic }}</div>
```

[در Template Explorer بررسی کنید](https://template-explorer.vuejs.org/#eyJzcmMiOiI8ZGl2IDpjbGFzcz1cInsgYWN0aXZlIH1cIj48L2Rpdj5cblxuPGlucHV0IDppZD1cImlkXCIgOnZhbHVlPVwidmFsdWVcIj5cblxuPGRpdj57eyBkeW5hbWljIH19PC9kaXY+Iiwib3B0aW9ucyI6e319)

هنگام تولید کد render function برای این عناصر، Vue نوع به‌روزرسانی مورد نیاز هر کدام را مستقیماً در تابع ایجاد vnode کدگذاری می‌کند:

```js{3}
createElementVNode("div", {
  class: _normalizeClass({ active: _ctx.active })
}, null, 2 /* CLASS */)
```

آخرین آرگومان، `2`، یک [patch flag](https://github.com/vuejs/core/blob/main/packages/shared/src/patchFlags.ts) است. یک عنصر می‌تواند چندین patch flag داشته باشد که در یک عدد مجزا ترکیب می‌شوند. سپس رندرر رانتایم می‌تواند با استفاده از [عملیات bitwise](https://en.wikipedia.org/wiki/Bitwise_operation) بر روی این flagها بررسی کند که آیا نیاز به انجام کار خاصی دارد یا خیر:

```js
if (vnode.patchFlag & PatchFlags.CLASS /* 2 */) {
  // update the element's class
}
```

بررسی‌های bitwise بسیار سریع هستند. با patch flagها، Vue قادر است کمترین مقدار کار لازم را هنگام به‌روزرسانی عناصر با dynamic binding ها انجام دهد.

Vue همچنین نوع children یک vnode را کدگذاری می‌کند. به عنوان مثال، تمپلیتی که چندین نود ریشه دارد به عنوان یک فرگمنت نمایش داده می‌شود. در اکثر موارد، مطمئن هستیم که ترتیب این نودهای ریشه هرگز تغییر نمی‌کند، بنابراین این اطلاعات نیز می‌تواند به عنوان یک patch flag به رانتایم ارائه شود:

```js{4}
export function render() {
  return (_openBlock(), _createElementBlock(_Fragment, null, [
    /* children */
  ], 64 /* STABLE_FRAGMENT */))
}
```

بنابراین رانتایم می‌تواند کاملاً از تطابق ترتیب فرزندان برای فرگمنت ریشه صرف‌نظر کند.

### Tree Flattening {#tree-flattening}

دوباره به کد تولید شده از مثال قبلی نگاهی بیندازید، متوجه می‌شوید که ریشه درخت virtual DOM برگردانده شده با یک تابع ویژه `createElementBlock()‎` ایجاد شده است:

```js{2}
export function render() {
  return (_openBlock(), _createElementBlock(_Fragment, null, [
    /* children */
  ], 64 /* STABLE_FRAGMENT */))
}
```

مفهوماً، یک "block" قسمتی از تمپلیت است که ساختار داخلی ثابتی دارد. در این مورد، کل تمپلیت یک block دارد زیرا حاوی هیچ دستورالعمل ساختاری مانند `v-if` و `v-for` نیست.

هر بلوکی هرگونه نودهای فرزند (نه فقط فرزندان مستقیم) که patch flags دارند را رهگیری می‌کند. به عنوان مثال:

```vue-html{3,5}
<div> <!-- root block -->
  <div>...</div>         <!-- not tracked -->
  <div :id="id"></div>   <!-- tracked -->
  <div>                  <!-- not tracked -->
    <div>{{ bar }}</div> <!-- tracked -->
  </div>
</div>
```

نتیجه یک آرایه تخت‌شده‌است (flattened array) که فقط حاوی نودهای فرزند پویا است:

```
div (block root)
- div with :id binding
- div with {{ bar }} binding
```

هنگامی که این کامپوننت نیاز به بازرندر دارد، فقط نیاز به پیمایش درخت جدید به جای درخت کامل دارد. این را **Tree Flattening** می‌نامند و تعداد نودهایی که نیاز به پیمایش در طول تطابق virtual DOM دارند را به طور قابل توجهی کاهش می‌دهد. قسمت‌های استاتیک تمپلیت به طور مؤثری رد می‌شود.

دستورالعمل‌های `v-if` و `v-for` نودهای block جدید ایجاد خواهند کرد:

```vue-html
<div> <!-- root block -->
  <div>
    <div v-if> <!-- if block -->
      ...
    <div>
  </div>
</div>
```

هر block والد یک آرایه‌ای از فرزندان پویایش را نگه می‌دارد. بنابراین وقتی block والد نیاز به بازرندر دارد، فقط نیاز به بررسی آرایه فرزندان پویای خودش دارد تا بفهمد چه چیزی نیاز به به‌روزرسانی دارد.

### تأثیر بر SSR Hydration {#impact-on-ssr-hydration}

هم patch flag ها و هم tree flattening، عملکرد [SSR Hydration](/guide/scaling-up/ssr#client-hydration) Vue را نیز به طور قابل توجهی بهبود می‌بخشند:

- hydration تک عنصر می‌تواند مسیرهای سریعی بر اساس patch flag برای vnode متناظر انتخاب کند.

- فقط نودهای block و فرزندان پویای آن‌ها نیاز به پیمایش در طول hydration دارند، به طور مؤثر hydration جزئی در سطح تمپلیت را محقق می‌کند.
