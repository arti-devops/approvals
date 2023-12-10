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



const updateCartData = () => {
  emit('update:checkout-data', checkoutCartDataLocal.value)
}


// Config file to export
const documentType = [
  {
    type: "note",
    title: "NOTE",
    expires: 120,
    validation: [
      {
        attr: "Le Directeur Général",
      },
    ],
  },
  {
    type: "vacancy",
    title: "DEMANDE DE CONGES",
    expires: 72,
    validation: [
      {
        attr: "Supérieur hiérarchique",
      },
      {
        attr: "Directeur",
      },
      {
        attr: "LA DGPECRP",
      },
    ],
  },
  {
    type: "furnitures",
    title: "DEMANDE DE FOURNITURES",
    expires: 48,
    validation: [
      {
        attr: "Supérieur hiérarchique",
        icon: "tabler-user-plus",
      },
      {
        attr: "Directeur",
        icon: "tabler-user-bolt",
      },
      {
        attr: "LA DMGP",
        icon: "tabler-user-check",
      },
    ],
  },
]

const doctype = "vacancy"
const selectedDocumentType = documentType.filter(item => item.type === doctype)[0]

console.log(selectedDocumentType)


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
          <VRow>
            <VCol
              cols="8"
              md="8"
            >
              <VCardText
                v-for="d in selectedDocumentType.validation"
                :key="d.attr"
              >
                <AppTextField
                  :placeholder="d.attr"
                  :prepend-icon="d.icon"
                />
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
