//classe objeto
var Sprite = function(sourcex, sourcey, width, height, x, y){//paramentros 
    this.sourcex = sourcex;//posição em x para capitura de imagem em x
    this.sourcey = sourcey;//posição em y para capitura de imagem em y
    this.width = width;//largura
    this.height = height;//altura
    this.x = x;//posição em x para ser exibido na tela
    this.y = y;//posição em y para ser exibido na tela
    this.vx = 0;//velocidade de deslocamento em x
    this.vy = 0; //velocidade de deslocamento em y

}

//METODOS DA CLASSE

//essa função vai retornar o ponto central do Sprite que é determinado pelo ponto inicial onde está desenhado no eixo y mais a largura dele
Sprite.prototype.centerx = function(){
    return this.x + (this.width/2);
}

//essa função vai retornar o ponto central do Sprite na altura
Sprite.prototype.centery = function(){
    return this.y + (this.height/2);
}

//a metade da altura
Sprite.prototype.halfWidth = function(){
    return this.width/2;
}

//a metade da largura
Sprite.prototype.halfHeight = function(){
    return this.height/2;
}

//criar henrança 
//criar class para bola
class Bola {
    constructor(sourcex, sourcey, width, height, x, y) {
        Sprite.call(this, sourcex, sourcey, width, height, x, y);
        this.NORMAL = 1;
        this.GOLL = 2; //EXPLODED
        this.CRAZY = 3; //referente a movimento diferenciado a ser implementado
        this.state = this.NORMAL;
        this.mvstyle = this.NORMAL;
    }
}

//para herdar o mesmo protopipo do Sprite
Bola.prototype = Object.create(Sprite.prototype);//o prototipo de onde está herdado a função da bola será o mesmo do Sprite

//METODO EXCLUSIVO DA BOLA
/*bola.prototype.GOLL = function(){
    //implementar o gol que é quando a bola entrar no gol

}*/