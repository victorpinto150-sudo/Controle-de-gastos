let saldo = 500;
let total = 0;

// FUNÇÃO PARA ADICIONAR NOVO
function adicionarGasto(){

    // PEGAR OS VALORES DOS CAMPOS
    let descricao = document.getElementById("descricao").value;
    let valor = Number(document.getElementById("valor").value);

    if(descricao == "" || valor <= 0){
        alert("Preencha a descrição e o valor!")
        return;
    }

    // ATUALIZA OS VALORES
    total = total + valor;
    saldo = saldo - valor;

    // ADICIONA O GASTO NA LISTA
    document.getElementById("listaGastos").innerHTML +=
        '<div class="gasto">' +
            '<span>'+ descricao +'</span>' +
            '<span>R$ ' + valor.toFixed(2) + '</span>' +
        '</div>';

    // ATUALIZADO O TOTAL
    document.getElementById("total").textContent = 
        "R$ " + total.toFixed(2);

    // ATUALIZADO O SALDO
    document.getElementById("saldo").textContent = 
        "R$ " + saldo.toFixed(2);  
        
    // LIMPA OS CAMPOS PARA UMA NOVA DESPESA
    document.getElementById("descricao").value = "";
    document.getElementById("valor").value = "";
}
