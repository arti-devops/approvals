<script setup>
const props = defineProps({
  approvalDetails: {
    type: Object,
    required: true,
  },
})

const approvalDetails = props.approvalDetails.approvalDetails
const textareaValue = ref('')
const userWantToRevoke = ref(false)

const resolveStatusIcon = status => {
  if (status === "pending") return { icon: "tabler-circle-dot", color: "warning", text: "Pending" }
  if (status === "approved") return { icon: "tabler-send", color: "success", text: "Approuvé" }
  if (status === "disapproved") return { icon: "tabler-exclamation-circle", color: "error", text: "Revoqué" }
  
  return "tabler-user"
}

const approvalStatusinfo = {
  icon: resolveStatusIcon(approvalDetails.status).icon,
  color: resolveStatusIcon(approvalDetails.status).color,
  value: resolveStatusIcon(approvalDetails.status).text,
}

const formControl = {
  isFormValid: !(approvalDetails.status === "pending"),
}

const userWantToRevokeAction = () => {
  userWantToRevoke.value = true
}

// FILE UPLOAD
const file = ref()

const uploadFile = async () => {
  if (!file.value) {
    console.error('No file selected.')
    
    return
  }

  const formData = new FormData()

  formData.append('file', file.value)

  try {
    // POTENTIAL SOURCCE OF ERROR
    const response = await fetch('http://127.0.0.1:8000/uploadfile/', {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json',
      },
    })

    const data = await response.json()

    console.log('File uploaded successfully:', data)
  } catch (error) {
    console.error('Error uploading file:', error)
  }
}

const showFile = () => {
  console.log(file.value)
}

// END FILE UPLOAD

console.log(formControl)

// Hello
</script>

<template>
  <VRow>
    <VCol cols="12">
      <div style="margin-inline-start: 5px;">
        <VAvatar
          :icon="approvalStatusinfo.icon"
          :color="approvalStatusinfo.color"
          size="small"
        />
        <span class="mx-1">Status: {{ approvalStatusinfo.value }}</span>
      </div>
      <div>
        <VAvatar icon="tabler-home" />
        <span>Titre: {{ approvalDetails.title }}</span>
      </div>
      <div>
        <VAvatar icon="tabler-calendar" />
        <span>Soumis le : {{ approvalDetails.createdAt }}</span>
      </div>
    </VCol>
  </VRow>
  <VRow>
    <VCol
      cols="12"
      md="7"
    >
      <VCard>
        <VCardText class="d-flex align-center flex-wrap gap-4">
          <!-- 👉 Actions  -->
          <div class="me-3 d-flex gap-3">
            <h3>Espace de validation</h3>
          </div>

          <VSpacer />

          <div class="d-flex align-center flex-wrap gap-4">
            <!-- 👉 Export invoice -->
            <VBtn
              prepend-icon="tabler-paperclip"
              variant="tonal"
              color="secondary"
            >
              Voir le document
            </VBtn>
          </div>
        </VCardText>
        <VCardText class="justify-center">
          <VForm
            ref="refForm"
            @submit.prevent="() => {}"
          >
            <VRow>
              <VCol
                cols="12"
                md="12"
              >
                <VFileInput
                  v-model="file"
                  label="Document signé"
                  :rules="[requiredValidator]"
                  :disabled="formControl.isFormValid"
                />
              </VCol>

              <VCol cols="12">
                <VCardText class="d-flex flex-column justify-center align-center">
                  <VBtn
                    type="submit"
                    :disabled="formControl.isFormValid"
                    @click="showFile"
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
    <VCol
      cols="12"
      md="5"
    >
      <VCard class="text-center">
        <VCardText class="d-flex flex-column justify-center align-center">
          <VAvatar
            color="error"
            variant="tonal"
            size="50"
            class="mb-4"
          >
            <VIcon
              size="2rem"
              icon="tabler-alert-triangle"
            />
          </VAvatar>

          <h6 class="text-h6">
            Réfuser de signer
          </h6>
        </VCardText>

        <VCardText v-if="userWantToRevoke">
          <AppTextarea
            v-model="textareaValue"
            label="Justificatif de désapprobation"
            placeholder="Saisissez votre justificatif de désapprobation"
            auto-grow
            :rules="[requiredValidator]"
          />
        </VCardText>

        <VCardText class="justify-center">
          <VBtn
            variant="elevated"
            color="error"
            :disabled="formControl.isFormValid"
            @click="userWantToRevokeAction"
          >
            Désapprouver
          </VBtn>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>
