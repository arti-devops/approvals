<script setup>
import { currentDateTimeMongoDbStyle, extractNamesFromEmail, formatDateAgoExtended, formatDateFr } from '@/utils/helpers'
import axios from 'axios'

const props = defineProps({
  approvalDetails: {
    type: Object,
    required: true,
  },
})

const approvalDetails = ref(props.approvalDetails.approvalDetails).value
const approvals = ref(props.approvalDetails.approvalDetails.approvals).value
const revocationComment = ref('')
const userWantToRevoke = ref(false)
const fileToUpload = ref({})

// Current user email
const userEmail = useCookie("userData").value.username

//TODO check user data for revocation and update the view
const userHasRevoked = ref(false)

// VALIDATION NOTIFICATIONS
const isSnackbarSuccessVisible = ref(false)
const isSnackbarErrorVisible = ref(false)
const isSnackbarRevokVisible = ref(false)


// FORM CONTROL
//TODO Also lock form of user already supplied an action
const isFormValid = ref(true)

// Get current user Approval object
const userApproval = approvalDetails.approvals.find(approval => approval.userEmail == userEmail)

if(userApproval){
  if (userApproval.status != 'pending'){
    isFormValid.value = false
    console.log("isFormValid user: " + isFormValid.value)
  }else{
    isFormValid.value = approvalDetails.status === 'pending'
    console.log("isFormValid: " + isFormValid.value)
  }
}

// END FORM CONTROL


const resolveStatusIcon = status => {
  if (status === "pending") return { icon: "tabler-circle-dot", color: "warning", text: "Pending" }
  if (status === "approved") return { icon: "tabler-circle-check", color: "success", text: "Approuvé" }
  if (status === "disapproved") return { icon: "tabler-exclamation-circle", color: "error", text: "Revoqué" }
  
  return "tabler-user"
}

const approvalStatusinfo = computed(() => {
  return resolveStatusIcon(approvalDetails.status)
})

const userWantToRevokeAction = () => {
  if (!userWantToRevoke.value || revocationComment.value == '') {
    userWantToRevoke.value = true
  }else{

    //isFormValid.value = true
    if (userApproval){
      userApproval.status = 'disapproved'
      userApproval.comment = revocationComment.value
      userApproval.signedAt = currentDateTimeMongoDbStyle()
      isSnackbarRevokVisible.value = true
      approvalDetails.status = 'disapproved'

      userWantToRevoke.value = false // Hide disapproval text input
    }

    //userHasRevoked.value = true

    //TODO Send data to mongodb
    console.log(approvalDetails)
  }
}

// FILE UPLOAD
// TODO : File upload
const handleFileChange = event => {
  let selectedFile = event.target.files[0]
  fileToUpload.value = selectedFile
}

const uploadFile = async () => {
  // FormData to send file via HTTP
  const formData = new FormData()
  const filelink = ref('')

  formData.append("file", fileToUpload.value)
  axios.post('http://localhost:8000/uploadfile', formData)
    .then(response => {

      // Get the new approved file link
      filelink.value = response.data.link

      //FIX Filter based on currently connected user
      const userApproval = approvalDetails.approvals.find(approval => approval.userEmail == userEmail)
      if (userApproval){
        userApproval.status = 'approved'
        userApproval.fileName = filelink.value
        userApproval.signedAt = currentDateTimeMongoDbStyle()
        approvalDetails.signCounter = approvalDetails.signCounter + 1
        if (approvalDetails.signCounter == approvalDetails.approvals.length){
          approvalDetails.status = 'approved'
        }
        approvalDetails.lastApproved = userApproval.fileName
      }

      //TODO Send data to mongodb
      console.log("Update Of Approval Details")
      console.log(approvalDetails)
    })
    .catch(error => {
      isSnackbarErrorVisible.value = true // Display error feedback
      console.error('Error uploading file:', error.response.data)
    })
}

// END FILE UPLOAD
// END FILE UPLOAD
// END FILE UPLOAD

// VALIDATION STEPS
// VALIDATION STEPS
// VALIDATION STEPS

const userOrder = ['tabler-number-0', 'tabler-number-1', 'tabler-number-2', 'tabler-number-3', 'tabler-number-4']

const transformApprovalToStepCards = approval => {
  let order, icon, color, title, value

  switch (approval.status) {
  case "disapproved":
    order = approval.userOrder
    icon = null
    color = 'error'
    title = extractNamesFromEmail(approval.userEmail)
    value = "Revoqué"
    break

  case "pending":
    order = approval.userOrder
    icon = null
    color = 'warning'
    title = extractNamesFromEmail(approval.userEmail)
    value = "Pending"
    break
    
  case "approved":
    order = approval.userOrder
    icon = null
    color = 'success'
    title = extractNamesFromEmail(approval.userEmail)
    value = "Approuvé"
    break

    // Add more cases for other status values if needed

  default:
    order = null
    icon = 'tabler-user'
    color = 'primary'
    title = 'Default Title'
    value = "Default Value"
  }

  return {
    order,
    icon,
    color,
    title,
    value,
    isHover: false,
  }
}

