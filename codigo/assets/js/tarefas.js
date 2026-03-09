import database from '../../../database.json' with {type: 'json'}

if (!localStorage.getItem("data")) {
    localStorage.setItem("data", JSON.stringify(database))
}

const data = JSON.parse(localStorage.getItem("data"))

const tarefas = []
data.users[0].tarefas.forEach(t => tarefas.push(t))
data.users[0].projetos.forEach(projeto => {
    projeto.tarefas.forEach(t => tarefas.push(t))
})

const container = document.getElementById("my-tasks")
tarefas.forEach(tarefa => {
    const task = document.createElement("div")
    task.className = 'task'
    task.innerHTML = `
        <p>${tarefa.titulo} — ${tarefa.data} às ${tarefa.hora}</p>
        <a href="editar-tarefas.html?${tarefa.id}"><button>&#x1F4DD; Editar</button></a>
        <a href="delete.html?${tarefa.id}"><button style="background:none;border:none;font-size:1.2rem;cursor:pointer">❌</button></a>
    `
    container.appendChild(task)
})



