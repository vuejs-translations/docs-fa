---
pageClass: api
---

# کامپوننت‌های نهادینه‌شده {#built-in-components}

:::info ثبت و استفاده
کامپوننت‌های نهادینه شده می‌توانند مستقیما و بدون نیاز به ثبت در تمپلیت‌ها استفاده شوند. آنها همچنین tree-shakable (اصطلاحی است که که برای کدهای غیرقابل استفاده یا کدهای مرده استفاده می‌گردد) هستند یعنی تنها در ساخت و در هنگامی که استفاده می‌شوند، شامل می‌شوند.

هنگام استفاده آنها در [توابع رندر](/guide/extras/render-function)، آنها باید به صراحت ایمپورت شوند. برای نمونه:

```js
import { h, Transition } from 'vue'

h(Transition, {
  /* props */
})
```

:::

## `<Transition>` {#transition}

جلوه های ترنزیشن متحرک را به یک عنصر یا کامپوننت ارائه می دهد.

- **Props**

  ```ts
  interface TransitionProps {
    /**
     * Used to automatically generate transition CSS class names.
     * e.g. `name: 'fade'` will auto expand to `.fade-enter`,
     * `.fade-enter-active`, etc.
     */
    name?: string
    /**
     * Whether to apply CSS transition classes.
     * Default: true
     */
    css?: boolean
    /**
     * Specifies the type of transition events to wait for to
     * determine transition end timing.
     * Default behavior is auto detecting the type that has
     * longer duration.
     */
    type?: 'transition' | 'animation'
    /**
     * Specifies explicit durations of the transition.
     * Default behavior is wait for the first `transitionend`
     * or `animationend` event on the root transition element.
     */
    duration?: number | { enter: number; leave: number }
    /**
     * Controls the timing sequence of leaving/entering transitions.
     * Default behavior is simultaneous.
     */
    mode?: 'in-out' | 'out-in' | 'default'
    /**
     * Whether to apply transition on initial render.
     * Default: false
     */
    appear?: boolean

    /**
     * Props for customizing transition classes.
     * Use kebab-case in templates, e.g. enter-from-class="xxx"
     */
    enterFromClass?: string
    enterActiveClass?: string
    enterToClass?: string
    appearFromClass?: string
    appearActiveClass?: string
    appearToClass?: string
    leaveFromClass?: string
    leaveActiveClass?: string
    leaveToClass?: string
  }
  ```

- **رویدادها**

  - `@before-enter`
  - `@before-leave`
  - `@enter`
  - `@leave`
  - `@appear`
  - `@after-enter`
  - `@after-leave`
  - `@after-appear`
  - `@enter-cancelled`
  - `@leave-cancelled` (`v-show` only)
  - `@appear-cancelled`

- **مثال**

  عنصر ساده:

  ```vue-html
  <Transition>
    <div v-if="ok">toggled content</div>
  </Transition>
  ```

  اعمال یک ترنزیشن به وسیله صفت `key`:

  ```vue-html
  <Transition>
    <div :key="text">{{ text }}</div>
  </Transition>
  ```

  کامپوننت پویا، با mode ترنزیشن + انیمیشن در حالت ظاهرشدن:

  ```vue-html
  <Transition name="fade" mode="out-in" appear>
    <component :is="view"></component>
  </Transition>
  ```

  گوش‌دادن به رویدادهای ترنزیشن:

  ```vue-html
  <Transition @after-enter="onTransitionComplete">
    <div v-show="ok">toggled content</div>
  </Transition>
  ```

- **همچنین ببینید** [راهنما - ترنزیشن](/guide/built-ins/transition)

## `<TransitionGroup>` {#transitiongroup}

جلوه های ترنزیشن را برای **چندین** عنصر یا کامپوننت در یک لیست ارائه می دهد.

- **Props**

  `<TransitionGroup>` پراپ‌های یکسانی همانند `<Transition>` دریافت می‌کند، بجز `mode` و دو پراپ اضافی دیگر:

  ```ts
  interface TransitionGroupProps extends Omit<TransitionProps, 'mode'> {
    /**
     * If not defined, renders as a fragment.
     */
    tag?: string
    /**
     * For customizing the CSS class applied during move transitions.
     * Use kebab-case in templates, e.g. move-class="xxx"
     */
    moveClass?: string
  }
  ```

- **رویدادها**

  `<TransitionGroup>` رویدادهایی همانند `<Transition>` منتشر می‌کند.

