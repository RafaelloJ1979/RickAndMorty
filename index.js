console.log('Rick and Morty')

let page = 1
let info = null
//  1 funkcja async pobierająca dane z api
async function main() {
    const $buttonPrev = document.getElementById('prev')
    const $buttonNext = document.getElementById('next')
    console.log('info before',info)
        // 3 buton addEventListener

    $buttonPrev.addEventListener('click',async (el)=>{
        if(info.prev === null){
            alert('Jesteś na pierwszej stronie')
            return
        }
        page--
        // page = page -1
        // page -= 1
        // --page

        const characters = await pobierzPostaci()
        info = characters.info
        const $listaPostaci = document.getElementById('lista')
        $listaPostaci.innerHTML = ''

        characters.results.forEach(stworzKartePostaci)
        

        // console.log('info click',info)
        // el.target.innerHTML = "kliknołeś"  //  zmienia tekst buttona
    })

    $buttonNext.addEventListener('click',async (el)=>{
        if(info.next === null){
            alert('Jesteś na ostatniej stronie')
            return
        }
        page++
   
        const characters = await pobierzPostaci()
        info = characters.info
        const $listaPostaci = document.getElementById('lista')
        $listaPostaci.innerHTML = ''
        characters.results.forEach(stworzKartePostaci)
        

        // console.log('info click',info)
        // el.target.innerHTML = "kliknołeś"  //  zmienia tekst buttona
    })

    async function pobierzPostaci() {
        const data = await fetch(`https://rickandmortyapi.com/api/character?page=${page}`)
        const response = await data.json()
        return response
    }
    
    //  2 tworzymy funkcje która tworzy karty

    function stworzKartePostaci(data, index, array) {
        const $card = document.createElement('div')
        $card.classList = 'card'

        const $img = document.createElement('img')
        $img.src = data.image
        $img.alt = name

        $card.appendChild($img) // wkladamy $img do $card

        const $container = document.createElement('div')
        $container.classList = 'container'

        const $name = document.createElement('h4')
        $name.innerHTML = data.name

        const $species = document.createElement('p')
        $species.innerHTML = data.species

        $container.appendChild($name)
        $container.appendChild($species)
        $card.appendChild($container)

        const $lista = document.getElementById('lista')
        $lista.appendChild($card)
    }
    //  przekazujemy do zmiennej characters fn pobierzPostaci
    const characters = await pobierzPostaci()
    info =characters.info
    //  łapiemy div w html i wypisujemy w html
    const $listaPostaci = document.getElementById('liczba-postaci')
    $listaPostaci.innerHTML = characters.info.count
    // console.log('char', characters)

    // 2 iterujemy po danych które zeszły z beckhendu i mamy je w zmiennej characters 
    console.log('char',characters)
    characters.results.forEach(stworzKartePostaci)
    // zapisujemy dane z characters do info 
}
main()

