<script setup>
import SwitchComponent from './keep-alive-demos/SwitchComponent.vue'
</script>

# KeepAlive {#keepalive}

`<KeepAlive>` یک کامپوننت داخلی است که به ما امکان می‌دهد وقتی که بین چند کامپوننت به صورت پویا جابجا می‌شویم،  نمونه‌های کامپوننت را به صورت شرطی در حافظه کش کنیم.

## استفاده پایه {#basic-usage}

در فصل مبانی کامپوننت، ما دستورات مربوط به [کامپوننت‌های پویا](/guide/essentials/component-basics#dynamic-components) را با استفاده از عنصر ویژه `<component>` معرفی کردیم:

```vue-html
<component :is="activeComponent" />
```

به طور پیش‌فرض، نمونه‌ی فعال کامپوننت پس از جابجا شدن از آن، unmount می‌شود و هر تغییری که در وضعیت آن اعمال شده است، از دست می‌رود. وقتی این کامپوننت دوباره نمایش داده می‌شود، یک نمونه‌ی جدید با وضعیت اولیه ایجاد می‌شود.

در مثال زیر، دو کامپوننت وجود دارد. کامپوننت A شامل یک شمارنده است، در حالی که کامپوننت B شامل یک پیام است. تلاش کنید وضعیت یکی از آنها را تغییر دهید، به کامپوننت دیگر بروید و سپس دوباره به قبلی برگردید:

<SwitchComponent />

متوجه خواهید شد که وقتی به آن باز می‌گردید، وضعیتی که قبلاً تغییر کرده بود، دوباره بازنشانی می‌شود.

ایجاد نمونه‌ی جدیدی از کامپوننت هنگام جابجایی ، به صورت عادی رفتار مفیدی است اما در این مورد، می‌خواهیم که هر دو نمونه‌ی کامپوننت حتی زمانی که غیرفعال هستند حفظ شوند. برای حل این مشکل، می‌توانیم کامپوننت خود را با کامپوننت داخلی `<KeepAlive>` محاصره کنیم:

```vue-html
<!-- Inactive components will be cached! -->
<KeepAlive>
  <component :is="activeComponent" />
</KeepAlive>
```

حالا، داده ها در جابه جایی بین کامپوننت‌ها حفظ خواهد شد:


<SwitchComponent use-KeepAlive />

<div class="composition-api">

[امتحان کنید](https://play.vuejs.org/#eNqtUsFOwzAM/RWrl4IGC+cqq2h3RFw495K12YhIk6hJi1DVf8dJSllBaAJxi+2XZz8/j0lhzHboeZIl1NadMA4sd73JKyVaozsHI9hnJqV+feJHmODY6RZS/JEuiL1uTTEXtiREnnINKFeAcgZUqtbKOqj7ruPKwe6s2VVguq4UJXEynAkDx1sjmeMYAdBGDFBLZu2uShre6ioJeaxIduAyp0KZ3oF7MxwRHWsEQmC4bXXDJWbmxpjLBiZ7DwptMUFyKCiJNP/BWUbO8gvnA+emkGKIgkKqRrRWfh+Z8MIWwpySpfbxn6wJKMGV4IuSs0UlN1HVJae7bxYvBuk+2IOIq7sLnph8P9u5DJv5VfpWWLaGqTzwZTCOM/M0IaMvBMihd04ruK+lqF/8Ajxms8EFbCiJxR8khsP6ncQosLWnWV6a/kUf2nqu75Fby04chA0iPftaYryhz6NBRLjdtajpHZTWPio=)

</div>
<div class="options-api">

[امتحان کنید](https://play.vuejs.org/#eNqtU8tugzAQ/JUVl7RKWveMXFTIseofcHHAiawasPxArRD/3rVNSEhbpVUrIWB3x7PM7jAkuVL3veNJmlBTaaFsVraiUZ22sO0alcNedw2s7kmIPHS1ABQLQDEBAMqWvwVQzffMSQuDz1aI6VreWpPCEBtsJppx4wE1s+zmNoIBNLdOt8cIjzut8XAKq3A0NAIY/QNveFEyi8DA8kZJZjlGALQWPVSSGfNYJjVvujIJeaxItuMyo6JVzoJ9VxwRmtUCIdDfNV3NJWam5j7HpPOY8BEYkwxySiLLP1AWkbK4oHzmXOVS9FFOSM3jhFR4WTNfRslcO54nSwJKcCD4RsnZmJJNFPXJEl8t88quOuc39fCrHalsGyWcnJL62apYNoq12UQ8DLEFjCMy+kKA7Jy1XQtPlRTVqx+Jx6zXOJI1JbH4jejg3T+KbswBzXnFlz9Tjes/V/3CjWEHDsL/OYNvdCE8Wu3kLUQEhy+ljh+brFFu)

</div>

:::tip نکته
در تمپلیت های [DOM](/guide/essentials/component-basics#in-dom-template-parsing-caveats) باید از `<keep-alive>` استفاده شود.
:::

## Include / Exclude {#include-exclude}

By default, `<KeepAlive>` will cache any component instance inside. We can customize this behavior via the `include` and `exclude` props. Both props can be a comma-delimited string, a `RegExp`, or an array containing either types:

```vue-html
<!-- comma-delimited string -->
<KeepAlive include="a,b">
  <component :is="view" />
</KeepAlive>

<!-- regex (use `v-bind`) -->
<KeepAlive :include="/a|b/">
  <component :is="view" />
</KeepAlive>

<!-- Array (use `v-bind`) -->
<KeepAlive :include="['a', 'b']">
  <component :is="view" />
</KeepAlive>
```

The match is checked against the component's [`name`](/api/options-misc#name) option, so components that need to be conditionally cached by `KeepAlive` must explicitly declare a `name` option.

:::tip
Since version 3.2.34, a single-file component using `<script setup>` will automatically infer its `name` option based on the filename, removing the need to manually declare the name.
:::

## حداکثر تعداد نمونه‌های کش شده {#max-cached-instances}

ما می‌توانیم حداکثر تعداد نمونه‌های کامپوننت که می‌توانند در حافظه ذخیره شوند را توسط ویژگی `max` محدود کنیم. وقتی `max` مشخص شده باشد، `<KeepAlive>`  مانند  [ذخیره‌سازی LRU](https://en.wikipedia.org/wiki/Cache_replacement_policies#Least_recently_used_(LRU)) عمل می‌کند: اگر تعداد نمونه‌های ذخیره شده بیشتر از تعداد max شود، نمونه‌ای که اخیراً کمترین استفاده از آن شده، نابود می‌شود تا جایگاه برای نمونه جدیدی ایجاد شود.

```vue-html
<KeepAlive :max="10">
  <component :is="activeComponent" />
</KeepAlive>
```

## چرخه‌ی حیات نمونه‌های ذخیره‌شده {#lifecycle-of-cached-instance}

 `<KeepAlive>` به نمونه‌های کامپوننت اجازه می‌دهد که در وضعیت غیرفعال نگه‌داشته شوند وقتی که در بخش قابل مشاهده از برنامه نیستند، و زمانی که نیاز است، دوباره فعال می‌شوند و به بهینه‌سازی عملکرد کمک می‌کند.

<div class="composition-api">

یک کامپوننت کش شده می‌تواند برای این دو وضعیت از طریق [`onActivated()`](/api/composition-api-lifecycle#onactivated) و [`onDeactivated()`](/api/composition-api-lifecycle#ondeactivated) هوک‌های چرخه حیات را ثبت کند:

```vue
<script setup>
import { onActivated, onDeactivated } from 'vue'

onActivated(() => {
  // called on initial mount
  // and every time it is re-inserted from the cache
})

onDeactivated(() => {
  // called when removed from the DOM into the cache
  // and also when unmounted
})
</script>
```

</div>
<div class="options-api">

یک کامپوننت کش شده می‌تواند هوک‌های چرخه حیات [`activated`](/api/options-lifecycle#activated) و [`deactivated`](/api/options-lifecycle#deactivated) را برای این دو وضعیت ثبت کند:

```js
export default {
  activated() {
    // called on initial mount
    // and every time it is re-inserted from the cache
  },
  deactivated() {
    // called when removed from the DOM into the cache
    // and also when unmounted
  }
}
```

</div>

توجه داشته باشید که:

- <span class="composition-api">`onActivated`</span><span class="options-api">`activated`</span> در زمان mount فراخوانی می‌شود، و  <span class="composition-api">`onDeactivated`</span><span class="options-api">`deactivated`</span> در زمان unmount.

- این هوک‌ها برای تمام کامپوننت‌ها، هم در سطح اصلی و هم در سطوح عمیق‌تر در داخل درخت کامپوننت کش شده فراخوانی می‌شوند.

---

**Related**

- [`<KeepAlive>` API مرجع](/api/built-in-components#keepalive)
