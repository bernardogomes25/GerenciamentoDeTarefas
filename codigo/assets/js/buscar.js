function buscarTarefa() {
    const rawData = localStorage.getItem("data")
    if (!rawData) {
        alert("Nenhuma tarefa cadastrada ainda.")
        return
    }
    const data = JSON.parse(rawData)
    const busca = document.getElementById('busca').value.toLowerCase().trim()
    const lista = document.getElementById('lista')

    const encontradas = []
    data.users[0].tarefas.forEach(item => {
        if (item.titulo.toLowerCase().includes(busca)) encontradas.push(item)
    })
    if (data.users[0].projetos) {
        data.users[0].projetos.forEach(projeto => {
            projeto.tarefas.forEach(task => {
                if (task.titulo.toLowerCase().includes(busca)) encontradas.push(task)
            })
        })
    }

    lista.innerHTML = ''
    if (encontradas.length > 0) {
        encontradas.forEach(tarefa => {
            const item = document.createElement('li')
            item.innerHTML = `<h5><strong>${tarefa.titulo}</strong></h5><h5>${tarefa.data}</h5><h5>${tarefa.hora}</h5>`
            lista.appendChild(item)
        })
    } else {
        const item = document.createElement('li')
        item.innerHTML = `<p style="color: red">Tarefa não encontrada</p>`
        lista.appendChild(item)
    }
}

document.getElementById("buscar").addEventListener("click", buscarTarefa)
document.getElementById("busca").addEventListener("keydown", (e) => {
    if (e.key === "Enter") buscarTarefa()
})
