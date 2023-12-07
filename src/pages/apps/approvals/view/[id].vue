<script setup>
import ApprovalSteps from '@/views/apps/approvals/ApprovalSteps.vue'
import ApprovalValidation from '@/views/apps/approvals/ApprovalValidation.vue'

const route = useRoute('apps-approvals-view-id')

const { data: approvalDetails } = await useApi(createUrl(`/approval/details/${ route.params.id }`))
</script>

<template>
  <VRow
    v-if="approvalDetails"
    class="match-height"
  >
    <VCol cols="12">
      <ApprovalSteps :step-data="approvalDetails" />
    </VCol>
    <VCol cols="12">
      <h2>Validation du Document</h2>
    </VCol>
    <VCol cols="12">
      <ApprovalValidation />
    </VCol>
  </VRow>
</template>
