document.addEventListener('DOMContentLoaded', () => {
    const projects = JSON.parse(localStorage.getItem('kanban-projects')) || []

    const pendentes = document.querySelector('.pendentes-info ul')
    const ativos = document.querySelector('.ativos-info ul')
    const finalizados = document.querySelector('.finalizados-info ul')

    pendentes.innerHTML = ''
    ativos.innerHTML = ''
    finalizados.innerHTML = ''

    if (projects.length === 0) {
        const msg = '<li style="color:#888;font-style:italic">Nenhum projeto cadastrado.</li>'
        pendentes.innerHTML = msg
        ativos.innerHTML = msg
        finalizados.innerHTML = msg
        return
    }

    projects.forEach(project => {
        const li = document.createElement('li')
        li.textContent = project.name
        if (project.status === 'pending') pendentes.appendChild(li)
        else if (project.status === 'active') ativos.appendChild(li)
        else if (project.status === 'finished') finalizados.appendChild(li)
    })
})