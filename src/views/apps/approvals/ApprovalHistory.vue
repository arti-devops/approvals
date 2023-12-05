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
    title: 'STATUT',
    key: 'status',
  },
]

const {
  data: approvalRequestsData,
  execute: fetchApprovalrequests,
} = await useApi(createUrl('/apps/approvalhistory', {}))

const rdata = computed(() => approvalRequestsData.value.approvalRequests)
</script>

<template>
  <VDataTableServer
    :headers="approvalHeaders"
    :items="rdata"
    :items-per-page="5"
  />
</template>
