const SmallDogsCaninoFelizWeekDay = 20;
const BigDogsCaninoFelizWeekDay = 40;
const SmallDogsCaninoFelizWeekend = 1.2 * SmallDogsCaninoFelizWeekDay;
const BigDogsCaninoFelizWeekend = 1.2 * BigDogsCaninoFelizWeekDay;

const SmallDogsVaiRexWeekDay = 15;
const BigDogsVaiRexWeekDay = 50;
const SmallDogsVaiRexWeekend = 20;
const BigDogsVaiRexWeekend = 55;

const SmallDogsChowChowgas = 30;
const BigDogsChowChowgas = 45;

interface DistanceMap {
    [key: string]: number;
    CaninoFeliz: number;
    VaiRex: number;
    ChowChowgas: number;
}

const distance: DistanceMap = {
    CaninoFeliz: 2000,
    VaiRex: 1700,
    ChowChowgas: 800,
};
interface PricesMap {
    [key: string]: number;
    CaninoFeliz: number;
    VaiRex: number;
    ChowChowgas: number;
}

export const calculateBestPriceByDay = (dayOfTheWeek: number, smallDogs: number, bigDogs: number): string => { 
    const isWeekend = dayOfTheWeek === 0 || dayOfTheWeek === 6;
    return calculateBestPrice(smallDogs, bigDogs, isWeekend);
}

const calculateBestPrice = (smallDogs: number, bigDogs: number, isWeekend: boolean): string => {
    let bathPrices = {
        smallCaninoFeliz: isWeekend ? SmallDogsCaninoFelizWeekend : SmallDogsCaninoFelizWeekDay,
        bigCaninoFeliz: isWeekend ? BigDogsCaninoFelizWeekend : BigDogsCaninoFelizWeekDay,
        smallVaiRex: isWeekend ? SmallDogsVaiRexWeekend : SmallDogsVaiRexWeekDay,
        bigVaiRex: isWeekend ? BigDogsVaiRexWeekend : BigDogsVaiRexWeekDay,
    }

    const prices: PricesMap = {
        CaninoFeliz: calculatePrice(smallDogs, bigDogs, bathPrices.smallCaninoFeliz, bathPrices.bigCaninoFeliz),
        VaiRex: calculatePrice(smallDogs, bigDogs, bathPrices.smallVaiRex, bathPrices.bigVaiRex),
        ChowChowgas: calculatePrice(smallDogs, bigDogs, SmallDogsChowChowgas, BigDogsChowChowgas)
    }

    const lowestPrice = Math.min(...Object.values(prices));

    const servicesWithLowestPrice = Object.entries(prices)
        .filter(([service, price]) => price === lowestPrice)
        .map(([service]) => service);

    let bestService: string = "";
    if (servicesWithLowestPrice.length === 1) {
        bestService = servicesWithLowestPrice[0];
    } else {
        bestService = servicesWithLowestPrice.reduce((prev, current) => {
            return distance[prev] < distance[current] ? prev : current;
        });
    }

    return `${bestService}, ${prices[bestService]}`;
}

const calculatePrice = (smallDogs: number, bigDogs: number, priceForSmallDogs: number, priceForBigDogs: number): number => {
    return (smallDogs * priceForSmallDogs) + (bigDogs * priceForBigDogs);
}