# Options: ترکیب بندی (Composition) {#options-composition}

##  متد ()provide {#provide}


یک مقدار 
(value)
 را برای 
 inject 
 کردن در کامپوننت‌های فرزند فراهم می‌کند.

- **تایپ (Type)**

  ```ts
  interface ComponentOptions {
    provide?: object | ((this: ComponentPublicInstance) => object)
  }
  ```

- **جزئیات**

توابع `provide` و ‍[`inject`](#inject) در کنار هم استفاده می‌شوند تا به کامپوننت‌های والد اجازه دهند به عنوان dependency injector  نسبت به کامپوننت‌های فرزند عمل کنند، بدون در نظر گرفتن اینکه سلسله مراتب کامپوننت‌ها چقدر عمیق هستند تا زمانی که همگی داخل یک زنجیر والد (parent chain) باشند.

آپشن `provide` باید object یا یک تابع که یک object بازگردانی می‌کند باشد. این object شامل پراپرتی‌هایی است که برای inject در فرزندان در دسترس هستند. شما می‌توانید از Symbol ها به عنوان کلید (key) در این object استفاده کنید.



- **مثالها**

استفاده به صورت basic:

  ```js
  const s = Symbol()

  export default {
    provide: {
      foo: 'foo',
      [s]: 'bar'
    }
  }
  ```

استفاده از یک تابع برای provide کردن state یک کامپوننت:

  ```js
  export default {
    data() {
      return {
        msg: 'foo'
      }
    }
    provide() {
      return {
        msg: this.msg
      }
    }
  }
  ```
در مثال بالا توجه کنید که provide `msg` درواقع reactive نخواهد بود. برای جزئیات بیشتر بخش [Working with Reactivity](/guide/components/provide-inject#working-with-reactivity) را ببینید.

- **همچنین ببینید** [Provide / Inject](/guide/components/provide-inject)

## تابع ()inject {#inject}

پراپرتی‌هایی برای inject  کردن در کامپوننت حاضر با مکان‌یابی آن‌ها از ancestor providerها تعریف می‌کند. 

- **تایپ (Type)**

  ```ts
  interface ComponentOptions {
    inject?: ArrayInjectOptions | ObjectInjectOptions
  }

  type ArrayInjectOptions = string[]

  type ObjectInjectOptions = {
    [key: string | symbol]:
      | string
      | symbol
      | { from?: string | symbol; default?: any }
  }
  ```

- **جزئیات**

آپشن `inject` باید یکی از حالت‌های زیر باشد: 

- آرایه‌ای از stringها
- یا یک آبجکت که کلیدهای آن local binding name هستند و مقادیر آن یکی از موارد زیر است:
  - یک کلید (string یا Symbol) برای جستجو در injectionهای قابل دسترس
  - یا یک object که در آن:
    - پراپرتی ‍`from` کلیدی است (string یا Symbol) برای جستجو در injectionهای در دسترس
    - پراپرتی `default` به عنوان یک  fallback value استفاده می‌شود. همانند مقدار پیش‌فرض برای props یک تابع factory برای object typesها نیاز است تا از اشتراک value بین چندین component instance جلوگیری کند
    
اگر هیچ پراپرتی match شده و یا مقدار پیشفرضی provide نشده باشد، injected property برابر با undefined خواهد بود.

- **مثالها**

  استفاده به صورت Basic:

  ```js
  export default {
    inject: ['foo'],
    created() {
      console.log(this.foo)
    }
  }
  ```

 استفاده از injected value به عنوان مقدار پیشفرض برای یک prop:

  ```js
  const Child = {
    inject: ['foo'],
    props: {
      bar: {
        default() {
          return this.foo
        }
      }
    }
  }
  ```

استفاده از injected value به عنوان ورودی data:

  ```js
  const Child = {
    inject: ['foo'],
    data() {
      return {
        bar: this.foo
      }
    }
  }
  ```

Injection ها می توانند با مقدار پیش فرض اختیاری باشند:

  ```js
  const Child = {
    inject: {
      foo: { default: 'foo' }
    }
  }
  ```

اگر هم نیاز به inject کردن آن از یک پراپرتی با نام متفاوت باشد میتوان از `from` برای مشخص کردن source property استفاده نمود

  ```js
  const Child = {
    inject: {
      foo: {
        from: 'bar',
        default: 'foo'
      }
    }
  }
  ```

همانند prop defaults، شما باید از یک تابع factory برای مقادیر non-primitive استفاده کنید


  ```js
  const Child = {
    inject: {
      foo: {
        from: 'bar',
        default: () => [1, 2, 3]
      }
    }
  }
  ```

- **همچنین ببینید** [Provide / Inject](/guide/components/provide-inject)

## میکسین‌ها (mixins) {#mixins}

یک آرایه از option objectها برای ترکیب شدن در کامپوننت حاضر.

- **تایپ (Type)**

  ```ts
  interface ComponentOptions {
    mixins?: ComponentOptions[]
  }
  ```

- **جزئیات**

آپشن mixins یک آرایه از mixin objectها را می‌پذیرد. این mixin objectها می‌توانند شامل instance optionها مانند instance objectهای عادی باشند و در نهایت با optionهای نهایی با استفاده از منطق مشخص ادغام optionها ادغام خواهند شد. به عنوان مثال، اگر mixin شما یک هوک created داشته باشد و خود کامپوننت هم یک هوک مشابه داشته باشد، هر دو تابع فراخوانی خواهند شد.

هوک‌های mixin به ترتیبی که provide شده‌اند و قبل از هوک‌های خود کامپوننت فراخوانی می‌شوند.

  :::warning دیگر پیشنهاد نمی‌شود
  در 2 Vue میکسین ها (mixins) مکانیزم اصلی برای ساخت تکه‌های قابل استفاده مجدد از کامپوننت‌ها بودند. درحالی که mixinها در Vue 3 پشتیبانی میشوند با این حال [ توابع Composable با استفاده از Composition API](/guide/reusability/composables) حالا راه حل مقدم‌تر و ترجیح داده شده برای استفاده مجدد از کدها بین کامپوننت‌هاست.
  :::

- **مثالها**

  ```js
  const mixin = {
    created() {
      console.log(1)
    }
  }

  createApp({
    created() {
      console.log(2)
    },
    mixins: [mixin]
  })

  // => 1
  // => 2
  ```

## گسترش دادن (extends) {#extends}

یک کامپوننت base class برای extand کردن از آن.

- **تایپ(Type)**

  ```ts
  interface ComponentOptions {
    extends?: ComponentOptions
  }
  ```

- **جزئیات**

به یک کامپوننت اجازه می‌دهد تا دیگری را extend کند و optionهای کامپوننت را به ارث ببرد.

از دیدگاه پیاده‌سازی، extends تقریباً همانند mixins است. کامپوننت مشخص‌شده توسط extends به عنوان اینکه یک mixin اولیه باشد، پردازش خواهد شد.

با این حال `extends` و `mixins` اهداف مختلفی را بیان می‌کنند. آپشن `mixins` در اصل برای ساخت تکه‌های (chunks) یک functionality استفاده می‌شود در حالی که `extends` به طور اساسی برای بحث وراثت (inheritance) مورد استفاده قرار می‌گیرد.

همانند `mixins` هر option (بجز ()setup) توسط استراتژی‌های مرج رایج مرج خواهد شد.

- **مثال**

  ```js
  const CompA = { ... }

  const CompB = {
    extends: CompA,
    ...
  }
  ```

  :::warning برای Composition API توصیه نمی‌شود
  `extends` برای `Options API` طراحی شده است و merging متعلق به هوک `()setup` را handle نمی‌کند.

  در Composition API مدل ذهنی که نسبت به وراثت  برای logic reuse ترجیح داده می‌شود "compose" است. اگر شما منطقی در یک کامپوننت دارید که نیاز به استفاده مجدد از آن در کامپوننت دیگر است منطق مد نظر را به یک Composable انتقال دهید.

  اگر همجنان قصد دارید توسط Composition API یک کامپوننت را extend کنید می‌توانید `()setup` متعلق به کامپوننت base را داخل ‍`()setup` متعلق به کامپوننتی که می‌خواهید extend کنید فراخوانی کنید:

  ```js
  import Base from './Base.js'
  export default {
    extends: Base,
    setup(props, ctx) {
      return {
        ...Base.setup(props, ctx),
        // local bindings
      }
    }
  }
  ```
  :::
