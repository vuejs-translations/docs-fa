# تایپ‌های کاربردی {#utility-types}

:::info اطلاعات
این صفحه فقط چند تایپ کاربردی(utility types) را فهرست می‌کند که ممکن است برای استفاده از آنها نیاز به توضیح باشد. برای فهرست کامل تایپ‌های صادر شده، به [کد منبع](https://github.com/vuejs/core/blob/main/packages/runtime-core/src/index.ts#L131) مراجعه کنید.
:::

## PropType\<T> {#proptype-t}

برای یادداشت نویسی(annotate) یک پراپ با تایپ‌های پیشرفته‌تر (advanced types) هنگام استفاده از اعلامیه‌های پراپ‌های ران‌تایم استفاده می‌شود.

- **مثال**

  ```ts
  import type { PropType } from 'vue'

  interface Book {
    title: string
    author: string
    year: number
  }

  export default {
    props: {
      book: {
        // provide more specific type to `Object`
        type: Object as PropType<Book>,
        required: true
      }
    }
  }
  ```

- **همچنین ببینید** [Guide - Typing Component Props](/guide/typescript/options-api#typing-component-props)

## MaybeRef\<T> {#mayberef}

نام مستعار برای `T | Ref<T>‎`. مفید برای حاشیه نویسی آرگومان‌های [Composables](/guide/reusability/composables.html).

- فقط در 3.3+ پشتیبانی می‌شود.

## MaybeRefOrGetter\<T> {#maybereforgetter}

نام مستعار برای `T | Ref<T> | (() => T)‎`. مفید برای حاشیه نویسی آرگومان‌های [Composables](/guide/reusability/composables.html).

- فقط در 3.3+ پشتیبانی می‌شود.

## ExtractPropTypes\<T> {#extractproptypes}

تایپ‌های پراپ را از یک آبجکت آپشن‌های پراپ‌ها ران‌تایم استخراج کنید. تایپ‌های استخراج‌شده رو به داخل هستند - یعنی پراپ‌های حل‌شده توسط کامپوننت دریافت شده. این بدان معناست که پایه‌های بولی و پایه‌های با مقادیر پیش‌فرض همیشه تعریف می‌شوند، حتی اگر مورد نیاز نباشند.

برای استخراج کردن پراپ‌های عمومی، به‌عنوان مثال‌ پراپ‌هایی که والد مجاز به عبور از آن‌ است، از [`ExtractPublicPropTypes`](#extractpublicproptypes) استفاده کنید.

- **مثال**

  ```ts
  const propsOptions = {
    foo: String,
    bar: Boolean,
    baz: {
      type: Number,
      required: true
    },
    qux: {
      type: Number,
      default: 1
    }
  } as const

  type Props = ExtractPropTypes<typeof propsOptions>
  // {
  //   foo?: string,
  //   bar: boolean,
  //   baz: number,
  //   qux: number
  // }
  ```

## ExtractPublicPropTypes\<T> {#extractpublicproptypes}

تایپ‌های پراپ را از یک آبجکت آپشن‌های پراپ‌های ران‌تایم را استخراج کنید. تایپ‌های استخراج شده در معرض عموم قرار دارند - یعنی پراپ‌هایی که والد مجاز به عبور از آنها است.

- **مثال**

  ```ts
  const propsOptions = {
    foo: String,
    bar: Boolean,
    baz: {
      type: Number,
      required: true
    },
    qux: {
      type: Number,
      default: 1
    }
  } as const

  type Props = ExtractPublicPropTypes<typeof propsOptions>
  // {
  //   foo?: string,
  //   bar?: boolean,
  //   baz: number,
  //   qux?: number
  // }
  ```

## ComponentCustomProperties {#componentcustomproperties}

برای افزایش تایپ نمونه کامپوننت جهت پشتیبانی از پراپرتی‌های سراسری سفارشی استفاده می‌شود.

- **مثال**

  ```ts
  import axios from 'axios'

  declare module 'vue' {
    interface ComponentCustomProperties {
      $http: typeof axios
      $translate: (key: string) => string
    }
  }
  ```

  :::tip نکته
  افزایش‌ها باید در یک ماژول `‎.ts` یا `‎.d.ts` قرار گیرند. برای جزئیات بیشتر به [Type Augmentation Placement](/guide/typescript/options-api#augmenting-global-properties) مراجعه کنید.
  :::

- **همچنین ببینید** [Guide - Augmenting Global Properties](/guide/typescript/options-api#augmenting-global-properties)

## ComponentCustomOptions {#componentcustomoptions}

برای افزایش تایپ آپشن‌های کامپوننت جهت پشتیبانی از آپشن‌های سفارشی استفاده می‌شود.

- **مثال**

  ```ts
  import { Route } from 'vue-router'

  declare module 'vue' {
    interface ComponentCustomOptions {
      beforeRouteEnter?(to: any, from: any, next: () => void): void
    }
  }
  ```

  :::tip نکته
  افزایش‌ها باید در یک ماژول `‎.ts` یا `‎.d.ts` قرار گیرند. برای جزئیات بیشتر به [Type Augmentation Placement](/guide/typescript/options-api#augmenting-global-properties) مراجعه کنید.
  :::

- **همچنین ببینید** [Guide - Augmenting Custom Options](/guide/typescript/options-api#augmenting-custom-options)

## ComponentCustomProps {#componentcustomprops}

برای افزایش پراپ‌های مجاز TSX به منظور استفاده از پراپ‌های اعلام نشده (non-declared) در عناصر TSX استفاده می‌شود.

- **مثال**

  ```ts
  declare module 'vue' {
    interface ComponentCustomProps {
      hello?: string
    }
  }

  export {}
  ```

  ```tsx
  // now works even if hello is not a declared prop
  <MyComponent hello="world" />
  ```

  :::tip نکته
  افزایش‌ها باید در یک ماژول `‎.ts` یا `‎.d.ts` قرار گیرند. برای جزئیات بیشتر به [Type Augmentation Placement](/guide/typescript/options-api#augmenting-global-properties) مراجعه کنید.
  :::

## CSSProperties {#cssproperties}

برای افزایش مقادیر مجاز در پراپرتی‌های متصل کردن استایل استفاده می‌شود.

- **مثال**

  اجازه دادن به هر پراپرتی سفارشی CSS

  ```ts
  declare module 'vue' {
    interface CSSProperties {
      [key: `--${string}`]: string
    }
  }
  ```

  ```tsx
  <div style={ { '--bg-color': 'blue' } }>
  ```

  ```html
  <div :style="{ '--bg-color': 'blue' }"></div>
  ```

:::tip نکته
افزایش‌ها باید در یک ماژول `‎.ts` یا `‎.d.ts` قرار گیرند. برای جزئیات بیشتر به [Type Augmentation Placement](/guide/typescript/options-api#augmenting-global-properties) مراجعه کنید.
:::

:::info همچنین ببینید
تگ‌های `<style>` یک SFC از لینک کردن مقادیر CSS به استیت‌های پویا کامپوننت با استفاده از تابع `v-bind` CSS پشتیبانی می‌کنند. این امکان را برای پراپرتی‌های سفارشی بدون افزایش تایپ فراهم می کند.

- [v-bind() in CSS](/api/sfc-css-features#v-bind-in-css)
  :::
