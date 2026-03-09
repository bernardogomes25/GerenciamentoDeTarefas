const url = window.location.href
const id = parseInt(url.slice(url.indexOf('?') + 1))

let data = JSON.parse(localStorage.getItem("data"))

// Encontra a tarefa pelo id (em tarefas avulsas ou dentro de projetos)
function findTask(id) {
    let found = data.users[0].tarefas.find(t => t.id === id)
    if (found) return found
    for (const projeto of data.users[0].projetos) {
        found = projeto.tarefas.find(t => t.id === id)
        if (found) return found
    }
    return null
}

// Pré-preenche o formulário com os dados atuais da tarefa
const tarefaAtual = findTask(id)
if (tarefaAtual) {
    document.getElementById("titulo").value = tarefaAtual.titulo
    // Converte DD-MM-YYYY → YYYY-MM-DD para o input type="date"
    if (tarefaAtual.data) {
        const [d, m, y] = tarefaAtual.data.split('-')
        document.getElementById("data").value = `${y}-${m}-${d}`
    }
    document.getElementById("hora").value = tarefaAtual.hora
}

document.getElementById("form").addEventListener("submit", (ev) => {
    ev.preventDefault()
    const titulo = document.getElementById("titulo").value.trim()
    const rawDate = document.getElementById("data").value
    const hora = document.getElementById("hora").value

    if (!titulo || !rawDate || !hora) {
        alert("Preencha todos os campos.")
        return
    }

    // Converte YYYY-MM-DD → DD-MM-YYYY para armazenamento
    const [y, m, d] = rawDate.split('-')
    const date = `${d}-${m}-${y}`

    const instance = { id, titulo, "data": date, hora }

    const singleIndex = data.users[0].tarefas.findIndex(t => t.id === id)
    if (singleIndex !== -1) {
        data.users[0].tarefas[singleIndex] = instance
    } else {
        data.users[0].projetos.forEach(projeto => {
            const taskIndex = projeto.tarefas.findIndex(t => t.id === id)
            if (taskIndex !== -1) {
                projeto.tarefas[taskIndex] = instance
            }
        })
    }

    localStorage.setItem("data", JSON.stringify(data))
    alert("Tarefa atualizada!")
    setTimeout(() => {
        window.location.replace("tarefas.html")
    }, 500)
})


