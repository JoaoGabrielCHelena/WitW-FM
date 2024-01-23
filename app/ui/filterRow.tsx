'use client'

import { useRouter } from "@/node_modules/next/navigation";
import { useEffect } from "react";
import styles from "../home.module.css";

export function Search() {
    const router = useRouter()
    return (
        <div className={styles.search} 
            onClick={() => {
            let searchelement = document.querySelector('input[type="search"]') as HTMLInputElement
            searchelement.select()}}>
            <svg width="22" height="22" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path id="search" d="M11.7422 10.3439C12.5329 9.2673 13 7.9382 13 6.5C13 2.91015 10.0899 0 6.5 0C2.91015 0 0 2.91015 0 6.5C0 10.0899 2.91015 13 6.5 13C7.93858 13 9.26801 12.5327 10.3448 11.7415L10.3439 11.7422C10.3734 11.7822 10.4062 11.8204 10.4424 11.8566L14.2929 15.7071C14.6834 16.0976 15.3166 16.0976 15.7071 15.7071C16.0976 15.3166 16.0976 14.6834 15.7071 14.2929L11.8566 10.4424C11.8204 10.4062 11.7822 10.3734 11.7422 10.3439ZM12 6.5C12 9.53757 9.53757 12 6.5 12C3.46243 12 1 9.53757 1 6.5C1 3.46243 3.46243 1 6.5 1C9.53757 1 12 3.46243 12 6.5Z"/>
            </svg>
            <input type="search" id="test" placeholder="Search for a country..." onKeyDown={(event) => {
                if (event.key === 'Enter') {
                    console.log(event.currentTarget.value);
                    router.push(`/${event.currentTarget.value}`)
                }
            }} />

        </div>
    )
}

// used by region filter
function filter(input:string) {
    let allItems = document.querySelectorAll('[data-region]') as NodeListOf<HTMLElement>
    let currentValue = input
    
    allItems.forEach(element  => {
        if (currentValue == 'All') {
            element.style.display = 'block'
            return
        }
        if (element.getAttribute('data-region') != currentValue) {
            element.style.display = 'none'
        } else {
            element.style.display = 'block'
        }
    });
    return    
}

// used by region filter
function changeHandler(input:string) {
    let text = document.querySelector('#custom-select button span') as HTMLElement
    switch (input) {
        case "All":
            text.innerHTML = "All Regions"
            break;
            case "Americas":
            text.innerHTML = "America"
            break;
            case "Africa":
            text.innerHTML = "Africa"
            break;
            case "Asia":
            text.innerHTML = "Asia"
            break;
            case "Oceania":
            text.innerHTML = "Oceania"
            break;
            case "Europe":
            text.innerHTML = "Europe"
            break;
            default:
                text.innerHTML = "Something Broke :("
                break;
            }
            unexpand()
            return
        }
                
function expand() {
    let button = document.querySelector('#custom-select button') as HTMLElement
    let expandable = document.querySelector('#custom-select ul') as HTMLElement
    if (button.getAttribute("data-expanded") == "1") {
        unexpand()
        return
    }
    expandable!.style.display = 'flex'
    button.setAttribute("data-expanded", "1")
    document.addEventListener('click', function(event) {
        const outsideClick = typeof event.composedPath === 'function' &&  !event.composedPath().includes(document.querySelector('#custom-select') as HTMLElement);
        if (outsideClick) {
            unexpand()
        }
    });
    return
}


// used by region filter
function unexpand() {
    let button = document.querySelector('#custom-select button') as HTMLElement
    let expandable = document.querySelector('#custom-select ul') as HTMLElement
    if (expandable) {
        expandable.style.display = 'none';
        button.setAttribute("data-expanded", "0")
    }
    document.removeEventListener('click', function(event) {
        const outsideClick = typeof event.composedPath === 'function' &&  !event.composedPath().includes(document.querySelector('#custom-select') as HTMLElement);
        if (outsideClick) {
            unexpand()
        }
    })

}

export function RegionSelect() {
    return  (
            <>
            <div id="custom-select" className={styles.select}>
                <button onClick={() => {expand()}}>
                    <span data-expanded="0">All Regions</span>
                    <svg width="16" height="8" viewBox="0 0 10 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M0.646447 0.146447C0.841709 -0.0488155 1.15829 -0.0488155 1.35355 0.146447L5 3.79289L8.64645 0.146447C8.84171 -0.0488154 9.15829 -0.0488154 9.35355 0.146447C9.54882 0.341709 9.54882 0.658291 9.35355 0.853553L5.35355 4.85355C5.15829 5.04882 4.84171 5.04882 4.64645 4.85355L0.646447 0.853554C0.451184 0.658291 0.451184 0.341709 0.646447 0.146447Z"/>
                    </svg>
                </button>    
                <ul style={{display: "none"}}>
                    <li 
                    tabIndex={0} 
                    onClick={() => {filter("All"); changeHandler("All")}} 
                    role="option"
                    onKeyDown={(e) => {if (e.key == 'Enter'){ filter("All"); changeHandler("All")}}}>
                    All Regions</li>
                    <li 
                    tabIndex={0} 
                    onClick={() => {filter("Americas"); changeHandler("Americas")}} 
                    role="option"
                    onKeyDown={(e) => {if (e.key == 'Enter'){ filter("Americas"); changeHandler("Americas")}}}>
                    America</li>
                    <li 
                    tabIndex={0} 
                    onClick={() => {filter("Africa"); changeHandler("Africa")}} 
                    role="option"
                    onKeyDown={(e) => {if (e.key == 'Enter'){ filter("Africa"); changeHandler("Africa")}}}>
                    Africa</li>
                    <li 
                    tabIndex={0} 
                    onClick={() => {filter("Asia"); changeHandler("Asia")}} 
                    role="option"
                    onKeyDown={(e) => {if (e.key == 'Enter'){ filter("Asia"); changeHandler("Asia")}}}>
                    Asia</li>
                    <li 
                    tabIndex={0} 
                    onClick={() => {filter("Oceania"); changeHandler("Oceania")}} 
                    role="option"
                    onKeyDown={(e) => {if (e.key == 'Enter'){ filter("Oceania"); changeHandler("Oceania")}}}>
                    Oceania</li>
                    <li 
                    tabIndex={0} 
                    onClick={() => {filter("Europe"); changeHandler("Europe")}} 
                    role="option"
                    onKeyDown={(e) => {if (e.key == 'Enter'){ filter("Europe"); changeHandler("Europe")}}}>
                    Europe</li>
                </ul>
            </div>
            </>
            )
}
