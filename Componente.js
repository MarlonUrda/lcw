class Dialogo extends HTMLDialogElement{
    constructor(propiedades){
        super();

        if(propiedades !== undefined){
            this.objeto = {};
            this.aplicarPropiedades(propiedades);
        }

        this.style.flexDirection = 'column';
    }

    #iteraryAsignar(objeto, target){
        Object.keys(obj).forEach(llave => {
            if(typeof objeto[llave] === 'object' && objeto[llave] !== null){
                if(llave === "style"){
                    this.aplicarPropiedades(objeto[llave], this.style)
                    return
                }
                this.#iteraryAsignar(objeto[llave], target[llave]);
            }
            target[llave] = obj[llave];
        })
    }

    agregarFila(elementos, style){
        const fila = document.createElement('div');
        fila.style.display = 'flex';
        this.aplicarEstilos(style, fila.style)
        elementos.forEach(elemento => {
            fila.appendChild(elemento)
        });

        this.appendChild(fila);

    }

    borrarFila(numero_fila){
        this.removeChild(this.children[numero_fila])
    }

    borrarElemento(numero_fila, element){
        this.children[numero_fila].removeChild(element)
    }

    limpiarTodo(){
        this.innerHTML = '';
    }

    agregarBody(){
        document.body.appendChild(this)
    }

    obj(){return this.objeto}

    mostrar(){
        super.show()
        this.style.display = 'flex'
    }

    mostrarModal(){
        super.showModal()
        this.style.display = 'flex'
        this.style.flexDirection = 'column'
    }

    ocultar(){
        super.close()
        this.style.display = 'none'
    }

    aplicarEstilos(styles, target){
        for(const llave in styles){
            target[llave] = styles[llave]
        }
    }

    aplicarPropiedades(propiedades){
        this.#iteraryAsignar(propiedades, this);
        this.objeto = Object.assign({}, this.objeto, propiedades)
    }

}

customElements.define("gd-tag", Dialogo, {extends: 'dialog'});

const grid = new Dialogo({hola : 'Profe'})

const titulo = document.createElement('h1')
titulo.innerHTML = 'Hola Profe'

const titulo_adios = document.createElement('h1')
titulo_adios.innerHTML = 'Adios Profe'

const saludo = document.createElement('h3')
saludo.innerHTML = 'Buenos dias profe!'

grid.agregarFila([titulo, titulo_adios]), {gap: '15px', justifyContent: 'space-between', border: '2px solid red'}
grid.agregarFila([saludo], {})

const botoncito = document.createElement('button')
botoncito.innerHTML = 'Presioname'

grid.agregarFila([botoncito], {justifyContent: 'center'})

grid.agregarBody()
grid.mostrarModal()

botoncito.addEventListener("click", () =>{
    grid.ocultar()
})

console.log(grid.obj())