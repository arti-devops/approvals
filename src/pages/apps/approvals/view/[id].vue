<script setup>
import ApprovalValidation from '@/views/apps/approvals/ApprovalValidation.vue'

const route = useRoute('apps-approvals-view-id')

const approvalDetails = ref({})

let { data } = await useApi(createUrl(`/approval/details/${ route.params.id }`))

approvalDetails.value = data

//Receive update
const onApprovalDetailsUpdated = updatedApprovalDetails => {
  console.log("CURRENT DATA")
  console.log(data.value)
  console.log("NEW VALUE OF DATA")
  data = updatedApprovalDetails
  console.log(data)
}
</script>

<template>
  <VRow
    v-if="data"
    class="match-height"
  >
    <VCol cols="12">
      <ApprovalValidation
        :approval-details="data"
        @update-approval-details="onApprovalDetailsUpdated"
      />
    </VCol>
  </VRow>
</template>
