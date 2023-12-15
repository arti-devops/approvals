<script setup>
import ApprovalValidation from '@/views/apps/approvals/ApprovalValidation.vue'
import axios from 'axios'

const route = useRoute('apps-approvals-view-id')

//let { dat } = await useApi(createUrl(`/approval/details/${ route.params.id }`))
const data = shallowRef()

//FIX API CALL: Provide real link to db
await axios.get(import.meta.env.VITE_API_APV_DETAILS_URL+`/${ route.params.id }`)
  .then(response => {
    console.log("LOG FROM view PAGE")
    data.value = { approvalDetails: response.data }
    console.log(response.data)
    console.log(data.value)
  })
  .catch(error => { console.log(error)})
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
