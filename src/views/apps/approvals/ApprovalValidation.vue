<script setup>
const props = defineProps({
  approvalDetails: {
    type: Object,
    required: true,
  },
})

const approvalDetails = props.approvalDetails.approvalDetails

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
      md="8"
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
                    @click="refForm?.validate()"
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
      md="4"
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

        <VCardText class="justify-center">
          <VBtn
            variant="elevated"
            color="error"
            :disabled="formControl.isFormValid"
          >
            Désapprouver
          </VBtn>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>
