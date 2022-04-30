
function getRandomQuote(){

    const quotes =[
        "I wonder if BEER thinks about me too...",
        "Save water, drink BEER!",
        "BEER is living proof that God loves us and wants us to be happy",
        "There is always time for another BEER!",
        "BEER is good, but BEERS are better",
        "Today your glass BEER isn’t half empty but half full"
    ]

    return quotes[ Math.floor( Math.random() * quotes.length) ];
}

export default getRandomQuote;