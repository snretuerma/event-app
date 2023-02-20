<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col>
          <v-card flat>
            <v-card-title>
              Users List
              <v-spacer></v-spacer>
              <v-btn color="primary" @click.prevent="showAddEditDialog('Create', {})">
                <v-icon left>mdi-account-plus</v-icon>
                Add
              </v-btn>
            </v-card-title>
            <v-card-text>
              <v-data-table
                :headers="headers"
                :items="users"
              >
                <template v-slot:[`item.deletedAt`]="{ item }">
                  <v-chip dark :ripple="false" :color="item.deletedAt ? 'red': 'green'">
                    {{ item.deletedAt ? 'Inactive': 'Active' }}
                  </v-chip>
                </template>
                <template v-slot:[`item.createdAt`]="{ item }">
                  {{ new Date(item.createdAt).toLocaleString() }}
                </template>
                <template v-slot:[`item.actions`]="{ item }">
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
                    <v-icon>mdi-account-off</v-icon>
                  </v-btn>
                </template>
              </v-data-table>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

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
import AddEditDialog from '../components/UserAddEditDialog.vue'
import ConfirmationDialog from '../components/ConfirmationDialog.vue'
import Snackbar from '../components/Snackbar.vue'
export default {
  name: 'User',
  components: {
    AddEditDialog,
    ConfirmationDialog,
    Snackbar
  },
  data() {
    return {
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
      headers: [
        { text: 'Name', value: 'fullname', width: '45%'},
        { text: 'Active', value: 'deletedAt', width: '20%'},
        { text: 'Created', value: 'createdAt', width: '25%'},
        { text: 'Actions', value: 'actions', sortable: false }
      ],
      users: []
    }
  },

  methods: {
    async fetchUsers() {
      try {
        const response = await axios.get('http://localhost:3005/api/users')
        this.users = response.data
      } catch(error) {
        console.log(error)
      }
    },

    // Add/Edit
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
        this.fetchUsers()
      }
    },

    // Delete
    showDeleteDialog(item) {
      this.delete_props.show = true
      this.delete_props.item = { id: item.id, name: item.fullname, type: 'User' }
    },
    async confirmDelete() {
      this.delete_props.loading = true
      try {
        const response = await axios.delete(
          `http://localhost:3005/api/users/${this.delete_props.item.id}`
        );
        this.fetchUsers()
        this.setSnackbar(true, response.data.message, response.data.status)
      } catch (error) {
        this.setSnackbar(true, error.response.data.message, error.response.data.status)
      } finally {
        this.delete_props.show = false;
        this.delete_props.loading = false;
      }
    },
    cancelDelete() {
      this.delete_props.item = {};
      this.delete_props.show = false;
    },

    // Notification
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
    this.fetchUsers()
  }
}
</script>
