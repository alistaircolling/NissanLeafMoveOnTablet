



            $(function(){
                // hide video
                $("#myVideo").css({'visibility' : 'hidden', 'display' : 'none'});
                 $("#fs").css({'visibility' : 'visible', 'display' : 'block'});

                // extend button functionality
                $('#fs').bind('touchstart click', function() {
                    // display the video
                    $("#myVideo").css({'visibility' : 'visible', 'display' : 'block'});

                    $("#fs").css({'visibility' : 'hidden', 'display' : 'none'});
                    
                    // launch the video fullscreen
                    $("#myVideo")[0].webkitEnterFullscreen();
                });
            });