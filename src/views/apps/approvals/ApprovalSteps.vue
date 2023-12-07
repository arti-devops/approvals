<script setup>
const props = defineProps({
  stepData: {
    type: Object,
    required: true,
  },
})

const approvalDetails = props.stepData.approvalDetails
const approvals = props.stepData.approvalDetails.approvals

const transformApprovalToStepCards = approval => {
  let icon, color, title, value

  switch (approval.status) {
  case "disapproved":
    icon = 'tabler-exclamation-circle'
    color = 'error'
    title = approval.userEmail
    value = "Revoqué"
    break

  case "pending":
    icon = 'tabler-circle-dot'
    color = 'warning'
    title = approval.userEmail
    value = "Pending"
    break
    
  case "approved":
    icon = 'tabler-location'
    color = 'success'
    title = approval.userEmail
    value = "Approuvé"
    break

    // Add more cases for other status values if needed

  default:
    icon = 'tabler-user'
    color = 'primary'
    title = 'Default Title'
    value = "Default Value"
  }

  return {
    icon,
    color,
    title,
    value,
    isHover: false,
  }
}

const transformedData = [  // Add your additional element here
  {
    icon: 'tabler-user',
    color: 'primary',
    title: approvalDetails.createdBy,
    value: "Initiateur",
    isHover: false,
  },
  ...approvals.map(transformApprovalToStepCards),
]
</script>

<template>
  <VRow>
    <VCol
      v-for="(data, index) in transformedData"
      :key="index"
      cols="12"
      md="3"
      sm="6"
    >
      <div>
        <VCard
          class="logistics-card-statistics cursor-pointer"
          :style="data.isHover ? { 'border-block-end': `2px solid rgba(var(--v-theme-${data.color}))` } : { 'border-block-end': `2px solid rgba(var(--v-theme-${data.color}), var(--v-disabled-opacity))` }"
          @mouseenter="data.isHover = true"
          @mouseleave="data.isHover = false"
        >
          <VCardText>
            <div class="d-flex align-center gap-x-4 mb-2">
              <VAvatar
                variant="tonal"
                :color="data.color"
                rounded
              >
                <VIcon
                  :icon="data.icon"
                  size="28"
                />
              </VAvatar>
              <h5 class="text-h5 font-weight-medium">
                {{ data.value }}
              </h5>
            </div>
            <div class="text-body-1">
              {{ data.title }}
            </div>
          </VCardText>
        </VCard>
      </div>
    </VCol>
  </VRow>
</template>

<style lang="scss" scoped>
@use "@core/scss/base/mixins" as mixins;

.logistics-card-statistics:hover {
  @include mixins.elevation(12);

  transition: all 0.1s ease-out;
}
</style>
