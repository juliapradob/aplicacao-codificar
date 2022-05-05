var mensagem = document.getElementById("entradaMensagem");
var entradaCifra = document.getElementById("entradaCifra");
var cifraBase64 = document.getElementById("base64");
var incrementoCifra = document.getElementById("incrementoCifra");
var btnAcao = document.getElementById("acao");
var codificar = document.getElementById("selecaoCodificar");
var decodificar = document.getElementById("selecaoDecodificar");
var mudarBtn = document.querySelector(".selecao");
var numeroIncremento = document.getElementById("numeroIncremento");
var mensagemCifrada = document.getElementById("resultado");

//PARTE VISUAL DA APLICAÇÃO

entradaCifra.addEventListener("change", function () {
    if (entradaCifra.value == "cifraDeCesar") {
        incrementoCifra.style.display = "flex";
    } else if (entradaCifra.value == "cifraBase64") {
        incrementoCifra.style.display = "none";
    }
});

mudarBtn.addEventListener("change", function () {
    if (codificar.checked) {
        btnAcao.style.display = "flex";
        btnAcao.innerHTML = "CODIFICAR MENSAGEM";
    } else if (decodificar.checked) {
        btnAcao.style.display = "flex";
        btnAcao.innerText = "DECOFIDICAR MENSAGEM";
    }
});

// FAZENDO FUNCIONAR

function funcaoBase64(mensagem) {
    if (codificar.checked) {
        var resultado = btoa(mensagem)
        return resultado;
    } else if (decodificar.checked) {
        var resultado = atob(mensagem)
        return resultado;
    }   
}

function funcaoCesar(mensagem, incremento) {
    if (codificar.checked) {
        var resultado = '';
        for (var i = 0; i < mensagem.length; i++) {
            var codigo = mensagem[i].charCodeAt();
            if (codigo >= 65 && codigo <= 90) {
                var deslocamento = codigo + parseInt(incremento)
                if (deslocamento > 90) {
                    deslocamento -= 26
                }
                resultado += String.fromCharCode(deslocamento)
            } else if (codigo >= 97 && codigo <= 122) {
                var deslocamento = codigo + parseInt(incremento)
                if (deslocamento > 122) {
                    deslocamento -= 26
                }
                resultado += String.fromCharCode(deslocamento)
            } else {
                resultado += mensagem[i]
            }
        }
        return resultado;

    } else if (decodificar.checked) {
        var resultado = '';
        for (var i = 0; i < mensagem.length; i++) {
            var codigo = mensagem[i].charCodeAt();
            if (codigo >= 65 && codigo <= 90) {
                var deslocamento = codigo - parseInt(incremento)
                if (deslocamento < 65) {
                    deslocamento += 26
                }
                resultado += String.fromCharCode(deslocamento)
            } else if (codigo >= 97 && codigo <= 122) {
                var deslocamento = codigo - parseInt(incremento)
                if (deslocamento < 97) {
                    deslocamento += 26
                }
                resultado += String.fromCharCode(deslocamento)
            } else {
                resultado += mensagem[i]
            }
        }
        return resultado    
    }
}

btnAcao.addEventListener("click", function (e) {
    e.preventDefault();
    var entrada = mensagem.value;
    if (entradaCifra.value == "cifraDeCesar") {
        var incremento = numeroIncremento.value;
        mensagemCifrada.value = funcaoCesar(entrada, incremento);
    } else if (entradaCifra.value == 'cifraBase64') {
        mensagemCifrada.value = funcaoBase64(entrada);
    }
});

