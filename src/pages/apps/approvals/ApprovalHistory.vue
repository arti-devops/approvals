<script setup>
import ApprovalHistory from '@/views/apps/approvals/ApprovalHistory.vue'
</script>

<template>
  <VRow>
    <VCol cols="12">
      <h4 class="text-h4 mb-6">
        Historique des validations
      </h4>
      <p class="mb-0">
        Liste des documents validés, revoqués ou demandes annulées.
      </p>
    </VCol>
    
    <VCol cols="12">
      <!-- 👉 User List  -->
      <ApprovalHistory />
    </VCol>
  </VRow>
</template>
