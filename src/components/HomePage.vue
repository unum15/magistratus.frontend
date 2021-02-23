<template>
  <div style="max-width:330px;margin: 0 auto;">
    <p>
      Welcome to the Seattle Citizen's Police Portal
    </p>
    <b-table small striped hover :items="people" :fields="fields">
    </b-table>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  data() {
    return {
      people: [],
      fields: [
        {
          key: 'name',
          label: 'Name',
          sortable: true
        },
        {
          key: 'hire_date',
          label: 'Hire Date',
          sortable: true
        },
      ]
    }
  },
  created() {
        this.$http.get('/people').then((results) => {
            this.people = results.data.data;
        });
    },
}
</script>