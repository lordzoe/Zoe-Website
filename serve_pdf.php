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
    </head>
    <body style="margin: 0; overflow: hidden;">
        <iframe src="vitae/Lord_CV.pdf" style="width: 100%; height: 100vh; border: none;"></iframe>
    </body>
    </html>
    <?php
    exit;
}
?>
