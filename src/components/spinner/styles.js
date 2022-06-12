let styles = document.createElement("style");
styles.innerHTML =
    ".spinner{" +
    " border: 25px solid rgba(0, 0, 0, .1);" +
    " height: 360px;" +
    "border-radius: 50%;" +
    " border-left-color: #151515;" +
    " animation: spin 1s ease infinite;" +
    " grid-column: 2/4;" +
    "}" +

    "@keyframes spin{" +
    " 0%{" +
    "      transform: rotate(0deg);" +
    " }" +
    " 100%{" +
    "transform: rotate(360deg);" +
    " }" +
    "}"


export default styles;