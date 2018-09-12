var baseUrl = 'https://kodilla.com/pl/bootcamp-api';    //podstawowy adres serwera, który wystawia nam endpointy z których będziemy korzystać przy komunikacji.
var myHeaders = {                   //Każde zapytanie musi mieć nagłówki nagłówki (myHeaders). 
    'X-Client-Id': '3431',
    'X-Auth-Token': '4b2813154812f83fdf3459e2ed4c8c8d'
};

$.ajaxSetup({       //jquery dzięki metodzie ajaxSetup() umożliwia dodanie nagłówków bez konieczności dodawania ich do każdego zapytania
    headers: myHeaders
});

$.ajax({            //zapytanie do serwera
    url: baseUrl + '/board',
    method: 'GET',
    success: function (response) {
        setupColumns(response.columns);
    }
});

//TWORZENIE KOLUMN
function setupColumns(columns) {
    columns.forEach(function (column) {
        var col = new Column(column.id, column.name);
        board.addColumn(col);
        setupCards(col, column.cards);
    });
}

//TWORZENIE KART W KOLUMNIE
function setupCards(col, cards) {
    cards.forEach(function (card) {
        var cardObj = new Card(card.id, card.name, card.bootcamp_kanban_column_id);
        col.addCard(cardObj);
    })
}

//OGÓLNA FUNKCJA - SERWER TWORZY ID NIE POTRZEBA LOSOWAĆ LICZBY
/*function randomString() {           //funkcja generuje id, które składa się z ciągu 10 losowo wybranych znaków
    var chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ';    //ciag znaków jest obiektem czy tablicą????
    var str = '';                  //tworze zmienna w której zapisze ciąg wylosowanych znaków
    for (var i = 0; i < 10; i++) {  //przy pomocy pętli wylosuje z ciągu znaków zapisanych w zmiennej chars,  10 losowo wybranych znaków
        str += chars[Math.floor(Math.random() * chars.length)]; //i dodaje je do zmiennej str
        
    }
    return str; //funkcja zwraca wartość zmiennej str
}*/
/*
//TWORZENIE NOWYCH EGZEMPLARZY KOLUMN
var todoColumn = new Column('Do zrobienia');
var doingColumn = new Column('W trakcie pracy');
var doneColumn = new Column('Zrobione');

//DODAWANIE KOLUMN DO TABLICY
board.addColumn(todoColumn);
board.addColumn(doingColumn);
board.addColumn(doneColumn);

//TWORZENIE NOWYCH EGZEMPLARZY KART
var card1 = new Card('Nowe zadanie');
var card2 = new Card('Tworzenie Kanban');
var card3 = new Card('Moduł zaliczony');

//DODAWANIE KART DO KOLUMN
todoColumn.addCard(card1);
doingColumn.addCard(card2);
doneColumn.addCard(card3);
*/