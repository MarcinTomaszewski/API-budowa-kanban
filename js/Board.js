var board = {
    name: 'Kanban Board',
    addColumn: function (column) {               //metoda stworzy kolumnę dzięki przypięciu jej ele. do ele. tablicy (#board .column-container)
        this.$element.append(column.$element);
        initSortable();
    },
    $element: $('#board .column-container')     //this.$element wskazuje na board.$element. W tej właściwości trzymany jest poprawny ele. kontenera tablicy.
};

$('.create-column').click(function () {       //podpięcie zdarzenia do przycisku tablicy o klasie create-column. Wybieramy przycis.
    var name = prompt('Wprowadź nazwę kolumny.');   //po kliknięciu uruchamia się funkcja, która poprosi o podanie nazwy kolumny, którą chcemy stworzyć.
    if (name === '') {
        alert('Podana nazwa jest nieprawidłowa. Wprowadź poprawną wartość.');
        return;
    } else if (name === null) {
        return;
    }
    $.ajax({
        url: baseUrl + '/column',
        method: 'POST',
        data: {
            name: name
        },
        success: function (response) {
            var column = new Column(response.id, name);
            board.addColumn(column);
        }
    });
   
});

function initSortable() {           //dzięki implementacji jqueryUl można skożystać z metody sortable, która umożliwia przenoszenie elementów na stronie(drag'n'drop). 
    $('.column-card-list').sortable({       //wybieram wszystkie listy kart, które maja mieć możliwość przenoszenia.
        connectWith: '.column-card-list',   //Metoda sortable przyjmuje jako parametr obiekt konfiguracyjny. ConnectWith to atrybut przy pomocy którego wybieramy liste w której będzie działać sortowanie.
        placeholder: 'card-placeholder'     //Placeholder to atrybut który trzyma nazwe klasy która pojawia sie po najechaniu na puste pole, na które chcemy upuścić przenoszony element.
    }).disableSelection();      //wyłączenie zaznaczania tekstu na kartach, które przeciągamy.
}