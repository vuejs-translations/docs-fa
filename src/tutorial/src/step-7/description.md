# List Rendering {#list-rendering}

به منظور رندر کردن یک لیست از عناصر بر اساس یک آرایه، می‌توانیم از directive (دستور) `v-for` استفاده کنیم:

```vue-html
<ul>
  <li v-for="todo in todos" :key="todo.id">
    {{ todo.text }}
  </li>
</ul>
```

در اینجا، `todo` یک متغیر محلی است که عنصر آرایه‌ای را که در حال حاضر در حال تکرار است، نمایان می‌کند. این تنها در داخل  `v-for` قابل دسترسی است و مشابه اسکوپ یک تابع عمل می‌کند.

توجه کنید که ما همچنین به هر آبجکتی todo یک `id` منحصر به فرد می‌دهیم و آن را به عنوان <a target="_blank" href="/api/built-in-special-attributes.html#key">`key` (که یک ویژگی خاص است)</a> به هر `<li>` متصل می‌کنیم. `key` به Vue این امکان را می‌دهد که هر `<li>` را با دقت با موقعیت آبجکت متناظر آن در آرایه مطابقت دهد.

دو روش برای به‌روزرسانی لیست وجود دارد:

1. فراخوانی [mutating methods](https://stackoverflow.com/questions/9009879/which-javascript-array-functions-are-mutating) (متدهای تغییردهنده) بر روی آرایه مبدا:

   <div class="composition-api">

   ```js
   todos.value.push(newTodo)
   ```

     </div>
     <div class="options-api">

   ```js
   this.todos.push(newTodo)
   ```

   </div>

2. جایگزینی آرایه با یک آرایه جدید:

   <div class="composition-api">

   ```js
   todos.value = todos.value.filter(/* ... */)
   ```

     </div>
     <div class="options-api">

   ```js
   this.todos = this.todos.filter(/* ... */)
   ```

   </div>

در اینجا یک لیست ساده از کارها داریم - سعی کنید منطق متدهای `addTodo()‎` و `removeTodo()‎` را پیاده‌سازی کنید تا کار کند!

برای اطلاعات بیشتر در مورد `v-for` می‌توانید به <a target="_blank" href="/guide/essentials/list.html">راهنما - List Rendering</a> مراجعه کنید.
