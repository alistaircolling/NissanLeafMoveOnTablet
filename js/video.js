
            $(function(){
                // hide video
                $("#myVideo").css({'visibility' : 'hidden', 'display' : 'none'});

                // extend button functionality
                $('#fs').bind('click', function() {
                    // display the video
                    $("#myVideo").css({'visibility' : 'visible', 'display' : 'block'});

                    // launch the video fullscreen
                    $("#myVideo")[0].webkitEnterFullscreen();
                });
            });