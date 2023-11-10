# Slots {#slots}

علاوه بر اینکه می‌توان داده‌ها را از طریق props به فرزند ارسال کرد، کامپوننت والد همچنین می‌تواند بخشی از تمپلیت را به فرزند از طریق **slots (اسلات‌ها)** ارسال کند:

<div class="sfc">

```vue-html
<ChildComp>
  This is some slot content!
</ChildComp>
```

</div>
<div class="html">

```vue-html
<child-comp>
  This is some slot content!
</child-comp>
```

</div>

کامپوننت فرزند می‌تواند محتوای slot آمده از والد را با استفاده از عنصر `<slot>` به عنوان نقطه‌خروج (outlet) نمایش دهد:

<div class="sfc">

```vue-html
<!-- in child template -->
<slot/>
```

</div>
<div class="html">

```vue-html
<!-- in child template -->
<slot></slot>
```

</div>

محتوای داخل `<slot>` به عنوان محتوای "جایگزین" (fallback) تلقی می‌شود: اگر والد محتوای اسلاتی ارسال نکرده باشد، این محتوا نمایش داده خواهد شد.

```vue-html
<slot>Fallback content</slot>
```

در حال حاضر ما هیچ محتوایی تحت اسلات به `<ChildComp>` ارسال نمی‌کنیم، بنابراین شما باید محتوای جایگزین را ببینید. بیایید محتوای از جنس slot را به فرزند ارائه دهیم و در عین حال از state تعریف شده `msg` والد استفاده کنیم.
