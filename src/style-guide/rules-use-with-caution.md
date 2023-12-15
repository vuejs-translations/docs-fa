# قوانین اولویت D : با احتیاط استفاده شوند {#priority-d-rules-use-with-caution}

بعضی از ویژگی‌های Vue برای تطبیق موارد استثنایی و نادر، و یا مهاجرت روان‌تر از یک پایگاه کد قدیمی وجود دارند. با این حال، هنگامی که از آنها بیش از حد استفاده می‌شود، می‌توانند نگهداری از کد شما را دشوارتر کنند و یا حتی خود منبع اشکال شوند. این قوانین ویژگی‌های دارای پتانسیل اشکال‌زایی را نمایان می‌کنند و توضیح می‌دهند که چه زمانی و چرا باید از آن‌ها پرهیز شود.

## انتخابگرهای عنصری با `scoped` {#element-selectors-with-scoped}

**از انتخابگرهای عنصری در استفاده از `scoped` باید پرهیز شود.**

در استایل های `scoped`(محدود شده)، انتخابگر‌ کلاس را به انتخابگر‌ عنصر ترجیح دهید، زیرا تعداد زیادی از انتخابگرهای عنصری کند هستند.

::: details <nav style="display: inline-block; cursor: pointer">توضیحات بیشتر</nav>
Vue ویژگی‌های خاصی را برای اسکوپ کردن استایل‌ها، به عناصر کامپوننت‌ها اضافه کرده است. مانند `data-v-f3f3eg9`. سپس انتخابگر‌ها طوری اصلاح می‌شوند که تنها عناصر مرتبط با این ویژگی انتخاب شوند (برای مثال `button[data-v-f3f3eg9]`).

مشکل آنجاست که تعداد زیادی از انتخابگرهای عنصری-صفتی (برای مثال `button[data-v-f3f3eg9]`) به طور قابل توجهی  کندتر از انتخابگرهای کلاس-صفتی خواهد بود (مثل `btn-close[data-v-f3f3eg9].`)، بنابراین انتخابگرهای کلاس باید تا جای ممکن ترجیح داده شوند.
:::

<div class="style-example style-example-bad">
<h3>بد</h3>

```vue-html
<template>
  <button>×</button>
</template>

<style scoped>
button {
  background-color: red;
}
</style>
```

</div>

<div class="style-example style-example-good">
<h3>خوب</h3>

```vue-html
<template>
  <button class="btn btn-close">×</button>
</template>

<style scoped>
.btn-close {
  background-color: red;
}
</style>
```

</div>

## ارتباط ضمنی والد-فرزند{#implicit-parent-child-communication}

**Propها و Eventها برای ارتباط والد-فرزند باید به‌جای `this.$parent` یا prop های جابجاشونده ترجیح داده شوند.**

یک اپلیکیشن ایده‌آل Vue به فرم propها پایین، و eventها بالا است. پایبندی به این قرارداد، کامپوننت‌های شما را قابل فهم‌تر می‌کند. با این حال، موارد استثنایی وجود دارند که جابجایی prop یا `this.$parent` می‌توانند دو کامپوننتی را که عمیقا جفت شده‌اند را ساده‌سازی کنند.

مشکل اینجاست که در عین حال تعداد زیادی موارد _ساده_ وجود دارند که این الگوها ممکن است برای آنها راحتی داشته باشند. هشدار: اجازه ندهید معامله سادگی (قادربودن به فهم جریان استیت‌هایتان) برای راحتی کوتاه مدت (نوشتن کد کمتر) شما را گمراه کند.

<div class="options-api">

<div class="style-example style-example-bad">
<h3>بد</h3>

```js
app.component('TodoItem', {
  props: {
    todo: {
      type: Object,
      required: true
    }
  },

  template: '<input v-model="todo.text">'
})
```

```js
app.component('TodoItem', {
  props: {
    todo: {
      type: Object,
      required: true
    }
  },

  methods: {
    removeTodo() {
      this.$parent.todos = this.$parent.todos.filter(
        (todo) => todo.id !== vm.todo.id
      )
    }
  },

  template: `
    <span>
      {{ todo.text }}
      <button @click="removeTodo">
        ×
      </button>
    </span>
  `
})
```

</div>

<div class="style-example style-example-good">
<h3>خوب</h3>

```js
app.component('TodoItem', {
  props: {
    todo: {
      type: Object,
      required: true
    }
  },

  emits: ['input'],

  template: `
    <input
      :value="todo.text"
      @input="$emit('input', $event.target.value)"
    >
  `
})
```

```js
app.component('TodoItem', {
  props: {
    todo: {
      type: Object,
      required: true
    }
  },

  emits: ['delete'],

  template: `
    <span>
      {{ todo.text }}
      <button @click="$emit('delete')">
        ×
      </button>
    </span>
  `
})
```

</div>

</div>

<div class="composition-api">

<div class="style-example style-example-bad">
<h3>بد</h3>

```vue
<script setup>
defineProps({
  todo: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <input v-model="todo.text" />
</template>
```

```vue
<script setup>
import { getCurrentInstance } from 'vue'

const props = defineProps({
  todo: {
    type: Object,
    required: true
  }
})

const instance = getCurrentInstance()

function removeTodo() {
  const parent = instance.parent
  if (!parent) return

  parent.props.todos = parent.props.todos.filter((todo) => {
    return todo.id !== props.todo.id
  })
}
</script>

<template>
  <span>
    {{ todo.text }}
    <button @click="removeTodo">×</button>
  </span>
</template>
```

</div>

<div class="style-example style-example-good">
<h3>خوب</h3>

```vue
<script setup>
defineProps({
  todo: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['input'])
</script>

<template>
  <input :value="todo.text" @input="emit('input', $event.target.value)" />
</template>
```

```vue
<script setup>
defineProps({
  todo: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['delete'])
</script>

<template>
  <span>
    {{ todo.text }}
    <button @click="emit('delete')">×</button>
  </span>
</template>
```

</div>

</div>
