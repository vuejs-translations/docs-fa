# Props {#props}

کامپوننت فرزند می‌تواند ورودی از والد را از طریق props دریافت کند. ابتدا باید **props** دریافتی خود را اعلام کند:

<div class="composition-api">
<div class="sfc">

```vue
<!-- ChildComp.vue -->
<script setup>
const props = defineProps({
  msg: String
})
</script>
```

توجه داشته باشید `defineProps()‎` یک ماکرو زمان کامپایل است و نیازی به import شدن ندارد. هنگامی که تعریف شد `msg` می‌تواند در تمپلیت کامپوننت فرزند استفاده شود. همچنین می‌توان با استفاده از آبجکت برگردانده شده از `defineProps()‎` به آن در جاوااسکریپت دسترسی پیدا کرد.

</div>

<div class="html">

```js
// in child component
export default {
  props: {
    msg: String
  },
  setup(props) {
    // access props.msg
  }
}
```

هنگامی که تعریف شد، پِراپ `msg` روی `this` قرار گرفته و می‌تواند در تمپلیت کامپوننت فرزند استفاده شود. propهای دریافت شده به عنوان اولین آرگومان به `setup()‎` پاس داده می‌شوند.

</div>

</div>

<div class="options-api">

```js
// in child component
export default {
  props: {
    msg: String
  }
}
```

هنگامی که تعریف شد، پِراپ `msg` روی `this` قرار گرفته و می‌تواند در قالب کامپوننت فرزند استفاده شود.

</div>

والد می‌تواند prop را مانند اتریبیوت‌ها به فرزند پاس دهد. برای پاس دادن یک داده داینامیک، می‌توانیم از سینتکس `v-bind` هم استفاده کنیم:

<div class="sfc">

```vue-html
<ChildComp :msg="greeting" />
```

</div>
<div class="html">

```vue-html
<child-comp :msg="greeting"></child-comp>
```

</div>

حالا خودتان در ادیتور امتحان کنید.
