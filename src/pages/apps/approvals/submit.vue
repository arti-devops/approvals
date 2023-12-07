<script setup>
import ConfirmationContent from '@/views/apps/approvals/submit/ConfirmationContent.vue'
import DocumentContent from '@/views/apps/approvals/submit/DocumentContent.vue'
import ValidationContent from '@/views/apps/approvals/submit/ValidationContent.vue'
import googleHome from '@images/pages/google-home.png'
import iphone11 from '@images/pages/iphone-11.png'

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

const currentStep = ref(0)
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
      />
    </VCardText>

    <VDivider />

    <VCardText>
      <!-- 👉 stepper content -->
      <VWindow v-model="currentStep">
        <VWindowItem>
          <DocumentContent
            v-model:current-step="currentStep"
            v-model:checkout-data="checkoutData"
          />
        </VWindowItem>

        <VWindowItem>
          <ValidationContent
            v-model:current-step="currentStep"
            v-model:checkout-data="checkoutData"
          />
        </VWindowItem>

        <VWindowItem>
          <ConfirmationContent
            v-model:current-step="currentStep"
            v-model:checkout-data="checkoutData"
          />
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
