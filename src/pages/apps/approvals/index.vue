<script setup>
import ApprovalRequestList from '@/views/apps/approvals/ApprovalRequestList.vue'
</script>

<template>
  <VRow>
    <VCol cols="12">
      <h4 class="text-h4 mb-6">
        Demandes de validation
      </h4>
      <p class="mb-0">
        Liste des documents en attente de validation.
      </p>
    </VCol>

    <VCol cols="12">
      <!-- 👉 User List  -->
      <ApprovalRequestList />
    </VCol>
  </VRow>
</template>
