import React from "react"
import styles from "../sass/detail.module.sass"

function innerTooltip(input:string[]) {
    if (input.length == 1) {
        return
    }
    return input.map((input:string) => <React.Fragment key={input}>{input}<br /></React.Fragment> )
  }
export default function Tooltip({text, tooltipItems}:{text:string, tooltipItems:string[]}) {
    return (
    <>
    <span className={`${styles.value} ${styles.tooltipText}`}>
        {text}
        <span className={styles.tooltipBox}>
        {innerTooltip(tooltipItems)}
        </span>
    </span>
    </>)
}
