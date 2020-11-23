function colisao(sprit1, sprit2){
    var hit = false;
    //calcular a instancia entre o centro dos sprites
    var vetorx = sprit1.centerx() - sprit2.centerx();
    var vetory = sprit1.centery() - sprit2.centery();

    //armazenar as somas das metades dos sprites altura e largura
    var somaHalfWidth = sprit1.halfWidth() + sprit2.halfWidth();
    var somaHalfHeight = sprit1.halfHeight() + sprit2.halfHeight();

    //verificar se holve a colisao
    if(Math.abs(vetorx) < somaHalfWidth && Math.abs(vetory) < somaHalfHeight){
        hit =  true;

    }
    return hit;
}