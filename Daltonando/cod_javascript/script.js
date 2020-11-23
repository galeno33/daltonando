//ecapsular o programa dentro de uma função
(function(){
    //alert('ok'); //teste para saber se a função funciona
    var cnv = document.querySelector('canvas');
    var contexto = cnv.getContext('2d');
    //alert(contexto);//teste para saber se retorna o contexto bidimencional em 2d

    const p = window.document.getElementById("P");
   
    //RECURSOS DO  DALTONANDO=============================================================

    //Arrays(vetores)
    var sprites = [];//definir que será um array porque terei varios sprites(personagem, bola)
    var assestsToLoad = [];//array usado para gerenciar os recursos a ser usados 
    var bolas = [];
    var Contar = [];
    
    //===variaveis=========================================================================
    var bolafrequencia = 100;
    var bolatempo = 0;


    //SPRITES
    //CENARIO
    var campo = new Sprite(0,60,1000,800,0,0);
    sprites.push(campo);


    //PERSONAGEM
    var personagem = new Sprite(0,0,45,60,480,500);//determinar a posição do personagem na tela, e faz o corte na folha de sprite sheet
    sprites.push(personagem);

    //imagem
    var img = new Image();//cria um objeto img que recebe um novo image
    img.addEventListener('load', loadHandler, false);// associar um evento ao objeto image (passando o false como PARAMENTRO)
    img.src = "imagem/campo.png";//origem da imagem do personagem
    assestsToLoad.push(img);

    //CONTADOR DE RECURSOS
    var loadedAssets = 0;

    //ENTRADA DO DALTONANDO==============================================================
    var LEFT = 37, RIGHT = 39, ENTER = 13, SPACE = 32;

    //DIREÇẼS
    var mvLeft = mvRight = false;//recebe false a principio porque o pesonagem vai ficar parado

    //ESTADOS DO GAME (UMA FUNÇÃO QUE VAI DETERMINAR O COMPORTAMENTO OU AÇÕES DO GAME DE ACORDO COM O ESTADO QUE SERÁ AMAZENADO NA VARIAVEL)
    var LOADING = 0;
    var PLAYING = 1;
    var PAUSED = 2;
    var GOL = 3;
    var gameState = LOADING;

    //listeners
    //comando de entrada quando a tecla está sendo pressionada
    window.addEventListener('keydown', function(e){
        var key = e.keyCode;
        //alert(key); //teste para conhecer o valor armazenado em cada tecla e se a função funciona
        switch(key){
            case LEFT:
                mvLeft = true;
                break;
            case RIGHT:
                mvRight = true;
                break;
        }
    },false);//o atributo false serve para não receber comando de outras funções
    
     //comando de entrada quando eu solto a tecla
     window.addEventListener("keyup", function(e){
        var key = e.keyCode;
        //alert(key); //teste para conhecer o valor armazenado em cada tecla e se a função funciona
        switch(key){
            case LEFT:
                mvLeft = false;
                break;
            case RIGHT:
                mvRight = false;
                break;
            case ENTER:
                if(gameState !== PLAYING){
                    gameState = PLAYING;
                } else {
                    gameState = PAUSED;
                }
        }
    },false);//o atributo false serve para não receber comando de outras funções

//FUNÇÕES========================================================================================

    //essa função será disparado para cada recurso a ser corregado
    function loadHandler(){
        loadedAssets++;
            if(loadedAssets === assestsToLoad.length ){
                img.removeEventListener('load', loadHandler, false);
                //INICIA O JOGO
                gameState = PAUSED;
            }
    }
//=====================================LOOP======================================================
    function loop(){
        requestAnimationFrame(loop, cnv);
        //definir ações com base no estados do jogo
        switch(gameState){
            case LOADING:
                console.log("LOADING......");
                break;
            case PLAYING:
                update();
                break;
        }
        render();
       
    }

//==============================UPDATE===========================================================    
    function update(){
        //alert("ok para o UPDATE!");//teste da função update
        
            //verificação dos movimentos do personagem em relação ao eixo X para a ESQUERDA
            if(mvLeft && !mvRight){
                personagem.vx = -5;
            }
            //verificação dos movimentos do personagem em relação ao eixo X para a DIREITA
            if(mvRight && !mvLeft){
                personagem.vx = 5;
            }
            //PARAR o personagem
            if(!mvLeft && !mvRight){
                personagem.vx = 0;
            }

            personagem.x = Math.max(0, Math.min(cnv.width - personagem.width, personagem.x + personagem.vx));

            //incremento da variavel bolatempo
            bolatempo++;

            //criação das bolas caso o tempo se iguale a frenquecia
            if(bolatempo === bolafrequencia){
                makebola();//função responsavel pelo criação da bola
                bolatempo = 0;
                //ajustar a fenquencia da criação das bolas
                if(bolafrequencia > 2){
                    bolafrequencia--;
                }
            }

            //mover a bola para baixo
            for(var i in bolas){
                var bola = bolas[i];
                    if(bola.state !== bola.GOLL){
                        bola.y += bola.vy;
                        if(bola.state === bola.CRAZY){
                            if(bola.x > cnv.width - bola.width || bola.x  < 0){
                                bola.vx *= -1;
                            }
                            bola.x += bola.vx;
                        }
                    } 
//================================COLISÃO CONCLUIDA====================================================
                    if(bola.x < personagem.x + personagem.width &&
                        bola.x + bola.width > personagem.x &&
                        bola.y < personagem.y + personagem.height &&
                        bola.y + bola.height > personagem.y){
                        //alert("ok........");
                        removeObjects(bola, bolas);
                        removeObjects(bola, sprites);
                        i--;
//===============================CONTADOR DE PONTOS====================================================
                       for(var j = 1; j <= bolas.length; j++){
                           if(bola = i){
                               j + 1 *1;
                               p.innerHTML = j;
                              if(j >= 300){
                                  alert("PARABENS VOCÊ ALCANÇOU A PONTUAÇÃO")
                              } 
                           }
                          
                       }
                      
                    }


            }//fim da movimentação
            
            
    }
    

//==================FUNÇÃO QUE MARCA E SELECIONA AS BOLAS POR CORES===============================
    //criação de bolas
    function makebola(){
        //cria um valor aleatorio entre 0 e 21 que vem da largura do canvas sobre a largura da bola
        //e divide o canvas em 22 colunas para o posicionamento aleatorio da bola
        var bolaposicao = (
            Math.floor(Math.random() * 22)) * 70;
            console.log(bolaposicao);//teste do objeto
        var bolaLaranja = new Bola(90,0,45,60,bolaposicao,-60);
            bolaLaranja.vy = 1;
            //DINAMIZANDO A BOLA LARANJA
            if(bolaLaranja.vy = 1){
                bolaLaranja.vy = 0;
            }
            if(Math.floor(Math.random() * 11) < 7){
                bolaLaranja.state == bolaLaranja.CRAZY;
                bolaLaranja.vx = 3;
            }
            if(Math.floor(Math.random() * 11) > 7){
                bolaLaranja.state == bolaLaranja.CRAZY;
                bolaLaranja.vx = 2;
            }
            if(Math.floor(Math.random() * 11) < 5){
                bolaLaranja.state == bolaLaranja.CRAZY;
                bolaLaranja.vy = 4;
            }
            if(Math.floor(Math.random() * 11) > 5){
                bolaLaranja.vy = 2;
            }
            if(bolaLaranja.y > personagem.y){
                bolaLaranja.vy = 0;
            }
            

//=============================================================================================
        var bolaposicao2 = (
            Math.floor(Math.random() * 22)) * 60;
        var bolaAmarela = new Bola(45,0,45,60,bolaposicao2,-60);
            bolaAmarela.vy = 1;
            //DINAMIZANDO A BOLA AMARELA
            if(bolaAmarela.vy = 1){
                bolaAmarela.vy = 0;
            }
            if(Math.floor(Math.random() * 10) < 5){
                bolaAmarela.state == bolaAmarela.CRAZY;
                bolaAmarela.vx = 3;
            }
            if(Math.floor(Math.random() * 10) > 5){
                bolaAmarela.state == bolaAmarela.CRAZY;
                bolaAmarela.vx = 2;
            }
            if(Math.floor(Math.random() * 10) < 6){
                bolaAmarela.state == bolaAmarela.CRAZY;
                bolaAmarela.vy = 4;
            }
            if(Math.floor(Math.random() * 10) > 6){
                bolaAmarela.vy = 2;
            }

//=============================================================================================
        var bolaposicao3 = (
            Math.floor(Math.random()* 12)) * 70;
        var bolaRosa = new Bola(135,0,45,60,bolaposicao3,-60);
            bolaRosa.vy = 1;
            //DINAMIZANDO A BOLA ROSA
            if(bolaRosa.vy = 1){
                bolaRosa.vy = 0;
            }
            //deixar as bolas mais rapidas
            if(Math.floor(Math.random() * 20) < 11){
                bolaRosa.state == bolaRosa.CRAZY;
                bolaRosa.vx = 3;
            }
            if(Math.floor(Math.random() * 20) > 11){
                bolaRosa.state == bolaRosa.CRAZY;
                bolaRosa.vx = 2;
            }
            if(Math.floor(Math.random() * 20) < 15){
                bolaRosa.state == bolaRosa.CRAZY;
                bolaRosa.vy = 4;
            }
            if(Math.floor(Math.random() * 20) > 15){
                bolaRosa.vy = 2;
            }

//=============================================================================================
        var bolaposicao4 = (
            Math.floor(Math.random() * 17)) * 60;
        var bolaAzulForte = new Bola(180,0,45,60,bolaposicao4,-60);
            bolaAzulForte.vy = 1;
            //DINAMIZANDO A BOLA AZUL FORTE
            if(bolaAzulForte.vy = 1){
                bolaAzulForte.vy = 0;
            }
            if(Math.floor(Math.random() * 20) < 11){
                bolaAzulForte.state == bolaAzulForte.CRAZY;
                bolaAzulForte.vx = 3;
            }
            if(Math.floor(Math.random() * 20) > 11){
                bolaAzulForte.state == bolaAzulForte.CRAZY;
                bolaAzulForte.vx = 2;
            }
            if( Math.floor(Math.random() *20) < 15){
                bolaAzulForte.vy = 4;
            }
            if(Math.floor(Math.random() * 20) > 15){
                bolaAzulForte.vy = 2;
            }

//=============================================================================================
        var bolaposicao5 = (
            Math.floor(Math.random() * 15)) * 70;
        var bolaAzulFraco = new Bola(225,0,45,60,bolaposicao5,-60);
            bolaAzulFraco.vy = 1;
            //DINAMIZANDO A BOLA AZUL FRACO
            if(bolaAzulFraco.vy = 1){
                bolaAzulFraco.vy = 0;
            }
            if(Math.floor(Math.random() * 20) < 11){
                bolaAzulFraco.state == bolaAzulFraco.CRAZY;
                bolaAzulFraco.vx = 3;
            }
            if(Math.floor(Math.random() * 20) > 11){
                bolaAzulFraco.state == bolaAzulFraco.CRAZY;
                bolaAzulFraco.vx = 2;
            }
            if(Math.floor(Math.random() * 20) < 15){
                bolaAzulFraco.state == bolaAzulFraco.CRAZY;
                bolaAzulFraco.vy = 4;
            }
            if(Math.floor(Math.random() * 20) > 15){
                bolaAzulFraco.vy = 2;
            }

//=============================================================================================
        var bolaposicao6 = (
            Math.floor(Math.random() * 22)) * 60;
        var bolaVerde = new Bola(270,0,45,60,bolaposicao6,-60);
            bolaVerde.vy = 1;
            //DINAMIZANDO A BOLA VERDE
            if(bolaVerde.vy = 1){
                bolaVerde.vy = 0;
            }
            if(Math.floor(Math.random() * 20) < 11){
                bolaVerde.state == bolaVerde.CRAZY;
                bolaVerde.vx = 3;
            }
            if(Math.floor(Math.random() * 20) > 11){
                bolaVerde.state == bolaVerde.CRAZY;
                bolaVerde.vx = 2;
            }
            if(Math.floor(Math.random() * 20) < 11){
                bolaVerde.state == bolaVerde.CRAZY;
                bolaVerde.vy = 4;
            }
            if(Math.floor(Math.random() * 20) > 15){
                bolaVerde.vy = 2;
            }
        
//=============================================================================================         
            sprites.push(bolaLaranja);
            bolas.push(bolaLaranja);

            sprites.push(bolaAmarela);
            bolas.push(bolaAmarela);

            sprites.push(bolaRosa);
            bolas.push(bolaRosa);

            sprites.push(bolaAzulForte);
            bolas.push(bolaAzulForte);

            sprites.push(bolaAzulFraco);
            bolas.push(bolaAzulFraco);

            sprites.push(bolaVerde);
            bolas.push(bolaVerde);
        
    }

//==================REMOVE OS OBJETOS DO GAME=================================================
    function removeObjects(objetoToRemove, array){
        var i = array.indexOf(objetoToRemove);
        if(i !== -1){
            array.splice(i, 1);
        }
    }

//===============RENDERIZAÇÃO DO GAME=========================================================
    function render(){
       // alert("ok renderizou")//teste da funçõe render
       //limpar a tela
        contexto.clearRect(0,0,cnv.width,cnv.height);
            //renderizar os sprites
            if(sprites.length !== 0){
                for(var i in sprites){
                    var spr = sprites[i];
                    contexto.drawImage(img, 
                                       spr.sourcex, 
                                       spr.sourcey, 
                                       spr.width, 
                                       spr.height, 
                                       Math.floor(spr.x), 
                                       Math.floor(spr.y), 
                                       spr.width, 
                                       spr.height);
                }
            }
    }

    //chamando o loop
    loop();
   
}())