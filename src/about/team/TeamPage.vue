<script lang="ts">
const shuffleMembers = (members: Member[], pinTheFirstMember = false): void => {
  let offset = pinTheFirstMember ? 1 : 0
  // `i` is between `1` and `length - offset`
  // `j` is between `0` and `length - offset - 1`
  // `offset + i - 1` is between `offset` and `length - 1`
  // `offset + j` is between `offset` and `length - 1`
  let i = members.length - offset
  while (i > 0) {
    const j = Math.floor(Math.random() * i);
    [
      members[offset + i - 1],
      members[offset + j]
    ] = [
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
      <template #lead
        >توسعه‌ی ویو و اکوسیستم آن توسط یک گروه بین‌المللی هدایت می‌شود که برخی از منتخبان آن در زیر آورده شده است.</template
      >

      <template #action>
        <VTLink
          href="https://github.com/vuejs/governance/blob/master/Team-Charter.md"
          >راجع به گروه‌ها بیشتر بدانید</VTLink
        >
      </template>
    </TeamHero>

    <TeamList :members="membersCoreData as Member[]">
      <template #title>اعضای تیم هسته</template>
      <template #lead
        >افرادی هستند که به طور فعالانه در مدیریت و نگه‌داری یک یا چندین پروژه های هسته‌ی ویو نقش دارند.
        آن‌ها مشارکت‌های مهمی به اکوسیستم ویو داشته‌اند و ما موفقیت پروژه و کاربران آن را مدیون این افراد هستیم.</template
      >
    </TeamList>

    <TeamList :members="membersEmeritiData as Member[]">
      <template #title>اعضای هسته‌ی افتخاری</template>
      <template #lead
        >اینجا ما یاد کاربران هسته‌ای که در گذشته به طور فعالانه مشارکت‌های با ارزشی داشته‌اند را گرامی می‌داریم.</template
      >
    </TeamList>

    <TeamList :members="membersPartnerData as Member[]">
      <template #title>شرکای جامعه</template>
      <template #lead
        >برخی از اعضای جامعه‌ی ویو آن را چنان تکمیل کرده‌اند که نیازمند اشاره‌ی خاصی هستند.
        ما روابط صمیمی‌ای با این شرکای کلیدی داریم به طوری که اغلب ویژگی‌های جدید و اخبار را با آنان به اشتراک می‌گذاریم.</template
      >
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
