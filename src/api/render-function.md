# Render Function APIs {#render-function-apis}

## h()‎ {#h}

گره‌های DOM مجازی (virtual DOM) یا به اصطلاح vnode می‌سازد.

- **تایپ**

  ```ts
  // full signature
  function h(
    type: string | Component,
    props?: object | null,
    children?: Children | Slot | Slots
  ): VNode

  // omitting props
  function h(type: string | Component, children?: Children | Slot): VNode

  type Children = string | number | boolean | VNode | null | Children[]

  type Slot = () => Children

  type Slots = { [name: string]: Slot }
  ```

  > تایپ‌ها برای خوانایی بهتر ساده‌سازی شده‌اند.

- **جزئیات**

  اولین آرگومان می‌تواند یک رشته (برای عناصر بومی) یا یک تعریف کامپوننت Vue باشد. آرگومان دوم پراپ‌های قابل انتقال است و آرگومان سوم نیز فرزندان آن است.

  هنگام ایجاد یک کامپوننت vnode، فرزندان باید به عنوان توابع اسلات (slot functions) منتقل شوند. اگر کامپوننت فقط انتظار اسلات پیش‌فرض را دارد، می‌توانید فقط یک تابع اسلات را منتقل کنید. در غیر این صورت، اسلات‌ها باید به عنوان یک آبجکتی از توابع منتقل شوند.

  برای راحتی، آرگومان props را می‌توان هنگام عدم وجود آبجکت اسلات‌ها، حذف کرد.

- **مثال**

  ایجاد عناصر بومی:

  ```js
  import { h } from 'vue'

  // all arguments except the type are optional
  h('div')
  h('div', { id: 'foo' })

  // both attributes and properties can be used in props
  // Vue automatically picks the right way to assign it
  h('div', { class: 'bar', innerHTML: 'hello' })

  // class and style have the same object / array
  // value support like in templates
  h('div', { class: [foo, { bar }], style: { color: 'red' } })

  // event listeners should be passed as onXxx
  h('div', { onClick: () => {} })

  // children can be a string
  h('div', { id: 'foo' }, 'hello')

  // props can be omitted when there are no props
  h('div', 'hello')
  h('div', [h('span', 'hello')])

  // children array can contain mixed vnodes and strings
  h('div', ['hello', h('span', 'hello')])
  ```

  ایجاد کامپوننت:

  ```js
  import Foo from './Foo.vue'

  // passing props
  h(Foo, {
    // equivalent of some-prop="hello"
    someProp: 'hello',
    // equivalent of @update="() => {}"
    onUpdate: () => {}
  })

  // passing single default slot
  h(Foo, () => 'default slot')

  // passing named slots
  // notice the `null` is required to avoid
  // slots object being treated as props
  h(MyComponent, null, {
    default: () => 'default slot',
    foo: () => h('div', 'foo'),
    bar: () => [h('span', 'one'), h('span', 'two')]
  })
  ```

