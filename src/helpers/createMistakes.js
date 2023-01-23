import {faker} from "@faker-js/faker";
import {swedish, russian, norwegian} from "alphabets/src/main";
export const LANGS = {
    ru: russian,
    sv: swedish,
    nb_NO: norwegian,
}

const userSchema = {
    id: [removeSymbols, addSymbolsNumeric, switchSymbols],
    name: [removeSymbols, addSymbols, switchSymbols],
    email: [removeSymbols, addSymbolsLatin, switchSymbols],
    address: [removeSymbols, addSymbols, switchSymbols],
    phoneNumber: [removeSymbols, addSymbolsNumeric, switchSymbols]
}

function runTimes(func, n, userUid, seedValue) {
    let num = n
    let i = 0
    while (num > 0) {
        const probability = Math.min(1, num)
        if (probability !== 1) {
            faker.seed(createSeed(userUid, n, num, seedValue))
            faker.helpers.maybe(() => func(i), {probability})
        } else func(i)
        num = num - probability
        i++;
    }
}

export function createMistakes(p, arr, seedValue)  {
    return arr.map(user => {
        const newUser = {...user, personalInfo: {...user.personalInfoOrig}, mistakes: {}}
        runTimes((index) => {
            const seed = createSeed(user.uid, p, index, seedValue);
            faker.seed(seed)
            const randomKey = faker.helpers.objectKey(user.personalInfo)
            const prevValue = newUser.personalInfo[randomKey]
            const randSymbolIndex = randomNumberUpTo(prevValue.length, seed ? [...seed, 1] : seed)
            const mistakes = userSchema[randomKey]
            const mi = randomNumberUpTo(mistakes.length, seed ? [...seed, 2] : seed)
            const value = mistakes[mi](prevValue, randSymbolIndex, seed)
            newUser.mistakes[randomKey] = newUser.mistakes[randomKey] || []
            newUser.mistakes[randomKey].push([prevValue, value, mistakes[mi]])
            newUser.mistakes[mistakes[mi].name] = newUser.mistakes[mistakes[mi].name] || 0
            newUser.mistakes[mistakes[mi].name] += 1
            newUser.personalInfo[randomKey] = value
        }, p, user.uid, seedValue)
        return newUser
    })
}

function createSeed(userUid, prob, num, seed) {
    if (!seed) return undefined
    return [Number(userUid), Number(String(prob).replace('.', '')), Number(num), Number(seed)]
}

function randomNumberUpTo(number, seed) {
    if (!number) return 0
    faker.seed(seed)
    return faker.datatype.number({min: 0, max: number - 1});
}

function addSymbols(str, startIndex, seed) {
    if (!str) return ''
    faker.seed(seed)
    return str.substring(0, startIndex) + faker.helpers.arrayElement(LANGS[faker.locale]) + str.substring(startIndex);
}

function addSymbolsLatin(str, startIndex, seed) {
    if (!str) return ''
    faker.seed(seed)
    return str.substring(0, startIndex) + faker.random.alpha() + str.substring(startIndex);
}

function addSymbolsNumeric(str, startIndex, seed) {
    if (!str) return ''
    faker.seed(seed)
    return str.substring(0, startIndex) + faker.random.numeric(1, {bannedDigits: [str[startIndex]]}) + str.substring(startIndex);
}

function switchSymbols(str, startIndex) {
    const arr = str.split('')
    if (startIndex === str.length - 1) {
        arr[startIndex] = str[startIndex - 1]
        arr[startIndex - 1] = str[startIndex]
        return str
    }
    arr[startIndex] = str[startIndex + 1]
    arr[startIndex + 1] = str[startIndex]
    return arr.join('')
}

function removeSymbols(str, startIndex) {
    if (!str) return ''
    else if(str.length === 1) return str
    else return str.substring(0, startIndex) + str.substring(startIndex + 1);
}
