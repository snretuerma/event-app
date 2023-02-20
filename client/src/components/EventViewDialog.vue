<template>
  <v-dialog v-model="showDialog" max-width="950" persistent>
    <v-card flat>
      <v-card-title class="pa-0 ml-2">
        <v-toolbar flat>
          <v-toolbar-title>{{ `View Event: ${item.name}` }}</v-toolbar-title>
        </v-toolbar>
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12" sm="12" md="12">
            <div class="text-caption">
              Event Name
            </div>
            <div class="text-body-1 font-weight-bold">
              {{ item.name }}
            </div>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="12" md="6">
            <div class="text-caption">
              Start
            </div>
            <div class="text-body-1 font-weight-bold">
              {{ new Date(item.date_time_start).toLocaleString() }}
            </div>
          </v-col>
          <v-col cols="12" sm="12" md="6">
            <div class="text-caption">
              End
            </div>
            <div class="text-body-1 font-weight-bold">
              {{ new Date(item.date_time_end).toLocaleString() }}
            </div>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="12" md="12">
            <v-data-table
              :headers="headers"
              :items="item.participants"
              :items-per-page="5"
            ></v-data-table>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click.prevent="close">
          Close
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
  },
  computed: {
    showDialog() {
        return this.show
    }
  },
  data() {
    return {
      headers: [
      {
        text: 'Participants',
        align: 'start',
        value: 'fullname',
      },
    ],
    }
  },
  methods: {
    close() {
      this.$emit("close");
    }
  }
}
</script>