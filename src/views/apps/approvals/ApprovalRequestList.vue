<script setup>
import { VDataTableServer } from 'vuetify/labs/VDataTable'

const headers = [
  {
    title: 'ID',
    sortable: false,
    key: 'id',
  },
  {
    title: 'NAME',
    key: 'fullName',
  },
  {
    title: 'EMAIL',
    key: 'email',
  },
  {
    title: 'DATE',
    key: 'startDate',
  },
  {
    title: 'EXPERIENCE',
    key: 'experience',
  },
  {
    title: 'AGE',
    key: 'age',
  },
]

const approvalHeaders = [
  {
    title: 'TITRE',
    key: 'title',
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
</script>

<template>
  <VDataTableServer
    :headers="approvalHeaders"
    :items="rdata"
    :items-per-page="5"
  />
</template>
