// cart functionallity for my feature page
// handling by adding and removing products, calculation price totals, and checkout process
document.addEventListener('DOMContentLoaded', function() {
    // initialize cart from local storage or empty array
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // DOM elements
    const cartItemsContainer = document.querySelector('.cart-items');
    const totalPriceElement = document.getElementById('total-price');
    const checkoutButton = document.querySelector('.checkout-button');
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    
    // checkout modal elements
    const checkoutModal = document.getElementById('checkoutModal');
    const closeModal = document.querySelector('.close-modal');
    const checkoutForm = document.getElementById('checkoutForm');
    const modalCartItems = document.querySelector('.cart-items-list');
    const modalTotalPrice = document.getElementById('modalTotalPrice');
    
    // creates a confirmation modal dynamically and adds it to the page
    const confirmationModal = document.createElement('div');
    confirmationModal.id = 'confirmationModal';
    confirmationModal.className = 'modal';
    confirmationModal.innerHTML = `
        <div class="modal-content confirmation-content">
            <div class="modal-scrollable">
                <span class="close-modal">&times;</span>
                <div class="confirmation-body">
                    <div class="confirmation-icon">✓</div>
                    <h2>Order Confirmed!</h2>
                    <p class="confirmation-text">Thank you for your purchase!</p>
                    <p class="order-details">We've sent the receipt to your email.</p>
                    <div class="order-summary"></div>
                </div>
            </div>
            <div class="modal-footer">
                <button class="confirmation-button">Continue Shopping</button>
            </div>
        </div>
    `;







    document.body.appendChild(confirmationModal);
    
    const closeConfirmationModal = confirmationModal.querySelector('.close-modal');
    const confirmationButton = confirmationModal.querySelector('.confirmation-button');
    const orderSummary = confirmationModal.querySelector('.order-summary');
    
    // shows a modal by setting display and opacity
    function showModal(modal) {
        document.documentElement.style.overflow = 'hidden';
        document.body.style.overflow = 'hidden';
        modal.style.display = 'block';
        setTimeout(() => {
            modal.style.opacity = '1';
        }, 10);
    }
    
    // hides a modal with fade-out effect
    function hideModal(modal) {
        modal.style.opacity = '0';
        setTimeout(() => {
            modal.style.display = 'none';
            document.documentElement.style.overflow = 'auto';
            document.body.style.overflow = 'auto';
        }, 300);
    }
    





    // displays all items in the cart with remove buttons
    function renderCart() {
        cartItemsContainer.innerHTML = '';
        
        // show empty message if cart is empty
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
            totalPriceElement.textContent = '0.00';
            return;
        }
        
        let total = 0;
        
        // create HTML for each cart item
        cart.forEach((item, index) => {
            const cartItemElement = document.createElement('div');
            cartItemElement.className = 'cart-item';
            
            cartItemElement.innerHTML = `
                <span class="item-name">${item.name}</span>
                <span class="item-price">$${item.price}</span>
                <button class="remove-item" data-index="${index}">
                    <svg viewBox="0 0 24 24" width="16" height="16">
                        <path fill="currentColor" d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
                    </svg>
                </button>
            `;
            
            cartItemsContainer.appendChild(cartItemElement);
            total += parseFloat(item.price);
        });
        
        // add click handlers to all remove buttons
        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                removeFromCart(index);
            });
        });
        
        // updates total price display
        totalPriceElement.textContent = total.toFixed(2);
    }
    




    // removes an item from cart by index
    function removeFromCart(index) {
        cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
        updateModalCart();
        
        // show temporary feedback message
        const feedback = document.createElement('div');
        feedback.className = 'remove-feedback';
        feedback.textContent = 'Item removed from cart';
        document.body.appendChild(feedback);
        
        setTimeout(() => {
            feedback.classList.add('fade-out');
            setTimeout(() => {
                feedback.remove();
            }, 300);
        }, 1500);
    }
    



    // updates the cart display in the checkout modal
    function updateModalCart() {
        modalCartItems.innerHTML = '';
        
        if (cart.length === 0) {
            modalCartItems.innerHTML = '<p>Your cart is empty</p>';
            modalTotalPrice.textContent = '0.00';
            return;
        }
        
        let total = 0;
        
        cart.forEach(item => {
            const cartItemElement = document.createElement('div');
            cartItemElement.className = 'cart-item';
            cartItemElement.innerHTML = `
                <span class="item-name">${item.name}</span>
                <span class="item-price">$${item.price}</span>
            `;
            modalCartItems.appendChild(cartItemElement);
            total += parseFloat(item.price);
        });
        
        modalTotalPrice.textContent = total.toFixed(2);
    }
    
    // adds click handlers to all "Add to Cart" buttons
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.getAttribute('data-id');
            const productName = this.getAttribute('data-name');
            const productPrice = this.getAttribute('data-price');
            
            // check if item already in cart
            const existingItem = cart.find(item => item.id === productId);
            
            if (!existingItem) {
                // add new item to cart
                cart.push({
                    id: productId,
                    name: productName,
                    price: productPrice
                });
                
                localStorage.setItem('cart', JSON.stringify(cart));
                renderCart();
                updateModalCart();
                
                // visual feedback when item is added
                this.classList.add('added');
                this.textContent = 'Added to Cart!';
                setTimeout(() => {
                    this.classList.remove('added');
                    this.textContent = 'Add to Cart';
                }, 2000);
            }
        });
    });
    





    // creates and shows a styled empty cart alert
    const emptyCartOverlay = document.createElement('div');
    emptyCartOverlay.className = 'empty-cart-overlay';
    document.body.appendChild(emptyCartOverlay);

    const emptyCartAlert = document.createElement('div');
    emptyCartAlert.className = 'empty-cart-alert';
    emptyCartAlert.innerHTML = `
        <div class="empty-cart-alert-icon">!</div>
        <h4>Your Cart is Empty</h4>
        <p>Please add some items before proceeding to checkout.</p>
        <button class="empty-cart-alert-button">Continue Shopping</button>
    `;
    document.body.appendChild(emptyCartAlert);

    // shows the empty cart alert
    function showEmptyCartAlert() {
        emptyCartOverlay.classList.add('show');
        emptyCartAlert.classList.add('show');
    }

    // hides the empty cart alert
    function hideEmptyCartAlert() {
        emptyCartOverlay.classList.remove('show');
        emptyCartAlert.classList.remove('show');
    }

    // handlers for closing the empty cart alert
    emptyCartOverlay.addEventListener('click', hideEmptyCartAlert);
    emptyCartAlert.querySelector('.empty-cart-alert-button').addEventListener('click', hideEmptyCartAlert);

    // handles checkout button click - shows empty alert or checkout modal
    if (checkoutButton) {
        checkoutButton.addEventListener('click', function() {
            if (cart.length === 0) {
                showEmptyCartAlert();
                return;
            }
            showModal(checkoutModal);
            updateModalCart();
        });
    }
    







    // close modal handlers
    if (closeModal) {
        closeModal.addEventListener('click', function() {
            hideModal(checkoutModal);
        });
    }
    
    if (closeConfirmationModal) {
        closeConfirmationModal.addEventListener('click', function() {
            hideModal(confirmationModal);
        });
    }
    
    // close modals when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === checkoutModal) {
            hideModal(checkoutModal);
        }
        if (event.target === confirmationModal) {
            hideModal(confirmationModal);
        }
    });






    
    // confirmation button returns to shopping
    if (confirmationButton) {
        confirmationButton.addEventListener('click', function() {
            hideModal(confirmationModal);
        });
    }
    
    // handles checkout form submission
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get the form data
            const formData = new FormData(checkoutForm);
            const formValues = Object.fromEntries(formData.entries());
            
            // create order summary HTML
            orderSummary.innerHTML = `
                <div class="summary-item">
                    <span>Customer:</span>
                    <span>${formValues.fullName}</span>
                </div>
                <div class="summary-item">
                    <span>Email:</span>
                    <span>${formValues.email}</span>
                </div>
                <div class="summary-item">
                    <span>Shipping Address:</span>
                    <span>${formValues.address}</span>
                </div>
                <div class="summary-item">
                    <span>Payment Method:</span>
                    <span>${formValues.payment}</span>
                </div>
                <div class="summary-items-header">Order Items:</div>
                ${cart.map(item => `
                    <div class="summary-item">
                        <span>${item.name}</span>
                        <span>$${item.price}</span>
                    </div>
                `).join('')}
                <div class="summary-item total">
                    <span>Total:</span>
                    <span>$${modalTotalPrice.textContent}</span>
                </div>
            `;
            





            //clear the cart after purchase
            cart = [];
            localStorage.setItem('cart', JSON.stringify(cart));
            renderCart();
            updateModalCart();
            
            // show confirmation and hide checkout modal
            hideModal(checkoutModal);
            showModal(confirmationModal);

            // reset form
            checkoutForm.reset();
        });
    }
    
    // initial cart render when page loads
    renderCart();
});










