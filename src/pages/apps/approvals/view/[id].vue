<script setup>
import ApprovalValidation from '@/views/apps/approvals/ApprovalValidation.vue'

const route = useRoute('apps-approvals-view-id')

let { data } = await useApi(createUrl(`/approval/details/${ route.params.id }`))
</script>

<template>
  <VRow
    v-if="data"
    class="match-height"
  >
    <VCol cols="12">
      <ApprovalValidation :approval-details="data" />
    </VCol>
  </VRow>
</template>
