# Computed Property {#computed-property}

بیایید ساخت لیست todo از مرحله گذشته را ادامه دهیم. در اینجا، ما به هر کار امکان تغییر وضعیت (انجام شده یا انجام نشده) را اضافه کرده‌ایم. این کار با افزودن ویژگی `done` به هر شیء و استفاده از `v-model` برای متصل کردن آن به یک چک باکس (checkbox) انجام می‌شود:

```vue-html{2}
<li v-for="todo in todos">
  <input type="checkbox" v-model="todo.done">
  ...
</li>
```

بخش بعدی که می‌توانیم اضافه کنیم، این است که بتوانیم کارهایی که قبلاً انجام شده‌اند را مخفی کنیم. ما در حال حاضر یک دکمه داریم که وضعیت `hideCompleted` را تغییر می‌دهد. اما چگونه می‌توانیم عناصر لیست را بر اساس این وضعیت رندر کنیم؟

<div class="options-api">

می‌توانیم یک پراپرتی اعلام کنیم که به صورت reactive از پراپرتی‌های دیگر با استفاده از آپشن `computed` محاسبه می‌شود. (معرفی <a target="_blank" href="/guide/essentials/computed.html">computed property</a>).

<div class="sfc">

```js
export default {
  // ...
  computed: {
    filteredTodos() {
      // `this.hideCompleted` برگرداندن کار های فیلتر شده بر اساس 
    }
  }
}
```

</div>
<div class="html">

```js
createApp({
  // ...
  computed: {
    filteredTodos() {
      // `this.hideCompleted` برگرداندن کار های فیلتر شده بر اساس 
    }
  }
})
```

</div>

</div>
<div class="composition-api">

می‌توانیم یک computed ref ایجاد کنیم که مقدار آن بر اساس ‍`‎.value` داده reactive دیگر محاسبه می‌شود. (معرفی <a target="_blank" href="/guide/essentials/computed.html">computed property</a>).

<div class="sfc">

```js{8-11}
import { ref, computed } from 'vue'

const hideCompleted = ref(false)
const todos = ref([
  /* ... */
])

const filteredTodos = computed(() => {
  // برگرداندن کار های فیلتر شده بر اساس 
  // `todos.value` و `hideCompleted.value`
})
```

</div>
<div class="html">

```js{10-13}
import { createApp, ref, computed } from 'vue'

createApp({
  setup() {
    const hideCompleted = ref(false)
    const todos = ref([
      /* ... */
    ])

    const filteredTodos = computed(() => {
      // برگرداندن کار های فیلتر شده بر اساس 
      // `todos.value` و `hideCompleted.value`
    })

    return {
      // ...
    }
  }
})
```

</div>

</div>

```diff
- <li v-for="todo in todos">
+ <li v-for="todo in filteredTodos">
```

یک computed property می‌آید و state های reactive دیگری که در درون خود استفاده می‌شود را به عنوان وابستگی‌ پیگیری می‌کند. این ویژگی نتیجه محاسبات را در حافظه ذخیره می‌کند و هنگامی که وابستگی‌هایش تغییر می‌کنند به طور خودکار آن را به‌روزرسانی می‌کند.

حالا سعی کنید computed property خواسته شده به نام `filteredTodos` را اضافه کرده و منطق محاسبه‌اش را پیاده‌سازی کنید! اگر به درستی پیاده‌سازی شود، وقتی یک کار را انجام دهید و موارد تکمیل شده را مخفی کنید، باید فوراً از دید کاربر مخفی شود.
