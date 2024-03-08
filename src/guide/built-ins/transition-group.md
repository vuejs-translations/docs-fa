<script setup>
import ListBasic from './transition-demos/ListBasic.vue'
import ListMove from './transition-demos/ListMove.vue'
import ListStagger from './transition-demos/ListStagger.vue'
</script>

# ترنزیشن گروهی - TransitionGroup {#transitiongroup}

`<TransitionGroup>` یک کامپوننت داخلی است که برای انیمیشن‌ دادن به اضافه شدن، حذف شدن و تغییر ترتیب عناصر یا کامپوننت‌هایی که در یک لیست نمایش داده می‌شوند طراحی شده است.

## تفاوت `<TransitionGroup>` با `<Transition>` {#differences-from-transition}

`<TransitionGroup>` از همان پراپ‌ها، کلاس‌های CSS و هوک‌های `<Transition>` پشتیبانی می‌کند. با تفاوت‌های زیر:

- بصورت پیش‌فرض، کامپوننت wrapper (المانی که برای گروه‌بندی و مدیریت المان‌ها به کار می‌رود) را رندر نمی‌کند. اما می‌توانید با استفاده از ویژگی `tag`، المان مورد نظر خود را برای رندر کردن مشخص کنید.

- [حالت‌های ترنزیشن](./transition#transition-modes) در دسترس نیستند، چون در این حالت نیازی نیست بین عناصر جدا از هم ترنزیشن اعمال کنیم.

- هر عنصری داخلی، **باید** `key` یکتا داشته باشد.

- کلاس‌های CSS بر روی المان های لیست اعمال می‌شوند، **نه** بر روی کانتینر.

:::tip نکته
وقتی در [DOM templates ](/guide/essentials/component-basics#in-dom-template-parsing-caveats)استفاده می‌شود، باید با عنوان `<transition-group>` نوشته شود.
:::

## ترنزیشن‌های ورود / خروج {#enter-leave-transitions}

در زیر مثالی از اعمال ترنزیشن‌های ورود / خروج در یک لیست `v-for` با استفاده از `<TransitionGroup>` می‌بینیم:

```vue-html
<TransitionGroup name="list" tag="ul">
  <li v-for="item in items" :key="item">
    {{ item }}
  </li>
</TransitionGroup>
```

```css
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
```

<ListBasic />

## جابجایی با ترنزیشن {#move-transitions}

در مثال بالا چند نقص مشاهده می‌شود: زمانی که یک مورد درج یا حذف می‌شود، موارد اطراف به جای حرکت نرم، فوری به جایگاه جدید خود "می‌پرند". این مشکل را می‌توان با افزودن چند خط کد CSS برطرف کرد:

```css{1,13-17}
.list-move, /* اعمال ترنزیشن به عناصر در حال حرکت */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* اطمینان حاصل شود که عناصری که در حال خروج هستند،
   از جریان طراحی خارج شده‌اند تا انیمیشن‌های حرکتی به درستی محاسبه شوند */ 
.list-leave-active {
  position: absolute;
}
```

حالا خیلی بهتر به نظر می‌آید - حتی در هنگام بُر زدن لیست، کل لیست به صورت نرم و انیمیشن دار جا به جا می‌شود:

<ListMove />

[مثال کامل](/examples/#list-transition)

## ترنزیشن‌های متوالی در لیست {#staggering-list-transitions}

از طریق data-attribute ها، می‌توانیم ترنزیشن‌های متوالی در یک لیست به وجود آوریم. ابتدا ما ایندکس را به عنوان یک data-attribute روی المان اعمال می‌کنیم.

```vue-html{11}
<TransitionGroup
  tag="ul"
  :css="false"
  @before-enter="onBeforeEnter"
  @enter="onEnter"
  @leave="onLeave"
>
  <li
    v-for="(item, index) in computedList"
    :key="item.msg"
    :data-index="index"
  >
    {{ item.msg }}
  </li>
</TransitionGroup>
```

سپس، در هوک‌های جاوااسکریپت، به عنصر بر اساس ایندکس آن با تأخیر انیمیشن می‌دهیم. در این مثال از کتابخانه [GreenSock](https://greensock.com/) برای انیمیشن استفاده می‌شود.

```js{5}
function onEnter(el, done) {
  gsap.to(el, {
    opacity: 1,
    height: '1.6em',
    delay: el.dataset.index * 0.15,
    onComplete: done
  })
}
```

<ListStagger />

<div class="composition-api">

[مثال کامل در Playground](https://play.vuejs.org/#eNqlVMuu0zAQ/ZVRNklRm7QLWETtBW4FSFCxYkdYmGSSmjp28KNQVfl3xk7SFyvEponPGc+cOTPNOXrbdenRYZRHa1Nq3lkwaF33VEjedkpbOIPGeg6lajtnsYIeaq1aiOlSfAlqDOtG3L8SUchSSWNBcPrZwNdCAqVqTZND/KxdibBDjKGf3xIfWXngCNs9k4/Udu/KA3xWWnPz1zW0sOOP6CcnG3jv9ImIQn67SvrpUJ9IE/WVxPHsSkw97gbN0zFJZrB5grNPrskcLUNXac2FRZ0k3GIbIvxLSsVTq3bqF+otM5jMUi5L4So0SSicHplwOKOyfShdO1lariQo+Yy10vhO+qwoZkNFFKmxJ4Gp6ljJrRe+vMP3yJu910swNXqXcco1h0pJHDP6CZHEAAcAYMydwypYCDAkJRdX6Sts4xGtUDAKotIVs9Scpd4q/A0vYJmuXo5BSm7JOIEW81DVo77VR207ZEf8F23LB23T+X9VrbNh82nn6UAz7ASzSCeANZe0AnBctIqqbIoojLCIIBvoL5pJw31DH7Ry3VDKsoYinSii4ZyXxhBQM2Fwwt58D7NeoB8QkXfDvwRd2XtceOsCHkwc8KCINAk+vADJppQUFjZ0DsGVGT3uFn1KSjoPeKLoaYtvCO/rIlz3vH9O5FiU/nXny/pDT6YGKZngg0/Zg1GErrMbp6N5NHxJFi3N/4dRkj5IYf5ULxCmiPJpI4rIr4kHimhvbWfyLHOyOzQpNZZ57jXNy4nRGFLTR/0fWBqe7w==)

</div>
<div class="options-api">

[مثال کامل در Playground](https://play.vuejs.org/#eNqtVE2P0zAQ/SujXNqgNmkPcIjaBbYCJKg4cSMcTDJNTB07+KNsVfW/M3aabNpyQltViT1vPPP8Zian6H3bJgeHURatTKF5ax9yyZtWaQuVYS3stGpg4peTXOayUNJYEJwea/ieS4ATNKbKYPKoXYGwRZzAeTYGPrNizxE2NZO30KZ2xR6+Kq25uTuGFrb81vrFyQo+On0kIJc/PCV8CmxL3DEnLJy8e8ksm8bdGkCjdVr2O4DfDvWRgtGN/JYC0SOkKVTTOotl1jv3hi3d+DngENILkey4sKinU26xiWH9AH6REN/Eqq36g3rDDE7jhMtCuBLN1NbcJIFEHN9RaNDWqjQDAyUfcac0fpA+CYoRCRSJsUeBiWpZwe2RSrK4w2rkVe2rdYG6LD5uH3EGpZI4iuurTdwDNBjpRJclg+UlhP914UnMZfIGm8kIKVEwciYivhoGLQlQ4hO8gkWyfD1yVHJDKgu0mAUmPXLuxRkYb5Ed8H8YL/7BeGx7Oa6hkLmk/yodBoo21BKtYBZpB7DikroKDvNGUeZ1HoVmyCNIO/ibZtJwy5X8pJVru9CWVeTpRB51+6wwhgw7Jgz2tnc/Q6/M0ZeWwKvmGZye0Wu78PIGexC6swdGxEnw/q6HOYUkt9DwMwhKxfS6GpY+KPHc45G8+6EYAV7reTjucf/uwUtSmvvTME1wDuISlVTwTqf0RiiyrtKR0tEs6r5l84b645dRkr5zoT8oXwBMHg2Tlke+jbwhj2prW5OlqZPtvkroYqnH3lK9nLgI46scnf8Cn22kBA==)

</div>

---

**مرتبط**

- [مستندات ‎`<TransitionGroup>`‎ API](/api/built-in-components#transitiongroup)
