
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

    // Valida os campos
    if (
        descricao === "" ||
        campoValor.value.trim() === "" ||
        !Number.isFinite(valor) ||
        valor <= 0
    ) {
        alert("Preencha a descrição e informe um valor maior que zero!");
        return;
    }

    // Cria o gasto
    const gasto = {
        id: proximoId++,
        descricao: descricao,
        valor: valor
    };

    gastos.push(gasto);

    // Atualiza os valores
    total += valor;
    saldo -= valor;

    atualizarTela();

    // Limpa os campos
    campoDescricao.value = "";
    campoValor.value = "";
    campoDescricao.focus();
}

// Exclui um gasto
function excluirGasto(id) {
    const indice = gastos.findIndex(
        gasto => gasto.id === id
    );

    if (indice === -1) {
        return;
    }

    const gastoRemovido = gastos[indice];

    // Devolve o dinheiro ao saldo
    saldo += gastoRemovido.valor;

    // Atualiza o total gasto
    total -= gastoRemovido.valor;

    // Remove o gasto da lista
    gastos.splice(indice, 1);

    atualizarTela();
}

// Atualiza a lista e os valores
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

        // Cria o botão de exclusão
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

        // Organiza os elementos
        informacoes.appendChild(descricao);
        informacoes.appendChild(valor);

        item.appendChild(informacoes);
        item.appendChild(botaoExcluir);

        lista.appendChild(item);
    });

    // Atualiza o saldo
    document.getElementById("saldo").textContent =
        formatarMoeda(saldo);

    // Atualiza o total gasto
    document.getElementById("total").textContent =
        formatarMoeda(total);

    // Mostra ou esconde o aviso de saldo baixo
    const aviso = document.getElementById("avisoSaldo");

    if (saldo < 100) {
        aviso.hidden = false;
    } else {
        aviso.hidden = true;
    }
}
