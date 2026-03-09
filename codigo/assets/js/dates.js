let data = localStorage.getItem("data")
data = data ? JSON.parse(data) : null
const meses = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro"
];

const diasDaSemana = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];



// Váriavel principal
let date = new Date();

// Função que retorna a data atual do calendário 
function getCurrentDate(element, asString) {
    if (element) {
        if (asString) {
            return element.textContent = diasDaSemana[date.getDay()] + ', ' + date.getDate() + " de " + meses[date.getMonth()] + " de " + date.getFullYear();
        }
        return element.value = date.toISOString().substr(0, 10);
    }
    return date;
}


// Função principal que gera o calendário
function generateCalendar() {

    // Pega um calendário e se já existir o remove
    const calendar = document.getElementById('calendar');
    if (calendar) {
        calendar.remove();
    }
    
    // Cria a tabela que será armazenada as datas
    const table = document.createElement("table");
    table.id = "calendar";

    

    //Pega o dia da semana do primeiro dia do mês
    const weekDay = new Date(
        date.getFullYear(),
        date.getMonth(),
        1
    ).getDay();

    //Pega o ultimo dia do mês
    const lastDay = new Date(
        date.getFullYear(),
        date.getMonth() + 1,
        0
    ).getDate();

    let tr = document.createElement("tr");
    let td = '';
    let empty = '';
    let btn = document.createElement('button');
    let semana = 0;

    // Se o dia da semana do primeiro dia do mês for maior que 0(primeiro dia da semana);
    while (semana < weekDay) {
        td = document.createElement("td");
        empty = document.createTextNode(' ');
        td.appendChild(empty);
        tr.appendChild(td);
        semana++;
    }

    // Vai percorrer do 1º até o ultimo dia do mês
    for (let i = 1; i <= lastDay;) {
        // Enquanto o dia da semana for < 7, ele vai adicionar colunas na linha da semana
        while (semana < 7) {
            td = document.createElement('td');
            let text = document.createTextNode(i);
            btn = document.createElement('button');
            btn.className = "btn-day";
            btn.addEventListener('click', function () { changeDate(this) });
            semana++;



            // Controle para ele parar exatamente no ultimo dia
            if (i <= lastDay) {
                i++;
                btn.appendChild(text);
                td.appendChild(btn)
            } else {
                text = document.createTextNode(' ');
                td.appendChild(text);
            }
            tr.appendChild(td);
        }
        // Adiciona a linha na tabela
        table.appendChild(tr);

        // Cria uma nova linha para ser usada
        tr = document.createElement("tr");

        // Reseta o contador de dias da semana
        semana = 0;
    }
    // Adiciona a tabela a div que ela deve pertencer
    const content = document.getElementById('table');
    content.appendChild(table);
    changeActive();
    changeHeader(date);
   
    getCurrentDate(document.getElementById("currentDate"), true);
    getCurrentDate(document.getElementById("date"), false);
}



// Método Muda o mês e o ano do topo do calendário
function changeHeader(dateHeader) {
    const month = document.getElementById("month-header");
    if (month.childNodes[0]) {
        month.removeChild(month.childNodes[0]);
    }
    const headerMonth = document.createElement("h1");
    const textMonth = document.createTextNode(meses[dateHeader.getMonth()].substring(0, 3) + " " + dateHeader.getFullYear());
    headerMonth.appendChild(textMonth);
    month.appendChild(headerMonth);
}

// Função para mudar a cor do botão do dia que está ativo
function changeActive() {
    let btnList = document.querySelectorAll('button.active');
    btnList.forEach(btn => {
        btn.classList.remove('active');
    });
    btnList = document.getElementsByClassName('btn-day');
    for (let i = 0; i < btnList.length; i++) {
        const btn = btnList[i];
        if (btn.textContent === (date.getDate()).toString()) {
            btn.classList.add('active');
        }
    }
}



//Procura se há tarefas na data
function showTask(date) {
    if (!data) return
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    const formattedDate = date.toLocaleDateString('pt-BR', options).replace(/\//g, '-');
   
    data.users[0].tarefas.map((tarefa) =>{
        console.log(tarefa)
        if(tarefa.data == formattedDate) {
          console.log("Dentro da condição")
          const wrapper = document.getElementById("task-wrapper")
          const task = document.createElement("div")
          const tarefaJaExistente = document.getElementById(`tarefa-${tarefa.titulo}`)
          if (tarefaJaExistente) tarefaJaExistente.remove()

          task.id = `tarefa-${tarefa.titulo.replace(" ", "-")}`
          task.className = "task"
          task.innerHTML =
            `
                <h2>${tarefa.titulo}</h2>
                <p style="font-size: 13px">${tarefa.data}</p>
                <p style="font-size: 13px">${tarefa.hora}</p>
            `
          
          wrapper.appendChild(task)
        }
    })
    
    data.users[0].projetos.map((projeto)=>{
        const tarefasDoProjeto = projeto.tarefas
        const tituloDoProjeto = projeto.titulo
        tarefasDoProjeto.map((tarefa)=>{
         if(tarefa.data == formattedDate) {
            const wrapper = document.getElementById("task-wrapper")
            const task = document.createElement("div")

            const tarefaJaExistente = document.getElementById(`tarefa-${tarefa.titulo}`)
            if (tarefaJaExistente) tarefaJaExistente.remove()

            task.id = `tarefa-${tarefa.titulo.replace(" ","-")}`
            task.className = "task"
            task.innerHTML =
                `
                    <h2><strong>${tarefa.titulo}</strong></h2>
                    <p style="font-size: 13px; margin-bottom: 2rem">${tituloDoProjeto}</p>
                    <p style="font-size: 13px">${tarefa.data}</p>
                    <p style="font-size: 13px">${tarefa.hora}</p>
                `
            
            wrapper.appendChild(task)
        }
        })
    })

    


}
// Muda a data pelo numero do botão clicado
function changeDate(button) {
    let newDay = parseInt(button.textContent);
    date = new Date(date.getFullYear(), date.getMonth(), newDay);
    showTask(date)
    generateCalendar();
}

// Funções de avançar e retroceder mês e dia
function nextMonth() {
    date = new Date(date.getFullYear(), date.getMonth() + 1, 1);
    generateCalendar(date);
}

function prevMonth() {
    date = new Date(date.getFullYear(), date.getMonth() - 1, 1);
    generateCalendar(date);
}



document.getElementById("previous").addEventListener("click", prevMonth)
document.getElementById("next").addEventListener("click", nextMonth)



document.addEventListener('DOMContentLoaded', () => {
    generateCalendar(date)
})


