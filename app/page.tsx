import styles from "./sass/home.module.sass"
import NationPreview from "./ui/NationPreview"
import { Search, RegionSelect } from "./ui/filterRow"

type Nation = {
    name: string
    capital: string
    region: string
    flag: string
    flagAlt: string
    population: string
}

export default async function Home() {
    const info = await fetch(
        `https://restcountries.com/v3.1/independent?status=true&fields=name,cca3,flags,population,region,capital`,
    )
    const countries = await info.json()
    var cardInfo: Nation[] = []

    // gets the informations for the cards
    for (let index = 0; index < countries.length; index++) {
        let countryinfo: Nation = {
            name: countries[index].name.common,
            capital: countries[index].capital[0],
            region: countries[index].region,
            flag: countries[index].flags.svg,
            flagAlt: countries[index].flags.alt,
            population: Intl.NumberFormat("en-US").format(
                countries[index].population,
            ),
        }
        cardInfo.push(countryinfo)
    }

    // organizes the items alphabetically by name
    cardInfo.sort(function (a: any, b: any) {
        if (a.name > b.name) {
            return 1
        }
        if (a.name < b.name) {
            return -1
        }
        return 0
    })

    let cards = cardInfo.map((country: Nation) => (
        <NationPreview key={country.name} {...country} />
    ))

    return (
        <main className={styles.main}>
            <div className={styles.filterRow}>
                <Search />
                <RegionSelect />
            </div>
            <div className={styles.grid}>
                {cards}
            </div>
        </main>
    )
}
