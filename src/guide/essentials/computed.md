#  ویژگی های کامپیوتد {#computed-properties}

<div class="options-api">
  <VueSchoolLink href="https://vueschool.io/lessons/computed-properties-in-vue-3" title="Free Vue.js Computed Properties Lesson"/>
</div>

<div class="composition-api">
  <VueSchoolLink href="https://vueschool.io/lessons/vue-fundamentals-capi-computed-properties-in-vue-with-the-composition-api" title="Free Vue.js Computed Properties Lesson"/>
</div>

## مثال پایه {#basic-example}

 عباراتی که در تمپلیت استفاده می شوند بسیار راحت هستند، اما برای عملیات‌های ساده طراحی شده‌اند. قرار دادن منطق بیش از حد در قالب‌های شما ممکن است باعث ناخوانی و دشواری در نگهداری کد ها شود. به عنوان مثال، اگر یک شیء با یک آرایه تو در تو داشته باشیم:

<div class="options-api">

```js
export default {
  data() {
    return {
      author: {
        name: 'John Doe',
        books: [
          'Vue 2 - Advanced Guide',
          'Vue 3 - Basic Guide',
          'Vue 4 - The Mystery'
        ]
      }
    }
  }
}
```

</div>
<div class="composition-api">

```js
const author = reactive({
  name: 'John Doe',
  books: [
    'Vue 2 - Advanced Guide',
    'Vue 3 - Basic Guide',
    'Vue 4 - The Mystery'
  ]
})
```

</div>

و میخواهیم پیام‌های مختلفی را بر اساس اینکه آیا `author` قبلاً کتابی داشته یا نه نمایش دهیم:

```vue-html
<p>Has published books:</p>
<span>{{ author.books.length > 0 ? 'Yes' : 'No' }}</span>
```

در این نقطه، قالب کمی پیچیده شده است.باید وقت بیشتری برای درک کد صرف کنیم که متوجه شویم  شرط بر اساس `author.books` یک محاسبه انجام می‌دهد. مهمتر از این، اگر نیاز باشد که این محاسبه را بیش از یک بار در قالب استفاده کنیم، احتمالاً نمی خواهیم یک کد را چندین بار بنویسیم.


به همین دلیل است که وقتی منطق پیچیده و داده‌های داینامیک داریم ، استفاده از ویژگی **کامپیوتد** توصیه می‌شود. در اینجا همان مثال، بازسازی شده است:

<div class="options-api">

```js
export default {
  data() {
    return {
      author: {
        name: 'John Doe',
        books: [
          'Vue 2 - Advanced Guide',
          'Vue 3 - Basic Guide',
          'Vue 4 - The Mystery'
        ]
      }
    }
  },
  computed: {
    // a computed getter
    publishedBooksMessage() {
      // `this` points to the component instance
      return this.author.books.length > 0 ? 'Yes' : 'No'
    }
  }
}
```

```vue-html
<p>Has published books:</p>
<span>{{ publishedBooksMessage }}</span>
```

