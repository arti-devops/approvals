<template>
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
  </VCard>
</template>
