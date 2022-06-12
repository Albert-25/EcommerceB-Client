let styles = document.createElement("style");
styles.innerHTML =
    ".container-nav-pagination {" +
    "margin-bottom: 30px;" +
    "}" +

    ".pagination {" +
    "    display: flex;" +
    "    justify-content: center;" +
    "}" +

    ".pagination .number-li {" +
    "    list-style: none;" +
    "  margin: 0px 6px;" +
    "}" +

    ".pagination .number-li .number-a {" +
    "background-color: #424949;" +
    "padding: 8px;" +
    "   border-radius: 5px;" +
    "font-size: 18px;" +
    "    font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;" +
    " cursor: pointer;" +
    "    transition: all 0.2s;" +
    "    color: #e9eef2;" +
    "}" +

    ".pagination .number-li .number-a:hover {" +
    " background-color: #151515;" +
    "color: #f2f2f2;" +
    "}" +

    ".pagination .number-li .number-a-selected {" +
    "background-color: #D35400;" +
    "padding: 8px;" +
    "   border-radius: 5px;" +
    "font-size: 18px;" +
    "    font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;" +
    " cursor: pointer;" +
    "    transition: all 0.2s;" +
    "    color: #e9eef2;" +
    "}" 


export default styles;