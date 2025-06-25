<template>
  <div class="d-flex justify-center justify-md-start mt-3 mb-7 align-center">
    
    <v-icon :color="color" class="me-3" :size="small ? 20 : 28" v-if="icon != null">
      {{ icon }}
    </v-icon>

    <div>
      <span
        :class="[
          'font-weight-medium',
          colorClass,
          small ? 'text-h5 text-sm-h4' : 'text-h4 text-sm-h3'
        ]"
      >
        {{ title }}
      </span>
      <div
        v-if="subtitle"
        class="text-body-2 text-grey ml-1"
      >
        {{ subtitle }}
      </div>
    </div>
    
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    required: true
  },
  subtitle: {
    type: String,
    default: ''
  },
  icon: {
    type: String,
    default: null
  },
  color: {
    type: String,
    default: 'primary'
  },
  small: {
    type: Boolean,
    default: false
  }
})

const colorClass = `text-${props.color}`
</script>
