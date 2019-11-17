
//Getting user Info 
const GET_INFOS = function () {
    const screenshotButton = document.getElementById('capture');
    const retake = document.getElementById('retake');
    const setDefault = document.getElementById('setDefault');
    const img = document.getElementById('playerphoto');
    const video = document.querySelector('#playervideo');
    const camera = (function CAMERA_ACCESS() {
        const canvas = document.createElement('canvas');
        function gotDevices(deviceInfos) {
            for (let i = 0; i !== deviceInfos.length; ++i) {
                const deviceInfo = deviceInfos[i];
                const option = document.createElement('option');
                option.value = deviceInfo.deviceId;
                if (deviceInfo.kind === 'videoinput') {
                    option.text = deviceInfo.label || 'camera ' +
                        (video.length + 1);
                    video.appendChild(option);

                } 
            }
        }

        function getStream() {
            if (window.stream) {
                window.stream.getTracks().forEach(function (track) {
                    track.stop();
                });
            }

            const constraints = {
                audio: false,
                video: {
                    deviceId: { exact: video.value },
                    width: 720,
                    height: 720
                }
            };


            navigator.mediaDevices.getUserMedia(constraints).
                then(gotStream).catch(handleError);
        }
        let track;
        navigator.mediaDevices.enumerateDevices()
            .then(gotDevices).then(getStream).catch(handleError);

        function gotStream(stream) {
            window.stream = stream; // make stream available to console
            video.srcObject = stream;
            track = stream.getVideoTracks()[0];
        }
        function handleError(error) {
            console.error('Error: ', error.message);
        }
        getStream();
        return {
            'capture': function () {
                video.style = 'display:none;';
                img.style = 'display:block';
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
                canvas.getContext('2d').drawImage(video, 0, 0);
                img.src = canvas.toDataURL('image/webp');
            },
            "retake": function () {
                img.style = 'display:none;';
                video.style = 'display:block';
            },
            "stop": function () {
                track.stop();
            }
        }
    }())

    let capturePlayer1 = false, capturePlayer2 = false;

    screenshotButton.onclick = function () {
        screenshotButton.style = 'display:none;'
        retake.style = 'display:inline-block;';
        camera.capture()
    };
    retake.onclick = function () {
        screenshotButton.style = 'display:inline-block;'
        retake.style = 'display:none;';
        camera.retake();
    }
    setDefault.onclick = function () {
        screenshotButton.style = 'display:none;'
        retake.style = 'display:inline-block;';
        video.style = 'display:none;';
        img.style = 'display:block';
        img.src = 'http://i0.wp.com/clipartportal.com/wp-content/uploads/2018/12/attacker-clipart.jpg';
    }
    document.getElementById('nextButton').onclick = function () {
        let nameInput = document.getElementById('name');
        let img = document.getElementById('playerphoto');
        if (img.src === 'http://127.0.0.1:5500/index.html') {
            generateMessageBox('Default Image is Selected for You.','#ffae42',400);
            setDefault.click();
        }
        if (!capturePlayer1) {
            document.getElementById('string1').innerHTML = 'Enter the name of Second Player';
            PLAYER1_DATA.name = nameInput.value;
            PLAYER1_DATA.playerphoto = img.src
            document.getElementById('name').value = 'Player 2';
            capturePlayer1 = true;
            $(this).html("Lets' Go...")
            img.src = '';
        }
        else if (!capturePlayer2) {
            PLAYER2_DATA.name = nameInput.value;
            PLAYER2_DATA.playerphoto = img.src;
            $("#layer1").fadeOut();
            camera.stop();
            $("#layer1").fadeOut();
            game();
                }
        retake.click();
    }
}