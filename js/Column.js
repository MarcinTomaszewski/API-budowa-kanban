//KLASA KANBAN COLUMN
function Column(id, name) {     //nazwa klasy z dużej litery. Dodanie nowego parametru id.
    var self = this;            //zmienna potrzebna by nie zgubić kontekstu przy zagnieżdzaniu funkcji

    this.id = id;               //randomString(); funkcja już nie potrzebna id nadaje serwer
    this.name = name || 'No name given';           //przypisuje właściwości name wartość podanego argumentu name. Dodanie wartości domyślnej dla nazwy kolumny.
    this.$element = createColumn();

    function createColumn() {   //funkcja tworzy elementy, podpina zdarzenia, konstruuje kolumny i zwraca je.
        //znak dolara oznacza ze zmienna trzyma ele. jquery

        var $column = $('<div>').addClass('column');                //tworze ele. div z klasa column              
        var $columnTitle = $('<h2>').addClass('column-title').text(self.name);  //tworze ele. h2 i dodaje klase column-title i dodaje tekst przy pomocy metody text. Tekst znajduje sie we właściwości name.
        var $columnCardList = $('<ul>').addClass('column-card-list');   //tworze liste na kartki i dodaje klasę column-card-list
        var $columnDelete = $('<button>').addClass('btn-delete btn').text('x');     //dodaje przyciski za pomocą których dodaje i usuwam karty z listy
        var $columnAddCard = $('<button>').addClass('add-card btn').text('Dodaj kartę');

        $columnDelete.click(function () {   //jeśli wystapi zdarzenie click ....
            self.removeColumn();
        });

        $columnAddCard.click(function () {      //jeśli wystąpi zdarzenie click...
            var name = prompt("Wprowadź nazwę karty.");
            if (name === '') {
                alert('Podana nazwa jest nieprawidłowa. Wprowadź poprawną wartość.');
                return;
            } else if (name === null) {
                return;
            }
            $.ajax({
                url: baseUrl + '/card',
                method: 'POST',
                data: {
                    name: name,
                    bootcamp_kanban_column_id: self.id
                },
                success: function () {
                    var card = new Card(id, name);
                    self.addCard(card);
                }
            });
                    
        });

        $column.append($columnTitle)        //budowa elementu $column
            .append($columnDelete)
            .append($columnAddCard)
            .append($columnCardList);
        return $column;     //zwrócenie przez funkcje ele. $column
    }
}

Column.prototype = {
    addCard: function (card) {       //metoda przyjmuje parametr card który dodany zostanie do kolumny
        this.$element.children('ul').append(card.$element); //pobieram wszystkie dzieci ul elementu o klasie column i podpinamy do niej karte
    },
    removeColumn: function () {
        var self = this;
        $.ajax({
            url: baseUrl + '/column/' + self.id,
            method: 'DELETE',
            success: function (response) {
                self.$element.remove();
            }
        });
    }
}