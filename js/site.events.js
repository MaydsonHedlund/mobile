
document.addEventListener("DOMContentLoaded", function (event) {
	
    var menuFooter = document.getElementsByClassName("menu-footer");

    for (var i = 0; i < menuFooter.length; i++) {

        menuFooter[i].addEventListener('click', function() {

            for (var i = 0; i < menuFooter.length; i++) {
                menuFooter[i].classList.remove("menu-activate");
                menuFooter[i].classList.remove("heading");
                menuFooter[i].classList.add("menu-deactivate");
            }

            let classElementTarget = this.classList[0].replace("-heading","");

            let element = document.getElementsByClassName(classElementTarget);

            for (let i = 0; i < element.length; i++) {

                element[i].classList.remove("menu-deactivate");
                element[i].classList.add("menu-activate");
                document.getElementsByClassName(element[i].classList[0] + "-heading")[0].classList.add("heading")
                document.getElementsByClassName(element[i].classList[0] + "-heading")[0].classList.remove("menu-activate")
                document.getElementsByClassName(element[i].classList[0] + "-heading")[0].classList.remove("menu-deactivate")

            }
        });
    }
});