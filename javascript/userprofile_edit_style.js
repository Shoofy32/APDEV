document.addEventListener("DOMContentLoaded", async () => {
    
    // Fetches session information from /user-login route and converts it to be usuable JS object
    const response = await fetch("/user-login"); 
    const info = await response.json() 

    // Fetches shop information from /shopItems  route and converts it to be usuable JS object
    const itemsResponse = await fetch("/shopItems");
    const items = await itemsResponse.json();


    // Containers for user styles
    const editStyleUsername = document.getElementsByClassName("username_styles")[0];
    const editStyleBanner = document.getElementsByClassName("banner_styles")[0]; 
    const editStylePfp = document.getElementsByClassName("pfp_styles")[0]; 


    // Elements to style
    const username = document.getElementsByClassName("username");
    const border = document.getElementsByClassName("banner_image")[0];
    const pfp = document.getElementsByClassName("pfp")[0];


    // Load user styles ad equipped styles
    await loadEditStyles();
    await loadEquippedStyles();


    const styleUsernameElements = editStyleUsername.querySelectorAll(".style_element");
    const styleBannerElements = editStyleBanner.querySelectorAll(".style_element");
    const stylePfpElements = editStylePfp.querySelectorAll(".style_element");


    if(styleUsernameElements)
        for(let i = 0; i < styleUsernameElements.length; i++)
            styleUsernameElements[i].addEventListener("click", () => {
        
                changeActiveStyle(styleUsernameElements, i)
                equipStyle("username", styleUsernameElements[i]);
        
            });

    

    if(styleBannerElements)
        for(let i = 0; i < styleBannerElements.length; i++)
            styleBannerElements[i].addEventListener("click", () => {
        
                changeActiveStyle(styleBannerElements, i)
                equipStyle("banner", styleBannerElements[i]);

            });

    if(stylePfpElements)
        for(let i = 0; i < stylePfpElements.length; i++)
            stylePfpElements[i].addEventListener("click", () => {
        
                changeActiveStyle(stylePfpElements, i)
                equipStyle("pfp", stylePfpElements[i]);

            });


    // Function loads the styles the user has bought in the edit bio container
    async function loadEditStyles(){

        const stylesOwned = info.user.itemsBought;
        const equippedUsername = info.user.equippedItems.equippedUsername;
        const equippedBanner = info.user.equippedItems.equippedBanner;
        const equippedPfp = info.user.equippedItems.equippedPfp;


        // Clear style containers and make it active by a ternary operator check to see if user has equipped something on that section
        editStyleUsername.innerHTML = `<p class = "style_element ${!equippedUsername ? "active_style" : ""}"> None </p>`;
        editStyleBanner.innerHTML = `<p class = "style_element ${!equippedBanner ? "active_style" : ""}"> None </p>`;
        editStylePfp.innerHTML = `<p class = "style_element ${!equippedPfp ? "active_style" : ""}"> None </p>`;


        for(let i = 0; i < stylesOwned.length; i++){

            
            let isActive = "";

            for(let j = 0; j < items.length; j++)
                if(items[j].itemValue.trim() === equippedUsername || items[j].itemValue.trim() === equippedBanner
                    || items[j].itemValue.trim() === equippedPfp){

                        let selectedItem = items[j].itemValue.trim();

                        if((stylesOwned[i].includes("Username") && equippedUsername === selectedItem) || 
                           (stylesOwned[i].includes("Banner") && equippedBanner === selectedItem) ||
                           (stylesOwned[i].includes("Profile") && equippedPfp === selectedItem)){

                                isActive = "active_style";
                                break;

                        }

                }



            if(stylesOwned[i].includes("Username"))
                editStyleUsername.insertAdjacentHTML("beforeend", `<p class = "style_element ${isActive}">${stylesOwned[i]}</p>`);
            else if(stylesOwned[i].includes("Banner"))
                editStyleBanner.insertAdjacentHTML("beforeend", `<p class = "style_element ${isActive}">${stylesOwned[i]}</p>`);
            else if(stylesOwned[i].includes("Profile"))
                editStylePfp.insertAdjacentHTML("beforeend", `<p class = "style_element ${isActive}">${stylesOwned[i]}</p>`);




        }

    }


    // Function changes active style chosen
    function changeActiveStyle(styleList, index){

        for(let i = 0; i < styleList.length; i++)
            if(styleList[i].classList.contains("active_style"))
                styleList[i].classList.toggle("active_style");

        styleList[index].classList.toggle("active_style");

    
    }

    // Function changes the current style of the user
    async function equipStyle(styleType, elementToEquip){

        let equipItemValue = null;

        for(let i = 0; i < items.length; i++){
            if(items[i].name.trim() === elementToEquip.textContent.trim())
                equipItemValue = items[i].itemValue.trim();


        }

        let styleToEquip;

        if(styleType === "username")
            styleToEquip = "equippedUsername";
        else if(styleType === "banner")
            styleToEquip = "equippedBanner";
        else if(styleType === "pfp")
            styleToEquip = "equippedPfp";


        await updateEquippedItems(styleToEquip, equipItemValue);

        // Update local info as info is only from page load
        info.user.equippedItems[styleToEquip] = equipItemValue;

        loadEquippedStyles(); // Load new equipped styles

    }



    // Function equips the styles to view in userprofile
    async function loadEquippedStyles(){


        for(let i = 0; i < username.length; i++)
            if(info.user.equippedItems.equippedUsername)
                username[i].style.color = info.user.equippedItems.equippedUsername;
            else
                username[i].style.color = "";

        if(info.user.equippedItems.equippedBanner)
            border.style.border = `4px solid ${info.user.equippedItems.equippedBanner}`;
        else
            border.style.border = "";

        if(info.user.equippedItems.equippedPfp)
            pfp.style.border = `4px solid ${info.user.equippedItems.equippedPfp}`;
        else
            pfp.style.border = "";


    }





});