- **جزییات**

  به طور پیش‌فرض، `<TransitionGroup>` یک المنت پوشاننده دام را رندر نمی‌کند، اما آن می‌تواند با پراپ `tag` تعریف شود.

  توجه کنید که هر فرزند داخل یک `<transition-group>` باید [**uniquely keyed**](/guide/essentials/list#maintaining-state-with-key) (منحصرا کلید گذاری شده) باشد تا انیمیشن‌ها به طور مناسب کار کنند.

  `<TransitionGroup>` ترنزیشن‌های متحرک را به وسیله CSS transform پشتیبانی می‌کند. هنگامی که جایگاه یک فرزند در صفحه پس از یک بروزرسانی تغییر کرده‌است، یک کلاس متحرک CSS را اعمال خواهد کرد (یا از صفت `name` تولید شده یا با پراپ `move-class` پیکربندی شده). اگر پراپرتی `transform` در CSS هنگامی که کلاس متحرک اعمال شده "transition-able" باشد، عنصر به آرامی به وسیله [FLIP technique](https://aerotwist.com/blog/flip-your-animations/) به مقصد خود متحرک خواهد شد.

- **مثال**

  ```vue-html
  <TransitionGroup tag="ul" name="slide">
    <li v-for="item in items" :key="item.id">
      {{ item.text }}
    </li>
  </TransitionGroup>
  ```

- **همچنین ببینید** [راهنما - ترنزیشن گروهی](/guide/built-ins/transition-group)

## `<KeepAlive>` {#keepalive}

حافظه پنهان اجزای پوشیده شده در داخل را به صورت پویا تغییر داده است.

- **Props**

  ```ts
  interface KeepAliveProps {
    /**
     * If specified, only components with names matched by
     * `include` will be cached.
     */
    include?: MatchPattern
    /**
     * Any component with a name matched by `exclude` will
     * not be cached.
     */
    exclude?: MatchPattern
    /**
     * The maximum number of component instances to cache.
     */
    max?: number | string
  }

  type MatchPattern = string | RegExp | (string | RegExp)[]
  ```

- **جزییات**

  هنگامی که یک کامپوننت پویا به وسیله آن پوشیده می‌شود،`<KeepAlive>` کامپوننت غیرفعال را بدون نابود کردن آن در حافظه پنهان ذخیره می‌کند.

  همواره تنها یک نمونه کامپوننت فعال می‌تواند به عنوان فرزند مستقیم `<KeepAlive>` وجود داشته باشد.

  هنگامی که یک کامپوننت در داخل `<KeepAlive>` تغییر می‌کند، هوک‌های `activated` و `deactivated` در چرخه حیات با استناد به آن فراخوانی می‌شوند و جایگزین‌هایی برای هوک‌های `mounted` و `unmounted` که فراخوانی نشده‌اند، فراهم می‌کنند. این درمورد فرزند مستقیم `<KeepAlive>` و تمام فرزندان آن فرزند صدق می‌کند.

- **مثال**

  استفاده پایه:

  ```vue-html
  <KeepAlive>
    <component :is="view"></component>
  </KeepAlive>
  ```

  هنگامی که با شاخه‌های `v-if` / `v-else` استفاده شود، باید فقط یک کامپوننت در یک زمان رندر شود:

  ```vue-html
  <KeepAlive>
    <comp-a v-if="a > 1"></comp-a>
    <comp-b v-else></comp-b>
  </KeepAlive>
  ```

  به همراه `<Transition>` استفاده شود:

  ```vue-html
  <Transition>
    <KeepAlive>
      <component :is="view"></component>
    </KeepAlive>
  </Transition>
  ```

  با `include` / `exclude` استفاده شود:

  ```vue-html
  <!-- رشته محدود شده با کاما -->
  <KeepAlive include="a,b">
    <component :is="view"></component>
  </KeepAlive>

  <!-- ریجکس (استفاده با `v-bind`) -->
  <KeepAlive :include="/a|b/">
    <component :is="view"></component>
  </KeepAlive>

  <!-- آرایه (استفاده با `v-bind`) -->
  <KeepAlive :include="['a', 'b']">
    <component :is="view"></component>
  </KeepAlive>
  ```

  در استفاده با `max`:

  ```vue-html
  <KeepAlive :max="10">
    <component :is="view"></component>
  </KeepAlive>
  ```

- **همچنین ببینید** [راهنما - زنده نگه داشتن کامپوننت](/guide/built-ins/keep-alive)

## `<Teleport>` {#teleport}

محتوای slot خود را به بخش دیگری از DOM رندر می‌کند.

- **Props**

  ```ts
  interface TeleportProps {
    /**
     * Required. Specify target container.
     * Can either be a selector or an actual element.
     */
    to: string | HTMLElement
    /**
     * When `true`, the content will remain in its original
     * location instead of moved into the target container.
     * Can be changed dynamically.
     */
    disabled?: boolean
  }
  ```

- **مثال**

  مشخص کردن نگهدارنده هدف:

  ```vue-html
  <Teleport to="#some-id" />
  <Teleport to=".some-class" />
  <Teleport to="[data-teleport]" />
  ```

  غیرفعال کردن شرطی:

  ```vue-html
  <Teleport to="#popup" :disabled="displayVideoInline">
    <video src="./my-movie.mp4">
  </Teleport>
  ```

- **همچنین ببینید** [راهنما - تلپورت](/guide/built-ins/teleport)

## `<Suspense>` <sup class="vt-badge experimental" /> {#suspense}

برای هماهنگ کردن وابستگی‌های ناهمگام تودرتو در یک درخت کامپوننت استفاده می‌شود.

- **Props**

  ```ts
  interface SuspenseProps {
    timeout?: string | number
    suspensible?: boolean
  }
  ```

- **رویدادها**

  - `@resolve`
  - `@pending`
  - `@fallback`

- **جزییات**

  `<Suspense>` دو slot را می‌پذیرد: اسلات `#default` و اسلات `#fallback`. محتوای اسلات fallback را در هنگام رندر کردن اسلات default موجود در حافظه نمایش می‌دهد.

  اگر با وابستگی‌های ناهمگام مواجه شود ([کامپوننت‌های ناهمگام](/guide/components/async) و کامپوننت‌های با [`()async setup`](/guide/built-ins/suspense#async-setup)) در هنگام رندر اسلات default، منتظر خواهد ماند تا پیش از نمایش اسلات default، همگی آنها resolve شوند.

  با تنظیم Suspense به عنوان `suspensible`، تمام مدیریت وابستگی
  async توسط Suspense والد مدیریت می شود. [جزئیات پیاده سازی](https://github.com/vuejs/core/pull/6736) را ببینید

- **همچنین ببینید** [راهنما - تعلیق](/guide/built-ins/suspense)
