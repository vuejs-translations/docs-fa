# اسلات ها {#slots}

> این صفحه فرض می کند که شما از قبل [اصول اولیه کامپوننت ها](/guide/essentials/component-basics) را خوانده اید. اگر در مبحث کامپوننت ها تازه وارد هستید اول آن را مطالعه کنید .

<VueSchoolLink href="https://vueschool.io/lessons/vue-3-component-slots" title="Free Vue.js Slots Lesson"/>

## محتوا و خروجی اسلات {#slot-content-and-outlet}

آموختیم که کامپوننت ها می توانند پراپ ها که مقادیر جاوااسکریپتی از هر نوعی باشند را دریافت کنند. اما محتوای تمپلیت چطور؟ در بعضی موارد نیاز داریم بخشی از تمپلیت را به کامپوننت فرزند منتقل کنیم، و اجازه دهیم که کامپوننت فرزند آن بخش را درون تمپلیت خودش رِندر کند.

برای مثال، ما یک کامپوننت `<FancyButton>` داریم که کاربرد زیر را پشتیبانی می کند:
```vue-html{2}
<FancyButton>
  Click me! <!-- محتوای اسلات -->
</FancyButton>
```

تمپلیتِ `<FancyButton>` اینگونه خواهد بود:

```vue-html{2}
<button class="fancy-btn">
  <slot></slot> <!-- خروجی اسلات -->
</button>
```

المنت `<slot>` یک **خروجی اسلات** است که نشان می دهد کجا باید **محتوای اسلات** فراهم شده توسط والد رِندر شود.

![slot diagram](./images/slots.png)

<!-- https://www.figma.com/file/LjKTYVL97Ck6TEmBbstavX/slot -->

و نتیجه نهایی DOM رِندر شده:

```html
<button class="fancy-btn">Click me!</button>
```

<div class="composition-api">

