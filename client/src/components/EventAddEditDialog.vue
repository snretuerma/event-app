<template>
  <v-dialog v-model="showDialog" max-width="600" persistent scrollable>
    <v-card>
      <v-card-title class="pa-0 ml-2">
        <v-toolbar flat>
          <v-toolbar-title>{{ `${action} Event` }}</v-toolbar-title>
        </v-toolbar>
      </v-card-title>
      <v-card-text>
        <validation-observer tag="form" ref="observer">
          <v-container>
            <v-row>
              <v-col cols="12" sm="12" md="12">
                <validation-provider
                  v-slot="{ errors }"
                  name="Name"
                  rules="required"
                >
                  <v-text-field
                    v-model.trim="form.name"
                    label="Name*"
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
                  name="Start Date"
                  rules="required"
                >
                  <v-menu
                    ref="start_date_picker"
                    v-model="start_date_picker"
                    :close-on-content-click="false"
                    :return-value.sync="form.date_start"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="form.date_start"
                        label="Start Date*"
                        prepend-inner-icon="mdi-calendar"
                        readonly
                        outlined
                        dense
                        v-bind="attrs"
                        v-on="on"
                        :error-messages="errors"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="form.date_start"
                      no-title
                      scrollable
                      :allowed-dates="allowedMonths"
                    >
                      <v-spacer></v-spacer>
                      <v-btn
                        text
                        color="primary"
                        @click="start_date_picker = false"
                      >
                        Cancel
                      </v-btn>
                      <v-btn
                        text
                        color="primary"
                        @click="$refs.start_date_picker.save(form.date_start)"
                      >
                        OK
                      </v-btn>
                    </v-date-picker>
                  </v-menu>
                </validation-provider>
              </v-col>
              <v-col cols="12" sm="12" md="6">
                <validation-provider
                  v-slot="{ errors }"
                  name="Start Time"
                  rules="required"
                >
                  <v-menu
                    ref="start_time_picker"
                    v-model="start_time_picker"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    :return-value.sync="form.time_start"
                    transition="scale-transition"
                    offset-y
                    max-width="290px"
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="form.time_start"
                        label="Start Time*"
                        prepend-inner-icon="mdi-clock-time-four-outline"
                        outlined
                        dense
                        readonly
                        v-bind="attrs"
                        v-on="on"
                        :error-messages="errors"
                      ></v-text-field>
                    </template>
                    <v-time-picker
                      v-model="form.time_start"
                      full-width
                      :allowed-hours="allowedHours"
                      :allowed-minutes="allowedMinutes"
                      min="8:00"
                      max="20:00"
                      @click:minute="$refs.start_time_picker.save(form.time_start)"
                    ></v-time-picker>
                  </v-menu>
                </validation-provider>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12" sm="12" md="6">
                <validation-provider
                  v-slot="{ errors }"
                  name="End Date"
                  rules="required"
                >
                  <v-menu
                    ref="end_date_picker"
                    v-model="end_date_picker"
                    :close-on-content-click="false"
                    :return-value.sync="form.date_end"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="form.date_end"
                        label="End Date*"
                        prepend-inner-icon="mdi-calendar"
                        readonly
                        outlined
                        dense
                        v-bind="attrs"
                        v-on="on"
                        :error-messages="errors"
                        :disabled="!form.date_start"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="form.date_end"
                      no-title
                      scrollable
                      :allowed-dates="allowedEndMonhs"
                    >
                      <v-spacer></v-spacer>
                      <v-btn
                        text
                        color="primary"
                        @click="end_date_picker = false"
                      >
                        Cancel
                      </v-btn>
                      <v-btn
                        text
                        color="primary"
                        @click="$refs.end_date_picker.save(form.date_end)"
                      >
                        OK
                      </v-btn>
                    </v-date-picker>
                  </v-menu>
                </validation-provider>
              </v-col>
              <v-col cols="12" sm="12" md="6">
                <validation-provider
                  v-slot="{ errors }"
                  name="End Time"
                  rules="required"
                >
                  <v-menu
                  ref="end_time_picker"
                  v-model="end_time_picker"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  :return-value.sync="form.time_end"
                  transition="scale-transition"
                  offset-y
                  max-width="290px"
                  min-width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="form.time_end"
                      label="End Time*"
                      prepend-inner-icon="mdi-clock-time-four-outline"
                      outlined
                      dense
                      readonly
                      v-bind="attrs"
                      v-on="on"
                      :error-messages="errors"
                      :disabled="!form.time_start"
                    ></v-text-field>
                  </template>
                  <v-time-picker
                    v-model="form.time_end"
                    full-width
                    :allowed-hours="allowedEndHours"
                    :allowed-minutes="allowedEndMinutes"
                    min="8:00"
                    max="20:00"
                    @click:minute="$refs.end_time_picker.save(form.time_end)"
                  ></v-time-picker>
                </v-menu>
                </validation-provider>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12" sm="12" md="12">
                <validation-provider
                  v-slot="{ errors }"
                  name="Participants"
                  rules="required"
                >
                  <v-autocomplete
                    v-model="form.participants"
                    :items="users"
                    :loading="users_loading"
                    :search-input.sync="search_user"
                    hide-selected
                    outlined
                    dense
                    item-text="fullname"
                    item-value="id"
                    label="Participants*"
                    placeholder="Search User"
                    multiple
                    counter="10"
                    v-on:input="select_limit"
                    :error-messages="errors"
                  >
                    <template v-slot:no-data>
                      <v-list-item>
                        <v-list-item-title>
                          Type to search for
                          <strong>User</strong>
                        </v-list-item-title>
                      </v-list-item>
                    </template>
                    <template v-slot:selection="{ attr, on, item, selected }">
                      <v-chip
                        v-bind="attr"
                        :input-value="selected"
                        color="primary"
                        dark
                        small
                        v-on="on"
                        class="my-1"
                      >
                        <span v-text="item.fullname"></span>
                      </v-chip>
                    </template>
                  </v-autocomplete>
                </validation-provider>
              </v-col>
            </v-row>
          </v-container>
        </validation-observer>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text :disabled="loading" @click.prevent="cancel">
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
import axios from "axios";
import { ValidationObserver, ValidationProvider } from "vee-validate";
export default {
  components: {
    ValidationObserver,
    ValidationProvider,
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
      return this.show;
    },
  },
  data() {
    return {
      loading: false,
      form: {
        name: "",
        date_start: "",
        time_start: "",
        date_end: "",
        time_end: "",
        participant: "",
      },

      start_date_picker: false,
      end_date_picker: false,
      start_time_picker: false,
      end_time_picker: false,

      users: [],
      users_loading: false,
      search_user: null,
    };
  },
  watch: {
    item(value) {
      if (value) {
        if(value.date_time_start && value.date_time_end) {
          this.form.name = value.name
          this.form.date_start = new Date(value.date_time_start).toISOString().split('T')[0]
          this.form.time_start = new Date(value.date_time_start).toLocaleTimeString('en', { timeStyle: 'short', hour12: false })
          this.form.date_end = new Date(value.date_time_end).toISOString().split('T')[0]
          this.form.time_end = new Date(value.date_time_end).toLocaleTimeString('en', { timeStyle: 'short', hour12: false })
          this.form.participant = value.participant
        }

      } else {
        this.form.name = "";
        this.form.date_start = "";
        this.form.time_start = "";
        this.form.date_end = "";
        this.form.time_end = "";
        this.form.participant = "";
      }
    },
    async search_user() {
      if (this.users.length > 0) return;
      if (this.users_loading) return;
      this.users_loading = true;
      try {
        const response = await axios.get("http://localhost:3005/api/users");
        this.users = response.data;
      } catch (error) {
        console.log(error);
      } finally {
        this.users_loading = false;
      }
    },
  },
  methods: {
    async test() {
      console.log({'Date': this.form.date_start, 'Time': this.form.time_start})
      console.log(new Date(`${this.form.date_start}  ${this.form.time_start}`))
      this.loading = false
    },
    async submit() {
      const validate = await this.$refs.observer.validate();
      let snackbar_data;
      if (validate) {
        this.form.date_time_start = new Date(`${this.form.date_start}  ${this.form.time_start}`)
        this.form.date_time_end = new Date(`${this.form.date_end}  ${this.form.time_end}`)
        try {
          let response;
          this.submit_loading = true;
          if (this.action === "Create") {
            response = await axios.post(
              "http://localhost:3005/api/events",
              this.form
            );
          } else {
            response = await axios.put(
              `http://localhost:3005/api/events/${this.item.id}`,
              this.form
            );
          }
          snackbar_data = {
            show: true,
            message: response.data.message,
            status: response.data.status,
          };
        } catch (error) {
          snackbar_data = {
            show: true,
            message: error.response.data.message,
            status: error.response.data.status,
          };
        } finally {
          this.$emit("close", {
            execute: true,
            data: snackbar_data,
          });
          this.resetForm();
          this.loading = false;
        }
      }
    },
    resetForm() {
      this.form.name =
        this.form.date_start =
        this.form.time_start =
        this.form.date_end =
        this.form.time_end =
        this.form.participant =
          "";
    },
    cancel() {
      this.resetForm();
      this.$emit("close", { execute: false, data: {} });
    },
    select_limit(items) {
      if(items.length > 10) {
        console.log('You can only select up to 10 participants', items)
        items.pop()
      }
    },
    allowedMonths: (value) => value >= new Date().toISOString().split('T')[0],
    allowedEndMonhs(value) {
      return value >= this.form.date_start
    },
    allowedHours(value) {
      if(new Date().toISOString().split('T')[0] === new Date(this.form.date_start).toISOString().split('T')[0]) {
        return value >= new Date().getHours() && value <= 20
      } else {
        return v => v >= 8 && v <= 20
      }
    },
    allowedMinutes(value) {
      if(new Date().toISOString().split('T')[0] === new Date(this.form.date_start).toISOString().split('T')[0]) {
        return value >= new Date().getMinutes() && value <= 60
      } else {
        return value >= 0 && value <= 60
      }
    },
    allowedEndHours(v) {
      if (this.form.time_start && this.form.date_start == this.form.date_end) {
        const start = this.form?.time_start?.split(':')[0]
        return v >= start && v <= 20
      } else {
        return v => v >= 8 && v <= 20
      }
    },
    allowedEndMinutes(value) {
      if(this.form.date_start === this.form.date_end) {
        return value >= this.form.time_start.split(':')[1] && value <= 60
      } else {
        return value >= 0 && value <= 60
      }
    }
  },
  updated() {
    this.$refs.observer.reset();
  },
};
</script>
