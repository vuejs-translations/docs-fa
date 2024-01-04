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

    تمپلیتی که از طریق `تمپلیت` آپشن ارائه میشود، در زمان اجرا کامپایل خواهد شد. این تنها در صورتی پشتیبانی میشود که از یک سازه Vue که شامل تمپلیت کامپایلر است استفاده شود. تمپلیت کامپایلر شامل سازه Vueهایی که در نام خود کلمه `ران‌تایم` را دارند **نمیشود**، برای مثال `vue.runtime.esm-bundler.js`. برای جزئیات بیشتر در مورد سازه های مختلف، [راهنمای فایل](https://github.com/vuejs/core/tree/main/packages/vue#which-dist-file-to-use) را مطالعه کنید.
    
  اگر رشته با `#` شروع شود به عنوان یک `querySelector` استفاده میشود و از `innerHTML` المان انتخاب شده به عنوان رشته‌ی تمپلیت استفاده خواهد شد. این امکان را فراهم میکند که تمپلیت منبع با استفاده از المان‌های `<template>` اصلی نوشته شود.

  اگر گزینه `render` هم در همان کامپوننت موجود باشد، گزینه `template` نادیده گرفته خواهد شد.

  اگر کامپوننت ریشه برنامه شما گزینه‌های `template` یا `render` را مشخص نکرده باشد، Vue سعی میکند از `innerHTML` المان مونت شده به عنوان تمپلیت استفاده کند.

:::warning نکته امنیتی
فقط از منابع تمپلیتی استفاده کنید که به آنها اعتماد دارید. هرگز محتوای ارائه شده توسط کاربران دیگر را به عنوان تمپلیت خود استفاده نکنید. برای کسب اطلاعات بیشتر به [راهنمای امنیتی](/guide/best-practices/security#rule-no-1-never-use-non-trusted-templates) مراجعه کنید.
  :::

## رندر {#render}

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

  `رندر` یک جایگزین برای تمپلیت‌های رشته‌ای است که به شما این امکان را میدهد که از توان کامل برنامه‌نویسی جاوااسکریپت استفاده کنید تا خروجی رندر کامپوننت را اعلام کنید.

  تمپلیت‌های پیش کامپایل شده، به عنوان مثال تمپلیت‌های موجود در کامپوننت‌های تک فایل، در زمان ساخت به گزینه `رندر` تبدیل میشوند. اگر هر دو `رندر` و `تمپلیت` همزمان در یک کامپوننت وجود داشته باشند، گزینه `رندر` اولویت بالاتری خواهد داشت.

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

یک گزینه برای کمک به استخراج نوع استنتاج هنگام استفاده برنامه‌نویسی از اسلات‌ها در توابع رندر. تنها در نسخه 3.3 به بالا پشتیبانی میشود.

- **جزئیات**

  مقدار ران‌تایم این گزینه استفاده نمیشود. تایپ‌های واقعی باید از طریق تعیین تایپ با استفاده از کمک‌کننده تایپ `SlotsType` اعلام شوند.

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
