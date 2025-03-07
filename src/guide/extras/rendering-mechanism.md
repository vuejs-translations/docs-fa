---
outline: deep
---

# مکانیزم رندرینگ | Rendering Mechanism {#rendering-mechanism}

Vue چگونه یک تمپلیت را گرفته و آن را به نودهای DOM واقعی تبدیل می‌کند؟ Vue چگونه این نودهای DOM را به طور کارآمد به‌روزرسانی می‌کند؟ در اینجا سعی می‌کنیم با برسی مکانیزم رندرینگ داخلی Vue، پاسخی برای این سوالات پیدا کنیم.

## DOM مجازی | Virtual DOM {#virtual-dom}

احتمالا عبارت "virtual DOM" را شنیده‌اید که سیستم رندرینگ Vue بر پایه آن است.

virtual DOM یا VDOM مفهومی برنامه‌نویسی است که در آن نمایش ایده‌آل یا "مجازی" رابط کاربری در حافظه نگهداری می‌شود و با DOM "واقعی" همگام‌سازی می‌شود. این مفهوم توسط [React](https://reactjs.org/) پایه‌گذاری شده و در بسیاری از فریم‌ورک‌های دیگر از جمله Vue، با پیاده‌سازی متفاوت، بکار گرفته شده است.

virtual DOM بیشتر از آنکه یک پَتِرن باشد، یک فناوری خاص محسوب می شود، بنابراین پیاده‌سازی رسمی و یکتایی برای آن وجود ندارد. می‌توانیم این ایده را با یک مثال ساده توضیح دهیم:

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

در اینجا، `vnode` یک آبجکت ساده جاوااسکریپت (یک "virtual node") بوده که نمایانگر یک عنصر `<div>` است. این vnode شامل تمام اطلاعاتی است که برای ایجاد عنصر واقعی نیاز داریم. این آبجکت حاوی vnode های بیشتری به عنوان فرزند است، به همین خاطر به عنوان ریشه درخت DOM مجازی این vnode ها، در نظر گرفته می شود.

یک runtime renderer (رندرر رانتایم) می‌تواند یک درخت virtual DOM را پیمایش کرده و یک درخت DOM واقعی از آن بسازد. به این فرایند **mount** گفته می‌شود.

اگر دو نسخه مختلف از درخت virtual DOM داشته باشیم، رندرر می‌تواند دو درخت را پیمایش و مقایسه کند تا تفاوت‌ها را مشخص و بر روی DOM واقعی اعمال کند. به این فرایند **patch** گفته می‌شود که همچنین با "diffing" یا "reconciliation" نیز شناخته می‌شود.

دستاورد اصلی virtual DOM این است که به توسعه‌دهنده این امکان را می‌دهد تا به صورت اختیاری و از طریق کدهایی که به راحتی قابل فهم و تعمیم‌پذیر هستند، ساختارهای UI مورد نیاز خود را تعریف کند، در حالی که تغییر مستقیم بر روی DOM و تعامل با آن به عهده رندرر (Renderer) باشد.

## رَوند رندرینگ | Render Pipeline {#render-pipeline}

بطور کلی، اتفاقات زیر هنگام mount یک کامپوننت Vue رخ می‌دهد:

1. **Compile**: تمپلیت‌های Vue به **render functions** کامپایل می‌شوند: یعنی توابعی که درختان virtual DOM را برمی‌گردانند. این مرحله می‌تواند یا از پیش در build step انجام شود یا توسط کامپایلرِ رانتایم به صورت لحظه ای (on-the-fly) در مرورگر انجام شود.

2. **Mount**: رندرر رانتایم render function ها را فراخوانی کرده، خروجی آنها، یعنی درختان virtual DOM را پیمایش کرده و بر اساس آن نودهای DOM واقعی ایجاد می‌کند. این مرحله به عنوان [reactive effect](./reactivity-in-depth) انجام می‌شود، بنابراین تمام وابستگی‌های reactive که در طول mount استفاده شده‌اند، پیگیری می‌کند.

3. **Patch**: هنگامی که یک وابستگی مورد استفاده در طول mount تغییر کند، effect مجددا اجرا می‌شود. این بار، یک درخت virtual DOM جدید و به‌روزرسانی شده ایجاد می‌شود. رندرر رانتایم درخت جدید را پیمایش کرده، آن را با درخت قدیمی مقایسه می‌کند و به‌روزرسانی‌های لازم را بر روی DOM واقعی اعمال می‌کند.

![render pipeline](./images/render-pipeline.png)

<!-- https://www.figma.com/file/elViLsnxGJ9lsQVsuhwqxM/Rendering-Mechanism -->

## Templates در مقابل Render Functions {#templates-vs-render-functions}

تمپلیت‌های Vue به render function های درخت virtual DOM کامپایل می‌شوند. Vue همچنین API هایی را فراهم می‌کند که به ما اجازه می‌دهد مرحله کامپایل تمپلیت را رد کنیم و مستقیماً render function ها را بنویسیم. render function ها نسبت به تمپلیت‌ها در نوشتن منطق، بسیار پویا و انعطاف‌پذیرتر هستند، چراکه می‌توانید به کمک تمام قابلیت های زبان جاوااسکریپت با vnode ها کار کنید.

پس چرا Vue به طور پیش‌فرض تمپلیت‌ها را توصیه می‌کند؟ چند دلیل وجود دارد:

1. تمپلیت‌ها نزدیک‌تر به HTML واقعی هستند. این موضوع باعث می‌شود استفاده مجدد از اسنیپت‌های HTML، اعمال روش‌های خوب دسترسی‌پذیری، استایل دادن با CSS و همچنین درک کد و یا اصلاح آن توسط طراحانی که الزاما دانش برنامه نویسی ندارند، بسیار آسان‌تر شود.

2. تحلیل کد تمپلیت، به دلیل سینتکس خاص‌شان، برای کامپایلر ساده تر است. این موضوع به کامپایلر اجازه می دهد که بسیاری از بهینه‌سازی‌های زمان کامپایل را برای بهبود عملکرد virtual DOM (که در ادامه بحث خواهیم کرد) اعمال کند.

در عمل و در بیشتر موارد، استفاده از تمپلیت کافی خواهد بود. render function معمولاً فقط در کامپوننت‌ های با قابل استفاده مجدد که نیاز به مدیریت منطق رندرینگ بسیار پویا دارند، استفاده می‌شوند. استفاده از render function ها در [Render Functions & JSX](./render-function) با جزئیات بیشتر مورد بحث قرار گرفته است.

## Virtual DOM آگاه از کامپایلر | Compiler-Informed Virtual DOM {#compiler-informed-virtual-dom}

پیاده سازی virtual DOM در React و بیشتر فریم‌ورک های دیگر، صرفا محدود به رانتایم است: الگوریتم reconciliation (تطابق) نمی‌تواند هیچ فرضی در مورد درخت virtual DOM ورودی داشته باشد، بنابراین برای تضمین صحت، باید به طور کامل درخت را پیمایش کند و diffing را برای props هر vnode انجام دهد. علاوه بر این، حتی اگر قسمتی از درخت هرگز تغییر نکند، مجدداً vnode های جدیدی برای آن‌ها در هر بازرندر ایجاد می‌شود که منجر به فشار غیرضروری به حافظه می گردد. این موضوع یکی جدی ترین انتقاد های وارد شده به virtual DOM است: فرایند reconciliation به نوعی "نا به خردانه" است، چرا که بدون در نظر گرفتن بهینه‌سازی‌ها، کل درخت virtual DOM را بررسی و مقایسه می‌کند. این کار باعث افت کارایی می‌شود، اما در عوض این اطمینان را می‌دهد که رندرینگ به درستی انجام شود. بنابراین می‌توان گفت این روش، کارایی را برای declarative (تعریفی‌) بودن و صحت قربانی می‌کند.

اما لزومی برای وجود تقابل بین declrative بودن و کارایی نیست. در Vue، فریم‌ورک هم کامپایلر و هم رانتایم را کنترل می‌کند. این به ما اجازه می‌دهد تا بسیاری از بهینه‌سازی‌ها را در زمان کامپایل پیاده‌سازی کنیم که فقط یک رندرر مجهز و ادغام شده می‌تواند از آن‌ها بهره ببرد. کامپایلر می‌تواند تمپلیت را به صورت استاتیک تجزیه و تحلیل کرده و راهنمایی‌هایی در کد تولید شده قرار دهد تا رانتایم بتواند هر جا که ممکن است از این راهنمایی ها به عنوان میان‌بر استفاده کند. در عین حال، همچنان قابلیت رفتن به لایه render function با هدف کنترل مستقیم‌تر در موارد خاص، برای کاربر حفظ می‌شود. به این رویکرد ترکیبی **Compiler-Informed Virtual DOM (Virtual DOM آگاه از کامپایلر)** می‌گوییم.

در ادامه، چندین نمونه از بهینه‌سازی‌های کامپایلر تمپلیت Vue را (که با هدف بهبود عملکرد رانتایم virtual DOM انجام می‌دهد) بررسی خواهیم کرد.

### Cache Static {#cache-static}

اغلب اوقات قسمت‌هایی در تمپلیت وجود دارد که هیچ binding پویایی ندارند:

```vue-html{2-3}
<div>
  <div>foo</div> <!-- cached -->
  <div>bar</div> <!-- cached -->
  <div>{{ dynamic }}</div>
</div>
```

[در Template Explorer بررسی کنید](https://template-explorer.vuejs.org/#eyJzcmMiOiI8ZGl2PlxuICA8ZGl2PmZvbzwvZGl2PiA8IS0tIGNhY2hlZCAtLT5cbiAgPGRpdj5iYXI8L2Rpdj4gPCEtLSBjYWNoZWQgLS0+XG4gIDxkaXY+e3sgZHluYW1pYyB9fTwvZGl2PlxuPC9kaXY+XG4iLCJvcHRpb25zIjp7ImhvaXN0U3RhdGljIjp0cnVlfX0=)

دو تگ `div` با متن `foo` و `bar` استاتیک هستند - بنابراین ایجاد vnodeها و مقایسه آن‌ها در هر بار رندر غیرضروری است. کامپایلر Vue به‌صورت خودکار فراخوانی ایجاد این vnodeها را از تابع رندر خارج کرده و در هر رندر مجدداً از همان vnodeها استفاده می‌کند. علاوه بر این، رندرر زمانی که متوجه شود vnode قدیمی و جدید یکسان هستند، فرایند مقایسه (diffing) را به‌طور کامل نادیده می‌گیرد.

علاوه بر این، هنگامی که تعداد کافی از عناصر استاتیک پشت سر هم قرار بگیرند، به عنوان یک "static vnode" در نظر گرفته می‌شوند و این vnode استاتیک حاوی رشته HTML ساده برای تمام این نودها خواهد بود ([مثال](https://template-explorer.vuejs.org/#eyJzcmMiOiI8ZGl2PlxuICA8ZGl2IGNsYXNzPVwiZm9vXCI+Zm9vPC9kaXY+XG4gIDxkaXYgY2xhc3M9XCJmb29cIj5mb288L2Rpdj5cbiAgPGRpdiBjbGFzcz1cImZvb1wiPmZvbzwvZGl2PlxuICA8ZGl2IGNsYXNzPVwiZm9vXCI+Zm9vPC9kaXY+XG4gIDxkaXYgY2xhc3M9XCJmb29cIj5mb288L2Rpdj5cbiAgPGRpdj57eyBkeW5hbWljIH19PC9kaXY+XG48L2Rpdj4iLCJzc3IiOmZhbHNlLCJvcHRpb25zIjp7ImhvaXN0U3RhdGljIjp0cnVlfX0=)). این vnode های استاتیک با تنظیم مستقیم `innerHTML` در برنامه mount می‌شوند.

### Patch Flags {#patch-flags}

 می‌توانیم در زمان کامپایل، برای یک المان با Binding های پویا، اطلاعات زیادی استنباط کنیم:

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

آخرین آرگومان، `2`، یک [patch flag](https://github.com/vuejs/core/blob/main/packages/shared/src/patchFlags.ts) است. یک عنصر می‌تواند چندین patch flag داشته باشد که در قالب یک عدد ترکیب می‌شوند. سپس رندرر رانتایم می‌تواند با استفاده از [عملیات bitwise](https://en.wikipedia.org/wiki/Bitwise_operation) بر روی این flagها بررسی کند که آیا نیاز به انجام کار خاصی دارد یا خیر:

```js
if (vnode.patchFlag & PatchFlags.CLASS /* 2 */) {
  // update the element's class
}
```

بررسی‌های bitwise بسیار سریع هستند. با patch flagها، Vue قادر است کمینه کار لازم را هنگام به‌روزرسانی عناصر با dynamic binding ها انجام دهد.

Vue همچنین نوع children یک vnode را کدگذاری می‌کند. به عنوان مثال، تمپلیتی که چندین نود ریشه دارد به عنوان یک فرگمنت (Fragment) در نظر گرفته می‌شود. در اکثر موارد، مطمئن هستیم که ترتیب این نودهای ریشه هرگز تغییر نمی‌کند، بنابراین این اطلاعات نیز می‌تواند به عنوان یک patch flag به رانتایم ارائه شود:

```js{4}
export function render() {
  return (_openBlock(), _createElementBlock(_Fragment, null, [
    /* children */
  ], 64 /* STABLE_FRAGMENT */))
}
```

بنابراین رانتایم می‌تواند کاملاً از تطابق ترتیب فرزندان برای فرگمنت ریشه، صرف‌نظر کند.

### Tree Flattening {#tree-flattening}

دوباره به کد تولید شده از مثال قبلی نگاهی بیندازید، متوجه می‌شوید که ریشه درخت virtual DOM برگردانده شده با یک تابع ویژه `createElementBlock()‎` ایجاد شده است:

```js{2}
export function render() {
  return (_openBlock(), _createElementBlock(_Fragment, null, [
    /* children */
  ], 64 /* STABLE_FRAGMENT */))
}
```

مفهوماً، یک "block" قسمتی از تمپلیت است که ساختار داخلی پایداری دارد. در این مورد، کل تمپلیت یک block دارد چراکه حاوی هیچ دستورالعمل ساختاری، مانند `v-if` و `v-for` نیست.

هر بلوک، تمامی نودهای فرزند خود (و نه فقط فرزندان لایه اول) را که patch flags دارند، رهگیری می‌کند. به عنوان مثال:

```vue-html{3,5}
<div> <!-- root block -->
  <div>...</div>         <!-- not tracked -->
  <div :id="id"></div>   <!-- tracked -->
  <div>                  <!-- not tracked -->
    <div>{{ bar }}</div> <!-- tracked -->
  </div>
</div>
```

نتیجه یک آرایه تخت‌شده‌ (flattened array) است  که فقط حاوی نودهای فرزند پویا است:

```
div (block root)
- div with :id binding
- div with {{ bar }} binding
```

هنگامی که این کامپوننت نیاز به بازرندر دارد، فقط نیاز به پیمایش درخت تخت شده به جای درخت کامل است. این مفهوم را **Tree Flattening** می‌نامند، این فرآیند تعداد نودهایی که نیاز به پیمایش در طول تطابق virtual DOM دارند، به طور قابل توجهی کاهش می‌دهد. در نتیجه این فرآنید، قسمت‌های استاتیک تمپلیت به طور مؤثری رد می‌شود.

دستورالعمل‌های `v-if` و `v-for` نودهای block جدید ایجاد خواهند کرد:

```vue-html
<div> <!-- root block -->
  <div>
    <div v-if> <!-- if block -->
      ...
    </div>
  </div>
</div>
```

هر block والد آرایه‌ای از فرزندان پویا خود را نگه می‌دارد. بنابراین وقتی block والد نیاز به بازرندر دارد، فقط نیاز به بررسی آرایه فرزندان پویای خودش را داشته تا بفهمد چه چیزی نیاز به به‌روزرسانی دارد.

### تأثیر بر SSR Hydration {#impact-on-ssr-hydration}

هم patch flag ها و هم tree flattening، عملکرد [SSR Hydration](/guide/scaling-up/ssr#client-hydration) Vue را نیز به طور قابل توجهی بهبود می‌بخشند:

- در فرآیند hydration یک عنصر، می‌توان مسیرهای سریعی بر اساس patch flag های vnode متناظر آن عنصر، انتخاب کرد.

- در طول hydration، تنها نیار به پیمایش نودهای block و فرزندان پویای آن‌ها است، که این موضوع به طور مؤثر hydration جزئی (Partial Hydration) را در سطح تمپلیت، محقق می‌کند.
