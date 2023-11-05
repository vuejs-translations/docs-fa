# Event Listeners {#event-listeners}

با استفاده از دستور `v-on` می‌توانیم به رویدادهای DOM گوش دهیم:

```vue-html
<button v-on:click="increment">{{ count }}</button>
```

همچنین به دلیل استفاده فراوان، `v-on` دارای یک نوشتار مختصر است:

```vue-html
<button @click="increment">{{ count }}</button>
```

<div class="options-api">

در اینجا، `increment` به یک تابع ارجاع می‌دهد که با استفاده از آپشن `methods` تعریف شده است:

<div class="sfc">

```js{7-12}
export default {
  data() {
    return {
      count: 0
    }
  },
  methods: {
    increment() {
      // update component state
      this.count++
    }
  }
}
```

</div>
<div class="html">

```js{7-12}
createApp({
  data() {
    return {
      count: 0
    }
  },
  methods: {
    increment() {
      // update component state
      this.count++
    }
  }
})
```

</div>

درون متد، می‌توانیم با استفاده از `this` به نمونه ساخته شده از کامپوننت دسترسی پیدا کنیم (component instance). نمونه کامپوننت پراپرتی‌های داده‌ای را که توسط `data` تعریف شده‌اند را در اختیار ما می‌گذارد. می‌توانیم state کامپوننت را با تغییر دادن این خاصیت‌ها به‌روز کنیم.

</div>

<div class="composition-api">

<div class="sfc">

در اینجا، `increment` به یک تابع ارجاع می‌دهد که در `‎<‎script setup‎>‎` تعریف شده است:

```vue{6-9}
<script setup>
import { ref } from 'vue'

const count = ref(0)

function increment() {
  // update component state
  count.value++
}
</script>
```

</div>

<div class="html">

در اینجا، `increment` به یک متد در شی برگردانده شده از `setup()‎` ارجاع می‌دهد:

```js{$}
setup() {
  const count = ref(0)

  function increment(e) {
    // update component state
    count.value++
  }

  return {
    count,
    increment
  }
}
```

</div>

درون تابع، می‌توانیم state کامپوننت را با تغییر دادن refs به‌روز کنیم.

</div>

هندلرهای رویداد همچنین می‌توانند از عبارات درون خطی استفاده کنند، و می‌توانند وظایف رایج را با استفاده از modifierها ساده کنند. این جزئیات در <a target="_blank" href="/guide/essentials/event-handling.html">راهنما - Event Handling</a> پوشش داده شده‌اند.

حالا سعی کنید خودتان تابع `increment` را <span class="options-api">به عنوان یک متد</span><span class="composition-api">پیاده سازی کنید</span> و آن را با استفاده از `v-on` به دکمه متصل کنید.
