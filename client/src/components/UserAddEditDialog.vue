<template>
<v-dialog v-model="showDialog" max-width="600" persistent scrollable>
    <v-card>
      <v-card-title class="pa-0 ml-2">
        <v-toolbar flat>
          <v-toolbar-title>{{ `${action} User` }}</v-toolbar-title>
        </v-toolbar>
      </v-card-title>
      <v-card-text>
        <validation-observer tag="form" ref="observer">
          <v-container>
            <v-row>
              <v-col cols="12" sm="12" md="6">
                <validation-provider
                  v-slot="{ errors }"
                  name="First Name"
                  rules="required|alpha_spaces"
                >
                  <v-text-field
                    v-model.trim="form.firstname"
                    label="First Name*"
                    outlined
                    dense
                    required
                    :error-messages="errors"
                  ></v-text-field>
                </validation-provider>
              </v-col>
              <v-col cols="12" sm="12" md="6">
                <validation-provider
                  v-slot="{ errors }"
                  name="Middle Name"
                  rules="alpha_spaces"
                >
                  <v-text-field
                    v-model.trim="form.middlename"
                    label="Middle Name"
                    outlined
                    dense
                    required
                    :error-messages="errors"
                  ></v-text-field>
                </validation-provider>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="12" md="6">
                <validation-provider
                  v-slot="{ errors }"
                  name="Last Name"
                  rules="required|alpha_spaces"
                >
                  <v-text-field
                    v-model.trim="form.lastname"
                    label="Last Name*"
                    outlined
                    dense
                    required
                    :error-messages="errors"
                  ></v-text-field>
                </validation-provider>
              </v-col>
              <v-col cols="12" sm="12" md="6">
                <validation-provider
                  v-slot="{ errors }"
                  name="Extension"
                  rules="alpha_dash"
                >
                  <v-text-field
                    v-model.trim="form.extension"
                    label="Extension"
                    outlined
                    dense
                    required
                    :error-messages="errors"
                  ></v-text-field>
                </validation-provider>
              </v-col>
            </v-row>
          </v-container>
        </validation-observer>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          text
          :disabled="loading"
          @click.prevent="cancel"
        >
          Cancel
        </v-btn>
        <v-btn
          color="success"
          text
          :loading="loading"
          :disabled="loading"
          @click.prevent="submit"
        >
          Save
          <template v-slot:loader>
            <span>Saving...</span>
          </template>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import axios from 'axios'
import { ValidationObserver, ValidationProvider } from 'vee-validate'
export default {
  components: {
    ValidationObserver,
    ValidationProvider
  },
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    action: {
      type: String,
      required: "Create",
    },
    item: {
      type: Object,
      default: null,
    },
  },
  computed: {
    showDialog() {
        return this.show
    }
  },
  data() {
    return {
      loading: false,
      form: {
        firstname: '',
        middlename: '',
        lastname: '',
        extension: ''
      }
    }
  },
  watch: {
    item(value) {
      if (value) {
        this.form.firstname = value.firstname;
        this.form.middlename = value.middlename;
        this.form.lastname = value.lastname;
        this.form.extension = value.extension
      } else {
        this.form.firstname = '';
        this.form.middlename = '';
        this.form.lastname = '';
        this.form.extension = ''
      }
    }
  },
  methods: {
    async submit() {
      const validate = await this.$refs.observer.validate();
      let snackbar_data;
      if (validate) {
        try {
          let response;
          this.submit_loading = true;
          if (this.action === "Create") {
            response = await axios.post("http://localhost:3005/api/users", this.form);
          } else {
            response = await axios.put(
              `http://localhost:3005/api/users/${this.item.id}`,
              this.form
            );
          }
          snackbar_data = {
            show: true,
            message: response.data.message,
            status: response.data.status
          }
        } catch (error) {
          snackbar_data = {
            show: true,
            message: error.response.data.message,
            status: error.response.data.status
          }
        } finally {
          this.$emit("close", {
            execute: true,
            data: snackbar_data
          });
          this.resetForm();
          this.loading = false;
        }
      }
    },
    resetForm() {
      this.form.firstname =
        this.form.middlename =
        this.form.lastname =
        this.form.extension =
        ""
    },
    cancel() {
      this.resetForm();
      this.$emit("close", { execute: false, data: {}});
    },
  },
  updated() {
    this.$refs.observer.reset();
  },
}
</script>