<script lang="ts">
const shuffleMembers = (
  members: Member[],
  pinTheFirstMember = false
): void => {
  let offset = pinTheFirstMember ? 1 : 0
  // `i` is between `1` and `length - offset`
  // `j` is between `0` and `length - offset - 1`
  // `offset + i - 1` is between `offset` and `length - 1`
  // `offset + j` is between `offset` and `length - 1`
  let i = members.length - offset
  while (i > 0) {
    const j = Math.floor(Math.random() * i)
    ;[members[offset + i - 1], members[offset + j]] = [
      members[offset + j],
      members[offset + i - 1]
    ]
    i--
  }
}
</script>

<script setup lang="ts">
import { VTLink } from '@vue/theme'
import membersCoreData from './members-core.json'
import membersEmeritiData from './members-emeriti.json'
import membersPartnerData from './members-partner.json'
import TeamHero from './TeamHero.vue'
import TeamList from './TeamList.vue'
import type { Member } from './Member'
shuffleMembers(membersCoreData as Member[], true)
shuffleMembers(membersEmeritiData as Member[])
shuffleMembers(membersPartnerData as Member[])
</script>

<template>
  <div class="TeamPage">
    <TeamHero>
      <template #title>با گروه ما ملاقات کنید!</template>
      <template #lead>
        توسعه‌ی ویو و اکوسیستم آن توسط یک گروه بین‌المللی هدایت می‌شود
         که برخی از منتخبان آن در زیر آورده شده است.

      </template>

      <template #action>
        <VTLink
          href="https://github.com/vuejs/governance/blob/master/Team-Charter.md"
        >
          راجع به گروه‌ها بیشتر بدانید
        </VTLink>
      </template>
    </TeamHero>

    <TeamList :members="(membersCoreData as Member[])">
      <template #title>اعضای اصلی تیم</template>
      <template #lead>
      اعضای اصلی تیم افرادی هستند که 
      به‌طور فعال در نگه‌داری یک یا چند پروژه‌ی اصلی 
      مشارکت دارند. آن‌ها مشارکت‌های چشمگیری در اکوسیستم Vue
       داشته‌اند و با تعهدی بلندمدت، برای
        موفقیت این پروژه‌ها و کاربرانشان تلاش می‌کنند.
      </template>
    </TeamList>

    <TeamList :members="(membersEmeritiData as Member[])">
      <template #title>اعضای افتخاری تیم اصلی</template>
      <template #lead>
        در این بخش از برخی اعضای پیشین تیم 
        اصلی که دیگر به‌طور فعال در تیم فعالیت نمی‌کنند و 
        در گذشته مشارکت‌های ارزشمندی داشته‌اند، تقدیر می‌کنیم.
        </template>
    </TeamList>

    <TeamList :members="membersPartnerData as Member[]">
      <template #title>شرکای کامیونیتی Vue</template>
      <template #lead>
      برخی از اعضای کامیونیتی 
      Vue با مشارکت‌های ارزشمند خود نقش چشمگیری در رشد و غنای 
      این جامعه داشته‌اند و شایسته‌ی تقدیر ویژه هستند.
       ما با این شرکای کلیدی همکاری نزدیک‌تری داریم
       و اغلب در زمینه‌ی قابلیت‌ها و 
      اخبار پیشِ رو با آن‌ها هماهنگ می‌کنیم.
      </template>
    </TeamList>
  </div>
</template>

<style scoped>
.TeamPage {
  padding-bottom: 16px;
}

@media (min-width: 768px) {
  .TeamPage {
    padding-bottom: 96px;
  }
}

.TeamList + .TeamList {
  padding-top: 64px;
}
</style>
