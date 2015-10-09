// Foundation JavaScript
// Documentation can be found at: http://foundation.zurb.com/docs
$(document).foundation();

var page = (function(){

    var btnFamilyLaw = $("#familyLaw");
    var btnTenancyLaw = $("#tenancyLaw");
    var btnUnsure = $("#unsure");
    var btnMaleButton = $("#maleChoice");
    var btnFemaleButton = $("#femaleChoice");
    var btnStartOver = $("#btnStartOver");
    var btnUnder18 = $("#underEighteen");
    var btnOver18 = $("#overEighteen");

    var choice, age, gender;

    var btnNext = $(".btnNext");
    var btnBack = $(".btnBack");

    // all the pages
    var home = $(".content");
    var family1 = $(".family1");
    var genderPage = $(".genderPage");
    var agePage = $(".agePage");

    // actual data pages
    var fFU18 = $(".fFU18");

    var breadCrumbs = [home];


    btnFamilyLaw.click(function(){
        choice = 'familyLaw';
        changePage(home, family1);
    });

    btnTenancyLaw.click(function(){
        choice = 'tenancyLaw';
        changePage(home, family1);
    });

    btnUnsure.click(function(){
        choice = 'unsure';
        changePage(home, family1);
    });

    btnBack.click(function(){
        current = breadCrumbs.pop();
        crumb = breadCrumbs.pop();
        changePage(current, crumb);
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
       var current = breadCrumbs.pop();
        changePage(current, home);
    });

    btnUnder18.click(function(){
       age = 'U18';
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
        }
    }

    function changePage(previous, changeTo){
        previous.fadeOut(function(){
            current = changeTo;
            changeTo.fadeIn();
            breadCrumbs.push(changeTo);
        });
    }

})();