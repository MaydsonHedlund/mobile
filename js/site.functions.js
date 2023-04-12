var _SC_CONFIGURADOR_TERMINAL_ = {}
CreateDataBase();

const _SITE_ = {}

_SITE_.AbrirModalSite = function (params) {    
    try {        
       
        $("#txtTextoMensagem").text(params);
        $("#modalMensagem").modal('show');

    } catch (error) {    
        console.log(error)
    }
}


_SITE_.AbrirModalCadastroCliente = function (params) {    
  try {        
      
      $("#modalCadastroCliente").modal('show');
      
  } catch (error) {    
      console.log(error)
  }
}

_SITE_.CadastrarCliente = function () {    
  try {        
      AbrirTelaSacola();
      
      $("#modalCadastroCliente").modal('hide');
  } catch (error) {    
      console.log(error)
  }
}

_SITE_.CancelarCadastrarCliente = function () {    
  try {        
      
      
      $("#modalCadastroCliente").modal('hide');
  } catch (error) {    
      console.log(error)
  }
}


function openCity(evt, cityName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(cityName).style.display = "block";

    if (evt != undefined) {
      evt.currentTarget.className += " active";
    }

    elements = document.getElementsByClassName("sale")

    if (cityName == "Home" || cityName == "Cancelar") {      
      element = document.getElementsByClassName("fixed-bottom")[0]
      element.classList.add("invisible");
    }
    else{      
      element = document.getElementsByClassName("fixed-bottom")[0]
      element.classList.remove("invisible");
    }
  }

 

 function EfetuarLogin() {
  try {

      var parameters = '?usuario=' + document.getElementsByClassName('txt-user')[0].value + '&senha=' + document.getElementsByClassName('txt-password')[0].value;

      $.ajax({
          headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
          },
          url: _SC_CONFIGURADOR_TERMINAL_.PdvHosting + '/util/autorizargerente' + parameters,
          type: 'GET',
          contentType: 'application/json; charset=utf-8',
          success: function (result) {

            console.log(result)
            
              if (result == true) {
                  window.location.href = 'app.html';
              }
              else {
                console.log("Não logou")

                  //Mensagem("Autorização Gerente", "Credencial do gerente não encontrada!<br>Verifique e tente novamente!<br><br><br>");
              }

          },
          error: function (xhr, status, error) {
              console.log(xhr)
              console.log(status)
              console.log(error)
          }
      });

  } catch (e) {
      alert(e.Message);
  }
}

  function BuscarBandeiraCartao() {
    $.ajax({
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      url: _SC_CONFIGURADOR_TERMINAL_.PdvHosting + '/recebimento/buscarbandeiracartao',
      type: 'GET',
      contentType: 'application/json; charset=utf-8',
      dataType: 'json',
      success: function (result) {
        
        console.log(result);

      },
      error: function () {
      }
    });
  }

  function NovaVenda() {
    try {
      

      elements = document.getElementsByClassName("sale")
    
      for (let index = 0; index < elements.length; index++) {
        const element = elements[index];
        element.classList.remove("invisible");
      }
    
      let element = document.getElementsByClassName("col-identity")[0];
      element.click();

    } catch (error) {
        console.log(error)
    }
  }


  function AbrirTelaSacola() {
    try {
      
      let element = document.getElementsByClassName("col-cart")[0];
      element.click();

    } catch (error) {
      console.log(error)
    }

  }


  function AbrirTelaPagamento() {
    try {
      
      let element = document.getElementsByClassName("col-payment")[0];
      element.click();

    } catch (error) {
      console.log(error)
    }

  }


  function AbrirTelaFiscal() {
    try {
      
      let element = document.getElementsByClassName("col-fiscal")[0];
      element.click();

    } catch (error) {
      console.log(error)
    }

  }


  function AbrirTelaInicial() {
    try {
      
      let element = document.getElementsByClassName("col-home")[0];
      element.click();
      

    } catch (error) {
      console.log(error)
    }

  }


