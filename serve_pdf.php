<?php
// Path to the PDF file
$file = 'vitae/Lord_CV.pdf';

// Check if the file exists
if (file_exists($file)) {
    ?>
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Lord Vitae 2024</title>
    </head>
    <body style="margin: 0; overflow: hidden;">
        <!-- Embed the PDF using iframe -->
        <iframe src="vitae/Lord_CV.pdf" style="width: 100%; height: 100vh; border: none;"></iframe>
    </body>
    </html>
    <?php
    exit;
}
?>