- **همچنین ببینید** [راهنما - رندر فانکشن‌ها - ایجاد VNode](/guide/extras/render-function#creating-vnodes)

## mergeProps()‎ {#mergeprops}

Merge multiple props objects with special handling for certain props.

- **Type**

  ```ts
  function mergeProps(...args: object[]): object
  ```

- **Details**

  `mergeProps()` supports merging multiple props objects with special handling for the following props:

  - `class`
  - `style`
  - `onXxx` event listeners - multiple listeners with the same name will be merged into an array.

  If you do not need the merge behavior and want simple overwrites, native object spread can be used instead.

- **Example**

  ```js
  import { mergeProps } from 'vue'

  const one = {
    class: 'foo',
    onClick: handlerA
  }

  const two = {
    class: { bar: true },
    onClick: handlerB
  }

  const merged = mergeProps(one, two)
  /**
   {
     class: 'foo bar',
     onClick: [handlerA, handlerB]
   }
   */
  ```

## cloneVNode()‎ {#clonevnode}

Clones a vnode.

- **Type**

  ```ts
  function cloneVNode(vnode: VNode, extraProps?: object): VNode
  ```

- **Details**

  Returns a cloned vnode, optionally with extra props to merge with the original.

  Vnodes should be considered immutable once created, and you should not mutate the props of an existing vnode. Instead, clone it with different / extra props.

  Vnodes have special internal properties, so cloning them is not as simple as an object spread. `cloneVNode()` handles most of the internal logic.

- **Example**

  ```js
  import { h, cloneVNode } from 'vue'

  const original = h('div')
  const cloned = cloneVNode(original, { id: 'foo' })
  ```

## isVNode()‎ {#isvnode}

این تابع vnode بودن مقدار ورودی را بررسی می‌کند.

- **تایپ**

  ```ts
  function isVNode(value: unknown): boolean
  ```

## resolveComponent()‎ {#resolvecomponent}

برای گرفتن یک کامپوننت رجیسترشده به صورت دستی با نام آن به کار می‌رود.

- **تایپ**

  ```ts
  function resolveComponent(name: string): Component | string
  ```

- **جزئیات**

  **توجه: اگر می توانید کامپوننت را مستقیماً import کنید، به این نیازی ندارید.**

  تابع `resolveComponent()‎` باید در داخل <span class="composition-api">`setup()‎` یا</span> رندر فانکشن اجرا شود تا به درستی بتواند حتما از context یک کامپوننت صحیح این عملیات را انجام دهد.

  اگر کامپوننت یافت نشود، یک هشدار Runtime صادر شده و نام ورودی را در خروجی برمی‌گرداند.

- **مثال**

  <div class="composition-api">

  ```js
  import { h, resolveComponent } from 'vue'

  export default {
    setup() {
      const ButtonCounter = resolveComponent('ButtonCounter')

      return () => {
        return h(ButtonCounter)
      }
    }
  }
  ```

  </div>
  <div class="options-api">

  ```js
  import { h, resolveComponent } from 'vue'

  export default {
    render() {
      const ButtonCounter = resolveComponent('ButtonCounter')
      return h(ButtonCounter)
    }
  }
  ```

  </div>

- **همچنین ببینید** [راهنما - رندر فانکشن‌ها - کامپوننت‌ها](/guide/extras/render-function#components)

## resolveDirective()‎ {#resolvedirective}

برای گرفتن یک دایرکتیو رجیسترشده به صورت دستی با نام آن به کار می‌رود.

- **تایپ**

  ```ts
  function resolveDirective(name: string): Directive | undefined
  ```

- **جزئیات**

  **توجه: اگر می توانید دایرکتیو را مستقیماً import کنید، به این نیازی ندارید.**

  تابع `resolveDirective()‎` باید در داخل <span class="composition-api">`setup()‎` یا</span> رندر فانکشن اجرا شود تا به درستی بتواند حتما از context یک کامپوننت صحیح این عملیات را انجام دهد.

  اگر دایرکتیو یافت نشود، یک هشدار Runtime صادر شده و `undefined` را در خروجی برمی‌گرداند.

- **همچنین ببینید** [راهنما - رندر فانکشن‌ها - دایرکتیوهای اختصاصی](/guide/extras/render-function#custom-directives)

## withDirectives()‎ {#withdirectives}

برای افزودن دایرکتیوهای اختصاصی به vnodeها استفاده می‌شود.

- **تایپ**

  ```ts
  function withDirectives(
    vnode: VNode,
    directives: DirectiveArguments
  ): VNode

  // [Directive, value, argument, modifiers]
  type DirectiveArguments = Array<
    | [Directive]
    | [Directive, any]
    | [Directive, any, string]
    | [Directive, any, string, DirectiveModifiers]
  >
  ```

- **جزئیات**

یک vnode موجود را با دایرکتیوهای اختصاصی می‌پوشاند. دومین آرگومان یک آرایه از دایرکتیوهای اختصاصی است. هر دایرکتیو یک آرایه به شکل `[Directive, value, argument, modifiers]` نشان داده می شود و هر عنصر آرایه را می توان در صورت عدم نیاز حذف کرد.

- **مثال**

  ```js
  import { h, withDirectives } from 'vue'

  // a custom directive
  const pin = {
    mounted() {
      /* ... */
    },
    updated() {
      /* ... */
    }
  }

  // <div v-pin:top.animate="200"></div>
  const vnode = withDirectives(h('div'), [
    [pin, 200, 'top', { animate: true }]
  ])
  ```

- **همچنین ببینید** [راهنما - رندر فانکشن‌ها - دایرکتیوهای اختصاصی](/guide/extras/render-function#custom-directives)

## withModifiers()‎ {#withmodifiers}

برای افزودن مودیفایرهای از پیش تعریف شده به رویدادها به کار می‌رود([`v-on` modifier](/guide/essentials/event-handling#event-modifiers)).

- **تایپ**

  ```ts
  function withModifiers(fn: Function, modifiers: string[]): Function
  ```

- **مثال**

  ```js
  import { h, withModifiers } from 'vue'

  const vnode = h('button', {
    // equivalent of v-on:click.stop.prevent
    onClick: withModifiers(() => {
      // ...
    }, ['stop', 'prevent'])
  })
  ```

- **همچنین ببینید** [راهنما - رندر فانکشن‌ها - مودیفایرهای رویداد](/guide/extras/render-function#event-modifiers)
