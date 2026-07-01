<script setup lang="ts">
withDefaults(
  defineProps<{
    label: string
    required?: boolean
    error?: string
  }>(),
  {
    required: false,
    error: '',
  },
)
</script>

<template>
  <label class="form-field">
    <span class="form-field__label">
      {{ label }}
      <span v-if="required" class="form-field__required">*</span>
    </span>
    <slot />
    <span v-if="error" class="form-field__error">{{ error }}</span>
  </label>
</template>

<style scoped>
.form-field {
  display: grid;
  gap: 9px;
}

.form-field__label {
  color: var(--color-body);
  font-size: 14px;
  font-weight: 650;
}

.form-field__required,
.form-field__error {
  color: var(--color-primary-active);
}

.form-field__error {
  padding-left: 2px;
  font-size: 13px;
}
</style>
