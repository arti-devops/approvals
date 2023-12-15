<script setup>
import { DOCUMENT_TYPE } from '@/utils/constants'
import { extractNamesFromEmail, formatDateAgoExtended, requestHeadersConfig } from '@/utils/helpers'
import axios from 'axios'
import { VDataTableServer } from 'vuetify/labs/VDataTable'

const route = useRoute()
const router = useRouter()

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

const approvalRequestsData = shallowRef()

await axios.get(import.meta.env.VITE_API_APV_HISTORY_URL, requestHeadersConfig)
  .then(response => {
    approvalRequestsData.value = { approvalRequests: response.data }
    console.log(approvalRequestsData)
    console.log(response.data)
  })
  .catch(error => { console.log(error)})

const rdata = computed(() => approvalRequestsData.value.approvalRequests)

// Get current user approval status
const userHasApproved = approvalrequests => {
  return approvalrequests.some(approval => (
    approval.userEmail === useCookie("userData").value?.username && approval.status === "approved"
  ))
}

// Get current user approval status
const userHasRevoked = approvalrequests => {
  return approvalrequests.some(approval => (
    approval.userEmail === useCookie("userData").value?.username && approval.status === "disapproved"
  ))
}

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
      icon: 'tabler-circle-check',
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
  <VCard
    title="Historique des validations"
    subtitle="Liste des documents validés, revoqués ou demandes annulées."
  >
    <VDivider />
    <VDataTableServer
      :headers="approvalHeaders"
      :items="rdata"
      :items-length="rdata.length"
    >
      <!-- Type -->
      <template #item.documentType="{ item }">
        {{ DOCUMENT_TYPE[item.documentType] }}
      </template>
      
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

      <!-- Soumis le -->
      <template #item.createdBy="{ item }">
        {{ extractNamesFromEmail(item.createdBy) }}
      </template>

      <!-- Soumis le -->
      <template #item.createdAt="{ item }">
        {{ formatDateAgoExtended(item.createdAt) }}
      </template>

      <!-- Actions -->
      <template #item.actions="{item}">
        <div class="d-flex gap-1">
          <IconBtn :to="{ name: 'apps-approvals-view-id', params : {id : item._id}}">
            <VIcon icon="tabler-file-filled" />
          </IconBtn>
          <IconBtn v-if="userHasApproved(item.approvals)">
            <VIcon
              icon="tabler-circle-check"
              color="success"
            />
          </IconBtn>
          <IconBtn v-if="userHasRevoked(item.approvals)">
            <VIcon
              icon="tabler-circle-x"
              color="error"
            />
          </IconBtn>
        </div>
      </template>
    </VDataTableServer>
  </VCard>
</template>
