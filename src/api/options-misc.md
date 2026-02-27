# Options: متفرقه (Misc) {#options-misc}

## نام {#name}

به صراحت یک نام نمایشی (display name) برای کامپوننت تعریف می‌‌کند.

- **تایپ (Type)**

  ```ts
  interface ComponentOptions {
    name?: string
  }
  ```

- **جزئیات**

  نام کامپوننت برای موارد زیر استفاده می‌شود:

  - خود ارجاعی بازگشتی (Recursive self-reference) در تمپلیت خود کامپوننت
  - نمایش در درخت بازرسی (inspection tree) کامپوننت متعلق به Vue DevTools
  - نمایش در trance‌های کامپوننت اخطار (warning)

  زمانی که از کامپوننت‌های تک فایلی استفاده می‌کنید کامپوننت از قبل نام خود را از نام فایل می‌خواند (infer می‌کند). برای مثال یک فایل با نام `MyComponent.vue` نام نمایشی "MyComponent" را می‌خواند.

  مورد دیگر زمانی است که یک کامپوننت به صورت سراسری (global) با [`app.component`](/api/application#app-component) ثبت شده باشد که در این صورت آیدی سراسری به شکل خودکار به عنوان نام کامپوننت قرار می‌گیرد.
  
  آپشن `name` به شما اجازه می‌دهد که نام infer شده را نادیده بگیرید یا زمانی که هیچ نامی نمی‌تواند infer شود به صورت مشخص یک نام تعیین کنید (برای مثال زمانی که از ابزارهای ساخت (build tools) استفاده نمی‌شود یا در یک کامپوننت غیر تک فایلی که به صورت inline هستند)
  
  یک مورد وجود دارد که نام صراحتاً ضروری است: هنگام تطبیق با کامپوننت‌های قابل کش در [`<KeepAlive>`](/guide/built-ins/keep-alive) از طریق propهای `include / exclude` آن.
  
  :::tip نکته
  از نسخه 3.2.34, یک کامپوننت تک فایلی با استفاده از `<script setup>` به شکل خودکار آپشن `name` خود را بر اساس نام فایل infer می‌کند که نیاز به تعریف نام را حتی زمان استفاده از `<KeepAlive>` از بین می‌برد.
  :::

## آپشن inheritAttrs {#inheritattrs}

 اینکه رفتار پیش‌فرض attribute fallthrough متعلق به کامپوننت فعال باشد را کنترل می‌کند.

- **تایپ (Type)**

  ```ts
  interface ComponentOptions {
    inheritAttrs?: boolean // default: true
  }
  ```

- **جزئیات**

  به صورت پیش‌فرض ویژگی‌های پیوندی (attribute binding) مربوط به اسکوپ کامپوننت والد که به عنوان props تشخیص داده نشدند "fallthrough" خواهند کرد. این به این معنی است که وقتی یک تک کامپوننت ریشه‌ای (single-root component) داشته باشیم این پیوندها به عنوان ویژگی‌های معمولی HTML به کامپوننت ریشه فرزند اعمال می شود. این ممکن است در زمان نوشتن یک کامپوننت که یک المنت هدف یا کامپوننت دیگر را در بر می‌گیرد (wraps) رفتار دلخواه ما نباشد. با تنظیم `inheritAttrs` روی `false` این رفتار پیش‌فرض را می‌توان غیرفعال کرد. ویژگی‌ها از طریق پراپرتی‌های نمونه (instance) `attrs$` در دسترس هستند و می‌توانند به طور صریح به یک المنت غیر root با استفاده از `v-bind` متصل شوند.

- **مثالها**

  <div class="options-api">

  ```vue
  <script>
  export default {
    inheritAttrs: false,
    props: ['label', 'value'],
    emits: ['input']
  }
  </script>

  <template>
    <label>
      {{ label }}
      <input
        v-bind="$attrs"
        v-bind:value="value"
        v-on:input="$emit('input', $event.target.value)"
      />
    </label>
  </template>
  ```

  </div>
  <div class="composition-api">

  زمانی تعریف این آپشن در یک کامپوننت که از `<script setup>` استفاده می‌کند شما می‌توانید از ماکرو [`defineOptions`](/api/sfc-script-setup#defineoptions) استفاده کنید.
  
  ```vue
  <script setup>
  defineProps(['label', 'value'])
  defineEmits(['input'])
  defineOptions({
    inheritAttrs: false
  })
  </script>

  <template>
    <label>
      {{ label }}
      <input
        v-bind="$attrs"
        v-bind:value="value"
        v-on:input="$emit('input', $event.target.value)"
      />
    </label>
  </template>
  ```

  </div>

- **همچنین ببینید**

  - [اتریبیوت‌های fallthrough](/guide/components/attrs)
  <div class="composition-api">

  - [استفاده از `inheritAttrs` در `‎<script>‎`](/api/sfc-script-setup.html#usage-alongside-normal-script)
  </div>

## کامپوننت‌‌ها {#components}

یک آبجکت که کامپوننت‌ها را ثبت می‌کند تا در دسترس نمونه‌ی کامپوننت (component instance) باشد.

- **تایپ (Type)**

  ```ts
  interface ComponentOptions {
    components?: { [key: string]: Component }
  }
  ```

- **نمونه**

  ```js
  import Foo from './Foo.vue'
  import Bar from './Bar.vue'

  export default {
    components: {
      // shorthand
      Foo,
      // register under a different name
      RenamedBar: Bar
    }
  }
  ```

- **همچنین ببینید** [Component Registration](/guide/components/registration)

## دایرکتیوها (directives) {#directives}

یک آبجکت که دایرکتیوها را ثبت می‌کند که در دسترس نمونه‌ی کامپوننت باشد.

- **تایپ (Type)**

  ```ts
  interface ComponentOptions {
    directives?: { [key: string]: Directive }
  }
  ```

- **نمونه‌ها**

  ```js
  export default {
    directives: {
      // enables v-focus in template
      focus: {
        mounted(el) {
          el.focus()
        }
      }
    }
  }
  ```

  ```vue-html
  <input v-focus>
  ```

- **همچنین ببینید** [Custom Directives](/guide/reusability/custom-directives)
