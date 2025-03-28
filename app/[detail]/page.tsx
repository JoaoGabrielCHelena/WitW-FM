import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import Tooltip from '../ui/tooltip';
import styles from "../sass/detail.module.sass"

type Props = {
    params: { detail: string };
  };
  
export const generateMetadata = ({ params }: Props): Metadata => {
  // transforms %20 back to spaces
  params.detail = params.detail.replaceAll("%20", " ") 

  return {
    title: `${params.detail}`,
  };
};

type Nation = {
  name: string,
  localName:{"common":string}[],
  capital:string,
  region:string,
  flag:string,
  flagAlt:string,
  population:string,
  subregion:string,
  tld:string,
  borders:string[],
  languages:{}[],
  currency:{"name":string}[]}

// generate the "borders" links
function borders(input:string[], threeLetterCodes:Map<string, string>) {
  if (input.length == 0) {
    return "None"
  }
  return input.map((code:string) => <Link key={code} href={`/${threeLetterCodes.get(code)?.replaceAll(" ", "%20")}`}>{threeLetterCodes.get(`${code}`)}</Link>)
}

export default async function Page(country:{params:{detail:string}}) {
    const info = await fetch(`https://restcountries.com/v3.1/name/${country.params.detail}?fields=name,flags,population,region,capital,subregion,tld,currencies,languages,borders`)
    const jsoninfo = await info.json()

    // because the query returns a nation and some of their "sorta-independent" territories, this is used to find the actual nation within json info
    country.params.detail = country.params.detail.replaceAll("%20", " ") 
    let index:number = jsoninfo.findIndex((nation:{name:{common:string}}) => nation.name.common.toUpperCase() == `${country.params.detail.toUpperCase()}`)
    if (index == -1) {
      index = 0
    }
    let currentNation = jsoninfo[index]
    
    // organises coutry info into one object
    const countryInfo:Nation = {
      'name': currentNation.name.common,
      'capital': currentNation.capital[0], 
      'localName' : Object.values(currentNation.name.nativeName) as {"common":string}[],
      'region': currentNation.region,
      'subregion': currentNation.subregion,
      'tld': currentNation.tld[0],
      'borders': currentNation.borders,
      'languages': Object.values(currentNation.languages) as {}[],
      'currency': Object.values(currentNation.currencies) as {"name":string}[],
      'flag': currentNation.flags.svg,
      'flagAlt': currentNation.flags.alt,
      'population': Intl.NumberFormat('en-US').format(currentNation.population)}; 
    
    // since the "borders" query returns three letter codes, this request nation's names and three leter codes
    const countries = await fetch(`https://restcountries.com/v3.1/independent?status=true&fields=name,cca3`)
    const countriesfull = await countries.json() as {'name':{common:string}, 'cca3':string}[]
    //  creates a map that associates each three letter code to a name, is used by borders()
    var threeLetterCodes = new Map()  
    countriesfull.forEach(element => {
      threeLetterCodes.set(`${element.cca3}`, `${element.name.common}`)
    }); 


    return (
    <>
        <main className={styles.main}>
          <Link className={styles.back} href="/..">
            <svg width="14" height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M14 5C14 4.72386 13.7761 4.5 13.5 4.5L1.70711 4.5L4.85355 1.35355C5.04882 1.15829 5.04882 0.841708 4.85355 0.646446C4.65829 0.451183 4.34171 0.451183 4.14645 0.646446L0.146446 4.64645C-0.0488157 4.84171 -0.0488157 5.15829 0.146446 5.35355L4.14645 9.35355C4.34171 9.54882 4.65829 9.54882 4.85355 9.35355C5.04882 9.15829 5.04882 8.84171 4.85355 8.64645L1.70711 5.5L13.5 5.5C13.7761 5.5 14 5.27614 14 5Z"/>
            </svg>
          Back</Link>
          <div className={`${styles.grid}`}>
            <Image 
              src={countryInfo.flag}
              alt={countryInfo.flagAlt}
              height={360}
              width={240}
            />
            <div>
              <h2 className={styles.nationame}>{countryInfo.name}</h2>
              <div className={`${styles.flexRow} ${styles.details}`}>
                <div>
                  <p className={styles.info}>Native Name: <Tooltip text={`${countryInfo.localName[0].common}`} tooltipItems={countryInfo.localName.map(obj => obj.common) as string[]} /></p>
                  <p className={styles.info}>Population: <span className={styles.value}>{countryInfo.population}</span></p>
                  <p className={styles.info}>Region: <span className={styles.value}>{countryInfo.region}</span></p>
                  <p className={styles.info}>Sub Region: <span className={styles.value}>{countryInfo.subregion}</span></p>
                  <p className={styles.info}>Capital: <span className={styles.value}>{countryInfo.capital}</span></p>
                </div>
                <div>
                  <p className={styles.info}>Top Level Domain: <span className={styles.value}>{countryInfo.tld}</span></p>
                  <p className={styles.info}>Currencies: <Tooltip text={`${countryInfo.currency[0].name}`} tooltipItems={countryInfo.currency.map(obj => obj.name) as string[]} /></p>
                  <p className={styles.info}>Languages: <Tooltip text={`${Object.values(countryInfo.languages)[0]}`} tooltipItems={Object.values(countryInfo.languages as string[])} /></p>
                </div>
              </div>
              <div>
                <p className={`${styles.borders} ${styles.info}`}>Border Countries:  {borders(countryInfo.borders, threeLetterCodes)}</p>
              </div>
            </div>
          </div>
        </main>
    </>
    )
  }
