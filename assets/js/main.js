const ROCK_COUNT = 4,
    CELL_COUNT = 64,
    WIDTH = 8,
    PLAYERS_COUNT = 2,
    AWARDS_COUNT = 4,
    NEIGHBOUR_COUNT = 2,
    AWARDS_ARRAY = [10, 20, 30, 40],
    PLAYER1_DATA = {
        "name": 'Player 1',
        "health": 100,
        attackPower: 5,
        defenceOn: false,
        playerphoto: null
    },
    PLAYER2_DATA = {
        "name": 'Player 2',
        "health": 100,
        attackPower: 5,
        defenceOn: false,
        playerphoto: null
    }
var startGame;

const game = function () {
    var isFirstPlayer = true;
    // $("#card1").html(PLAYER1_DATA.name)
    // $("#card2").html(PLAYER2_DATA.name)


     startGame = function () {
        (function () {
            let container = $("#container"),
                card1 = document.createElement('div'),
                card2 = document.createElement('div'),
                c1 = document.createElement('div'),
                c2 = document.createElement('div'),
                board_area = document.createElement('div'),
                img1 = document.createElement('img'),
                img2 = document.createElement('img'),
                details_div_1 = document.createElement('div'),
                details_div_2 = document.createElement('div'),
                details_div_name_1 = document.createElement('div'),
                details_div_name_2 = document.createElement('div'),
                details_pname_1 = document.createElement('p'),
                details_pname_2 = document.createElement('p'),
                details_div_attack_1 = document.createElement('div'),
                details_div_attack_2 = document.createElement('div'),
                details_pattack_1 = document.createElement('p'),
                details_pattack_2 = document.createElement('p');

            board_area.id = "board_area";
            card1.id = "card1";
            card2.id = "card2";
            card1.className = "card";
            card2.className = "card";

            img1.src = PLAYER1_DATA.playerphoto;
            img2.src = PLAYER2_DATA.playerphoto;
            c1.append(img1);
            c2.append(img2);
            details_pname_1.innerHTML = PLAYER1_DATA.name;
            details_div_name_1.append(details_pname_1);
            details_div_name_1.classList.add('showName')
            details_pattack_1.innerHTML = PLAYER1_DATA.attackPower;
            details_div_attack_1.append(details_pattack_1);
            details_div_attack_1.classList.add('showAttack')

            details_div_1.append(details_div_name_1);
            details_div_1.append(details_div_attack_1);

            details_pname_2.innerHTML = PLAYER2_DATA.name;
            details_div_name_2.append(details_pname_2);
            details_pattack_2.innerHTML = PLAYER2_DATA.attackPower;
            details_div_attack_2.append(details_pattack_2);
            details_div_name_2.classList.add('showName')
            details_div_attack_2.classList.add('showAttack')
            details_div_2.append(details_div_name_2);
            details_div_2.append(details_div_attack_2);
            details_div_1.classList.add('flex');
            details_div_2.classList.add('flex');

            card1.append(c1);
            card1.append(details_div_1);
            card2.append(c2);
            card2.append(details_div_2);
            container.append(card1);
            container.append(card2);
            container.append(board_area);

        }())
        let rocks = getLocations(ROCK_COUNT),

            players = [0, CELL_COUNT - 1],
            awards = getLocations(AWARDS_COUNT);

        for (let i = 0; i < CELL_COUNT; ++i) {
            let element = document.createElement('div');
            element.id = ("cell" + i);
            genrateBlocks(element, parseInt(5 * 1000 * Math.random()));
        }
        for (let i of rocks) {
            $("#cell" + i).addClass("black")
        }
        for (let i of players) {
            $("#cell" + i).addClass("blue")
        }
        for (let i in awards) {
            $("#cell" + awards[i]).addClass("green").html(AWARDS_ARRAY[i])
        }
        $(".card").on('click', function () {
            $(".card").toggleClass("card_hide")
        })
        $('.blue').each(function (index, value) {
            $(this).css('background-size', `contain`);

            if (index === 0) {
                $(this).css('background-image', `url(${PLAYER1_DATA.playerphoto})`);
            }
            else {
                $(this).css('background-image', `url(${PLAYER2_DATA.playerphoto})`);
            }
        })
        togglePlayer($('.blue')[0]);
    }

    function genrateNeighbours(number) {
        let array = new Set();
        let left = true, right = true, up = true, down = true;
        let checkFunction = (flag, cellNum) => {
            if (!flag) {
                return flag;
            }
            let cell = $("#cell" + (cellNum))
            if (cell.hasClass('blue')) {
                generateMessageBox(`Enough Running, its War Time now.`,'#ff0000',400);
                AttackTime();

            }
            if (cell.hasClass('black')) {
                return false;
            }
            array.add(cellNum);
            return true;
        }
        for (let num of Array(NEIGHBOUR_COUNT).fill(0).map((x, index) => index + 1)) {
            right = checkFunction(right, number + num);
            left = checkFunction(left, number - num);
            up = checkFunction(up, number + (num * 8));
            down = checkFunction(down, number - (num * 8));
        }
        return [...array].filter(index => (index >= 0
            && index < 64)
            && ((index - number) % 8 === 0)
            || (index >= (parseInt(number / 8) * 8)
                && (index < (parseInt((number / 8) + 1) * 8))
            ))
    }

    function checkForPossibleActions() {
        $('.blue.active').each(function () {
            let num = parseInt(this.id.split("cell")[1]);
            let pastLocation = this;
            for (let value of genrateNeighbours(num)) {
                let cell = $("#cell" + value);
                if ((!cell.hasClass('blue')) && (!cell.hasClass('black'))) {
                    cell.addClass("canMove").on('click', function () {
                        $('.blue.active').removeClass('blue active');
                        $('.canMove').removeClass('canMove').off();
                        let new_place = $(this)
                        new_place.addClass('blue');
                        if (new_place.hasClass('green')) {
                            let attackPower = new_place.html();
                            if (isFirstPlayer) {
                                new_place.html(PLAYER1_DATA.attackPower)
                                PLAYER1_DATA.attackPower = attackPower;
                                $("#card1 .showAttack").html(attackPower)
                                generateMessageBox(`${PLAYER1_DATA.name} got ${PLAYER1_DATA.attackPower} power.`,'#4bb543',400);
                            }
                            else {
                                new_place.html(PLAYER2_DATA.attackPower)
                                PLAYER2_DATA.attackPower = attackPower;
                                $("#card2 .showAttack").html(attackPower)
                                generateMessageBox(`${PLAYER2_DATA.name} got ${PLAYER2_DATA.attackPower} power.`,'#4bb543',400);
                            }
                        }
                        $(this).css('background-size', `contain`);
                        $(this).css('background-image', $(pastLocation)[0].style['background-image'])
                        $(pastLocation).css('background-image', `none`);
                        togglePlayer(this);
                    })
                };
            }
        });
    }

    function togglePlayer(player) {
        $('.blue').each(function () {
            if (!($(this)[0].id === $(player)[0].id)) {
                $(this).addClass('active');
            }
        })
        isFirstPlayer = !isFirstPlayer;
        checkForPossibleActions();

    }


    // For genrating Animated Blocks
    function genrateBlocks(element, time) {
        $(element).addClass("above");
        setTimeout(_ => {
            $(element).removeClass("above");
        }, time);
        $("#board_area").prepend(element);
    }

    // For Random Numbers
    Set.prototype.getLastValue = function () {
        if (this.length <= 0) {
            return undefined;
        }
        var value;
        for (value of this);
        this.delete(value);
        return value;
    }
    var locations = new Set();

    while (locations.size < (CELL_COUNT - 2)) {
        locations.add(parseInt(Math.random() * (CELL_COUNT - 2)) + 1);
    }
    function getLocations(locationCount) {
        let array = [];
        if (locations.size < locationCount) {
            console.log("Not Enough Locations Present");
            return [];
        }
        let count = locationCount;
        while ((count--) > 0) {
            array.push(locations.getLastValue());
        }
        return array;
    }
    startGame();
}

const generateMessageBox = function (message, colour, width = 250) {
    let element = $(`<div class="success" style="background-color:${colour};  border-colour: ${colour};box-shadow: 0px 0px 5px ${colour};width:${width}px;">
                        ${message}
                </div>`)
    setTimeout(() => {
        element.fadeOut(500);
    }, 2000);
    setTimeout(() => {
        element.remove();
    }, 2500);
    $("#message_alert").append(element)
};
