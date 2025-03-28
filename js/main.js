document.addEventListener('DOMContentLoaded', function() {
    // contact form handling
    const contactForm = document.getElementById('contactForm');
    

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const formValues = Object.fromEntries(formData.entries());
        
        if (formValues.name && formValues.email && formValues.message) {
            // show popup if it's success
            contactForm.classList.add('success');
            
            // show popup message if it doesn't exists
            let successMsg = contactForm.querySelector('.success-message');
            if (!successMsg) {
                successMsg = document.createElement('div');
                successMsg.className = 'success-message';
                successMsg.textContent = '✓ Message sent successfully!';
                contactForm.appendChild(successMsg);
            }
            successMsg.classList.add('show');
            

            // show reset button if it doesn't exists
            let resetBtn = contactForm.querySelector('.reset-form');
            if (!resetBtn) {
                resetBtn = document.createElement('button');
                resetBtn.className = 'reset-form';
                resetBtn.textContent = 'Send another message';
                resetBtn.type = 'button';
                contactForm.appendChild(resetBtn);
                
                resetBtn.addEventListener('click', function() {
                    contactForm.reset();
                    contactForm.classList.remove('success');
                    successMsg.classList.remove('show');
                    this.style.display = 'none';
                });
            }
            
            // auto-resets after 5 seconds
            setTimeout(() => {
                contactForm.reset();
                contactForm.classList.remove('success');
                successMsg.classList.remove('show');
                if (resetBtn) resetBtn.style.display = 'none';
            }, 5000);
            
        } else {
            // error
            contactForm.classList.remove('success');
            contactForm.classList.add('error');
            setTimeout(() => {
                contactForm.classList.remove('error');
            }, 1000);
        }
    });
}
    
    // smooth scrolling
    function setupSmoothScrolling() {
        // make all #anchor links scroll smoothly
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                scrollToSection(targetId);
            });
        });
        
        // special handling for "Contact Me" button
        const ctaButton = document.querySelector('.cta-button');
        if (ctaButton) {
            ctaButton.addEventListener('click', function(e) {
                e.preventDefault();
                scrollToSection('#contactFormSection');
                
                // 3. Focus on name field after scrolling
                setTimeout(() => {
                    const nameField = document.getElementById('name');
                    if (nameField) nameField.focus();
                }, 500);
            });
        }
    }
    
    // smooth scroll to any section
    function scrollToSection(selector) {
        if (selector && selector !== '#') {
            const targetElement = document.querySelector(selector);
            if (targetElement) {
                // smooth scroll
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // highlight effect
                targetElement.classList.add('highlight');
                
                // remove highlight effect after 2 secs
                setTimeout(() => {
                    targetElement.classList.remove('highlight');
                }, 2000);
            }
        }
    }
    
    // initialize the scrolling system
    setupSmoothScrolling();
    


    // navigation highlighting
    function setActiveNavLink() {
        // get current page filename
        const currentPage = location.pathname.split('/').pop();
        const navLinks = document.querySelectorAll('nav a');
        
        // compare each link with current page
        navLinks.forEach(link => {
            const linkPage = link.getAttribute('href');
            if (currentPage === linkPage || (currentPage === '' && linkPage === 'index.html')) {
                // 3. Highlight matching link
                link.classList.add('active');
            }
        });
    }
    
    setActiveNavLink();
    

    // scroll animations
    function initScrollAnimations() {
        // set up observer to watch elements
        const observerOptions = {
            threshold: 0.1 // triggers when it's 10% visible
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                // add class when element scrolls into view
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);
        
        // see all elements with this class
        document.querySelectorAll('.animate-on-scroll').forEach(section => {
            observer.observe(section);
        });
    }
    
    // only initialize if animated elements exist
    if (document.querySelector('.animate-on-scroll')) {
        initScrollAnimations();
    }
});






















                                                                                                
                                                                                                
                                                                                                
                                                                                                
                                                                                                
                                                                                                
