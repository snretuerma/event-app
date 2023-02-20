<template>
  <v-snackbar
      bottom
      right
      multi-line
      :color="alert_type"
      timeout="5000"
      v-model="snackbar"
      dark
    >
      {{ message }}

      <template v-slot:action="{ attrs }">
        <v-btn
          dark
          text
          v-bind="attrs"
          @click="close"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    message: {
      type: String,
      default: ''
    },
    alert_type: {
      type: String,
      default: 'success'
    }
  },
  data() {
    return {
      snackbar: '',
      timeout: '',
      default_type: 'success'
    }
  },
  watch: {
    "show"(newValue) {
      this.snackbar = newValue
      if (newValue == true) {
        this.timeout = setTimeout(() => {
          this.$emit('close', false)
        }, 5000);
      }
      if (newValue == false) {
        clearTimeout(this.timeout)
      }
    },
    "type"(newValue) {
      if (this.default_type != newValue) {
        this.default_type = newValue
      }
    },
  },
  methods: {
    close() {
      this.$emit('close', false)
    }
  }
}
</script>