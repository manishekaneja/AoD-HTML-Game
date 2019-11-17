const AttackTime = (function () {
    $("#attackLayer").fadeIn();
    let its_first_turn = false;
    $('.p1').css('background-image', `url(${PLAYER1_DATA.playerphoto})`);
    $('.p2').css('background-image', `url(${PLAYER2_DATA.playerphoto})`);
    changeTurn();
    $("#attack").on('click', function () {
        if (!its_first_turn) {
        $(".attackBall").animate({left:'190px'},{duration:1000,complete:function(){
            PLAYER1_DATA.health -= (PLAYER1_DATA.defenceOn ? (0.5 * PLAYER2_DATA.attackPower) : PLAYER2_DATA.attackPower);
            if (PLAYER1_DATA.defenceOn) {
                PLAYER1_DATA.defenceOn = false;
                $(".p1").removeClass('glow');
            }
            $(".p1 .ani").css('height', `${PLAYER1_DATA.health}%`);
            if (PLAYER1_DATA.health <= 0) {
                $(this).fadeOut(0);
                $('.p2').css('transform', 'translateX(calc(50vw - 150px))');
                $('.p1').css('transform', 'translateX(-100vw)').fadeOut();
                $('#attackLayer .actions').html(`
            <p style="color:white;font-size:3rem;font-family:monospace;">
            ${PLAYER2_DATA.name} has won the Game
            </p>
            `).fadeOut(1).fadeIn(1000);
        }
        }})
        }
        else {
            $(".attackBall").animate({left:(($(document).width()-190)+'px')},{duration:1000,complete:function(){
                PLAYER2_DATA.health -= (PLAYER2_DATA.defenceOn ? (0.5 * PLAYER1_DATA.attackPower) : PLAYER1_DATA.attackPower);
                if (PLAYER2_DATA.defenceOn) {
                    PLAYER2_DATA.defenceOn = false;
                    $(".p2").removeClass('glow');
                }
                $(".p2 .ani").css('height', `${PLAYER2_DATA.health}%`);
                if (PLAYER2_DATA.health <= 0) {
                    $(this).fadeOut(0);
                    $('.p1').css('transform', 'translateX(calc(50vw - 150px))');
                    $('.p2').css('transform', 'translateX(100vw)').fadeOut();
                    $('#attackLayer .actions').html(`
                    <p style="color:white;font-size:3rem;font-family:monospace;">
                    ${PLAYER1_DATA.name} has won the Game
                    </p>
                    `).fadeOut(1).fadeIn(1000);
                }
            }})
        }
        changeTurn();
    })
    $("#defence").on('click', function () {
        if (its_first_turn) {
            PLAYER1_DATA.defenceOn = true;
            $(".p1").addClass('glow');
            $(".attackBall").css('left',(($(document).width()-190)+'px'));
        }
        else {
            PLAYER2_DATA.defenceOn = true;
            $(".p2").addClass('glow');
            $(".attackBall").css('left','190px');
        }
        changeTurn()
    })
    function changeTurn(){
        if(!its_first_turn){
            $('.p1').addClass('turn');
            $('.p2').removeClass('turn');
        }
        else{
            $('.p2').addClass('turn');
            $('.p1').removeClass('turn');      
        }
        its_first_turn = !its_first_turn;
    }
})
