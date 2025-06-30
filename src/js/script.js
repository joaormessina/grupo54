// Força mostrar apenas a Home assim que a página é carregada.
window.onpageshow = function atualizarPagina() {
    mostrarApenasHome();
};


// Mostrar apenas a Home, ocultando [Login] e [Criar Conta].
function mostrarApenasHome() {
    document.getElementById("divHome").classList.add("show");

    document.getElementById("login-body").classList.add("oculto");
    document.getElementById("login-body").classList.remove("show");

    document.getElementById("nova-conta").classList.add("oculto");
    document.getElementById("nova-conta").classList.remove("show");
}
  
// Mostrar apenas formulário de Login, ocultando a [Home] e [Criar Conta]; reseta valores dos campos.
function mostrarApenasLogin() {
    document.getElementById("divHome").classList.remove("show");
    document.getElementById("divHome").classList.add("oculto");
    
    document.getElementById("login-body").classList.add("show");
    document.getElementById("nova-conta").classList.remove("show");

    loginEmail.value = "";
    loginPass.value = "";
    botaoLogin.disabled = true;
    manterConectado.checked = false;

    resetarDropdowns();
}

// Mostrar apenas formulário de Criar Conta, ocultando a [Home] e o [Login]; reseta valores dos campos.
function mostrarApenasConta() {
    document.getElementById("divHome").classList.remove("show");
    document.getElementById("divHome").classList.add("oculto");

    document.getElementById("login-body").classList.remove("show");
    document.getElementById("nova-conta").classList.add("show");

    contaNome.value = ""; statusNome.innerHTML = ""; statusNome.classList.remove("status-ok","status-fail");
    contaSobrenome.value = ""; statusSobrenome.innerHTML = ""; statusSobrenome.classList.remove("status-ok","status-fail");
    contaCPF.value = ""; statusCPF.innerHTML = ""; statusCPF.classList.remove("status-ok","status-fail");
    contaEmail.value = ""; statusEmail.innerHTML = ""; statusEmail.classList.remove("status-ok","status-fail");
    contaPass.value = ""; statusPass.innerHTML = ""; statusPass.classList.remove("status-ok","status-fail");
    contaPassRep.value = ""; statusPassRep.innerHTML = ""; statusPassRep.classList.remove("status-ok","status-fail");
    botaoCriarConta.disabled = true;
    limpaFormCep();
    contaCep.value= ""; statusCep.innerText = "00000-000"; statusCep.classList.remove("status-ok","status-fail");
    //statusRua.removeChild(statusRua.firstChild);
}

//Elementos do form de Login.
const loginEmail = document.querySelector("#login-body > form > input");
const loginPass = document.getElementById("login-password");
const botaoLogin = document.getElementById("botaoLogin");
const manterConectado = document.getElementById("manterConectado");


//Valida se o campo foi preenchido.
function validaTextoEmBranco(texto, campo) {
    if (typeof texto !== 'string') {
        return false;
    }
    return texto.trim() !== "" ;
} 

