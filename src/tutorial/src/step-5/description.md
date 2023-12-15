# Form Bindings {#form-bindings}

با استفاده همزمان از `v-bind` و `v-on`، می‌توانیم یک ارتباط دوطرفه روی عناصر ورودی فرم ایجاد کنیم:

```vue-html
<input :value="text" @input="onInput">
```

<div class="options-api">

```js
methods: {
  onInput(e) {
    // را DOM یک هندلر رویداد v-on
    // به عنوان آرگومان دریافت می‌کند
    this.text = e.target.value
  }
}
```

</div>

<div class="composition-api">

```js
function onInput(e) {
    // را DOM یک هندلر رویداد v-on
    // به عنوان آرگومان دریافت می‌کند
  text.value = e.target.value
}
```

</div>

در input box تایپ کنید - همزمان با تایپ شما، باید متن در `<p>` را به‌روز شده به شکل لایو ببینید.

برای ساده کردن ارتباط دوطرفه، Vue یک دایرکتیو به نام `v-model` ارائه می‌دهد که در واقع نوشتار ساده‌تری برای بالا است:

```vue-html
<input v-model="text">
```

`v-model` به صورت خودکار مقدار `<input>` را با state متصل شده همگام‌سازی می‌کند، بنابراین دیگر نیازی به استفاده از یک هندلر رویداد برای این کار نداریم.

`v-model` نه تنها روی inputهای متنی، بلکه روی سایر انواع input مثل چک باکس‌ها، رادیو باتن‌ها و سلکت‌ها هم کار می‌کند(checkboxes, radio-buttons, select-dropdowns). ما جزئیات بیشتری را در <a target="_blank" href="/guide/essentials/forms.html">راهنما - Form Bindings</a> پوشش داده‌ایم.

حالا سعی کنید کد را بازنویسی کنید تا از `v-model` استفاده کند.
