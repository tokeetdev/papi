/*jshint unused:false */

(function (exports) {

	'use strict';

	exports.todoStorage = {
		fetch: fetchTasks,
		async save(todos) {
			const prev = await fetchTasks()
			const byId = pkey => task => task.pkey === pkey

			const created = todos.filter(t => !t.pkey)
			const updated = todos.filter(t => t.pkey)
			const removed = prev.filter(t => !todos.find(byId(t.pkey)))
			
			for (const todo of removed) {
				deleteTask(todo)
			}

			for (const todo of created) {
				postTask(todo)
				.then(stored => Object.assign(todo, stored.data))
			}

			for (const todo of updated) {
				const old = prev.find(byId(todo.pkey))
				const task = JSON.parse(JSON.stringify(todo))
				if (_.isEqual(old, task)) continue
				putTask(todo)
			}
		}
	};
	
	function postTask(task) {
		return fetch('/tasks', {
			method: 'POST', body: JSON.stringify(task),
			headers: { 'Content-Type': 'application/json' }
		}).then(handle403)
	}

	function putTask(task) {
		return fetch('/tasks/' + task.pkey, {
			method: 'PUT', body: JSON.stringify(task),
			headers: { 'Content-Type': 'application/json' }
		}).then(handle403)
	}
	function deleteTask(task)	{
		return fetch('/tasks/' + task.pkey, {
			method: 'DELETE',
			headers: { 'Content-Type': 'application/json' }
		}).then(handle403)
	}

	function fetchTasks() {
		return fetch('/tasks').then(handle403)
	}

	function handle403(res) {
		if (res.status === 403) {
			document.cookie = document.cookie.replace(/AuthToken=[a-z0-9]+/gi, 'AuthToken=; Max-Age=-99999999;')
			window.location = window.location.href
		} else {
			return res.json()
		}
	}

})(window);