const transformedData = computed(() => {
  return [  // Add your additional element here
    {
      icon: 'tabler-user',
      color: 'primary',
      title: extractNamesFromEmail(approvalDetails.createdBy),
      value: "Initiateur",
      isHover: false,
    },
    ...approvals.map(transformApprovalToStepCards),
  ]
})

//TODO Watch ApprovalDetails and submit updates
watch(approvalDetails, () => {
  // Send data to db when form is submitted
  console.log("LOG FROM ApprovalDetails Watcher")
  var { _id, ...data } = approvalDetails
  console.log(_id)
  console.log(data)

  //FIX Provide real link to db
  axios.put(`http://localhost:8000/approvals/${_id}`, data)
    .then(response => {
      console.log(response.data)
      isFormValid.value = false // Lock the form
      isSnackbarSuccessVisible.value = true // Display success feedback
    })
    .catch(error => { 
      console.log(error)
      isSnackbarErrorVisible.value = true // Display error feedback
    })
})
</script>

<template>
  <!-- VALIDATION STEPS -->
  <!-- VALIDATION STEPS -->
  <!-- VALIDATION STEPS -->
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
                  :icon="data.icon ? data.icon : userOrder[data.order]"
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
  <VRow>
    <VCol cols="12">
      <h2>Validation du Document</h2>
    </VCol>
  </VRow>
  <!-- ESPACE DETAILS -->
  <VRow>
    <VCol cols="12">
      <div style="margin-inline-start: 5px;">
        <VAvatar
          :icon="approvalStatusinfo.icon"
          :color="approvalStatusinfo.color"
          size="small"
        />
        <span class="mx-1">Status: {{ approvalStatusinfo.text }}</span>
      </div>
      <div>
        <VAvatar icon="tabler-home" />
        <span>Titre: {{ approvalDetails.title }}</span>
      </div>
      <div>
        <VAvatar icon="tabler-calendar" />
        <span>Soumis le : {{ formatDateFr(approvalDetails.createdAt) }} ({{ formatDateAgoExtended(approvalDetails.createdAt) }})</span>
      </div>
    </VCol>
  </VRow>
  <!-- ESPACE VALIDATION -->
  <!-- ESPACE VALIDATION -->
  <!-- ESPACE VALIDATION -->
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
            <a
              target="_blank"
              rel="noopener noreferrer"
              :href="approvalDetails.lastApproved ? approvalDetails.lastApproved : approvalDetails.documentName "
            >
              <VBtn
                prepend-icon="tabler-file-filled"
                variant="tonal"
                color="secondary"
              >
                Document
              </VBtn>
            </a>
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
                  label="Pièce jointe"
                  :rules="[requiredValidator]"
                  :disabled="!isFormValid"
                  @change="handleFileChange"
                />
              </VCol>

              <VCol cols="12">
                <VCardText class="d-flex flex-column justify-center align-center">
                  <VBtn
                    type="submit"
                    :disabled="!isFormValid"
                    @click="uploadFile"
                  >
                    Valider
                    <VIcon
                      end
                      icon="tabler-checkbox"
                    />
                  </VBtn>
                </VCardText>
              </VCol>
            </VRow>
          </VForm>
        </VCardText>
      </VCard>
    </VCol>
    <!-- ESPACE REVOCATION -->
    <!-- ESPACE REVOCATION -->
    <!-- ESPACE REVOCATION -->
    <VCol
      cols="12"
      md="5"
    >
      <VCard class="text-center">
        <VCardText class="d-flex align-center flex-wrap gap-4">
          <!-- 👉 Actions  -->
          <div class="me-3 d-flex gap-3">
            <h3>Espace de révocation</h3>
          </div>
        </VCardText>

        <VForm>
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
              {{ userHasRevoked? "Vous avez révoqué ce document": "Réfuser de valider" }}
            </h6>
          </VCardText>

          <VCardText v-if="userWantToRevoke">
            <AppTextarea
              v-model="revocationComment"
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
              :disabled="!isFormValid"
              @click="userWantToRevokeAction"
            >
              {{ userHasRevoked? "Révoqué": "Révoquer" }}
              <VIcon
                end
                icon="tabler-file-minus"
              />
            </VBtn>
          </VCardText>
        </VForm>
      </VCard>
    </VCol>
  </VRow>
  <VSnackbar
    v-model="isSnackbarSuccessVisible"
    location="top end"
    tonal="flat"
    color="success"
  >
    <VAlert type="success">
      Validation réussie.
    </VAlert>
  </Vsnackbar>
  <VSnackbar
    v-model="isSnackbarErrorVisible"
    location="top end"
    tonal="flat"
    color="warning"
  >
    <VAlert type="warning">
      La validation a échoué. Veuillez reéssayer !
    </VAlert>
  </VSnackbar>
  <VSnackbar
    v-model="isSnackbarRevokVisible"
    location="top end"
    tonal="flat"
    color="info"
  >
    <VAlert type="info">
      Vous avez révoqué ce document !
    </VAlert>
  </VSnackbar>
</template>

<style lang="scss" scoped>
@use "@core/scss/base/mixins" as mixins;

.logistics-card-statistics:hover {
  @include mixins.elevation(12);

  transition: all 0.1s ease-out;
}
</style>
