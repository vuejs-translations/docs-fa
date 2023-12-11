# پراپ ها {#props}

> در این صفحه فرض شده است شما از قبل [مبانی کامپوننت ها](/guide/essentials/component-basics) را مطالعه کرده اید.اگر با مبحث کامپوننت ها آشنا نیستید صفحه معرفی شده را بخوانید.

<div class="options-api">
  <VueSchoolLink href="https://vueschool.io/lessons/vue-3-reusable-components-with-props" title="Free Vue.js Props Lesson"/>
</div>

## تعریف کردن پراپ ها {#props-declaration}

کامپوننت های Vue باید بصورت مشخص پراپ هایی تعریف شده داشته باشند تا Vue بداند پراپ هایی که از خارج کامپوننت به آن پاس داده شده را بصورت fallthrought attributes ( که در [بخش مخصوص خودش](/guide/components/attrs) توضیح داده شده ) برخورد کند.

<div class="composition-api">

هنگام استفاده از SFCها در `<script setup>`، پراپ ها با استفاده از ماکروی `defineProps()` میتوانند تعریف شوند:

```vue
<script setup>
const props = defineProps(['foo'])

console.log(props.foo)
</script>
```

در کامپوننت هایی که از `<script setup>` استفاده نمی شود، پراپ ها میتوانند بصورت آپشن [`props`](/api/options-state#props) تعریف شوند:

```js
export default {
  props: ['foo'],
  setup(props) {
  // .پراپ ها هستند setup() اولین آرگیومنت دریافتی در 
  console.log(props.foo)
  }
}
```

توجه داشته باشید آرگیومنتی که به `defineProps()` پاس داده می شود همان مقداری است که توسط آپشن `props` بدست می آید. همان پراپ های options API بین دو روش تعریف پراپ مشترک هستند.

</div>

<div class="options-api">

پراپ ها در option API بصورت [`props`](/api/options-state#props) تعریف می شنود:

```js
export default {
  props: ['foo'],
  created() {
    // پراپ ها از `this` قابل دسترسی هستند
    console.log(this.foo)
  }
}
```
</div>

پراپ ها علاوه بر این که میتوانند بصورت آرایه تغریف شوند، قابلیت تعریف شدن بصورت آبجکت ها را هم دارند:

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

برای هر پراپرتی در سینتکس تعریف کردن پراپ بصورت آبجکت، کلید ( key ) اسم پراپ خواهد بود، در صورتی که مقدار ( value ) باید بصورت یک تابع سازنده از تایپ مقدار آن باشد.
این فقط مستندات و اطلاعات کامپوننت شما نیست، اگر دیگر توسعه دهندگان از تایپ هایی بجز آن تایپی که در کامپوننت تعریف شده استفاده کنند، در کنسول هشداری در ارتباط با تایپ اشتباه مشاهده می شود.
درباره جزئیات [اعتبارسنجی پراپ ها ( Props Validation )](#prop-validation) در ادامه مستندات توضیح داده شده است.

<!-- leftover -->
<div class="options-api">

مشاهده کنید: [Typing Component Props](/guide/typescript/options-api#typing-component-props) <sup class="vt-badge ts" />

</div>

<div class="composition-api">

اگر همراه با `<script setup>` از Typescript استفاده میکنید، میتوانید با استفاده از pure type annotations پراپ ها را تعریف کنید:

```vue
<script setup lang="ts">
defineProps<{
  title?: string
  likes?: number
}>()
</script>
```
<!-- leftover -->
اطلاعات بیشتر: [Typing Component Props](/guide/typescript/composition-api#typing-component-props) <sup class="vt-badge ts" />

</div>

## پاس دادن پراپ ها {#prop-passing-details}

### نگارش اسم پراپ ها {#prop-name-casing}

برای تعریف کردن اسامی پراپ های طولانی از نگارش camelCase استفاده میکنیم چرا که باعث می شود هنگام استفاده کردن از آن ها به عنوان کلید های پراپرتی نیازی به استفاده از quotes نباشد، و به ما اجازه میدهد که به صورت مستقیم در template expressions به آنها رفرنس بدهیم چرا که شناسه گرهای معتبر جاوااسکریپت هستند.

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

از نظر فنی، میتوانید هنگام پاس دادن پراپ به کامپوننت فرزند از نگارش camelCase استفاده کنید ( [بجز in-DOM templates](/guide/essentials/component-basics#in-dom-template-parsing-caveats) ).
اگرچه روش معمول استفاده از نگارش kebab-case میباشد که با HTML attributeها از یک نگارش واحد پیروی کنند.

```vue-html
<MyComponent greeting-message="hello" />
```

ما از [نگارش PascalCase برای تگ های کامپوننت](/guide/components/registration#component-name-casing) استفاده میکنیم، برای اینکه شناسایی بین native element ها و کامپوننت های Vue راحت تر تفاوت مشخص می شود.
اگرچه خیلی سود کاربردی در استفاده کردن نگارش pascalCase برای پاس دادن پراپ ها وجود ندارد، به همین دلیل تصمیم گرفتیم از روش های معمول زبان ها استفاده کنیم.

### پراپ های استاتیک و داینامیک {#static-vs-dynamic-props}

تاکنون پراپ های استاتیک را دیده ایم، به این شکل:

```vue-html
<BlogPost title="My journey with Vue" />
```

همچنین دیده ایم که پراپ ها با استفاده از `v-bind` یا میانبر `:` به یک مقدار داینامیک نسبت داده شده اند، به این شکل:

```vue-html
<!-- نسبت دادن به یک متغیر بصورت داینامیک -->
<BlogPost :title="post.title" />

<!-- نسبت دادن به یک عبارت بصورت داینامیک -->
<BlogPost :title="post.title + ' by ' + post.author.name" />
```

### انتقال مقادیر با نوع های متفاوت {#passing-different-value-types}
در دو مثال بالا، ما دو مقدار با نوع رشته ( string ) پاس داده ایم، اما می توان هر مقدار با هر نوعی به یک پراپ پاس داد.

#### عدد {#number}

```vue-html
<!-- اگرچه `42` استاتیک است، به v-bind نیاز داریم تا به Vue بگوییم -->
<!-- این یک عبارت جاوااسکریپتی است نه یک رشته. -->
<BlogPost :likes="42" />

<!-- نسبت دادن به یک متغیر بصورت داینامیک -->
<BlogPost :likes="post.likes" />
```

#### بولین ( boolean ) {#boolean}

```vue-html
<!-- است `true` نوشتن تنها نام پراپ بدون مقدار به معنی مقدار  -->
<BlogPost is-published />

<!-- اگرچه `false` استاتیک است، به v-bind نیاز داریم تا به ویو بگوییم  -->
<!-- یک عبارت جاوااسکریپتی است نه یک رشته-->

<BlogPost :is-published="false" />

<!-- نسبت دادن به یک متغیر بصورت داینامیک -->
<BlogPost :is-published="post.isPublished" />
```

#### آرایه {#array}

```vue-html
<!-- نیاز داریم تا به ویو بگوییمv-bind اگرچه یک آرایه استایتک است اما به -->
<!-- یک عبارت جاوااسکریپتی است نه یک رشته -->
<BlogPost :comment-ids="[234, 266, 273]" />

<!-- نسبت دادن به یک متغیر بصورت داینامیک -->
<BlogPost :comment-ids="post.commentIds" />
```

#### آبجکت {#object}

```vue-html
<!-- نیاز داریم تا به ویو بگوییمv-bind اگرچه یک آبجکت استایتک است اما به -->
<!-- یک عبارت جاوااسکریپتی است نه یک رشته  -->
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

اگر میخواید تمام پراپرتی های یک آبجکت را به عنوان پراپ پاس بدهید، می توانید از [`v-bind` بدون آرگیومنت](/guide/essentials/template-syntax#dynamically-binding-multiple-attributes) (`v-bind` به جای `:prop-name`).
به عنوان مثال، به آبجکت `post` توجه کنید:

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
همه پراپ ها **one-way-down binding** بین پراپرتی کامپوننت فرزند و والد هستند: وقتی پراپرتی کامپوننت والد آپدیت می شود، باعث اپدیت شدن کامپوننت فرزند می شود، اما عکس این اتفاق نمی افتد.
این از آپدیت کردن تصادفی استیت والد در کامپوننت فرزند جلوگیری میکند، که باعث می شود جریان انتقال داده در برنامه سخت تر قابل فهم شود.

به علاوه، هربار که کامپوننت والد آپدیت می شود، تمام پراپ ها در کامپوننت فرزند به آخرین و جدیدترینن مقدار آپدیت می شوند.
این به این معناست که **نباید** سعی به آپدیت کردن پراپ درون کامپوننت فرزند کرد، اگر این کار را انجام دهید، Vue در کنسول یک هشدار خواهد داد:

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

معمولا در دو حالت است که میخواهیم یک پراپ را mutate یا مقدار آن را آپدیت کنیم:

1. **از پراپ برای مقدار دهی اولیه استفاده می شود;  کامپوننت فرزند میخواهد از پراپ به عنوان داده ی محلی خودش استفاده کند.** 
در این حالت بهترین راه این است که یک متغیر محلی تعریف کرده و مقدار اولیه اش را به عنوان مقدار اولیه به پراپی که میخواهیم اساین کنیم:

   <div class="composition-api">

   ```js
   const props = defineProps(['initialCounter'])

   // از props.initialCounter فقط به عنوان مقدار اولیه استفاده میکند counter ;
   // بعد از آپدیت شدن، از props.initialCounter غیرمتصل می شود.
   const counter = ref(props.initialCounter)
   ```

   </div>
   <div class="options-api">

   ```js
   export default {
     props: ['initialCounter'],
     data() {
       return {
         // counter only uses this.initialCounter as the initial value;
         // it is disconnected from future prop updates.
         counter: this.initialCounter
       }
     }
   }
   ```

   </div>

2. **پراپی که به کامپوننت پاس داده شده است، به خودی خود قابل استفاده نیست و نیازمند اعمال تغییرات است.** در این صورت, بهترین کار استفاده کردن از computed است:

   <div class="composition-api">

   ```js
   const props = defineProps(['size'])

   //  بصورت خودکار آپدیت می شود props.size پراپرتی کامپیوتد با هربار آپدیت شدن. 
   const normalizedSize = computed(() => props.size.trim().toLowerCase())
   ```

   </div>
   <div class="options-api">

   ```js
   export default {
     props: ['size'],
     computed: {
       //  بصورت خودکار آپدیت می شود props.size پراپرتی کامپیوتد با هربار آپدیت شدن. 
       normalizedSize() {
         return this.size.trim().toLowerCase()
       }
     }
   }
   ```

   </div>

### آپدیت کردن پراپ های آبجکت / آرایه {#mutating-object-array-props}

وقتی آبجکت یا آرایه به عنوان پراپ پاس داده می شوند، در حالی که کامپوننت فرزند نمی تواند prop binding را آپدیت کند، **اما میتواند** پراپرتی های ابجکت یا آرایه ها را آپدیت کند.
دلیل این موضوع این است که در جاوااسکریپت آبجکت ها و آرایه ها passed by reference هستند، و به دیلی نامعقولی هزینه ی زیادی برای Vue دارد که از چنین آپدیت هایی جلوگیری کند.

اصلی ترین عیب چنین آپدیت هایی این است که اجازه می دهد دیتا و استیت کامپوننت والد را به گونه ای اتفاق بیفتد که برای کامپوننت والد مشخص نیست، و به احتمال زیاد باعث سخت تر شدن پیگیری و تشخیص جریان داده (data flow) در  آینده می شود. بهترین راهکار این است که تا حد امکان از آپدیت هایی که به این صورت هستند دوری کرد مگر اینکه کامپوننت های والد و فرزند نزدیکی زیادی باهم داشته باشند.
در اکثر مواقع، کامپوننت فرزند باید یک [event را emit کند](/guide/components/events) تا به کامپوننت والد بگوید آپدیت را ممکن سازد. 

## اعتبارسنجی پراپ ها {#prop-validation}

کامپوننت ها می توانند نیازمندی هایی را برای پراپ ها مشخص کنند، به عنوان مثلا نوع پراپ که در بالاتر به آن اشاره کردیم. اگر نیازمندی به درستی مشخص نشده باشد Vue در کنسول مرورگر هشدار خواهد داد. هنگامی که یک کامپوننت را توسعه میدهیم که بقیه توسعه دهدنگان از آن استفاده کنند، این ویژگی به شدت مفید خواهد بود. 

برای مشخص کردن نیازمندی های یک  پراپ به جای آرایه ای از رشته ها، میتوان یک آبجکت با اعتبارسنجی از نیازمندی ها به 
<span class="composition-api">ماکروی `defineProps()`</span>
<span class="options-api">`props` آپشن</span>
پاس داد.


<div class="composition-api">

```js
defineProps({
  // بررسی نوع ساده
  // اجازه هر نوعی را می دهند `null` and `undefined` .
  propA: Number,
  // چندین نوع ممکن
  propB: [String, Number],
  // نوع رشته الزامی
  propC: {
    type: String,
    required: true
  },
  // نوع عدد با مقدار پیش فرض
  propD: {
    type: Number,
    default: 100
  },
  // نوع آبجکت با مقدار پیش فرض
  propE: {
    type: Object,
    // آبجکت یا آرایه با مقدار پیش فرض باید از طریق
    // برگردانده شود factory function
    //  پراپ توسط کامپوننت به عنوان آرگیومنت دریافت می شود.
    default(rawProps) {
      return { message: 'hello' }
    }
  },
  // تابع اعتبارسنجی سفارشی
  propF: {
    validator(value) {
      // باید یکی از سه مقدار زیر باشد value
      return ['success', 'warning', 'danger'].includes(value)
    }
  },
  // تابع با مقدار پیش فرض
  propG: {
    type: Function,
    // برخلاف آبجکت یا آرایه، `default` یک تابع سازنده نیست
    // این خود این تابع به عنوان یک مقدار پیش فرض به شمار میرود
    default() {
      return 'Default function'
    }
  }
})
```


:::tip
کد داخل `defineProps()` **به بقیه متغیر های تعریف شده در `<script setip> دسترسی ندارد`**، به این دلیل که این عبارت هنگام کامپایل به یک فانکشن خارجی منتفل می شود. 
:::

</div>
<div class="options-api">

```js
export default {
  props: {
    // بررسی نوع ساده
    // اجازه هر نوعی را می دهند `null` and `undefined` .
    propA: Number,
    // چندین نوع ممکن
    propB: [String, Number],
    // نوع رشته الزامی
    propC: {
      type: String,
      required: true
    },
    // نوع عدد با مقدار پیش فرض
    propD: {
      type: Number,
      default: 100
    },
    // نوع آبجکت با مقدار پیش فرض
    propE: {
      type: Object,
      // آبجکت یا آرایه با مقدار پیش فرض باید از طریق
      // برگردانده شود factory function
      //  پراپ توسط کامپوننت به عنوان آرگیومنت دریافت می شود.
      default(rawProps) {
        return { message: 'hello' }
      }
    },
    // تابع اعتبارسنجی سفارشی
    propF: {
      validator(value) {
        // باید یکی از سه مقدار زیر باشد value
        return ['success', 'warning', 'danger'].includes(value)
      }
    },
    // تابع با مقدار پیش فرض
    propG: {
      type: Function,
      // برخلاف آبجکت یا آرایه، `default` یک تابع سازنده نیست
      // این خود این تابع به عنوان یک مقدار پیش فرض به شمار میرود
      default() {
        return 'Default function'
      }
    }
  }
}
```

</div>

توضیحات بیشتر:

- پیش فرض همه پراپ ها اختیاری است، مگر اینکه `required: true` مشخص شده باشد.

- پراپی که تایپ آن منطقی (boolean) نباشد، در صورت عدم داشتن مقدار، مقدار `undefiend` خواهند داشت.

- عدم مقداردهی پراپ نوع غیرمنطقی (non-boolean types) مقدار `false` خواهد داشت. میتوان این تنظیمات را با مقداردهی مقدار پیش فرض تغییر داد. `default: undefined` تا رفتاری مانند نوع های non-Booleanها داشته باشد.

- اگر مقدار `default` مشخص شده باشد، استفاده خواهد شد اگر مقدار پراپ `undefiend` باشد.
-این مورد شامل شرایطی است که پراپ مقدار دهی نشده است یا مقدار آن `undefined` پاس داده شده است.

هنگامی که اعتبار سنجی prop ناموفق باشد، Vue یک هشدار کنسول (در صورت استفاده از ساخت توسعه) تولید می کند.

<div class="composition-api">

اگر از [Type-based props declarations](/api/sfc-script-setup#type-only-props-emit-declarations) <sup class="vt-badge ts" /> استفاده میکنید، Vue سعی میند تا به بهترین شکل ممکن type annotaions را با معادل runtime prop declarations معادل سازی کند. برای مثال `defineProps<{ msg: string }>` بعد از کامپایل به  `{ msg: { type: String, required: true }}` تبدیل می شود.

</div>
<div class="options-api">

::: tip Note
توجه داشته باشید که props **قبل از** ایجاد یک نمونه جزء تایید می‌شود، بنابراین ویژگی‌های نمونه (مانند "data"، "computed" و غیره) در توابع "default" یا "validator" در دسترس نخواهند بود.
:::

</div>

### Runtime Type Checks {#runtime-type-checks}

`نوع` می تواند یکی از تایپ های زیر باشد:

- `رشته ها`
- `عدد`
- `بولین`
- `آرایه`
- `آبجکت`
- `تاریخ`
- `تابع`
- `سیمبل`


علاوه بر این، «type» همچنین می‌تواند یک کلاس سفارشی یا تابع سازنده باشد و این ادعا با بررسی «instanceof» انجام می‌شود. به عنوان مثال، با توجه به کلاس زیر:

```js
class Person {
  constructor(firstName, lastName) {
    this.firstName = firstName
    this.lastName = lastName
  }
}
```

می توانید از آن به عنوان یک نوع استفاده کنید:

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

Vue از `instanceof Person` برای اعتبارسنجی اینکه آیا مقدار پراپ `author` واقعا از

## تبدیل نوع داده منطقی (Boolean casting) {#boolean-casting}

پراپ ها با نوع داده منطقی (boolean) قانون تبدیل خاصی دارند تا بتوانند مدل رفتاری اتریبیوت های نیتیو مرورگر را تقلید کنند.

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

هنگامی که یک برای یک پراپ چندین نوع تعریف کرده ایم، قوانین تبدیل نوع داده برای `Boolean` هم اعمال خواهد شد. اگرچه هنگام استفاده همزمان از دو نوع منطقی ( boolean ) و رشته ( string ) یک نکته وجود دارد، قانون تبدیل نوع داده منطقی فقط زمانی اعمال می شود که ابتدا نوع داده منطقی ( boolean ) قبل از رشته ( string ) ذکر شود.

<div class="composition-api">

```js
// true تبدیل میشود به disabled
defineProps({
  disabled: [Boolean, Number]
})
  
// true تبدیل میشود به disabled
defineProps({
  disabled: [Boolean, String]
})
  
// true تبدیل میشود به disabled
defineProps({
  disabled: [Number, Boolean]
})
  
// به یک رشته خالی تبدیل میشود disabled
defineProps({
  disabled: [String, Boolean]
})
```

</div>
<div class="options-api">

```js
// true تبدیل میشود به disabled
export default {
  props: {
    disabled: [Boolean, Number]
  }
}
  
// true تبدیل میشود به disabled
export default {
  props: {
    disabled: [Boolean, String]
  }
}
  
// true تبدیل میشود به disabled
export default {
  props: {
    disabled: [Number, Boolean]
  }
}
  
// به یک رشته خالی تبدیل میشود disabled
export default {
  props: {
    disabled: [String, Boolean]
  }
}
```

</div>
