let data = JSON.parse(localStorage.getItem("data"))

document.getElementById("form").addEventListener("submit", (ev) => {
    ev.preventDefault()
    const titulo = document.getElementById("titulo").value.trim()
    const rawDate = document.getElementById("data").value
    const hora = document.getElementById("hora").value
    const projeto = document.getElementById("projeto").value.trim()

    if (!titulo || !rawDate || !hora) {
        alert("Preencha os campos obrigatórios: Título, Data e Hora.")
        return
    }

    // Converte YYYY-MM-DD → DD-MM-YYYY para armazenamento
    const [y, m, d] = rawDate.split('-')
    const date = `${d}-${m}-${y}`

    const instance = { titulo, "data": date, hora }

    if (projeto) {
        const userProject = data.users[0].projetos.find(p => p.titulo === projeto)
        if (userProject) {
            const maxId = userProject.tarefas.length > 0
                ? Math.max(...userProject.tarefas.map(t => t.id))
                : 0
            instance.id = maxId + 1
            userProject.tarefas.push(instance)
        } else {
            alert("Projeto não encontrado. Tem certeza que digitou o nome certo?")
            return
        }
    } else {
        const allIds = [
            ...data.users[0].tarefas.map(t => t.id),
            ...data.users[0].projetos.flatMap(p => p.tarefas.map(t => t.id))
        ].filter(Number.isFinite)
        instance.id = allIds.length > 0 ? Math.max(...allIds) + 1 : 1
        data.users[0].tarefas.push(instance)
    }

    localStorage.setItem("data", JSON.stringify(data))
    alert("Tarefa adicionada!")
    document.getElementById("form").reset()
    setTimeout(() => {
        window.location.replace("tarefas.html")
    }, 500)
})