// ,,,,,,,,,,  ,,,,,,,..,,,,,,,,,,,,,,    , ,,, , ,                                     
// ,    , ,,,,,,,,,,,   ,,,,,,,,.,,,,,,,,,,,,,        ,,,,,,,,                         ,,  ,      
// ,, ,,,,,,,,,...,,   ,,,,,,,,,,,,,,,,,,,,,,,       ,,,,,,,,,,,,,,   ,               ,,,,,,,      
// ,,,,,,,,,,....,,  ,,,,,,,,,,,,,,,,,,,,,,,        ,,,,,,,,,,,,,,,,,,,,,,            ,, ,,,       
// ,,,,,,,,,....,,,,,,,,,,,,,,,,,,,,,,,,,,          ,,,,,,,,,,,,,,,,,,,,,,,,                       
// ,,,,,,,,,,..,,,,,,,,,,,,,,,,,,,,,,,,,,          ,,,,,,,,,,,,,,,,,,,,,,,,,,,,,                   
// ,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,           ,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,                 
// ,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,            ,,,,, ,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,            
// ,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,                            ,,,,,,,,,,,,,,,,,,,,,,             
// ,,....,,,,,,,,,,,,,,,,,,,,,,,,,                                   ,,,,,,,,,,,,,,,,        ,     
// ....,,,,,,,,, ,,,,,,      ,      ,,,,,,,,,,,,,,                      ,,,,,,,,,,,        ,,,,    
// ..........,,,,,,            ,,................,,,,,,,,                 ,,,, ,         ,,,,,,,,,,
// .##########....,,,      ,,..#################........,,,               ,,             ,,,,,,,,,,
// ###############..,,   ,,..###########################..,,,                               ,,,,,, 
// ...##############.,  ,,,....##########################...,,,                            ,,,,,,, 
// .....###########,        ,,,...#########################...,,,,,,                       ,,,,,,, 
// .....#########.,              ,....#######################......,,,                     ,,,,,,, 
// ....########.,                ,,,,.############################...,,,,,                ,,,,,,,,,
// ...#######.,                      ,.#############################....,,,              ,,,,,,,,,,
// #########.,      ,                ,,.###############################..,               ,,,,,,,,,,
// ########.,     ,...,                .################################.,,,            ,,,,,,,,,, 
// ########.,   ,,###.,                ,################################...,,,,        ,,,,,,,,,,, 
// #######.,,  ,,.#.,,                 .#################################....,                 , , 
// #######.,,,,,,,,,                  ,.#######################.............,,                     
// #######.,,,,,,,                    .#####################.,,,,,,   ,,,,,,,                      
// #######..,,,,,,,,                 .###################.,                                        
// #######.,,,,,,,,,,,             ,.###################,                                        ,,
// #######.,,,,,,,,,,,,,          ,.###################,                                         ,,
// #######...#...,,,,,,,,        ,.##################.                                          ,,,
// ##############....,,,,,,,,,,,,.###################,                                         ,.,,
// ###################.........#####################.                                         ..,,,
// #################################################,                                       ,...,,,
// #################################################,,                 ,,,                 ,...,,,,
// #################################################.,               ,###.           ,,   ,,..,,,,,
// ########################.........################.               ,.##.,          ,,    ,,,,,,,,,
// #####################.,,,,,,,,,,,....############.                ,,,           ,,,,        ,,,,
// ###################.,,,,,,,,,,,,,,,,,,..#########.,                            ,..,,        ,,,,
// #################.,,,,,,,,,,,,,,,,   ,,,,.########.,                          .#..,,,        ,,,
// ################.,,,,,,,,,,,,,,,,,       ,,.#######.,,                      ,.##...,         ,.,
// ###############..,,,,,,,,,,,,,,,,,        ,,,..######..,,                  ,.####.,,        ,,.,
// ###############.,,,,,,,,,,,,,,,,,,,,,,,,,,   ,,.########..,,              .######.,         ...,
// ###############.,,,,,,,,,,,,,,,,,,......,,,,,,,,..##########.....,,,,,,..#######.,        ,....,
// ###############..,,,,,,,,,,,,,,.##########.....,,,,.###########################.,       ,......,
// ###############..,,,,,,,,,,,,,##################..,,,.########################.,,     ,........,
// ###############..,,,,,,,,,,,,.###################...,,..#####################.,,     ,,,,......,
// ################...,,,,,,,,,.######################...,,.####################.,        ,,,.....,
// ################...,,,,,,,,,.########################..,,..#################.,    ,    ,,,,,,,.,
// #################...,,,,,,,..########################.,  ,,..##############., ,,,.,,      ,,,..,
// ##################..,,,,,,,.#######################.,,    ,,,.###########.,,......,,,,     ,,,,,
// ##################...,,,,,,.#####################.,,        ,,.#########..######...,,,,     ,,,,
// ###################..,,,,,,.###################.,            ,.#######..#########....,,,      ,,
// ###################....,,,,.#################.,             ,.#####################...,,        
// ######################..,,,..##############.,,            ,.########################..,,,,     ,
// #######################..,,,..##########..,,,          ,,.###########################...,,,   ,,
// ########################..,,,...######.,,,,        ,,..################################...,,,,,,
// #########################..,,,,.....,,,,,,,,,, ,,,.#####################################..,,,,, 
// ###########################..,,,,,,,,,,,,,,,,,..#########################################..,,,  
// ############################...,,,,,,,,,.....#############################################..,,, 
// ###############################......######################################################..,, 
// ############################################################################################..,,
// ###############################################################################################,
// ###############################################################################################,
// ###############################################################################################,
// ###############################################################################################.