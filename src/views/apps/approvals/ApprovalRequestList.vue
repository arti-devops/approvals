<script setup>
import axios from 'axios'
import { shallowRef } from 'vue'
import { VDataTableServer } from 'vuetify/labs/VDataTable'

const approvalHeaders = [
  {
    title: 'TYPE',
    key: 'documentType',
  },
  {
    title: 'SOUMIS PAR',
    key: 'createdBy',
  },
  {
    title: 'SOUMIS LE',
    key: 'createdAt',
  },
  {
    title: 'STATUT',
    key: 'status',
  },
  {
    title: 'Taux de validation',
    key: 'signCounter',
  },
  {
    title: 'Actions',
    key: 'actions',
  },
]

const approvalRequestsData = shallowRef()

//FIX Provide real link to db
await axios.get('http://localhost:8000/approvals/requests')
  .then(response => {
    approvalRequestsData.value = { approvalRequests: response.data }
    console.log(approvalRequestsData)
    console.log(response.data)
  })
  .catch(error => { console.log(error)})

const rdata = computed(() => approvalRequestsData.value.approvalRequests)

const resolveApprovalRequestStatusVariant = item => {
  const status = item.status
  const statusToLowerCase = status.toLowerCase()
  if ((statusToLowerCase === 'pending' && item.signCounter > 0))
    return {
      text: 'Validation',
      color: 'info',
      icon: 'tabler-progress',
    }
  if (statusToLowerCase === 'pending')
    return {
      text: 'Pending',
      color: 'warning',
      icon: 'tabler-circle-dot',
    }
}

const resolveApprovalRequestProgress = item => {
  const signCounter = item.signCounter ? item.signCounter : 0
  const totalApprovers = item.approvals.length
  
  return Math.round(signCounter/totalApprovers*100)
}
</script>

<template>
  <VCard
    title="Demandes de validation"
    subtitle="Liste des documents en attente de validation."
  >
    <VDivider />
    <VDataTableServer
      :headers="approvalHeaders"
      :items="rdata"
      :items-length="rdata.length"
      item-selectable
    >
      <!-- Status -->
      <template #item.status="{ item }">
        <div class="d-flex align-center gap-4">
          <VAvatar
            size="30"
            variant="tonal"
            :color="resolveApprovalRequestStatusVariant(item).color"
          >
            <VIcon
              size="20"
              :icon="resolveApprovalRequestStatusVariant(item).icon"
            />
          </VAvatar>
          <span class="text-capitalize">{{ resolveApprovalRequestStatusVariant(item).text }}</span>
        </div>
      </template>
    
      <!-- Progress -->
      <template #item.signCounter="{ item }">
        <VProgressLinear
          color="rgb(var(--v-theme-primary))"
          :model-value="resolveApprovalRequestProgress(item)"
        />
      </template>

      <!-- Soumis le -->
      <template #item.createdBy="{ item }">
        {{ extractNamesFromEmail(item.createdBy) }}
      </template>

      <!-- Soumis le -->
      <template #item.createdAt="{ item }">
        {{ formatDateAgoExtended(item.createdAt) }}
      </template>

      <!-- Actions -->
      <template #item.actions="{ item }">
        <div class="d-flex gap-1">
          <IconBtn :to="{ name: 'apps-approvals-view-id', params: { id: item._id }}">
            <VIcon icon="tabler-file" />
          </IconBtn>
        </div>
      </template>
    </VDataTableServer>
  </VCard>
</template>
