<template>
<div>
  <v-container fluid>
    <v-row>
      <v-col>
        <v-card flat>
          <v-card-title>
              Events
              <v-spacer></v-spacer>
              <v-btn color="primary" @click.prevent="showAddEditDialog('Create', {})">
                <v-icon left>mdi-calendar-plus</v-icon>
                Add
              </v-btn>
            </v-card-title>
            <v-card-text>
              <v-data-table
                :headers="headers"
                :items="events"
              >
                <template v-slot:[`item.date_time_start`]="{ item }">
                  {{ new Date(item.date_time_start).toLocaleString() }}
                </template>
                <template v-slot:[`item.date_time_end`]="{ item }">
                  {{ new Date(item.date_time_end).toLocaleString() }}
                </template>
                <template v-slot:[`item.participants`]="{ item }">
                  {{ item.participants.length }}
                </template>
                <template v-slot:[`item.actions`]="{ item }">
                  <v-btn
                    icon
                    color="primary"
                    @click.prevent="showViewDialog(item)"
                  >
                    <v-icon>mdi-details</v-icon>
                  </v-btn>
                  <v-btn
                    icon
                    color="primary"
                    @click.prevent="showAddEditDialog('Edit', item)"
                  >
                    <v-icon>mdi-circle-edit-outline</v-icon>
                  </v-btn>
                  <v-btn
                    icon
                    color="primary"
                    @click.prevent="showDeleteDialog(item)"
                  >
                    <v-icon>mdi-delete-empty</v-icon>
                  </v-btn>
                </template>
              </v-data-table>
            </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  <event-view-dialog
    :show="view_props.show"
    :item="view_props.item"
    @close="closeEventViewDialog"
  />
  <add-edit-dialog
    :show="add_edit_props.show"
    :action="add_edit_props.action"
    :item="add_edit_props.item"
    @close="closeAddEditDialog"
  />
  <confirmation-dialog
    :show="delete_props.show"
    :action="delete_props.action"
    :loading="delete_props.loading"
    @confirm="confirmDelete"
    @cancel="cancelDelete"
  />
  <snackbar
    :show="snackbar_props.show"
    :message="snackbar_props.message"
    :alert_type="snackbar_props.type"
    @close="dismissAlert"
  />
</div>
</template>

<script>
import axios from 'axios'
import EventViewDialog from '../components/EventViewDialog.vue'
import AddEditDialog from '../components/EventAddEditDialog.vue'
import ConfirmationDialog from '../components/ConfirmationDialog.vue'
import Snackbar from '../components/Snackbar.vue'
  export default {
    name: 'Event',
    components: {
      EventViewDialog,
      AddEditDialog,
      ConfirmationDialog,
      Snackbar
    },
    data() {
      return {
        events: [],
        delete_props: {
          show: false,
          loading: false,
          item: {}
        },
        snackbar_props: {
          show: false,
          message: '',
          type: 'success'
        },
        add_edit_props: {
          show: false,
          action: 'Create',
          item: {}
        },
        view_props: {
          show: false,
          item: {}
        },
        headers: [
          { text: 'Name', value: 'name', width: '40%'},
          { text: 'Start', value: 'date_time_start', width: '20%'},
          { text: 'End', value: 'date_time_end', width: '20%'},
          { text: 'Participants', value: 'participants', width: '10%'},
          { text: 'Actions', value: 'actions', sortable: false }
        ],
      }
    },
    methods: {
      async fetchEvent() {
        try {
          const response = await axios.get(`http://localhost:3005/api/events`)
          this.events = response.data
        } catch(error) {
          console.log(error)
        }
      },

      showViewDialog(item) {
        this.view_props.show = true
        this.view_props.item = item
      },

      closeEventViewDialog() {
        this.view_props.show = false
        this.view_props.item = {}
      },

      showAddEditDialog(action, item) {
        this.add_edit_props.show = true
        this.add_edit_props.item = item
        this.add_edit_props.action = action
      },

      closeAddEditDialog(response) {
        this.add_edit_props.show = false
        this.add_edit_props.item = {}
        this.add_edit_props.action = 'Create'
        if (response.execute) {
          this.setSnackbar(response.data.show, response.data.message, response.data.status)
          this.fetchEvent()
        }
      },

      showDeleteDialog(item) {
        this.delete_props.show = true
        this.delete_props.item = { id: item.id, name: item.name, type: 'Event' }
      },

      async confirmDelete() {
        this.delete_props.loading = true
        try {
          const response = await axios.delete(
            `http://localhost:3005/api/events/${this.delete_props.item.id}`
          );
          this.fetchEvent()
          this.setSnackbar(true, response.data.message, response.data.status)
        } catch (error) {
          console.log(error)
        } finally {
          this.delete_props.show = false;
          this.delete_props.loading = false;
        }
      },

      cancelDelete() {
        this.delete_props.item = {};
        this.delete_props.show = false;
      },

      dismissAlert(isVisible) {
        this.setSnackbar(isVisible, '', 'success')
      },

      setSnackbar(visible, message, type) {
        this.snackbar_props.show = visible
        this.snackbar_props.message = message
        this.snackbar_props.type = type
      }
    },
    mounted() {
      this.fetchEvent()
    }
  }
</script>
