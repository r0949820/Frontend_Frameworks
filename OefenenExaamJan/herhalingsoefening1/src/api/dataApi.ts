import categoriesData from '../data/categories.ts'
import ICategory from '../models/ICategory.ts'
import IComputer from '../models/IComputer.ts'
import {faker} from '@faker-js/faker'
import IPagination from '../models/IPagination.ts'

/**
 * Geef alle categorieën terug.
 */
export const getCategories = (): ICategory[] => {
    return [...categories]
}

/**
 * Pas de checked variabele aan voor een specifieke optie binnen een specifieke categorie.
 *
 * @param categoryId Het ID van de categorie waartoe de optie behoord.
 * @param optionId Het ID van de optie.
 */
export const toggleOptionSelected = (categoryId: string, optionId: string) => {
    const option = categories
        .find(c => c.id === categoryId)
        ?.options
        .find(o => o.id === optionId)

    if (!option) {
        return
    }

    option.isChecked = !option.isChecked
    localStorage.categories = JSON.stringify(categories)
}

/**
 * Gebruik de geselecteerde filters om te bepalen welke computer wel of niet getoond moet worden.
 *
 * Deze methode is ZEER traag. In een productieomgeving is dit absoluut geen goed idee.
 * Vele optimalisaties mogelijk, maar omdat het doel hier het leren van React is, wordt voor eenvoud
 * gekozen boven performance.
 */
export const getFilteredComputers = (): IComputer[] => {
    let filtered = computers

    for (const category of categories) {
        filtered = filtered.filter(c => computerMatchesCategoryFilter(c, category.id))
    }
    return [...filtered]
}

/**
 * Gebruik de geselecteerde filters om te bepalen welke computer wel of niet getoond moet worden.
 * De data wordt opgedeeld in pagina's.
 *
 * @param pageSize De grootte van een pagina.
 * @param currentPage De pagina die opgehaald moet worden, begint bij 0.
 */
export const getFilteredComputersWithPagination = (pageSize: number, currentPage: number): IPagination<IComputer> => {
    const results = getFilteredComputers()
    return {
        data: results.slice(pageSize * currentPage, pageSize * currentPage + pageSize),
        pages: Math.ceil(results.length / pageSize),
    }
}

/**
 * Verwijder alle data en genereer de testdata opnieuw.
 */
export const reset = (): void => {
    categories = categoriesData
    computers = generateComputers(150)
    localStorage.categories = JSON.stringify(categories)
    localStorage.computers = JSON.stringify(computers)
}

/**
 * Haal de details van één computer op, op basis van het id.
 *
 * @param computerId Het id van de computer.
 */
export const getComputer = (computerId: string | undefined): IComputer | undefined => {
    return computers.find(c => c.id === computerId)
}

/**
 * Gegeven een id, haal de naam van de bijhorende categorie op.
 *
 * @param categoryId
 */
export const getCategoryName = (categoryId: string): string | undefined => {
    return categories.find(c => c.id === categoryId)?.name
}

/**
 * Haal, gegeven het id van een categorie en een optie (binnen deze categorie),
 * de naam op van de optie.
 *
 * @param categoryId Het ID van de categorie.
 * @param optionId Het ID van de geselecteerde optie.
 * @return {string} De naam van de geselecteerde optie.
 */
export const getCategoryValue = (categoryId: string, optionId: string): string | undefined => {
    return categories
        .find(c => c.id === categoryId)
        ?.options
        .find(o => o.id === optionId)
        ?.name
}

/**
 * ---------------------------------------------------------------------------------------------------------------------
 * ---------------------------------------------------------------------------------------------------------------------
 *             GEBRUIK ONDERSTAANDE CODE NIET IN JE OPLOSSING, ENKEL BOVENSTAANDE METHODES ZIJN NODIG
 * ---------------------------------------------------------------------------------------------------------------------
 * ---------------------------------------------------------------------------------------------------------------------
 */


let categories: ICategory[] = []
let computers: IComputer[] = []
const infoCategories = new Set<string>([
    'Schermdiagonaal',
    'Processor',
    'Werkgeheugen',
])


/**
 * Filter één computer op basis van de selecties voor één categorie.
 *
 * @param computer De computer voor welke gekeken moet worden of deze aan de voorwaarden voldoet.
 * @param categoryId het ID van de categorie voor welke de controle uitgevoerd moet worden.
 * @returns True als de computer voldoet aan de keuzen die binnen de categorie gemaakt zijn.
 */
const computerMatchesCategoryFilter = (computer: IComputer, categoryId: string): boolean => {
    const category = getCategory(categoryId)

    if (!category) {
        return false
    }

    // Als geen opties geselecteerd zijn voldoet elke laptop.
    const selectedOptions = category.options.filter(o => o.isChecked)
    if (selectedOptions.length === 0) return true

    // Als opties geselecteerd zijn mogen enkel de laptops die aan minstens één van de opties voldoen overblijven.
    return selectedOptions.find(o => o.id === computer.options[categoryId]) !== undefined
}


/**
 * Geef één categorie terug.
 * @param categoryId Het id waaraan de categorie moet voldoen.
 */
const getCategory = (categoryId: string): ICategory | undefined => {
    return categories.find(c => c.id === categoryId)
}

/**
 * Genereer een aantal computers.

 * @param nb Het aantal computer om te generen.
 */
const generateComputers = (nb = 200): IComputer[] => {
    const computers = []

    for (let i = 0; i < nb; i++) {
        const computer: IComputer = {options: {}, id: '', info: '', name: '', price: '', description: ''}
        const info = []

        for (const c of categories) {
            const chosen = c.options[Math.floor(Math.random() * c.options.length)]
            computer.options[c.id] = chosen.id

            if (infoCategories.has(c.name)) {
                info.push(chosen.name)
            }

            if (c.name === 'Merk') {
                computer.name = `${chosen.name} ${faker.string.alphanumeric(10)}`
            }
        }
        computer.price = faker.finance.amount({
            min: 300,
            max: 3000,
            dec: 2,
        })
        computer.info = info.join(' | ')
        computer.id = faker.string.uuid()
        computer.description = faker.lorem.paragraphs(2)
        computers.push(computer)
    }
    return computers
}

if (localStorage.categories) {
    categories = JSON.parse(localStorage.categories) as ICategory[]
} else {
    categories = categoriesData
    localStorage.categories = JSON.stringify(categories)
}

if (localStorage.computers) {
    computers = JSON.parse(localStorage.computers) as IComputer[]
} else {
    computers = generateComputers(150)
    localStorage.computers = JSON.stringify(computers)
}

generateComputers(1)
