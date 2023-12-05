// Carrinho
let abrirCar = document.querySelector('#car-icon')
let carrinho = document.querySelector('.carr')
let fecharCar = document.querySelector('#fechar')

abrirCar.onclick = () => {
    carrinho.classList.add("active");
};

fecharCar.onclick = () => {
    carrinho.classList.remove("active");
};

if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready);

} else {
    ready();
}

//marcação remoção de itens
function ready() {
    var removeCarrButtons = document.getElementsByClassName("delete")
    console.log(removeCarrButtons)
    for (var i = 0; i < removeCarrButtons.length; i++) {
        var button = removeCarrButtons[i]
        button.addEventListener('click', removeCarrItens)
    }
    var quantidade3 = document.getElementsByClassName('quant-car')
    for (var i = 0; i < quantidade3.length; i++) {
        var input = quantidade3[i];
        input.addEventListener("change", quanty);
    }
    //adicionar Carrinho
    var addcar = document.getElementsByClassName("addCarr");
    for (var i = 0; i < addcar.length; i++) {
        var button = addcar[i];
        button.addEventListener("click", addCarClick);
    }
//Finalizar compra 
/*document.getElementsByClassName("btn-Finalizar")[0].addEventListener("click", clicarBotao);
}
function clicarBotao() {
    alert('Compra finalizada!!!');
    var carrContent = document.getElementsByClassName('content-car')[0];
    while (carrContent.hasChildNodes()) {
        carrContent.removeChild(carrContent.firstChild);
    }
    updateTotal();*/
}


function removeCarrItens(event) {
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updateTotal();
}

function quanty(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updateTotal();
}

// add carrinho
function addCarClick(event) {
    var button = event.target;
    var produtosLoja = button.parentElement;
    var titulo = produtosLoja.getElementsByClassName("descricao")[0].innerText;
    var preco = produtosLoja.getElementsByClassName("preco")[0].innerText;
    var produtoImg = produtosLoja.getElementsByClassName("img-produto")[0].src;
    addProdutoCar(titulo, preco, produtoImg);
    updateTotal();
}

function addProdutoCar(titulo, preco, produtoImg) {
    var itensCar = document.getElementsByClassName('content-car')[0];
    var itensCarNome = itensCar.getElementsByClassName('prod-car-titulo');


    for (var i = 0; i < itensCarNome.length; i++) {
        if (itensCarNome[i].innerText === titulo) {
            alert("Produto já adicionado no carrinho");
            return;
        }
    }


    var boxCarLoja = document.createElement("div");
    boxCarLoja.classList.add('box-carrinho');

    var carBoxContent = `
        <img src="${produtoImg}" alt="" class="img-carrinho">
        <div class="box-descr">
            <div class="prod-car-titulo">${titulo}</div>
            <div class="preco-car">${preco}</div>
            <input type="number" value="1" class="quant-car" placeholder="Quantidade">
        </div>
        <i class='bx bxs-trash delete'></i>`;

    boxCarLoja.innerHTML = carBoxContent;

    itensCar.append(boxCarLoja);
    boxCarLoja.getElementsByClassName('delete')[0].addEventListener("click", removeCarrItens);
    boxCarLoja.getElementsByClassName('quant-car')[0].addEventListener("change", quanty);
}



//Soma Total

function updateTotal() {
    var contentCarr = document.getElementsByClassName('content-car')[0];
    var BoxesCarr = contentCarr.getElementsByClassName('box-carrinho');
    var total = 0;

    for (var i = 0; i < BoxesCarr.length; i++) {
        var boxCarr = BoxesCarr[i];
        var preco1 = boxCarr.getElementsByClassName('preco-car')[0];
        var quantidade1 = boxCarr.getElementsByClassName('quant-car')[0];
        var preco = parseFloat(preco1.innerText.replace("R$", ""));
        var quantidade2 = quantidade1.value;
        total = total + (preco * quantidade2);
    }

    total = Math.round(total * 100) / 100;

    document.getElementsByClassName('preco-total')[0].innerText = 'R$' + total;

    return total;
}


paypal.Buttons({
    createOrder: function (data, actions) {
        // Lógica para criar a ordem no lado do cliente
        return actions.order.create({
            purchase_units: [{
                amount: {
                    value: '1.00' // Substitua pelo valor total da compra
                }
            }]
        });
    },
    onApprove: function (data, actions) {
        // Lógica a ser executada quando o pagamento é aprovado
        alert('Compra aprovada!');

        // Redirecionamento para uma página de confirmação ou outra ação desejada
        window.location.href = 'URL_DA_PAGINA_DE_CONFIRMACAO';
    }
}).render('#paypal-button-container');
