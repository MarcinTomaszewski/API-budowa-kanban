//KLASA KANBAN CARD
function Card(id, name) {        //odpowiedzialna za konstruowanie kart podobna w budowie do klasy Column
    var self = this;

    this.id = id;
    this.name = name || 'No name given';
    this.$element = createCard();

    function createCard() { //funkcja tworzy ele. z których będzie składała się karta. Podpina odpowiednie zdarzenia pod elementy. Buduje karty i je zwraca.
        var $card = $('<li>').addClass('card');     //tworze ele. li i dodaje mu klase
        var $cardDescription = $('<p>').addClass('card-description').text(self.name);    //tworze ele. p idod. mu klase i tekst
        var $cardDelete = $('<button>').addClass('btn-delete btn').text('x');   //tworze przycisk do usuwania karty

        $cardDelete.click(function () {      //obsługa zdarzenia click. Usunięcie karty.
            self.removeCard()
        });

        $card.append($cardDelete)           //tworzenie karty
            .append($cardDescription);
        return $card;                       //zwracanie karty
    }
}

Card.prototype = {
    removeCard: function () {
        var self = this;
        $.ajax({
            url: baseUrl + '/card/' + self.id,
            method: 'DELETE',
            success: function (response) {
                self.$element.remove();
            }
        });
    }
}