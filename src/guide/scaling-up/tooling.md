<script setup>
import { VTCodeGroup, VTCodeGroupTab } from '@vue/theme'
</script>

# ابزارها - Tooling {#tooling}

## بصورت آنلاین امتحان کنید {#try-it-online}

برای امتحان SFC های Vue نیازی نیست چیزی روی دستگاه خودتان نصب کنید - محیط‌های آنلاینی وجود دارند که اجازه می‌دهند مستقیماً در مرورگرتان این کار را انجام دهید:

- [Vue SFC Playground](https://play.vuejs.org)
  - همیشه از آخرین کامیت اجرا می‌شود
  - طراحی شده برای بررسی نتایج کامپایل کامپوننت
- [Vue + Vite on StackBlitz](https://vite.new/vue)
  - محیطی شبیه IDE که سرور واقعی Vite dev را در مرورگر اجرا می‌کند
  - نزدیک‌ترین چیز به ستاپ محلی

همچنین توصیه می‌شود از این محیط‌های آنلاین برای ارائه بازتولیدها در هنگام گزارش باگ‌ها استفاده کنید.

## ساخت پروژه | Project Scaffolding {#project-scaffolding}

### Vite {#vite}

[Vite](https://vitejs.dev/) یک ابزار سبک و سریع برای ساخت با پشتیبانی بسیار عالی از SFC در Vue است. توسط Evan You ایجاد شده است، که نویسنده Vue هم هست!

برای شروع کار با Vite + Vue، فقط لازم است دستور زیر را در کامندلاین اجرا کنید:

<VTCodeGroup>
  <VTCodeGroupTab label="npm">

  ```sh
  $ npm create vue@latest
  ```

  </VTCodeGroupTab>
  <VTCodeGroupTab label="pnpm">
  
  ```sh
  $ pnpm create vue@latest
  ```

  </VTCodeGroupTab>
  <VTCodeGroupTab label="yarn">
  
  ```sh
  # For Yarn Modern (v2+)
  $ yarn create vue@latest
  
  # For Yarn ^v4.11
  $ yarn dlx create-vue@latest
  ```

  </VTCodeGroupTab>
  <VTCodeGroupTab label="bun">
  
  ```sh
  $ bun create vue@latest
  ```

  </VTCodeGroupTab>
</VTCodeGroup>

این دستور [create-vue](https://github.com/vuejs/create-vue) را نصب و اجرا می‌کند، ابزار رسمی ساخت پروژه Vue.

- برای یادگیری بیشتر در مورد Vite، [مستندات Vite](https://vitejs.dev) را ببینید.
- برای پیکربندی رفتارهای خاص Vue در یک پروژه ساخته شده با Vite، برای مثال پاس دادن گزینه‌هایی به کامپایلر Vue، مستندات [‎@vitejs/plugin-vue](https://github.com/vitejs/vite-plugin-vue/tree/main/packages/plugin-vue#readme) را ببینید.

هر دو محیط آنلاینی که در بالا ذکر شدن از دانلود فایل‌ها به عنوان یک پروژه Vite پشتیبانی می‌کنند.

### Vue CLI {#vue-cli}

[Vue CLI](https://cli.vuejs.org/) مجموعه ابزار رسمی مبتنی بر وب‌پک برای Vue است. اکنون در حالت نگهداری است و توصیه می‌کنیم پروژه‌های جدید را با Vite شروع کنید، مگر اینکه به ویژگی‌های خاص وب‌پک وابسته باشید. Vite در بیشتر موارد تجربه توسعه‌دهنده بهتری ارائه می‌دهد.

برای اطلاعات در مورد مهاجرت از Vue CLI به Vite:

- [راهنمای مهاجرت از Vue CLI به Vite در VueSchool.io](https://vueschool.io/articles/vuejs-tutorials/how-to-migrate-from-vue-cli-to-vite/)
- [ابزارها / پلاگین‌هایی که به مهاجرت خودکار کمک می‌کنند](https://github.com/vitejs/awesome-vite#vue-cli)

### نکته در مورد کامپایل تمپلیت در مرورگر {#note-on-in-browser-template-compilation}

هنگام استفاده از Vue بدون مرحله build، تمپلیت‌های کامپوننت مستقیماً در HTML صفحه یا به عنوان رشته‌های جاوااسکریپ نوشته می‌شوند. در چنین مواردی، Vue نیاز دارد کامپایلر تمپلیت را برای کامپایل تمپلیت‌ها، به مرورگر بفرستد. از طرف دیگر، این کامپایلر غیرضروری خواهد بود اگر تمپلیت‌ها را با استفاده از یک مرحله build، از پیش کامپایل (pre-compiled) کنیم. برای کاهش اندازه باندل کلاینت، Vue گزینه‌ای هایی را برای [build در موارد استفاده مختلف](https://unpkg.com/browse/vue@3/dist/) ارائه می‌دهد:

- فایل‌های ساخته شده که با `vue.runtime.*‎` شروع می‌شوند، **runtime-only builds** هستند: آن‌ها شامل کامپایلر نیستند. هنگام استفاده از این بیلدها، تمام تمپلیت‌ها باید از طریق یک مرحله build اضافه‌تر از پیش کامپایل (pre-compiled) شوند.

- فایل‌های ساخته شده‌ که شامل ‍`‎.runtime` نیستند **full builds** هستند: آن‌ها شامل کامپایلر هستند و از کامپایل تمپلیت‌ها مستقیماً در مرورگر پشتیبانی می‌کنند. با این حال، آن‌ها حجم فایل را حدود ‎~14kb افزایش می‌دهند.

تنظیمات پیش‌فرض ابزار ما از runtime-only build استفاده می‌کند زیرا تمام تمپلیت‌ها در SFC ها از پیش کامپایل می‌شوند. اگر به هر دلیلی، حتی با وجود مرحله‌ای برای build، نیاز به کامپایل تمپلیت در مرورگر دارید، می‌توانید این کار را با تغییر `vue` alias به `vue/dist/vue.esm-bundler.js` در ابزار build خود انجام دهید.

اگر به دنبال جایگزین سبک‌تری برای استفاده بدون مرحله build هستید، [petite-vue](https://github.com/vuejs/petite-vue) را بررسی کنید.

## پشتیبانی IDE {#ide-support}

- تنظیمات توصیه شده [VS Code](https://code.visualstudio.com/) + [افزونه Vue - Official](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (نام قبلی Volar) است. این افزونه syntax highlighting، پشتیبانی TypeScript و intellisense برای تمپلیت و propهای کامپوننت را ارائه می‌دهد.

  :::tip نکته
  Vue - Official جایگزین Vetur می‌شود، افزونه رسمی قبلی VS Code ما برای Vue 2. اگر در حال حاضر Vetur نصب شده است، مطمئن شوید در پروژه‌های Vue 3 آن را غیرفعال می‌کنید.
  :::

- [WebStorm](https://www.jetbrains.com/webstorm/) هم از SFC های Vue پشتیبانی درونی عالی ارائه می‌دهد.

- سایر IDE هایی که از [پروتکل سرویس زبان](https://microsoft.github.io/language-server-protocol/) (LSP) پشتیبانی می‌کنند هم می‌توانند از عملکردهای اصلی Volar از طریق LSP استفاده کنند:

  - پشتیبانی Sublime Text از طریق [LSP-Volar](https://github.com/sublimelsp/LSP-volar).

  - پشتیبانی vim / Neovim از طریق [coc-volar](https://github.com/yaegassy/coc-volar).

  - پشتیبانی emacs از طریق [lsp-mode](https://emacs-lsp.github.io/lsp-mode/page/lsp-volar/).

## Browser Devtools {#browser-devtools}

افزونه devtools در Vue به شما اجازه می‌دهد درخت کامپوننت‌های یک برنامه را کاوش کنید، وضعیت کامپوننت‌‌ها را بررسی کنید، رویدادهای state management را ردیابی کنید و عملکرد برنامه را پروفایل کنید.

![devtools screenshot](./images/devtools.png)

- [مستندات](https://devtools.vuejs.org/)
- [افزونه Chrome](https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
- [پلاگین Vite](https://devtools.vuejs.org/guide/vite-plugin)
- [Standalone Electron app](https://devtools.vuejs.org/guide/installation.html#standalone)

## TypeScript {#typescript}

مقاله اصلی: [استفاده از Vue با TypeScript](/guide/typescript/overview).

- [افزونه Vue - Official](https://github.com/johnsoncodehk/volar) بررسی انطباق تایپ برای SFC ها با استفاده از بلوک‌های `<script lang="ts"‎>` را فراهم می‌کند، شامل تمپلیت و اعتبارسنجی prop های بین کامپوننتی می‌شود.

- از [`vue-tsc`](https://github.com/vuejs/language-tools/tree/master/packages/tsc) برای انجام همان بررسی انطباق تایپ از خط فرمان، یا برای تولید فایل‌های `d.ts` برای SFC ها استفاده کنید.

## Testing {#testing}

مقاله اصلی: [راهنمای Testing](/guide/scaling-up/testing).

- [Cypress](https://www.cypress.io/) برای تست‌های E2E توصیه می‌شود. همچنین می‌تواند برای تست کامپوننت برای SFC های Vue از طریق [Cypress Component Test Runner](https://docs.cypress.io/guides/component-testing/introduction) استفاده شود.

- [Vitest](https://vitest.dev/) یک اجراکننده تست است که توسط اعضای تیم Vue / Vite ایجاد شده و بر سرعت تمرکز دارد. به طور خاص برای برنامه‌های مبتنی بر Vite طراحی شده است تا همان حلقه بازخورد فوری برای تست‌های unit / کامپوننت را فراهم کند.

- [Jest](https://jestjs.io/) می‌تواند با استفاده از [vite-jest](https://github.com/sodatea/vite-jest) با Vite کار کند. با این حال، این فقط در صورتی توصیه می‌شود که سوئیت‌های تست مبتنی بر Jest موجودی داشته باشید که نیاز به مهاجرت به یک تنظیم Vite دارند، زیرا Vitest عملکردهای مشابه را با یکپارچه‌سازی بسیار کارآمدتر فراهم می‌کند.

## قواعدنویسی | Linting {#linting}

تیم Vue پلاگین [eslint-plugin-vue](https://github.com/vuejs/eslint-plugin-vue) را نگهداری می‌کند، یک پلاگین [ESLint](https://eslint.org/) که از قوانین قواعدنویسی خاص SFC پشتیبانی می‌کند.

کاربرانی که قبلاً از Vue CLI استفاده می‌کردند ممکن است عادت داشته باشند linter ها را از طریق لودرهای webpack پیکربندی کنند. با این حال هنگام استفاده از تنظیمات build مبتنی بر Vite، توصیه کلی ما این است:

1. `npm install -D eslint eslint-plugin-vue` را اجرا کنید، سپس از [راهنمای پیکربندی](https://eslint.vuejs.org/user-guide/#usage) `eslint-plugin-vue` پیروی کنید.

2. افزونه‌های ESLint IDE را تنظیم کنید، [برای مثال ESLint برای VS Code](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)، تا بازخورد linter را مستقیماً در ادیتور خود در حین توسعه دریافت کنید. این همچنین از هزینه lint غیرضروری هنگام شروع سرور dev جلوگیری می‌کند.

3. ESLint را به عنوان بخشی از دستور production build اجرا کنید، تا بازخورد کامل linter را قبل از ارسال به production دریافت کنید.

4. (اختیاری) ابزارهایی مثل [lint-staged](https://github.com/okonet/lint-staged) را تنظیم کنید تا خودکار فایل‌های اصلاح شده را در کامیت git را lint کند.

## فرمت‌دهی (مرتب سازی کد) {#formatting}

- افزونه [Vue - Official](https://github.com/johnsoncodehk/volar) برای VS Code به صورت پیش‌فرض فرمت‌دهی برای SFC های Vue ارائه می‌دهد.

- به طور جایگزین، [Prettier](https://prettier.io/) از فرمت‌دهی SFC پشتیبانی می‌کند.

## SFC Custom Block Integrations {#sfc-custom-block-integrations}

بلوک‌های سفارشی به importهایی در همان فایل Vue با درخواست‌های متفاوت کامپایل می‌شوند. پردازش این درخواست‌های import بر عهده ابزار build پایه است.

- اگر از Vite استفاده می‌کنید، باید از یک پلاگین سفارشی Vite استفاده شود تا بلوک‌های سفارشی تبدیل به JavaScript قابل اجرا تبدیل شوند. [مثال](https://github.com/vitejs/vite-plugin-vue/tree/main/packages/plugin-vue#example-for-transforming-custom-blocks)

- اگر از Vue CLI یا webpack خام استفاده می‌کنید، باید یک لودر webpack پیکربندی شود تا بلوک‌های مطابق را تبدیل کند. [مثال](https://vue-loader.vuejs.org/guide/custom-blocks.html)

## پکیج‌های سطح پایین | Lower-Level Packages {#lower-level-packages}

### `‎@vue/compiler-sfc` {#vue-compiler-sfc}

- [مستندات](https://github.com/vuejs/core/tree/main/packages/compiler-sfc)

این پکیج بخشی از monorepo هسته Vue است و همیشه با همان نسخه پکیج اصلی `vue` منتشر می‌شود. به عنوان وابستگی پکیج اصلی vue شامل شده و تحت `vue/compiler-sfc` پروکسی شده است، بنابراین نیازی نیست آن را به طور جداگانه نصب کنید.

خود این بسته ابزارهای سطح پایین‌تر برای پردازش SFC های Vue فراهم می‌کند و فقط برای نویسندگان ابزار که نیاز به پشتیبانی از SFC های Vue در ابزارهای سفارشی دارند، در نظر گرفته شده است.

:::tip نکته
همیشه ترجیح داده می‌شود از این بسته از طریق deep import پکیج `vue/compiler-sfc` استفاده شود زیرا این اطمینان می‌دهد که نسخه آن با رانتایم Vue همگام است.
:::

### `‎@vitejs/plugin-vue` {#vitejs-plugin-vue}

- [مستندات](https://github.com/vitejs/vite-plugin-vue/tree/main/packages/plugin-vue)

پلاگین رسمی که پشتیبانی از SFC را در Vite فراهم می‌کند.

### `vue-loader` {#vue-loader}

- [مستندات](https://vue-loader.vuejs.org/)

بارگذار رسمی که پشتیبانی از SFC را در webpack فراهم می‌کند. اگر از Vue CLI استفاده می‌کنید، همچنین [مستندات مربوط به تغییر گزینه‌های vue-loader در Vue CLI](https://cli.vuejs.org/guide/webpack.html#modifying-options-of-a-loader) را ببینید.

## سایر محیط‌های آنلاین {#other-online-playgrounds}

- [VueUse Playground](https://play.vueuse.org)
- [Vue + Vite در Repl.it](https://replit.com/@templates/VueJS-with-Vite)
- [Vue در CodeSandbox](https://codesandbox.io/p/devbox/github/codesandbox/sandbox-templates/tree/main/vue-vite)
- [Vue در Codepen](https://codepen.io/pen/editor/vue)
- [Vue در WebComponents.dev](https://webcomponents.dev/create/cevue)

<!-- TODO ## Backend Framework Integrations -->
