document.addEventListener("DOMContentLoaded", async () => {

    const shopContainer = document.getElementsByClassName("shop_container")[0];

    // Fetches shop information from /shopItems  route and converts it to be usuable JS object
    const itemsResponse = await fetch("/shopItems");
    const items = await itemsResponse.json();

    // Fetches session information from /user-login route and converts it to be usuable JS object
    const response = await fetch("/user-login"); 
    const info = await response.json() 

    // Load shop items to view
    await loadShopItems();


    const buyItemButtons = document.getElementsByClassName("buy_item_button");

    const userLikeElement = document.getElementsByClassName("like_amount")[0];
    const currentLikes = parseInt(userLikeElement.textContent);



    for(let i = 0; i < buyItemButtons.length; i++)
        buyItemButtons[i].addEventListener("click", async (event) => {

            let shopItemContainer = event.target.closest(".shop_item_container")
            let itemPrice = parseInt(shopItemContainer.querySelector(".shop_price").textContent);
    
            if(currentLikes >= itemPrice){

                buyItem(itemPrice, shopItemContainer.querySelector(".item_name").textContent);

            }

            else{

                let alertElement = shopItemContainer.getElementsByClassName("buy_alert")[0];

                alertElement.textContent = "Not Enough Likes!";
                alertElement.classList.toggle("buy_alert_hidden");
                await timer(2000);
                alertElement.classList.toggle("buy_alert_hidden");


            }
                
                

        })


    // ---------------- FUNCTION ---------------- // 


    // Function loads shop items to the store
    async function loadShopItems(){

        for(let i = 0;i < items.length; i++){

            let itemPreview;
            let purchaseButton;

            // Depending on itemType, chose HTML that fits the preview for that item
            if(items[i].itemType.trim() === "username")
                itemPreview = `<p class = "username_item_preview" style = "color: ${items[i].itemValue.trim()}">Sample Username</p>`;
            else if(items[i].itemType.trim() === "banner")
                itemPreview = `<img src="../resources/images/banner_placeholder.jpg" class = "banner_image" style = "border: 4px solid ${items[i].itemValue.trim()}"> `;
            else if(items[i].itemType.trim() === "pfp")
                itemPreview = `<img src="../resources/users/noprofilepic.jpg" class = "pfp" style = "border: 4px solid ${items[i].itemValue.trim()}">`;


            // Checks whether user has already bought the item or not
            if(info.user.itemsBought.includes(items[i].name.trim()))
                purchaseButton = `<p class = "buy_alert">Item already purchased</p>`;
            else
                purchaseButton= `<button class = "buy_item_button">Buy</button>`;


            // Shop Item HTML Display
            let newShopItem = `
                <div class = "shop_item_container">

                    <div class = item_preview_container>

                        ${itemPreview}

                    </div>

                    <p class = "item_name">${items[i].name.trim()}</p>

                    <p class = "item_description">${items[i].description.trim()}</p>

                    <div class = "item_price_container">

                        <i class="fa-regular fa-thumbs-up fa-xl"></i>
                        <p class = "shop_price">${items[i].price}</p>

                    </div>


                    <p class = "buy_alert buy_alert_hidden">Alert!</p>

                    ${purchaseButton}

                </div>`;

            // Insert Item to Shop Container
            shopContainer.insertAdjacentHTML("beforeend", newShopItem);


        }


    }


    // Function performs transaction of the user after purchasing the item
    async function buyItem(itemPrice, itemName){

        // Call function to update likes in database

        let likesAfterPurchase = currentLikes - itemPrice;

        await addShopItem(likesAfterPurchase, itemName);

        location.reload();


    }


    // Function that creates a new anonymous Promise object that will create a timer based on parameter input
    function timer(ms){

        // Create a Promise Object, that will Timeout itself Based on the ms parameter
        var promise = new Promise(res => setTimeout(res, ms));

        return promise;

    }


});