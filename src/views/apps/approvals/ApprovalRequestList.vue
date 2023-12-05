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
    title: 'NB SIGNATURES',
    key: 'signCounter',
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
      color: 'success',
      icon: 'tabler-progress',
    }
  if (statusToLowerCase === 'pending')
    return {
      text: 'Pending',
      color: 'warning',
      icon: 'tabler-circle-dot',
    }
}
</script>

<template>
  <VDataTableServer
    :headers="approvalHeaders"
    :items="rdata"
    :items-per-page="5"
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
  </VDataTableServer>
</template>
