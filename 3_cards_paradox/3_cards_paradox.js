var cards = [1, 2, 3],
    success = 0,
    iterations = 100;

for (var i = 0; i < iterations; i++) {
    var prize = Math.floor(Math.random() * 3 + 1),   
        picked = Math.floor(Math.random() * 3 + 1),
        suggest = Math.floor(Math.random() * 3 + 1),
        opened;
    
        while (suggest == prize || suggest == picked) {
            suggest = Math.floor(Math.random() * 3 + 1);
        }
        for (var c = 0; c < cards.length; c++) {
            if (cards[c] != suggest && cards[c] != picked) {
                opened = cards[c];
            }
        }
        if (prize == opened) {
            success++;
        }
}

console.log((success / iterations) * 100);