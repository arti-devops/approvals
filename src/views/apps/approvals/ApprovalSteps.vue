<script setup>
const logisticData = ref([
  {
    icon: 'tabler-user',
    color: 'primary',
    title: 'Alexy SANO',
    value: "Initiateur",
    change: 18.2,
    isHover: false,
  },
  {
    icon: 'tabler-location',
    color: 'success',
    title: 'Gren CISSE Al-Karid',
    value: "Approuvé",
    change: -8.7,
    isHover: false,
  },
  {
    icon: 'tabler-circle-dot',
    color: 'warning',
    title: 'Djiré Lamine',
    value: "Pending",
    change: 4.3,
    isHover: false,
  },
  {
    icon: 'tabler-circle-dot',
    color: 'warning',
    title: 'Sahiri Gbadié',
    value: "Pending",
    change: -2.5,
    isHover: false,
  },
])
</script>

<template>
  <VRow>
    <VCol
      v-for="(data, index) in logisticData"
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
