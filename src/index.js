import './main.scss';
import axios from 'axios';

var app = new Vue({
  el: '#app',
  data: {
    projects: []
  },
  methods: {
    loadData: function () {
      axios.get('https://sasptp6a7h.execute-api.eu-west-1.amazonaws.com/default/nodeServerStatus')
      .then((response) => {
        console.log(response);
        this.projects = response.data;
      })
    }
  },
  beforeMount() {
    this.loadData();
  }
});

