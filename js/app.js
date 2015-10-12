// Foundation JavaScript
// Documentation can be found at: http://foundation.zurb.com/docs
$(document).foundation();

var page = (function(){

    var btnFamilyLaw = $("#familyLaw");
    var btnTenancyLaw = $("#tenancyLaw");
    var btnUnsure = $("#unsure");
    var btnMaleButton = $("#maleChoice");
    var btnFemaleButton = $("#femaleChoice");
    var btnStartOver = $(".btnStartOver");
    var btnUnder18 = $("#underEighteen");
    var btnOver18 = $("#overEighteen");
    var btnYes = $(".btnYes");
    var btnNo = $(".btnNo");
    var unsureChoices = [];
    var unsureQuestion = $("#unsureQuestion");

    var choice, age, gender;

    var btnNext = $(".btnNext");
    var btnBack = $(".btnBack");

    // all the pages
    var home = $(".content");
    var family1 = $(".family1");
    var tenancy1 = $(".tenancy1");
    var genderPage = $(".genderPage");
    var agePage = $(".agePage");
    var unsurePage = $(".unsurePage");

    // actual data pages
    var fFU18 = $(".fFU18");
    var fFO18 = $(".fFO18");
    var fMU18 = $(".fMU18");
    var fMO18 = $(".fMO18");
    var tFU18 = $(".tFU18");
    var tFO18 = $(".tFO18");
    var tMU18 = $(".tMU18");
    var tMO18 = $(".tMO18");

    var breadCrumbs = [home];


    btnFamilyLaw.click(function(){
        choice = 'familyLaw';
        changePage(home, family1);
    });

    btnTenancyLaw.click(function(){
        choice = 'tenancyLaw';
        changePage(home, tenancy1);
    });

    btnUnsure.click(function(){
        choice = 'unsure';
        changePage(home, unsurePage);
        decipherChoice();
    });

    btnBack.click(function(){
        goBack();

    });

    btnNext.click(function(){
        var current = breadCrumbs.pop();
        breadCrumbs.push(current);
        changePage(current, genderPage);
    });

    btnMaleButton.click(function(){
        gender = 'male';
        showAge();
    });
    btnFemaleButton.click(function(){
        gender = 'female';
        showAge();
    });

    btnStartOver.click(function(){
        if (!$(this).hasClass("btnYes")){
            var current = breadCrumbs.pop();
            changePage(current, home);
        }
    });

    btnUnder18.click(function(){
       age = 'U18';
        whatNext();
    });
    btnOver18.click(function(){
       age = 'O18';
        whatNext();
    });

    function showAge(){
        var thisPage = breadCrumbs.pop();
        breadCrumbs.push(thisPage);
        changePage(thisPage, agePage);
    }

    function whatNext(){
        var current = breadCrumbs.pop();
        breadCrumbs.push(current);
        switch (choice){
            case 'familyLaw':
                switch (gender){
                    case 'male':
                        switch (age){
                            case 'U18':
                                changePage(current, fMU18);
                                break;
                            case 'O18':
                                changePage(current, fMO18);
                                break;
                        }
                        break;
                    case 'female':
                        switch (age){
                            case 'U18':
                                changePage(current, fFU18);
                                break;
                            case 'O18':
                                changePage(current, fFO18);
                                break;
                        }
                        break;
                }
                break;
            case 'tenancyLaw':
                switch (gender){
                    case 'male':
                        switch (age){
                            case 'U18':
                                changePage(current, tMU18);
                                break;
                            case 'O18':
                                changePage(current, tMO18);
                                break;
                        }
                        break;
                    case 'female':
                        switch (age){
                            case 'U18':
                                changePage(current, tFU18);
                                break;
                            case 'O18':
                                changePage(current, tFO18);
                                break;
                        }
                        break;
                }
                break;
        }
    }

    function changePage(previous, changeTo){
        previous.fadeOut(function(){
            current = changeTo;
            changeTo.fadeIn();
            breadCrumbs.push(changeTo);
        });
    }

    btnYes.click(function(){
        decipherChoice(true)
    });
    btnNo.click(function(){
        decipherChoice(false)
    });

    var btnClose = $(".btnClose");
    btnClose.click(function(){
        $(this).parents('.row').slideUp();
    });

    $('body').on('swiperight', function(){
        $.mobile.loader("hide");
        goBack();
    });

    function goBack(){
        if (home.css('display') == 'none'){
            current = breadCrumbs.pop();
            crumb = breadCrumbs.pop();
            changePage(current, crumb);
        }
    }

    function decipherChoice(bool){
        unsureChoices.push(bool);
        if (unsureChoices.length == 1) {
            if (unsureChoices[0] == true){
                changePage(unsurePage, tenancy1);
                unsureChoices = [];
            } else {
                fadeWords("Have you recently been evicted?");
            }
        }
        if (unsureChoices.length == 2) {
            if (unsureChoices[1] == true){
                changePage(unsurePage, tenancy1);
                unsureChoices = [];
            } else {
                fadeWords("Do you need help with arrangements, plans or orders about children?");
            }
        }
        if (unsureChoices.length == 3) {
            if (unsureChoices[2] == true){
                changePage(unsurePage, family1);
                unsureChoices = [];
            } else {
                fadeWords("Do you need help for any personal relationship, including divorce or separation? ");
            }
        }
        if (unsureChoices.length == 4) {
            if (unsureChoices[2] == true){
                changePage(unsurePage, family1);
                unsureChoices = [];
            } else {
                fadeWords("Unfortunately, this app can't help you.  Feel free to get in touch with us.");
                btnNo.hide();
                btnYes.html("Back to Start");
                btnYes.addClass("btnStartOver");
                btnYes.removeClass("btnYes");
            }
        }

    }

    function fadeWords(new_words){
        unsureQuestion.fadeOut(function(){
            unsureQuestion.html(new_words);
            unsureQuestion.fadeIn();

        });
    }


})();