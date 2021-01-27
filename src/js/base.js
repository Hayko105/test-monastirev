$(document).ready(function () {  
    
    // sticky header
    $(window).scroll(function(){
        if ($(window).scrollTop() >= $('.header').outerHeight()) {
            $('.header').addClass('header_fixed');
        }
        else {
            $('.header').removeClass('header_fixed');
        }
    });
    
    $('.open-catalog-js').on('click', function(){
        $('.catalog-menu').toggleClass('_open');
        if($('.catalog-menu__lev2').hasClass('_open')){
            $('.catalog-menu__lev2').removeClass('_open'); 
        }
    });
    
    $('.nav-lev-1 .nav-lev-1__item .nav-lev-1__arrow').on('click', function(){
        $('.catalog-menu__lev2').addClass('_open');         
    });
    
    $(document).on('click', function(e){
        if (!$(e.target).closest(".catalog-menu").length && !$(e.target).closest(".open-catalog-js").length) {
            $('.catalog-menu').removeClass('_open');
            $('.catalog-menu__lev2').removeClass('_open');    
        }
    });
});