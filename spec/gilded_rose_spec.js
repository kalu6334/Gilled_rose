var {Shop, Item} = require('../src/gilded_rose.js');
describe("Gilded Rose", function() {

  it("should foo", function() {
    const gildedRose = new Shop([ new Item("foo", 0, 0) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toEqual("foo");
  });


  it("Aged Brie qualite augumente quand le jour diminue", function() {
    const gildedRose = new Shop([ new Item("Aged Brie", 20, 2) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toEqual(19);
    expect(items[0].quality).toEqual(3);
  });
  it("Aged Brie qualite augumente pas plus de 50", function() {
    const gildedRose = new Shop([ new Item("Aged Brie", 20, 50) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toEqual(19);
    expect(items[0].quality).toEqual(50);
  });
  

  it("Backstage passes qualite augumente pas plus de 50", function() {
    const gildedRose = new Shop([ new Item("Backstage passes to a TAFKAL80ETC concert", 15, 50) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toEqual(14);
    expect(items[0].quality).toEqual(50);
  });
  it("Backstage passes qualite augumente +1 quand jour diminue", function() {
    const gildedRose = new Shop([ new Item("Backstage passes to a TAFKAL80ETC concert", 15, 2) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toEqual(14);
    expect(items[0].quality).toEqual(3);
  });
  it("Backstage passes qualite augumente +2 a 10j ou moins", function() {
    const gildedRose = new Shop([ new Item("Backstage passes to a TAFKAL80ETC concert", 10, 2) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(4);
  });
  it("Backstage passes qualite augumente +3 a 5j ou moins", function() {
    const gildedRose = new Shop([ new Item("Backstage passes to a TAFKAL80ETC concert", 5, 2) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(5);
  });
  it("Backstage passes qualite tombe a 0 apres le concert", function() {
    const gildedRose = new Shop([ new Item("Backstage passes to a TAFKAL80ETC concert", 0, 2) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(0);
  });


  it("Sulfuras ne perd jamais en qualité", function() {
    const gildedRose = new Shop([ new Item("Sulfuras, Hand of Ragnaros", 4, 80) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(80);
  });
  it("Sulfuras ne perd jamais en durée", function() {
    const gildedRose = new Shop([ new Item("Sulfuras, Hand of Ragnaros", 4, 80) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toEqual(4);
  });

  it("+5 Dexterity Vest qualite se degrade quand le jour diminue", function() {
    const gildedRose = new Shop([ new Item("+5 Dexterity Vest", 20, 2) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toEqual(19);
    expect(items[0].quality).toEqual(1);
  });
  it("+5 Dexterity Vest qualite se degrade 2* plus rapide apres la DDP", function() {
    const gildedRose = new Shop([ new Item("+5 Dexterity Vest", 0, 10) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toEqual(-1);
    expect(items[0].quality).toEqual(8);
  });
  it("+5 Dexterity Vest qualite ne peux pas etre negatif", function() {
    const gildedRose = new Shop([ new Item("+5 Dexterity Vest", 0, 0) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toEqual(-1);
    expect(items[0].quality).toEqual(0);
  });

  it("Elixir of the Mongoose qualite se degrade quand le jour diminue", function() {
    const gildedRose = new Shop([ new Item("Elixir of the Mongoose", 20, 2) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toEqual(19);
    expect(items[0].quality).toEqual(1);
  });
  it("Elixir of the Mongoose qualite se degrade 2* plus rapide apres la DDP", function() {
    const gildedRose = new Shop([ new Item("Elixir of the Mongoose", 0, 10) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toEqual(-1);
    expect(items[0].quality).toEqual(8);
  });
  it("Elixir of the Mongoose qualite ne peux pas etre negatif", function() {
    const gildedRose = new Shop([ new Item("Elixir of the Mongoose", 0, 0) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toEqual(-1);
    expect(items[0].quality).toEqual(0);
  });

  it("Conjured Mana Cake qualite ce degrade 2* plus vite ", function() {
    const gildedRose = new Shop([ new Item("Conjured Mana Cake", 5, 10) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toEqual(4);
    expect(items[0].quality).toEqual(8);
  });
});
