<script setup>
import Basic from './transition-demos/Basic.vue'
import SlideFade from './transition-demos/SlideFade.vue'
import CssAnimation from './transition-demos/CssAnimation.vue'
import NestedTransitions from './transition-demos/NestedTransitions.vue'
import JsHooks from './transition-demos/JsHooks.vue'
import BetweenElements from './transition-demos/BetweenElements.vue'
import BetweenComponents from './transition-demos/BetweenComponents.vue'
</script>

# ترنزیشن - Transition {#transition}

Vue دو کامپوننت داخلی ارائه می‌دهد که می‌تواند به کار با ترنزیشن‌‌ها و انیمیشن‌ها در پاسخ به تغییر وضعیت یک متغیر کمک کند:

- `<Transition>` برای اعمال انیمیشن‌ها بر روی یک عنصر یا کامپوننت هنگام اضافه شدن به DOM و یا حذف از آن است. در همین صفحه به بررسی این موضوع می‌پردازیم.

- `<TransitionGroup>` برای اعمال انیمیشن‌ها بر روی یک عنصر یا کامپوننت زمانی که آیتمی به لیست `v-for` اضافه شده و یا از آن حذف شده و یا اینکه در آن جا به جا شده است. این موضوع در [بخش بعدی](/guide/built-ins/transition-group) بررسی شده است.

جدا از این دو کامپوننت، می‌توانیم انیمیشن‌ها را در Vue با استفاده از موارد دیگر نیز اعمال کنیم. تکنیک‌هایی مانند کلاس‌های CSS یا انیمیشن‌های state محور که به استایل متصل می‌شوند. این تکنیک‌های اضافی در بخش [تکنیک‌های انیمیشن](/guide/extras/animation) بررسی شده است.

## کامپوننت `<Transition>` {#the-transition-component}

`<Transition>` یک کامپوننت داخلی است: این به آن معنی است که شما می‌توانید از آن در تمپلیت هر کامپوننتی بدون اینکه آن را ایمپورت کنید استفاده کنید. از آن می‌توانید برای انیمیشن‌های ورود و خروج هر عنصر یا کامپوننتی که در slot پیش فرض آن قرار گرفته است استفاده کنید. این انیمیشن می‌تواند توسط یکی از راه های زیر فعال شود:

- رندر شرطی با استفاده از `v-if`
- نمایش شرطی با استفاده از `v-show`
- جابجایی کامپوننت به شکل پویا با استفاده از عنصر ویژه `<component>`
- تغییر اتریبیوت ویژه `key`

این یک نمونه از ابتدایی‌ترین کاربرد آن است:

```vue-html
<button @click="show = !show">Toggle</button>
<Transition>
  <p v-if="show">hello</p>
</Transition>
```

```css
/* در ادامه توضیح خواهیم داد که این کلاس‌ها چه می‌کنند! */
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
```

<Basic />

<div class="composition-api">

