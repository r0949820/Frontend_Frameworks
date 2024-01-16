interface IOption {
    name: string                    // De naam van de optie.
    id: string                      // Het ID van de optie.
    isChecked: boolean              // Is deze optie gekozen door de gebruiker.
    isRecommended: boolean           // Is deze optie aanbevolen door de webshop.
}

export default IOption
