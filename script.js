/* TODO: inserite il codice JavaScript necessario a completare il MHW! */

const boxes = document.querySelectorAll('.choice-grid div');
for(const box of boxes){
    box.addEventListener('click', seleziona);
}

let casella_sel = {};
console.log(casella_sel)
const risultato = document.querySelector('#result');

function seleziona(event){
  const box_attuale = event.currentTarget;
  box_attuale.classList.remove('boxnonselezionato');
  box_attuale.classList.add('boxselezionato');
  const checkbox = box_attuale.querySelector('.checkbox');
  checkbox.src='images/checked.png'
  const box_non_selezionato = document.querySelectorAll('.choice-grid div');
  for(const n_box of box_non_selezionato){
      if(n_box.dataset.questionId == box_attuale.dataset.questionId){
          if(n_box != box_attuale){
              n_box.classList.remove('boxselezionato');
              n_box.classList.add('boxnonselezionato');
              const unchecked = n_box.querySelector('.checkbox');
              unchecked.src='images/unchecked.png';
            }
        }   
    }
    if(box_attuale.dataset.questionId == "one"){
        casella_sel.first = box_attuale.dataset.choiceId;
        console.log(casella_sel)
    } else if(box_attuale.dataset.questionId == "two"){
        casella_sel.second = box_attuale.dataset.choiceId;
    } else{
        casella_sel.third = box_attuale.dataset.choiceId;
    }

    if(Object.keys(casella_sel).length === 3){
        const boxes = document.querySelectorAll('.choice-grid div');
        for(const box of boxes){
            box.removeEventListener('click', seleziona);
        }
    }
    personality();
}

function personality(){
  let index;
  if(casella_sel.first === casella_sel.second || casella_sel.first === casella_sel.third){
      index= casella_sel.first;
      console.log(index)
      finale (RESULTS_MAP[index].title, RESULTS_MAP[index].contents)
    }
    else if(casella_sel.second === casella_sel.third) {
        index = casella_sel.second;
        console.log(index)
        finale (RESULTS_MAP[index].title, RESULTS_MAP[index].contents)
    }
    else {
        index = casella_sel.first;
        console.log(index);  
        finale (RESULTS_MAP[index].title, RESULTS_MAP[index].contents)
    }
}

function finale (titolo, descrizione){
    let titol = risultato.querySelector('#titolo');
    let paragrafo = risultato.querySelector('#paragrafo');
    let button = risultato.querySelector('button');
    risultato.classList.remove('hidden');
    titol.textContent = titolo;
    paragrafo.textContent = descrizione;
    button.addEventListener('click', restart);
  }
  

function restart(){
    const boxes = document.querySelectorAll('.choice-grid div');
    for(const box of boxes){
        box.addEventListener('click', seleziona);
        box.classList.remove('boxselezionato');
        box.classList.remove('boxnonselezionato');

        const img = box.querySelector('.checkbox');
        img.src='images/unchecked.png'
    }
    const result = document.querySelector('#result');
    result.classList.add('hidden');
    casella_sel = {};
}




