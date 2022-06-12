let styles = document.createElement("style");
styles.innerHTML =
".searchbar-container {"+
    "display: flex;"+
  "  padding: 40px 20px;"+
    "background-color: #D35400;"+
"}"+

".searchbar {"+
    "margin-right: 40px;"+
    "flex: 1;"+
"}"+

".searchbar input {"+
  "  padding: 10px;"+
   " box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);"+
    "border-radius: 3px;"+
    "border: none;"+
    "width: 100%;"+
"}"+

".searchbar input:focus {"+
    "outline: none;"+
"}"+

".searchbar-btn button {"+
    "background-color: #151515;"+
    "border: none;"+
   " border-radius: 10px;"+
   " color: #e9eef2;"+
    "padding: 10px 20px;"+
    "cursor: pointer;"+
"}"


export default styles;