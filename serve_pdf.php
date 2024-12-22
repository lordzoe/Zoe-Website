<?php
$file = 'vitae/Lord_CV.pdf';

if (file_exists($file)) {
    ?>
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="icon" href="images/favicon.png" type="image/png" sizes="16x16">
        <link rel="icon" href="images/favicon.png" type="image/png" sizes="32x32">
        <link rel="apple-touch-icon" href="images/favicon.png">
        <title>Lord Vitae 2024</title>
        <style>
            body {
                margin: 0;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                height: 100vh; 
            }
            iframe {
                width: 100%;
                height: 100%;
                border: none;
            }
            a {
                margin-top: 10px;
                text-align: center;
                display: none; 
                background-color: black; 
                color: white; 
                padding: 10px 20px;
                text-decoration: none; 
                border-radius: 5px; 
            }
            @media (max-width: 600px) {
                iframe {
                    height: 95vh; 
                    max-width: 100vw;
                }
                a {
                    display: block; 
                }
            }
        </style>
        <script>
            document.addEventListener('DOMContentLoaded', function() {
                if (window.innerWidth <= 600) {
                    window.location.href = 'vitae/Lord_CV.pdf';
                }
            });
        </script>
    </head>
    
    <body>
        <iframe src="vitae/Lord_CV.pdf"></iframe>
        <a href="vitae/Lord_CV.pdf" target="_blank">View Full CV (PDF)</a>
    </body>

    </html>
    <?php
    exit;
}
?>