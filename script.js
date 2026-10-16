
    // Mostra um aviso quando o saldo fica abaixo de R$ 100
    const aviso = document.getElementById("avisoSaldo");

    if (saldo < 100) {
        aviso.hidden = false;
    } else {
        aviso.hidden = true;
    }
