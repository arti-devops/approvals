<script setup>
import googleHome from '@images/pages/google-home.png'
import iphone11 from '@images/pages/iphone-11.png'

const currentStep = ref(0)
const refDocumentInfoForm = ref()
const refValidationInfoForm = ref()
const refConfirmationInfoForm = ref()
const isCurrentStepValid = ref(true)

const documentInfoForm = ref({
  type: 'Title',
  title: 'File',
  file: '',
})

// For 3 levels of validation
const validationInfoForm = ref({
  validation1: 'head 1',
  validation2: 'head 2',
  validation3: 'head 3',
})

const ConfirmationInfoForm = ref({
  userCanConfirm: false,
})

// Forms Validation logic codes
const validateDocumentInfoForm = () => {
  refDocumentInfoForm.value?.validate().then(valid => {
    if(valid.valid){
      currentStep.value++
      isCurrentStepValid.value = true
    }else{
      isCurrentStepValid.value = false
    }
  })
}

const validateValidationInfoForm = () => {
  refValidationInfoForm.value?.validate().then(valid => {
    if(valid.valid){
      currentStep.value++
      isCurrentStepValid.value = true
    }else{
      isCurrentStepValid.value = false
    }
  })
}

const checkoutSteps = [
  {
    title: 'Document',
    icon: 'tabler-file-description',
  },
  {
    title: 'Validation',
    icon: 'tabler-users',
  },
  {
    title: 'Confirmation',
    icon: 'tabler-circle-check',
  },
]

const checkoutData = ref({
  cartItems: [
    {
      id: 1,
      name: 'Google - Google Home - White',
      seller: 'Google',
      inStock: true,
      rating: 4,
      price: 299,
      discountPrice: 359,
      image: googleHome,
      quantity: 1,
      estimatedDelivery: '18th Nov 2021',
    },
    {
      id: 2,
      name: 'Apple iPhone 11 (64GB, Black)',
      seller: 'Apple',
      inStock: true,
      rating: 4,
      price: 899,
      discountPrice: 999,
      image: iphone11,
      quantity: 1,
      estimatedDelivery: '20th Nov 2021',
    },
  ],
  promoCode: '',
  orderAmount: 1198,
  deliveryAddress: 'home',
  deliverySpeed: 'free',
  deliveryCharges: 0,
  addresses: [
    {
      title: 'John Doe (Default)',
      desc: '4135 Parkway Street, Los Angeles, CA, 90017',
      subtitle: '1234567890',
      value: 'home',
    },
    {
      title: 'ACME Inc.',
      desc: '87 Hoffman Avenue, New York, NY, 10016',
      subtitle: '1234567890',
      value: 'office',
    },
  ],
})

// Config file to export
const documentType = [
  {
    type: "note",
    title: "NOTE",
    expires: 120,
    validation: [
      {
        level: 'validation1',
        attr: "Le Directeur Général",
        icon: "tabler-user-check",
      },
    ],
  },
  {
    type: "vacancy",
    title: "DEMANDE DE CONGES",
    expires: 72,
    validation: [
      {
        level: 'validation1',
        attr: "Supérieur hiérarchique",
        icon: "tabler-user-plus",
      },
      {
        level: 'validation2',
        attr: "Directeur",
        icon: "tabler-user-bolt",
      },
      {
        level: 'validation3',
        attr: "LA DGPECRP",
        icon: "tabler-user-check",
      },
    ],
  },
  {
    type: "furnitures",
    title: "DEMANDE DE FOURNITURES",
    expires: 48,
    validation: [
      {
        level: 'validation1',
        attr: "Supérieur hiérarchique",
        icon: "tabler-user-plus",
      },
      {
        level: 'validation2',
        attr: "Directeur",
        icon: "tabler-user-bolt",
      },
      {
        level: 'validation3',
        attr: "LA DMGP",
        icon: "tabler-user-check",
      },
    ],
  },
]

const doctype = "vacancy"
const selectedDocumentType = documentType.filter(item => item.type === doctype)[0]
</script>

