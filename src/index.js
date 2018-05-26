
import './main.scss'
import axios from 'axios';

var app = new Vue({
	el: '#app',
	data: {
		projects: {
			website: {
				status: {},
				url: "https://www.mikemjharris.com",
				versionEndpoint: "/version.json"

			},

			blog: {
				status: {},
				url: "https://blog.mikemjharris.com",
				versionEndpoint: "/version.json"
			}
		}
	},
	methods: {
		loadData: function () {
			for (var project_name in this.projects) {
				let project = this.projects[project_name];
				Promise.all([axios.get(project.url + project.versionEndpoint), project_name])
				.then((response)  =>  {
					this.projects[response[1]].status = response[0].data;
				}, (error)  =>  {
					this.projects[response[1]].error = true;
				})
			}
		}
	},
	beforeMount() {
		this.loadData();
	}
});

