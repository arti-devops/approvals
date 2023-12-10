<script setup>
import currentDateTimeMongoDbStyle from "@/utils/helpers"

const currentStep = ref(0)
const refDocumentInfoForm = ref()
const refValidationInfoForm = ref()
const isCurrentStepValid = ref(true)
const userSubmitedTheForm = ref(false)

const documentInfoForm = ref({
  type: null,
  title: 'File',
  file: null,
})

// For 3 levels of validation
const validationInfoForm = ref({
  validation1: 'head 1',
  validation2: 'head 2',
  validation3: 'head 3',
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

const handleFileChange = event => {
  let selectedFile = event.target.files[0]
  documentInfoForm.value.file = selectedFile
}

const submitForValidation = () => {
  userSubmitedTheForm.value = true
  let validationLevels = []
  for(const d of selectedDocumentType.value.validation){
    validationLevels.push({
      userOrder: d.level.replace(/\D/g, ""),
      userEmail: validationInfoForm.value[d.level],
      status: 'pending',
      fileName: null,
      signedAt: null,
      comment: null,
    })
  }

  const data = {
    title: documentInfoForm.value.title,
    status: 'pending',
    signCounter: 0,
    documentName: documentInfoForm.value.file.name, // Should get the doc link
    documentType: documentInfoForm.value.type,
    lastApproved: null, // Link of lastApproved Document
    createdBy: "jk.feige@fotki.com", // Retrive Current user
    createdAt: currentDateTimeMongoDbStyle(),
    disapprovedFor: null,
    approvals: validationLevels,
  }

  console.log(data)
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

// Check selected Doc type value
//const doctype = "vacancy"
//const selectedDocumentType = documentType.filter(item => item.type === doctype)[0]
// Computed property to dynamically compute selectedDocumentType
const selectedDocumentType = computed(() => {
  return documentType.find(item => item.type === documentInfoForm.value.type) || null
})


const logData = () => {
  console.log(documentInfoForm.value)
}
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
                            :items="documentType.map(item => ({ title: item.title, value: item.type }))"
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
                            @change="handleFileChange"
                          />
                        </VCardText>
                      </VCol>

                      <VCol cols="4">
                        <VCardText>
                          <VBtn
                            type="submit"
                            @click="logData"
                          >
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
                :color="userSubmitedTheForm ? 'success' : 'primary'"
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
                {{ userSubmitedTheForm ? 'Document envoyé !':'Envoyer le document pour validation' }}
              </h6>
            </VCardText>

            <VCardText class="justify-center">
              <VBtn
                :color="userSubmitedTheForm ? 'success':'primary'"
                :disabled="userSubmitedTheForm"
                @click="submitForValidation"
              >
                {{ userSubmitedTheForm ? 'Envoyé !':'Envoyer' }}
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
                    :disabled="userSubmitedTheForm"
                    @click="currentStep--"
                  >
                    <VIcon
                      icon="tabler-arrow-left"
                      start
                      class="flip-in-rtl"
                    />
                    Précédant
                  </VBtn>
                  <VBtn
                    v-if="userSubmitedTheForm"
                    color="error"
                    :to="{ name: 'apps-approvals'}"
                  >
                    Quiter
                    <VIcon
                      icon="tabler-door-exit"
                      end
                      class="flip-in-rtl"
                    />
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