<template>
  <VCard>
    <VCardText>
      <!-- 👉 Stepper -->
      <AppStepper
        v-model:current-step="currentStep"
        class="checkout-stepper"
        :items="checkoutSteps"
        :direction="$vuetify.display.mdAndUp ? 'horizontal' : 'vertical'"
        :is-active-step-valid="isCurrentStepValid"
      />
    </VCardText>

    <VDivider />

    <VCardText>
      <!-- 👉 stepper content -->
      <VWindow v-model="currentStep">
        <VWindowItem>
          <VRow>
            <VCol
              cols="12"
              md="12"
            >
              <VCard title="Espace de validation">
                <VCardText class="justify-center">
                  <VForm
                    ref="refDocumentInfoForm"
                    @submit.prevent="validateDocumentInfoForm"
                  >
                    <VRow>
                      <VCol
                        cols="8"
                        md="8"
                      >
                        <VCardText>
                          <AppSelect
                            v-model="documentInfoForm.type"
                            :items="[{title:'Note', value:'note'},{title:'Congés/Absences', value:'vacancy'}]"
                            item-title="title"
                            item-value="value"
                            placeholder="Type du document"
                            prepend-icon="tabler-file-filled"
                            :rules="[requiredValidator]"
                          />
                        </VCardText>
                        <VCardText>
                          <AppTextField
                            v-model="documentInfoForm.title"
                            placeholder="Intitulé du document"
                            prepend-icon="tabler-letter-t"
                            :rules="[requiredValidator]"
                          />
                        </VCardText>
                        <VCardText>
                          <VFileInput
                            label="Pièce jointe"
                            :rules="[requiredValidator]"
                          />
                        </VCardText>
                      </VCol>

                      <VCol cols="4">
                        <VCardText>
                          <VBtn type="submit">
                            Suivant
                          </VBtn>
                        </VCardText>
                      </VCol>
                    </VRow>
                  </VForm>
                </VCardText>
              </VCard>
            </VCol>
          </VRow>
        </VWindowItem>

        <VWindowItem>
          <VRow>
            <VCol
              cols="12"
              md="12"
            >
              <VCard title="Espace de validation">
                <VCardText class="justify-center">
                  <VForm
                    ref="refValidationInfoForm"
                    @submit.prevent="validateValidationInfoForm"
                  >
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
                            v-model="validationInfoForm[d.level]"
                            :placeholder="d.attr"
                            :prepend-icon="d.icon"
                            :rules="[requiredValidator]"
                          />
                        </VCardText>
                      </VCol>

                      <VCol cols="12">
                        <div class="d-flex flex-wrap gap-4 justify-sm-space-between justify-center mt-8">
                          <VBtn
                            color="secondary"
                            variant="tonal"
                            @click="currentStep--"
                          >
                            <VIcon
                              icon="tabler-arrow-left"
                              start
                              class="flip-in-rtl"
                            />
                            Précédant
                          </VBtn>

                          <VBtn type="submit">
                            Suivant
                            <VIcon
                              icon="tabler-arrow-right"
                              end
                              class="flip-in-rtl"
                            />
                          </VBtn>
                        </div>
                      </VCol>
                    </VRow>
                  </VForm>
                </VCardText>
              </VCard>
            </VCol>
          </VRow>
        </VWindowItem>

        <VWindowItem>
          <VCard class="text-center">
            <VCardText class="d-flex flex-column justify-center align-center">
              <VAvatar
                color="primary"
                variant="tonal"
                size="50"
                class="mb-4"
              >
                <VIcon
                  size="2rem"
                  icon="tabler-send"
                />
              </VAvatar>

              <h6 class="text-h6">
                Réfuser de signer
              </h6>
            </VCardText>

            <VCardText class="justify-center">
              <VBtn>
                Envoyer
                <VIcon
                  end
                  icon="tabler-send"
                />
              </VBtn>
            </VCardText>
            <VCardText>
              <VCol cols="12">
                <div class="d-flex flex-wrap gap-4 justify-sm-space-between justify-center mt-8">
                  <VBtn
                    color="secondary"
                    variant="tonal"
                    @click="currentStep--"
                  >
                    <VIcon
                      icon="tabler-arrow-left"
                      start
                      class="flip-in-rtl"
                    />
                    Précédant
                  </VBtn>
                </div>
              </VCol>
            </VCardText>
          </VCard>
        </VWindowItem>
      </VWindow>
    </VCardText>
  </VCard>
</template>

<style lang="scss">
.checkout-stepper {
  .stepper-icon-step {
    .step-wrapper + svg {
      margin-inline: 3.5rem !important;
    }
  }
}
</style>