[آن را در Playground امتحان کنید](https://play.vuejs.org/#eNpdUdlqAyEU/ZVbQ0kLMdNsXabTQFvoV8yLcRkkjopLSQj596oTwqRvnuM9y9UT+rR2/hs5qlHjqZM2gOch2m2rZW+NC/BDND1+xRCMBuFMD9N5NeKyeNrqphrUSZdA4L1VJPCEAJrRdCEAvpWke+g5NHcYg1cmADU6cB0A4zzThmYckqimupqiGfpXILe/zdwNhaki3n+0SOR5vAu6ReU++efUajtqYGJQ/FIg5w8Wt9FlOx+OKh/nV1c4ZVNqlHE1TIQQ7xnvCN13zkTNalBSc+Jw5wiTac2H1WLDeDeDyXrJVm9LWG7uE3hev3AhHge1cYwnO200L4QljEnd1bCxB1g82UNhe+I6qQs5kuGcE30NrxeaRudzOWtkemeXuHP5tLIKOv8BN+mw3w==)

</div>
<div class="options-api">

[آن را در Playground امتحان کنید](https://play.vuejs.org/#eNpdUdtOwzAM/RUThAbSurIbl1ImARJf0ZesSapoqROlKdo07d9x0jF1SHmIT+xzcY7sw7nZTy9Zwcqu9tqFTYW6ddYH+OZYHz77ECyC8raFySwfYXFsUiFAhXKfBoRUvDcBjhGtLbGgxNAVcLziOlVIp8wvelQE2TrDg6QKoBx1JwDgy+h6B62E8ibLoDM2kAAGoocsiz1VKMfmCCrzCymbsn/GY95rze1grja8694rpmJ/tg1YsfRO/FE134wc2D4YeTYQ9QeKa+mUrgsHE6+zC+vfjoz1Bdwqpd5iveX1rvG2R1GA0Si5zxrPhaaY98v5WshmCrerhVi+LmCxvqPiafUslXoYpq0XkuiQ1p4Ax4XQ2BSwdnuYP7p9QlvuG40JHI1lUaenv3o5w3Xvu2jOWU179oQNn5aisNMvLBvDOg==)

</div>

با استفاده از اسلات ها، کامپوننت `<FancyButton>` مسئول رِندر کردن `<button>` خروجی (و استایل های تجملی آن) است، درحالیکه محتوای درونی توسط کامپوننت والد فراهم می شود.

روش دیگر برای درک اسلات ها مقایسه آنها با توابع جاوااسکریپتی هست:

```js
// کامپوننت والد محتوای اسلات را ارسال می کند
FancyButton('Click me!')

// FancyButton محتوای اسلات را درون تمپلیت خودش رِندر می کند
function FancyButton(slotContent) {
  return `<button class="fancy-btn">
      ${slotContent}
    </button>`
}
```

محتوای اسلات فقط به نوشته محدود نمی شود. می تواند هر محتوای معتبر تمپلیت باشد. برای مثال، میتوانیم چندین المنت یا حتی کامپوننت های دیگر را ارسال کنیم:

```vue-html
<FancyButton>
  <span style="color:red">Click me!</span>
  <AwesomeIcon name="plus" />
</FancyButton>
```

<div class="composition-api">

[آن را در Playground امتحان کنید](https://play.vuejs.org/#eNp1UmtOwkAQvspQYtCEgrx81EqCJibeoX+W7bRZaHc3+1AI4QyewH8ewvN4Aa/gbgtNIfFf5+vMfI/ZXbCQcvBmMYiCWFPFpAGNxsp5wlkphTLwQjjdPlljBIdMiRJ6g2EL88O9pnnxjlqU+EpbzS3s0BwPaypH4gqDpSyIQVcBxK3VFQDwXDC6hhJdlZi4zf3fRKwl4aDNtsDHJKCiECqiW8KTYH5c1gEnwnUdJ9rCh/XeM6Z42AgN+sFZAj6+Ux/LOjFaEK2diMz3h0vjNfj/zokuhPFU3lTdfcpShVOZcJ+DZgHs/HxtCrpZlj34eknoOlfC8jSCgnEkKswVSRlyczkZzVLM+9CdjtPJ/RjGswtX3ExvMcuu6mmhUnTruOBYAZKkKeN5BDO5gdG13FRoSVTOeAW2xkLPY3UEdweYWqW9OCkYN6gctq9uXllx2Z09CJ9dJwzBascI7nBYihWDldUGMqEgdTVIq6TQqCEMfUpNSD+fX7/fH+3b7P8AdGP6wA==)

</div>
<div class="options-api">

[آن را در Playground امتحان کنید](https://play.vuejs.org/#eNptUltu2zAQvMpGQZEWsOzGiftQ1QBpgQK9g35oaikwkUiCj9aGkTPkBPnLIXKeXCBXyJKKBdoIoA/tYGd3doa74tqY+b+ARVXUjltp/FWj5GC09fCHKb79FbzXCoTVA5zNFxkWaWdT8/V/dHrAvzxrzrC3ZoBG4SYRWhQs9B52EeWapihU3lWwyxfPDgbfNYq+ejEppcLjYHrmkSqAOqMmAOB3L/ktDEhV4+v8gMR/l1M7wxQ4v+3xZ1Nw3Wtb8S1TTXG1H3cCJIO69oxc5mLUcrSrXkxSi1lxZGT0//CS9Wg875lzJELE/nLto4bko69dr31cFc8auw+3JHvSEfQ7nwbsHY9HwakQ4kes14zfdlYH1VbQS4XMlp1lraRMPl6cr1rsZnB6uWwvvi9hufpAxZfLryjEp5GtbYs0TlGICTCsbaXqKliZDZx/NpuEDsx2UiUwo5VxT6Dkv73BPFgXxRktlUdL2Jh6OoW8O3pX0buTsoTgaCNQcDjoGwk3wXkQ2tJLGzSYYI126KAso0uTSc8Pjy9P93k2d6+NyRKa)

</div>

بوسیله اسلات ها، کامپوننت `<FancyButton>` ما منعطف تر و بیشتر قابل استفاده دوباره است. ما حالا می توانیم در جاهای مختلف با محتوای درونی متفاوت از آن استفاده کنیم، اما با همان استایل تجملی.

سازوکار اسلات کامپوننت های Vue از [المنت `<slot>` کامپوننت وب بومی](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/slot) الهام گرفته شده است, اما با امکانات اضافی که بعدا خواهیم دید.

## محدوده رِندر {#render-scope}

محتوای اسلات به محدوده داده کامپوننت والد دسترسی دارد، زیرا درون والد تعریف شده است. برای مثال:

```vue-html
<span>{{ message }}</span>
<FancyButton>{{ message }}</FancyButton>
```

در اینجا هردو الحاق <span v-pre>`{{ message }}`</span> محتوای یکسانی را رِندر خواهند کرد.

محتوای اسلات به داده کامپوننت فرزند دسترسی **ندارد**. عبارات تمپلیت های Vue فقط به محدوده ای که درون آن تعریف شده اند، سازگار با محدوده واژگانی جاوااسکریپت دسترسی دارند. به عبارت دیگر:

> عارات در تمپلیت والد فقط به محدوده والد دسترسی دارند; عبارات در تمپلیت فرزند فقط به محدوده فرزند دسترسی دارند.

## محتوای بازگشتی {#fallback-content}

مواردی وجود دارد که مفید است برای اسلات در هنگامی که محتوایی برای ارائه ندارد محتوای بازگشتی (مقدار پیش فرض) تعیین کنیم. برای مثال، در یک کامپوننت `<SubmitButton>`:

```vue-html
<button type="submit">
  <slot></slot>
</button>
```

اگر والد هیچگونه محتوایی فراهم نکرده باشد ممکنه بخواهیم نوشته "Submit" را درون `<button>` رِندر کنیم. برای اینکه "Submit" را محتوای بازگشتی کنیم، می توانیم آن را بین تگ های `<slot>` قرار دهیم:

```vue-html{3}
<button type="submit">
  <slot>
    Submit <!-- محتوای بازگشتی -->
  </slot>
</button>
```

اکنون که کامپوننت `<SubmitButton>` را در یک کامپوننت والد استفاده می کنیم، بدون هیچگونه محتوای فراهم شده ای برای اسلات

```vue-html
<SubmitButton />
```

کامپوننت `<SubmitButton>` محتوای بازگشتی "Submit" را رِندر خواهد کرد:

```html
<button type="submit">Submit</button>
```

ولی اگر محتوا را فراهم کنیم:

```vue-html
<SubmitButton>Save</SubmitButton>
```

در نتیجه محتوای ارائه شده به جای آن رِندر خواهد شد:

```html
<button type="submit">Save</button>
```

<div class="composition-api">

[آن را در Playground امتحان کنید](https://play.vuejs.org/#eNp1kMsKwjAQRX9lzMaNbfcSC/oL3WbT1ikU8yKZFEX8d5MGgi2YVeZxZ86dN7taWy8B2ZlxP7rZEnikYFuhZ2WNI+jCoGa6BSKjYXJGwbFufpNJfhSaN1kflTEgVFb2hDEC4IeqguARpl7KoR8fQPgkqKpc3Wxo1lxRWWeW+Y4wBk9x9V9d2/UL8g1XbOJN4WAntodOnrecQ2agl8WLYH7tFyw5olj10iR3EJ+gPCxDFluj0YS6EAqKR8mi9M3Td1ifLxWShcU=)

</div>
<div class="options-api">

[آن را در Playground امتحان کنید](https://play.vuejs.org/#eNp1UEEOwiAQ/MrKxYu1d4Mm+gWvXChuk0YKpCyNxvh3lxIb28SEA8zuDDPzEucQ9mNCcRAymqELdFKu64MfCK6p6Tu6JCLvoB18D9t9/Qtm4lY5AOXwMVFu2OpkCV4ZNZ51HDqKhwLAQjIjb+X4yHr+mh+EfbCakF8AclNVkCJCq61ttLkD4YOgqsp0YbGesJkVBj92NwSTIrH3v7zTVY8oF8F4SdazD7ET69S5rqXPpnigZ8CjEnHaVyInIp5G63O6XIGiIlZMzrGMd8RVfR0q4lIKKV+L+srW+wNTTZq3)

</div>

## اسلات های نام گذاری شده {#named-slots}

مواقعی پیش می آید که نیاز داریم چندین خروجی اسلات در یک کامپوننت داشته باشیم. برای مثال، در یک کامپوننت `<BaseLayout>` با تمپلیت زیر:

```vue-html
<div class="container">
  <header>
    <!-- ما محتوای header را در اینجا می خواهیم -->
  </header>
  <main>
    <!-- ما محتوای main را در اینجا می خواهیم -->
  </main>
  <footer>
    <!-- ما محتوای footer را در اینجا می خواهیم -->
  </footer>
</div>
```

برای چنین مواردی، المنت `<slot>` ویژگی به خصوصی به نام `name` دارد، که یک ID منحصر بفرد برای اسلات های مختلف تعیین می کند تا شما بتوانید مشخص کنید محتوا کجا باید رِندر شود:


```vue-html
<div class="container">
  <header>
    <slot name="header"></slot>
  </header>
  <main>
    <slot></slot>
  </main>
  <footer>
    <slot name="footer"></slot>
  </footer>
</div>
```

یک خروجی `<slot>` بدون `name` به طور ضمنی نام "default" را دارد.

در یک کامپوننت والد که از `<BaseLayout>` استفاده می کند، به راهی نیاز داریم که بخش های متعدد محتوای اسلات را که هرکدام خروجی اسلات متفاوتی دارند، گذر دهیم. در اینجا **اسلات های نام گذاری شده** وارد می شوند.

برای ارسال اسلات نام گذاری شده، نیاز داریم المنت `<template>` را همراه با دایرکتیو `v-slot` به کار ببریم، و در نهایت نام اسلات را به عنوان آرگومان به `v-slot` ارسال کنیم:

```vue-html
<BaseLayout>
  <template v-slot:header>
    <!-- محتوا برای اسلات header -->
  </template>
</BaseLayout>
```

`v-slot` مخفف اختصاصی `#` را دارد، پس `<template v-slot:header>` می تواند به `<template #header>` خلاصه شود. به آن به عنوان "رِندر کردن این بخش از تمپلیت در اسلات header کامپوننت فرزند" فکر کنید.

![نمودار اسلات های نام گذاری شده](./images/named-slots.png)

<!-- https://www.figma.com/file/2BhP8gVZevttBu9oUmUUyz/named-slot -->

در اینجا محتوای ارسال شده برای هر سه اسلات کامپوننت `<BaseLayout>` با استفاده از نوشتار خلاصه شده را داریم:

```vue-html
<BaseLayout>
  <template #header>
    <h1>Here might be a page title</h1>
  </template>

  <template #default>
    <p>A paragraph for the main content.</p>
    <p>And another one.</p>
  </template>

  <template #footer>
    <p>Here's some contact info</p>
  </template>
</BaseLayout>
```

هنگامی که یک کامپوننت هر دو، اسلات پیش فرض و اسلات نام گذاری شده را دریافت می کند، همه نودهای سطح بالا که در تگ `<template>` حضور ندارند به طور ضمنی با آنها به عنوان محتوای اسلات پیش فرض رفتار می شود. بنابراین کد بالا همچنین می تواند به صورت زیر نوشته شود:

```vue-html
<BaseLayout>
  <template #header>
    <h1>Here might be a page title</h1>
  </template>

  <!-- اسلات پیش فرض ضمنی -->
  <p>A paragraph for the main content.</p>
  <p>And another one.</p>

  <template #footer>
    <p>Here's some contact info</p>
  </template>
</BaseLayout>
```

حالا هر چیزی درون المنت های `<template>` به اسلات های مربوطه ارسال خواهد شد. HTML رِندر شده نهایی به صورت زیر خواهد بود:

```html
<div class="container">
  <header>
    <h1>Here might be a page title</h1>
  </header>
  <main>
    <p>A paragraph for the main content.</p>
    <p>And another one.</p>
  </main>
  <footer>
    <p>Here's some contact info</p>
  </footer>
</div>
```

<div class="composition-api">

[آن را در Playground امتحان کنید](https://play.vuejs.org/#eNp9UsFuwjAM/RWrHLgMOi5o6jIkdtphn9BLSF0aKU2ixEVjiH+fm8JoQdvRfu/5xS8+ZVvvl4cOsyITUQXtCSJS5zel1a13geBdRvyUR9cR1MG1MF/mt1YvnZdW5IOWVVwQtt5IQq4AxI2cau5ccZg1KCsMlz4jzWrzgQGh1fuGYIcgwcs9AmkyKHKGLyPykcfD1Apr2ZmrHUN+s+U5Qe6D9A3ULgA1bCK1BeUsoaWlyPuVb3xbgbSOaQGcxRH8v3XtHI0X8mmfeYToWkxmUhFoW7s/JvblJLERmj1l0+T7T5tqK30AZWSMb2WW3LTFUGZXp/u8o3EEVrbI9AFjLn8mt38fN9GIPrSp/p4/Yoj7OMZ+A/boN9KInPeZZpAOLNLRDAsPZDgN4p0L/NQFOV/Ayn9x6EZXMFNKvQ4E5YwLBczW6/WlU3NIi6i/sYDn5Qu2qX1OF51MsvMPkrIEHg==)

</div>
<div class="options-api">

[آن را در Playground امتحان کنید](https://play.vuejs.org/#eNp9UkFuwjAQ/MoqHLiUpFxQlaZI9NRDn5CLSTbEkmNb9oKgiL934wRwQK3ky87O7njGPicba9PDHpM8KXzlpKV1qWVnjSP4FB6/xcnsCRpnOpin2R3qh+alBig1HgO9xkbsFcG5RyvDOzRq8vkAQLSury+l5lNkN1EuCDurBCFXAMWdH2pGrn2YtShqdCPOnXa5/kKH0MldS7BFEGDFDoEkKSwybo8rskjjaevo4L7Wrje8x4mdE7aFxjiglkWE1GxQE9tLi8xO+LoGoQ3THLD/qP2/dGMMxYZs8DP34E2HQUxUBFI35o+NfTlJLOomL8n04frXns7W8gCVEt5/lElQkxpdmVyVHvP2yhBo0SHThx5z+TEZvl1uMlP0oU3nH/kRo3iMI9Ybes960UyRsZ9pBuGDeTqpwfBAvn7NrXF81QUZm8PSHjl0JWuYVVX1PhAqo4zLYbZarUak4ZAWXv5gDq/pG3YBHn50EEkuv5irGBk=)

</div>

دوباره، این ممکنه به شما کمک کند که اسلات های نام گذاری شده را با استفاده از مقایسه تابع جاوااسکریپت بهتر درک کنید:

```js
// ارسال بخش های متعدد اسلات به همراه نام های مختلف
BaseLayout({
  header: `...`,
  default: `...`,
  footer: `...`
})

// <BaseLayout> آنها را در جاهای مختلف رِندر می کند
function BaseLayout(slots) {
  return `<div class="container">
      <header>${slots.header}</header>
      <main>${slots.default}</main>
      <footer>${slots.footer}</footer>
    </div>`
}
```

## نام های اسلات پویا {#dynamic-slot-names}

[آرگومان های دایرکتیو پویا](/guide/essentials/template-syntax.md#dynamic-arguments) نیز در `v-slot` کار می دهد, اجازه تعریف نام های اسلات پویا را می دهد:

```vue-html
<base-layout>
  <template v-slot:[dynamicSlotName]>
    ...
  </template>

  <!-- به اختصار -->
  <template #[dynamicSlotName]>
    ...
  </template>
</base-layout>
```

توجه داشته باشید که عبارت، منوط به [محدودیت های نوشتاری](/guide/essentials/template-syntax#directives) آرگومان های دایرکتیو پویا است.

## اسلات های محدوده {#scoped-slots}

همانطور که در [محدوده رِندر](#render-scope) بحث شد، محتوای اسلات به استیت(state) کامپوننت فرزند دسترسی ندارد.

اگرچه، مواردی وجود دارد که مفید است اگر محتوای یک اسلات بتواند از داده هر دو محدوده والد و محدوده فرزند استفاده کند. برای دستیابی به این هدف، ما به راهی نیاز داریم که داده را از فرزند به اسلات در هنگام رِندر کردن آن ارسال کنیم.

در واقع، ما میتوانیم دقیقا همچنین کاری کنیم - می توانیم ویژگی ها(attributes) را به خروجی یک اسلات همانند پراپ های یک کامپوننت ارسال کنیم:

```vue-html
<!-- تمپلیت <MyComponent> -->
<div>
  <slot :text="greetingMessage" :count="1"></slot>
</div>
```

دریافت پراپ های اسلات هنگامی که از یک اسلات پیش فرض در مقابل استفاده از اسلات های نام گذاری شده استفاده می شود کمی متفاوت است. ما در ابتدا بوسیله `v-slot` که مستقیما در تگ کامپوننت فرزند آورده شده است چگونگی دریافت پراپ ها با استفاده از اسلات را نشان می دهیم:

```vue-html
<MyComponent v-slot="slotProps">
  {{ slotProps.text }} {{ slotProps.count }}
</MyComponent>
```

![scoped slots diagram](./images/scoped-slots.svg)

<!-- https://www.figma.com/file/QRneoj8eIdL1kw3WQaaEyc/scoped-slot -->

<div class="composition-api">

[آن را در Playground امتحان کنید](https://play.vuejs.org/#eNp9kMEKgzAMhl8l9OJlU3aVOhg7C3uAXsRlTtC2tFE2pO++dA5xMnZqk+b/8/2dxMnadBxQ5EL62rWWwCMN9qh021vjCMrn2fBNoya4OdNDkmarXhQnSstsVrOOC8LedhVhrEiuHca97wwVSsTj4oz1SvAUgKJpgqWZEj4IQoCvZm0Gtgghzss1BDvIbFkqdmID+CNdbbQnaBwitbop0fuqQSgguWPXmX+JePe1HT/QMtJBHnE51MZOCcjfzPx04JxsydPzp2Szxxo7vABY1I/p)

</div>
<div class="options-api">

[آن را در Playground امتحان کنید](https://play.vuejs.org/#eNqFkNFqxCAQRX9l8CUttAl9DbZQ+rzQD/AlJLNpwKjoJGwJ/nvHpAnusrAg6FzHO567iE/nynlCUQsZWj84+lBmGJ31BKffL8sng4bg7O0IRVllWnpWKAOgDF7WBx2em0kTLElt975QbwLkhkmIyvCS1TGXC8LR6YYwVSTzH8yvQVt6VyJt3966oAR38XhaFjjEkvBCECNcia2d2CLyOACZQ7CDrI6h4kXcAF7lcg+za6h5et4JPdLkzV4B9B6RBtOfMISmxxqKH9TarrGtATxMgf/bDfM/qExEUCdEDuLGXAmoV06+euNs2JK7tyCrzSNHjX9aurQf)

</div>

پراپ هایی که بوسیله فرزند به اسلات ارسال می شوند به عنوان مقدار دایرکتیو `v-slot` مربوطه در دسترس هستند که می توانند بوسیله عبارات درون اسلات دریافت شوند.

شما می توانید به اسلات محدوده به عنوان تابعی که به کامپوننت فرزند ارسال شده است فکر کنید. کامپوننت فرزند سپس آن را صدا می زند و پراپ ها را به عنوان آرگومان به آن پاس می دهد.

```js
MyComponent({
  // ارسال اسلات پیش فرض، ولی به عنوان تابع
  default: (slotProps) => {
    return `${slotProps.text} ${slotProps.count}`
  }
})

function MyComponent(slots) {
  const greetingMessage = 'hello'
  return `<div>${
    // تابع اسلات را همرا با پراپ ها صدا بزنید!
    slots.default({ text: greetingMessage, count: 1 })
  }</div>`
}
```

در حقیقت کد بالا به این مورد که اسلات های محدوده چگونه کامپایل می شوند و نحوه استفاده از اسلات های محدوده در راهنمای [توابع رِندر](/guide/extras/render-function) چگونه است خیلی نزدیک است.

توجه کنید که `v-slot="slotProps"` چگونه با امضای تابع اسلات مطابقت دارد. درست همانند آرگومان های تابع می توانیم از جداسازی ساختار(destructuring) در `v-slot` استفاده کنیم:

```vue-html
<MyComponent v-slot="{ text, count }">
  {{ text }} {{ count }}
</MyComponent>
```

### اسلات های محدوده نام گذاری شده {#named-scoped-slots}

اسلات های محدوده نام گذاری شده به طور مشابه کار می کنند - پراپ های اسلات به عنوان مقدار دایرکتیو `v-slot` در دسترس هستند: `v-slot:name="slotProps"`. هنگامی که از خلاصه نویسی استفاده می کنید به شکل زیر در می آید:

```vue-html
<MyComponent>
  <template #header="headerProps">
    {{ headerProps }}
  </template>

  <template #default="defaultProps">
    {{ defaultProps }}
  </template>

  <template #footer="footerProps">
    {{ footerProps }}
  </template>
</MyComponent>
```

ارسال پراپ ها به اسلات نام گذاری شده:

```vue-html
<slot name="header" message="hello"></slot>
```

توجه داشته باشید که ویژگی `name`   اسلات در پراپ ها گنجانده نمی شود - بنابراین نتیجه نهایی `headerProps` به صورت `{ message: 'hello' }` می شود. 

اگر اسلات های نام گذاری شده را با اسلات محدوده پیش فرض ترکیب کنید، نیاز هست که تگ `<template>` را به طور مشخص برای اسلات پیش فرض به کار ببرید. تلاش برای قرار دادن دایرکتیو `v-slot` به صورت مستقیم بر روی کامپوننت خطای کامپایلر را نتیجه خواهد داد. این کار برای جلوگیری از هرگونه ابهام درباره محدوده پراپ های اسلات پیش فرض است. برای مثال:

```vue-html
<!-- این تمپلیت کامپایل نخواهد شد -->
<template>
  <MyComponent v-slot="{ message }">
    <p>{{ message }}</p>
    <template #footer>
      <!-- message به اسلات پیش فرض تعلق دارد و اینجا قابل دسترس نیست -->
      <p>{{ message }}</p>
    </template>
  </MyComponent>
</template>
```

استفاده از تگ `<template>` به طور مشخص برای اسلات پیش فرض به روشن شدن اینکه پراپ `message` درون اسلات دیگر قابل دسترس نیست کمک می کند:

```vue-html
<template>
  <MyComponent>
    <!-- از اسلات پیش فرض مشخص استفاده کنید -->
    <template #default="{ message }">
      <p>{{ message }}</p>
    </template>

    <template #footer>
      <p>Here's some contact info</p>
    </template>
  </MyComponent>
</template>
```

### مثال Fancy List {#fancy-list-example}

ممکنه از خود بپرسید یک مورد استفاده خوب برای اسلات های محدوده چیست. در اینجا یک مثال است: یک کامپوننت `<FancyList>` را تصور کنید که لیستی از آیتم ها را رِندر می کند - ممکن است منطق بارگذاری داده دور دست، استفاده از داده ها برای نمایش لیست یا حتی ویژگی های پیشرفته مانند صفحه بندی(pagination) یا پیمایش بی نهایت(infinite scrolling) را محصور کند(encapsulate). با این حال، ما می‌خواهیم که با ظاهر هر آیتم انعطاف‌پذیر باشد و استایل هر آیتم را به کامپوننت والد مصرف‌کننده آن بسپاریم. بنابراین استفاده مورد نظر ممکن است به این صورت باشد:

```vue-html
<FancyList :api-url="url" :per-page="10">
  <template #item="{ body, username, likes }">
    <div class="item">
      <p>{{ body }}</p>
      <p>by {{ username }} | {{ likes }} likes</p>
    </div>
  </template>
</FancyList>
```

در داخل `<FancyList>`، می‌توانیم همان `<slot>` را چندین بار با داده‌های آیتم‌های مختلف رِندر کنیم(توجه داشته باشید که ما از `v-bind` برای ارسال یک شی به عنوان پراپ های اسلات استفاده می کنیم):

```vue-html
<ul>
  <li v-for="item in items">
    <slot name="item" v-bind="item"></slot>
  </li>
</ul>
```

<div class="composition-api">

[آن را در Playground امتحان کنید](https://play.vuejs.org/#eNqFU2Fv0zAQ/StHJtROapNuZTBCNwnQQKBpTGxCQss+uMml8+bYlu2UlZL/zjlp0lQa40sU3/nd3Xv3vA7eax0uSwziYGZTw7UDi67Up4nkhVbGwScm09U5tw5yowoYhFEX8cBBImdRgyQMHRwWWjCHdAKYbdFM83FpxEkS0DcJINZoxpotkCIHkySo7xOixcMep19KrmGustUISotGsgJHIPgDWqg6DKEyvoRUMGsJ4HG9HGX16bqpAlU1izy5baqDFegYweYroMttMwLAHx/Y9Kyan36RWUTN2+mjXfpbrei8k6SjdSuBYFOlMaNI6AeAtcflSrqx5b8xhkl4jMU7H0yVUCaGvVeH8+PjKYWqWnpf5DQYBTtb+fc612Awh2qzzGaBiUyVpBVpo7SFE8gw5xIv/Wl4M9gsbjCCQbuywe3+FuXl9iiqO7xpElEEhUofKFQo2mTGiFiOLr3jcpFImuiaF6hKNxzuw8lpw7kuEy6ZKJGK3TR6NluLYXBVqwRXQjkLn0ueIc3TLonyZ0sm4acqKVovKIbDCVQjGsb1qvyg2telU4Yzz6eHv6ARBWdwjVqUNCbbFjqgQn6aW1J8RKfJhDg+5/lStG4QHJZjnpO5XjT0BMqFu+uZ81yxjEQJw7A1kOA76FyZjaWBy0akvu8tCQKeQ+d7wsy5zLpz1FlzU3kW1QP+x40ApWgWAySEJTv6/NitNMkllcTakwCaZZ5ADEf6cROas/RhYVQps5igEpkZLwzRROmG04OjDBcj7+Js+vYQDo9e0uH1qzeY5/s1vtaaqG969+vTTrsmBTMLLv12nuy7l+d5W673SBzxkzlfhPdWSXokdZMkSFWhuUDzTTtOnk6CuG2fBEwI9etrHXOmRLJUE0/vMH14In5vH30sCS4Nkr+WmARdztHQ6Jr02dUFPtJ/lyxUVgq6/UzyO1olSj9jc+0DcaWxe/fqab/UT51Uu7Znjw6lbUn5QWtR6vtJQM//4zPUt+NOw+lGzCqo/gLm1QS8)

</div>
<div class="options-api">

[آن را در Playground امتحان کنید](https://play.vuejs.org/#eNqNVNtq20AQ/ZWpQnECujhO0qaqY+hD25fQl4RCifKwllbKktXushcT1/W/d1bSSnYJNCCEZmbPmcuZ1S76olS6cTTKo6UpNVN2VQjWKqktfCOi3N4yY6HWsoVZmo0eD5kVAqAQ9KU7XNGaOG5h572lRAZBhTV574CJzJv7QuCzzMaMaFjaKk4sRQtgOeUmiiVO85siwncRQa6oThRpKHrO50XUnUdEwMMJw08M7mAtq20MzlAtSEtj4OyZGkweMIiq2AZKToxBgMcdxDCqVrueBfb7ZaaOQiOspZYgbL0FPBySIQD+eMeQc99/HJIsM0weqs+O258mjfZREE1jt5yCKaWiFXpSX0A/5loKmxj2m+YwT69p+7kXg0udw8nlYn19fYGufvSeZBXF0ZGmR2vwmrJKS4WiPswGWWYxzIIgs8fYH6mIJadnQXdNrdMiWAB+yJ7gsXdgLfjqcK10wtJqgmYZ+spnpGgl6up5oaa2fGKi6U8Yau9ZS6Wzpwi7WU1p7BMzaZcLbuBh0q2XM4fZXTc+uOPSGvjuWEWxlaAexr9uiIBf0qG3Uy6HxXwo9B+mn47CvbNSM+LHccDxAyvmjMA9Vdxh1WQiO0eywBVGEaN3Pj972wVxPKwOZ7BJWI2b+K5rOOVUNPbpYJNvJalwZmmahm3j7AhdSz3sPzDRS3R4SQwOCXxP4yVBzJqJarSzcY8H5mXWFfif1QVwPGjGcQWTLp7YrcLxCfyDdAuMW0cq30AOV+plcK1J+dxoXJkqR6igRCeNxjbxp3N6cX5V0Sb2K19dfFrA4uo9Gh8uP9K6Puvw3eyx9SH3IT/qPCZpiW6Y8Gq9mvekrutAN96o/V99ALPj)

</div>

### Renderless Components {#renderless-components}

مورد استفاده `<FancyList>` که در بالا مورد بحث قرار دادیم، هم منطق قابلیت استفاده مجدد (واکشی داده، صفحه بندی و غیره) و هم خروجی بصری(visual output) را در بر می گیرد، در حالی که بخشی از خروجی بصری را از طریق اسلات های محدوده به کامپوننت مصرف کننده واگذار می کند.

اگر این مفهوم را کمی بیشتر پیش ببریم، می‌توانیم به کامپوننت هایی برسیم که فقط منطق را در بر می‌گیرند و هیچ چیزی را به خودی خود رِندر نمی‌کنند - خروجی بصری به طور کامل به کامپوننت مصرف‌کننده با اسلات‌های محدوده واگذار می‌شود. ما این نوع کامپوننت را **کامپوننت بدون رِندر** می نامیم.

یک نمونه کامپوننت بدون رِندر می تواند کامپوننتی باشد که منطق ردیابی موقعیت فعلی ماوس را در بر می گیرد:

```vue-html
<MouseTracker v-slot="{ x, y }">
  Mouse is at: {{ x }}, {{ y }}
</MouseTracker>
```

<div class="composition-api">

[آن را در Playground امتحان کنید](https://play.vuejs.org/#eNqNUcFqhDAQ/ZUhF12w2rO4Cz301t5aaCEX0dki1SQko6uI/96J7i4qLPQQmHmZ9+Y9ZhQvxsRdiyIVmStsZQgcUmtOUlWN0ZbgXbcOP2xe/KKFs9UNBHGyBj09kCpLFj4zuSFsTJ0T+o6yjUb35GpNRylG6CMYYJKCpwAkzWNQOcgphZG/YZoiX/DQNAttFjMrS+6LRCT2rh6HGsHiOQKtmKIIS19+qmZpYLrmXIKxM1Vo5Yj9HD0vfD7ckGGF3LDWlOyHP/idYPQCfdzldTtjscl/8MuDww78lsqHVHdTYXjwCpdKlfoS52X52qGit8oRKrRhwHYdNrrDILouPbCNVZCtgJ1n/6Xx8JYAmT8epD3fr5cC0oGLQYpkd4zpD27R0vA=)

</div>
<div class="options-api">

[آن را در Playground امتحان کنید](https://play.vuejs.org/#eNqVUU1rwzAM/SvCl7SQJTuHdLDDbttthw18MbW6hjW2seU0oeS/T0lounQfUDBGepaenvxO4tG5rIkoClGGra8cPUhT1c56ghcbA756tf1EDztva0iy/Ds4NCbSAEiD7diicafigeA0oFvLPAYNhWICYEE5IL00fMp8Hs0JYe0OinDIqFyIaO7CwdJGihO0KXTcLriK59NYBlUARTyMn6Hv0yHgIp7ARAvl3FXm8yCRiuu1Fv/x23JakVqtz3t5pOjNOQNoC7hPz0nHyRSzEr7Ghxppb/XlZ6JjRlzhTAlA+ypkLWwAM6c+8G2BdzP+/pPbRkOoL/KOldH2mCmtnxr247kKhAb9KuHKgLVtMEkn2knG+sIVzV9sfmy8hfB/swHKwV0oWja4lQKKjoNOivzKrf4L/JPqaQ==)

</div>

در حالی که یک الگوی جالب است، بسیاری از چیزهایی که می‌توان با کامپوننت های بدون رِندر به دست آورد را می‌توان به روشی کارآمدتر با Composition API به دست آورد، بدون اینکه متحمل سربار اضافی تودرتویی کامپوننت شود. بعداً خواهیم دید که چگونه می توانیم همان عملکرد ردیابی ماوس را به عنوان یک [Composable](/guide/reusability/composables) پیاده سازی کنیم.

با این اوصاف، اسلات‌های محدوده هنوز هم در مواردی مفید هستند که نیاز داریم هم منطق **و** هم خروجی بصری را محصور کنیم، مانند مثال `<FancyList>`.
