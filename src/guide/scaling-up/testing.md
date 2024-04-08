<script setup>
import { VTCodeGroup, VTCodeGroupTab } from '@vue/theme'
</script>

# تست و بررسی {#testing}

## چرا تست و بررسی؟ {#why-test}

تست‌های خودکار به شما و تیمتان کمک می‌کنند تا به سرعت و با اطمینان بیشتری برنامه‌های پیچیده‌ی Vue را بسازید، باعث جلوگیری از رگرسیون‌ها شده و شما را تشویق کنند تا برنامه‌ی خود را به توابع، ماژول‌ها، کلاس‌ها و کامپوننت‌های قابل تست تقسیم کنید. همانند هر برنامه‌ی دیگری، برنامه‌ی Vue جدید شما می‌تواند به چندین روش خراب شود و مهم است که بتوانید این مشکلات را شناسایی کرده و قبل از انتشار آنها را برطرف کنید.

در این راهنما، ما اصطلاحات پایه را پوشش می دهیم و توصیه های خود را در مورد ابزارهایی که برای برنامه Vue 3 خود انتخاب می کنید، ارائه می دهیم.

یک بخش خاص برای Vue در مورد composables وجود دارد. برای اطلاعات بیشتر، به بخش [تست Composables](#testing-composables) در زیر مراجعه کنید.

## زمان نوشتن تست {#when-to-test}

تست نویسی را زودنر شروع کنید! توضیه می‌کنیم هرچه سریعتر نوشتن تست‌ها را شروع کنید . هر چقدر دیرتر تست‌ها را اضافه کنید وابستگی‌های بیشتری وجود خواهند داشت و اضافه کردن تست سخت‌تر می‌شود.

## انواع تست {#testing-types}

وقتی استراتژی تست اپلیکیشن Vue خود را دیزاین می‌کنید، می‌توانید از این نوع تست‌ها استفاده کنید.

- **یونیت**:‌ بررسی می‌کند که ورودی‌های یک تابع، کلاس یا composable، خروجی یا side-effect های مورد انتظار را ایجاد می‌کنند.

- **کامپوننت**: این نوع تست mount شدن، رندر شدن، و تعامل با کامپوننت را صحت سنجی می‌کند. این تست‌ها کد بیشتری نسبت به یونیت تست‌ها را یکباره تست می‌کنند و نسبت به یونیت تست‌ها پیچیده‌تر هستند و به زمان بیشتری برای اجرا نیاز دارند.

- **End-to-end**: این نوع تست فیچرهایی را بررسی می‌کند که چندین صفحه را در بر می‌گیرند و درخواست‌های شبکه واقعی را در برابر برنامه Vue ساخته‌شده شما ایجاد می‌کند. این تست‌ها اغلب نیازمند به اجرا کردن پایگاه داده یا سایر سرویس‌های بک‌اند هست.

هر نوع تست نقشی در استراتژی تست برنامه شما ایفا می‌کند و هرکدام شما را در برابر انواع مختلف مشکلات محافظت می‌کنند.

## بررسی اجمالی {#overview}

در این قسمت ما به صورت مختصر به روش‌های تست، چگونگی پیاده‌سازی آن‌ها برای پروژه‌های Vue، و چند توصیه‌ عمومی خواهیم پرداخت.

## Unit Testing {#unit-testing}

یونیت تست‌ها برای اطمینان از عملکرد صحیح واحدهای کوچک و مجزای کد نوشته می‌شوند. یک یونیت تست معمولا یک تابع، کلاس، composable، یا ماژول را پوشش می‌دهد. یونیت تست‌ها بر صحت منطق تمرکز دارند و فقط با بخش کوچکی از عملکرد کلی برنامه درگیر می‌شوند. ممکن است در این نوع تست بخش‌های مختلفی از محیط برنامه را ماک کنیم (مثلا حالت اولیه، کلاس‌های پیچیده، ماژول‌های third-party و درخواست‌های شبکه).

به طور کلی، یونیت تست‌ها منطق بیزینس و پیاده‌سازی منطق یک تابع را صحت‌ سنجی می‌کنند.

برای مثال این تابع increment را در نظر بگیرید:

```js
// helpers.js
export function increment (current, max = 10) {
  if (current < max) {
    return current + 1
  }
  return current
}
```

نوشتن یونیت تست برای این تابع به دلیل نداشتن وابستگی به سادگی اجرا کردن آن و بررسی خروجی آن با استفاده از assertion ها هست.
شکست خودن هر کدام از این assertion ها نشان دهنده یک مشکل در تابع increament هست.

```js{4-16}
// helpers.spec.js
import { increment } from './helpers'

describe('increment', () => {
  test('increments the current number by 1', () => {
    expect(increment(0, 10)).toBe(1)
  })

  test('does not increment the current number over the max', () => {
    expect(increment(10, 10)).toBe(10)
  })

  test('has a default max of 10', () => {
    expect(increment(10)).toBe(10)
  })
})
```

همانطور که قبلاً ذکر شد، یونیت تست معمولاً برای منطق بیزینس بدون وابستگی، کامپوننت‌ها، کلاس‌ها، ماژول‌ها، یا توابعی که شامل رندر کردن رابط کاربری، درخواست‌های شبکه یا سایر ملاحظات محیطی نمی‌شوند، اعمال می‌شود.

این یونیت‌ها معمولاً ماژول‌های جاوااسکریپت/تایپ‌اسکریپت ساده‌ای هستند که به ویو مربوط نمی‌شوند. به طور کلی، نحوه نوشتن یونیت تست برای منطق بیزینس در برنامه‌های ویو تفاوتی با سایر فریمورک‌ها ندارد.

تنها دو مورد وجود دارد که در آن‌ها شما فیچرهای خاص ویو را یونیت تست می‌کنید:

1. Composables
2. کامپوننت‌ها


### Composables {#composables}

یک دسته از توابع خاص در برنامه‌های ویو، [Composible ها](/guide/reusability/composables) هستند که برای تست نیاز به مدیریت مجزا دارند. برای اطلاعات بیشتر به [تست Composible ها](#testing-composables) مراجعه کنید.

### یونیت تست کردن کامپوننت‌ها {#unit-testing-components}

یک کامپوننت می‌تواند به دو روش تست شود:

1. جعبه سفید: یونیت تست

  تست‌های "جعبه سفید"، از جزئیات پیاده‌سازی و وابستگی‌های یک کامپوننت آگاه هستند. آن‌ها بر "ایزوله‌سازی" کامپوننت مورد تست تمرکز دارند. این تست‌ها معمولاً ماک کردن برخی یا همه فرزندان کامپوننت، تنظیمات پلاگین‌ها برای مدیریت استیت و وابستگی‌ها را شامل می‌شوند.

2. جعبه سیاه: کامپوننت تست

  تست‌های "جعبه سیاه" از جزئیات پیاده‌سازی یک کامپوننت بی‌اطلاع هستند. این نوع تست‌ها از حداقل میزان ممکن ماک‌ها استفاده می‌کنند. تست‌های جعبه سیاه معمولاً تمام فرزندان را رندر می‌کنند و بیشتر به عنوان یک "Integration test" در نظر گرفته می‌شوند. برای اطلاعات بیشتر به قسمت [توصیه‌های تست کردن کامپوننت‌ها](#component-testing) رجوع کنید.

### توصیه‌ها {#recommendation}

- [Vitest](https://vitest.dev/): از آنجایی که پیکربندی رسمی پروژه که توسط `create-vue` ایجاد شده، بر پایه [Vite](https://vitejs.dev/) پیشنهاد ما استفاده از چارچوب یونیت تستی است که بتواند از همان تنظیمات Vite به طور مستقیم استفاده کند. [Vitest](https://vitest.dev/), که توسط اعضای تیم Vue / Vite طراحی و نگهداری می‌شود، یک چارچوب تست است که ویژه این هدف ساخته شده است. این چارچوب به راحتی با پروژه‌های مبتنی بر Vite ادغام می‌شود و سرعت بسیار بالایی دارد.

### گزینه‌های دیگر {#other-options}

- [Jest](https://jestjs.io/): یک چارچوب یونیت تست محبوب است. با این حال، ما در حالتی Jest را توصیه می‌کنیم که شما یک سورس کد مبتنی بر Jest دارید و می‌خواهید به Vite مهاجرت کنید، چرا که Vitest یکپارچگی و عملکرد بهتری ارائه می‌دهد.

## کامپوننت تست {#component-testing}
در برنامه‌های Vue، کامپوننت‌ها اصلی‌ترین قطعات سازنده رابط کاربری (UI) هستند. بنابراین، کامپوننت‌ها واحد ایده‌آلی برای جداسازی به منظور اعتبارسنجی رفتار برنامه شما هستند. از نظر دقت و جزئیات، تست کردن کامپوننت در چارچوب دقت و جزئیات، در سطحی بالاتر از
 تست واحدی (unit testing) قرار دارد و می‌توان آن را یک شکل از تست ادغامی (integration testing) در نظر گرفت. بخش زیادی از برنامه Vue شما باید تحت پوشش تست کامپوننت قرار گیرد و توصیه می‌کنیم برای هر کامپوننت یک فایل مشخص (spec file) و مجزا داشته باشید.

تست های کامپوننت باید ایرادات مربوط به پارامترها (props), رویدادها (events), قابلیت‌ها و ویژگی‌های که ارائه میدهد، استایل ها (styles), کلاس ها، هوک های (hooks) چرخه حیات، و سایر موارد را شناسایی کند.

Component tests should not mock child components, but instead test the interactions between your component and its children by interacting with the components as a user would. For example, a component test should click on an element like a user would instead of programmatically interacting with the component.

Component tests should focus on the component's public interfaces rather than internal implementation details. For most components, the public interface is limited to: events emitted, props, and slots. When testing, remember to **test what a component does, not how it does it**.

**DO**

- For **Visual** logic: assert correct render output based on inputted props and slots.
- For **Behavioral** logic: assert correct render updates or emitted events in response to user input events.

  In the below example, we demonstrate a Stepper component that has a DOM element labeled "increment" and can be clicked. We pass a prop called `max` that prevents the Stepper from being incremented past `2`, so if we click the button 3 times, the UI should still say `2`.

  We know nothing about the implementation of Stepper, only that the "input" is the `max` prop and the "output" is the state of the DOM as the user will see it.

<VTCodeGroup>
  <VTCodeGroupTab label="Vue Test Utils">

  ```js
  const valueSelector = '[data-testid=stepper-value]'
  const buttonSelector = '[data-testid=increment]'

  const wrapper = mount(Stepper, {
    props: {
      max: 1
    }
  })

  expect(wrapper.find(valueSelector).text()).toContain('0')

  await wrapper.find(buttonSelector).trigger('click')

  expect(wrapper.find(valueSelector).text()).toContain('1')
  ```

  </VTCodeGroupTab>
  <VTCodeGroupTab label="Cypress">

  ```js
  const valueSelector = '[data-testid=stepper-value]'
  const buttonSelector = '[data-testid=increment]'

  mount(Stepper, {
    props: {
      max: 1
    }
  })

  cy.get(valueSelector).should('be.visible').and('contain.text', '0')
    .get(buttonSelector).click()
    .get(valueSelector).should('contain.text', '1')
  ```

  </VTCodeGroupTab>
  <VTCodeGroupTab label="Testing Library">

  ```js
  const { getByText } = render(Stepper, {
    props: {
      max: 1
    }
  })

  getByText('0') // Implicit assertion that "0" is within the component

  const button = getByRole('button', { name: /increment/i })

  // Dispatch a click event to our increment button.
  await fireEvent.click(button)

  getByText('1')

  await fireEvent.click(button)
  ```

  </VTCodeGroupTab>
</VTCodeGroup>

- **DON'T**

  Don't assert the private state of a component instance or test the private methods of a component. Testing implementation details makes the tests brittle, as they are more likely to break and require updates when the implementation changes.

  The component's ultimate job is rendering the correct DOM output, so tests focusing on the DOM output provide the same level of correctness assurance (if not more) while being more robust and resilient to change.

  Don't rely exclusively on snapshot tests. Asserting HTML strings does not describe correctness. Write tests with intentionality.

  If a method needs to be tested thoroughly, consider extracting it into a standalone utility function and write a dedicated unit test for it. If it cannot be extracted cleanly, it may be tested as a part of a component, integration, or end-to-end test that covers it.

### Recommendation {#recommendation-1}

- [Vitest](https://vitest.dev/) for components or composables that render headlessly (e.g. the [`useFavicon`](https://vueuse.org/core/useFavicon/#usefavicon) function in VueUse). Components and DOM can be tested using [`@vue/test-utils`](https://github.com/vuejs/test-utils).

- [Cypress Component Testing](https://on.cypress.io/component) for components whose expected behavior depends on properly rendering styles or triggering native DOM events. It can be used with Testing Library via [@testing-library/cypress](https://testing-library.com/docs/cypress-testing-library/intro).

The main differences between Vitest and browser-based runners are speed and execution context. In short, browser-based runners, like Cypress, can catch issues that node-based runners, like Vitest, cannot (e.g. style issues, real native DOM events, cookies, local storage, and network failures), but browser-based runners are _orders of magnitude slower than Vitest_ because they do open a browser, compile your stylesheets, and more. Cypress is a browser-based runner that supports component testing. Please read [Vitest's comparison page](https://vitest.dev/guide/comparisons.html#cypress) for the latest information comparing Vitest and Cypress.

### Mounting Libraries {#mounting-libraries}

Component testing often involves mounting the component being tested in isolation, triggering simulated user input events, and asserting on the rendered DOM output. There are dedicated utility libraries that make these tasks simpler.

- [`@vue/test-utils`](https://github.com/vuejs/test-utils) is the official low-level component testing library that was written to provide users access to Vue specific APIs. It's also the lower-level library `@testing-library/vue` is built on top of.

- [`@testing-library/vue`](https://github.com/testing-library/vue-testing-library) is a Vue testing library focused on testing components without relying on implementation details. Its guiding principle is that the more tests resemble the way software is used, the more confidence they can provide.

We recommend using `@vue/test-utils` for testing components in applications. `@testing-library/vue` has issues with testing asynchronous component with Suspense, so it should be used with caution.

### Other Options {#other-options-1}

- [Nightwatch](https://nightwatchjs.org/) is an E2E test runner with Vue Component Testing support. ([Example Project](https://github.com/nightwatchjs-community/todo-vue))

- [WebdriverIO](https://webdriver.io/docs/component-testing/vue) for cross-browser component testing that relies on native user interaction based on standardized automation. It can also be used with Testing Library.

## E2E Testing {#e2e-testing}

While unit tests provide developers with some degree of confidence, unit and component tests are limited in their abilities to provide holistic coverage of an application when deployed to production. As a result, end-to-end (E2E) tests provide coverage on what is arguably the most important aspect of an application: what happens when users actually use your applications.

End-to-end tests focus on multi-page application behavior that makes network requests against your production-built Vue application. They often involve standing up a database or other backend and may even be run against a live staging environment.

End-to-end tests will often catch issues with your router, state management library, top-level components (e.g. an App or Layout), public assets, or any request handling. As stated above, they catch critical issues that may be impossible to catch with unit tests or component tests.

End-to-end tests do not import any of your Vue application's code but instead rely completely on testing your application by navigating through entire pages in a real browser.

End-to-end tests validate many of the layers in your application. They can either target your locally built application or even a live Staging environment. Testing against your Staging environment not only includes your frontend code and static server but all associated backend services and infrastructure.

> The more your tests resemble how your software is used, the more confidence they can give you. - [Kent C. Dodds](https://twitter.com/kentcdodds/status/977018512689455106) - Author of the Testing Library

By testing how user actions impact your application, E2E tests are often the key to higher confidence in whether an application is functioning properly or not.

### Choosing an E2E Testing Solution {#choosing-an-e2e-testing-solution}

While end-to-end (E2E) testing on the web has gained a negative reputation for unreliable (flaky) tests and slowing down development processes, modern E2E tools have made strides forward to create more reliable, interactive, and useful tests. When choosing an E2E testing framework, the following sections provide some guidance on things to keep in mind when choosing a testing framework for your application.

#### Cross-browser testing {#cross-browser-testing}

One of the primary benefits that end-to-end (E2E) testing is known for is its ability to test your application across multiple browsers. While it may seem desirable to have 100% cross-browser coverage, it is important to note that cross browser testing has diminishing returns on a team's resources due to the additional time and machine power required to run them consistently. As a result, it is important to be mindful of this trade-off when choosing the amount of cross-browser testing your application needs.

#### Faster feedback loops {#faster-feedback-loops}

One of the primary problems with end-to-end (E2E) tests and development is that running the entire suite takes a long time. Typically, this is only done in continuous integration and deployment (CI/CD) pipelines. Modern E2E testing frameworks have helped to solve this by adding features like parallelization, which allows for CI/CD pipelines to often run magnitudes faster than before. In addition, when developing locally, the ability to selectively run a single test for the page you are working on while also providing hot reloading of tests can help boost a developer's workflow and productivity.

#### First-class debugging experience {#first-class-debugging-experience}

While developers have traditionally relied on scanning logs in a terminal window to help determine what went wrong in a test, modern end-to-end (E2E) test frameworks allow developers to leverage tools they are already familiar with, e.g. browser developer tools.

#### Visibility in headless mode {#visibility-in-headless-mode}

When end-to-end (E2E) tests are run in continuous integration/deployment pipelines, they are often run in headless browsers (i.e., no visible browser is opened for the user to watch). A critical feature of modern E2E testing frameworks is the ability to see snapshots and/or videos of the application during testing, providing some insight into why errors are happening. Historically, it was tedious to maintain these integrations.

### Recommendation {#recommendation-2}

- [Cypress](https://www.cypress.io/)

  Overall, we believe Cypress provides the most complete E2E solution with features like an informative graphical interface, excellent debuggability, built-in assertions and stubs, flake-resistance, parallelization, and snapshots. As mentioned above, it also provides support for [Component Testing](https://docs.cypress.io/guides/component-testing/introduction). However, it only supports Chromium-based browsers and Firefox.

### Other Options {#other-options-2}

- [Playwright](https://playwright.dev/) is also a great E2E testing solution with a wider range of browser support (mainly WebKit). See [Why Playwright](https://playwright.dev/docs/why-playwright) for more details.

- [Nightwatch](https://nightwatchjs.org/) is an E2E testing solution based on [Selenium WebDriver](https://www.npmjs.com/package/selenium-webdriver). This gives it the widest browser support range.

- [WebdriverIO](https://webdriver.io/) is a test automation framework for web and mobile testing based on the WebDriver protocol.

## Recipes {#recipes}

### Adding Vitest to a Project {#adding-vitest-to-a-project}

In a Vite-based Vue project, run:

```sh
> npm install -D vitest happy-dom @testing-library/vue
```

Next, update the Vite configuration to add the `test` option block:

```js{6-12}
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  // ...
  test: {
    // enable jest-like global test APIs
    globals: true,
    // simulate DOM with happy-dom
    // (requires installing happy-dom as a peer dependency)
    environment: 'happy-dom'
  }
})
```

:::tip
If you use TypeScript, add `vitest/globals` to the `types` field in your `tsconfig.json`.

```json
// tsconfig.json

{
  "compilerOptions": {
    "types": ["vitest/globals"]
  }
}
```

:::

Then, create a file ending in `*.test.js` in your project. You can place all test files in a test directory in the project root or in test directories next to your source files. Vitest will automatically search for them using the naming convention.

```js
// MyComponent.test.js
import { render } from '@testing-library/vue'
import MyComponent from './MyComponent.vue'

test('it should work', () => {
  const { getByText } = render(MyComponent, {
    props: {
      /* ... */
    }
  })

  // assert output
  getByText('...')
})
```

Finally, update `package.json` to add the test script and run it:

```json{4}
{
  // ...
  "scripts": {
    "test": "vitest"
  }
}
```

```sh
> npm test
```

### Testing Composables {#testing-composables}

> This section assumes you have read the [Composables](/guide/reusability/composables) section.

When it comes to testing composables, we can divide them into two categories: composables that do not rely on a host component instance, and composables that do.

A composable depends on a host component instance when it uses the following APIs:

- Lifecycle hooks
- Provide / Inject

If a composable only uses Reactivity APIs, then it can be tested by directly invoking it and asserting its returned state/methods:

```js
// counter.js
import { ref } from 'vue'

export function useCounter() {
  const count = ref(0)
  const increment = () => count.value++

  return {
    count,
    increment
  }
}
```

```js
// counter.test.js
import { useCounter } from './counter.js'

test('useCounter', () => {
  const { count, increment } = useCounter()
  expect(count.value).toBe(0)

  increment()
  expect(count.value).toBe(1)
})
```

A composable that relies on lifecycle hooks or Provide / Inject needs to be wrapped in a host component to be tested. We can create a helper like the following:

```js
// test-utils.js
import { createApp } from 'vue'

export function withSetup(composable) {
  let result
  const app = createApp({
    setup() {
      result = composable()
      // suppress missing template warning
      return () => {}
    }
  })
  app.mount(document.createElement('div'))
  // return the result and the app instance
  // for testing provide/unmount
  return [result, app]
}
```

```js
import { withSetup } from './test-utils'
import { useFoo } from './foo'

test('useFoo', () => {
  const [result, app] = withSetup(() => useFoo(123))
  // mock provide for testing injections
  app.provide(...)
  // run assertions
  expect(result.foo.value).toBe(1)
  // trigger onUnmounted hook if needed
  app.unmount()
})
```

For more complex composables, it could also be easier to test it by writing tests against the wrapper component using [Component Testing](#component-testing) techniques.

<!--
TODO more testing recipes can be added in the future e.g.
- How to set up CI via GitHub actions
- How to do mocking in component testing
-->
