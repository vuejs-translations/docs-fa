---
outline: deep
---

<script setup>
import { ref } from 'vue'
const message = ref('')
const multilineText = ref('')
const checked = ref(false)
const checkedNames = ref([])
const picked = ref('')
const selected = ref('')
const multiSelected = ref([])
</script>

# اتصال input در فرم {#form-input-bindings}

<div class="options-api">
  <VueSchoolLink href="https://vueschool.io/lessons/user-inputs-vue-devtools-in-vue-3" title="Free Lesson on User Inputs with Vue.js"/>
</div>

<div class="composition-api">
  <VueSchoolLink href="https://vueschool.io/lessons/vue-fundamentals-capi-user-inputs-in-vue" title="Free Lesson on User Inputs with Vue.js"/>
</div>

هنگامی که با فرم‌ها در فرانت‌اند سروکار داریم، اغلب نیاز داریم که داده‌های المنت‌های input فرم را با متغیر مربوطه در جاوااسکریپت همگام سازی کنیم. اتصال دستی داده و رویدادهای تغییر داده به یکدیگر می‌تواند دشوار باشد:

```vue-html
<input
  :value="text"
  @input="event => text = event.target.value">
```

دایرکتیو `v-model` به ما کمک می کند تا کد بالا را به صورت زیر خلاصه کنیم:

```vue-html
<input v-model="text">
```

علاوه بر این، `v-model` را می‌توان در انواع مختلف المنت‌های ورودی مانند `<textarea>` و `<select>` استفاده کرد. بر اساس المنتی که روی آن استفاده می شود، به طور خودکار به پراپرتی مخصوص و رویداد ویژه   DOM وصل می‌شود:

- المنت‌های `<textarea>` و `<input>` با تایپ‌های نوشتاری (text types) ، از پراپرتی `value` و رویداد `input` استفاده می‌کنند.
- `‎<input type="checkbox">‎` و `‎<input type="radio">‎` از پراپرتی `checked` و رویداد `change` استفاده می کنند.
- المنت `<select>` از `value` بعنوان پراپ و از `change` بعنوان رویداد استفاده می‌کند.

