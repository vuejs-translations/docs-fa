# آپشن: رندر کردن {#options-rendering}

## تمپلیت {#template}

یک تمپلیت رشته ای برای کامپوننت.

- **تایپ**

  ```ts
  interface ComponentOptions {
    template?: string
  }
  ```

- **جزئیات**

  تمپلیتی که از طریق آپشن `template` ارائه می‌شود، در زمان اجرا کامپایل خواهد شد. این تنها در صورتی پشتیبانی می‌شود که از یک بیلد Vue که شامل کامپایلرِ تمپلیت است استفاده شود. کامپایلرِ تمپلیت شامل بیلدهایی از Vue که در نام خود کلمه `runtime` را دارند **نمی‌شود**، برای مثال `vue.runtime.esm-bundler.js`. برای جزئیات بیشتر در مورد بیلد‌های مختلف، [راهنمای فایل dist](https://github.com/vuejs/core/tree/main/packages/vue#which-dist-file-to-use) را مطالعه کنید.

  اگر رشته با `#` شروع شود به عنوان یک `querySelector` استفاده می‌شود و از `innerHTML` المان انتخاب شده به عنوان رشته‌ی تمپلیت استفاده خواهد شد. این امکان را فراهم می‌کند که تمپلیت منبع با استفاده از المان‌های `<template>` اصلی نوشته شود.

  اگر آپشن `render` هم در همان کامپوننت موجود باشد، آپشن `template` نادیده گرفته خواهد شد.

  اگر کامپوننت ریشه برنامه شما آپشن‌های `template` یا `render` را مشخص نکرده باشد، Vue سعی می‌کند از `innerHTML` المان mount شده به عنوان تمپلیت استفاده کند.

:::warning نکته امنیتی
فقط از منابع تمپلیتی استفاده کنید که به آنها اعتماد دارید. هرگز محتوای ارائه شده توسط کاربران دیگر را به عنوان تمپلیت خود استفاده نکنید. برای کسب اطلاعات بیشتر به [راهنمای امنیتی](/guide/best-practices/security#rule-no-1-never-use-non-trusted-templates) مراجعه کنید.
  :::

## render {#render}

تابعی که به صورت برنامه‌نویسی درخت DOM مجازی کامپوننت را بازمیگرداند.

- **تایپ**

  ```ts
  interface ComponentOptions {
    render?(this: ComponentPublicInstance) => VNodeChild
  }

  type VNodeChild = VNodeChildAtom | VNodeArrayChildren

  type VNodeChildAtom =
    | VNode
    | string
    | number
    | boolean
    | null
    | undefined
    | void

  type VNodeArrayChildren = (VNodeArrayChildren | VNodeChildAtom)[]
  ```

- **جزئیات**

  `render` یک جایگزین برای تمپلیت‌های رشته‌ای است که به شما این امکان می‌دهد از قدرت برنامه‌نویسی کامل جاوا اسکریپت برای تعریف خروجی رندر کامپوننت استفاده کنید.

  تمپلیت‌های پیش کامپایل شده، به عنوان مثال تمپلیت‌های موجود در کامپوننت‌های تک فایلی، در زمان بیلد به آپشن `render` تبدیل می‌شوند. اگر هر دو آپشن `render` و `template` همزمان در یک کامپوننت وجود داشته باشند، آپشن `render` اولویت بالاتری خواهد داشت.

- **همچنان دیدن کنید از**
  - [مکانیسم رندرینگ](/guide/extras/rendering-mechanism)
  - [توابع رندر](/guide/extras/render-function)

## گزینه های کامپایلر {#compileroptions}

پیکربندی گزینه‌های کامپایلر در زمان اجرا برای تمپلیت کامپوننت

- **تایپ**

  ```ts
  interface ComponentOptions {
    compilerOptions?: {
      isCustomElement?: (tag: string) => boolean
      whitespace?: 'condense' | 'preserve' // default: 'condense'
      delimiters?: [string, string] // default: ['{{', '}}']
      comments?: boolean // default: false
    }
  }
  ```

- **جزئیات**

  این گزینه پیکربندی تنها زمانی اعتبار دارد که از نسخه کامل (به عبارت دیگر `vue.js` مستقل که قادر به کامپایل تمپلیت‌ها در مرورگر است) استفاده میشود. این گزینه همان گزینه‌های مربوط به کامپایلر سطح برنامه [app.config.compilerOptions](/api/application#app-config-compileroptions) را پشتیبانی میکند و برای کامپوننت فعلی اولویت بالاتری دارد.

- **همچنان دیدن کنید از** [app.config.compilerOptions](/api/application#app-config-compileroptions)

## اسلات‌ها<sup class="vt-badge ts"/> {#slots}

یک آپشن برای کمک به استخراج type inference هنگام استفاده برنامه‌نویسی از اسلات‌ها در توابع رندر. تنها در نسخه 3.3 به بالا پشتیبانی می‌شود.

- **جزئیات**

  مقدار ران‌تایم این آپشن استفاده نمی‌شود. تایپ‌های واقعی باید از طریق تعیین تایپ با استفاده از کمک‌کننده تایپ `SlotsType` اعلام شوند.

  ```ts
  import { SlotsType } from 'vue'

  defineComponent({
    slots: Object as SlotsType<{
      default: { foo: string; bar: number }
      item: { data: number }
    }>,
    setup(props, { slots }) {
      expectType<
        undefined | ((scope: { foo: string; bar: number }) => any)
      >(slots.default)
      expectType<undefined | ((scope: { data: number }) => any)>(
        slots.item
      )
    }
  })
  ```
