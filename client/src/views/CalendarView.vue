<template>
<div>
  <v-container fluid>
    <v-row>
      <v-col>
        <v-card flat>
          <v-card-title>
              Events Calendar
              <v-spacer></v-spacer>
            </v-card-title>
            <v-card-text>
              <v-sheet
                tile
                height="54"
                class="d-flex"
              >
                <v-btn
                  icon
                  class="ma-2"
                  @click="$refs.calendar.prev()"
                >
                  <v-icon>mdi-chevron-left</v-icon>
                </v-btn>
                <v-select
                  v-model="type"
                  :items="types"
                  dense
                  outlined
                  hide-details
                  class="ma-2"
                  label="type"
                ></v-select>
                <v-select
                  v-model="mode"
                  :items="modes"
                  dense
                  outlined
                  hide-details
                  label="event-overlap-mode"
                  class="ma-2"
                ></v-select>
                <v-select
                  v-model="weekday"
                  :items="weekdays"
                  dense
                  outlined
                  hide-details
                  label="weekdays"
                  class="ma-2"
                ></v-select>
                <v-spacer></v-spacer>
                <v-btn
                  icon
                  class="ma-2"
                  @click="$refs.calendar.next()"
                >
                  <v-icon>mdi-chevron-right</v-icon>
                </v-btn>
              </v-sheet>
              <v-sheet height="600">
                <v-calendar
                  ref="calendar"
                  v-model="value"
                  :weekdays="weekday"
                  :type="type"
                  :events="events"
                  :event-overlap-mode="mode"
                  :event-overlap-threshold="30"
                  @change="getEvents"
                ></v-calendar>
              </v-sheet>
            </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</div>
</template>

<script>
import axios from 'axios'
  export default {
    name: 'CalendarView',
    data() {
      return {
        type: 'month',
        types: ['month', 'week', 'day', '4day'],
        mode: 'stack',
        modes: ['stack', 'column'],
        weekday: [0, 1, 2, 3, 4, 5, 6],
        weekdays: [
          { text: 'Sun - Sat', value: [0, 1, 2, 3, 4, 5, 6] },
          { text: 'Mon - Sun', value: [1, 2, 3, 4, 5, 6, 0] },
          { text: 'Mon - Fri', value: [1, 2, 3, 4, 5] },
          { text: 'Mon, Wed, Fri', value: [1, 3, 5] },
        ],
        value: '',
        events: [],
      }
    },
    methods: {
      async getEvents ({ start, end }) {
        const events = []
        const min = new Date(`${start.date}T00:00:00`)
        const max = new Date(`${end.date}T23:59:59`)
        let dbEvents
        try {
          const response = await axios.get(`http://localhost:3005/api/events/calendar?start=${min}&end=${max}`)
          dbEvents =response.data
        }catch(error) {
          console.log(error);
        }

        for (let i = 0; i < dbEvents.length; i++) {
          events.push({
            name: dbEvents[i].name,
            start: new Date(dbEvents[i].date_time_start),
            end: new Date(dbEvents[i].date_time_end),
            color: `#${(Math.random()*0xFFFFFF<<0).toString(16)}`,
            timed: true
          })
        }

        this.events = events
      },
    }
  }
</script>
