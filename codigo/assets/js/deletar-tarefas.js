const url = window.location.href
const id = parseInt(url.slice(url.indexOf('?') + 1))

let data = JSON.parse(localStorage.getItem("data"))

const singleIndex = data.users[0].tarefas.findIndex(task => task.id === id)
if (singleIndex !== -1) {
    data.users[0].tarefas.splice(singleIndex, 1)
} else {
    data.users[0].projetos.forEach(projeto => {
        const taskIndex = projeto.tarefas.findIndex(task => task.id === id)
        if (taskIndex !== -1) {
            projeto.tarefas.splice(taskIndex, 1)
        }
    })
}

localStorage.setItem("data", JSON.stringify(data))

const msg = document.getElementById("status-msg")
if (msg) {
    msg.style.color = "green"
    msg.textContent = "Tarefa deletada com sucesso!"
}

setTimeout(() => {
    window.location.replace("tarefas.html")
}, 1500)