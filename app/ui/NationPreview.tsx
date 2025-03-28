import Image from "@/node_modules/next/image"
import Link from "@/node_modules/next/link"
import styles from "../sass/home.module.sass"

export default function NationPreview({
    name,
    capital,
    region,
    flag,
    flagAlt,
    population,
}: {
    name: string
    capital: string
    region: string
    flag: string
    flagAlt: string
    population: string
}) {
    // data-region is for the region filter
    return (
        <>
            <Link
                href={`/${name.replaceAll(" ", "%20")}`}
                data-region={`${region}`}
                className={styles.card}
            >
                <Image src={flag} alt={flagAlt} height={160} width={260} />
                <div>
                    <p className={styles.name}>{name}</p>
                    <p className={styles.value}>
                        Population:{" "}
                        <span className={styles.info}>{population}</span>
                    </p>
                    <p className={styles.value}>
                        Region: <span className={styles.info}>{region}</span>
                    </p>
                    <p className={styles.value}>
                        Capital: <span className={styles.info}>{capital}</span>
                    </p>
                </div>
            </Link>
        </>
    )
}
