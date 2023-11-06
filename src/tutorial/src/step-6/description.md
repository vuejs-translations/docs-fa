# Conditional Rendering {#conditional-rendering}

می‌توانیم از directive ایی به نام `v-if` برای نمایش یک عنصر به صورت شرطی استفاده کنیم:

```vue-html
<h1 v-if="awesome">Vue is awesome!</h1>
```

این `<h1>` فقط در صورتی نمایش داده می‌شود که مقدار `awesome` حاوی یک مقدار [truthy](https://developer.mozilla.org/en-US/docs/Glossary/Truthy) باشد. اگر مقدار `awesome` به یک مقدار [falsy](https://developer.mozilla.org/en-US/docs/Glossary/Falsy) تغییر کند، از DOM حذف می‌شود.

همچنین می‌توانیم از `v-else` و `v-else-if` برای نشان دادن شاخه‌های دیگر شرط استفاده کنیم:

```vue-html
<h1 v-if="awesome">Vue is awesome!</h1>
<h1 v-else>Oh no 😢</h1>
```

در حال حاضر، نمونه کد، همزمان هر دو `<h1>` را نمایش می‌دهد و دکمه هیچ عملی انجام نمی‌دهد. برای اینکه بتوانیم از دکمه برای تغییر میان آن‌ها استفاده کنیم، باید `v-if` و `v-else` را به آن‌ها اضافه کنیم و متد `toggle()‎` را پیاده‌سازی کنیم.

جزئیات بیشتر در مورد `v-if`: <a target="_blank" href="/guide/essentials/conditional.html">راهنما - Conditional Rendering</a>