// .##...      ,...########################################################################.,,   ,,
// ##..,     ,.########################..##############################################.#####.,    
// ...,     ,.########################...########################....###############...########.,  
// ..     ,.#########################...#####################............########...############., 
// #,  ,,,.##########################.######################........., ,..#...........###########.,
// .#.,,,.##################################################.......,, ,,,,,,,...,,,..#############.
// ,....##################################################........,,,,    ,..,,,..#################
// ,,.....################################################.......,,,,,  ,,,,,..####################
//   ,.......###########################################.,....,, ,,, ,,, , ,.######################
//    ,.###.....###########..###########################.,...,   , ,  ,, , ,...####################
// ,  ,#######....########..############################....,     , ,,,,, ,,,.#####################
// ,  ,################################################.,,..,      ,,,,,,,,,..#####################
// ,  ,###############################################.,,,,.,      ,,,,,,,,,..#####################
// , ,.#############################################..#.,,,.,   ,  ,,,,,,,,..######################
// . ,##############################################.#.,,,,., ,      ,,,,..########################
// . .####################################.###########,,,,,,  ,    , ,,,..#########################
// .,.######################################..#######.,,..,,,,     ,,,,,..#########################
// ,,##########################################...#.,,.,,,,,,,    ,,,,,...#########################
// ,,.############################.##############.,,,,,,,,,., ,, ,,,,,...##########################
// ., ,..##########################..###########..,,,,,,,,,,          ....#########################
//  ,   ,...################..######...#######..,,..,  ,,,,     ,    ,,,..######..#################
// ,,,   ,....##############.....#####..####,,,,,.., ,, ,,,,, ,,      .#,.######.##################
//   ,,,,,.##,,.################.#####.,,.,,,,,,,, ,,   ,,  ,       ,    ,.########################
// , ,#.,,,..##.,..###############....,,,,    ,., ,,   ,,,,                .#.#####################
// ,  ., ,,,,,..#....#######...,,,,,,,     ,,,,, ,,   ,,,,,   ,,            ,#####################.
//      ,,,,  ,,,.##...##..,,,,,,..,    ,,.,,,    ,,,,,,,,, ,,,              .###################.#
//        ,,,,,,,,,,...,,,,,,,#..,  ,,,...,,   ,  ,,,.,,, ,         ,        ,#####################
//           ,.##..,,,,..,,,...,,...,,,.,,,, ,..,,,,,,,,     ,,     ,,,,,,   .#####..##############
//          ,,,,..#.,,,,,,,,.,,....,     ,,,,.,,,,,.,,,  ,           ,., .,  ...,,   .#############
//         ,,,.####.,,.,,,,,,,..,,         ,.,,,,,,,,,  ,         ,,,,,,            , ,.####..,,,,,
//             ,.#....,,..,,,,,,,,       ,    ,,,,,,,   ,      ,,                    ,,,,..,       
//                ,....###.,,,,,,,,    ,,     ,,.,,,,            ,,    ,          ,,  ,,         ,,
// ,,                ,,..##.,,,,,,,,,,  ,     ,.,,,             ,,,,   ,,,       ..,           ,,,,
// ,,,,                  ,,., ,,,,,,,,,,,,   ,   ,.,            ,,,   ,                      ,,,,..
// ,,,,,,                         ,,,,,,     .,,                 ,   ,, ,                  ,...,,,,
// ,,,,,,,,,                    ,,,,,,,,,    ,  ,,               ,      ,              ,,..#.####..
// .,,,,,,,,,,,           ,    ,.,.#,,,,,,     ,,,  ,,         ,,                  ,,.,,,,,..######
// .......,,,, ,            , ,....,,,,,,, ,,,,,,  ,,               ,,,,,,,,       ,.####..,#######
// #., #.....,,, ,            ,,,,,,.##, ,,,,,,,                ,,,,,,,,           ,######..#######
// ..  ##.###.,,,,,,,               ,,,      ,,,,,            ,,,,,,      ,, ,    , ,#####..#######
// .. ,.....###,,,,,,,,,,,,,    ,     ,                     ,,,,      , ,,,,  ,  , , ,.##...#######
// .........#.#.,#.,,,,,,,,,,,, ....#..,,               ,,,          ,,,,,     ,,,,..,.##..########
// ,,,.......#.#,.##. ,,,,,,,,,,.#.,,,,             ,,,,             ,,        ,  ..#####.#########
// #., ,,........,.#.,,,,,,,,,,,,,,, ,       ,,,                              ,,,,.################
// ,,..,,,...,....,.,,,...,,,,,   ,,,,,,,,,,    ,,,                          ,,, .#################
//      ,  ,,......,,,,.,   ,,      ,,,,,,,  ,,,.,                           , , ,#################
//            ,,..,, ,       ,,,,    ,,,,,,,....,                                ,#################
//                             ,,,,,     ,,,,,,,,                                ,#################
//                     ,          ,,,   ,,,,,                               ,    ,#################
//                             ,,,,,,,  ,   ,                               , ,, .#################
// ,,   ,,,   ,,               ,,,                     ,,                  ,,,,  .#################
// ,,,,,    ,,                                        ,,                  ,,,,, ,##################
//                                                 ,,,,                  ,,,,,  ,##################
//                                                 ,,                    ,,,,  ,###################
//                                                ,,                     ,,,   .###################
//                                               ,,      ,     ,          ,   ,####################
//                                              ,           , ,,         ,   ,.####################
//                                                          .,       ,      ,.#####################
//                                                         ..       ,       .,,####################
//                                                        ,.        ,       , .####################
//          ,,                                          ,,,         ,        ,.#############.,.####
//                                                     ,.        ,           ..############,,,,####
//                                                    ,,        ,     ,     ,.############,,,.#####
//                                                   ,,              ,,    ,,.###########..########
//                                                   ,              ,,,    ,.######################
//                                              ,,                  ,,     ,.######################
//                                  ,           ,                   ,   ,, .#######################
//                                   ,                                 ,, ,#######.################
//                                    ,                                ,  .######..################
//                                                              ,  ,   , ..########################
//                                                                    , ,..########################
//                                                                    , ..#########################
//                                                                   ,,,,.#########################
//                                                                , ,,,,..#########################
//                                                               ,  ,,,,.##########################
//                                                    ,         ,, ,   ,.##########################
//                                                  ,          ,, ,,,,,,,.#########################
//                                                 ,..,        , ,,,,,..., ,.##################...#
//                                                ,...,          ,,,,.#..,   ,.#############.,,   ,
//                                                ,,..             , ,,.,...,   ,.########..,  ,   
//                                                  ,,       ,  ,,      ,.###..,  ,.#####....      
//                                              ,             .,          ,.####..  ,.##., ,,.,    
//                                             ,.,,          ,...            ,.###.   ,.#.    ,,,  
//                                            ,,,.,          ,..#.             ,.##.,    ,,     ,.,
//                   ,                       ,  ,,            ,,...,,            ,...,,           ,
//                                                                ,,.,              ,,,,           
//        ,,,,                                              ...,     ,,, ,             ,.,         
//        ,,,,,,,,                               ,          ,.#...,                      ,,        
//           ,,,,,,,,           ,,,    ,                      ,,.##.,                              


