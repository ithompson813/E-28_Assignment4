class Card
{
    constructor(name, value, suit, image)
    {
        this.name = name;
        this.value = value;
        this.suit = suit;
        this.image = image;
    }

    // show method shows cards in the player's hand in html
    show(id)
    {
        let div = document.createElement("div");
        div.style = "display: flex;"
        let write_name = document.createElement("p");
        let image = document.createElement("img");
        image.src = this.image;
        write_name.innerText = (this.name + " of " + this.suit);
        div.append(image);
        div.append(write_name);
        document.getElementById(id).append(div);
    }
}

// the hand class represents the two players
class Hand
{

    constructor(name)
    {
        this.name = name;
        this.cards = new Array();
        this.hand_value = 0;
    }


    /*  the add card function drives most the game's logic
        it picks a random card from the deck, removes it from the deck and adds it to the player's hand
        the card is shown in the html on the page and the value of the card is added to the player cumulative total
        this function also checks if the player has busted by going beyond 21 points    */ 
    add_card()
    {

        // do not allow the bet to be edited once the game has begun
        document.getElementById("bet").disabled = true;
        current_bet = parseFloat(document.getElementById("bet").value);

        // pick random card
        random_number = Math.floor(Math.random() * deck.length);
        deck[random_number].show(this.name + "_hand");

        // update hand and deck
        this.hand_value += deck[random_number].value;
        this.cards.push(deck[random_number]);
        deck.splice(random_number, 1);

        // check for bust
        if (this.hand_value > 21)
        {
            this.hand_value = "BUST!";
        } 

        document.getElementById(this.name+"_current_total").innerHTML = (this.name + " hand value: " + this.hand_value);
    }

    // Display winning message & update htmnl to disable continued play until the game is reset
    win_game()
    {
        document.getElementById("info").prepend(this.name + " wins!");
        document.getElementById("info").style = "display: block;";
        document.getElementById("reset").style = "display: show;";
        document.getElementById("hit").style = "display: none;";
        document.getElementById("pass").style = "display: none;";

        if (this.name == "User"){
            money += current_bet;
        } else {
            money -= current_bet;
        }

        document.getElementById("money").innerText = ("Money: $" + money);

    }

}


// the create deck function returns an array of card objects that make up a standard 52-card deck
function create_deck(){

    // card attributes
    let suits = {"Clubs": "club.png", "Diamonds": "diamond.png", "Hearts": "heart.png", "Spades": "spade.png"};
    let names = ["Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Jack", "Queen", "King", "Ace"];
    let values = [2,3,4,5,6,7,8,9,10,11,12,13,14];
    keys = Object.keys(suits);
    let deck = [];

    // create a new card of each value in each suit
    Object.keys(suits).forEach((suit)=>{
        for (let i = 0; i < 13; i++)
        {
            new_card = new Card(names[i], values[i], suit, suits[suit]);
            deck.push(new_card);
        }

    })

    // return deck array of card objects
    return deck;
}

function reset_game(){

    // reset game variables
    deck = create_deck();
    user = new Hand("User");
    dealer = new Hand("Dealer");
    players = [user, dealer];

    // reset HTML display
    document.getElementById("info").innerHTML = "";
    document.getElementById("info").style = "display: none;"
    removeChildren(document.getElementById("User_hand"));
    removeChildren(document.getElementById("Dealer_hand"));
    document.getElementById("reset").style = "display: none;";
    document.getElementById("hit").style = "display: show;";
    document.getElementById("pass").style = "display: none;";
    document.getElementById("bet").disabled = false;
    document.getElementById("bet").value = 0;
    document.getElementById("money").innerText = "Money: $" + money;

    players.forEach((player) => {
        document.getElementById(player.name+"_current_total").innerHTML = (player.name + " hand value: " + user.hand_value);
    })
}

// betting variables
money = 100;
current_bet = 0;

document.addEventListener('DOMContentLoaded', () => {

    // ready page for play;
    reset_game();

    // hit button calls the user's hit logic
    document.getElementById("hit").addEventListener("click", () => {

        document.getElementById("pass").style = "display: show;";
        user.add_card();  

        // if user busts, trigger dealer win condition
        if (user.hand_value == "BUST!") 
        {
            dealer.win_game();
        }

    })

    // this function represents the dealers logic
    document.getElementById("pass").addEventListener("click", () => {

        // the dealer will continue to hit until they have either beaten the user or busted themselves.
        while (dealer.hand_value < user.hand_value)
        {

            dealer.add_card();

            // trigger correct player win condition depending on outcome
            if (dealer.hand_value == "BUST!") 
            {
                user.win_game();
            } else if (dealer.hand_value >= user.hand_value)
            {
                dealer.win_game();
            }
        }

    })

    // reset button will call the game reset function
    document.getElementById("reset").addEventListener("click", () => reset_game());
})


// quick helper funciton to aid in reseting html elements
function removeChildren(parent) 
{
    while (parent.firstChild) 
    {
        random_number = Math.floor(Math.random() * deck.length);
        parent.removeChild(parent.firstChild);
    }
}