::: tip نکته
`v-model` مقدار دهی‌های اولیه `value`، `checked` یا `selected` موجود در المنت‌های فرم را نادیده می‌گیرد. همیشه اِستیت (state) جاوااسکریپت فعلی را به عنوان منبع حقیقی در نظر می گیرد. شما باید مقدار اولیه را در سمت جاوا اسکریپت با استفاده از <span class="options-api">آپشن [`data`](/api/options-state.html#data)</span><span class="composition-api">[reactivity APIs](/api/reactivity-core.html#reactivity-api-core)</span> اعلام کنید.
:::

## استفاده پایه {#basic-usage}

### Text {#text}

```vue-html
<p>پیام برابر است با: {{ message }}</p>
<input v-model="message" placeholder="متن را وارد کنید" />
```

<div dir="rtl" class="demo">
  <p>پیام برابر است با: {{ message }}</p>
  <input v-model="message" placeholder="متن را وارد کنید" />
</div>

<div class="composition-api">

[آن را در Playground امتحان کنید](https://play.vuejs.org/#eNo9jUEOgyAQRa8yYUO7aNkbNOkBegM2RseWRGACoxvC3TumxuX/+f+9ql5Ez31D1SlbpuyJoSBvNLjoA6XMUCHjAg2WnAJomWoXXZxSLAwBSxk/CP2xuWl9d9GaP0YAEhgDrSOjJABLw/s8+NJBrde/NWsOpWPrI20M+yOkGdfeqXPiFAhowm9aZ8zS4+wPv/RGjtZcJtV+YpNK1g==)

</div>
<div class="options-api">

[آن را در Playground امتحان کنید](https://play.vuejs.org/#eNo9jdEKwjAMRX8l9EV90L2POvAD/IO+lDVqoetCmw6h9N/NmBuEJPeSc1PVg+i2FFS90nlMnngwEb80JwaHL1sCQzURwFm258u2AyTkkuKuACbM2b6xh9Nps9o6pEnp7ggWwThRsIyiADQNz40En3uodQ+C1nRHK8HaRyoMy3WaHYa7Uf8To0CCRvzMwWESH51n4cXvBNTd8Um1H0FuTq0=)

</div>

<span id="vmodel-ime-tip"></span>
::: tip نکته
برای زبان هایی که به [IME](https://en.wikipedia.org/wiki/Input_method) نیاز دارند (چینی، ژاپنی، کره ای و غیره)، متوجه خواهید شد که `v-model` در طول ترکیب IME به روز نمی شود. اگر می‌خواهید به این به‌روزرسانی‌ها نیز پاسخ دهید، به‌جای استفاده از `v-model` از شنونده رویداد `input` و پیوند `value` خود استفاده کنید.
:::

### Multiline text {#multiline-text}

```vue-html
<span>پیام چند خطی برابر است با:</span>
<p style="white-space: pre-line;">{{ message }}</p>
<textarea v-model="message" placeholder="چند خط متن وارد کنید"></textarea>
```

<div dir="rtl" class="demo">
  <span>پیام چند خطی برابر است با:</span>
  <p style="white-space: pre-line;">{{ multilineText }}</p>
  <textarea v-model="multilineText" placeholder="چند خط متن وارد کنید"></textarea>
</div>

<div class="composition-api">

[آن را در Playground امتحان کنید](https://play.vuejs.org/#eNo9jktuwzAMRK9CaON24XrvKgZ6gN5AG8FmGgH6ECKdJjB891D5LYec9zCb+SH6Oq9oRmN5roEEGGWlyeWQqFSBDSoeYYdjLQk6rXYuuzyXzAIJmf0fwqF1Prru02U7PDQq0CCYKHrBlsQy+Tz9rlFCDBnfdOBRqfa7twhYrhEPzvyfgmCvnxlHoIp9w76dmbbtDe+7HdpaBQUv4it6OPepLBjV8Gw5AzpjxlOJC1a9+2WB1IZQRGhWVqsdXgb1tfDcbvYbJDRqLQ==)

</div>
<div class="options-api">

[آن را در Playground امتحان کنید](https://play.vuejs.org/#eNo9jk2OwyAMha9isenMIpN9hok0B+gN2FjBbZEIscDpj6LcvaZpKiHg2X6f32L+mX+uM5nO2DLkwNK7RHeesoCnE85RYHEJwKPg1/f2B8gkc067AhipFDxTB4fDVlrro5ce237AKoRGjihUldjCmPqjLgkxJNoxEEqnrtp7TTEUeUT6c+Z2CUKNdgbdxZmaavt1pl+Wj3ldbcubUegumAnh2oyTp6iE95QzoDEGukzRU9Y6eg9jDcKRoFKLUm27E5RXxTu7WZ89/G4E)

</div>

توجه کنید که گذاشتن متن درون `<textarea>` کار نخواهد کرد. به جای آن از `v-model` استفاده کنید.

```vue-html
<!-- بد -->
<textarea>{{ text }}</textarea>

<!-- خوب -->
<textarea v-model="text"></textarea>
```

### Checkbox {#checkbox}

checkbox منفرد، مقدار boolean:

```vue-html
<input type="checkbox" id="checkbox" v-model="checked" />
<label for="checkbox">{{ checked }}</label>
```

<div class="demo">
  <input type="checkbox" id="checkbox-demo" v-model="checked" />
  <label for="checkbox-demo">{{ checked }}</label>
</div>

<div class="composition-api">

[آن را در Playground امتحان کنید](https://play.vuejs.org/#eNpVjssKgzAURH/lko3tonVfotD/yEaTKw3Ni3gjLSH/3qhUcDnDnMNk9gzhviRkD8ZnGXUgmJFS6IXTNvhIkCHiBAWm6C00ddoIJ5z0biaQL5RvVNCtmwvFhFfheLuLqqIGQhvMQLgm4tqFREDfgJ1gGz36j2Cg1TkvN+sVmn+JqnbtrjDDiAYmH09En/PxphTebqsK8PY4wMoPslBUxQ==)

</div>
<div class="options-api">

[آن را در Playground امتحان کنید](https://play.vuejs.org/#eNpVjtEKgzAMRX8l9Gl72Po+OmH/0ZdqI5PVNnSpOEr/fVVREEKSc0kuN4sX0X1KKB5Cfbs4EDfa40whMljsTXIMWXsAa9hcrtsOEJFT9DsBdG/sPmgfwDHhJpZl1FZLycO6AuNIzjAuxGrwlBj4R/jUYrVpw6wFDPbM020MFt0uoq2a3CycadFBH+Lpo8l5jwWlKLle1QcljwCi/AH7gFic)

</div>

همچنین می‌توانیم چندین چک باکس را به یک آرایه یا مقدار [Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set) متصل کنیم

<div class="composition-api">

```js
const checkedNames = ref([])
```

</div>
<div class="options-api">

```js
export default {
  data() {
    return {
      checkedNames: []
    }
  }
}
```

</div>

```vue-html
<div>Checked names: {{ checkedNames }}</div>

<input type="checkbox" id="jack" value="Jack" v-model="checkedNames">
<label for="jack">Jack</label>

<input type="checkbox" id="john" value="John" v-model="checkedNames">
<label for="john">John</label>

<input type="checkbox" id="mike" value="Mike" v-model="checkedNames">
<label for="mike">Mike</label>
```

<div class="demo">
  <div>Checked names: {{ checkedNames }}</div>

  <input type="checkbox" id="demo-jack" value="Jack" v-model="checkedNames">
  <label for="demo-jack">Jack</label>

  <input type="checkbox" id="demo-john" value="John" v-model="checkedNames">
  <label for="demo-john">John</label>

  <input type="checkbox" id="demo-mike" value="Mike" v-model="checkedNames">
  <label for="demo-mike">Mike</label>
</div>

در این حالت، آرایه `checkedNames` همیشه حاوی مقادیر چک باکس‌های فعال خواهد بود.

<div class="composition-api">

[آن را در Playground امتحان کنید](https://play.vuejs.org/#eNqVkUtqwzAURbfy0CTtoNU8KILSWaHdQNWBIj8T1fohyybBeO+RbOc3i2e+vHvuMWggHyG89x2SLWGtijokaDF1gQunbfAxwQARaxihjt7CJlc3wgmnvGsTqAOqBqsfabGFXSm+/P69CsfovJVXckhog5EJcwJgle7558yBK+AWhuFxaRwZLbVCZ0K70CVIp4A7Qabi3h8FAV3l/C9Vk797abpy/lrim/UVmkt/Gc4HOv+EkXs0UPt4XeCFZHQ6lM4TZn9w9+YlrjFPCC/kKrPVDd6Zv5e4wjwv8ELezIxeX4qMZwHduAs=)

</div>
<div class="options-api">

[آن را در Playground امتحان کنید](https://play.vuejs.org/#eNqVUc1qxCAQfpXBU3tovS9WKL0V2hdoenDjLGtjVNwxbAl592rMpru3DYjO5/cnOLLXEJ6HhGzHxKmNJpBsHJ6DjwQaDypZgrFxAFqRenisM0BEStFdEEB7xLZD/al6PO3g67veT+XIW16Cr+kZEPbBKsKMAIQ2g3yrAeBqwjjeRMI0CV5kxZ0dxoVEQL8BXxo2C/f+3DAwOuMf1XZ5HpRNhX5f4FPvNdqLfgnOBK+PsGqPFg4+rgmyOAWfiaK5o9kf3XXzArc0zxZZnJuae9PhVfPHAjc01wRZnP/Ngq8/xaY/yMW74g==)

</div>

### Radio {#radio}

```vue-html
<div>Picked: {{ picked }}</div>

<input type="radio" id="one" value="One" v-model="picked" />
<label for="one">One</label>

<input type="radio" id="two" value="Two" v-model="picked" />
<label for="two">Two</label>
```

<div class="demo">
  <div>Picked: {{ picked }}</div>

  <input type="radio" id="one" value="One" v-model="picked" />
  <label for="one">One</label>

  <input type="radio" id="two" value="Two" v-model="picked" />
  <label for="two">Two</label>
</div>

<div class="composition-api">

[آن را در Playground امتحان کنید](https://play.vuejs.org/#eNqFkDFuwzAMRa9CaHE7tNoDxUBP0A4dtTgWDQiRJUKmHQSG7x7KhpMMAbLxk3z/g5zVD9H3NKI6KDO02RPDgDxSbaPvKWWGGTJ2sECXUw+VrFY22timODCQb8/o4FhWPqrfiNWnjUZvRmIhgrGn0DCKAjDOT/XfCh1gnnd+WYwukwJYNj7SyMBXwqNVuXE+WQXeiUgRpZyaMJaR5BX11SeHQfTmJi1dnNiE5oQBupR3shbC6LX9Posvpdyz/jf1OksOe85ayVqIR5bR9z+o5Qbc6oCk)

</div>
<div class="options-api">

[آن را در Playground امتحان کنید](https://play.vuejs.org/#eNqNkEEOAiEMRa/SsFEXyt7gJJ5AFy5ng1ITIgLBMmomc3eLOONSEwJ9Lf//pL3YxrjqMoq1ULdTspGa1uMjhkRg8KyzI+hbD2A06fmi1gAJKSc/EkC0pwuaNcx2Hme1OZSHLz5KTtYMhNfoNGEhUsZ2zf6j7vuPEQyDkmVSBPzJ+pgJ6Blx04qkjQ2tAGsYgkcuO+1yGXF6oeU1GHTM1Y1bsoY5fUQH55BGZcMKJd/t31l0L+WYdaj0V9Zb2bDim6XktAcxvADR+YWb)

</div>

### Select {#select}

select منفرد:

```vue-html
<div>Selected: {{ selected }}</div>

<select v-model="selected">
  <option disabled value="">Please select one</option>
  <option>A</option>
  <option>B</option>
  <option>C</option>
</select>
```

<div class="demo">
  <div>Selected: {{ selected }}</div>
  <select v-model="selected">
    <option disabled value="">Please select one</option>
    <option>A</option>
    <option>B</option>
    <option>C</option>
  </select>
</div>

<div class="composition-api">

[آن را در Playground امتحان کنید](https://play.vuejs.org/#eNp1j7EOgyAQhl/lwmI7tO4Nmti+QJOuLFTPxASBALoQ3r2H2jYOjvff939wkTXWXucJ2Y1x37rBBvAYJlsLPYzWuAARHPaQoHdmhILQQmihW6N9RhW2ATuoMnQqirPQvFw9ZKAh4GiVDEgTAPdW6hpeW+sGMf4VKVEz73Mvs8sC5stoOlSVYF9SsEVGiLFhMBq6wcu3IsUs1YREEvFUKD1udjAaebnS+27dHOT3g/yxy+nHywM08PJ3KksfXwJ2dA==)

</div>
<div class="options-api">

[آن را در Playground امتحان کنید](https://play.vuejs.org/#eNp1j1ELgyAUhf/KxZe2h633cEHbHxjstReXdxCYSt5iEP333XIJPQSinuN3jjqJyvvrOKAohAxN33oqa4tf73oCjR81GIKptgBakTqd4x6gRxp6uymAgAYbQl1AlkVvXhaeeMg8NbMg7LxRhKwAZPDKlvBK8WlKXTDPnFzOI7naMF46p9HcarFxtVgBRpyn1lnQbVBvwwWjMgMyycTToAr47wZnUeaR3mfL6sC/H/iPnc/vXS9gIfP0UTH/ACgWeYE=)

</div>

:::tip توصیه
اگر مقدار اولیه عبارت `v-model` شما با هیچ یک از گزینه‌ها (options) مطابقت نداشته باشد، المنت `<select>` در حالت «انتخاب نشده» نمایش داده می شود. در iOS این باعث می‌شود که کاربر نتواند اولین مورد را انتخاب کند زیرا iOS رویداد change را در این مورد اجرا نمی‌کند. بنابراین توصیه می‌شود همانطور که در مثال بالا نشان داده شده است، یک option غیرفعال با مقدار خالی ارائه کنید.
:::

Multiple select (متصل به آرایه):

```vue-html
<div>Selected: {{ selected }}</div>

<select v-model="selected" multiple>
  <option>A</option>
  <option>B</option>
  <option>C</option>
</select>
```

<div class="demo">
  <div>Selected: {{ multiSelected }}</div>

  <select v-model="multiSelected" multiple>
    <option>A</option>
    <option>B</option>
    <option>C</option>
  </select>
</div>

<div class="composition-api">

[آن را در Playground امتحان کنید](https://play.vuejs.org/#eNp1kL2OwjAQhF9l5Ya74i7QBhMJeARKTIESIyz5Z5VsAsjyu7NOQEBB5xl/M7vaKNaI/0OvRSlkV7cGCTpNPVbKG4ehJYjQ6hMkOLXBwYzRmfLK18F3GbW6Jt3AKkM/+8Ov8rKYeriBBWmH9kiaFYBszFDtHpkSYnwVpCSL/JtDDE4+DH8uNNqulHiCSoDrLRm0UyWzAckEX61l8Xh9+psv/vbD563HCSxk8bY0y45u47AJ2D/HHyDm4MU0dC5hMZ/jdal8Gg8wJkS6A3nRew4=)

</div>
<div class="options-api">

[آن را در Playground امتحان کنید](https://play.vuejs.org/#eNp1UEEOgjAQ/MqmJz0oeMVKgj7BI3AgdI1NCjSwIIbwdxcqRA4mTbsznd2Z7CAia49diyIQsslrbSlMSuxtVRMofGStIRiSEkBllO32rgaokdq6XBBAgwZzQhVAnDpunB6++EhvncyAsLAmI2QEIJXuwvvaPAzrJBhH6U2/UxMLHQ/doagUmksiFmEioOCU2ho3krWVJV2VYSS9b7Xlr3/424bn1LMDA+n9hGbY0Hs2c4J4sU/dPl5a0TOAk+/b/rwsYO4Q4wdtRX7l)

</div>

optionهای select را می توان به صورت پویا با `v-for` رندر کرد:

<div class="composition-api">

```js
const selected = ref('A')

const options = ref([
  { text: 'One', value: 'A' },
  { text: 'Two', value: 'B' },
  { text: 'Three', value: 'C' }
])
```

</div>
<div class="options-api">

```js
export default {
  data() {
    return {
      selected: 'A',
      options: [
        { text: 'One', value: 'A' },
        { text: 'Two', value: 'B' },
        { text: 'Three', value: 'C' }
      ]
    }
  }
}
```

</div>

```vue-html
<select v-model="selected">
  <option v-for="option in options" :value="option.value">
    {{ option.text }}
  </option>
</select>

<div>Selected: {{ selected }}</div>
```

<div class="composition-api">

[آن را در Playground امتحان کنید](https://play.vuejs.org/#eNplkMFugzAQRH9l5YtbKYU7IpFoP6CH9lb3EMGiWgLbMguthPzvXduEJMqNYUazb7yKxrlimVFUop5arx3BhDS7kzJ6dNYTrOCxhwC9tyNIjkpllGmtmWJ0wJawg2MMPclGPl9N60jzx+Z9KQPcRfhHFch3g/IAy3mYkVUjIRzu/M9fe+O/Pvo/Hm8b3jihzDdfr8s8gwewIBzdcCZkBVBnXFheRtvhcFTiwq9ECnAkQ3Okt54Dm9TmskYJqNLR3SyS3BsYct3CRYSFwGCpusx/M0qZTydKRXWnl9PHBlPFhv1lQ6jL6MZl+xoR/gFjPZTD)

</div>
<div class="options-api">

[آن را در Playground امتحان کنید](https://play.vuejs.org/#eNp1kMFqxCAQhl9l8JIWtsk92IVtH6CH9lZ7COssDbgqZpJdCHn3nWiUXBZE/Mdvxv93Fifv62lE0Qo5nEPv6ags3r0LBBov3WgIZmUBdEfdy2s6AwSkMdisAAY0eCbULVSn6pCrzlPv7NDCb64AzEB4J+a+LFYHmDozYuyCpfTtqJ+b21Efz6j/gPtpn8xl7C8douaNl2xKUhaEV286QlYAMgWB6e3qNJp3JXIyJSLASErFyMUFBjbZ2xxXCWijkXJZR1kmsPF5g+s1ACybWdmkarLSpKejS0VS99Pxu3wzT8jOuF026+2arKQRywOBGJfE)

</div>

## پیوندهای مقدار (Value Bindings) {#value-bindings}

برای رادیو، چک باکس و optionهای Select، مقادیر اتصال `v-model` معمولاً رشته‌های ثابت (یا بولین برای چک باکس) هستند:

```vue-html
<!-- می‌شود "a" هنگام انتخاب شدن برابر با مقدار رشته `picked` متغیر -->
<input type="radio" v-model="picked" value="a" />

<!-- false می‌شود یا true یا `toggle` متغیر -->
<input type="checkbox" v-model="toggle" />

<!-- می‌شود "abc" هنگامی که اولین آپشن انتخاب شود برابر با مقدار رشته `selected` متغیر -->
<select v-model="selected">
  <option value="abc">ABC</option>
</select>
```

اما گاهی اوقات ممکن است بخواهیم مقدار آن را به یک پراپرتی پویا در نمونه فعال فعلی متصل کنیم. برای رسیدن به این هدف می‌توانیم از `v-bind` استفاده کنیم. علاوه بر این، استفاده از `v-bind` به ما این امکان را می دهد که مقدار ورودی (input) را به مقادیر غیر رشته‌ای متصل کنیم.

### Checkbox {#checkbox-1}

```vue-html
<input
  type="checkbox"
  v-model="toggle"
  true-value="yes"
  false-value="no" />
```

`true-value` و `false-value` ویژگی‌های مخصوص Vue هستند که فقط با `v-model` کار می‌کنند.  با علامت زدن کادر روی `'yes'` و وقتی علامت آن را بردارید روی `'no'` تنظیم می شود. همچنین می‌توانید با استفاده از `v-bind` آن‌ها را به مقادیر پویا متصل کنید:

```vue-html
<input
  type="checkbox"
  v-model="toggle"
  :true-value="dynamicTrueValue"
  :false-value="dynamicFalseValue" />
```

:::tip توصیه
ویژگی‌های `true-value` و `false-value` بر ویژگی `value` اینپوت تأثیر نمی‌گذارند، زیرا مرورگرها چک‌باکس‌های علامت‌نخورده را در فرم ارسالی درج نمی‌کنند. برای تضمین اینکه یکی از دو مقدار در یک فرم ارسال می‌شود (به عنوان مثال "بله" یا "خیر")، به جای آن از اینپوت‌های رادیویی استفاده کنید.
:::

### Radio {#radio-1}

```vue-html
<input type="radio" v-model="pick" :value="first" />
<input type="radio" v-model="pick" :value="second" />
```

وقتی اولین ورودی رادیویی علامت زده می‌شود، متغیر `pick` روی مقدار `first` تنظیم می‌شود و وقتی ورودی دوم انتخاب می‌شود روی مقدار `second` تنظیم می‌شود.

### Select Options {#select-options}

```vue-html
<select v-model="selected">
  <!-- inline object literal -->
  <option :value="{ number: 123 }">123</option>
</select>
```

`v-model` از اتصال داده مقادیر غیر رشته‌ای نیز پشتیبانی می‌کند! در مثال بالا هنگامی که option انتخاب شده است، `selected` به آبجکت `{ number: 123 }` تنظیم می‌شود.

## تغییردهنده‌‌ها (Modifiers) {#modifiers}

### `‎.lazy` {#lazy}

به‌طور پیش‌فرض، `v-model` اینپوت را با داده‌ها پس از هر رویداد `input` همگام‌سازی می‌کند (به استثنای ترکیب IME همانطور که [در بالا بیان شد](#vmodel-ime-tip)). می‌توانید پس از رویدادهای `change` به جای همگام‌سازی، تغییردهنده‌ `lazy` را اضافه کنید:

```vue-html
<!-- "input" به جای "change" همگام سازی بعد از -->
<input v-model.lazy="msg" />
```

### `‎.number` {#number}

اگر می‌خواهید ورودی کاربر به‌طور خودکار به صورت عددی تایپ شود، می‌توانید تغییردهنده‌ `number` را به اینپوت‌های `v-model` خود اضافه کنید:

```vue-html
<input v-model.number="age" />
```

اگر مقدار با `parseFloat()‎` قابل تجزیه نباشد، به جای آن از مقدار اصلی استفاده می‌شود.

اگر اینپوت دارای `type="number"‎` باشد، تغییردهنده‌ `number` به‌طور خودکار اعمال می‌شود.

### `‎.trim` {#trim}

اگر می‌خواهید فضای خالی اینپوت کاربر به‌طور خودکار بریده شود، می‌توانید تغییردهنده‌ `trim` را به ورودی‌های مدیریت‌شده `v-model` خود اضافه کنید:

```vue-html
<input v-model.trim="msg" />
```

##  `v-model` در کامپوننت‌ها {#v-model-with-components}

> اگر هنوز با کامپوننت های Vue آشنا نیستید، می توانید از خواندن این قسمت صرف نظر کنید.

انواع اینپوت‌های نهادینه شده HTML همیشه نیازهای شما را برآورده نمی‌کند. خوشبختانه، کامپوننت‌های Vue به شما این امکان را می‌دهد که اینپوت‌های قابل استفاده مجدد را با رفتار کاملاً سفارشی سازی شده بسازید. این اینپوت‌ها حتی با `v-model` کار می‌کنند! برای کسب اطلاعات بیشتر، در راهنمای کامپوننت‌ها درباره [کاربرد `v-model`](/guide/components/v-model) مطالعه کنید.
