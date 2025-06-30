// AA12 --------------------
// Tratamento dos botões dropdown para busca de UF e Cidade

// Elementos dos botões que abrem os dropdowns
const dropbtnUf = document.getElementById('dropbtnUf');
const dropbtnCidade = document.getElementById('dropbtnCidade');

// Dropdowns containers, onde os itens <a> serão inseridos
const dropdownUf = document.getElementById("dropUf");
const dropdownCidade = document.getElementById("dropCidade");

const loginStatusUF_IBGE = document.getElementById("loginStatusUF_IBGE");
const loginStatusCidade_IBGE = document.getElementById("loginStatusCidade_IBGE");

let ufSelecionado = '';
let cidadeSelecionada = '';
let ufsCarregados = false;


function resetarDropdowns() {
    dropbtnUf.innerText = "Selecione um Estado";
    dropbtnCidade.innerText = "Selecione uma Cidade";

    if (dropdownUf) dropdownUf.innerHTML = '';
    if (dropdownCidade) dropdownCidade.innerHTML = '<a class="dropdown-item">Selecione um Estado primeiro</a>';

    loginStatusUF_IBGE.innerText = "UF";
    loginStatusCidade_IBGE.innerText = "Cidade";
    ufSelecionado = '';
    cidadeSelecionada = '';
    ufsCarregados = false;
}


async function carregaDropdownUf() {
    if (dropdownCidade && dropdownCidade.classList.contains('show')) {
        mostrarMenu('dropCidade');
    } 

    if(ufsCarregados && dropdownUf && dropdownUf.children.length > 0) {
        if (typeof mostrarMenu === 'function') mostrarMenu('dropUf')
        return;
    }
    if (dropbtnUf) dropbtnUf.innerText = 'Carregando UFs...';
    if (dropdownUf) dropdownUf.innerHTML = '<a class="dropdown-item">Carregando...</a>';
    //ufsCarregados = false; 

    try {
        let res = await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome');
        if (!res.ok) throw new Error("Erro na requisição: "+ res.status);

        const estados = await res.json();
        console.log("Dados recebidos: " + JSON.stringify(estados));
        if (!estados || estados.length === 0) throw new Error("Estados não encontrados.");

        let listaUfs = '';
        estados.forEach(uf => {
            const nomeUfTratado = uf.nome.replace(/'/g, "\\'");
            listaUfs += `<a class="dropdown-item" onclick="selecionarUf('${uf.id}', '${nomeUfTratado}', '${uf.sigla}')">${uf.nome} (${uf.sigla})</a>`;
        });

        if (dropdownUf) dropdownUf.innerHTML = listaUfs;
        ufsCarregados = true;
        if (dropbtnUf) dropbtnUf.innerText = 'Selecionar UF';
    
    } catch (error) {
        console.log("Erro ao buscar UFs: ", error);
        if (dropdownUf) dropdownUf.innerHTML = `<a class="dropdown-item">Erro. Clique para tentar novamente.</a>`;
        if (dropbtnUf) dropbtnUf.innerText = 'Erro (UF)';
    } 
}

function selecionarUf(idUf, nomeUf, siglaUf) {
    ufSelecionado = idUf;
//    console.log(ufSelecionado);
    
    if (loginStatusUF_IBGE) loginStatusUF_IBGE.innerText = siglaUf;

    if (dropbtnUf) dropbtnUf.innerText = nomeUf;
    console.log("UF Selecionado: ", ufSelecionado, " id: ", idUf, ", sigla: ", siglaUf, ", nome: ", nomeUf);
    
    // Limpa seleção e campo de cidade
    cidadeSelecionada = '';
    if (loginStatusCidade_IBGE) loginStatusCidade_IBGE.innerText = 'Cidade';

    if (dropbtnCidade) dropbtnCidade.innerText = 'Selecionar Cidade';
    if (dropdownCidade) dropdownCidade.innerHTML = '<a class="dropdown-item">Carregando cidades...</a>';

    buscaCidade(idUf);
    if (typeof mostrarMenu === "function") mostrarMenu('dropUf'); // Fecha o dropdown de UF
}


async function buscaCidade(ufId) { 
    if (!ufId) {
        if (dropdownCidade) dropdownCidade.innerHTML = '<a class="dropdown-item">Selecione um UF.</a>';
        return;
    }
    if (dropbtnCidade) dropbtnCidade.innerText = 'Carregando cidades...';

    try {
        let res = await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados/' + ufId + '/municipios?orderBy=nome');
        if (!res.ok) { 
            throw new Error("Erro na requisição: "+ res.status);
        }

        const municipios = await res.json();
        console.log("Dados recebidos: " + JSON.stringify(municipios));
        
        if (municipios.erro) {
            throw new Error("Cidades não encontradas.");
        }
        if (!municipios || municipios.length === 0) { // API do IBGE não retorna 'erro' para lista vazia
            if (dropdownCidade) dropdownCidade.innerHTML = '<a class="dropdown-item">Nenhuma cidade encontrada.</a>';
            if (dropbtnCidade) dropbtnCidade.innerText = 'Nenhuma cidade';
            return;
        }

        let listaCidades = '';
        municipios.forEach(cidade => {
            let cidadeNomeTratado = cidade.nome.replace(/'/g, "\\'");
            let cidadeElemento = `<a class="dropdown-item" onclick="selecionarCidade('${cidadeNomeTratado}')">${cidade.nome}</a>`;
            listaCidades += cidadeElemento;
        });
        if (dropdownCidade) dropdownCidade.innerHTML = listaCidades;
        if (dropbtnCidade) dropbtnCidade.innerText = 'Selecionar Cidade';
           
    } catch (error) {
        console.log("Erro ao buscar as Cidades: ", error);
        if (dropdownCidade) dropdownCidade.innerHTML = `<a class="dropdown-item">Erro ao carregar.</a>`;
        if (dropbtnCidade) dropbtnCidade.innerText = 'Erro (Cidade)';
    } finally {
       // if (dropdownCidade) mostrarMenu('dropCidade');
    }
}

function selecionarCidade(nome) {
    cidadeSelecionada = nome;
    
    if (loginStatusCidade_IBGE) loginStatusCidade_IBGE.innerText = nome;
    if (dropbtnCidade) dropbtnCidade.innerText = nome;
    console.log(`Cidade Selecionada: ${nome}`);
    if (typeof mostrarMenu === "function") mostrarMenu('dropCidade');
}
