<script setup>
import { VDataTableServer } from 'vuetify/labs/VDataTable'

const approvalHeaders = [
  {
    title: 'TYPE',
    key: 'documentType',
  },
  {
    title: 'TITRE',
    key: 'title',
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
    title: 'ACTIONS',
    key: 'actions',
  },
]

const {
  data: approvalRequestsData,
  execute: fetchApprovalrequests,
} = await useApi(createUrl('/apps/approvalhistory', {}))

const rdata = computed(() => approvalRequestsData.value.approvalRequests)

const resolveApprovalRequestStatusVariant = item => {
  const status = item.status
  const statusToLowerCase = status.toLowerCase()
  if (statusToLowerCase === 'pending')
    return {
      text: 'Pending',
      color: 'warning',
      icon: 'tabler-circle-dot',
    }
  if (statusToLowerCase === 'approved')
    return {
      text: 'Validé',
      color: 'success',
      icon: 'tabler-location',
    }
  if (statusToLowerCase === 'disapproved')
    return {
      text: 'Revoqué',
      color: 'error',
      icon: 'tabler-exclamation-circle',
    }
}
</script>

<template>
  <VCard>
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

      <!-- Actions -->
      <template #item.actions>
        <div class="d-flex gap-1">
          <IconBtn>
            <VIcon icon="tabler-file-filled" />
          </IconBtn>
        </div>
      </template>
    </VDataTableServer>
  </VCard>
</template>