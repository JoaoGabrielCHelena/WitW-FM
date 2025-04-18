"use client"
import { useEffect } from "react"
import styles from "../sass/home.module.sass"

function FirstCheck(): any {
    if (localStorage.getItem("witwtheme")) {
        if (localStorage.getItem("witwtheme") == "dark") {
            document.querySelector("html")?.classList.add("darkMode")
            console.log("happened2")
            return
        }
        return
    }

    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        document.querySelector("html")?.classList.add("darkMode")
    }
}

function toggle() {
    if (document.querySelector("html")?.classList.contains("darkMode")) {
        document.querySelector("html")?.classList.remove("darkMode")
        localStorage.setItem("witwtheme", "light")
        return
    }
    console.log("happened1")
    document.querySelector("html")?.classList.add("darkMode")
    localStorage.setItem("witwtheme", "dark")
    return
}

export default function Header() {
    useEffect(() => {
        window.onload = FirstCheck()
    }, [])
    return (
        <header className={styles.header}>
            <h1>Where in the world?</h1>
            <button
                onClick={() => {
                    toggle()
                }}
            >
                <svg
                    width="20"
                    height="20"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        id="moon"
                        d="M6.0003 0.278304C6.1825 0.500435 6.2447 0.83521 6.0807 1.13613C5.5201 2.16474 5.20151 3.34302 5.20151 4.59686C5.20151 8.6173 8.4803 11.8727 12.5202 11.8727C13.0466 11.8727 13.5594 11.8175 14.0534 11.7129C14.3912 11.6413 14.6984 11.794 14.8631 12.0286C15.033 12.2707 15.0686 12.6318 14.8318 12.9224C13.3034 14.7985 10.9648 16 8.34357 16C3.73342 16 0 12.2863 0 7.71002C0 4.2658 2.11415 1.31197 5.12354 0.0600878C5.47124 -0.0845512 5.81229 0.0490932 6.0003 0.278304ZM4.85797 1.31064C2.575 2.54229 1.02491 4.94609 1.02491 7.71002C1.02491 11.7305 4.30371 14.9859 8.34357 14.9859C10.3796 14.9859 12.2216 14.1598 13.5491 12.8244C13.2118 12.8656 12.8684 12.8868 12.5202 12.8868C7.91002 12.8868 4.17659 9.17319 4.17659 4.59686C4.17659 3.43014 4.41946 2.31873 4.85797 1.31064Z"
                    />
                </svg>
                Dark Mode
            </button>
        </header>
    )
}
