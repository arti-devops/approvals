<script setup>
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

const {
  data: approvalRequestsData,
  execute: fetchApprovalrequests,
} = await useApi(createUrl('/apps/approvalrequests', {}))

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
  <VCard>
    <VDataTableServer
      :headers="approvalHeaders"
      :items="rdata"
      item-selectable
      hide-no-data="true"
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
          striped
        />
      </template>

      <!-- Actions -->
      <template #item.actions>
        <div class="d-flex gap-1">
          <IconBtn>
            <VIcon icon="tabler-file" />
          </IconBtn>
        </div>
      </template>
    </VDataTableServer>
  </VCard>
</template>
