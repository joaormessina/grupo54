function haOnzeDigitos(cpf) {
    //---- edite aqui para a validação do exercício 9a
    let comprimento = cpf.toString().length
    if(comprimento == 11){
        return true
    } else {
        return false }
}

function todosOsOnzeDigitosSaoNumeros(cpf) {
    //---- edite aqui para a validação do exercício 9b
    for(i=0; i<cpf.length; i++){
        if( !isNaN( parseInt(cpf[i]) ) ){
        //    console.log( "'" + cpf[i] + "' é um número")
        }
        else if( isNaN( parseInt(cpf[i]) ) ){
        //    console.log( "'" + cpf[i] + "' NÃO é um número")
            return false
        } 
    } return true 
}

function osOnzeNumerosSaoDiferentes(cpf) {
    //---- edite aqui para a validação do exercício 9c
    if( !(!!cpf.toString().match(/^(\d)\1*$/)) ){
        return true
    } else {
    return false }
}

function oPrimeiroDigitoVerificadorEhValido(cpf) {
    //---- edite aqui para a validação do exercício 9d
    let da = cpf.toString().substring(0,1)
    let db = cpf.toString().substring(1,2)
    let dc = cpf.toString().substring(2,3)
    let dd = cpf.toString().substring(3,4)
    let de = cpf.toString().substring(4,5)
    let df = cpf.toString().substring(5,6)
    let dg = cpf.toString().substring(6,7)
    let dh = cpf.toString().substring(7,8)
    let di = cpf.toString().substring(8,9)
    let dj = cpf.toString().substring(9,10)

    let soma1 = 10*da + 9*db + 8*dc + 7*dd + 6*de + 5*df + 4*dg + 3*dh + 2*di 
    let resto1 = (soma1*10)%11
    // console.log(da+db+dc+dd+de+df+dg+dh+di + " soma:" + soma1 + " resto:" + resto1 + " == " + dj + " d10º")
    if(resto1 == 10){
        resto1 = 0
    }
    if(dj == resto1){
        return true
    } else {
    return false }
}

function oSegundoDigitoVerificadorEhValido(cpf) {
    //---- edite aqui para a validação do exercício 9e
    let da = cpf.toString().substring(0,1)
    let db = cpf.toString().substring(1,2)
    let dc = cpf.toString().substring(2,3)
    let dd = cpf.toString().substring(3,4)
    let de = cpf.toString().substring(4,5)
    let df = cpf.toString().substring(5,6)
    let dg = cpf.toString().substring(6,7)
    let dh = cpf.toString().substring(7,8)
    let di = cpf.toString().substring(8,9)
    let dj = cpf.toString().substring(9,10)
    let dk = cpf.toString().substring(10,11)

    let soma2 = 11*da + 10*db + 9*dc + 8*dd + 7*de + 6*df + 5*dg + 4*dh + 3*di + 2*dj
    let resto2 = (soma2*10)%11
    // console.log(da+db+dc+dd+de+df+dg+dh+di+dj + " " +soma2+ " " +dk+ "==" +resto2)
    if(resto2 == 10){
        resto2 = 0
    }
    if(dk == resto2){
        return true
    } else {
    return false }
}





//------------------- Não edite abaixo ----------------------------
function validarCPF(validacao, cpf) {
    switch (validacao) {
        case "onzeDigitos": return haOnzeDigitos(cpf)
        case "onzeSaoNumeros": return todosOsOnzeDigitosSaoNumeros(cpf) && validarCPF("onzeDigitos", cpf)
        case "naoSaoTodosIguais": return osOnzeNumerosSaoDiferentes(cpf) && validarCPF("onzeSaoNumeros", cpf)
        case "verificador10": return oPrimeiroDigitoVerificadorEhValido(cpf) && validarCPF("naoSaoTodosIguais", cpf)
        case "verificador11": return oSegundoDigitoVerificadorEhValido(cpf) && validarCPF("verificador10", cpf)

        default:
            console.error(validacao+" é um botão desconhecido...")
            return false
    }
}


function tratadorDeCliqueExercicio9(nomeDoBotao) {
    const cpf = document.getElementById("textCPF").value

    const validacao = (nomeDoBotao === "validade") ? "verificador11": nomeDoBotao
    const valido = validarCPF(validacao, cpf)
    const validoString = valido ? "valido": "inválido"
    const validadeMensagem = "O CPF informado ("+cpf+") é "+ validoString
    console.log(validadeMensagem)

    if (nomeDoBotao !== "validade") {
        let divResultado = document.getElementById(validacao);
        divResultado.textContent = validoString
        divResultado.setAttribute("class", valido ? "divValidadeValido": "divValidadeInvalido")    
    } else {
        window.alert(validadeMensagem)
    }

    
}