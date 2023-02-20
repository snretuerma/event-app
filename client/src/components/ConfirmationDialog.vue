<template>
  <v-dialog v-model="showDialog" max-width="600" persistent>
    <v-card>
      <v-card-title class="pa-0 ml-2">
        <v-toolbar flat>
          <v-toolbar-title>{{ `Delete ${item?.type}` }}</v-toolbar-title>
        </v-toolbar>
      </v-card-title>
      <v-card-text>
        <p class="mb-2">
          Are you sure you want to delete
          <span class="font-weight-black text--primary"
            >"{{ item?.name }}" </span
          >?
        </p>
        <v-alert
          prominent
          dense
          outlined
          border="left"
          type="warning"
          class="my-0"
        >
          <div class="text-overline font-weight-black">Warning:</div>
          <div>
            <small>
              <ul>
                <li>This action may <strong>not be reversible</strong> .</li>
                <li>
                  It may also <strong>fail</strong> if connected records are
                  available.
                </li>
              </ul>
            </small>
          </div>
        </v-alert>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          class="mx-2"
          text
          :disabled="loading"
          @click.prevent="cancel"
        >
          Cancel
        </v-btn>
        <v-btn
          color="warning"
          class="mx-2"
          text
          :loading="loading"
          :disabled="loading"
          @click.prevent="confirm"
        >
          Confirm
          <template v-slot:loader>
            <span>Deleting...</span>
          </template>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    item: {
      type: Object,
      default: () => ({}),
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    showDialog() {
        return this.show
    }
  },
  methods: {
    confirm() {
      this.$emit("confirm");
    },
    cancel() {
      this.$emit("cancel");
    },
  },
};
</script>