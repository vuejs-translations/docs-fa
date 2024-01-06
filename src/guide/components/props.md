# پراپ‌ها {#props}

>در این صفحه فرض شده که شما از قبل [مبانی کامپوننت‌ها](/guide/essentials/component-basics) را مطالعه کرده اید. اگر با کامپوننت‌ها آشنایی ندارید، ابتدا آن را بخوانید.

<div class="options-api">
  <VueSchoolLink href="https://vueschool.io/lessons/vue-3-reusable-components-with-props" title="Free Vue.js Props Lesson"/>
</div>

## تعریف کردن پراپ‌ها {#props-declaration}

کامپوننت‌های Vue نیاز به تعریف پراپ‌ها بصورت مشخص دارند تا Vue بداند کدام یک از پراپ‌هایی که از خارج کامپوننت به آن پاس داده شده را بصورت fallthrought attributes (که در [بخش مخصوص خودش](/guide/components/attrs) توضیح داده شده) در نظر بگیرد.

<div class="composition-api">

هنگام استفاده از SFCها در `<script setup>`، پراپ‌ها با استفاده از ماکروی `defineProps()‎` می‌توانند تعریف شوند:

```vue
<script setup>
const props = defineProps(['foo'])

console.log(props.foo)
</script>
```

در کامپوننت‌هایی که از `<script setup>` استفاده نمی‌شود، پراپ ها می‌توانند بصورت یک آپشن با نام [`props`](/api/options-state#props) تعریف شوند:

```js
export default {
  props: ['foo'],
  setup(props) {
    // .پراپ‌ها هستند setup() اولین آرگومان دریافتی در 
    console.log(props.foo)
  }
}
```

توجه داشته باشید آرگومانی که به `defineProps()‎` پاس داده می‌شود همان مقداری ارائه شده به آپشن `props` است. همان پراپ‌های options API بین دو روش تعریف پراپ مشترک هستند.

</div>

<div class="options-api">

پراپ‌ها در option API بصورت [`props`](/api/options-state#props) تعریف می‌شنود:

```js
export default {
  props: ['foo'],
  created() {
    // قابل دسترسی هستند `this` پراپ‌ها از
    console.log(this.foo)
  }
}
```

</div>

پراپ‌ها علاوه بر این که می‌توانند بصورت آرایه تعریف شوند، قابلیت تعریف شدن بصورت آبجکت را هم دارند:

<div class="options-api">

```js
export default {
  props: {
    title: String,
    likes: Number
  }
}
```

</div>
<div class="composition-api">

```js
// <script setup> در
defineProps({
  title: String,
  likes: Number
})
```

```js
// <script setup> بجز
export default {
  props: {
    title: String,
    likes: Number
  }
}
```

</div>

برای هر پراپرتی در سینتکس تعریف کردن پراپ بصورت آبجکت، کلید ( key ) اسم پراپ خواهد بود، در صورتی که مقدار آن باید بصورت یک تابع سازنده از تایپ مقدار آن باشد. (در مثال بالا کلید `title` نام پراپ و جنس آن `String` هست)

این فقط مستندات و اطلاعات کامپوننت شما نیست، اگر دیگر توسعه دهندگان از تایپ‌هایی بجز آن تایپی که در کامپوننت تعریف شده استفاده کنند، در کنسول هشداری در ارتباط با تایپ اشتباه مشاهده می‌شود. درباره جزئیات [اعتبارسنجی پراپ ها (Props Validation)](#prop-validation) در ادامه توضیح داده شده است.

<div class="options-api">

مشاهده کنید: [Typing Component Props](/guide/typescript/options-api#typing-component-props) <sup class="vt-badge ts" />

</div>

<div class="composition-api">

اگر همراه با `<script setup>` از Typescript استفاده می‌کنید، می‌توانید با استفاده از pure type annotations پراپ‌ها را تعریف کنید:

```vue
<script setup lang="ts">
defineProps<{
  title?: string
  likes?: number
}>()
</script>
```

اطلاعات بیشتر: [Typing Component Props](/guide/typescript/composition-api#typing-component-props) <sup class="vt-badge ts" />

</div>

## جزئیات پاس دادن پراپ‌ها {#prop-passing-details}

### نگارش اسم پراپ‌ها {#prop-name-casing}

برای تعریف کردن اسامی پراپ‌های طولانی از نگارش camelCase استفاده می‌کنیم چرا که باعث می‌شود هنگام استفاده کردن از آن ها به عنوان کلید های پراپرتی نیازی به استفاده از quotes نباشد، و به ما اجازه می‌دهد که به صورت مستقیم در template expressions به آنها رفرنس بدهیم چرا که شناسه های معتبر جاوااسکریپت هستند.

<div class="composition-api">

```js
defineProps({
  greetingMessage: String
})
```

</div>
<div class="options-api">

```js
export default {
  props: {
    greetingMessage: String
  }
}
```

</div>

```vue-html
<span>{{ greetingMessage }}</span>
```

از نظر فنی، می‌توانید هنگام پاس دادن پراپ به کامپوننت فرزند از نگارش camelCase استفاده کنید ( [بجز in-DOM templates](/guide/essentials/component-basics#in-dom-template-parsing-caveats) ). اگرچه روش معمول استفاده از نگارش kebab-case میباشد که با اتریبیوت‌های HTML از یک نگارش واحد پیروی کنند.

```vue-html
<MyComponent greeting-message="hello" />
```

ما در صورت امکان از [نگارش PascalCase برای تگ‌های کامپوننت](/guide/components/registration#component-name-casing) استفاده می‌کنیم، برای اینکه شناسایی بین المنت‌های بومی HTML ها و کامپوننت‌های Vue راحت‌تر باشد. اگرچه استفاده کردن از نگارش camelCase برای پاس دادن پراپ ها خیلی سودی عَملی ندارد، به همین دلیل تصمیم گرفتیم از روش های معمول زبان ها استفاده کنیم.

### پراپ‌های استاتیک و داینامیک {#static-vs-dynamic-props}

تاکنون پراپ‌های استاتیک را دیده‌ایم، به این شکل:

```vue-html
<BlogPost title="My journey with Vue" />
```

همچنین دیده‌ایم که پراپ‌ها با استفاده از `v-bind` یا میانبر `:` به یک مقدار داینامیک نسبت داده شده‌اند، به این شکل:

```vue-html
<!-- نسبت دادن به یک متغیر بصورت داینامیک -->
<BlogPost :title="post.title" />

<!-- نسبت دادن به یک عبارت بصورت داینامیک -->
<BlogPost :title="post.title + ' by ' + post.author.name" />
```

### انتقال مقادیر با تایپ‌های متفاوت {#passing-different-value-types}

در دو مثال بالا، ما دو مقدار با تایپ‌ رشته ( string ) پاس داده ایم، اما می‌توان هر مقدار با هر تایپی به یک پراپ پاس داد.

#### Number {#number}

```vue-html
<!-- بگوییم Vue نیاز داریم تا به v-bind اگرچه `42` استاتیک است، به -->
<!-- این یک عبارت جاوااسکریپتی است نه یک رشته                      -->
<BlogPost :likes="42" />

<!-- نسبت دادن به یک متغیر بصورت داینامیک -->
<BlogPost :likes="post.likes" />
```

#### Boolean {#boolean}

```vue-html
<!-- است `true` نوشتن تنها نام پراپ بدون مقدار به معنی مقدار -->
<BlogPost is-published />

<!-- بگوییم Vue نیاز داریم تا به v-bind استاتیک است، به `false` اگرچه -->
<!-- یک عبارت جاوااسکریپتی است نه یک رشته                             -->
<BlogPost :is-published="false" />

<!-- نسبت دادن به یک متغیر بصورت داینامیک -->
<BlogPost :is-published="post.isPublished" />
```

#### Array {#array}

```vue-html
<!-- بگوییم Vue نیاز داریم تا به v-bind اگرچه یک آرایه استایتک است اما به -->
<!-- یک عبارت جاوااسکریپتی است نه یک رشته                                 -->
<BlogPost :comment-ids="[234, 266, 273]" />

<!-- نسبت دادن به یک متغیر بصورت داینامیک -->
<BlogPost :comment-ids="post.commentIds" />
```

#### Object {#object}

```vue-html
<!-- بگوییم Vue نیاز داریم تا به v-bind اگرچه یک آبجکت استایتک است اما به -->
<!-- یک عبارت جاوااسکریپتی است نه یک رشته                                 -->
<BlogPost
  :author="{
    name: 'Veronica',
    company: 'Veridian Dynamics'
  }"
 />

<!-- نسبت دادن به یک متغیر بصورت داینامیک -->
<BlogPost :author="post.author" />
```

### اتصال چندین پراپ با استفاده از آبجکت {#binding-multiple-properties-using-an-object}

اگر می‌خواهید تمام پراپرتی‌های یک آبجکت را به عنوان پراپ پاس بدهید، می‌توانید از [`v-bind` بدون آرگومان](/guide/essentials/template-syntax#dynamically-binding-multiple-attributes) (`v-bind` به جای `‎:prop-name`). به عنوان مثال، به آبجکت `post` توجه کنید:

<div class="options-api">

```js
export default {
  data() {
    return {
      post: {
        id: 1,
        title: 'My Journey with Vue'
      }
    }
  }
}
```

</div>
<div class="composition-api">

```js
const post = {
  id: 1,
  title: 'My Journey with Vue'
}
```

</div>

کد زیر:

```vue-html
<BlogPost v-bind="post" />
```

معادل است با:

```vue-html
<BlogPost :id="post.id" :title="post.title" />
```

## جریان داده یک طرفه {#one-way-data-flow}

همه پراپ‌ها دارای **اتصال one-way-down** بین پراپرتی کامپوننت فرزند و والد هستند: وقتی پراپرتی کامپوننت والد آپدیت می‌شود، باعث آپدیت شدن کامپوننت فرزند می‌شود، اما عکس این اتفاق نمی‌افتد. این از آپدیت کردن تصادفی state والد، که باعث می‌شود جریان انتقال داده در برنامه سخت‌تر قابل فهم شود، در کامپوننت فرزند جلوگیری می‌کند.

به علاوه، هربار که کامپوننت والد آپدیت می‌شود، تمام پراپ‌ها در کامپوننت فرزند به آخرین و جدیدترین مقدار آپدیت می‌شوند. این به این معناست که **نباید** سعی به آپدیت کردن پراپ درون کامپوننت فرزند کرد، اگر این کار را انجام دهید، Vue در کنسول یک هشدار خواهد داد:

<div class="composition-api">

```js
const props = defineProps(['foo'])

// ❌ warning, props are readonly!
props.foo = 'bar'
```

</div>
<div class="options-api">

```js
export default {
  props: ['foo'],
  created() {
    // ❌ warning, props are readonly!
    this.foo = 'bar'
  }
}
```

</div>

معمولا در دو حالت است که می‌خواهیم یک پراپ را mutate یا مقدار آن را آپدیت کنیم:

1. **از پراپ برای مقدار دهی اولیه استفاده می‌شود؛ کامپوننت فرزند می‌خواهد از پراپ به عنوان داده‌ی محلی خودش استفاده کند.** در این حالت بهترین راه این است که یک متغیر محلی تعریف کرده و مقدار اولیه‌اش را به عنوان مقدار اولیه به پراپی که می‌خواهیم اساین کنیم:

   <div class="composition-api">

   ```js
   const props = defineProps(['initialCounter'])

   // فقط برای مقداردهی اولیه استفاده می‌کند props.initialCounter از counter
   // و از بروزرسانی‌های پراپ در آینده جدا می‌شود
   const counter = ref(props.initialCounter)
   ```

   </div>
   <div class="options-api">

   ```js
   export default {
     props: ['initialCounter'],
     data() {
       return {
         // فقط برای مقداردهی اولیه استفاده می‌کند this.initialCounter از counter
         // و از بروزرسانی‌های پراپ در آینده جدا می‌شود
         counter: this.initialCounter
       }
     }
   }
   ```

   </div>

2. **پراپی که به کامپوننت پاس داده شده است، به خودی خود قابل استفاده نیست و نیازمند اعمال تغییرات است.** در این صورت، بهترین کار استفاده کردن از computed است:

   <div class="composition-api">

   ```js
   const props = defineProps(['size'])

   // بصورت خودکار آپدیت می‌شود props.size با هربار آپدیت شدن computed
   const normalizedSize = computed(() => props.size.trim().toLowerCase())
   ```

   </div>
   <div class="options-api">

   ```js
   export default {
     props: ['size'],
     computed: {
       // با هربار آپدیت شدن پراپ بصورت خودکار آپدیت می‌شود computed
       normalizedSize() {
         return this.size.trim().toLowerCase()
       }
     }
   }
   ```

   </div>

### آپدیت کردن پراپ‌های آبجکت / آرایه {#mutating-object-array-props}

وقتی آبجکت یا آرایه به عنوان پراپ پاس داده می‌شوند، درحالی که کامپوننت فرزند نمی‌تواند پراپ‌ها را آپدیت کند، **اما می‌تواند** پراپرتی‌های آبجکت‌ها یا آرایه‌ها را آپدیت کند. دلیل این موضوع این است که در جاوااسکریپت آبجکت‌ها و آرایه‌ها passed by reference هستند، و به دیلی نامعقولی هزینه‌ی زیادی برای Vue دارد که از چنین آپدیت هایی جلوگیری کند.

اصلی ترین عیب چنین آپدیت‌هایی این است که اجازه می‌دهد دیتا و استیت کامپوننت والد را به گونه‌ای تغییر کند که برای کامپوننت والد مشخص نیست، و به احتمال زیاد باعث سخت‌تر شدن پیگیری و تشخیص جریان داده (data flow) در  آینده می‌شود. بهترین راهکار این است که تا حد امکان از آپدیت‌هایی که به این صورت هستند دوری کرد مگر اینکه کامپوننت‌های والد و فرزند نزدیکی زیادی باهم داشته باشند. در اکثر مواقع، کامپوننت فرزند باید یک [event را emit کند](/guide/components/events) تا به کامپوننت والد بگوید آپدیت را ممکن سازد.

## اعتبارسنجی پراپ‌ها {#prop-validation}

کامپوننت‌ها می‌توانند نیازمندی‌هایی را برای پراپ ها مشخص کنند، به عنوان مثلا تایپ پراپ که در بالاتر به آن اشاره کردیم. اگر نیازمندی به درستی مشخص نشده باشد Vue در کنسول مرورگر هشدار خواهد داد. هنگامی که یک کامپوننت را توسعه می‌دهیم که تا دیگر توسعه‌دهندگان از آن استفاده کنند، این ویژگی به شدت مفید خواهد بود.

برای مشخص کردن نیازمندی‌های یک  پراپ به جای آرایه‌ای از رشته‌ها، می‌توان یک آبجکت با اعتبارسنجی از نیازمندی ها به <span class="composition-api">ماکروی `defineProps()‎`</span> <span class="options-api">آپشن `props`</span> پاس داد.

<div class="composition-api">

```js
defineProps({
  // بررسی تایپ ساده
  // `null` و `undefined` اجازه هر تایپی را می دهند
  propA: Number,
  // چندین تایپ ممکن
  propB: [String, Number],
  // تایپ رشته و الزامی
  propC: {
    type: String,
    required: true
  },
  // تایپ عدد با مقدار پیش فرض
  propD: {
    type: Number,
    default: 100
  },
  // تایپ آبجکت با مقدار پیش فرض
  propE: {
    type: Object,
    // آبجکت یا آرایه با مقدار پیش فرض باید از طریق
    // برگردانده شود factory function
    // پراپ توسط کامپوننت به عنوان آرگومان دریافت می‌شود.
    default(rawProps) {
      return { message: 'hello' }
    }
  },
  // تابع اعتبارسنجی سفارشی
  // تمام پراپ‌ها به عنوان آرگومان دوم در 3.4+ پاس داده می‌شوند
  propF: {
    validator(value, props) {
      // باید یکی از سه مقدار زیر باشد value
      return ['success', 'warning', 'danger'].includes(value)
    }
  },
  // تابع با مقدار پیش فرض
  propG: {
    type: Function,
    // یک تابع سازنده نیست `default` برخلاف آبجکت یا آرایه
    // این خود این تابع به عنوان یک مقدار پیش فرض به شمار می‌رود
    default() {
      return 'Default function'
    }
  }
})
```

:::tip نکته
کد داخل `defineProps()‎` **به بقیه متغیر های تعریف شده در `<script setup>` دسترسی ندارد**، به این دلیل که این عبارت هنگام کامپایل به یک تابع خارجی منتقل می شود.
:::

</div>
<div class="options-api">

```js
export default {
  props: {
    // بررسی تایپ ساده
    // `null` و `undefined` اجازه هر تایپی را می دهند
    propA: Number,
    // چندین تایپ ممکن
    propB: [String, Number],
    // تایپ رشته و الزامی
    propC: {
      type: String,
      required: true
    },
    // تایپ عدد با مقدار پیش فرض
    propD: {
      type: Number,
      default: 100
    },
    // تایپ آبجکت با مقدار پیش فرض
    propE: {
      type: Object,
      // آبجکت یا آرایه با مقدار پیش فرض باید از طریق
      // برگردانده شود factory function
      // پراپ توسط کامپوننت به عنوان آرگومان دریافت می‌شود
      default(rawProps) {
        return { message: 'hello' }
      }
    },
    // تابع اعتبارسنجی سفارشی
    // تمام پراپ‌ها به عنوان آرگومان دوم در 3.4+ پاس داده می‌شوند
    propF: {
      validator(value, props) {
        // باید یکی از سه مقدار زیر باشد value
        return ['success', 'warning', 'danger'].includes(value)
      }
    },
    // تابع با مقدار پیش فرض
    propG: {
      type: Function,
      // یک تابع سازنده نیست `default` برخلاف آبجکت یا آرایه
      // این خود این تابع به عنوان یک مقدار پیش فرض به شمار می‌رود
      default() {
        return 'Default function'
      }
    }
  }
}
```

</div>

توضیحات بیشتر:

- بطور پیش فرض، دریافت همه پراپ‌ها اختیاری است، مگر اینکه `required: true` مشخص شده باشد.

- پراپی که تایپ آن boolean نباشد، در صورت عدم داشتن مقدار، مقدار `undefiend` خواهند داشت.

- عدم مقداردهی پراپ تایپ غیرمنطقی (non-boolean types) مقدار `false` خواهد داشت. می‌توان این تنظیمات را با مقداردهی مقدار پیش فرض تغییر داد. `default: undefined` تا رفتاری مانند تایپ‌های non-Booleanها داشته باشد.

- اگر مقدار پراپ `undefiend` باشد و مقدار `default` مشخص شده باشد، از آن استفاده خواهد شد. این مورد شامل شرایطی است که پراپ مقدار دهی نشده است یا مقدار آن `undefined` پاس داده شده است.

هنگامی که اعتبار سنجی prop ناموفق باشد، Vue یک هشدار کنسول (در صورت بودن در محیط توسعه) تولید می‌کند.

<div class="composition-api">

اگر از [Type-based props declarations](/api/sfc-script-setup#type-only-props-emit-declarations) <sup class="vt-badge ts" /> استفاده می‌کنید، Vue سعی می‌کند تا به بهترین شکل ممکن type annotaions را با معادل runtime prop declarations :معادل سازی کند. برای مثال `defineProps<{ msg: string }>‎` بعد از کامپایل به  `{ msg: { type: String, required: true }}` تبدیل می‌شود.

</div>
<div class="options-api">

::: tip توجه
توجه داشته باشید که props **قبل از** ایجاد یک نمونه از کامپوننت تایید می‌شود، بنابراین ویژگی‌های نمونه کامپوننت (مانند "data"، "computed" و غیره) در توابع "default" یا "validator" در دسترس نخواهند بود.
:::

</div>

### Runtime Type Checks {#runtime-type-checks}

`تایپ` می‌تواند یکی از تایپ‌های زیر باشد:

- `String`
- `Number`
- `Boolean`
- `Array`
- `Object`
- `Date`
- `Function`
- `Symbol`

علاوه بر این، «type» همچنین می‌تواند یک کلاس سفارشی یا تابع سازنده باشد و این ادعا با بررسی «instanceof» انجام می‌شود. به عنوان مثال، با توجه به کلاس زیر:

```js
class Person {
  constructor(firstName, lastName) {
    this.firstName = firstName
    this.lastName = lastName
  }
}
```

می توانید از آن به عنوان یک تایپ استفاده کنید:

<div class="composition-api">

```js
defineProps({
  author: Person
})
```

</div>
<div class="options-api">

```js
export default {
  props: {
    author: Person
  }
}
```

</div>

Vue از `instanceof Person` برای اعتبارسنجی اینکه آیا مقدار پراپ `author` واقعا یک نمونه از تایپ کلاس `Person` هست یا خیر استفاده می‌کند.

## تبدیل تایپ داده منطقی (Boolean casting) {#boolean-casting}

پراپ‌ها با تایپ داده منطقی (boolean) قانون تبدیل خاصی دارند تا بتوانند مدل رفتاری اتریبیوت‌های بومی مرورگر را تقلید کنند.

<div class="composition-api">

```js
defineProps({
  disabled: Boolean
})
```

</div>
<div class="options-api">

```js
export default {
  props: {
    disabled: Boolean
  }
}
```

</div>

کامپوننت به این صورت قابل استفاده است:

```vue-html
<!-- :disabled="true" معادل -->
<MyComponent disabled />

<!-- :disabled="false" معدل پاس دادن -->
<MyComponent />
```

هنگامی که یک برای یک پراپ چندین نوع تعریف کرده‌ایم، قوانین تبدیل نوع داده برای `Boolean` هم اعمال خواهد شد. اگرچه هنگام استفاده همزمان از دو نوع منطقی (boolean) و رشته (string) یک نکته وجود دارد، قانون تبدیل نوع داده منطقی فقط زمانی اعمال می شود که ابتدا نوع داده منطقی (boolean) قبل از رشته (string) ذکر شود.

<div class="composition-api">

```js
// true تبدیل می‌شود به disabled
defineProps({
  disabled: [Boolean, Number]
})
  
// true تبدیل می‌شود به disabled
defineProps({
  disabled: [Boolean, String]
})
  
// true تبدیل می‌شود به disabled
defineProps({
  disabled: [Number, Boolean]
})
  
// به یک رشته خالی تبدیل می‌شود disabled
defineProps({
  disabled: [String, Boolean]
})
```

</div>
<div class="options-api">

```js
// true تبدیل می‌شود به disabled
export default {
  props: {
    disabled: [Boolean, Number]
  }
}
  
// true تبدیل می‌شود به disabled
export default {
  props: {
    disabled: [Boolean, String]
  }
}
  
// true تبدیل می‌شود به disabled
export default {
  props: {
    disabled: [Number, Boolean]
  }
}
  
// به یک رشته خالی تبدیل می‌شود disabled
export default {
  props: {
    disabled: [String, Boolean]
  }
}
```

</div>
