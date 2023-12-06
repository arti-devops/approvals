<script setup>
const props = defineProps({
  currentStep: {
    type: Number,
    required: false,
  },
  checkoutData: {
    type: null,
    required: true,
  },
})

const emit = defineEmits([
  'update:currentStep',
  'update:checkout-data',
])

const checkoutCartDataLocal = ref(props.checkoutData)

const removeItem = item => {
  checkoutCartDataLocal.value.cartItems = checkoutCartDataLocal.value.cartItems.filter(i => i.id !== item.id)
}

const totalCost = computed(() => {
  return checkoutCartDataLocal.value.orderAmount = checkoutCartDataLocal.value.cartItems.reduce((acc, item) => {
    return acc + item.price * item.quantity
  }, 0)
})

const updateCartData = () => {
  emit('update:checkout-data', checkoutCartDataLocal.value)
}

const nextStep = () => {
  updateCartData()
  emit('update:currentStep', props.currentStep ? props.currentStep + 1 : 1)
}

watch(() => props.currentStep, updateCartData)
</script>

<template>
  <VRow>
    <VCol
      cols="12"
      md="12"
    >
      <VCard title="Espace de validation">
        <VCardText class="justify-center">
          <VForm
            ref="refForm"
            @submit.prevent="() => {}"
          >
            <VRow>
              <VCol
                cols="8"
                md="8"
              >
                <VCardText>
                  <AppSelect
                    :items="[{title:'Note', value:'note'},{title:'Congés/Absences', value:'vacancy'}]"
                    item-title="title"
                    item-value="value"
                    placeholder="Type du document"
                    prepend-icon="tabler-file-filled"
                  />
                </VCardText>
                <VCardText>
                  <AppTextField
                    placeholder="Intitulé du document"
                    prepend-icon="tabler-letter-t"
                  />
                </VCardText>
                <VCardText>
                  <VFileInput label="Document signé" />
                </VCardText>
              </VCol>

              <VCol cols="4">
                <VCardText>
                  <VBtn
                    type="submit"
                    @click="nextStep"
                  >
                    Valider
                  </VBtn>
                </VCardText>
              </VCol>
            </VRow>
          </VForm>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>

<style lang="scss" scoped>
.checkout-item-remove-btn {
  position: absolute;
  inset-block-start: 10px;
  inset-inline-end: 10px;
}
</style>
