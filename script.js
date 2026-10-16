
let saldo = 500;
let total = 0;
let gastos = [];
let proximoId = 1;

// Formata os valores em reais
function formatarMoeda(valor) {
    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

// Adiciona um novo gasto
function adicionarGasto() {
    const campoDescricao = document.getElementById("descricao");
    const campoValor = document.getElementById("valor");

    const descricao = campoDescricao.value.trim();
    const valor = Number(campoValor.value);

    // Verifica se os campos foram preenchidos corretamente
    if (
        descricao === "" ||
        campoValor.value.trim() === "" ||
        !Number.isFinite(valor) ||
        valor <= 0
    ) {
        alert("Preencha a descrição e informe um valor maior que zero!");
        return;
    }

    // Cria um novo gasto
    const gasto = {
        id: proximoId++,
        descricao: descricao,
        valor: valor
    };

    gastos.push(gasto);

    // Atualiza o saldo e o total gasto
    total += valor;
    saldo -= valor;

    atualizarTela();

    // Limpa os campos
    campoDescricao.value = "";
    campoValor.value = "";
    campoDescricao.focus();
}

// Exclui um gasto e devolve o valor ao saldo
function excluirGasto(id) {
    const indice = gastos.findIndex(
        gasto => gasto.id === id
    );

    if (indice === -1) {
        return;
    }

    const gastoRemovido = gastos[indice];

    // Devolve o valor do gasto ao saldo
    saldo += gastoRemovido.valor;

    // Diminui o total gasto
    total -= gastoRemovido.valor;

    // Remove o gasto da lista
    gastos.splice(indice, 1);

    // Atualiza a tela
    atualizarTela();
}

// Atualiza a lista, o saldo e o total
function atualizarTela() {
    const lista = document.getElementById("listaGastos");

    lista.replaceChildren();

    gastos.forEach(gasto => {
        const item = document.createElement("div");
        item.className = "gasto";

        const informacoes = document.createElement("div");
        informacoes.className = "gasto-info";

        const descricao = document.createElement("span");
        descricao.textContent = gasto.descricao;

        const valor = document.createElement("span");
        valor.className = "gasto-valor";
        valor.textContent = formatarMoeda(gasto.valor);

        // Cria o botão de excluir
        const botaoExcluir = document.createElement("button");
        botaoExcluir.className = "botao-excluir";
        botaoExcluir.textContent = "Excluir";

        botaoExcluir.setAttribute(
            "aria-label",
            "Excluir gasto: " + gasto.descricao
        );

        botaoExcluir.addEventListener("click", function () {
            excluirGasto(gasto.id);
        });

        // Adiciona os elementos à lista
        informacoes.appendChild(descricao);
        informacoes.appendChild(valor);

        item.appendChild(informacoes);
        item.appendChild(botaoExcluir);

        lista.appendChild(item);
    });

    // Atualiza o saldo disponível
    document.getElementById("saldo").textContent =
        formatarMoeda(saldo);

    // Atualiza o total gasto
    document.getElementById("total").textContent =
        formatarMoeda(total);
}
