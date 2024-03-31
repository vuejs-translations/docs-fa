---
outline: deep
---

# راهنمای استایل (ظاهر) {#style-guide}

این بخش رسمی آموزش ظاهر مخصوص vue است. اگر از vue در پروژه‌ای استفاده می‌کنید این بهترین منبع برای دور شدن از ارور ها, bikeshedding و ضد الگوهاست.با این‌حال ما فکر نمیکنیم هیچ راهنمایی‌ای برای تمامی تیم‌ها و پروژه‌ها ایده‌ال باشد. تجربه نشان می‌دهد الگوهای ذهنی را میزان فناوری در اطراف و ارزش‌های ذهنی مشخص می‌کنند.
در بیشتر موارد، ما همچنین از پیشنهادات در مورد جاوا اسکریپت یا به طور کلی HTML اجتناب می کنیم. برای ما حائز اهمیت نیست اگر نقطه ویرگول یا کاماهای انتهایی استفاده می‌کنید. ما اهمیتی نمی‌دهیم که در HTML شما برای استرینگ‌ها از نقل قول‌های تک یا دو نقل قول (double quotation or single quotation) استفاده می‌کنید. با این حال، برخی استثناها وجود دارد، مثلا ما دریافتیم که داشتن یک الگوی خاص در زمینه Vue مفید است.

در نهایت، قوانین به چهار دسته تقسیم می‌شوند:

## دسته‌بندی‌های قوانین {#rule-categories}

### اولویت‌های الف: ضروری‌‌ها (پیشگیری از خطا) {#priority-a-essential-error-prevention}

این قوانین به جلوگیری از خطاها کمک می کنند، بنابراین آنها را یاد بگیرید و به هر قیمتی از آنها استفاده کنید. ممکن است استثنائاتی وجود داشته باشد، اما بسیار کمیاب هستند و فقط توسط افرادی که در جاوا اسکریپت و Vue تبحر دارند، ممکن است ایجاد شوند.
- [دیدن همه قوانین الویت الف](./rules-essential)

### اولویت‌های ب: به شدت توصیه می شود. {#priority-b-strongly-recommended}

این قوانین برای بهبود خوانایی و/یا تجربه توسعه دهنده در اکثر پروژه ها یافت شده است. در صورت وجود ارور کد شما همچنان اجرا می شود، اما نقض ها باید کم باشند و به خوبی توجیه شوند.
- [دیدن همه قوانین الویت ب](./rules-strongly-recommended)

### Priority C: Recommended {#priority-c-recommended}

Where multiple, equally good options exist, an arbitrary choice can be made to ensure consistency. In these rules, we describe each acceptable option and suggest a default choice. That means you can feel free to make a different choice in your own codebase, as long as you're consistent and have a good reason. Please do have a good reason though! By adapting to the community standard, you will:

1. Train your brain to more easily parse most of the community code you encounter
2. Be able to copy and paste most community code examples without modification
3. Often find new hires are already accustomed to your preferred coding style, at least in regards to Vue

- [See all priority C rules](./rules-recommended)

### Priority D: Use with Caution {#priority-d-use-with-caution}

Some features of Vue exist to accommodate rare edge cases or smoother migrations from a legacy code base. When overused however, they can make your code more difficult to maintain or even become a source of bugs. These rules shine a light on potentially risky features, describing when and why they should be avoided.

- [See all priority D rules](./rules-use-with-caution)