function CreateDataBase() {
  try {
    
    var request = indexedDB.open('SmartCommerceMobile', 1);
    request.onerror = function(event) {
      console.log('Erro ao abrir o banco de dados');
    };
    request.onsuccess = function(event) {
      console.log('Banco de dados aberto com sucesso');
      var db = event.target.result;
    };
    request.onupgradeneeded = function(event) {
      console.log('Banco de dados inexistente, criando novo...');
      var db = event.target.result;
      var objectStore = db.createObjectStore('sc_configuracao_terminal',{ keyPath: 'id' });
      
    };

  } catch (error) {
    console.log('<<-- error catch -->>\n\r', error)
  }
  
}


function AddDataBase() {

  try {

    let pdvHosting = document.getElementsByClassName('txt-pdv-hosting')[0].value;
    
    if (pdvHosting.split(':').length < 3 || (pdvHosting.includes('http') == false || pdvHosting.includes('https') ==  false)) {
      Mensagem("Configurador", "Digite uma URL válida");
      return false;
    }

    var request = indexedDB.open('SmartCommerceMobile', 1);

    request.onsuccess = function(event) {
      var db = event.target.result;
      var transaction = db.transaction(['sc_configuracao_terminal'], 'readwrite');
      var objectStore = transaction.objectStore('sc_configuracao_terminal');
      var request = objectStore.add({ id: 1, PdvHosting: pdvHosting });
      console.log('Item adicionado com sucesso');
      
      transaction.oncomplete = function(event) {
        db.close();
      };

      window.location.href = "login.html";

    };

    request.onerror = function(event) {
      console.log('Erro ao abrir o banco de dados');
      console.log(event.srcElement.error.message);
    };
      
    

  } catch (error) {
    console.log('<<-- error catch -->>\n\r', error)
  }  
}

function GetDataBase() {
  try {

    console.log("GetDataBase");

    var request = indexedDB.open('SmartCommerceMobile', 1);

    request.onerror = function(event) {
      console.log('Deu ruim');
      console.log(event.srcElement.error.message);
    };

    request.onsuccess = function(event) {
      var db = event.target.result;
      var transaction = db.transaction(['sc_configuracao_terminal'], 'readonly');
      var objectStore = transaction.objectStore('sc_configuracao_terminal');
      var request = objectStore.get(1);

      request.onsuccess = function(event) {
        
        _SC_CONFIGURADOR_TERMINAL_ = event.target.result;

        console.log(_SC_CONFIGURADOR_TERMINAL_)
        
        if (_SC_CONFIGURADOR_TERMINAL_ == undefined || _SC_CONFIGURADOR_TERMINAL_ == null) {
          let element = document.getElementsByClassName('configurador-terminal')[0];
          console.log(element)
          element.classList.remove("invisible");
          
        }
        else{
          
          if (window.location.href.includes('login.html') == false) {
            window.location.href = "login.html";
          }         
          
        }

      };

      transaction.oncomplete = function(event) {
        db.close();
      };
    };

  } catch (error) {
    console.log('<<-- error catch -->>\n\r', error)
  }
  
}

function UpdateDataBase() {
  try {

    var request = indexedDB.open('SmartCommerceMobile', 1);

    request.onsuccess = function(event) {
      var db = event.target.result;
      var transaction = db.transaction(['sc_configuracao_terminal'], 'readwrite');
      var objectStore = transaction.objectStore('sc_configuracao_terminal');
      var request = objectStore.get(1);
      request.onsuccess = function(event) {

        var data = event.target.result;
        data.name = 'Maydson';

        var updateRequest = objectStore.put(data);

        updateRequest.onsuccess = function(event) {
          console.log('Item atualizado com sucesso');
        };
        
      };
      transaction.oncomplete = function(event) {
        db.close();
      };
    };

  } catch (error) {
    console.log('<<-- error catch -->>\n\r', error)
  }
  
}


var metodoCallBack = null;

function Mensagem(titulo, mensagem, callback) {
    //Aguardar(false);
    document.getElementById("txtTituloMensagem").textContent = titulo;
    document.getElementById("txtTextoMensagem").textContent = mensagem;
    metodoCallBack = callback;    
    $("#modalMensagem").modal('show');
    setTimeout(function () { $('#txtModalMensagem').focus(); }, 1000);
}

function FecharMensagemDialogo() {

    $("#modalMensagem").modal('hide');
    if (metodoCallBack != null) {
        metodoCallBack();
    }

}