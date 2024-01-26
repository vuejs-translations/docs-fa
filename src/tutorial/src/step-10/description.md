# Watchers {#watchers}

گاهی اوقات ممکن است نیاز داشته باشیم که "side effects" (اثرات جانبی) را به صورت reactive رصد کنیم - به عنوان مثال، وقتی یک عدد تغییر کند، آن را در کنسول گزارش دهیم. می‌توانیم این کار را با استفاده از واتچرها (watchers) انجام دهیم:

<div class="composition-api">

```js
import { ref, watch } from 'vue'

const count = ref(0)

watch(count, (newCount) => {
  // yes, console.log() is a side effect
  console.log(`new count is: ${newCount}`)
})
```

`watch()‎` می‌تواند به صورت مستقیم یک ref را نظارت کند و وقتی مقدار `count` تغییر کند، تابع callback فراخوانی می‌شود. `watch()‎` همچنین می‌تواند نظارت بر روی داده‌هایی با تایپ‌های داده‌ دیگر نیز انجام دهد - جزئیات بیشتر در <a target="_blank" href="/guide/essentials/watchers.html">راهنمای واتچرها</a> پوشش داده شده است.

</div>
<div class="options-api">

```js
export default {
  data() {
    return {
      count: 0
    }
  },
  watch: {
    count(newCount) {
      // yes, console.log() is a side effect
      console.log(`new count is: ${newCount}`)
    }
  }
}
```

در اینجا، ما از آپشن `watch` برای نظارت بر تغییرات پراپرتی `count` استفاده می‌کنیم. تابع callback وقتی count تغییر کند، فراخوانی می‌شود و مقدار جدید به عنوان آرگومان دریافت می‌کند. جزئیات بیشتر در <a target="_blank" href="/guide/essentials/watchers.html">راهنمای واتچرها</a> پوشش داده شده است.

</div>

یک مثال عملی‌تر از گزارش به کنسول، دریافت داده جدید هنگامی که ID تغییر کند خواهد بود. کدی که داریم، داده‌های todos را از یک API مجازی در زمان mount شدن کامپوننت دریافت می‌کند. همچنین یک دکمه وجود دارد که ID کاری را که باید دریافت شود افزایش می‌دهد. سعی کنید یک watcher را پیاده‌سازی کنید که یک کار جدید را هنگام کلیک بر روی دکمه دریافت کند.
