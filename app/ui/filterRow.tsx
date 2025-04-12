"use client"

import { useRouter } from "@/node_modules/next/navigation"
import styles from "../sass/home.module.sass"
import { useEffect, useRef, useState } from "react"
import Icons from "./Icons"

export function Search() {
    const router = useRouter()
    const inputRef = useRef<HTMLInputElement>(null)
    return (
        <div
            className={styles.search}
            onClick={() => {
                inputRef.current?.select()
            }}
        >
            <Icons.search />
            <input
                type="search"
                ref={inputRef}
                placeholder="Search for a country..."
                onKeyDown={(event) => {
                    if (event.key === "Enter") {
                        console.log(event.currentTarget.value)
                        router.push(`/${event.currentTarget.value}`)
                    }
                }}
            />
        </div>
    )
}

export function RegionSelect() {
    const [open, setOpen] = useState(false)
    const [selected, setSelected] = useState("All")
    const dropdownRef = useRef<HTMLDivElement>(null)

    const unexpand = () => setOpen(false)

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setOpen(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    let selectedText = new Map([
        ["All", "All Regions"],
        ["Americas", "Americas"],
        ["Africa", "Africa"],
        ["Asia", "Asia"],
        ["Oceania", "Oceania"],
        ["Europe", "Europe"],
    ])

    // used by region filter
    function filter(input: string) {
        let allItems = document.querySelectorAll(
            "[data-region]",
        ) as NodeListOf<HTMLElement>
        let currentValue = input
        setSelected(currentValue)

        allItems.forEach((element) => {
            if (currentValue == "All") {
                element.style.display = "block"
                return
            }
            if (element.getAttribute("data-region") != currentValue) {
                element.style.display = "none"
            } else {
                element.style.display = "block"
            }
        })
        unexpand()
        return
    }

    let options = Array.from(selectedText.keys()).map((i) => (
        <li
            tabIndex={0}
            onClick={() => {
                filter(i)
            }}
            role="option"
            key={i}
            onKeyDown={(e) => {
                if (e.key == "Enter") {
                    filter(i)
                }
            }}
        >
            {selectedText.get(i)}
        </li>
    ))

    return (
        <>
            <div ref={dropdownRef} id="custom-select" className={styles.select}>
                <button
                    onClick={() => {
                        setOpen(!open)
                    }}
                >
                    <span>{selectedText.get(selected)}</span>
                    <Icons.carat />
                </button>
                <ul role="listbox" style={{ display: open ? "block" : "none" }}>
                    {options}
                </ul>
            </div>
        </>
    )
}
