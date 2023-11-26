# Emits {#emits}

علاوه بر دریافت props یک کامپوننت فرزند همچنین می‌تواند رویدادهایی را به والد ارسال کند:

<div class="composition-api">
<div class="sfc">

```vue
<script setup>
// شده emit تعریف رویدادهای
const emit = defineEmits(['response'])

// با آرگومان emit
emit('response', 'hello from child')
</script>
```

</div>

<div class="html">

```js
export default {
  // شده emit تعریف رویدادهای
  emits: ['response'],
  setup(props, { emit }) {
    // با آرگومان emit
    emit('response', 'hello from child')
  }
}
```

</div>

</div>

<div class="options-api">

```js
export default {
  // شده emit تعریف رویدادهای
  emits: ['response'],
  created() {
    // با آرگومان emit
    this.$emit('response', 'hello from child')
  }
}
```

</div>

اولین آرگومان <span class="options-api">`this.$emit()‎`</span><span class="composition-api">`emit()‎`</span> نام رویداد است. هر آرگومان اضافی به listener رویداد پاس داده می‌شود.

والد می‌تواند با استفاده از `v-on` به رویدادهای ارسال شده از فرزند گوش دهد - در اینجا handler آرگومان اضافی را از تابع emit فرزند دریافت کرده و آن را به state محلی `childMsg` اختصاص می‌دهد:

<div class="sfc">

```vue-html
<ChildComp @response="(msg) => childMsg = msg" />
```

</div>
<div class="html">

```vue-html
<child-comp @response="(msg) => childMsg = msg"></child-comp>
```

</div>

حالا خودتان در ادیتور امتحان کنید.