[آن را در Playground امتحان کنید](https://play.vuejs.org/#eNpVkEFuwyAQRa8yZZNWqu1sunFJ1N4hSzYUjRNUDAjGVJHluxcCipIV/OG/pxEr+/a+TwuykfGogvYEEWnxR2H17F0gWCHgBBtMwc2wy9WdsMIqZ2OuXtwfHErhlcKCb8LyoVoynwPh7I0kzAmA/yxEzsKXMlr9HgRr9Es5BTue3PlskA+1VpFTkDZq0i3niYfU6anRmbqgMY4PZeH8OjwBfHhYIMdIV1OuferQEoZOKtIJ328TgzJhm8BabHR3jeC8VJqusO8/IqCM+CnsVqR3V/mfRxO5amnkCPuK5B+6rcG2fydshks=)

</div>
<div class="options-api">

[آن را در Playground امتحان کنید](https://play.vuejs.org/#eNpVkMFuAiEQhl9lyqlNuouXXrZo2nfwuBeKs0qKQGBAjfHdZZfVrAmB+f/M/2WGK/v1vs0JWcdEVEF72vQWz94Fgh0OMhmCa28BdpLk+0etAQJSCvahAOLBnTqgkLA6t/EpVzmCP7lFEB69kYRFAYi/ROQs/Cij1f+6ZyMG1vA2vj3bbN1+b1Dw2lYj2yBt1KRnXRwPudHDnC6pAxrjBPe1n78EBF8MUGSkixnLNjdoCUMjFemMn5NjUGacnboqPVkdOC+Vpgus2q8IKCN+T+suWENwxyWJXKXMyQ5WNVJ+aBqD3e6VSYoi)

</div>

:::tip نکته
`<Transition>` فقط از یک عنصر یا کامپوننت به عنوان محتوای slot خود پشتیبانی می‌کند. اگر محتوا یک کامپوننت باشد، کامپوننت نیز باید تنها یک عنصر ریشه داشته باشد.
:::

هنگامی که یک عنصر در کامپوننت `<Transition>` درج یا حذف می‌شود، این اتفاق می‌افتد:

1. Vue به طور خودکار تشخیص می دهد که آیا عنصر هدف دارای ترنزیشن CSS یا انیمیشن اعمال شده است. در این صورت، تعدادی از [کلاس‌های ترنزیشن CSS](#transition-classes) در زمان‌های مناسب اضافه/حذف خواهند شد.

2. اگر شنونده‌هایی برای [هوک‌های جاوااسکریپت](#javascript-hooks) وجود داشته باشد، این هوک‌ها در زمان‌های مناسب فراخوانی می‌شوند.

3. اگر هیچ ترنزیشن / انیمیشن CSS شناسایی نشود و هیچ هوک جاوا‌اسکریپتی ارائه نشود، عملیات DOM برای درج و یا حذف در فریم بعدی انیمیشن مرورگر اجرا می‌شود.

## ترنزیشن های مبتنی بر CSS {#css-based-transitions}

### کلاس‌های ترنزیشن {#transition-classes}

شش کلاس برای ترنزیشن‌های ورود یا خروج اعمال می‌شود.

![نمودار ترنزیشن](./images/transition-classes.png)

<!-- https://www.figma.com/file/rlOv0ZKJFFNA9hYmzdZv3S/Transition-Classes -->

1. `v-enter-from`: حالت شروع برای ورود. قبل از اضافه کردن عنصر، اضافه می‌شود، یک فریم پس از اضافه کردن عنصر، حذف می‌شود.

2. `v-enter-active`: حالت فعال برای ورود. در طول تمام فاز ورود اعمال می‌شود. قبل از اضافه کردن عنصر اضافه می‌شود، وقتی که ترنزیشن/انیمیشن پایان می‌یابد حذف می‌شود. از این کلاس می‌توان برای تعریف مدت زمان، تاخیر و منحنی انعطاف‌پذیری برای ترنزیشن ورودی استفاده کرد.

3. `v-enter-to`: حالت پایانی برای ورود. یک فریم پس از اضافه شدن عنصر، اضافه می‌شود (همزمان با حذف `v-enter-from`)، وقتی که ترنزیشن/انیمیشن پایان می‌یابد، حذف می‌شود.

4. `v-leave-from`: حالت شروع برای خروج. فوراً پس از ایجاد ترنزیشن خروجی اضافه می‌شود، یک فریم پس از آن حذف می‌شود.

5. `v-leave-active`: حالت فعال برای خروج. در طول تمام فاز خروج اعمال می‌شود. فوراً پس از ایجاد ترنزیشن خروجی اضافه می‌شود، وقتی که ترنزیشن/انیمیشن پایان می‌یابد حذف می‌شود. از این کلاس می‌توان برای تعریف مدت زمان، تاخیر و منحنی انعطاف‌پذیری برای ترنزیشن خروجی استفاده کرد.

6. `v-leave-to`: حالت پایانی برای خروج. یک فریم پس از ایجاد ترنزیشن خروجی اضافه می‌شود (همزمان با حذف `v-leave-from`)، وقتی که ترنزیشن/انیمیشن پایان می‌یابد حذف می‌شود.

`v-enter-active` و `v-leave-active` به ما این امکان را می‌دهند که منحنی‌های انعطاف‌پذیر متفاوتی را برای ترنزیشن های ورودی/خروجی مشخص کنیم، که یک نمونه از آن را در بخش‌های آینده خواهیم دید.

### ترنزیشن‌های دارای نام {#named-transitions}

یک ترنزیشن می‌تواند از طریق پراپ `name` نام‌گذاری شود:

```vue-html
<Transition name="fade">
  ...
</Transition>
```

برای یک ترنزیشن نام‌دار، کلاس‌های آن ترنزیشن با نام آن پیشوند داده می‌شود به جای `v`. به عنوان مثال، کلاس اعمال شده برای ترنزیشن فوق به جای `fade-enter-active` ، `v-enter-active` خواهد بود. کد CSS برای ترنزیشن fade به این صورت می‌باشد:

```css
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
```

### ترنزیشن‌های CSS {#css-transitions}

`<Transition>` بیشترین استفاده را همراه با [ترنزیشن‌های بومی CSS](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Transitions/Using_CSS_transitions) دارد، همانطور که در مثال ابتدایی دیده شد. ویژگی `transition` در CSS یک مختصرنویسی است که به ما این امکان را می‌دهد که جزئیات متعددی از یک ترنزیشن را مشخص کنیم، از جمله خصوصیاتی که باید انیمه شوند، مدت زمان گذر و [منحنی‌های انعطاف‌پذیری](https://developer.mozilla.org/en-US/docs/Web/CSS/easing-function).

در ادامه یک مثال پیشرفته‌تر آورده شده است که برای ترنزیشن‌های ورودی و خروجی، پراپرتی‌های متعددی را با مدت زمان و منحنی‌های انعطاف‌پذیر مختلف ترنزیشن نشان می‌دهد:

```vue-html
<Transition name="slide-fade">
  <p v-if="show">hello</p>
</Transition>
```

```css
/*
  انیمیشن‌های ورودی و خروجی می‌توانند
  از مدت‌ها و توابع زمانی مختلف استفاده کنند
*/
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
```

<SlideFade />

<div class="composition-api">

[آن را در Playground امتحان کنید](https://play.vuejs.org/#eNqFkc9uwjAMxl/F6wXQKIVNk1AX0HbZC4zDDr2E4EK0NIkStxtDvPviFQ0OSFzyx/m+n+34kL16P+lazMpMRBW0J4hIrV9WVjfeBYIDBKzhCHVwDQySdFDZyipnY5Lu3BcsWDCk0OKosqLoKcmfLoSNN5KQbyTWLZGz8KKMVp+LKju573ivsuXKbbcG4d3oDcI9vMkNiqL3JD+AWAVpoyadGFY2yATW5nVSJj9rkspDl+v6hE/hHRrjRMEdpdfiDEkBUVxWaEWkveHj5AzO0RKGXCrSHcKBIfSPKEEaA9PJYwSUEXPX0nNlj8y6RBiUHd5AzCOodq1VvsYfjWE4G6fgEy/zMcxG17B9ZTyX8bV85C5y1S40ZX/kdj+GD1P/zVQA56XStC9h2idJI/z7huz4CxoVvE4=)

</div>
<div class="options-api">

[آن را در Playground امتحان کنید](https://play.vuejs.org/#eNqFkc1uwjAMgF/F6wk0SmHTJNQFtF32AuOwQy+hdSFamkSJ08EQ776EbMAkJKTIf7I/O/Y+ezVm3HvMyoy52gpDi0rh1mhL0GDLvSTYVwqg4cQHw2QDWCRv1Z8H4Db6qwSyHlPkEFUQ4bHixA0OYWckJ4wesZUn0gpeainqz3mVRQzM4S7qKlss9XotEd6laBDu4Y03yIpUE+oB2NJy5QSJwFC8w0iIuXkbMkN9moUZ6HPR/uJDeINSalaYxCjOkBBgxeWEijnayWiOz+AcFaHNeU2ix7QCOiFK4FLCZPzoALnDXHt6Pq7hP0Ii7/EGYuag9itR5yv8FmgH01EIPkUxG8F0eA2bJmut7kbX+pG+6NVq28WTBTN+92PwMDHbSAXQhteCdiVMUpNwwuMassMP8kfAJQ==)

</div>

### انیمیشن‌های CSS {#css-animations}

[انیمیشن‌های بومی CSS](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations/Using_CSS_animations) به مشابه با ترنزیشن‌های CSS استفاده می‌شوند، با این تفاوت که `‎*-enter-from` فوراً پس از اضافه شدن عنصر حذف نمی‌شود، بلکه در رویداد `animationend` حذف می‌شود.

برای اکثر انیمیشن‌های CSS، می‌توانیم آنها را به سادگی در داخل کلاس‌های `‎*-enter-active` و `‎*-leave-active` مشخص کنیم. در اینجا یک مثال برای آن داریم:

```vue-html
<Transition name="bounce">
  <p v-if="show" style="text-align: center;">
    Hello here is some bouncy text!
  </p>
</Transition>
```

```css
.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}
```

<CssAnimation />

<div class="composition-api">

[آن را در Playground امتحان کنید](https://play.vuejs.org/#eNqNksGOgjAQhl9lJNmoBwRNvCAa97YP4JFLbQZsLG3TDqzG+O47BaOezCYkpfB9/0wHbsm3c4u+w6RIyiC9cgQBqXO7yqjWWU9wA4813KH2toUpo9PKVEZaExg92V/YRmBGvsN5ZcpsTGGfN4St04Iw7qg8dkTWwF5qJc/bKnnYk7hWye5gm0ZjmY0YKwDlwQsTFCnWjGiRpaPtjETG43smHPSpqh9pVQKBrjpyrfCNMilZV8Aqd5cNEF4oFVo1pgCJhtBvnjEAP6i1hRN6BBUg2BZhKHUdvMmjWhYHE9dXY/ygzN4PasqhB75djM2mQ7FUSFI9wi0GCJ6uiHYxVsFUGcgX67CpzP0lahQ9/k/kj9CjDzgG7M94rT1PLLxhQ0D+Na4AFI9QW98WEKTQOMvnLAOwDrD+wC0Xq/Ubusw/sU+QL/45hskk9z8Bddbn)

</div>
<div class="options-api">

[آن را در Playground امتحان کنید](https://play.vuejs.org/#eNqNUs2OwiAQfpWxySZ66I8mXioa97YP4LEXrNNKpEBg2tUY330pqOvJmBBgyPczP1yTb2OyocekTJirrTC0qRSejbYEB2x4LwmulQI4cOLTWbwDWKTeqkcE4I76twSyPcaX23j4zS+WP3V9QNgZyQnHiNi+J9IKtrUU9WldJaMMrGEynlWy2em2lcjyCPMUALazXDlBwtMU79CT9rpXNXp4tGYGhlQ0d7UqAUcXOeI6bluhUtKmhEVhzisgPFPKpWhVCTUqQrt6ygD8oJQajmgRhAOnO4RgdQm8yd0tNzGv/D8x/8Dy10IVCzn4axaTTYNZymsSA8YuciU6PrLL6IKpUFBkS7cKXXwQJfIBPyP6IQ1oHUaB7QkvjfUdcy+wIFB8PeZIYwmNtl0JruYSp8XMk+/TXL7BzbPF8gU6L95hn8D4OUJnktsfM1vavg==)

</div>

### کلاس‌های ترنزیشن سفارشی {#custom-transition-classes}

همچنین می‌توانید کلاس‌های ترنزیشن سفارشی را با ارسال پراپ‌های زیر به `<Transition>` مشخص کنید:

- `enter-from-class`
- `enter-active-class`
- `enter-to-class`
- `leave-from-class`
- `leave-active-class`
- `leave-to-class`

این کلاس‌ها نام‌های معمولی کلاس را بازنویسی می‌کنند. این به خصوص مفید است زمانی که می‌خواهید سیستم ترنزیشن Vue را با یک کتابخانه انیمیشن CSS موجود مانند [Animate.css](https://daneden.github.io/animate.css/) ترکیب کنید:

```vue-html
<!-- در صفحه وجود دارد Animate.css فرض کنید که -->
<Transition
  name="custom-classes"
  enter-active-class="animate__animated animate__tada"
  leave-active-class="animate__animated animate__bounceOutRight"
>
  <p v-if="show">hello</p>
</Transition>
```

<div class="composition-api">

[آن را در Playground امتحان کنید](https://play.vuejs.org/#eNqNUctuwjAQ/BXXF9oDsZB6ogbRL6hUcbSEjLMhpn7JXtNWiH/vhqS0R3zxPmbWM+szf02pOVXgSy6LyTYhK4A1rVWwPsWM7MwydOzCuhw9mxF0poIKJoZC0D5+stUAeMRc4UkFKcYpxKcEwSenEYYM5b4ixsA2xlnzsVJ8Yj8Mt+LrbTwcHEgxwojCmNxmHYpFG2kaoxO0B2KaWjD6uXG6FCiKj00ICHmuDdoTjD2CavJBCna7KWjZrYK61b9cB5pI93P3sQYDbxXf7aHHccpVMolO7DS33WSQjPXgXJRi2Cl1xZ8nKkjxf0dBFvx2Q7iZtq94j5jKUgjThmNpjIu17ZzO0JjohT7qL+HsvohJWWNKEc/NolncKt6Goar4y/V7rg/wyw9zrLOy)

</div>
<div class="options-api">

[آن را در Playground امتحان کنید](https://play.vuejs.org/#eNqNUcFuwjAM/RUvp+1Ao0k7sYDYF0yaOFZCJjU0LE2ixGFMiH9f2gDbcVKU2M9+tl98Fm8hNMdMYi5U0tEEXraOTsFHho52mC3DuXUAHTI+PlUbIBLn6G4eQOr91xw4ZqrIZXzKVY6S97rFYRqCRabRY7XNzN7BSlujPxetGMvAAh7GtxXLtd/vLSlZ0woFQK0jumTY+FJt7ORwoMLUObEfZtpiSpRaUYPkmOIMNZsj1VhJRWeGMsFmczU6uCOMHd64lrCQ/s/d+uw0vWf+MPuea5Vp5DJ0gOPM7K4Ci7CerPVKhipJ/moqgJJ//8ipxN92NFdmmLbSip45pLmUunOH1Gjrc7ezGKnRfpB4wJO0ZpvkdbJGpyRfmufm+Y4Mxo1oK16n9UwNxOUHwaK3iQ==)

</div>

### استفاده از ترنزیشن‌ها و انیمیشن‌ها به صورت همزمان {#using-transitions-and-animations-together}

Vue برای اطلاع از اینکه یک ترنزیشن به پایان رسیده است، نیاز به اتصال گوش کننده‌های رویداد دارد. این ممکن است یا `transitionend` یا `animationend` باشد، بسته به نوع قوانین CSS اعمال شده. اگر فقط از یکی از آنها استفاده می‌کنید، Vue می‌تواند به صورت خودکار نوع صحیح را تشخیص دهد.

هرچند در برخی موارد ممکن است بخواهید هر دوی آنها را بر روی یک عنصر داشته باشید؛ به عنوان مثال، یک انیمیشن CSS که توسط Vue فعال می‌شود، همراه با یک افکت گذری CSS هنگام هاور موس. در این موارد، شما باید به صراحت نوعی که می‌خواهید Vue اهمیت بدهد را با ارسال پراپ `type` با مقدار `animation` یا `transition` اعلام کنید:

```vue-html
<Transition type="animation">...</Transition>
```

### ترنزیشن‌های تو در تو و مدت زمان‌های دقیق ترنزیشن{#nested-transitions-and-explicit-transition-durations}

هرچند که کلاس‌های ترنزیشن فقط بر روی عنصر فرزند مستقیم در `<Transition>` اعمال می‌شوند، ما می‌توانیم عنصرهای تو در تو را با استفاده از انتخابگرهای CSS تو در تویی انتقال دهیم:

```vue-html
<Transition name="nested">
  <div v-if="show" class="outer">
    <div class="inner">
      Hello
    </div>
  </div>
</Transition>
```

```css
/* قوانینی که به عنصرهای تو در تو اشاره می‌کنند */
.nested-enter-active .inner,
.nested-leave-active .inner {
  transition: all 0.3s ease-in-out;
}

.nested-enter-from .inner,
.nested-leave-to .inner {
  transform: translateX(30px);
  opacity: 0;
}

/* حذف شده است CSS سایر قسمت‌های ضروری از */
```

می‌توانیم حتی یک تاخیر ترنزیشن را به عنصر تو در تو در حال ورود اضافه کنیم که یک دنباله انیمیشن ورود گام‌به‌گام ایجاد می‌کند:

```css{3}
/* تاخیر ورود عنصر تو در تو برای ایجاد اثر گام‌به‌گام */
.nested-enter-active .inner {
  transition-delay: 0.25s;
}
```

با این حال، این یک مشکل کوچک ایجاد می‌کند. به صورت پیش‌فرض، کامپوننت `<Transition>` سعی می‌کند به طور خودکار فهمیدن اینکه ترنزیشن به پایان رسیده یا خیر را با گوش دادن به **اولین** رویداد `transitionend` یا `animationend` بر روی عنصر ترنزیشن اصلی انجام دهد. با یک ترنزیشن تو در تو، رفتار مطلوب انتظار کشیدن تا زمانی که ترنزیشن‌های همه عنصرهای داخلی به پایان رسیده باشند می‌باشد.

در چنین مواردی، می‌توانید مدت زمان ترنزیشن را به صورت دقیق (به میلی‌ثانیه) با استفاده از پراپ `duration` بر روی کامپوننت `<Transition>` مشخص کنید. مدت زمان کل باید با جمع تاخیر و مدت زمان ترنزیشن عنصر داخلی همخوانی داشته باشد:

```vue-html
<Transition :duration="550">...</Transition>
```

<NestedTransitions />

[آن را در Playground امتحان کنید](https://play.vuejs.org/#eNqVVd9v0zAQ/leO8LAfrE3HNKSFbgKmSYMHQNAHkPLiOtfEm2NHttN2mvq/c7bTNi1jgFop9t13d9995ziPyfumGc5bTLJkbLkRjQOLrm2uciXqRhsHj2BwBiuYGV3DAUEPcpUrrpUlaKUXcOkBh860eJSrcRqzUDxtHNaNZA5pBzCets5pBe+4FPz+Mk+66Bf+mSdXE12WEsdphMWQiWHKCicoLCtaw/yKIs/PR3kCitVIG4XWYUEJfATFFGIO84GYdRUIyCWzlra6dWg2wA66dgqlts7c+d8tSqk34JTQ6xqb9TjdUiTDOO21TFvrHqRfDkPpExiGKvBITjdl/L40ulVFBi8R8a3P17CiEKrM4GzULIOlFmpQoSgrl8HpKFpX3kFZu2y0BNhJxznvwaJCA1TEYcC4E3MkKp1VIptjZ43E3KajDJiUMBqeWUBmcUBUqJGYOT2GAiV7gJAA9Iy4GyoBKLH2z+N0W3q/CMC2yCCkyajM63Mbc+9z9mfvZD+b071MM23qLC69+j8PvX5HQUDdMC6cL7BOTtQXCJwpas/qHhWIBdYtWGgtDWNttWTmThu701pf1W6+v1Hd8Xbz+k+VQxmv8i7Fv1HZn+g/iv2nRkjzbd6npf/Rkz49DifQ3dLZBBYOJzC4rqgCwsUbmLYlCAUVU4XsCd1NrCeRHcYXb1IJC/RX2hEYCwJTvHYVMZoavbBI09FmU+LiFSzIh0AIXy1mqZiFKaKCmVhiEVJ7GftHZTganUZ56EYLL3FykjhL195MlMM7qxXdmEGDPOG6boRE86UJVPMki+p4H01WLz4Fm78hSdBo5xXy+yfsd3bpbXny1SA1M8c82fgcMyW66L75/hmXtN44a120ktDPOL+h1bL1HCPsA42DaPdwge3HcO/TOCb2ZumQJtA15Yl65Crg84S+BdfPtL6lezY8C3GkZ7L6Bc1zNR0=)

اگر لازم باشد، می‌توانید مقادیر جداگانه برای مدت زمان ورود و خروج با استفاده از یک آبجکت مشخص کنید:

```vue-html
<Transition :duration="{ enter: 500, leave: 800 }">...</Transition>
```

### در نظر گرفتن عملکرد {#performance-considerations}

ممکن است توجه کنید که انیمیشن‌های نشان داده شده بیشتر از پراپ‌هایی مانند `transform` و `opacity` استفاده می‌کنند. این پراپ‌ها به دلیل کارآیی زیر به راحتی قابل انیمیشن‌سازی هستند:

1. آن‌ها در طول انیمیشن بر لایه‌بندی داکیومنت تأثیر نمی‌گذارند، بنابراین محاسبات گران لایه‌بندی CSS را در هر فریم انیمیشن فراخوانی نمی‌کنند.

2. بیشتر مرورگرهای مدرن می‌توانند هنگام انیمیشن `transform` از شتابدهنده سخت‌افزاری GPU بهره ببرند.

در مقابل، پراپ‌هایی مانند `height` یا `margin` طرح‌بندی CSS را فراخوانی می‌کنند، بنابراین انیمیشن دادن به آنها بسیار هزینه بر است و باید با احتیاط استفاده شوند.

## هوک‌های جاوااسکریپت {#javascript-hooks}

شما می‌توانید با گوش دادن به رویدادها بر روی کامپوننت `<Transition>` به فرآیند ترنزیشن با جاوااسکریپت متصل شوید:

```vue-html
<Transition
  @before-enter="onBeforeEnter"
  @enter="onEnter"
  @after-enter="onAfterEnter"
  @enter-cancelled="onEnterCancelled"
  @before-leave="onBeforeLeave"
  @leave="onLeave"
  @after-leave="onAfterLeave"
  @leave-cancelled="onLeaveCancelled"
>
  <!-- ... -->
</Transition>
```

<div class="composition-api">

```js
// درج شود فراخوانی می‌شود DOM قبل از اینکه عنصر در
// عنصر تنظیم شود 'enter-from' از این استفاده کنید تا وضعیت
function onBeforeEnter(el) {}

// یک فریم پس از اضافه شدن عنصر فراخوانی می‌شود
// از این استفاده کنید تا انیمیشن ورودی شروع شود
function onEnter(el, done) {
  // را فراخوانی کنید done برای نشان دادن پایان ترنزیشن تابع
  // استفاده شود، اختیاری است CSS اگر با
  done()
}

// زمانی فراخوانی می‌شود که ترنزیشن ورودی به پایان رسیده باشد
function onAfterEnter(el) {}

// زمانی فراخوانی می‌شود که ترنزیشن ورودی قبل از کامل شدن لغو شود
function onEnterCancelled(el) {}

// قبل از فراخوانی ترنزیشن خروجی فراخوانی می‌شود
// بیشتر مواقع، بهتر است فقط از هوک خروجی استفاده کنید
function onBeforeLeave(el) {}

// زمانی فراخوانی می‌شود که ترنزیشن خروجی شروع می‌شود
// از این استفاده کنید تا انیمیشن خروجی شروع شود
function onLeave(el, done) {
  // را فراخوانی کنید done برای نشان دادن پایان ترنزیشن تابع
  // استفاده شود، اختیاری است CSS اگر با 
  done()
}

// زمانی فراخوانی می‌شود
// حذف شده باشد DOM که ترنزیشن خروجی به پایان رسیده و عنصر از
function onAfterLeave(el) {}

// در دسترس است v-show تنها در ترنزیشن‌های
function onLeaveCancelled(el) {}
```

</div>
<div class="options-api">

```js
export default {
  // ...
  methods: {
    // درج شود فراخوانی می‌شود DOM قبل از اینکه عنصر در
    // عنصر تنظیم شود 'enter-from' از این استفاده کنید تا وضعیت
    onBeforeEnter(el) {},

    // یک فریم پس از اضافه شدن عنصر فراخوانی می‌شود
    // از این استفاده کنید تا انیمیشن ورودی شروع شود
    onEnter(el, done) {
      // را فراخوانی کنید done برای نشان دادن پایان ترنزیشن تابع
      // استفاده شود، اختیاری است CSS اگر با
      done()
    },

    // زمانی فراخوانی می‌شود که ترنزیشن ورودی به پایان رسیده باشد
    onAfterEnter(el) {},

    // زمانی فراخوانی می‌شود که ترنزیشن ورودی قبل از کامل شدن لغو شود
    onEnterCancelled(el) {},

    // قبل از فراخوانی ترنزیشن خروجی فراخوانی می‌شود
    // بیشتر مواقع، بهتر است فقط از هوک خروجی استفاده کنید
    onBeforeLeave(el) {},

    // زمانی فراخوانی می‌شود که ترنزیشن خروجی شروع می‌شود
    // از این استفاده کنید تا انیمیشن خروجی شروع شود
    onLeave(el, done) {
      // را فراخوانی کنید done برای نشان دادن پایان ترنزیشن تابع
      // استفاده شود، اختیاری است CSS اگر با 
      done()
    },

    // زمانی فراخوانی می‌شود
    // حذف شده باشد DOM که ترنزیشن خروجی به پایان رسیده و عنصر از
    onAfterLeave(el) {},

    // در دسترس است v-show تنها در ترنزیشن‌های
    onLeaveCancelled(el) {}
  }
}
```

</div>

این هوک‌ها می‌توانند در ترکیب با ترنزیشن‌ها / انیمیشن‌های CSS یا به تنهایی استفاده شوند.

به طور معمول در هنگام استفاده از ترنزیشن‌ها، تنها با استفاده از JavaScript، ایده‌ی خوبی است که پراپ `‎:css="false"‎` را اضافه کنید. این پراپ به طور صریح به Vue می‌گوید که از شناسایی خودکار ترنزیشن CSS صرف نظر کند. به جز کمی بهبود کارایی، همچنین از اینکه قوانین CSS به طور اتفاقی با ترنزیشن تداخل داشته باشند جلوگیری می‌کند:

```vue-html{3}
<Transition
  ...
  :css="false"
>
  ...
</Transition>
```

با استفاده از `‎:css="false"‎`، ما همچنین به صورت کامل مسئول کنترل زمان پایان ترنزیشن هستیم. در این حالت، کالبک‌های `done` برای هوک‌های `‎@enter` و `‎@leave` لازم است. در غیر این صورت، هوک‌ها به صورت همزمان فراخوانی می‌شوند و ترنزیشن به سرعت به پایان می‌رسد.

در اینجا یک نمونه دمو با استفاده از کتابخانه [GSAP](https://gsap.com/) برای انجام انیمیشن‌ها وجود دارد. البته، می‌توانید از هر کتابخانه دیگری که مایلید، مانند [Anime.js](https://animejs.com/) یا [Motion One](https://motion.dev/)، استفاده کنید:

<JsHooks />

<div class="composition-api">

[آن را در Playground امتحان کنید](https://play.vuejs.org/#eNqNVMtu2zAQ/JUti8I2YD3i1GigKmnaorcCveTQArpQFCWzlkiCpBwHhv+9Sz1qKYckJ3FnlzvD2YVO5KvW4aHlJCGpZUZoB5a7Vt9lUjRaGQcnMLyEM5RGNbDA0sX/VGWpHnB/xEQmmZIWe+zUI9z6m0tnWr7ymbKVzAklQclvvFSG/5COmyWvV3DKJHTdQiRHZN0jAJbRmv9OIA432/UE+jODlKZMuKcErnx8RrazP8woR7I1FEryKaVTU8aiNdRfwWZTQtQwi1HAGF/YB4BTyxNY8JpaJ1go5K/WLTfhdg1Xq8V4SX5Xja65w0ovaCJ8Jvsnpwc+l525F2XH4ac3Cj8mcB3HbxE9qnvFMRzJ0K3APuhIjPefmTTyvWBAGvWbiDuIgeNYRh3HCCDNW+fQmHtWC7a/zciwaO/8NyN3D6qqap5GfVnXAC89GCqt8Bp77vu827+A+53AJrOFzMhQdMnO8dqPpMO74Yx4wqxFtKS1HbBOMdIX4gAMffVp71+Qq2NG4BCIcngBKk8jLOvfGF30IpBGEwcwtO6p9sdwbNXPIadsXxnVyiKB9x83+c3N9WePN9RUQgZO6QQ2sT524KMo3M5Pf4h3XFQ7NwFyZQpuAkML0doEtvEHhPvRDPRkTfq/QNDgRvy1SuIvpFOSDQmbkWTckf7hHsjIzjltkyhqpd5XIVNN5HNfGlW09eAcMp3J+R+pEn7L)

</div>
<div class="options-api">

[آن را در Playground امتحان کنید](https://play.vuejs.org/#eNqNVFFvmzAQ/is3pimNlABNF61iaddt2tukvfRhk/xiwIAXsJF9pKmq/PedDTSwh7ZSFLjvzvd9/nz4KfjatuGhE0ES7GxmZIu3TMmm1QahtLyFwugGFu51wRQAU+Lok7koeFcjPDk058gvlv07gBHYGTVGALbSDwmg6USPnNzjtHL/jcBK5zZxxQwZavVNFNqIHwqF8RUAWs2jn4IffCfqQz+mik5lKLWi3GT1hagHRU58aAUSshpV2YzX4ncCcbjZDp099GcG6ZZnEh8TuPR8S0/oTJhQjmQryLUSU0rUU8a8M9wtoWZTQtIwi0nAGJ/ZB0BwKxJYiJpblFko1a8OLzbhdgWXy8WzP99109YCqdIJmgifyfYuzmUzfFF2HH56o/BjAldx/BbRo7pXHKMjGbrl1IcciWn9fyaNfC8YsIueR5wCFFTGUVAEsEs7pOmDu6yW2f6GBW5o4QbeuScLbu91WdZiF/VlvgEtujdcWek09tx3qZ+/tXAzQU1mA8mCoeicneO1OxKP9yM+4ElmLaEFr+2AecVEn8sDZOSrSzv/1qk+sgAOa1kMOyDlu4jK+j1GZ70E7KKJAxRafKzdazi26s8h5dm+NLpTeQLvP27S6+urz/7T5aaUao26TWATt0cPPsgcK3f6Q1wJWVY4AVJtcmHWhueyo89+G38guD+agT5YBf39s25oIv5arehu8krYkLAs8BeG86DfuANYUCG2NomiTrX7Msx0E7ncl0bnXT04566M4PQPykWaWw==)

</div>

## ترنزیشن‌های قابل استفاده مجدد {#reusable-transitions}

ترنزیشن‌ها از طریق سیستم کامپوننت Vue قابل استفاده مجدد هستند. برای ایجاد یک ترنزیشن قابل استفاده مجدد، می‌توانیم یک کامپوننت ایجاد کنیم که `<Transition>` را دربربگیرد و محتوای اسلات را به آن منتقل کند:

```vue{6} [MyTransition.vue]
<script>
// JavaScript منطق هوک‌های
</script>

<template>
  <!-- از پیش ساخته شده Transition دربرگرفتن کامپوننت -->
  <Transition
    name="my-transition"
    @enter="onEnter"
    @leave="onLeave">
    <slot></slot> <!-- جای گذاری محتوای اسلات -->
  </Transition>
</template>

<style>
/*
  ضروری CSS استایل‌های
  در اینجا خودداری کنید `<style scoped>` توجه: از استفاده از
  زیرا به محتوای اسلات اعمال نمی‌شود
*/
</style>
```

حالا `MyTransition` می‌تواند import شده و مانند یک نسخه‌ی از پیش ساخته شده استفاده شود:

```vue-html
<MyTransition>
  <div v-if="show">Hello</div>
</MyTransition>
```

## ترنزیشن در هنگام ظاهر شدن {#transition-on-appear}

اگر می‌خواهید همچنین یک ترنزیشن را در زمان اولیه نمایش یک عنصر اعمال کنید، می‌توانید پراپ `appear` را اضافه کنید:

```vue-html
<Transition appear>
  ...
</Transition>
```

## ترنزیشن بین عناصر {#transition-between-elements}

علاوه بر تغییر وضعیت یک عنصر با `v-if` / `v-show`، ما همچنین می‌توانیم بین دو عنصر ترنزیشن دهیم با استفاده از `v-if` / `v-else` / `v-else-if`، تا زمانی که اطمینان حاصل شود که تنها یک عنصر در هر لحظه نمایش داده می‌شود:

```vue-html
<Transition>
  <button v-if="docState === 'saved'">Edit</button>
  <button v-else-if="docState === 'edited'">Save</button>
  <button v-else-if="docState === 'editing'">Cancel</button>
</Transition>
```

<BetweenElements />

[آن را در Playground امتحان کنید](https://play.vuejs.org/#eNqdk8tu2zAQRX9loI0SoLLcFN2ostEi6BekmwLa0NTYJkKRBDkSYhj+9wxJO3ZegBGu+Lhz7syQ3Bd/nJtNIxZN0QbplSMISKNbdkYNznqCPXhcwwHW3g5QsrTsTGekNYGgt/KBBCEsouimDGLCvrztTFtnGGN4QTg4zbK4ojY4YSDQTuOiKwbhN8pUXm221MDd3D11xfJeK/kIZEHupEagrbfjZssxzAgNs5nALIC2VxNILUJg1IpMxWmRUAY9U6IZ2/3zwgRFyhowYoieQaseq9ElDaTRrkYiVkyVWrPiXNdiAcequuIkPo3fMub5Sg4l9oqSevmXZ22dwR8YoQ74kdsL4Go7ZTbR74HT/KJfJlxleGrG8l4YifqNYVuf251vqOYr4llbXz4C06b75+ns1a3BPsb0KrBy14Aymnerlbby8Vc8cTajG35uzFITpu0t5ufzHQdeH6LBsezEO0eJVbB6pBiVVLPTU6jQEPpKyMj8dnmgkQs+HmQcvVTIQK1hPrv7GQAFt9eO9Bk6fZ8Ub52Qiri8eUo+4dbWD02exh79v/nBP+H2PStnwz/jelJ1geKvk/peHJ4BoRZYow==)

## حالت‌های ترنزیشن {#transition-modes}

در مثال قبلی، عناصر ورودی و خروجی به یک زمان انیمیشن داده شدند، و ما مجبور بودیم آن‌ها را به `position: absolute` تنظیم کنیم تا از مشکل طراحی جلوگیری کنیم زمانی که هر دو عنصر در DOM حاضر باشند.

با این حال، در برخی موارد این امکان وجود ندارد یا به عنوان رفتار مطلوب شناخته نمی‌شود. ممکن است بخواهیم عنصر ورودی فقط **پس از** پایان انیمیشن خروجی درج شود. مدیریت این انیمیشن‌ها به صورت دستی بسیار پیچیده خواهد بود. خوشبختانه، می‌توانیم این رفتار را با ارسال یک پراپ `mode` به `<Transition>` فعال کنیم:

```vue-html
<Transition mode="out-in">
  ...
</Transition>
```

در ادامه نمونه قبلی با `mode="out-in"‎` آورده شده است:

<BetweenElements mode="out-in" />

`<Transition>` همچنین از `mode="in-out"‎` پشتیبانی می‌کند، اگرچه استفاده از آن کمتر متداول است.

## ترنزیشن بین کامپوننت‌ها {#transition-between-components}

`<Transition>` همچنین می‌تواند برای [کامپوننت‌های پویا](/guide/essentials/component-basics#dynamic-components) استفاده شود:

```vue-html
<Transition name="fade" mode="out-in">
  <component :is="activeComponent"></component>
</Transition>
```

<BetweenComponents />

<div class="composition-api">

[آن را در Playground امتحان کنید](https://play.vuejs.org/#eNqtksFugzAMhl/F4tJNKtDLLoxWKnuDacdcUnC3SCGJiMmEqr77EkgLbXfYYZyI8/v77dinZG9M5npMiqS0dScMgUXqzY4p0RrdEZzAfnEp9fc7HuEMx063sPIZq6viTbdmHy+yfDwF5K2guhFUUcBUnkNvcelBGrjTooHaC7VCRXBAoT6hQTRyAH2w2DlsmKq1sgS8JuEwUCfxdgF7Gqt5ZqrMp+58X/5A2BrJCcOJSskPKP0v+K8UyvQENBjcsqTjjdAsAZe2ukHpI3dm/q5wXPZBPFqxZAf7gCrzGfufDlVwqB4cPjqurCChFSjeBvGRN+iTA9afdE+pUD43FjG/bSHsb667Mr9qJot89vCBMl8+oiotDTL8ZsE39UnYpRN0fQlK5A5jEE6BSVdiAdrwWtAAm+zFAnKLr0ydA3pJDDt0x/PrMrJifgGbKdFPfCwpWU+TuWz5omzfVCNcfJJ5geL8pqtFn5E07u7fSHFOj6TzDyUDNEM=)

</div>
<div class="options-api">

[آن را در Playground امتحان کنید](https://play.vuejs.org/#eNqtks9ugzAMxl/F4tJNamGXXVhWqewVduSSgStFCkkUDFpV9d0XJyn9t8MOkxBg5/Pvi+Mci51z5TxhURdi7LxytG2NGpz1BB92cDvYezvAqqxixNLVjaC5ETRZ0Br8jpIe93LSBMfWAHRBYQ0aGms4Jvw6Q05rFvSS5NNzEgN4pMmbcwQgO1Izsj5CalhFRLDj1RN/wis8olpaCQHh4LQk5IiEll+owy+XCGXcREAHh+9t4WWvbFvAvBlsjzpk7gx5TeqJtdG4LbawY5KoLtR/NGjYoHkw+PTSjIqUNWDkwOK97DHUMjVEdqKNMqE272E5dajV+JvpVlSLJllUF4+QENX1ERox0kHzb8m+m1CEfpOgYYgpqVHOmJNpgLQQa7BOdooO8FK+joByxLc4tlsiX6s7HtnEyvU1vKTCMO+4pWKdBnO+0FfbDk31as5HsvR+Hl9auuozk+J1/hspz+mRdPoBYtonzg==)

</div>

## ترنزیشن‌های پویا {#dynamic-transitions}

پراپ‌های `<Transition>` مانند `name` نیز می‌توانند پویا باشند! این به ما این امکان را می‌دهد که بر اساس تغییر وضعیت، به طور پویا ترنزیشن‌های مختلف اعمال کنیم:

```vue-html
<Transition :name="transitionName">
  <!-- ... -->
</Transition>
```

این مفید است زمانی که ترنزیشن‌ها / انیمیشن‌های CSS را با استفاده از کنوانسیون کلاس ترنزیشن Vue تعریف کرده‌اید و می‌خواهید بین آن‌ها تغییر کنید.

همچنین می‌توانید بر اساس state فعلی کامپوننت خود، رفتار مختلف را در هوک‌های ترنزیشن JavaScript اعمال کنید. در نهایت، راه حقیقی ایجاد ترنزیشن‌های پویا از طریق [کامپوننت‌های انتقال قابل استفاده مجدد](#reusable-transitions) است که پراپ‌ها را برای تغییر خصوصیات ترنزیشن(ها) مورد استفاده، دریافت می‌کنند.ممکن است خنده دار به نظر برسد، اما تنها محدودیت، خلاقیت شماست.

## ترنزیشن با اتریبیوت key {#transitions-with-the-key-attribute}

گاهی اوقات شما نیاز دارید که یک عنصر DOM را دوباره رندر کنید تا یک ترنزیشن رخ دهد.

برای مثال این کامپوننت شمارنده را در نظر بگیرید:

<div class="composition-api">

```vue
<script setup>
import { ref } from 'vue';
const count = ref(0);

setInterval(() => count.value++, 1000);
</script>

<template>
  <Transition>
    <span :key="count">{{ count }}</span>
  </Transition>
</template>
```

</div>
<div class="options-api">

```vue
<script>
export default {
  data() {
    return {
      count: 1,
      interval: null 
    }
  },
  mounted() {
    this.interval = setInterval(() => {
      this.count++;
    }, 1000)
  },
  beforeDestroy() {
    clearInterval(this.interval)
  }
}
</script>

<template>
  <Transition>
    <span :key="count">{{ count }}</span>
  </Transition>
</template>
```

</div>

در صورتی که اتریبیوت `key` را از کد حذف کنیم، فقط متن المنت به روز می‌شود و هیچ ترنزیشنی رخ نمی‌دهد. با این حال، با وجود اتریبیوت `key`، فریمورک Vue می‌داند که هر زمان که `count` تغییر کرد، یک عنصر `span` جدید ایجاد کند و بنابراین کامپوننت `Transition` دارای 2 عنصر مختلف برای ترنزیشن بین آن‌ها است.

<div class="composition-api">

[آن را در Playground امتحان کنید](https://play.vuejs.org/#eNp9UsFu2zAM/RVCl6Zo4nhYd/GcAtvQQ3fYhq1HXTSFydTKkiDJbjLD/z5KMrKgLXoTHx/5+CiO7JNz1dAja1gbpFcuQsDYuxtuVOesjzCCxx1MsPO2gwuiXnzkhhtpTYggbW8ibBJlUV/mBJXfmYh+EHqxuITNDYzcQGFWBPZ4dUXEaQnv6jrXtOuiTJoUROycFhEpAmi3agCpRQgbzp68cA49ZyV174UJKiprckxIcMJA84hHImc9oo7jPOQ0kQ4RSvH6WXW7JiV6teszfQpDPGqEIK3DLSGpQbazsyaugvqLDVx77JIhbqp5wsxwtrRvPFI7NWDhEGtYYVrQSsgELzOiUQw4I2Vh8TRgA9YJqeIR6upDABQh9TpTAPE7WN3HlxLp084Foi3N54YN1KWEVpOMkkO2ZJHsmp3aVw/BGjqMXJE22jml0X93STRw1pReKSe0tk9fMxZ9nzwVXP5B+fgK/hAOCePsh8dAt4KcnXJR+D3S16X07a9veKD3KdnZba+J/UbyJ+Zl0IyF9rk3Wxr7jJenvcvnrcz+PtweItKuZ1Np0MScMp8zOvkvb1j/P+776jrX0UbZ9A+fYSTP)

</div>
<div class="options-api">

[آن را در Playground امتحان کنید](https://play.vuejs.org/#eNp9U8tu2zAQ/JUFTwkSyw6aXlQ7QB85pIe2aHPUhZHWDhOKJMiVYtfwv3dJSpbbBgEMWJydndkdUXvx0bmi71CUYhlqrxzdVAa3znqCBtey0wT7ygA0kuTZeX4G8EidN+MJoLadoRKuLkdAGULfS12C6bSGDB/i3yFx2tiAzaRIjyoUYxesICDdDaczZq1uJrNETY4XFx8G5Uu4WiwW55PBA66txy8YyNvdZFNrlP4o/Jdpbq4M/5bzYxZ8IGydloR8Alg2qmcVGcKqEi9eOoe+EqnExXsvTVCkrBkQxoKTBspn3HFDmprp+32ODA4H9mLCKDD/R2E5Zz9+Ws5PpuBjoJ1GCLV12DASJdKGa2toFtRvLOHaY8vx8DrFMGdiOJvlS48sp3rMHGb1M4xRzGQdYU6REY6rxwHJGdJxwBKsk7WiHSyK9wFQhqh14gDyIVjd0f8Wa2/bUwOyWXwQLGGRWzicuChvKC4F8bpmrTbFU7CGL2zqiJm2Tmn03100DZUox5ddCam1ffmaMPJd3Cnj9SPWz6/gT2EbsUr88Bj4VmAljjWSfoP88mL59tc33PLzsdjaptPMfqP4E1MYPGOmfepMw2Of8NK0d238+JTZ3IfbLSFnPSwVB53udyX4q/38xurTuO+K6/Fqi8MffqhR/A==)

</div>

---

**مرتبط**

- [مستندات ‎`<Transition>`‎ API](/api/built-in-components#transition)