//Valida se o campo 'E-mail' tem apenas 1 caracter '@', precedido e sucedido por qualquer sequência de caracteres, seguido de '.' e outra sequência.
function validaEmail(email) {
    if (!email) {
        return false;
    }
    if (typeof email !== 'string') {
        return false;
    }
    email = email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

//Habilita botão "Entrar" apenas se ambos campos 'E-mail' e 'Senha' estiverem preenchidos E se o campo 'E-mail' é válido.
function habilitaLogin() {
    if ( validaTextoEmBranco(loginPass.value) && validaTextoEmBranco(loginEmail.value) && validaEmail(loginEmail.value)) {
        botaoLogin.disabled = false ;
    } else {
        botaoLogin.disabled = true ;
    }
}
loginEmail.addEventListener('input', habilitaLogin);
loginPass.addEventListener('input', habilitaLogin);



//Elementos de ocultação da senha.
const olho = document.getElementById("olho");
const olhoIconAberto = "https://cdn1.iconfinder.com/data/icons/unicons-line-vol-3/24/eye-512.png";
const olhoIconFechado = "https://cdn1.iconfinder.com/data/icons/unicons-line-vol-3/24/eye-slash-512.png";

//Reinicia atributos do ícone clicável da senha para novo tratamento.
if (olho && loginPass) {
    olho.removeAttribute("onmousedown");
    olho.removeAttribute("onmouseup");
    olho.src=olhoIconAberto;
}

//Novo tratamento de toggle para ocultação da senha.
function trocaOlho() {        
    if (loginPass.type === "password") {
        mostrarSenha();
        olho.src=olhoIconFechado;
    } else  { 
        ocultarSenha();
        olho.src=olhoIconAberto;
    }
};
olho.addEventListener("click", trocaOlho);
loginPass.addEventListener("focusout", ocultarSenha);

botaoLogin.addEventListener('click', function() {
    //const novaConta = new Conta(contaNome.value, contaSobrenome.value, new CPF(contaCPF.value), contaEmail.value, contaPass.value);
    //console.log(novaConta);
    mostrarApenasHome();
});



// --------------------
//Elementos do form de Criar Conta.
const iconErro = "https://cdn1.iconfinder.com/data/icons/buttons-14/512/Button_Delete-512.png"
const iconValido = "https://cdn1.iconfinder.com/data/icons/buttons-14/512/Button_Tick-512.png";

const contaNome = document.querySelector("#nova-conta > form > *:nth-child(2)");
const statusNome = document.getElementById("statusNome");

const contaSobrenome = document.querySelector("#nova-conta > form > *:nth-child(5)");
const statusSobrenome = document.getElementById("statusSobrenome");

const contaCPF = document.querySelector("#nova-conta > form > input[type=text]:nth-child(8)");
const statusCPF = document.getElementById("statusCPF");

const contaEmail = document.querySelector("#nova-conta > form > input[type=text]:nth-child(11)");
const statusEmail = document.getElementById("statusEmail");

const contaPass = document.querySelector("#nova-conta > form > input[type=password]:nth-child(14)");
const statusPass = document.getElementById("statusSenha");

const contaPassRep = document.querySelector("#nova-conta > form > input[type=password]:nth-child(17)");
const statusPassRep = document.getElementById("statusRepitaSenha");

const botaoCriarConta = document.querySelector("#nova-conta > form > #areaBotaoConta > input");
const areaBotaoConta = document.getElementById("areaBotaoConta");

 //id=areaBotaoConta

contaNome.removeAttribute("onblur");

function validarCampoEAtualizarStatus(input, status) {
    if ( validaTextoEmBranco(input.value) ) {
        //console.log("ok ",input);
        status.classList.remove("status-fail");
        status.classList.add("status-ok");
        status.innerHTML = "<img class=olho style=right:auto!important; src=" + iconValido + "><p style=padding-left:20px> Campo válido</p>";
        validarTodosCampos();
    } else { 
        //console.log("fail ",input);
        status.classList.remove("status-ok");
        status.classList.add("status-fail");
        status.innerHTML = "<img class=olho style=right:auto!important; src=" + iconErro + "><p style=padding-left:20px> Campo inválido</p>";
        validarTodosCampos();
    }
}

contaNome.addEventListener('input', function() {
    validarCampoEAtualizarStatus(contaNome, statusNome);
});
contaSobrenome.addEventListener('input', function() {
    validarCampoEAtualizarStatus(contaSobrenome, statusSobrenome);
});
//contaCPF.addEventListener('input', function() {
  //  validarCampoEAtualizarStatus(contaCPF, statusCPF);
//});
contaEmail.addEventListener('input', function() {
    if (validaEmail(contaEmail.value)){
        validarCampoEAtualizarStatus(contaEmail, statusEmail);
    } else {
        validarCampoEAtualizarStatus('', statusEmail);
    }
});
contaPass.addEventListener('input', function() {
    if ( contaPass.value === contaPassRep.value ) {
        validarCampoEAtualizarStatus(contaPass, statusPass);
        validarCampoEAtualizarStatus(contaPassRep, statusPassRep);
    } else {
        validarCampoEAtualizarStatus('', statusPass);
        statusPass.innerHTML = statusPass.innerHTML.replace("inválido</p>", "inválido. Senhas devem ser iguais.</p>");
        validarCampoEAtualizarStatus('', statusPassRep);
        statusPassRep.innerHTML = statusPassRep.innerHTML.replace("inválido</p>", "inválido. Senhas devem ser iguais.</p>");
    }
});
contaPassRep.addEventListener('input', function() {
    if ( contaPass.value === contaPassRep.value ) {
        validarCampoEAtualizarStatus(contaPassRep, statusPassRep);
        validarCampoEAtualizarStatus(contaPass, statusPass);
    } else {
        validarCampoEAtualizarStatus('', statusPassRep);
        statusPassRep.innerHTML = statusPassRep.innerHTML.replace("inválido</p>", "inválido. Senhas devem ser iguais.</p>");
        validarCampoEAtualizarStatus('', statusPass);
        statusPass.innerHTML = statusPass.innerHTML.replace("inválido</p>", "inválido. Senhas devem ser iguais.</p>");
    }
});


function validarCPF(inputCpf) {
    //console.log(inputCpf);
    console.log(inputCpf.value);

    const valorCpf = inputCpf.value; // .replace(/\D/g, '');

    try {
        const cpfObj = new CPF(valorCpf);
        //console.log(cpfObj);
        validarCampoEAtualizarStatus(inputCpf, statusCPF);
    } catch (error) {
        validarCampoEAtualizarStatus('', statusCPF);
        //console.log(error.message);
        //console.log(statusCPF);
        statusCPF.innerHTML = statusCPF.innerHTML.replace("inválido</p>", "inválido. " + error.message + "</p>");
    } finally {
        validarTodosCampos();
    }
}

class CPF {
    #cpfLimpo;

    constructor(cpfString) {
        if (typeof cpfString !== 'string'){
            throw new Error("Entrada inválida para CPF.");
        }
        this.#cpfLimpo = cpfString.replace(/\D/g, '');

        this._validar();
    }

    _validar() {
        if( !haOnzeDigitos(this.#cpfLimpo) ){
            throw new Error("CPF deve conter 11 dígitos.");
        };
        if ( !todosOsOnzeDigitosSaoNumeros(this.#cpfLimpo) ){
            throw new Error("CPF deve conter apenas números.");
        };
        if ( !osOnzeNumerosSaoDiferentes(this.#cpfLimpo) ){
            throw new Error("CPF deve conter números diferentes.");
        };
        if ( !oPrimeiroDigitoVerificadorEhValido(this.#cpfLimpo) ){
            throw new Error("Primeiro dígito verificador inválido.");
        };
        if ( !oSegundoDigitoVerificadorEhValido(this.#cpfLimpo) ){
            throw new Error("Segundo dígito verificador inválido.");
        };
    }
}


function validarTodosCampos() {
    if ( statusNome.classList.contains("status-ok") && 
     statusSobrenome.classList.contains("status-ok") && 
     statusCPF.classList.contains("status-ok") && 
     statusEmail.classList.contains("status-ok") && 
     statusPass.classList.contains("status-ok") && 
     statusPassRep.classList.contains("status-ok") && 
     
     statusCep.classList.contains("status-ok") ) {
        botaoCriarConta.disabled = false;
        console.log("todos ok");
    } else {
        botaoCriarConta.disabled = true;
        //console.log("falha");
    } 
}

class Conta {
    #nome;
    #sobrenome;
    #cpf;
    #email;
    #senha;

    constructor(nome, sobrenome, cpf, email, senha) {     
        this.#nome = nome;
        this.#sobrenome = sobrenome;    
        this.#cpf = cpf;
        this.#email = email;
        this.#senha = senha;
    }
    get email() {
        return this.#email;
    }
}

botaoCriarConta.addEventListener('click', function() {
    const novaConta = new Conta(contaNome.value, contaSobrenome.value, new CPF(contaCPF.value), contaEmail.value, contaPass.value);
    console.log("Nova conta criada: ", novaConta);

    mostrarApenasConta()

    areaBotaoConta.classList.add("status-ok");
    areaBotaoConta.innerHTML += "<img class=olho style=right:auto!important; src=" + iconValido + "><p style=padding-left:20px><br> Conta criada. Você será redirecionado para o Login.</p>";

    setTimeout(() => {
        mostrarApenasLogin();
        if (novaConta && typeof novaConta.email === 'string') {
            loginEmail.value = novaConta.email;
            console.log("E-mail preenchido no Login: ", loginEmail.value);
        }

        areaBotaoConta.classList.remove("status-ok");
        if (botaoCriarConta) {
            while (areaBotaoConta.firstChild) {
                areaBotaoConta.removeChild(areaBotaoConta.firstChild);
            }
            areaBotaoConta.appendChild(botaoCriarConta);
        }        
    }, 5000);
});


// AA12 --------------------
//Elementos de CEP no form de Criar Conta.
const contaCep = document.getElementById("inputCep");
const statusCep = document.getElementById("statusCep");

const contaRua = document.getElementById("inputLogradouro");
const statusRua = document.getElementById("statusLogradouro");

const contaBairro = document.getElementById("inputBairro");
const statusBairro = document.getElementById("statusBairro");

const contaCidade = document.getElementById("inputCidade");
const statusCidade = document.getElementById("statusCidade");

const contaUF = document.getElementById("inputUF");
const statusUF = document.getElementById("statusUF");


function limpaFormCep() {
    contaRua.value=("");
    if (statusRua.firstChild) statusRua.removeChild(statusRua.firstChild);
    statusRua.classList.remove("status-ok","status-fail");
    statusRua.innerText = "Rua";
    
    contaBairro.value=("");
    if (statusBairro.firstChild) statusBairro.removeChild(statusBairro.firstChild);
    statusBairro.classList.remove("status-ok","status-fail");
    statusBairro.innerText = "Bairro";

    contaCidade.value=("");
    if (statusCidade.firstChild) statusCidade.removeChild(statusCidade.firstChild);
    statusCidade.classList.remove("status-ok","status-fail");
    statusCidade.innerText = "Cidade";

    contaUF.value=("");
    if (statusUF.firstChild) statusUF.removeChild(statusUF.firstChild);
    statusUF.classList.remove("status-ok","status-fail");
    statusUF.innerText = "UF";
};


function validarCEP(valor) { 
    if (typeof valor !== 'string') {
        throw new Error("Entrada inválida para CEP.")
    }

    const cepLimpo = valor.replace(/\D/g, '');
    if (cepLimpo === "") {
        throw new Error("CEP vazio.");
    }

    const formatoValido = /^[0-9]{8}$/;
    if ( !formatoValido.test(cepLimpo) ) {
        throw new Error("CEP inválido.");
    }

    return cepLimpo;
};

async function pesquisaCep(valor) {
    let cep;
    console.log("pesquisaCep() " + valor);
    
    try {
        cep = validarCEP(valor);
        console.log("validarCEP() " + cep);

        contaRua.value="...";
        contaBairro.value="...";
        contaCidade.value="...";
        contaUF.value="...";

        let res = await fetch('https://viacep.com.br/ws/'+ cep + '/json/');
        console.log(res);

        if (!res.ok) {
            throw new Error("Erro na requisição: "+ res.status);
        }

        const data = await res.json();
        console.log("Dados recebidos: " + JSON.stringify(data));
        
        if (data.erro) {
            throw new Error("CEP não encontrado.");
        }

        contaRua.value = data.logradouro || "";
        contaBairro.value = data.bairro || "";
        contaCidade.value = data.localidade || "";
        contaUF.value = data.uf || "";

        validarCampoEAtualizarStatus(contaCep, statusCep);
        validarCampoEAtualizarStatus(contaRua, statusRua);
        validarCampoEAtualizarStatus(contaBairro, statusBairro);
        validarCampoEAtualizarStatus(contaCidade, statusCidade);
        validarCampoEAtualizarStatus(contaUF, statusUF);

        /* var scriptCep = document.createElement('script');

        //Sincroniza com o callback.
        scriptCep.src = 'https://viacep.com.br/ws/'+ cep + '/json/?callback=meu_callback';

        //Insere script no documento e carrega o conteúdo.
        document.body.appendChild(scriptCep); */

    } catch (error) {
        limpaFormCep();
        validarCampoEAtualizarStatus('', statusCep);
        statusCep.innerHTML = statusCep.innerHTML.replace("inválido</p>", "inválido. " + error.message + "</p>");
    } finally {
        validarTodosCampos();
    }
};

/* fetch('https://viacep.com.br/ws/'+cep+'/json/')
    .then(response => response.json())
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error(error);
    });
*/

/* function meu_callback(conteudo) {
    if (!("erro" in conteudo)) {
        //Atualiza os campos com os valores.
        contaRua.value=(conteudo.logradouro);
        contaBairro.value=(conteudo.bairro);
        contaCidade.value=(conteudo.localidade);
        contaUF.value=(conteudo.uf);
    }
    else {
        //CEP não Encontrado.
        limpaFormCep();
        validarCampoEAtualizarStatus('', statusCep);
        statusCep.innerHTML = statusCep.innerHTML.replace("inválido</p>", "inválido. CEP não encontrado.</p>");
    }
    const scripts = document.querySelectorAll('script[src*="viacep.com.br"]');
    scripts.forEach(s => s.remove());
    validarTodosCampos();
}; */