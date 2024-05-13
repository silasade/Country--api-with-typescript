import moon from "../images/moon.svg"
import sun from "../images/brightness-high.svg"
export const background={
    light:{
        text:"Light Mode",
        image: moon,
        primary: "hsl(200, 15%, 8%)",
        secondary: "hsl(0, 0%, 98%)",
        inputBox: "hsl(0, 0%, 52%)"
    }
    ,
    dark:{
        text:"dark Mode",
        image: sun,
        primary: "hsl(209, 23%, 22%)",
        secondary: "hsl(207, 26%, 17%)",
        inputBox: "hsl(0, 0%, 52%)"
    }
}