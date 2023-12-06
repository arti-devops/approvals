<script setup>
//Form data

// Hello
</script>

<template>
  <VRow>
    <VCol cols="12">
      <div>
        <VAvatar icon="tabler-home" />
        <span>Titre: Demande de permission pour mariage</span>
      </div>
      <div>
        <VAvatar icon="tabler-calendar" />
        <span>Soumis le : 2 janvier 2023</span>
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
                />
              </VCol>

              <VCol cols="12">
                <VCardText class="d-flex flex-column justify-center align-center">
                  <VBtn
                    type="submit"
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
          >
            Désapprouver
          </VBtn>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>
