class Item {
  constructor(name, sellIn, quality){
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

const calculQualityItemNormal = ({ sellIn, quality }) => {
  const isQualityBiggerThan0 = quality > 0;
  const areNoMoreDaysToSell = sellIn < 0;

  if (isQualityBiggerThan0 && areNoMoreDaysToSell) return -2;
  if (isQualityBiggerThan0) return -1;
  if (quality <= 0) return 0;
  return 0;
};

const calculQualityBackstage = ({ sellIn, quality }) => {
  const tenDaysOrLessToSell = sellIn <= 10;
  const fiveDaysOrLessToSell = sellIn <= 5;
  const areNoMoreDaysToSell = sellIn < 0;

  if (areNoMoreDaysToSell) return -quality;
  if (fiveDaysOrLessToSell) return +3;
  if (tenDaysOrLessToSell) return +2;
  if (quality >= 50) return 0;
  return +1;
};

const calculateSellinDifference = ({ sellIn, name }) => {
  const isSulfuras = name == "Sulfuras, Hand of Ragnaros";
  return !isSulfuras ? -1 : 0;
};

const calculateQualityDifference = item => {
  const isSulfuras = item.name == "Sulfuras, Hand of Ragnaros";
  const isAgedBrie = item.name == "Aged Brie";
  const isBackstagePasses = item.name == "Backstage passes to a TAFKAL80ETC concert";
  const isConjuredItem = item.name.includes("Conjured");  
  const isQualityLessThan50 = item.quality < 50;
  const isNormalItem =
    !isAgedBrie && !isBackstagePasses && !isSulfuras && !isConjuredItem;

  if (isNormalItem) return calculQualityItemNormal(item);
  if (isBackstagePasses) return calculQualityBackstage(item);
  if (isAgedBrie && isQualityLessThan50) return +1;
  if (isConjuredItem) return calculQualityItemNormal(item) * 2;

  return 0;
};

class Shop {
  constructor(items = []) {
    this.items = items;
  }

  updateQuality() {
    return this.items.map(item => {
      item.sellIn += calculateSellinDifference(item);
      item.quality += calculateQualityDifference(item);

      return item;
    });
  }
}
// class Shop {
//   constructor(items=[]){
//     this.items = items;
//   }
//   updateQuality() {
//     for (var i = 0; i < this.items.length; i++) {
//       if (this.items[i].name != 'Aged Brie' && this.items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
//         if (this.items[i].quality > 0) {
//           if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
//             this.items[i].quality = this.items[i].quality - 1;
//           }
//         }
//       } else {
//         if (this.items[i].quality < 50) {
//           this.items[i].quality = this.items[i].quality + 1;
//           if (this.items[i].name == 'Backstage passes to a TAFKAL80ETC concert') {
//             if (this.items[i].sellIn < 11) {
//               if (this.items[i].quality < 50) {
//                 this.items[i].quality = this.items[i].quality + 1;
//               }
//             }
//             if (this.items[i].sellIn < 6) {
//               if (this.items[i].quality < 50) {
//                 this.items[i].quality = this.items[i].quality + 1;
//               }
//             }
//           }
//         }
//       }
//       if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
//         this.items[i].sellIn = this.items[i].sellIn - 1;
//       }
//       if (this.items[i].sellIn < 0) {
//         if (this.items[i].name != 'Aged Brie') {
//           if (this.items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
//             if (this.items[i].quality > 0) {
//               if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
//                 this.items[i].quality = this.items[i].quality - 1;
//               }
//             }
//           } else {
//             this.items[i].quality = this.items[i].quality - this.items[i].quality;
//           }
//         } else {
//           if (this.items[i].quality < 50) {
//             this.items[i].quality = this.items[i].quality + 1;
//           }
//         }
//       }
//     }

//     return this.items;
//   }
// }
module.exports = {
  Item,
  Shop
}