[امتحان کنید](https://play.vuejs.org/#eNqFkN1KxDAQhV/l0JsqaFfUq1IquwiKsF6JINaLbDNui20S8rO4lL676c82eCFCIDOZMzkzXxetlUoOjqI0ykypa2XzQtC3ktqC0ydzjUVXCIAzy87OpxjQZJ0WpwxgzlZSp+EBEKylFPGTrATuJcUXobST8sukeA8vQPzqCNe4xJofmCiJ48HV/FfbLLrxog0zdfmn4tYrXirC9mgs6WMcBB+nsJ+C8erHH0rZKmeJL0sot2tqUxHfDONuyRi2p4BggWCr2iQTgGTcLGlI7G2FHFe4Q/xGJoYn8SznQSbTQviTrRboPrHUqoZZ8hmQqfyRmTDFTC1bqalsFBN5183o/3NG33uvoWUwXYyi/gdTEpwK)

در اینجا ما یک ویژگی محاسبه‌شده به نام `publishedBooksMessage`  داریم.
سعی کنید مقدار آرایه `books` را تغییر دهید و خواهید دید که `publishedBooksMessage` متناسب با آن تغییر می‌کند.

ویژگی‌های کامپیوتد را می‌توان در قالب‌ها همانند یک ویژگی عادی استفاده کرد. Vue به طور خودکار متوجه می‌شود که ویژگی کامپیوتد وابسته به یک یا چند ویژگی دیگر است. بنابراین، هرگاه ویژگی‌های وابسته تغییر کنند، ویژگی کامپیوتد نیز به‌روز می‌شود.

همچنین ببینید: [Typing Computed](/guide/typescript/options-api#typing-computed-properties) <sup class="vt-badge ts" />

</div>

<div class="composition-api">

```vue
<script setup>
import { reactive, computed } from 'vue'

const author = reactive({
  name: 'John Doe',
  books: [
    'Vue 2 - Advanced Guide',
    'Vue 3 - Basic Guide',
    'Vue 4 - The Mystery'
  ]
})

// a computed ref
const publishedBooksMessage = computed(() => {
  return author.books.length > 0 ? 'Yes' : 'No'
})
</script>

<template>
  <p>Has published books:</p>
  <span>{{ publishedBooksMessage }}</span>
</template>
```

[امتحان کنید](https://play.vuejs.org/#eNp1kE9Lw0AQxb/KI5dtoTainkoaaREUoZ5EEONhm0ybYLO77J9CCfnuzta0vdjbzr6Zeb95XbIwZroPlMySzJW2MR6OfDB5oZrWaOvRwZIsfbOnCUrdmuCpQo+N1S0ET4pCFarUynnI4GttMT9PjLpCAUq2NIN41bXCkyYxiZ9rrX/cDF/xDYiPQLjDDRbVXqqSHZ5DUw2tg3zP8lK6pvxHe2DtvSasDs6TPTAT8F2ofhzh0hTygm5pc+I1Yb1rXE3VMsKsyDm5JcY/9Y5GY8xzHI+wnIpVw4nTI/10R2rra+S4xSPEJzkBvvNNs310ztK/RDlLLjy1Zic9cQVkJn+R7gIwxJGlMXiWnZEq77orhH3Pq2NH9DjvTfpfSBSbmA==)

در اینجا یک ویژگی کامپیوتد به نام `publishedBooksMessage` تعریف کرده‌ایم. تابع `computed()` انتظار دارد که یک تابع گرفته که مقدار بازگشتی آن از نوع **computed ref** باشد. مشابه ref های عادی، شما می‌توانید به نتیجه محاسبه شده با عنوان `publishedBooksMessage.value` دسترسی پیدا کنید. Computed ref ها همچنین در قالب‌ها به صورت خودکار  از حالت بسته خارج می‌شوند، بنابراین می‌توانید بدون نیاز به `.value`به آنها دسترسی پیدا کنید. 

یک ویژگی کامپیوتد به طور خودکار وابستگی‌های متغیر خود را دنبال می‌کند. Vue میداند که محاسبه `publishedBooksMessage` به `author.books` وابستگی دارد، بنابراین هنگامی که `author.books` تغییر می‌کند، هر اتصالی که به `publishedBooksMessage` وابسته باشد، به‌روزرسانی می‌شود.

همچنین ببینید: [Typing Computed](/guide/typescript/composition-api#typing-computed) <sup class="vt-badge ts" />

</div>

## تفاوت کشینگ در کامپیوتد ها و متد ها {#computed-caching-vs-methods}

ممکن است متوجه شده باشید که می‌توانیم با فراخوانی یک متد هم به همان نتیجه برسیم.

```vue-html
<p>{{ calculateBooksMessage() }}</p>
```

<div class="options-api">

```js
// in component
methods: {
  calculateBooksMessage() {
    return this.author.books.length > 0 ? 'Yes' : 'No'
  }
}
```

</div>

<div class="composition-api">

```js
// in component
function calculateBooksMessage() {
  return author.books.length > 0 ? 'Yes' : 'No'
}
```

</div>

به جای یک ویژگی کامپیوتد، می توانیم همان تابع را به عنوان یک متد تعریف کنیم.  نتیجه نهایی این دو رویکرد دقیقاً یکسان است. با این حال، تفاوت این است که **ویژگی های کامپیوتد بر اساس وابستگی های متغیر، کش می شوند.** یک ویژگی کامپیوتد تنها زمانی دوباره ارزیابی می شود که برخی از وابستگی های متغیر آن تغییر کرده باشند. این بدان معناست که تا زمانی که `author.books` تغییر نکرده باشد، دسترسی به `publishedBooksMessage`  نتیجه کامپیوتد قبلی را برمی گرداند ، بدون نیاز به اجرای مجدد تابع getter .

این به این معناهم هست که ویژگی محاسبه‌شده زیر هیچ وقت به‌روز نمی‌شود، زیرا `Date.now()` یک وابستگی متغیر نمی‌باشد.

<div class="options-api">

```js
computed: {
  now() {
    return Date.now()
  }
}
```

</div>

<div class="composition-api">

```js
const now = computed(() => Date.now())
```

</div>

در مقایسه با ویژگی‌های کامپیوتد، فراخوانی متدها **همیشه** باعث اجرای تابع مربوطه می‌شود، حتی اگر هیچ یک از ویژگی‌های وابسته تغییر نکرده باشند.

چرا به کش نیاز داریم؟ تصور کنید ما یک لیست داریم که یک ویژگی کامپیوتد دارد که نیاز به انجام محاسبات زیادی دارد. سپس ممکن است ویژگی‌های کامپیوتد دیگری داشته باشیم که به نوبه خود به این لیست وابسته باشند. بدون کش، ما تابع دریافت کننده لیست را بیشتر از تعداد مورد نیاز اجرا می‌کنیم! در مواردی که نیاز به کش ندارید، به جای آن از فراخوانی متد استفاده کنید.

## کامپیوتد قابل تغییر {#writable-computed}

ویژگی‌های کامپیوتد به طور پیش‌فرض فقط امکان دریافت مقدار را دارند. اگر سعی کنید مقدار جدیدی به یک ویژگی کامپیوتد اختصاص دهید، یک هشدار در زمان اجرا دریافت خواهید کرد. در موارد نادری که نیاز به "ویژگی کامپیوتد قابل تغییر" دارید، می‌توانید با ارائه همزمان یک تابع getter و یک تابع setter  برای آن ، یکی ایجاد کنید.

<div class="options-api">

```js
export default {
  data() {
    return {
      firstName: 'John',
      lastName: 'Doe'
    }
  },
  computed: {
    fullName: {
      // getter
      get() {
        return this.firstName + ' ' + this.lastName
      },
      // setter
      set(newValue) {
        // Note: we are using destructuring assignment syntax here.
        [this.firstName, this.lastName] = newValue.split(' ')
      }
    }
  }
}
```

اکنون هنگام اجرای `this.fullName = 'John Doe'`، تابع setter فراخوانی خواهد شد و به تبع آن `this.firstName` و `this.lastName`  به‌روزرسانی می شوند.
</div>

<div class="composition-api">

```vue
<script setup>
import { ref, computed } from 'vue'

const firstName = ref('John')
const lastName = ref('Doe')

const fullName = computed({
  // getter
  get() {
    return firstName.value + ' ' + lastName.value
  },
  // setter
  set(newValue) {
    // Note: we are using destructuring assignment syntax here.
    [firstName.value, lastName.value] = newValue.split(' ')
  }
})
</script>
```

وقتی شما دستور `fullName.value = 'John Doe'` را اجرا کنید، تابع setter فراخوانی خواهد شد و `firstName` و `lastName` به‌طور متناسب به‌روزرسانی می شوند.

</div>

## بهترین روش ها{#best-practices}

### توابع getter باید فقط مقدار مورد نظر را برگردانند و تغییر دیگری در برنامه ایجاد نکنند.{#getters-should-be-side-effect-free}

مهم است به یاد داشته باشید که توابع getter کامپیوتد فقط باید محاسبات خالص را انجام دهند . به عبارت دیگر، **درون تابع getter ، از درخواست‌های async یا تغییر DOM استفاده نکنید!** به ویژگی کامپیوتد به عنوان یک راه ساده برای محاسبه یک مقدار بر اساس مقادیر دیگر نگاه کنید - مسئولیت اصلی آن تنها محاسبه و بازگرداندن آن مقدار می‌باشد. در ادامه این بخش، به بحث در مورد انجام عملیات هایی در پاسخ به تغییرات state با [ناظر ها](./watchers) خواهیم پرداخت.

 
### مقادیر کامپیوتد را تغییر ندهید {#avoid-mutating-computed-value}

مقدار بازگشتی از ویژگی کامپیوتد بر اساس مقادیر دیگر محاسبه می‌شود. این مقدار مانند یک عکس است که هر بار که وابستگی‌های آن تغییر کنند، به‌روز می‌شود. از آنجا که تغییر دادن عکس‌ها منطقی نیست، مقدار بازگشتی باید فقط خوانده شود و روی آن عملیاتی انجام نشود. برای تغییر مقدار بازگشتی، باید متغیری که ویژگی کامپیوتد به آن وابسته است را به‌روز کنید.

