let firstNumber, secondNumber, action, result = null;

$(document).ready(function () {
    // let numpad = $(".numpad");

    // let buttonHeight;

    // buttonHeight = (numpad.height() / 4) -30;

    // $(".numpad > button").css("height", buttonHeight);

    $(".numpad button").not("#buttons").click(function () {

            if (result === undefined || result === null){
                if( firstNumber === null || firstNumber === undefined){
                    if(parseFloat($(".screen > span").text()) !== 0 && parseFloat($(this).html()) !== 0) $(".screen > span").append($(this).html());
                } 
                
            else {
                $(".screen > span").text("");
                if(+($(".screen > span").text()) !== 0 && +($(this).text()) !== 0) $(".screen > span").append($(this).html());
            }
            
        }

        if (result != undefined || result != null) {
            $(".screen > span").text("");
            if(+($(".screen > span").text()) !== 0 && +($(this).text()) !== 0) $(".screen > span").append($(this).html());
            result = null;
        }
    });

    $(".actions button")
        .not(":nth-child(5)")
        .on("click", this, function () {
            action = $(this).text();
            firstNumber = +$(".screen > span").text();
            //   $(".screen > span").text("");
        });

    $(".actions button")
        .eq(4)
        .on("click", this, function () {
            if (result === undefined || result === null) {
                secondNumber = +$(".screen > span").text();

                switch (action) {
                    case "+":
                        result = firstNumber + secondNumber;
                        break;
                    case "-":
                        result = firstNumber - secondNumber;
                        break;
                    case "*":
                        result = firstNumber * secondNumber;
                        break;
                    case "/":
                        result = firstNumber / secondNumber;
                        break;
                    default:
                        throw error;
                        break;
                }
            } else {
                switch (action) {
                    case "+":
                        result += secondNumber;
                        break;
                    case "-":
                        result -= secondNumber;
                        break;
                    case "*":
                        result *= secondNumber;
                        break;
                    case "/":
                        result /= secondNumber;
                        break;
                    default:
                        throw error;
                        break;
                }
            }

            //   if (result === undefined || result === null) {

            //   }
            //   else{

            //   }
            $(".screen > span").text(result);
        });
});
